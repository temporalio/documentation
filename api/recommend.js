const crypto = require('crypto');
const { waitUntil } = require('@vercel/functions');
const { compileRedirects } = require('../bin/redirect-utils');
const { redirects } = require('../vercel.json');
const { clientIp, header, ipHash, putRecord } = require('./_log');
const { kapaIdentity, parseAllowlist, parseList } = require('./_retrieve-lib');
const { LIMITS, USAGE, parseParams, toCards } = require('./_recommend-lib');

// Topic search over Temporal's docs for the Temporal Cloud "Recommended for you"
// panel. Like api/retrieve.js it proxies Kapa's Retrieval API with a server-side
// key, but it returns cards (title, description, type, URL) instead of passages.
// See readme/RECOMMEND.md.

const compiledRedirects = compileRedirects(redirects);
const allowlist = parseAllowlist(parseList(process.env.RETRIEVE_URL_ALLOWLIST));

// Written by bin/write-content-manifest.js during the build. Without it there's
// nothing to build cards from, so the handler returns 500 instead of an empty list.
let manifest = null;
try {
  manifest = require('./_content-manifest.json');
} catch {
  console.error('recommend: api/_content-manifest.json is missing. Run bin/write-content-manifest.js.');
}

// Blog and Learn titles and descriptions, committed and refreshed weekly by
// .github/workflows/update-external-content.yml.
const external = require('./_external-content.json');

const UPSTREAM_TIMEOUT_MS = 10_000;

// Open to any origin for now, so the Cloud UI can call it from the browser. The
// Vercel Firewall rate limit and the CDN cache are what bound the Kapa quota. See
// readme/RECOMMEND.md for the origin allowlist that's planned once the product
// team's domains are known.
const HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'X-Robots-Tag': 'noindex, nofollow',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

const CACHE_OK = 'public, s-maxage=300, stale-while-revalidate=60';
const CACHE_NONE = 'no-store';

function send(response, status, body) {
  for (const [key, value] of Object.entries(HEADERS)) response.setHeader(key, value);
  response.setHeader('Cache-Control', status === 200 ? CACHE_OK : CACHE_NONE);
  response.status(status).send(body === undefined ? undefined : JSON.stringify(body));
}

// One JSON line in the runtime logs and one Blob per request, written after the
// response is sent. A failed write is only logged.
function log(record) {
  console.log(JSON.stringify({ event: 'recommend', ...record }));
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;

  const day = record.ts.slice(0, 10);
  const pathname = `recommend-log/${day}/${record.ts}-${crypto.randomBytes(4).toString('hex')}.json`;
  waitUntil(putRecord(pathname, record).catch((error) => console.error(`recommend: Blob write failed: ${error.message}`)));
}

// No top_k and no source filter, for the reasons given in api/retrieve.js.
// KAPA_RECOMMEND_INTEGRATION_ID keeps this traffic apart from the agent endpoint
// in Kapa analytics.
async function queryKapa(query, identity) {
  const { KAPA_API_KEY, KAPA_PROJECT_ID, KAPA_RECOMMEND_INTEGRATION_ID } = process.env;
  const body = { query, integration_id: KAPA_RECOMMEND_INTEGRATION_ID, ...identity };

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
  const raw = (name) => searchParams.get(name)?.trim().slice(0, LIMITS[name]) || null;
  const record = {
    ts: new Date(started).toISOString(),
    q: parsed.params?.q ?? searchParams.get('q')?.slice(0, 200) ?? null,
    limit: parsed.params?.limit ?? null,
    src: parsed.params ? parsed.params.src : raw('src'),
    agent: parsed.params ? parsed.params.agent : raw('agent'),
    ua: header(request, 'user-agent'),
    origin: header(request, 'origin'),
    country: header(request, 'x-vercel-ip-country'),
    ip_hash: ipHash(request, process.env.RETRIEVE_LOG_SALT),
    deployment: process.env.VERCEL_ENV || 'development',
    fetched_count: null,
    skipped_count: null,
    status: null,
    upstream_status: null,
    card_count: null,
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

  const { KAPA_API_KEY, KAPA_PROJECT_ID, KAPA_RECOMMEND_INTEGRATION_ID } = process.env;
  if (
    !KAPA_API_KEY ||
    !KAPA_PROJECT_ID ||
    !KAPA_RECOMMEND_INTEGRATION_ID ||
    allowlist.length === 0 ||
    !process.env.RETRIEVE_LOG_SALT ||
    !manifest
  ) {
    finish(500, { error: 'Search is not configured.' });
    return;
  }

  const identity = kapaIdentity({
    ip: clientIp(request),
    agent: parsed.params.agent,
    src: parsed.params.src,
    salt: process.env.RETRIEVE_LOG_SALT,
  });
  let upstream;
  try {
    upstream = await queryKapa(parsed.params.q, identity);
  } catch (error) {
    const timedOut = error.name === 'TimeoutError';
    console.error(`recommend: Kapa request failed: ${error.message}`);
    finish(timedOut ? 504 : 502, { error: timedOut ? 'Search timed out. Try again.' : 'Search is unavailable. Try again later.' });
    return;
  }

  record.upstream_status = upstream.status;
  let bodyTimedOut = false;
  const results = upstream.ok
    ? await upstream.json().catch((error) => {
        bodyTimedOut = error.name === 'TimeoutError';
        return null;
      })
    : null;
  if (bodyTimedOut) {
    console.error('recommend: Kapa response timed out');
    finish(504, { error: 'Search timed out. Try again.' });
    return;
  }
  if (!Array.isArray(results)) {
    if (upstream.ok) console.error('recommend: Kapa response was not a JSON array');
    else console.error(`recommend: Kapa returned ${upstream.status}: ${(await upstream.text().catch(() => '')).slice(0, 500)}`);
    finish(502, { error: 'Search is unavailable. Try again later.' });
    return;
  }

  try {
    const { cards, skipped } = toCards(results, { allowlist, manifest, external, compiledRedirects, limit: parsed.params.limit });
    record.fetched_count = results.length;
    record.skipped_count = skipped;
    record.card_count = cards.length;
    record.top_pages = cards.slice(0, 3).map((card) => card.url);
    finish(200, cards);
  } catch (error) {
    console.error(`recommend: could not build cards: ${error.message}`);
    finish(502, { error: 'Search is unavailable. Try again later.' });
  }
};
