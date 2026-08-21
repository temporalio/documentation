const test = require('node:test');
const assert = require('node:assert');

const {
  reconcileList,
  firstLink,
  buildDocIndex,
  buildSidebarTree,
  findOwningCategory,
} = require('./generate-sidebar-link-lists');

// Synthetic categories keep these cases stable as the real docs change.
const cat = (label, children) => ({ kind: 'category', label, url: null, children });
const doc = (label, url) => ({ kind: 'doc', label, url });
const link = (label, url) => ({ kind: 'link', label, url, external: true });

test('adds a missing sidebar entry next to its sibling, not at the end', () => {
  const category = cat('Workers', [
    doc('Run a Worker', '/develop/python/workers/run-worker-process'),
    doc('Serverless Workers', '/develop/python/workers/serverless-workers'),
    doc('Interceptors', '/develop/python/workers/interceptors'),
  ]);
  const existing = [
    '- [Worker processes](/develop/python/workers/run-worker-process)',
    '- [Interceptors](/develop/python/workers/interceptors)',
  ];

  const { lines, added } = reconcileList(category, existing, '');

  assert.deepStrictEqual(added, ['/develop/python/workers/serverless-workers']);
  assert.deepStrictEqual(lines, [
    // Hand-written "Worker processes" survives; the sidebar's "Run a Worker" does not win.
    '- [Worker processes](/develop/python/workers/run-worker-process)',
    '- [Serverless Workers](/develop/python/workers/serverless-workers)',
    '- [Interceptors](/develop/python/workers/interceptors)',
  ]);
});

test('never rewrites the label of an entry that is already listed', () => {
  const category = cat('Best practices', [doc('Data handling', '/develop/java/best-practices/data-handling')]);
  const existing = ['- [Converters and encryption](/develop/java/best-practices/data-handling)'];

  const { lines, added } = reconcileList(category, existing, '');

  assert.deepStrictEqual(added, []);
  assert.deepStrictEqual(lines, existing, 'sidebar labels disagree with prose on 37 links; prose wins');
});

test('preserves a link the sidebar does not know about', () => {
  // docs/develop/java/nexus/index.mdx carries an external learn.temporal.io
  // tutorial link inside its section list.
  const category = cat('Nexus', [doc('Quickstart', '/develop/java/nexus/quickstart')]);
  const existing = [
    '- [Quickstart](/develop/java/nexus/quickstart)',
    '- [Nexus sync tutorial](https://learn.temporal.io/tutorials/nexus/nexus-sync-tutorial/)',
  ];

  const { lines } = reconcileList(category, existing, '');

  assert.ok(
    lines.includes('- [Nexus sync tutorial](https://learn.temporal.io/tutorials/nexus/nexus-sync-tutorial/)'),
    'an external link inside a generated region must survive',
  );
  assert.strictEqual(lines.length, 2);
});

test('is idempotent', () => {
  const category = cat('Workers', [
    doc('Run a Worker', '/a'),
    doc('Serverless Workers', '/b'),
  ]);
  const first = reconcileList(category, ['- [Worker processes](/a)'], '').lines;
  const second = reconcileList(category, first, '').lines;
  assert.deepStrictEqual(second, first);
});

test('resolves a category with no link of its own to its first descendant', () => {
  // "Standalone Activities" has no link:, so Docusaurus falls back to the
  // first child. Dropping it instead would silently shorten the list.
  const nested = cat('Standalone Activities', [
    doc('Quickstart', '/develop/go/activities/standalone-activities-quickstart'),
    doc('Feature Guide', '/develop/go/activities/standalone-activities'),
  ]);
  assert.strictEqual(firstLink(nested), '/develop/go/activities/standalone-activities-quickstart');
});

test('refuses to render an item with no resolvable link rather than omitting it', () => {
  const category = cat('Activities', [cat('Empty', [])]);
  assert.throws(() => reconcileList(category, [], ''), /no resolvable link/);
});

test('keeps an external sidebar link item', () => {
  const category = cat('Section', [link('Change log', 'https://temporal.io/change-log')]);
  const { lines } = reconcileList(category, [], '');
  assert.deepStrictEqual(lines, ['- [Change log](https://temporal.io/change-log)']);
});

test('honours the indent of the marker', () => {
  const category = cat('S', [doc('A', '/a')]);
  const { lines } = reconcileList(category, [], '  ');
  assert.deepStrictEqual(lines, ['  - [A](/a)']);
});

// Integration: the real sidebars.js and docs tree must resolve without
// throwing, so a malformed sidebar entry fails the test rather than the build.
test('every SDK section index page resolves to a sidebar category', () => {
  const docs = buildDocIndex();
  const tree = buildSidebarTree(docs);
  const missing = [];

  for (const [id, entry] of docs) {
    if (!/^develop\/[a-z]+\/[a-z-]+\/index$/.test(id)) continue;
    if (entry.draft || entry.unlisted) continue;
    if (!findOwningCategory(tree, id)) missing.push(id);
  }

  assert.deepStrictEqual(missing, [], 'these pages have no owning sidebar category');
});
