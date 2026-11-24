const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const Module = require('node:module');

// Tests for the request handler in api/feedback-digest.js, with Blob, the
// sitemap fetch, and the Slack webhook stubbed.

const HANDLER_PATH = require.resolve('./feedback-digest');
const LOG_PATH = require.resolve('./_log');
const DOCS = 'https://docs.temporal.io';
const WEBHOOK = 'https://hooks.slack.test/feedback';

const BASE_ENV = {
  CRON_SECRET: 'cron-secret',
  FEEDBACK_BLOB_READ_WRITE_TOKEN: 'feedback-token',
  SLACK_FEEDBACK_WEBHOOK: WEBHOOK,
};
const ENV_KEYS = Object.keys(BASE_ENV);

const originalLoad = Module._load;
const originalFetch = global.fetch;
const originalLog = console.log;
const originalError = console.error;
const originalEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

let blobs;
let listCalls;
let slackPosts;
let slackStatus;
let sitemapFails;

beforeEach(() => {
  blobs = {};
  listCalls = [];
  slackPosts = [];
  slackStatus = 200;
  sitemapFails = false;

  Module._load = function load(request, ...rest) {
    if (request === '@vercel/blob') {
      return {
        list: async ({ prefix, token }) => {
          listCalls.push({ prefix, token });
          return {
            blobs: Object.keys(blobs)
              .filter((p) => p.startsWith(prefix))
              .map((pathname) => ({ pathname })),
            hasMore: false,
          };
        },
        get: async (pathname, { token }) => {
          assert.strictEqual(token, 'feedback-token');
          if (blobs[pathname] === 'unreadable') throw new Error('gone');
          return { stream: new Response(JSON.stringify(blobs[pathname])).body };
        },
        put: async () => {},
      };
    }
    return originalLoad.call(this, request, ...rest);
  };
  global.fetch = async (url, init = {}) => {
    if (String(url).endsWith('/sitemap.xml')) {
      if (sitemapFails) throw new Error('offline');
      return new Response(`<urlset><url><loc>${DOCS}/cli</loc></url><url><loc>${DOCS}/workflows</loc></url></urlset>`);
    }
    if (url === WEBHOOK) {
      slackPosts.push(JSON.parse(init.body));
      return new Response('ok', { status: slackStatus });
    }
    throw new Error(`unexpected fetch ${url}`);
  };
  console.log = () => {};
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

async function call({ method = 'GET', query = '?date=2026-11-03', auth = 'Bearer cron-secret', env = {} } = {}) {
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  delete require.cache[HANDLER_PATH];
  delete require.cache[LOG_PATH];
  const handler = require('./feedback-digest');
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
      this.body = JSON.parse(sent);
    },
  };
  await handler(
    { method, url: `/api/feedback-digest${query}`, headers: auth ? { authorization: auth } : {} },
    response
  );
  return response;
}

const store = (day, name, record) => {
  blobs[`feedback/${day}/${name}.json`] = { deployment: 'production', ...record };
};
const text = (message) => message.blocks.map((b) => (b.text ? b.text.text : '')).join('\n');

describe('access', () => {
  it('refuses a request without the cron secret', async () => {
    assert.strictEqual((await call({ auth: null })).statusCode, 401);
    assert.strictEqual((await call({ auth: 'Bearer wrong-secret' })).statusCode, 401);
    assert.strictEqual(slackPosts.length, 0);
  });

  it('fails closed when CRON_SECRET is unset', async () => {
    const res = await call({ env: { CRON_SECRET: undefined }, auth: 'Bearer ' });
    assert.strictEqual(res.statusCode, 500);
  });

  it('returns 405 for other methods', async () => {
    const res = await call({ method: 'POST' });
    assert.strictEqual(res.statusCode, 405);
    assert.strictEqual(res.headers.allow, 'GET');
  });

  it('rejects a malformed date', async () => {
    assert.strictEqual((await call({ query: '?date=yesterday' })).statusCode, 400);
  });

  it('fails closed without the Slack webhook unless it is a dry run', async () => {
    assert.strictEqual((await call({ env: { SLACK_FEEDBACK_WEBHOOK: undefined } })).statusCode, 500);
    const dry = await call({ env: { SLACK_FEEDBACK_WEBHOOK: undefined }, query: '?date=2026-11-03&dry_run=1' });
    assert.strictEqual(dry.statusCode, 200);
  });
});

