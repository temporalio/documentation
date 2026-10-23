const crypto = require('crypto');
const { put } = require('@vercel/blob');
const { waitUntil } = require('@vercel/functions');
const { compileRedirects } = require('../bin/redirect-utils');
const { redirects } = require('../vercel.json');
const { USAGE, parseParams, shapeResults } = require('./_retrieve-lib');

// Public, no-auth search over Temporal's docs for agents, proxying Kapa's
// Retrieval API with a server-side key. Part of the agent-discoverable search
// experiment; see readme/AGENT-RETRIEVE.md.

// Compiled once per function instance.
const compiledRedirects = compileRedirects(redirects);

const UPSTREAM_TIMEOUT_MS = 10_000;

const HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  // Every call reaches the function, so every call is logged.
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'X-Robots-Tag': 'noindex, nofollow',
};

function send(response, status, body) {
  for (const [key, value] of Object.entries(HEADERS)) response.setHeader(key, value);
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
  const { KAPA_API_KEY, KAPA_PROJECT_ID, KAPA_INTEGRATION_ID, KAPA_SOURCE_GROUP_ID } = process.env;
  const body = { query, integration_id: KAPA_INTEGRATION_ID };
  if (KAPA_SOURCE_GROUP_ID) body.source_group_ids_include = [KAPA_SOURCE_GROUP_ID];

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
  const record = {
    ts: new Date(started).toISOString(),
    q: parsed.params?.q ?? searchParams.get('q')?.slice(0, 200) ?? null,
    jtb: parsed.params?.jtb ?? null,
    src: parsed.params?.src ?? null,
    agent: parsed.params?.agent ?? null,
    ua: header(request, 'user-agent'),
    country: header(request, 'x-vercel-ip-country'),
    ip_hash: ipHash(request),
    deployment: process.env.VERCEL_ENV || 'development',
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
  if (!KAPA_API_KEY || !KAPA_PROJECT_ID || !KAPA_INTEGRATION_ID) {
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
  const results = upstream.ok ? await upstream.json().catch(() => null) : null;
  if (!Array.isArray(results)) {
    if (upstream.ok) console.error('retrieve: Kapa response was not a JSON array');
    else console.error(`retrieve: Kapa returned ${upstream.status}: ${(await upstream.text().catch(() => '')).slice(0, 500)}`);
    finish(502, { error: 'Search is unavailable. Try again later.' });
    return;
  }

  const shaped = shapeResults(results, compiledRedirects);
  record.result_count = shaped.length;
  record.top_pages = shaped.slice(0, 3).map((result) => result.page_url);
  finish(200, shaped);
};
