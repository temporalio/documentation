const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const Module = require('node:module');

// Tests for the request handler in api/recommend.js, with Kapa, Blob, the
// Vercel runtime, and the generated content manifest stubbed. The handler reads
// its environment and the manifest when it's loaded, so each case sets them and
// then loads a fresh copy.

const HANDLER_PATH = require.resolve('./recommend');
const LOG_PATH = require.resolve('./_log');
const DOCS = 'https://docs.temporal.io';

const BASE_ENV = {
  KAPA_API_KEY: 'key',
  KAPA_PROJECT_ID: 'project',
  KAPA_RECOMMEND_INTEGRATION_ID: 'recommend-integration',
  RETRIEVE_URL_ALLOWLIST: 'docs.temporal.io,temporal.io/blog',
  RETRIEVE_LOG_SALT: 'salt',
  BLOB_READ_WRITE_TOKEN: 'token',
};
const ENV_KEYS = Object.keys(BASE_ENV);

const MANIFEST = {
  '/workflows': { title: 'Workflows', description: 'What a Workflow is.' },
  '/guides/route-specialized-workloads': { title: 'Route GPU Activities', description: 'Task Queues for GPUs.' },
  '/quickstarts': { title: 'Quickstarts', description: 'Start here.' },
};

const originalLoad = Module._load;
const originalFetch = global.fetch;
const originalLog = console.log;
const originalError = console.error;
const originalEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

let blobPuts;
let kapaCalls;
let kapaReply;
let logged;
let manifestPresent;

beforeEach(() => {
  blobPuts = [];
  kapaCalls = [];
  logged = [];
  manifestPresent = true;
  kapaReply = () => ({ ok: true, status: 200, json: async () => [] });

  Module._load = function load(request, ...rest) {
    if (request === '@vercel/blob') {
      return { put: async (pathname, body, options) => void blobPuts.push({ pathname, body: JSON.parse(body), options }) };
    }
    if (request === '@vercel/functions') return { waitUntil: () => {} };
    if (request === './_content-manifest.json') {
      if (!manifestPresent) throw new Error('Cannot find module');
      return MANIFEST;
    }
    return originalLoad.call(this, request, ...rest);
  };

  global.fetch = async (url, init) => {
    kapaCalls.push({ url, body: JSON.parse(init.body), headers: init.headers });
    return kapaReply();
  };
  console.log = (line) => logged.push(line);
  console.error = () => {};

  for (const key of ENV_KEYS) delete process.env[key];
  Object.assign(process.env, BASE_ENV);
});

afterEach(() => {
  Module._load = originalLoad;
  global.fetch = originalFetch;
  console.log = originalLog;
  console.error = originalError;
  for (const key of ENV_KEYS) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
  delete require.cache[HANDLER_PATH];
  delete require.cache[LOG_PATH];
});

async function call(query, { method = 'GET', env = {}, headers = {} } = {}) {
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }

  const response = {
    headers: {},
    statusCode: null,
    body: undefined,
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    send(body) {
      this.body = body === undefined ? undefined : JSON.parse(body);
    },
  };
  delete require.cache[HANDLER_PATH];
  delete require.cache[LOG_PATH];
  await require('./recommend')({ method, url: `/api/recommend${query}`, headers }, response);
  return response;
}

function kapaResults(results) {
  kapaReply = () => ({ ok: true, status: 200, json: async () => results });
}

const record = () => JSON.parse(logged.at(-1));

describe('request validation', () => {
  it('returns 400 with usage when q is missing', async () => {
    const res = await call('?limit=3');
    assert.strictEqual(res.statusCode, 400);
    assert.ok(res.body.usage);
    assert.strictEqual(kapaCalls.length, 0);
  });

  it('returns 400 for a bad limit', async () => {
    const res = await call('?q=python&limit=99');
    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(kapaCalls.length, 0);
  });

  it('returns 405 with Allow for a POST', async () => {
    const res = await call('?q=x', { method: 'POST' });
    assert.strictEqual(res.statusCode, 405);
    assert.strictEqual(res.headers.allow, 'GET, OPTIONS');
  });
});

