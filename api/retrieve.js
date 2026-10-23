const crypto = require('crypto');
const { put } = require('@vercel/blob');
const { waitUntil } = require('@vercel/functions');
const { compileRedirects } = require('../bin/redirect-utils');
const { redirects } = require('../vercel.json');
const {
  LIMITS,
  USAGE,
  isAllowed,
  parseAllowlist,
  parseList,
  parseParams,
  shapeResults,
  validResults,
} = require('./_retrieve-lib');

// Public, no-auth search over Temporal's docs for agents, proxying Kapa's
// Retrieval API with a server-side key. Part of the agent-discoverable search
// experiment; see readme/AGENT-RETRIEVE.md.

// Compiled once per function instance.
const compiledRedirects = compileRedirects(redirects);

// Results whose URL isn't covered by RETRIEVE_URL_ALLOWLIST are dropped. Kapa's
// Retrieval endpoint ignores source_ids_include, so this is what keeps results
// from sources the public can't open, such as private GitHub repos, out of the
// response. The handler refuses to run without it, so a missing variable can't
// expose them.
const allowlist = parseAllowlist(parseList(process.env.RETRIEVE_URL_ALLOWLIST));

const UPSTREAM_TIMEOUT_MS = 10_000;

// No CORS headers: agents call this from a server or a tool, and a wildcard
// would let any web page spend the Kapa quota through its visitors' browsers.
const HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'X-Robots-Tag': 'noindex, nofollow',
};

// The CDN caches a successful answer, so a repeated question doesn't call Kapa
// again. A cache hit never reaches the function, so it isn't logged. Errors are
// never cached.
const CACHE_OK = 'public, s-maxage=300, stale-while-revalidate=60';
const CACHE_NONE = 'no-store';

function send(response, status, body) {
  for (const [key, value] of Object.entries(HEADERS)) response.setHeader(key, value);
  response.setHeader('Cache-Control', status === 200 ? CACHE_OK : CACHE_NONE);
  response.status(status).send(body === undefined ? undefined : JSON.stringify(body));
}

function header(request, name) {
  const value = request.headers[name];
  return (Array.isArray(value) ? value[0] : value) || null;
}

// A salted hash, so repeat callers can be grouped without storing their IP.
function ipHash(request) {
  const ip = header(request, 'x-real-ip') || (header(request, 'x-forwarded-for') || '').split(',')[0].trim();
  const salt = process.env.RETRIEVE_LOG_SALT;
  if (!ip || !salt) return null;
  return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 16);
}

// One JSON line in the runtime logs for live tailing, and one Blob per request
// for the readout, since runtime logs expire before the experiment ends. Blob
// writes happen after the response is sent, and a failed write is only logged.
function log(record) {
  console.log(JSON.stringify({ event: 'retrieve', ...record }));
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;

  const day = record.ts.slice(0, 10);
  const pathname = `retrieve-log/${day}/${record.ts}-${crypto.randomBytes(4).toString('hex')}.json`;
  waitUntil(
    put(pathname, JSON.stringify(record), {
      access: 'private',
      addRandomSuffix: false,
      contentType: 'application/json',
    }).catch((error) => console.error(`retrieve: Blob write failed: ${error.message}`))
  );
}

