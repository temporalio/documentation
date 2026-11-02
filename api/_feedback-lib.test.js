const { describe, it } = require('node:test');
const assert = require('node:assert');
const { compileRedirects } = require('../bin/redirect-utils');
const {
  AMEND_WINDOW_MS,
  amendToken,
  checkAmendment,
  entryPath,
  idTime,
  newId,
  normalizePageUrl,
  parseSubmission,
} = require('./_feedback-lib');

const DOCS = 'https://docs.temporal.io';
const redirects = compileRedirects([
  { source: '/old-page', destination: '/new-page' },
  { source: '/gone', destination: 'https://temporal.io/elsewhere' },
]);

const parse = (input, method = 'POST') => parseSubmission(input, { method, compiledRedirects: redirects });

describe('normalizePageUrl', () => {
  it('maps a .md URL to its HTML page', () => {
    assert.strictEqual(normalizePageUrl(`${DOCS}/workflows.md`, redirects), `${DOCS}/workflows`);
  });

  it('maps /index.md to the home page', () => {
    assert.strictEqual(normalizePageUrl(`${DOCS}/index.md`, redirects), `${DOCS}/`);
  });

  it('accepts a path and drops the query, fragment, and trailing slash', () => {
    assert.strictEqual(normalizePageUrl('/workflows/?x=1#section', redirects), `${DOCS}/workflows`);
  });

  it('follows redirects to the current page', () => {
    assert.strictEqual(normalizePageUrl(`${DOCS}/old-page.md`, redirects), `${DOCS}/new-page`);
  });

  it('keeps the original path when a redirect leaves the site', () => {
    assert.strictEqual(normalizePageUrl('/gone', redirects), `${DOCS}/gone`);
  });

  it('keeps URLs on other hosts as sent', () => {
    assert.strictEqual(
      normalizePageUrl('https://github.com/temporalio/sdk-go/issues/1', redirects),
      'https://github.com/temporalio/sdk-go/issues/1'
    );
  });

  it('rejects values that are not URLs or paths', () => {
    assert.strictEqual(normalizePageUrl('the workflows page', redirects), null);
    assert.strictEqual(normalizePageUrl('javascript:alert(1)', redirects), null);
    assert.strictEqual(normalizePageUrl('ftp://docs.temporal.io/x', redirects), null);
  });
});

describe('agent reports', () => {
  it('parses a report and fills defaults', () => {
    const result = parse({ title: ' Wrong flag ', message: 'The page says --foo; the CLI has --bar.' });
    assert.strictEqual(result.kind, 'report');
    assert.strictEqual(result.fields.title, 'Wrong flag');
    assert.strictEqual(result.fields.category, 'other');
    assert.strictEqual(result.fields.severity, 'medium');
    assert.strictEqual(result.fields.page_url, null);
  });

  it('accepts a GET with the same fields', () => {
    const result = parse({ title: 't', message: 'm', category: 'Product', severity: 'HIGH' }, 'GET');
    assert.strictEqual(result.fields.category, 'product');
    assert.strictEqual(result.fields.severity, 'high');
  });

  it('requires title and message', () => {
    assert.match(parse({ message: 'm' }, 'GET').error, /title/);
    assert.match(parse({ title: 't' }, 'GET').error, /message/);
    assert.match(parse({}, 'GET').error, /title/);
  });

  it('rejects text over its limit instead of cutting it', () => {
    assert.match(parse({ title: 't', message: 'm'.repeat(2001) }).error, /message is 2001 characters/);
  });

  it('cuts metadata over its limit', () => {
    const result = parse({ title: 't', message: 'm', agent: 'a'.repeat(100), src: 's'.repeat(100) });
    assert.strictEqual(result.fields.agent.length, 64);
    assert.strictEqual(result.fields.src.length, 32);
  });

  it('rejects unknown categories and severities', () => {
    assert.match(parse({ title: 't', message: 'm', category: 'bug' }).error, /category must be one of/);
    assert.match(parse({ title: 't', message: 'm', severity: 'urgent' }).error, /severity must be one of/);
  });

  it('rejects fields that are not strings', () => {
    assert.match(parse({ title: 't', message: { text: 'm' } }).error, /message must be a string/);
  });

  it('normalizes page_url and rejects one that is not a URL', () => {
    assert.strictEqual(
      parse({ title: 't', message: 'm', page_url: `${DOCS}/old-page.md` }).fields.page_url,
      `${DOCS}/new-page`
    );
    assert.match(parse({ title: 't', message: 'm', page_url: 'workflows' }).error, /page_url/);
  });

  it('rejects input that is not an object', () => {
    assert.ok(parse(null).error);
    assert.ok(parse([]).error);
    assert.ok(parse('title=t').error);
  });

  it('rejects an unknown channel', () => {
    assert.match(parse({ channel: 'email', title: 't', message: 'm' }).error, /channel/);
  });
});