describe('CORS', () => {
  it('answers a preflight with 204 and open CORS headers', async () => {
    const res = await call('', { method: 'OPTIONS', headers: { origin: 'https://cloud.temporal.io' } });
    assert.strictEqual(res.statusCode, 204);
    assert.strictEqual(res.headers['access-control-allow-origin'], '*');
    assert.strictEqual(res.headers['access-control-allow-methods'], 'GET, OPTIONS');
    assert.strictEqual(kapaCalls.length, 0);
  });

  it('sends the CORS header on success and on errors', async () => {
    kapaResults([{ content: 'x', source_url: `${DOCS}/workflows` }]);
    const ok = await call('?q=workflows');
    assert.strictEqual(ok.headers['access-control-allow-origin'], '*');
    const bad = await call('');
    assert.strictEqual(bad.headers['access-control-allow-origin'], '*');
  });
});

describe('cards', () => {
  it('returns cards from the manifest and uses the recommend integration', async () => {
    kapaResults([
      { content: 'a', source_url: `${DOCS}/guides/route-specialized-workloads#x` },
      { content: 'b', source_url: `${DOCS}/guides/route-specialized-workloads#y` },
      { content: 'c', source_url: 'https://temporal.io/blog/post' },
      { content: 'd', source_url: `${DOCS}/workflows` },
    ]);
    const res = await call('?q=python+data+pipelines&limit=3&agent=cloud-ui', { headers: { origin: 'https://cloud.temporal.io' } });

    assert.strictEqual(res.statusCode, 200);
    assert.deepStrictEqual(res.body.map((card) => card.url), [`${DOCS}/guides/route-specialized-workloads`, `${DOCS}/workflows`]);
    assert.deepStrictEqual(Object.keys(res.body[0]).sort(), ['description', 'title', 'type', 'type_label', 'url']);
    assert.strictEqual(res.headers['cache-control'], 'public, s-maxage=300, stale-while-revalidate=60');

    assert.strictEqual(kapaCalls[0].body.integration_id, 'recommend-integration');
    assert.strictEqual(kapaCalls[0].body.query, 'python data pipelines');
  });

  it('logs the origin and counts under recommend-log/', async () => {
    kapaResults([
      { content: 'a', source_url: `${DOCS}/workflows` },
      { content: 'b', source_url: 'https://temporal.io/blog/post' },
    ]);
    await call('?q=workflows', { headers: { origin: 'https://cloud.temporal.io', 'x-real-ip': '203.0.113.9' } });

    const entry = record();
    assert.strictEqual(entry.event, 'recommend');
    assert.strictEqual(entry.origin, 'https://cloud.temporal.io');
    assert.strictEqual(entry.src, 'cloud-ui');
    assert.strictEqual(entry.fetched_count, 2);
    assert.strictEqual(entry.skipped_count, 1);
    assert.strictEqual(entry.card_count, 1);
    assert.ok(!JSON.stringify(entry).includes('203.0.113.9'));
    assert.match(blobPuts[0].pathname, /^recommend-log\/\d{4}-\d{2}-\d{2}\//);
  });

  it('returns an empty list, not an error, when nothing maps to a page', async () => {
    kapaResults([{ content: 'a', source_url: 'https://temporal.io/blog/post' }]);
    const res = await call('?q=blog');
    assert.strictEqual(res.statusCode, 200);
    assert.deepStrictEqual(res.body, []);
  });
});

describe('failures', () => {
  it('returns 500 and never calls Kapa when configuration is missing', async () => {
    for (const key of ['KAPA_RECOMMEND_INTEGRATION_ID', 'RETRIEVE_URL_ALLOWLIST', 'RETRIEVE_LOG_SALT', 'KAPA_API_KEY']) {
      const res = await call('?q=x', { env: { [key]: undefined } });
      assert.strictEqual(res.statusCode, 500, key);
      Object.assign(process.env, BASE_ENV);
    }
    assert.strictEqual(kapaCalls.length, 0);
  });

  it('returns 500 when the manifest is missing', async () => {
    manifestPresent = false;
    const res = await call('?q=x');
    assert.strictEqual(res.statusCode, 500);
    assert.strictEqual(kapaCalls.length, 0);
  });

  it('returns 502 when Kapa returns an error', async () => {
    kapaReply = () => ({ ok: false, status: 400, text: async () => 'bad' });
    const res = await call('?q=x');
    assert.strictEqual(res.statusCode, 502);
    assert.strictEqual(res.headers['cache-control'], 'no-store');
    assert.strictEqual(record().upstream_status, 400);
  });

  it('returns 504 when the Kapa request times out', async () => {
    kapaReply = () => {
      const error = new Error('timeout');
      error.name = 'TimeoutError';
      throw error;
    };
    const res = await call('?q=x');
    assert.strictEqual(res.statusCode, 504);
  });
});
