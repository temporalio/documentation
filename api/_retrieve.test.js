const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const Module = require('node:module');

// Tests for the request handler in api/retrieve.js, with Kapa, Blob, and the
// Vercel runtime stubbed. The handler reads its environment when it's loaded,
// so each case sets the environment and then loads a fresh copy.

const HANDLER_PATH = require.resolve('./retrieve');
const DOCS = 'https://docs.temporal.io';

const BASE_ENV = {
  KAPA_API_KEY: 'key',
  KAPA_PROJECT_ID: 'project',
  KAPA_INTEGRATION_ID: 'integration',
  RETRIEVE_URL_ALLOWLIST: 'docs.temporal.io,temporal.io/blog',
  RETRIEVE_LOG_SALT: 'salt',
  BLOB_READ_WRITE_TOKEN: 'token',
};
const ENV_KEYS = [...Object.keys(BASE_ENV), 'KAPA_SOURCE_IDS'];

const originalLoad = Module._load;
const originalFetch = global.fetch;
const originalLog = console.log;
const originalError = console.error;
const originalEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

let blobPuts;
let blobFails;
let kapaCalls;
let kapaReply;
let logged;

beforeEach(() => {
  blobPuts = [];
  blobFails = false;
  kapaCalls = [];
  logged = [];
  kapaReply = () => ({ ok: true, status: 200, json: async () => [] });

  Module._load = function load(request, ...rest) {
    if (request === '@vercel/blob') {
      return {
        put: async (pathname, body, options) => {
          blobPuts.push({ pathname, body: JSON.parse(body), options });
          if (blobFails) throw new Error('blob down');
        },
      };
    }
    if (request === '@vercel/functions') return { waitUntil: () => {} };
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
});

function load() {
  delete require.cache[HANDLER_PATH];
  return require('./retrieve');
}

async function call(query, { method = 'GET', env = {}, headers = {} } = {}) {
  Object.assign(process.env, env);
  for (const [key, value] of Object.entries(env)) if (value === undefined) delete process.env[key];

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
  await load()({ method, url: `/api/retrieve${query}`, headers }, response);
  return response;
}

function kapaResults(results) {
  kapaReply = () => ({ ok: true, status: 200, json: async () => results });
}

const record = () => JSON.parse(logged.at(-1));

describe('request validation', () => {
  it('returns 400 with usage when q is missing', async () => {
    const res = await call('?src=llms');
    assert.strictEqual(res.statusCode, 400);
    assert.ok(res.body.usage);
    assert.strictEqual(kapaCalls.length, 0);
  });

  it('returns 400 when q is too long', async () => {
    const res = await call(`?q=${'a'.repeat(501)}`);
    assert.strictEqual(res.statusCode, 400);
    assert.ok(res.body.error);
  });

  it('returns 405 with Allow and usage for a POST', async () => {
    const res = await call('?q=x', { method: 'POST' });
    assert.strictEqual(res.statusCode, 405);
    assert.strictEqual(res.headers.allow, 'GET, OPTIONS');
    assert.ok(res.body.usage);
  });

  it('returns 204 for OPTIONS', async () => {
    const res = await call('', { method: 'OPTIONS' });
    assert.strictEqual(res.statusCode, 204);
    assert.strictEqual(res.body, undefined);
  });
});

describe('configuration', () => {
  const missing = ['KAPA_API_KEY', 'KAPA_PROJECT_ID', 'KAPA_INTEGRATION_ID', 'RETRIEVE_URL_ALLOWLIST', 'RETRIEVE_LOG_SALT'];
  for (const name of missing) {
    it(`returns 500 without searching when ${name} is unset`, async () => {
      const res = await call('?q=x', { env: { [name]: undefined } });
      assert.strictEqual(res.statusCode, 500);
      assert.strictEqual(kapaCalls.length, 0);
    });
  }
});

describe('results', () => {
  it('drops results from hosts outside the allowlist and counts them', async () => {
    kapaResults([
      { content: 'secret', source_url: 'https://temporalio.slack.com/archives/C1/p1' },
      { content: 'private', source_url: 'https://github.com/temporalio/edu-101-python-content/blob/main/x.md' },
      { content: 'page', source_url: `${DOCS}/workflows#x` },
    ]);
    const res = await call('?q=x&src=llms&agent=test');
    assert.strictEqual(res.statusCode, 200);
    assert.deepStrictEqual(res.body, [
      { content: 'page', source_url: `${DOCS}/workflows.md`, page_url: `${DOCS}/workflows#x` },
    ]);
    assert.strictEqual(record().dropped_count, 2);
    assert.strictEqual(record().result_count, 1);
    assert.deepStrictEqual(record().top_pages, [`${DOCS}/workflows#x`]);
  });

  it('returns custom Q&A answers without a link', async () => {
    kapaResults([
      { content: '# Support QA\n\nQ: Free credits?\n\nA: $150.', source_url: '' },
      { content: 'old', source_url: 'https://temporalio.slack.com/archives/C1/p1' },
      { content: 'page', source_url: `${DOCS}/cloud/pricing` },
    ]);
    const res = await call('?q=x');
    assert.strictEqual(res.statusCode, 200);
    assert.deepStrictEqual(res.body, [
      { content: '# Support QA\n\nQ: Free credits?\n\nA: $150.', source_url: '', page_url: '' },
      { content: 'page', source_url: `${DOCS}/cloud/pricing.md`, page_url: `${DOCS}/cloud/pricing` },
    ]);
    assert.strictEqual(record().dropped_count, 1);
    assert.strictEqual(record().result_count, 2);
  });

  it('survives malformed results', async () => {
    kapaResults([null, 'text', { content: 'no url' }, { content: 'ok', source_url: `${DOCS}/workflows` }]);
    const res = await call('?q=x');
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.length, 1);
    assert.strictEqual(record().dropped_count, 3);
  });

  it('sends the question and keys to Kapa', async () => {
    await call('?q=How+do+I+patch%3F');
    assert.strictEqual(kapaCalls.length, 1);
    assert.match(kapaCalls[0].url, /\/query\/v1\/projects\/project\/retrieval\/$/);
    assert.strictEqual(kapaCalls[0].body.query, 'How do I patch?');
    assert.strictEqual(kapaCalls[0].body.integration_id, 'integration');
    assert.strictEqual(kapaCalls[0].headers['X-API-KEY'], 'key');
  });

  it('does not send top_k, which Kapa rejects above 15', async () => {
    await call('?q=x');
    assert.ok(!('top_k' in kapaCalls[0].body));
  });

  it('keeps allowed results when the first hits are all dropped', async () => {
    const dropped = Array.from({ length: 20 }, (_, i) => ({
      content: `s${i}`,
      source_url: `https://temporalio.slack.com/archives/C1/p${i}`,
    }));
    kapaResults([...dropped, { content: 'page', source_url: `${DOCS}/workflows` }]);
    const res = await call('?q=x');
    assert.strictEqual(res.body.length, 1);
    assert.strictEqual(record().fetched_count, 21);
    assert.strictEqual(record().dropped_count, 20);
  });

  it('does not expose how many source IDs were sent', async () => {
    const res = await call('?q=x', { env: { KAPA_SOURCE_IDS: 'a,b,c' } });
    assert.strictEqual(res.headers['x-retrieve-source-filter'], undefined);
    assert.strictEqual(kapaCalls[0].body.source_ids_include.length, 3);
    assert.strictEqual(record().source_ids_sent, 3);
  });
});