async function queryKapa(query) {
  const { KAPA_API_KEY, KAPA_PROJECT_ID, KAPA_INTEGRATION_ID, KAPA_SOURCE_IDS } = process.env;
  // No top_k: Kapa's Retrieval endpoint rejects values above its maximum of 15,
  // which is also what it returns by default, so there's no room to ask for
  // extra results to cover the ones the allowlist drops.
  const body = { query, integration_id: KAPA_INTEGRATION_ID };
  // Source IDs rather than source groups: a group filter always adds every
  // source in Kapa's Global group, which here is all of them. As of
  // 2026-10-23 the Retrieval endpoint accepts source_ids_include but ignores
  // it; RETRIEVE_URL_ALLOWLIST does the filtering until Kapa honors it.
  const sourceIds = parseList(KAPA_SOURCE_IDS);
  if (sourceIds.length > 0) body.source_ids_include = sourceIds;

  return fetch(`https://api.kapa.ai/query/v1/projects/${KAPA_PROJECT_ID}/retrieval/`, {
    method: 'POST',
    headers: { 'X-API-KEY': KAPA_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });
}

module.exports = async (request, response) => {
  if (request.method === 'OPTIONS') {
    send(response, 204);
    return;
  }
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET, OPTIONS');
    send(response, 405, { error: 'Use GET.', usage: USAGE });
    return;
  }

  const started = Date.now();
  const { searchParams } = new URL(request.url, 'https://docs.temporal.io');
  const parsed = parseParams(searchParams);
  // A rejected request still records who sent it and from where.
  const raw = (name) => searchParams.get(name)?.trim().slice(0, LIMITS[name]) || null;
  const record = {
    ts: new Date(started).toISOString(),
    q: parsed.params?.q ?? searchParams.get('q')?.slice(0, 200) ?? null,
    jtb: parsed.params ? parsed.params.jtb : raw('jtb'),
    src: parsed.params ? parsed.params.src : raw('src'),
    agent: parsed.params ? parsed.params.agent : raw('agent'),
    ua: header(request, 'user-agent'),
    country: header(request, 'x-vercel-ip-country'),
    ip_hash: ipHash(request),
    deployment: process.env.VERCEL_ENV || 'development',
    // How many KAPA_SOURCE_IDS were sent. Kapa ignores them today, so this
    // doesn't mean the search was limited to those sources.
    source_ids_sent: parseList(process.env.KAPA_SOURCE_IDS).length,
    fetched_count: null,
    dropped_count: null,
    status: null,
    upstream_status: null,
    result_count: null,
    latency_ms: null,
    top_pages: [],
  };

  const finish = (status, body) => {
    record.status = status;
    record.latency_ms = Date.now() - started;
    send(response, status, body);
    log(record);
  };

  if (parsed.error) {
    finish(400, { error: parsed.error, usage: USAGE });
    return;
  }

  const { KAPA_API_KEY, KAPA_PROJECT_ID, KAPA_INTEGRATION_ID } = process.env;
  if (!KAPA_API_KEY || !KAPA_PROJECT_ID || !KAPA_INTEGRATION_ID || allowlist.length === 0 || !process.env.RETRIEVE_LOG_SALT) {
    finish(500, { error: 'Search is not configured.' });
    return;
  }

  let upstream;
  try {
    upstream = await queryKapa(parsed.params.q);
  } catch (error) {
    const timedOut = error.name === 'TimeoutError';
    console.error(`retrieve: Kapa request failed: ${error.message}`);
    finish(timedOut ? 504 : 502, { error: timedOut ? 'Search timed out. Try again.' : 'Search is unavailable. Try again later.' });
    return;
  }

  record.upstream_status = upstream.status;
  // The timeout also covers reading the body, so a slow body is a 504 too.
  let bodyTimedOut = false;
  const results = upstream.ok
    ? await upstream.json().catch((error) => {
        bodyTimedOut = error.name === 'TimeoutError';
        return null;
      })
    : null;
  if (bodyTimedOut) {
    console.error('retrieve: Kapa response timed out');
    finish(504, { error: 'Search timed out. Try again.' });
    return;
  }
  if (!Array.isArray(results)) {
    if (upstream.ok) console.error('retrieve: Kapa response was not a JSON array');
    else console.error(`retrieve: Kapa returned ${upstream.status}: ${(await upstream.text().catch(() => '')).slice(0, 500)}`);
    finish(502, { error: 'Search is unavailable. Try again later.' });
    return;
  }

  try {
    const valid = validResults(results);
    const kept = valid.filter((result) => isAllowed(result.source_url, allowlist));
    record.fetched_count = results.length;
    record.dropped_count = results.length - kept.length;
    const shaped = shapeResults(kept, compiledRedirects);
    record.result_count = shaped.length;
    record.top_pages = shaped.slice(0, 3).map((result) => result.page_url);
    finish(200, shaped);
  } catch (error) {
    console.error(`retrieve: could not shape Kapa results: ${error.message}`);
    finish(502, { error: 'Search is unavailable. Try again later.' });
  }
};
