#!/usr/bin/env node

// Dev-only tool: builds a single HTML page listing every generated og:image
// card (thumbnail + section/title/route) so a large batch can be reviewed
// in a browser at once, instead of opening 600+ PNGs one at a time. Not
// part of the build pipeline — run manually after `yarn build`.

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const ogImagePlugin = require('../plugins/og-image');

const DOCS_DIR = path.join(process.cwd(), 'docs');
const BUILD_DIR = path.join(process.cwd(), 'build');
const OUT_FILE = path.join(BUILD_DIR, '__og-gallery.html');

// Section grouping/labeling is purely a gallery-review concern now — the
// generated card itself dropped the section pill in the Figma redesign, so
// this doesn't live in plugins/og-image/index.js (the actual production
// plugin) anymore, only here.
const SDK_LABELS = {
  go: 'Go',
  python: 'Python',
  java: 'Java',
  typescript: 'TypeScript',
  dotnet: '.NET',
  php: 'PHP',
  ruby: 'Ruby',
  rust: 'Rust',
};

const SECTION_OVERRIDES = {
  cli: 'CLI',
  'tctl-v1': 'tctl v1',
};

function humanize(id) {
  return id
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function resolveSection(docsDir, filePath) {
  const rel = path.relative(docsDir, filePath).replace(/\\/g, '/');
  const segments = rel.split('/');
  if (segments.length === 1) return 'Docs';
  const top = segments[0];
  if (top === 'develop' && segments[1] && SDK_LABELS[segments[1]]) {
    return `${SDK_LABELS[segments[1]]} SDK`;
  }
  return SECTION_OVERRIDES[top] || humanize(top);
}

async function getSiteUrl() {
  const createConfigAsync = require('../docusaurus.config.js');
  const config = await createConfigAsync();
  return config.url + (config.baseUrl || '/');
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`Build directory not found at ${BUILD_DIR}. Run \`yarn build\` first.`);
    process.exit(1);
  }

  const siteUrl = await getSiteUrl();
  const cards = [];
  for (const filePath of ogImagePlugin.walkDir(DOCS_DIR)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(raw);
    const urlPath = ogImagePlugin.resolveUrlPath(DOCS_DIR, filePath, frontmatter);
    const htmlPath = ogImagePlugin.htmlPathForUrlPath(BUILD_DIR, urlPath);
    if (!fs.existsSync(htmlPath)) continue;

    const section = resolveSection(DOCS_DIR, filePath);
    const routePath = urlPath === 'index' ? '/' : `/${urlPath}`;

    if (ogImagePlugin.hasManualOverride(frontmatter, content)) {
      const id = frontmatter.id || path.basename(filePath).replace(/\.(md|mdx)$/i, '');
      const title = ogImagePlugin.extractTitle(content, frontmatter, id);
      const overrideImage = ogImagePlugin.overrideImageFor(frontmatter, content, siteUrl);
      cards.push({ urlPath: routePath, section, title, isOverride: true, imgSrc: overrideImage });
      continue;
    }

    const id = frontmatter.id || path.basename(filePath).replace(/\.(md|mdx)$/i, '');
    const title = ogImagePlugin.extractTitle(content, frontmatter, id);
    const description = frontmatter.description;
    const hash = ogImagePlugin.hashFor(title, description);

    cards.push({ urlPath: routePath, section, title, isOverride: false, imgSrc: `/img/og/${hash}.${ogImagePlugin.IMAGE_EXTENSION}` });
  }

  cards.sort((a, b) => a.section.localeCompare(b.section) || a.title.localeCompare(b.title));

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>og:image gallery (${cards.length} pages)</title>
<style>
  body { background: #0a0a0f; color: #e5e7eb; font-family: system-ui, sans-serif; margin: 0; padding: 24px; }
  h1 { font-size: 18px; font-weight: 600; margin: 0 0 16px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(960px, 1fr)); gap: 20px; }
  figure { margin: 0; background: #16161d; border-radius: 8px; overflow: hidden; border: 1px solid #26262f; }
  figure img { width: 100%; display: block; background: #000; }
  figcaption { padding: 10px 12px; font-size: 13px; line-height: 1.4; }
  .section { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: #93c5fd; margin-bottom: 4px; }
  .override-badge { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: #0a0a0f; background: #facc15; padding: 2px 8px; border-radius: 4px; margin-left: 6px; }
  .title { color: #f3f4f6; font-weight: 600; }
  .path { color: #6b7280; font-size: 12px; }
  a { color: inherit; }
</style>
</head>
<body>
<h1>${cards.length} og:image cards (${cards.filter((c) => c.isOverride).length} manual override(s))</h1>
<div class="grid">
${cards
  .map(
    (c) => `  <figure>
    <a href="${escapeHtml(c.urlPath)}" target="_blank"><img src="${escapeHtml(c.imgSrc)}" loading="lazy"></a>
    <figcaption>
      <span class="section">${escapeHtml(c.section)}</span>${c.isOverride ? '<span class="override-badge">Override</span>' : ''}<br>
      <span class="title">${escapeHtml(c.title)}</span><br>
      <span class="path">${escapeHtml(c.urlPath)}</span>
    </figcaption>
  </figure>`,
  )
  .join('\n')}
</div>
</body>
</html>
`;

  fs.writeFileSync(OUT_FILE, html);
  console.log(`[generate-og-gallery] wrote ${cards.length} card(s) to ${path.relative(process.cwd(), OUT_FILE)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
