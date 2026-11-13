#!/usr/bin/env node
// Writes api/_content-manifest.json: { "<url path>": { title, description } } for
// every page the site publishes. api/recommend.js reads it to turn a Kapa hit into
// a card, since Kapa returns only a passage and a URL. Runs from `prebuild`, so the
// file exists before Vercel packages the function. The file is gitignored.
//
// Reuses the routing and folder-default helpers the markdown-pages plugin uses, so
// a page's URL and title match what the site serves. See readme/RECOMMEND.md.

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { walkDir, resolveUrlPath } = require('../plugins/shared/docsRouting');
const { applyDefaults } = require('../plugins/shared/frontmatterDefaults');
const { titleWithSection } = require('../src/utils/sectionTitle');

const SITE_DIR = path.resolve(__dirname, '..');
const OUTPUT = path.join(SITE_DIR, 'api', '_content-manifest.json');

// Mirrors the targets in docusaurus.config.js's markdown-pages plugin.
const TARGETS = [
  { docsDir: 'docs', routeBasePath: '/' },
  { docsDir: 'ai-cookbook', routeBasePath: 'ai/cookbook' },
];

// Cards need a title and a sentence of description. A page without both can't be
// shown as a card, so it stays out. Draft pages aren't built, and unlisted pages
// are deliberately kept out of navigation, so neither is recommended.
function buildManifest({ siteDir = SITE_DIR, targets = TARGETS } = {}) {
  const manifest = {};
  for (const { docsDir, routeBasePath } of targets) {
    const dir = path.resolve(siteDir, docsDir);
    for (const filePath of walkDir(dir)) {
      const { data } = matter(fs.readFileSync(filePath, 'utf8'));
      const frontmatter = applyDefaults(filePath, data, { rootDir: siteDir });
      if (frontmatter.draft || frontmatter.unlisted || frontmatter.llm_exclude) continue;
      if (typeof frontmatter.title !== 'string' || typeof frontmatter.description !== 'string') continue;

      const urlPath = resolveUrlPath(dir, filePath, frontmatter, routeBasePath);
      const url = urlPath === 'index' ? '/' : `/${urlPath}`;
      manifest[url] = {
        title: titleWithSection(frontmatter.title.trim(), frontmatter.section_title),
        description: frontmatter.description.trim(),
      };
    }
  }
  return manifest;
}

function main() {
  const manifest = buildManifest();
  fs.writeFileSync(OUTPUT, `${JSON.stringify(manifest, null, 1)}\n`);
  console.log(`[content-manifest] Wrote ${Object.keys(manifest).length} pages to ${path.relative(SITE_DIR, OUTPUT)}`);
}

if (require.main === module) main();

module.exports = { buildManifest };
