const { describe, it } = require('node:test');
const assert = require('node:assert');
const {
  stripAnsi,
  parseBuildFailure,
  isEmpty,
  buildComment,
} = require('./parse-build-failure.js');

describe('stripAnsi', () => {
  it('removes color escape codes', () => {
    assert.strictEqual(stripAnsi('\x1B[31mred text\x1B[39m'), 'red text');
  });

  it('leaves plain text untouched', () => {
    assert.strictEqual(stripAnsi('plain text'), 'plain text');
  });
});

describe('parseBuildFailure', () => {
  it('extracts a broken anchor with its source page and target', () => {
    const log = `[ERROR] Error: Unable to build website for locale en.
  [cause]: Error: Docusaurus found broken anchors!

  Exhaustive list of all broken anchors found:
  - Broken anchor on source page path = /visibility:
     -> linking to /references/operation-list#operations

      at throwError (/vercel/path1/node_modules/@docusaurus/logger/lib/logger.js:80:11)
`;
    const findings = parseBuildFailure(log);
    assert.deepStrictEqual(findings.brokenAnchors, [
      { sourcePage: '/visibility', target: '/references/operation-list#operations' },
    ]);
    assert.strictEqual(findings.brokenLinks.length, 0);
  });

  it('extracts multiple broken links on the same page', () => {
    const log = `Exhaustive list of all broken links found:
- Broken link on source page path = /some-page:
   -> linking to /missing-one
   -> linking to /missing-two
`;
    const findings = parseBuildFailure(log);
    assert.deepStrictEqual(findings.brokenLinks, [
      { sourcePage: '/some-page', target: '/missing-one' },
      { sourcePage: '/some-page', target: '/missing-two' },
    ]);
  });

  it('extracts MDX compilation errors', () => {
    const log = `MDX compilation failed for file "docs/foo.mdx"
Cause: Unexpected character \`<\` before name
Details:
{}`;
    const findings = parseBuildFailure(log);
    assert.deepStrictEqual(findings.mdxErrors, [
      { file: 'docs/foo.mdx', cause: 'Unexpected character `<` before name' },
    ]);
  });

  it('extracts unresolved Markdown links', () => {
    const log = `Markdown link with URL "./missing.md" in source file path "docs/bar.mdx" at line 12 couldn't be resolved.
Make sure it references a local Markdown file that exists within the current plugin.`;
    const findings = parseBuildFailure(log);
    assert.deepStrictEqual(findings.brokenMarkdownLinks, [
      { url: './missing.md', sourceFile: 'docs/bar.mdx' },
    ]);
  });

  it('returns all-empty findings for unrecognized failures', () => {
    const findings = parseBuildFailure('some unrelated webpack stack trace');
    assert.ok(isEmpty(findings));
  });
});

describe('buildComment', () => {
  it('falls back to a log tail when nothing is recognized', () => {
    const log = 'line one\nline two';
    const comment = buildComment(parseBuildFailure(log), log);
    assert.match(comment, /couldn't automatically identify/);
    assert.match(comment, /line one/);
  });

  it('renders a table for broken anchors', () => {
    const log = `- Broken anchor on source page path = /visibility:
   -> linking to /references/operation-list#operations
`;
    const comment = buildComment(parseBuildFailure(log), log);
    assert.match(comment, /### Broken anchors/);
    assert.match(comment, /\/visibility/);
    assert.match(comment, /\/references\/operation-list#operations/);
  });

  it('always includes the marker used to find/update the PR comment', () => {
    const comment = buildComment(parseBuildFailure('anything'), 'anything');
    assert.match(comment, /^<!-- docs-build-check -->/);
  });
});
