const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const Module = require('node:module');

// Tests for the request handler in api/feedback.js, with Blob stubbed. The
// handler reads its environment on each request, but the shared log module
// loads @vercel/blob, so both are reloaded for each case.

const HANDLER_PATH = require.resolve('./feedback');
const LOG_PATH = require.resolve('./_log');
const DOCS = 'https://docs.temporal.io';

const BASE_ENV = { FEEDBACK_LOG_SALT: 'salt', BLOB_READ_WRITE_TOKEN: 'token' };
const ENV_KEYS = Object.keys(BASE_ENV);

const originalLoad = Module._load;
const originalLog = console.log;
const originalError = console.error;
const originalEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

let blobPuts;
let blobFails;
let logged;

beforeEach(() => {
  blobPuts = [];
  blobFails = false;
  logged = [];

  Module._load = function load(request, ...rest) {
    if (request === '@vercel/blob') {
      return {
        put: async (pathname, body, options) => {
          if (blobFails) throw new Error('blob down');
          blobPuts.push({ pathname, body: JSON.parse(body), options });
        },
      };
    }
    return originalLoad.call(this, request, ...rest);
  };
  console.log = (line) => logged.push(line);
  console.error = () => {};

  for (const key of ENV_KEYS) delete process.env[key];
  Object.assign(process.env, BASE_ENV);
});

afterEach(() => {
  Module._load = originalLoad;
  console.log = originalLog;
  console.error = originalError;
  for (const key of ENV_KEYS) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
  delete require.cache[HANDLER_PATH];
  delete require.cache[LOG_PATH];
});

function load() {
  delete require.cache[HANDLER_PATH];
  delete require.cache[LOG_PATH];
  return require('./feedback');
}

async function call({ method = 'POST', query = '', body, env = {}, headers = {} } = {}) {
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
    send(sent) {
      this.body = sent === undefined ? undefined : JSON.parse(sent);
    },
  };
  await load()({ method, url: `/api/feedback${query}`, headers, body }, response);
  return response;
}

const line = () => JSON.parse(logged.at(-1));
const report = { title: 'Wrong flag', message: 'The page says --foo; the CLI has --bar.', category: 'documentation' };

