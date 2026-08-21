#!/usr/bin/env node

// Generates the "here's what's in this section" link lists that SDK landing
// pages and section index pages carry, from sidebars.js — the same source
// Docusaurus builds the left nav from.
//
// Those lists are hand-maintained today, which is why they drift: adding a
// page wires it into sidebars.js but nothing updates the prose lists that
// duplicate it. See https://github.com/temporalio/documentation/issues/5144.
//
// Only regions wrapped in markers are touched, so a page opts in per list and
// everything around the markers stays hand-written:
//
//   {/* SIDEBAR-LIST-START */}
//   - [Workflow basics](/develop/python/workflows/basics)
//   {/* SIDEBAR-LIST-END */}
//
// With no attribute the region renders the direct children of whichever
// sidebar category links to *this* page — the section-index-page case. A
// landing page carries several lists, one per section, so those name it:
//
//   {/* SIDEBAR-LIST-START section="Workflows" */}
//
// Markers are MDX expression comments, so the LLM markdown pipeline
// (scripts/mdx-to-md.mjs) already strips them while the generated bullets
// survive as ordinary Markdown. That's the reason for generating text in
// place rather than rendering a React component: a component would need a
// parallel handler in scripts/component-handlers/ to avoid blanking these
// links in llms-full.txt and the per-page .md files, the way an unwired
// <GuidesGrid /> currently blanks the guides catalog.
//
//   node bin/generate-sidebar-link-lists.js           # rewrite in place
//   node bin/generate-sidebar-link-lists.js --check    # CI: fail if stale
//   node bin/generate-sidebar-link-lists.js --json     # machine-readable
//   node bin/generate-sidebar-link-lists.js --list     # marker inventory
//
// Exit codes: 0 clean, 2 stale regions (--check) or an unresolvable marker.

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const { walkDir, resolveUrlPath } = require('../plugins/shared/docsRouting');
const { isExcludedDocPath } = require('./check-orphan-pages');

const DOCS_DIR = path.join(process.cwd(), 'docs');
const SIDEBARS_FILE = path.join(process.cwd(), 'sidebars.js');

const START = /^(\s*)\{\/\*\s*SIDEBAR-LIST-START(?<attrs>[^*]*?)\*\/\}\s*$/;
const END = /^\s*\{\/\*\s*SIDEBAR-LIST-END\s*\*\/\}\s*$/;

// ---------------------------------------------------------------------------
// Doc index: every routed doc file, keyed by the doc id sidebars.js uses
// ---------------------------------------------------------------------------

// Mirrors bin/check-orphan-pages.js's computeDocId: an index file's id keeps
// the literal "index" segment, because that's how sidebars.js addresses it.
function computeDocId(filePath) {
  const rel = path.relative(DOCS_DIR, filePath).replace(/\\/g, '/');
  const withoutExt = rel.replace(/\.(md|mdx)$/i, '');
  const dir = path.dirname(withoutExt);
  const base = path.basename(withoutExt);
  return dir === '.' ? base : `${dir}/${base}`;
}

function buildDocIndex() {
  const byId = new Map();
  for (const filePath of walkDir(DOCS_DIR)) {
    const rel = path.relative(DOCS_DIR, filePath);
    if (isExcludedDocPath(rel)) continue;

    const { data } = matter(fs.readFileSync(filePath, 'utf8'));
    const id = data.id && !data.id.includes('/')
      // A frontmatter `id` renames only the last segment; sidebars.js still
      // addresses the file by its directory path.
      ? [path.dirname(computeDocId(filePath)), data.id].filter((s) => s !== '.').join('/')
      : computeDocId(filePath);

    byId.set(id, {
      filePath,
      url: `/${resolveUrlPath(DOCS_DIR, filePath, data)}`,
      // Docusaurus falls back title -> sidebar_label for nav text; a `label`
      // in sidebars.js overrides both and is applied by resolveItem below.
      label: data.sidebar_label || data.title || path.basename(id),
      draft: data.draft === true,
      unlisted: data.unlisted === true,
    });
  }
  return byId;
}

// ---------------------------------------------------------------------------
// Sidebar tree, resolved to {label, url} the way the rendered nav resolves it
// ---------------------------------------------------------------------------

function resolveItem(item, docs) {
  if (typeof item === 'string') {
    const doc = docs.get(item);
    return doc ? { kind: 'doc', id: item, label: doc.label, url: doc.url } : null;
  }
  if (!item || typeof item !== 'object') return null;

  if (item.type === 'doc' && item.id) {
    const doc = docs.get(item.id);
    if (!doc) return null;
    return { kind: 'doc', id: item.id, label: item.label || doc.label, url: doc.url };
  }
  if (item.type === 'link' && item.href) {
    return { kind: 'link', label: item.label, url: item.href, external: true };
  }
  if (item.type === 'category') {
    const linkId = item.link && item.link.type === 'doc' ? item.link.id : item.link && item.link.id;
    const doc = linkId ? docs.get(linkId) : null;
    return {
      kind: 'category',
      label: item.label,
      url: doc ? doc.url : null,
      linkId: linkId || null,
      children: (item.items || []).map((child) => resolveItem(child, docs)).filter(Boolean),
    };
  }
  return null;
}

