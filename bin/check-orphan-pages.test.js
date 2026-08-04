const { describe, it } = require('node:test');
const assert = require('node:assert');
const {
  isExcludedDocPath,
  computeDocId,
  collectIdsFromItems,
  applyBaseline,
} = require('./check-orphan-pages.js');

describe('isExcludedDocPath', () => {
  it('excludes underscore-prefixed files', () => {
    assert.strictEqual(isExcludedDocPath('cloud/manage-access/_custom_role_permissions_table.mdx'), true);
  });

  it('excludes files under an underscore-prefixed directory', () => {
    assert.strictEqual(isExcludedDocPath('_partials/foo.mdx'), true);
    assert.strictEqual(isExcludedDocPath('cloud/_shared/foo.mdx'), true);
  });

  it('excludes anything under a clusters/ directory', () => {
    assert.strictEqual(isExcludedDocPath('cloud/clusters/foo.mdx'), true);
  });

  it('does not exclude an ordinary page', () => {
    assert.strictEqual(isExcludedDocPath('cloud/get-started/index.mdx'), false);
  });

  it('does not exclude a filename that merely contains an underscore', () => {
    assert.strictEqual(isExcludedDocPath('cloud/get_started.mdx'), false);
  });
});

describe('computeDocId', () => {
  it('joins directory and filename for an ordinary page', () => {
    assert.strictEqual(computeDocId('cloud/get-started', 'namespaces', undefined), 'cloud/get-started/namespaces');
  });

  it('keeps a literal "index" segment for index files (unlike a URL slug)', () => {
    assert.strictEqual(computeDocId('cloud/get-started', 'index', undefined), 'cloud/get-started/index');
  });

  it('applies a frontmatter id override in place of the filename', () => {
    assert.strictEqual(computeDocId('cloud', 'rto-rpo', 'rpo-rto'), 'cloud/rpo-rto');
  });

  it('does not prepend "./" for a root-level doc', () => {
    assert.strictEqual(computeDocId('.', 'index', undefined), 'index');
    assert.strictEqual(computeDocId('.', 'quickstarts', undefined), 'quickstarts');
  });
});

describe('collectIdsFromItems', () => {
  it('collects plain string ids', () => {
    const ids = new Set();
    collectIdsFromItems(['index', 'quickstarts'], ids);
    assert.deepStrictEqual([...ids].sort(), ['index', 'quickstarts']);
  });

  it('collects a category link id and recurses into its items', () => {
    const ids = new Set();
    collectIdsFromItems(
      [
        {
          type: 'category',
          label: 'Get started',
          link: { type: 'doc', id: 'cloud/get-started/index' },
          items: ['cloud/get-started/namespaces'],
        },
      ],
      ids,
    );
    assert.deepStrictEqual(
      [...ids].sort(),
      ['cloud/get-started/index', 'cloud/get-started/namespaces'],
    );
  });

  it('ignores link and html items, which have no doc id', () => {
    const ids = new Set();
    collectIdsFromItems([{ type: 'link', label: 'Changelog', href: 'https://temporal.io/change-log' }], ids);
    assert.strictEqual(ids.size, 0);
  });

  it('collects a {type: "doc"} item', () => {
    const ids = new Set();
    collectIdsFromItems([{ type: 'doc', id: 'security' }], ids);
    assert.deepStrictEqual([...ids], ['security']);
  });

  it('ignores a category with no link (no landing page)', () => {
    const ids = new Set();
    collectIdsFromItems(
      [{ type: 'category', label: 'Architecture', items: ['encyclopedia/architecture/how-temporal-works'] }],
      ids,
    );
    assert.deepStrictEqual([...ids], ['encyclopedia/architecture/how-temporal-works']);
  });
});

describe('applyBaseline', () => {
  const orphans = [
    { path: 'docs/a.mdx', docId: 'a' },
    { path: 'docs/b.mdx', docId: 'b' },
  ];

  it('filters out orphans that have a baseline exception', () => {
    const baseline = { exceptions: [{ path: 'docs/a.mdx', note: 'known' }] };
    const { remaining, stale } = applyBaseline(orphans, baseline);
    assert.deepStrictEqual(remaining, [{ path: 'docs/b.mdx', docId: 'b' }]);
    assert.deepStrictEqual(stale, []);
  });

  it('reports a baseline entry as stale once it is no longer orphaned', () => {
    const baseline = { exceptions: [{ path: 'docs/c.mdx', note: 'fixed since' }] };
    const { remaining, stale } = applyBaseline(orphans, baseline);
    assert.deepStrictEqual(remaining, orphans);
    assert.deepStrictEqual(stale, ['docs/c.mdx']);
  });

  it('passes everything through when the baseline is empty', () => {
    const { remaining, stale } = applyBaseline(orphans, { exceptions: [] });
    assert.deepStrictEqual(remaining, orphans);
    assert.deepStrictEqual(stale, []);
  });
});
