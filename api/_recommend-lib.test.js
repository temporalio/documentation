const { describe, it } = require('node:test');
const assert = require('node:assert');
const { compileRedirects } = require('../bin/redirect-utils');
const { parseAllowlist } = require('./_retrieve-lib');
const { DEFAULT_LIMIT, MAX_LIMIT, parseParams, toCards, typeForPath } = require('./_recommend-lib');

const DOCS = 'https://docs.temporal.io';
const allowlist = parseAllowlist(['docs.temporal.io', 'temporal.io/blog']);
const manifest = {
  '/guides/route-specialized-workloads': { title: 'Route GPU Activities', description: 'Give GPU Activities their own Task Queues.' },
  '/develop/python/workflows/versioning': { title: 'Versioning - Python SDK', description: 'Patch Workflows.' },
  '/quickstarts': { title: 'Quickstarts', description: 'Start here.' },
  '/references/errors': { title: 'Errors', description: 'Error reference.' },
  '/workflows': { title: 'Workflows', description: 'What a Workflow is.' },
};
const compiledRedirects = compileRedirects([{ source: '/old-versioning', destination: '/develop/python/workflows/versioning' }]);

const hit = (url, content = 'passage') => ({ content, source_url: url });
const cards = (results, limit = 10) => toCards(results, { allowlist, manifest, compiledRedirects, limit });

describe('parseParams', () => {
  const parse = (query) => parseParams(new URLSearchParams(query));

  it('requires q', () => {
    assert.ok(parse('').error);
    assert.ok(parse('q=%20').error);
  });

  it('rejects a q over the limit', () => {
    assert.ok(parse(`q=${'a'.repeat(501)}`).error);
  });

  it('defaults limit and src', () => {
    assert.deepStrictEqual(parse('q=python').params, { q: 'python', limit: DEFAULT_LIMIT, src: 'cloud-ui', agent: null });
  });

  it('accepts a whole-number limit from 1 to the maximum', () => {
    assert.strictEqual(parse('q=x&limit=3').params.limit, 3);
    assert.strictEqual(parse(`q=x&limit=${MAX_LIMIT}`).params.limit, MAX_LIMIT);
  });

  it('rejects a limit that is out of range or not a whole number', () => {
    for (const limit of ['0', `${MAX_LIMIT + 1}`, '2.5', 'abc', '-1']) {
      assert.ok(parse(`q=x&limit=${limit}`).error, limit);
    }
  });

  it('cuts src and agent to their limits', () => {
    const { params } = parse(`q=x&src=${'s'.repeat(40)}&agent=${'a'.repeat(80)}`);
    assert.strictEqual(params.src.length, 32);
    assert.strictEqual(params.agent.length, 64);
  });
});

describe('typeForPath', () => {
  it('maps sections to a type and label', () => {
    assert.deepStrictEqual(typeForPath('/guides/x'), { type: 'guide', type_label: 'Guide' });
    assert.deepStrictEqual(typeForPath('/quickstarts'), { type: 'tutorial', type_label: 'Tutorial' });
    assert.deepStrictEqual(typeForPath('/develop/python/x'), { type: 'how-to', type_label: 'How-to' });
    assert.deepStrictEqual(typeForPath('/references/errors'), { type: 'reference', type_label: 'Reference' });
    assert.deepStrictEqual(typeForPath('/cli/workflow'), { type: 'reference', type_label: 'Reference' });
  });

  it('falls back to Docs', () => {
    assert.deepStrictEqual(typeForPath('/workflows'), { type: 'docs', type_label: 'Docs' });
  });

  it('matches whole path segments only', () => {
    assert.strictEqual(typeForPath('/guides-archive/x').type, 'docs');
    assert.strictEqual(typeForPath('/guides').type, 'guide');
  });
});

describe('toCards', () => {
  it('builds a card from the manifest and keeps Kapa order', () => {
    const { cards: out } = cards([hit(`${DOCS}/workflows`), hit(`${DOCS}/guides/route-specialized-workloads`)]);
    assert.deepStrictEqual(out, [
      { title: 'Workflows', description: 'What a Workflow is.', type: 'docs', type_label: 'Docs', url: `${DOCS}/workflows` },
      {
        title: 'Route GPU Activities',
        description: 'Give GPU Activities their own Task Queues.',
        type: 'guide',
        type_label: 'Guide',
        url: `${DOCS}/guides/route-specialized-workloads`,
      },
    ]);
  });

  it('returns one card per page, even when passages and anchors differ', () => {
    const { cards: out, skipped } = cards([
      hit(`${DOCS}/workflows#a`),
      hit(`${DOCS}/workflows#b`),
      hit(`${DOCS}/workflows`),
    ]);
    assert.strictEqual(out.length, 1);
    assert.strictEqual(out[0].url, `${DOCS}/workflows`);
    assert.strictEqual(skipped, 0);
  });

  it('follows redirects before the manifest lookup', () => {
    const { cards: out } = cards([hit(`${DOCS}/old-versioning#patching`)]);
    assert.strictEqual(out[0].url, `${DOCS}/develop/python/workflows/versioning`);
  });

  it('honors the limit', () => {
    const { cards: out } = cards([hit(`${DOCS}/workflows`), hit(`${DOCS}/quickstarts`), hit(`${DOCS}/references/errors`)], 2);
    assert.strictEqual(out.length, 2);
  });

  it('skips pages missing from the manifest, other hosts, and custom Q&A answers', () => {
    const { cards: out, skipped } = cards([
      hit(`${DOCS}/tags/workflows`),
      hit(`${DOCS}/sitemap.xml`),
      hit('https://temporal.io/blog/some-post'),
      hit(''),
      hit('https://example.com/x'),
      hit(`${DOCS}/workflows`),
    ]);
    assert.deepStrictEqual(out.map((card) => card.url), [`${DOCS}/workflows`]);
    assert.strictEqual(skipped, 5);
  });

  it('ignores malformed results', () => {
    const { cards: out } = cards([null, { content: 1, source_url: `${DOCS}/workflows` }, hit(`${DOCS}/workflows`)]);
    assert.strictEqual(out.length, 1);
  });

  it('never includes passage text', () => {
    const { cards: out } = cards([hit(`${DOCS}/workflows`, 'SECRET PASSAGE')]);
    assert.ok(!JSON.stringify(out).includes('SECRET PASSAGE'));
  });
});
