const { describe, it } = require('node:test');
const assert = require('node:assert');
const { docPermalink, checkDoc, annotationLine } = require('./check-index-slugs.js');

describe('docPermalink', () => {
  it('gives an index.mdx without a slug a trailing slash', () => {
    assert.strictEqual(docPermalink('best-practices/index.mdx', {}), '/best-practices/');
  });

  it('treats README and a file named after its folder as index pages', () => {
    assert.strictEqual(docPermalink('foo/README.md', {}), '/foo/');
    assert.strictEqual(docPermalink('foo/Readme.mdx', {}), '/foo/');
    assert.strictEqual(
      docPermalink('encyclopedia/event-history/event-history.mdx', { id: 'event-history' }),
      '/encyclopedia/event-history/'
    );
  });

  it('decides index pages by file name, not frontmatter id', () => {
    assert.strictEqual(
      docPermalink('develop/java/best-practices/data-handling/index.mdx', { id: 'data-handling' }),
      '/develop/java/best-practices/data-handling/'
    );
  });

  it('serves the docs root at /', () => {
    assert.strictEqual(docPermalink('index.mdx', { id: 'index' }), '/');
  });

  it('uses an absolute slug as written', () => {
    assert.strictEqual(docPermalink('guides/index.mdx', { slug: '/guides' }), '/guides');
    assert.strictEqual(
      docPermalink('cloud/get-started/index.mdx', { slug: '/cloud/get-started/' }),
      '/cloud/get-started/'
    );
  });

  it('resolves a relative slug against the folder', () => {
    assert.strictEqual(docPermalink('foo/index.mdx', { slug: 'bar' }), '/foo/bar');
    assert.strictEqual(docPermalink('foo/bar.mdx', { slug: 'baz/' }), '/foo/baz/');
  });

  it('gives an ordinary page no trailing slash', () => {
    assert.strictEqual(docPermalink('foo/bar.mdx', {}), '/foo/bar');
    assert.strictEqual(docPermalink('foo/bar.mdx', { id: 'baz' }), '/foo/baz');
  });

  it('strips number prefixes unless frontmatter turns that off', () => {
    assert.strictEqual(docPermalink('01-foo/02-bar.mdx', {}), '/foo/bar');
    assert.strictEqual(docPermalink('01-foo/index.mdx', {}), '/foo/');
    assert.strictEqual(docPermalink('01-foo/02-bar.mdx', { parse_number_prefixes: false }), '/01-foo/02-bar');
  });
});

describe('checkDoc', () => {
  it('suggests adding a slug to an index page that has none', () => {
    assert.deepStrictEqual(checkDoc('develop/go/index.mdx', {}), {
      permalink: '/develop/go/',
      fix: 'Add `slug: /develop/go` to the frontmatter.',
    });
  });

  it('suggests dropping the slash from a slug that sets one', () => {
    assert.deepStrictEqual(checkDoc('cloud/manage-access/index.mdx', { slug: '/cloud/manage-access/' }), {
      permalink: '/cloud/manage-access/',
      fix: 'Change `slug: /cloud/manage-access/` to `slug: /cloud/manage-access`.',
    });
  });

  it('suggests an absolute slug for a relative one that ends in a slash', () => {
    assert.strictEqual(checkDoc('foo/bar.mdx', { slug: 'baz/' }).fix, 'Change `slug: baz/` to `slug: /foo/baz`.');
  });

  it('passes an index page with a slug, an ordinary page, and the docs root', () => {
    assert.strictEqual(checkDoc('guides/index.mdx', { slug: '/guides' }), null);
    assert.strictEqual(checkDoc('foo/bar.mdx', {}), null);
    assert.strictEqual(checkDoc('index.mdx', { id: 'index' }), null);
  });
});

describe('annotationLine', () => {
  it('points at the slug line when there is one', () => {
    assert.strictEqual(annotationLine('---\nid: index\ntitle: Foo\nslug: /foo/\n---\n\nBody'), 4);
  });

  it('points at the title line when there is no slug', () => {
    assert.strictEqual(annotationLine('---\nid: index\ntitle: Foo\n---\n\nslug: not frontmatter'), 3);
  });

  it('handles CRLF line endings', () => {
    assert.strictEqual(annotationLine('---\r\nid: index\r\ntitle: Foo\r\n---\r\n'), 3);
  });

  it('falls back to line 1 without frontmatter', () => {
    assert.strictEqual(annotationLine('# Foo\n\nslug: /foo/'), 1);
  });
});
