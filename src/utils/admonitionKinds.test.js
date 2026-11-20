const { describe, it } = require('node:test');
const assert = require('node:assert');
const { ADMONITION_KINDS, ADMONITION_KEYWORD_KINDS, resolveAdmonitionKind } = require('./admonitionKinds');

describe('resolveAdmonitionKind', () => {
  it('renders note, info, and important as Note', () => {
    for (const keyword of ['note', 'info', 'important']) {
      assert.deepStrictEqual(resolveAdmonitionKind(keyword), { kind: 'note', known: true }, keyword);
    }
  });

  it('renders warning and danger as Warning', () => {
    for (const keyword of ['warning', 'danger']) {
      assert.deepStrictEqual(resolveAdmonitionKind(keyword), { kind: 'warning', known: true }, keyword);
    }
  });

  it('keeps tip and caution as their own kinds', () => {
    assert.strictEqual(resolveAdmonitionKind('tip').kind, 'tip');
    assert.strictEqual(resolveAdmonitionKind('caution').kind, 'caution');
  });

  it('maps the Docusaurus built-in secondary and success keywords', () => {
    assert.strictEqual(resolveAdmonitionKind('secondary').kind, 'note');
    assert.strictEqual(resolveAdmonitionKind('success').kind, 'tip');
  });

  it('falls back to Note for an unknown keyword, and says so', () => {
    assert.deepStrictEqual(resolveAdmonitionKind('competency'), { kind: 'note', known: false });
    assert.deepStrictEqual(resolveAdmonitionKind(undefined), { kind: 'note', known: false });
  });

  it('maps every keyword to one of the four kinds', () => {
    for (const [keyword, kind] of Object.entries(ADMONITION_KEYWORD_KINDS)) {
      assert.ok(ADMONITION_KINDS.includes(kind), `${keyword} maps to ${kind}`);
    }
  });
});
