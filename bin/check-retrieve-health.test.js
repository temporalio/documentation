const { describe, it } = require('node:test');
const assert = require('node:assert');
const { CHECKS, evaluate } = require('./check-retrieve-health.js');

const [customQa, github] = CHECKS;
const DOCS = 'https://docs.temporal.io';

const pages = (count) => Array.from({ length: count }, (_, i) => ({ content: 'x', source_url: `${DOCS}/p${i}.md` }));
const ok = (body) => ({ status: 200, body });

describe('evaluate', () => {
  it('passes when the expected kind of result is there', () => {
    assert.deepStrictEqual(evaluate(customQa, ok([{ content: 'A', source_url: '' }, ...pages(5)])), []);
    assert.deepStrictEqual(
      evaluate(
        github,
        ok([{ content: 'R', source_url: 'https://github.com/temporalio/sdk-rust/blob/main/README.md' }, ...pages(4)])
      ),
      []
    );
  });

  it('fails a 502 and points at the runtime log line', () => {
    const problems = evaluate(customQa, { status: 502, body: { error: 'Search is unavailable. Try again later.' } });
    assert.strictEqual(problems.length, 1);
    assert.match(problems[0], /^HTTP 502: .*Search is unavailable/);
    assert.match(problems[0], /retrieve: Kapa returned/);
  });

  it('fails a request that never got a response', () => {
    assert.deepStrictEqual(evaluate(customQa, { error: 'The operation was aborted due to timeout' }), [
      'Request failed: The operation was aborted due to timeout',
    ]);
  });

  it('fails a body that is not an array', () => {
    assert.deepStrictEqual(evaluate(customQa, ok({ detail: 'nope' })), ['The response is not a JSON array.']);
  });

  // What production returned on 2026-11-02, after Kapa started applying the
  // source ID filter: plenty of results, all from web crawl sources.
  it('fails when only web crawl results come back', () => {
    const problems = evaluate(customQa, ok(pages(15)));
    assert.strictEqual(problems.length, 1);
    assert.match(problems[0], /^No result is a custom Q&A answer/);
    assert.match(evaluate(github, ok(pages(15)))[0], /^No result is a file in a github\.com\/temporalio repository/);
  });

  it('fails too few results, and reports each problem', () => {
    const problems = evaluate(customQa, ok(pages(2)));
    assert.deepStrictEqual(problems.length, 2);
    assert.strictEqual(problems[0], '2 results, expected at least 5.');
  });

  it('ignores malformed results instead of throwing', () => {
    assert.strictEqual(evaluate(github, ok([null, 'text', { content: 'no url' }, ...pages(5)])).length, 1);
  });

  // Production returned these under the source filter, from the release notes
  // web crawl, while the repository files were gone.
  it("doesn't count a GitHub release page", () => {
    const body = [
      { content: 'x', source_url: 'https://github.com/temporalio/sdk-python/releases/tag/1.35.0' },
      ...pages(5),
    ];
    assert.strictEqual(evaluate(github, ok(body)).length, 1);
  });

  it("doesn't count a github.com link outside temporalio", () => {
    const body = [{ content: 'x', source_url: 'https://github.com/someone/fork/blob/main/README.md' }, ...pages(5)];
    assert.strictEqual(evaluate(github, ok(body)).length, 1);
  });
});
