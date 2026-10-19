const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { applyDefaults, DEFAULTS_FILENAME } = require('./frontmatterDefaults');

let root;
let cache;

function write(relPath, content = '') {
  const full = path.join(root, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
  return full;
}

function apply(relDoc, frontMatter, extra = {}) {
  return applyDefaults(path.join(root, relDoc), frontMatter, { rootDir: root, cache, ...extra });
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'frontmatter-defaults-'));
  cache = new Map();
});

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

describe('applyDefaults', () => {
  it('returns the frontmatter unchanged when no defaults file exists', () => {
    const fm = { tags: ['A'] };
    assert.deepStrictEqual(apply('docs/page.mdx', fm), { tags: ['A'] });
  });

  it('adds the folder tags to a page without tags', () => {
    write(`docs/java/${DEFAULTS_FILENAME}`, 'tags:\n  - Java SDK\n');
    assert.deepStrictEqual(apply('docs/java/page.mdx', { title: 'T' }), { title: 'T', tags: ['Java SDK'] });
  });

  it('puts folder tags before the page tags', () => {
    write(`docs/java/${DEFAULTS_FILENAME}`, 'tags: [Java SDK]\n');
    assert.deepStrictEqual(apply('docs/java/page.mdx', { tags: ['Workflows'] }).tags, ['Java SDK', 'Workflows']);
  });

  it('accepts a page whose tags is a single string', () => {
    write(`docs/java/${DEFAULTS_FILENAME}`, 'tags: [Java SDK]\n');
    assert.deepStrictEqual(apply('docs/java/page.mdx', { tags: 'Workflows' }).tags, ['Java SDK', 'Workflows']);
  });

  it('unions tags from outermost folder to nearest, then the page', () => {
    write(`docs/${DEFAULTS_FILENAME}`, 'tags: [Root]\n');
    write(`docs/java/${DEFAULTS_FILENAME}`, 'tags: [Java SDK]\n');
    write(`docs/java/workflows/${DEFAULTS_FILENAME}`, 'tags: [Workflows]\n');
    assert.deepStrictEqual(apply('docs/java/workflows/page.mdx', { tags: ['Page'] }).tags, [
      'Root',
      'Java SDK',
      'Workflows',
      'Page',
    ]);
  });

  it('drops duplicates across levels, including object-form tags', () => {
    write(`docs/${DEFAULTS_FILENAME}`, 'tags: [Java SDK]\n');
    write(`docs/java/${DEFAULTS_FILENAME}`, 'tags: [Java SDK, Temporal SDKs]\n');
    const result = apply('docs/java/page.mdx', {
      tags: [{ label: 'Temporal SDKs', permalink: 'temporal-sdks' }, 'Java SDK', 'Other'],
    });
    assert.deepStrictEqual(result.tags, ['Java SDK', 'Temporal SDKs', 'Other']);
  });

  it('does not apply a defaults file from a sibling folder', () => {
    write(`docs/go/${DEFAULTS_FILENAME}`, 'tags: [Go SDK]\n');
    assert.deepStrictEqual(apply('docs/java/page.mdx', {}), {});
  });

  it('stops looking above rootDir', () => {
    write(`${DEFAULTS_FILENAME}`, 'tags: [Outside]\n');
    const inner = path.join(root, 'docs');
    const result = applyDefaults(path.join(inner, 'page.mdx'), {}, { rootDir: inner, cache });
    assert.deepStrictEqual(result, {});
  });

  it('does not modify the input object', () => {
    write(`docs/${DEFAULTS_FILENAME}`, 'tags: [A]\n');
    const fm = { tags: ['B'] };
    apply('docs/page.mdx', fm);
    assert.deepStrictEqual(fm, { tags: ['B'] });
  });

  it('treats an empty defaults file as no defaults', () => {
    write(`docs/${DEFAULTS_FILENAME}`, '');
    assert.deepStrictEqual(apply('docs/page.mdx', { tags: ['A'] }), { tags: ['A'] });
  });

  it('lets the page win for a key declared as replace', () => {
    write(`docs/${DEFAULTS_FILENAME}`, 'unlisted: true\n');
    write(`docs/a/${DEFAULTS_FILENAME}`, 'unlisted: false\n');
    const keys = { unlisted: { merge: 'replace' } };
    assert.deepStrictEqual(apply('docs/a/page.mdx', {}, { keys }), { unlisted: false });
    assert.deepStrictEqual(apply('docs/a/page.mdx', { unlisted: true }, { keys }), { unlisted: true });
  });

  it('inherits section_title from the nearest folder, and the page wins', () => {
    write(`docs/${DEFAULTS_FILENAME}`, 'section_title: Docs\n');
    write(`docs/java/${DEFAULTS_FILENAME}`, 'section_title: Java SDK\n');
    assert.strictEqual(apply('docs/java/workflows/page.mdx', {}).section_title, 'Java SDK');
    assert.strictEqual(apply('docs/java/page.mdx', { section_title: 'Custom' }).section_title, 'Custom');
    assert.strictEqual(apply('docs/other/page.mdx', {}).section_title, 'Docs');
  });

  it('sets tags and section_title from the same file', () => {
    write(`docs/java/${DEFAULTS_FILENAME}`, 'tags: [Java SDK]\nsection_title: Java SDK\n');
    assert.deepStrictEqual(apply('docs/java/page.mdx', { title: 'T' }), {
      title: 'T',
      tags: ['Java SDK'],
      section_title: 'Java SDK',
    });
  });

  it('throws when section_title is not a non-empty string', () => {
    write(`docs/${DEFAULTS_FILENAME}`, 'section_title: [a]\n');
    assert.throws(() => apply('docs/page.mdx', {}), /must set "section_title" as a non-empty string/);
    write(`docs/b/${DEFAULTS_FILENAME}`, 'section_title: ""\n');
    assert.throws(() => apply('docs/b/page.mdx', {}), /must set "section_title" as a non-empty string/);
  });

  it('throws for a key that is not inheritable, naming the file and key', () => {
    const file = write(`docs/${DEFAULTS_FILENAME}`, 'slug: /x\n');
    assert.throws(() => apply('docs/page.mdx', {}), (error) => {
      assert.match(error.message, new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      assert.match(error.message, /"slug"/);
      return true;
    });
  });

  it('throws when tags is not a list', () => {
    write(`docs/${DEFAULTS_FILENAME}`, 'tags: Java SDK\n');
    assert.throws(() => apply('docs/page.mdx', {}), /must set "tags" as a list/);
  });

  it('throws when the file is not a mapping', () => {
    write(`docs/${DEFAULTS_FILENAME}`, '- a\n- b\n');
    assert.throws(() => apply('docs/page.mdx', {}), /must be a YAML mapping/);
  });

  it('throws on invalid YAML, naming the file', () => {
    write(`docs/${DEFAULTS_FILENAME}`, 'tags: [unclosed\n');
    assert.throws(() => apply('docs/page.mdx', {}), /Invalid YAML in .*_frontmatter\.yml/);
  });

  it('picks up an edit to the defaults file', () => {
    const file = write(`docs/${DEFAULTS_FILENAME}`, 'tags: [A]\n');
    assert.deepStrictEqual(apply('docs/page.mdx', {}).tags, ['A']);

    fs.writeFileSync(file, 'tags: [B]\n');
    const later = new Date(Date.now() + 5000);
    fs.utimesSync(file, later, later);
    assert.deepStrictEqual(apply('docs/page.mdx', {}).tags, ['B']);
  });
});
