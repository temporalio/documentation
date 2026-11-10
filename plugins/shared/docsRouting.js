const fs = require('fs');
const path = require('path');

// Shared by plugins/markdown-pages and plugins/og-image, which both need to
// walk the same docs tree and independently re-derive the route Docusaurus
// will build each file to. Keeping this in one place means the two plugins
// can't silently drift apart on what counts as a routed doc page.

// Mirrors docs.exclude in docusaurus.config.js: '**/_*.{js,jsx,ts,tsx,md,mdx}',
// '**/_*/**', '**/clusters/**'. (ai-cookbook is a separate docs plugin
// instance rooted outside docs/, so it never appears in a walk of docs/.)
// `relativePath` is relative to the docs dir being walked.
function isExcludedDocPath(relativePath) {
  const segments = relativePath.split(/[\\/]/);
  const basename = segments[segments.length - 1];

  if (/^_[^.]/.test(basename) && /\.(mdx?|md)$/.test(basename)) return true;
  if (segments.slice(0, -1).some((segment) => segment.startsWith('_'))) return true;
  if (segments.includes('clusters')) return true;

  return false;
}

// Every .md/.mdx file under `dir` that Docusaurus routes as a page. Partials
// and other excluded files are skipped, so callers don't emit a page (or an
// OG image) for a file that's only ever imported into another page.
function walkDir(dir, root = dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) return walkDir(full, root);
    if (/\.(md|mdx)$/i.test(name) && !isExcludedDocPath(path.relative(root, full))) return [full];
    return [];
  });
}

// A docs plugin instance's routeBasePath prefixes every route it serves
// (e.g. the `ai-cookbook` instance publishes at /ai-cookbook/*, unlike the
// main docs instance whose routeBasePath is '/'). Normalized to '' when
// there's no real prefix, so callers built against the root instance don't
// need to pass this at all.
function normalizeRouteBasePath(routeBasePath) {
  if (!routeBasePath || routeBasePath === '/') return '';
  return routeBasePath.replace(/^\/+/, '').replace(/\/+$/, '');
}

// Mirrors Docusaurus's own route resolution (front-matter `slug` takes
// precedence, then `id`, then the file path) so callers land on the same
// route Docusaurus actually builds the page at.
function resolveUrlPath(docsDir, filePath, frontmatter, routeBasePath) {
  const prefix = normalizeRouteBasePath(routeBasePath);
  const prefixed = (p) => (prefix ? `${prefix}/${p}` : p);

  if (frontmatter.slug) {
    const slug = frontmatter.slug.replace(/^\/+/, '').replace(/\/+$/, '');
    return slug ? prefixed(slug) : prefix || 'index';
  }
  const rel = path.relative(docsDir, filePath).replace(/\\/g, '/');
  const withoutExt = rel.replace(/\.(md|mdx)$/i, '');
  const id = frontmatter.id || path.basename(withoutExt);
  const dir = path.dirname(withoutExt);
  if (dir === '.') {
    // A docsDir-root index doc (index.mdx/README.mdx) *is* the routeBasePath
    // itself, not "<routeBasePath>/index" — mirror that instead of nesting it.
    if (id === 'index') return prefix || 'index';
    return prefixed(id);
  }
  // Docusaurus treats a doc named the same as its parent folder (e.g.
  // `event-history/event-history.mdx`) as that folder's index page, the
  // same way it treats `index.mdx`/`README.mdx`. Mirror that convention
  // here so callers land on the same route as the real page.
  if (id === 'index' || id === path.basename(dir)) return prefixed(dir);
  return prefixed(`${dir}/${id}`);
}

module.exports = { walkDir, resolveUrlPath, isExcludedDocPath };