function buildSidebarTree(docs) {
  // sidebars.js is plain CommonJS and already require()s src/constants, so
  // requiring it gives the real config rather than a regex approximation.
  const sidebars = require(SIDEBARS_FILE);
  return Object.values(sidebars)
    .flat()
    .map((item) => resolveItem(item, docs))
    .filter(Boolean);
}

function eachCategory(nodes, visit) {
  for (const node of nodes) {
    if (node.kind !== 'category') continue;
    visit(node);
    eachCategory(node.children, visit);
  }
}

// The category a page "owns" is the one whose link points at that page.
function findOwningCategory(tree, docId) {
  let found = null;
  eachCategory(tree, (cat) => {
    if (!found && cat.linkId === docId) found = cat;
  });
  return found;
}

function findNamedDescendant(category, label) {
  let found = null;
  eachCategory(category.children, (cat) => {
    if (!found && cat.label === label) found = cat;
  });
  return found;
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

// A category may have no `link` of its own (Standalone Activities, for one).
// Docusaurus renders those by falling back to the first descendant that does
// have a link — mirror that instead of dropping the entry, so a category can
// never silently vanish from a generated list.
function firstLink(node) {
  if (node.url) return node.url;
  for (const child of node.children || []) {
    const url = firstLink(child);
    if (url) return url;
  }
  return null;
}

// One level only, matching what the pages express today: a nested category
// renders as a single link rather than being flattened, which is what keeps
// depth-4 pages (serverless-workers/*, data-handling/*) off the landing pages.
function renderList(category, indent) {
  return category.children.map((child) => {
    const url = firstLink(child);
    if (!url) {
      // Refusing here rather than omitting: a silently shorter list is the
      // failure mode this script exists to prevent.
      throw new Error(`sidebar item "${child.label}" under "${category.label}" has no resolvable link, so it cannot be rendered`);
    }
    return `${indent}- [${child.label}](${url})`;
  });
}

const BULLET = /^\s*-\s*\[(?<label>[^\]]+)\]\((?<url>[^)]+)\)\s*$/;

// Reconciles a marker region against the sidebar rather than overwriting it.
//
// The sidebar decides which pages appear and in what order — that's the drift
// this script exists to kill. It deliberately does NOT decide the link text:
// sidebar labels disagree with these lists on 37 links, some of them against
// the sentence-case rule in readme/STYLE.md ("Feature guide" -> "Feature
// Guide"), and two SDKs disagree with each other on the same page. Importing
// that into prose would trade a drift problem for a copy problem.
//
// So: an entry already present keeps its hand-written text, a missing entry is
// added using the sidebar label as a starting point, and a line whose URL
// isn't in this category at all (an external tutorial link, say) is preserved
// rather than deleted.
function reconcileList(category, existingLines, indent) {
  const existing = [];
  for (const line of existingLines) {
    const m = line.match(BULLET);
    if (m) existing.push({ line, url: m.groups.url, label: m.groups.label });
    else if (line.trim() !== '') existing.push({ line, url: null, label: null });
  }

  const generated = renderList(category, indent).map((line) => {
    const m = line.match(BULLET);
    return { line, url: m.groups.url, label: m.groups.label };
  });
  const sidebarUrls = new Set(generated.map((g) => g.url));

  // Insert-only, deliberately. Reordering and relabelling 52 pages to fix 5
  // genuine gaps is a bad trade: the sidebar's order and labels are no better
  // than the prose's (37 label disagreements, some against readme/STYLE.md),
  // and a purely additive diff is the one a reviewer can actually check. So
  // existing lines keep their text AND their position; only missing entries
  // are inserted, each after whichever sidebar sibling precedes it.
  const existingUrls = new Set(existing.map((e) => e.url).filter(Boolean));
  const out = existing.map((e) => e.line);
  const added = [];

  generated.forEach((g, gi) => {
    if (existingUrls.has(g.url)) return;

    // Anchor to the nearest earlier sidebar sibling that the page already
    // lists, so a new entry lands next to its neighbours rather than at the
    // bottom.
    let at = 0;
    for (let i = gi - 1; i >= 0; i -= 1) {
      const idx = out.findIndex((line) => {
        const m = line.match(BULLET);
        return m && m.groups.url === generated[i].url;
      });
      if (idx !== -1) {
        at = idx + 1;
        break;
      }
    }
    out.splice(at, 0, g.line);
    added.push(g.url);
  });

  return { lines: out, added, preserved: existing.length - sidebarUrls.size };
}

