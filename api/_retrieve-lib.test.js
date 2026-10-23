const { describe, it } = require('node:test');
const assert = require('node:assert');

const { compileRedirects } = require('../bin/redirect-utils');
const { LIMITS, parseParams, toMarkdownUrl, shapeResults } = require('./_retrieve-lib');

const compiled = compileRedirects([
  { source: '/old-page', destination: '/develop/python/workflows/versioning' },
  { source: '/hop-1', destination: '/hop-2' },
  { source: '/hop-2', destination: '/cloud/monitor' },
  { source: '/leadership', destination: 'https://temporal.io/about' },
  { source: '/to-file', destination: '/sitemap.xml' },
]);

describe('toMarkdownUrl', () => {
  const D = 'https://docs.temporal.io';
  const cases = [
    ['plain page', `${D}/develop/python/workflows/versioning`, `${D}/develop/python/workflows/versioning.md`, `${D}/develop/python/workflows/versioning`],
    ['anchor stays on page_url only', `${D}/develop/python/workflows/versioning#patching`, `${D}/develop/python/workflows/versioning.md`, `${D}/develop/python/workflows/versioning#patching`],
    ['trailing slash', `${D}/develop/python/`, `${D}/develop/python.md`, `${D}/develop/python`],
    ['site root', `${D}/`, `${D}/index.md`, `${D}/`],
    ['site root without slash', D, `${D}/index.md`, `${D}/`],
    ['section index', `${D}/develop`, `${D}/develop.md`, `${D}/develop`],
    ['query string dropped', `${D}/workflows?utm_source=x`, `${D}/workflows.md`, `${D}/workflows`],
    ['http upgraded to https', 'http://docs.temporal.io/workflows', `${D}/workflows.md`, `${D}/workflows`],
    ['redirected page', `${D}/old-page#patching`, `${D}/develop/python/workflows/versioning.md`, `${D}/develop/python/workflows/versioning#patching`],
    ['redirect chain', `${D}/hop-1`, `${D}/cloud/monitor.md`, `${D}/cloud/monitor`],
  ];

  for (const [name, input, sourceUrl, pageUrl] of cases) {
    it(name, () => {
      assert.deepStrictEqual(toMarkdownUrl(input, compiled), { source_url: sourceUrl, page_url: pageUrl });
    });
  }

  const unchanged = [
    ['redirect to another site', `${D}/leadership`],
    ['redirect to a file', `${D}/to-file`],
    ['file', `${D}/sitemap.xml`],
    ['tag page', `${D}/tags/python-sdk`],
    ['tag index', `${D}/tags`],
    ['another host', 'https://python.temporal.io/temporalio.workflow.html#patched'],
    ['a subdomain of temporal.io', 'https://learn.temporal.io/getting_started/'],
    ['not a URL', 'community-slack-thread-123'],
  ];

  for (const [name, input] of unchanged) {
    it(`leaves ${name} unchanged`, () => {
      assert.deepStrictEqual(toMarkdownUrl(input, compiled), { source_url: input, page_url: input });
    });
  }
});

describe('shapeResults', () => {
  it('keeps order and content and adds page_url', () => {
    const shaped = shapeResults(
      [
        { content: 'a', source_url: 'https://docs.temporal.io/workflows' },
        { content: 'b', source_url: 'https://github.com/temporalio/sdk-python' },
      ],
      compiled
    );
    assert.deepStrictEqual(shaped, [
      { content: 'a', source_url: 'https://docs.temporal.io/workflows.md', page_url: 'https://docs.temporal.io/workflows' },
      { content: 'b', source_url: 'https://github.com/temporalio/sdk-python', page_url: 'https://github.com/temporalio/sdk-python' },
    ]);
  });
});

describe('parseParams', () => {
  const parse = (query) => parseParams(new URLSearchParams(query));

  it('returns all four parameters', () => {
    assert.deepStrictEqual(parse('q=How+do+I+patch%3F&jtb=Fix+a+bug&src=llms&agent=claude-code'), {
      params: { q: 'How do I patch?', jtb: 'Fix a bug', src: 'llms', agent: 'claude-code' },
    });
  });

  it('sets missing optional parameters to null', () => {
    assert.deepStrictEqual(parse('q=x'), { params: { q: 'x', jtb: null, src: null, agent: null } });
  });

  it('rejects a missing q', () => {
    assert.ok(parse('src=llms').error);
  });

  it('rejects a whitespace-only q', () => {
    assert.ok(parse('q=%20%20').error);
  });

  it('rejects a q over the limit', () => {
    assert.ok(parse(`q=${'a'.repeat(LIMITS.q + 1)}`).error);
    assert.ok(parse(`q=${'a'.repeat(LIMITS.q)}`).params);
  });

  it('keeps an unrecognized src', () => {
    assert.strictEqual(parse('q=x&src=somewhere-else').params.src, 'somewhere-else');
  });

  it('cuts optional parameters to their limits', () => {
    const { params } = parse(`q=x&jtb=${'j'.repeat(400)}&agent=${'a'.repeat(100)}`);
    assert.strictEqual(params.jtb.length, LIMITS.jtb);
    assert.strictEqual(params.agent.length, LIMITS.agent);
  });
});
