const { describe, it } = require('node:test');
const assert = require('node:assert');
const { extractConsoleLinks } = require('./check-cloud-console-links.js');

describe('extractConsoleLinks', () => {
  it('finds both copies of a [url](url) Markdown link, with line numbers', () => {
    const text = 'Intro\nCreate one in the UI: [https://cloud.temporal.io/Namespaces](https://cloud.temporal.io/Namespaces).';
    assert.deepStrictEqual(extractConsoleLinks(text), [
      { url: 'https://cloud.temporal.io/Namespaces', line: 2 },
      { url: 'https://cloud.temporal.io/Namespaces', line: 2 },
    ]);
  });

  it('drops the query string and fragment, which pick a tab rather than a page', () => {
    assert.deepStrictEqual(
      extractConsoleLinks('[Identities](https://cloud.temporal.io/identities?tab=groups&type=group)'),
      [{ url: 'https://cloud.temporal.io/identities', line: 1 }],
    );
  });

  it('drops trailing sentence punctuation from a bare URL', () => {
    assert.deepStrictEqual(extractConsoleLinks('Go to https://cloud.temporal.io/keys.'), [
      { url: 'https://cloud.temporal.io/keys', line: 1 },
    ]);
  });

  it('treats the bare host as the root page', () => {
    assert.deepStrictEqual(extractConsoleLinks('Sign in at https://cloud.temporal.io'), [
      { url: 'https://cloud.temporal.io/', line: 1 },
    ]);
  });

  it('ignores other temporal.io hosts', () => {
    assert.deepStrictEqual(extractConsoleLinks('See https://docs.temporal.io/cloud and https://temporal.io/cloud'), []);
  });
});
