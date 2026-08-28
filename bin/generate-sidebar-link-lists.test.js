const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const {
  reconcileList,
  firstLink,
  buildDocIndex,
  buildSidebarTree,
  findOwningCategory,
  findNamedDescendant,
  processFile,
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

// ---------------------------------------------------------------------------
// processFile: marker parsing and the error paths. These run against a real
// temporary page under docs/ because the doc id -> sidebar category lookup
// only means anything against the real sidebars.js.
// ---------------------------------------------------------------------------

const TMP_DIR = path.join(process.cwd(), 'docs', 'develop', '_sidebar_link_list_fixture');

function withFixture(body, run) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
  const file = path.join(TMP_DIR, 'index.mdx');
  fs.writeFileSync(file, body);
  try {
    return run(file);
  } finally {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }
}

test('processFile rejects a region with no closing marker', () => {
  const docs = buildDocIndex();
  const tree = buildSidebarTree(docs);
  withFixture('---\nid: index\n---\n\n{/* SIDEBAR-LIST-START */}\n- [A](/a)\n', (file) => {
    assert.throws(() => processFile(file, tree, docs), /no matching SIDEBAR-LIST-END/);
  });
});

test('processFile rejects a page no sidebar category links to', () => {
  const docs = buildDocIndex();
  const tree = buildSidebarTree(docs);
  withFixture('---\nid: index\n---\n\n{/* SIDEBAR-LIST-START */}\n{/* SIDEBAR-LIST-END */}\n', (file) => {
    assert.throws(() => processFile(file, tree, docs), /no sidebars\.js category links to this page/);
  });
});

test('processFile leaves everything outside the markers untouched', () => {
  const docs = buildDocIndex();
  const tree = buildSidebarTree(docs);
  const real = path.join(process.cwd(), 'docs', 'develop', 'python', 'index.mdx');
  const before = fs.readFileSync(real, 'utf8');
  const { content, regions } = processFile(real, tree, docs);

  assert.ok(regions.length > 0, 'the Python landing page should have marked regions');

  // Compare everything that is not inside a marked region.
  const strip = (text) => {
    const out = [];
    let inside = false;
    for (const line of text.split('\n')) {
      if (/SIDEBAR-LIST-START/.test(line)) { inside = true; out.push(line); continue; }
      if (/SIDEBAR-LIST-END/.test(line)) { inside = false; out.push(line); continue; }
      if (!inside) out.push(line);
    }
    return out.join('\n');
  };
  assert.strictEqual(strip(content), strip(before), 'content outside the markers must not change');
});

test('processFile is a no-op on an already-current page', () => {
  const docs = buildDocIndex();
  const tree = buildSidebarTree(docs);
  const real = path.join(process.cwd(), 'docs', 'develop', 'python', 'index.mdx');
  const { changed } = processFile(real, tree, docs);
  assert.strictEqual(changed, false, 'run `yarn sidebar-links` — the committed page is stale');
});

test('a marker keyed by category URL resolves even when the heading text differs', () => {
  // "## [Temporal Client](/develop/python/client)" sits above the category
  // labelled "Client", which is why the URL form exists.
  const docs = buildDocIndex();
  const tree = buildSidebarTree(docs);
  const own = findOwningCategory(tree, 'develop/python/index');
  assert.ok(own, 'the Python SDK category should link develop/python/index');
  assert.strictEqual(findNamedDescendant(own, '/develop/python/client').label, 'Client');
  assert.strictEqual(findNamedDescendant(own, 'Temporal Client'), null, 'heading text is not a sidebar label');
});