describe('agent reports', () => {
  it('stores a POSTed report and returns its ID', async () => {
    const res = await call({
      body: { ...report, page_url: `${DOCS}/cli.md`, agent: 'claude-code' },
      headers: { 'user-agent': 'test-agent', 'x-real-ip': '203.0.113.7', 'x-vercel-ip-country': 'NZ' },
    });
    assert.strictEqual(res.statusCode, 202);
    assert.match(res.body.id, /^\d{8}T\d{9}Z-[0-9a-f]{8}$/);
    assert.match(res.body.message, /don't need to send it again/);
    assert.strictEqual(res.body.amend_token, undefined);

    assert.strictEqual(blobPuts.length, 1);
    const { pathname, body, options } = blobPuts[0];
    assert.match(pathname, new RegExp(`^feedback/\\d{4}-\\d{2}-\\d{2}/${res.body.id}\\.json$`));
    assert.strictEqual(options.access, 'private');
    assert.strictEqual(body.kind, 'report');
    assert.strictEqual(body.channel, 'agent');
    assert.strictEqual(body.page_url, `${DOCS}/cli`);
    assert.strictEqual(body.message, report.message);
    assert.strictEqual(body.agent, 'claude-code');
    assert.strictEqual(body.country, 'NZ');
    assert.match(body.ip_hash, /^[0-9a-f]{16}$/);
    assert.ok(!JSON.stringify(body).includes('203.0.113.7'));
  });

  it('stores a report sent as GET query parameters', async () => {
    const res = await call({ method: 'GET', query: '?title=Missing+page&message=No+docs+for+X&src=llms' });
    assert.strictEqual(res.statusCode, 202);
    assert.strictEqual(blobPuts[0].body.title, 'Missing page');
    assert.strictEqual(blobPuts[0].body.src, 'llms');
  });

  it('writes nothing for a GET without a title and message', async () => {
    const res = await call({ method: 'GET', query: '' });
    assert.strictEqual(res.statusCode, 400);
    assert.ok(res.body.usage);
    assert.strictEqual(blobPuts.length, 0);
  });

  it('parses a JSON body sent without a JSON Content-Type', async () => {
    const res = await call({ body: JSON.stringify(report) });
    assert.strictEqual(res.statusCode, 202);
    assert.strictEqual(blobPuts[0].body.title, report.title);
  });

  it('rejects a body that is not JSON', async () => {
    const res = await call({ body: 'title=x' });
    assert.strictEqual(res.statusCode, 400);
    assert.match(res.body.error, /not valid JSON/);
  });

  it('rejects a body that Vercel could not parse', async () => {
    const request = { method: 'POST', url: '/api/feedback', headers: {} };
    Object.defineProperty(request, 'body', {
      get() {
        throw new Error('Invalid JSON');
      },
    });
    const response = {
      headers: {},
      setHeader() {},
      status(code) {
        this.statusCode = code;
        return this;
      },
      send(b) {
        this.body = JSON.parse(b);
      },
    };
    await load()(request, response);
    assert.strictEqual(response.statusCode, 400);
  });

  it('rejects an oversize body', async () => {
    assert.strictEqual((await call({ body: report, headers: { 'content-length': '9000' } })).statusCode, 413);
    assert.strictEqual((await call({ body: JSON.stringify({ ...report, pad: 'x'.repeat(9000) }) })).statusCode, 413);
    assert.strictEqual(blobPuts.length, 0);
  });

  it('keeps free text out of the runtime log', async () => {
    await call({ body: report });
    assert.ok(!logged.at(-1).includes('Wrong flag'));
    assert.strictEqual(line().status, 202);
    assert.strictEqual(line().category, 'documentation');
  });
});

describe('widget', () => {
  it('stores a rating and returns an amend token', async () => {
    const res = await call({ body: { channel: 'widget', page_url: `${DOCS}/workflows`, rating: 'down' } });
    assert.strictEqual(res.statusCode, 202);
    assert.match(res.body.amend_token, /^[0-9a-f]{32}$/);
    assert.strictEqual(blobPuts[0].body.kind, 'rating');
    assert.strictEqual(blobPuts[0].body.bot_verdict, 'unchecked');
  });

  it('stores an amendment next to the rating', async () => {
    const first = await call({ body: { channel: 'widget', page_url: `${DOCS}/workflows`, rating: 'down' } });
    const { id, amend_token } = first.body;
    const res = await call({
      body: {
        channel: 'widget',
        id,
        amend_token,
        rating: 'down',
        reason: 'code_sample_errors',
        comment: 'Import is wrong.',
      },
    });
    assert.strictEqual(res.statusCode, 202);
    assert.deepStrictEqual(res.body, { id });
    const amendment = blobPuts[1];
    assert.ok(amendment.pathname.startsWith(blobPuts[0].pathname.replace(/\.json$/, '.amend-')));
    assert.strictEqual(amendment.body.kind, 'amendment');
    assert.strictEqual(amendment.body.reason, 'code_sample_errors');
    assert.strictEqual(amendment.body.amend_token, undefined);
  });

  it('refuses an amendment with the wrong token', async () => {
    const first = await call({ body: { channel: 'widget', page_url: '/workflows', rating: 'up' } });
    const res = await call({
      body: { channel: 'widget', id: first.body.id, amend_token: 'f'.repeat(32), rating: 'up' },
    });
    assert.strictEqual(res.statusCode, 403);
    assert.strictEqual(blobPuts.length, 1);
  });

  it('refuses a reason that does not match the rating', async () => {
    const res = await call({ body: { channel: 'widget', page_url: '/workflows', rating: 'up', reason: 'inaccurate' } });
    assert.strictEqual(res.statusCode, 400);
  });

  it('refuses a widget submission sent as GET', async () => {
    const res = await call({ method: 'GET', query: '?channel=widget&page_url=/x&rating=up' });
    assert.strictEqual(res.statusCode, 400);
  });
});

describe('methods and configuration', () => {
  it('returns 405 with Allow for other methods', async () => {
    const res = await call({ method: 'PUT' });
    assert.strictEqual(res.statusCode, 405);
    assert.strictEqual(res.headers.allow, 'GET, POST, OPTIONS');
  });

  it('returns 204 for OPTIONS', async () => {
    assert.strictEqual((await call({ method: 'OPTIONS' })).statusCode, 204);
  });

  for (const name of ENV_KEYS) {
    it(`returns 500 without storing anything when ${name} is unset`, async () => {
      const res = await call({ body: report, env: { [name]: undefined } });
      assert.strictEqual(res.statusCode, 500);
      assert.strictEqual(blobPuts.length, 0);
    });
  }

  it('returns 503 when the Blob write fails', async () => {
    blobFails = true;
    const res = await call({ body: report });
    assert.strictEqual(res.statusCode, 503);
  });

  it('never caches and sends no CORS headers', async () => {
    for (const res of [await call({ body: report }), await call({ method: 'GET' })]) {
      assert.strictEqual(res.headers['cache-control'], 'no-store');
      assert.strictEqual(res.headers['access-control-allow-origin'], undefined);
      assert.strictEqual(res.headers['x-robots-tag'], 'noindex, nofollow');
    }
  });
});