function parseAttrs(raw) {
  const attrs = {};
  for (const m of String(raw || '').matchAll(/(\w+)="([^"]*)"/g)) attrs[m[1]] = m[2];
  return attrs;
}

// Returns {lines, regions:[{start,end,section,expected,actual,stale}]}
function processFile(filePath, tree, docs) {
  const original = fs.readFileSync(filePath, 'utf8');
  const eol = original.includes('\r\n') ? '\r\n' : '\n';
  const lines = original.split(/\r?\n/);
  const docId = computeDocId(filePath);
  const regions = [];
  const out = [];

  for (let i = 0; i < lines.length; i += 1) {
    const startMatch = lines[i].match(START);
    if (!startMatch) {
      out.push(lines[i]);
      continue;
    }

    let close = i + 1;
    while (close < lines.length && !END.test(lines[close])) close += 1;
    if (close >= lines.length) {
      throw new Error(`${path.relative(process.cwd(), filePath)}: SIDEBAR-LIST-START at line ${i + 1} has no matching SIDEBAR-LIST-END`);
    }

    const indent = startMatch[1] || '';
    const { section } = parseAttrs(startMatch.groups.attrs);
    const owning = findOwningCategory(tree, docId);
    if (!owning) {
      throw new Error(`${path.relative(process.cwd(), filePath)}: no sidebars.js category links to this page (doc id "${docId}"), so a sidebar list cannot be resolved`);
    }
    const target = section ? findNamedDescendant(owning, section) : owning;
    if (!target) {
      throw new Error(`${path.relative(process.cwd(), filePath)}: no category labelled "${section}" under "${owning.label}"`);
    }

    const actual = lines.slice(i + 1, close).filter((l) => l.trim() !== '');
    const { lines: expected, added, preserved } = reconcileList(target, actual, indent);
    regions.push({
      section: section || owning.label,
      line: i + 1,
      expected,
      actual,
      added,
      preserved,
      stale: actual.join('\n') !== expected.join('\n'),
    });

    out.push(lines[i], ...expected, lines[close]);
    i = close;
  }

  return { content: out.join(eol), regions, changed: out.join(eol) !== original };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function filesWithMarkers() {
  return walkDir(DOCS_DIR).filter((f) => {
    const rel = path.relative(DOCS_DIR, f);
    if (isExcludedDocPath(rel)) return false;
    return /SIDEBAR-LIST-START/.test(fs.readFileSync(f, 'utf8'));
  });
}

function main(argv) {
  const check = argv.includes('--check');
  const asJson = argv.includes('--json');
  const listOnly = argv.includes('--list');

  const docs = buildDocIndex();
  const tree = buildSidebarTree(docs);
  const files = filesWithMarkers();

  if (listOnly) {
    console.log(`${files.length} file(s) with sidebar-list markers:`);
    for (const f of files) console.log(`  ${path.relative(process.cwd(), f)}`);
    return 0;
  }

  const results = [];
  for (const filePath of files) {
    const { content, regions, changed } = processFile(filePath, tree, docs);
    results.push({ file: path.relative(process.cwd(), filePath), regions, changed });
    if (!check && changed) fs.writeFileSync(filePath, content);
  }

  const stale = results.flatMap((r) => r.regions.filter((x) => x.stale).map((x) => ({ ...x, file: r.file })));

  if (asJson) {
    console.log(JSON.stringify({ files: results.length, stale }, null, 2));
    return stale.length && check ? 2 : 0;
  }

  if (!files.length) {
    console.log('No sidebar-list markers found. Nothing to do.');
    return 0;
  }

  if (check) {
    if (!stale.length) {
      console.log(`Sidebar link lists are up to date (${results.length} file(s) checked).`);
      return 0;
    }
    console.error(`${stale.length} sidebar link list(s) are out of date:\n`);
    for (const s of stale) {
      console.error(`  ${s.file}:${s.line}  [${s.section}]`);
      for (const line of s.actual.filter((l) => !s.expected.includes(l))) console.error(`    - ${line.trim()}`);
      for (const line of s.expected.filter((l) => !s.actual.includes(l))) console.error(`    + ${line.trim()}`);
      console.error('');
    }
    console.error('Run `yarn sidebar-links` to update them.');
    return 2;
  }

  const rewritten = results.filter((r) => r.changed);
  console.log(`Generated ${results.reduce((n, r) => n + r.regions.length, 0)} list(s) across ${results.length} file(s); ${rewritten.length} file(s) rewritten.`);
  for (const r of rewritten) console.log(`  updated ${r.file}`);
  return 0;
}

if (require.main === module) {
  try {
    process.exit(main(process.argv.slice(2)));
  } catch (err) {
    console.error(err.message);
    process.exit(2);
  }
}

module.exports = {
  buildDocIndex,
  buildSidebarTree,
  processFile,
  findOwningCategory,
  findNamedDescendant,
  renderList,
  reconcileList,
  firstLink,
  computeDocId,
};
