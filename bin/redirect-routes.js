// Builds the set of URL paths the built site serves, from the source tree
// rather than from build/ (which is stale or absent outside a build).
//
// `has(path)` is true for paths this index can verify. `maybe(path)` is also
// true for paths it can't verify but that are served by something other than
// a file in this repo (the /ai/cookbook pages come from a separate repository
// that is cloned at build time, tag pages are generated, and so on). Use
// `has` to decide whether a redirect hides a live page, and `maybe` to decide
// whether a redirect destination is broken.

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { walkDir, resolveUrlPath } = require('../plugins/shared/docsRouting');
const { isExcludedDocPath } = require('./check-orphan-pages');
const { normalizePath } = require('./redirect-utils');

const COOKBOOK_DIR = 'ai-cookbook';
const COOKBOOK_ROUTE = 'ai/cookbook';

// Paths under these prefixes are served, but not from files this index can see.
const UNVERIFIABLE_PREFIXES = [
  `/${COOKBOOK_ROUTE}`, // ai-cookbook/ is a separate repository, cloned at build time
  '/tags', // tag pages are generated from docs frontmatter
  '/img/og', // rewritten to a single image in vercel.json
  '/api', // Vercel functions
];

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walkFiles(full) : [full];
  });
}

// The URL path of a docs file. Mirrors Docusaurus: a frontmatter `slug`
// starting with `/` is absolute, any other slug is relative to the file's
// directory, and otherwise the shared resolver applies `id` and index handling.
function docUrl(docsDir, filePath, frontMatter, routeBasePath) {
  const slug = typeof frontMatter.slug === 'string' ? frontMatter.slug : null;
  let urlPath;
  if (slug && !slug.startsWith('/')) {
    const relDir = path.relative(docsDir, path.dirname(filePath)).split(path.sep).join('/');
    const prefix = routeBasePath && routeBasePath !== '/' ? routeBasePath.replace(/^\/+|\/+$/g, '') : '';
    urlPath = [prefix, relDir === '' ? '' : relDir, slug].filter(Boolean).join('/');
  } else {
    urlPath = resolveUrlPath(docsDir, filePath, frontMatter, routeBasePath);
  }
  if (urlPath === 'index') return '/';
  return normalizePath(urlPath);
}

function addDocs(urls, docsDir, routeBasePath, { applyDocsExclude }) {
  // The markdown-pages plugin writes a .md alternate next to every doc page.
  for (const file of walkDir(docsDir)) {
    const rel = path.relative(docsDir, file);
    if (applyDocsExclude && isExcludedDocPath(rel)) continue;
    const { data } = matter(fs.readFileSync(file, 'utf8'));
    if (data.draft === true) continue;
    const url = docUrl(docsDir, file, data, routeBasePath);
    urls.add(url);
    if (url !== '/') urls.add(`${url}.md`);
  }
}

function addPages(urls, pagesDir) {
  for (const file of walkFiles(pagesDir)) {
    const rel = path.relative(pagesDir, file).split(path.sep).join('/');
    if (rel.split('/').some((segment) => segment.startsWith('_'))) continue;
    if (!/\.(js|jsx|ts|tsx|md|mdx)$/.test(rel)) continue;
    const route = rel.replace(/\.[^.]+$/, '').replace(/(^|\/)index$/, '');
    urls.add(route === '' ? '/' : `/${route}`);
  }
}

function addStatic(urls, staticDir) {
  for (const file of walkFiles(staticDir)) {
    urls.add(`/${path.relative(staticDir, file).split(path.sep).join('/')}`);
  }
}

function addApi(urls, apiDir) {
  for (const file of walkFiles(apiDir)) {
    const rel = path.relative(apiDir, file).split(path.sep).join('/');
    urls.add(`/api/${rel.replace(/\.[^.]+$/, '')}`);
  }
}

function buildRouteIndex(root = process.cwd()) {
  const urls = new Set();

  addDocs(urls, path.join(root, 'docs'), '/', { applyDocsExclude: true });
  const cookbookDir = path.join(root, COOKBOOK_DIR);
  if (fs.existsSync(cookbookDir)) addDocs(urls, cookbookDir, COOKBOOK_ROUTE, { applyDocsExclude: false });
  addPages(urls, path.join(root, 'src', 'pages'));
  addStatic(urls, path.join(root, 'static'));
  addApi(urls, path.join(root, 'api'));

  // Generated at build time.
  urls.add('/sitemap.xml');
  urls.add('/llms.txt');
  urls.add('/llms-full.txt');

  const has = (urlPath) => urls.has(normalizePath(urlPath));
  const maybe = (urlPath) => {
    const p = normalizePath(urlPath);
    if (urls.has(p)) return true;
    // The generated Cookbook landing page also has a markdown alternate.
    // It sits beside /ai/cookbook, outside the /ai/cookbook/* prefix.
    if (p === `/${COOKBOOK_ROUTE}.md`) return true;
    if (p.endsWith('/llms.txt')) return true; // per-section llms.txt files
    return UNVERIFIABLE_PREFIXES.some((prefix) => p === prefix || p.startsWith(`${prefix}/`));
  };

  return { has, maybe, urls, cookbookPresent: fs.existsSync(cookbookDir) };
}

module.exports = { buildRouteIndex, docUrl };