describe('upstream failures', () => {
  it('returns 502 for a non-array body', async () => {
    kapaResults({ detail: 'nope' });
    const res = await call('?q=x');
    assert.strictEqual(res.statusCode, 502);
  });

  it('returns 502 and records the status when Kapa returns an error', async () => {
    kapaReply = () => ({ ok: false, status: 401, text: async () => 'bad key' });
    const res = await call('?q=x');
    assert.strictEqual(res.statusCode, 502);
    assert.strictEqual(record().upstream_status, 401);
  });

  it('returns 502 when the request fails', async () => {
    kapaReply = () => {
      throw new Error('socket hang up');
    };
    const res = await call('?q=x');
    assert.strictEqual(res.statusCode, 502);
  });

  it('returns 504 when reading the body times out', async () => {
    kapaReply = () => ({
      ok: true,
      status: 200,
      json: async () => {
        const error = new Error('timed out');
        error.name = 'TimeoutError';
        throw error;
      },
    });
    const res = await call('?q=x');
    assert.strictEqual(res.statusCode, 504);
  });

  it('returns 504 when the request times out', async () => {
    kapaReply = () => {
      const error = new Error('timed out');
      error.name = 'TimeoutError';
      throw error;
    };
    const res = await call('?q=x');
    assert.strictEqual(res.statusCode, 504);
  });
});

describe('response headers', () => {
  it('caches a successful answer and sends no CORS headers', async () => {
    const res = await call('?q=x');
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.headers['cache-control'], 'public, s-maxage=300, stale-while-revalidate=60');
    assert.strictEqual(res.headers['access-control-allow-origin'], undefined);
    assert.strictEqual(res.headers['x-robots-tag'], 'noindex, nofollow');
  });

  it('never caches errors', async () => {
    assert.strictEqual((await call('?src=x')).headers['cache-control'], 'no-store');
    assert.strictEqual((await call('?q=x', { method: 'POST' })).headers['cache-control'], 'no-store');
    kapaResults({ detail: 'nope' });
    assert.strictEqual((await call('?q=x')).headers['cache-control'], 'no-store');
  });
});

describe('request log', () => {
  it('writes one Blob per request and hashes the IP', async () => {
    await call('?q=x&src=llms', { headers: { 'x-real-ip': '203.0.113.7', 'user-agent': 'test-agent' } });
    assert.strictEqual(blobPuts.length, 1);
    assert.match(blobPuts[0].pathname, /^retrieve-log\/\d{4}-\d{2}-\d{2}\/.+\.json$/);
    assert.strictEqual(blobPuts[0].options.access, 'private');
    assert.match(blobPuts[0].body.ip_hash, /^[0-9a-f]{16}$/);
    assert.ok(!JSON.stringify(blobPuts[0].body).includes('203.0.113.7'));
    assert.strictEqual(blobPuts[0].body.ua, 'test-agent');
  });

  it('logs rejected requests too', async () => {
    await call('?src=llms');
    assert.strictEqual(record().status, 400);
    assert.strictEqual(record().src, 'llms');
  });

  it('does not fail the request when the Blob write fails', async () => {
    blobFails = true;
    const res = await call('?q=x');
    assert.strictEqual(res.statusCode, 200);
  });
});