describe('digest', () => {
  it("posts the day's feedback to Slack from the feedback store", async () => {
    store('2026-11-03', 'r1', {
      kind: 'report',
      title: 'Wrong flag',
      category: 'documentation',
      page_url: `${DOCS}/cli`,
    });
    store('2026-11-03', 'w1', { kind: 'rating', id: 'w1', page_url: `${DOCS}/workflows`, rating: 'down' });
    store('2026-11-02', 'old', { kind: 'report', title: 'Yesterday', category: 'product' });

    const res = await call();
    assert.strictEqual(res.statusCode, 200);
    assert.deepStrictEqual(res.body, { date: '2026-11-03', reports: 1, pages_rated: 1, posted: true });
    assert.deepStrictEqual(listCalls, [{ prefix: 'feedback/2026-11-03/', token: 'feedback-token' }]);
    assert.strictEqual(slackPosts.length, 1);
    assert.match(slackPosts[0].text, /Docs feedback for 2026-11-03: 1 agent report, 1 page rating/);
    assert.ok(!text(slackPosts[0]).includes('Yesterday'));
  });

  it('posts on a day with no feedback', async () => {
    const res = await call();
    assert.strictEqual(res.statusCode, 200);
    assert.match(slackPosts[0].text, /No feedback/);
  });

  it('returns the message without posting on a dry run', async () => {
    store('2026-11-03', 'r1', { kind: 'report', title: 'Wrong flag', category: 'documentation' });
    const res = await call({ query: '?date=2026-11-03&dry_run=1' });
    assert.strictEqual(res.body.posted, false);
    assert.match(res.body.message.text, /1 agent report/);
    assert.strictEqual(slackPosts.length, 0);
  });

  it('counts preview records only when asked', async () => {
    store('2026-11-03', 'r1', { kind: 'report', title: 'Preview test', category: 'other', deployment: 'preview' });
    assert.strictEqual((await call({ query: '?date=2026-11-03&dry_run=1' })).body.reports, 0);
    assert.strictEqual((await call({ query: '?date=2026-11-03&dry_run=1&include_preview=1' })).body.reports, 1);
  });

  it('adds the seven-day rollup for a Sunday', async () => {
    store('2026-10-27', 'w1', { kind: 'rating', id: 'w1', page_url: `${DOCS}/workflows`, rating: 'down' });
    const res = await call({ query: '?date=2026-11-01&dry_run=1' });
    assert.strictEqual(listCalls.length, 7);
    assert.strictEqual(res.body.pages_rated, 0, 'the daily section covers only Sunday');
    assert.match(text(res.body.message), /Last 7 days[\s\S]*\/workflows>: No 1/);
  });

  it('skips unreadable records and says how many', async () => {
    store('2026-11-03', 'r1', { kind: 'report', title: 'Wrong flag', category: 'documentation' });
    blobs['feedback/2026-11-03/bad.json'] = 'unreadable';
    const res = await call({ query: '?date=2026-11-03&dry_run=1' });
    assert.strictEqual(res.body.reports, 1);
    assert.match(text(res.body.message), /1 record couldn't be read/);
  });

  it('still posts when the sitemap cannot be fetched', async () => {
    sitemapFails = true;
    const res = await call();
    assert.strictEqual(res.statusCode, 200);
    assert.match(text(slackPosts[0]), /sitemap couldn't be fetched/);
  });

  it('returns 502 when Slack rejects the post', async () => {
    slackStatus = 500;
    const res = await call();
    assert.strictEqual(res.statusCode, 502);
  });
});