describe('widget submissions', () => {
  it('parses a rating with no reason', () => {
    const result = parse({ channel: 'widget', page_url: `${DOCS}/workflows`, rating: 'down' });
    assert.deepStrictEqual(result, {
      kind: 'rating',
      fields: { page_url: `${DOCS}/workflows`, rating: 'down', reason: null, comment: null },
    });
  });

  it('accepts POST only', () => {
    assert.match(parse({ channel: 'widget', page_url: '/workflows', rating: 'up' }, 'GET').error, /POST only/);
  });

  it('requires a docs page_url', () => {
    assert.match(parse({ channel: 'widget', rating: 'up' }).error, /page_url is required/);
    assert.match(
      parse({ channel: 'widget', rating: 'up', page_url: 'https://example.com/x' }).error,
      /page_url must be a docs page/
    );
  });

  it('requires a reason that belongs to the rating', () => {
    assert.match(
      parse({ channel: 'widget', page_url: '/x', rating: 'up', reason: 'inaccurate' }).error,
      /reason must be one of: accurate/
    );
    assert.strictEqual(
      parse({ channel: 'widget', page_url: '/x', rating: 'down', reason: 'code_sample_errors' }).kind,
      'rating'
    );
  });

  it('accepts a comment only with a reason', () => {
    assert.match(
      parse({ channel: 'widget', page_url: '/x', rating: 'down', comment: 'hi' }).error,
      /comment needs a reason/
    );
  });

  it('parses an amendment', () => {
    const result = parse({
      channel: 'widget',
      id: 'abc',
      amend_token: 'tok',
      rating: 'down',
      reason: 'other',
      comment: 'x',
    });
    assert.strictEqual(result.kind, 'amendment');
    assert.deepStrictEqual(result.fields, {
      id: 'abc',
      amend_token: 'tok',
      rating: 'down',
      reason: 'other',
      comment: 'x',
    });
  });

  it('needs both id and amend_token for an amendment', () => {
    assert.match(parse({ channel: 'widget', id: 'abc', rating: 'up' }).error, /both id and amend_token/);
  });
});

describe('entry IDs and amendments', () => {
  const issued = new Date('2026-10-26T15:30:12.345Z');
  const id = newId(issued);

  it('encodes the issue time', () => {
    assert.match(id, /^20261026T153012345Z-[0-9a-f]{8}$/);
    assert.strictEqual(idTime(id), issued.getTime());
    assert.strictEqual(idTime('not-an-id'), null);
  });

  it('puts an amendment next to its entry', () => {
    assert.strictEqual(entryPath(id), `feedback/2026-10-26/${id}.json`);
    const amended = entryPath(id, new Date('2026-10-27T00:05:00.000Z'));
    assert.match(amended, new RegExp(`^feedback/2026-10-26/${id}\\.amend-20261027T000500000Z-[0-9a-f]{8}\\.json$`));
  });

  it('accepts the right token inside the window', () => {
    assert.strictEqual(checkAmendment(id, amendToken(id, 'salt'), 'salt', issued.getTime() + 1000), null);
  });

  it('rejects a wrong token, another salt, or a malformed ID', () => {
    const now = issued.getTime() + 1000;
    assert.strictEqual(checkAmendment(id, 'f'.repeat(32), 'salt', now).status, 403);
    assert.strictEqual(checkAmendment(id, amendToken(id, 'other'), 'salt', now).status, 403);
    assert.strictEqual(checkAmendment('bad', amendToken('bad', 'salt'), 'salt', now).status, 403);
    assert.strictEqual(checkAmendment(id, 'short', 'salt', now).status, 403);
  });

  it('rejects an amendment after the window', () => {
    const late = checkAmendment(id, amendToken(id, 'salt'), 'salt', issued.getTime() + AMEND_WINDOW_MS + 1);
    assert.match(late.error, /no longer be changed/);
  });
});
