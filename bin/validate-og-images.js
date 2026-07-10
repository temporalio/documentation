#!/usr/bin/env node

// Phase 2 changed the expected behavior this script checks: docs pages now
// get their own generated og:image (plugins/og-image), so they no longer
// match the site-wide default from Phase 1. This script now asserts three
// things instead of one: (1) every doc page's og:image/twitter:image point
// to a real generated PNG under build/img/og/, UNLESS (2) the page declares
// a manual override (front-matter `image:` or an inline <Head> og:image),
// in which case it must keep that exact override instead of the generated
// image — Phase 4 intentionally makes "every doc page gets a generated
// image" no longer universally true. (The override *detection* logic itself
// is unit-tested in plugins/og-image/index.test.js against synthetic
// frontmatter/content, rather than via dedicated fixture pages in docs/ —
// this loop just needs to not choke if a real page ever uses one.) And (3)
// every page the plugin doesn't touch (404, search, changelog, category/tag
// pages, etc.) still falls back to the site-wide default, which remains the
// Phase 1 regression floor for everything outside the plugin's reach.

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const ogImagePlugin = require('../plugins/og-image');

const BUILD_DIR = path.join(process.cwd(), 'build');
const DOCS_DIR = path.join(process.cwd(), 'docs');

function walkHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) return walkHtmlFiles(full);
    if (/\.html$/i.test(name)) return [full];
    return [];
  });
}

function extractMetaContent(html, attr, value) {
  const tagMatch = html.match(new RegExp(`<meta[^>]*${attr}=["']?${value}["']?[^>]*>`, 'i'));
  if (!tagMatch) return null;
  const contentMatch = tagMatch[0].match(/content=["']?([^"'\s>]+)["']?/i);
  return contentMatch ? contentMatch[1] : null;
}

async function getSiteConfig() {
  const createConfigAsync = require('../docusaurus.config.js');
  return createConfigAsync();
}

async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`Build directory not found at ${BUILD_DIR}. Run \`yarn build\` first.`);
    process.exit(1);
  }

  const config = await getSiteConfig();
  const siteUrl = config.url + (config.baseUrl || '/');
  const defaultImage = new URL(config.themeConfig.image, siteUrl).toString();

  const docHtmlPaths = new Set();
  const docMismatches = [];
  const missingPngs = [];
  const overrideMismatches = [];
  let docPagesChecked = 0;
  let overridePagesChecked = 0;
  let skippedPartials = 0;

  for (const filePath of ogImagePlugin.walkDir(DOCS_DIR)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(raw);
    const urlPath = ogImagePlugin.resolveUrlPath(DOCS_DIR, filePath, frontmatter);
    const htmlPath = ogImagePlugin.htmlPathForUrlPath(BUILD_DIR, urlPath);

    if (!fs.existsSync(htmlPath)) {
      skippedPartials++;
      continue;
    }
    docHtmlPaths.add(htmlPath);
    docPagesChecked++;

    const html = fs.readFileSync(htmlPath, 'utf8');
    const ogImage = extractMetaContent(html, 'property', 'og:image');
    const twitterImage = extractMetaContent(html, 'name', 'twitter:image');

    if (ogImagePlugin.hasManualOverride(frontmatter, content)) {
      overridePagesChecked++;
      const expectedOverride = ogImagePlugin.overrideImageFor(frontmatter, content, siteUrl);

      if (ogImage !== expectedOverride || twitterImage !== expectedOverride) {
        overrideMismatches.push({
          file: path.relative(BUILD_DIR, htmlPath),
          expected: expectedOverride,
          ogImage,
          twitterImage,
        });
      }
      continue;
    }

    const id = frontmatter.id || path.basename(filePath).replace(/\.(md|mdx)$/i, '');
    const title = ogImagePlugin.extractTitle(content, frontmatter, id);
    const description = frontmatter.description;
    const section = ogImagePlugin.resolveSection(DOCS_DIR, filePath);
    const hash = ogImagePlugin.hashFor(title, description, section);
    const expectedImage = new URL(path.posix.join(config.baseUrl, 'img/og', `${hash}.png`), config.url).toString();
    const expectedPngPath = path.join(BUILD_DIR, 'img', 'og', `${hash}.png`);

    if (ogImage !== expectedImage || twitterImage !== expectedImage) {
      docMismatches.push({
        file: path.relative(BUILD_DIR, htmlPath),
        expected: expectedImage,
        ogImage,
        twitterImage,
      });
    }
    if (!fs.existsSync(expectedPngPath)) {
      missingPngs.push({ file: path.relative(BUILD_DIR, htmlPath), expectedPngPath });
    }
  }

  const otherMismatches = [];
  const allHtmlFiles = walkHtmlFiles(BUILD_DIR);
  const otherFiles = allHtmlFiles.filter((f) => !docHtmlPaths.has(f));

  for (const file of otherFiles) {
    const ogImage = extractMetaContent(fs.readFileSync(file, 'utf8'), 'property', 'og:image');
    if (ogImage !== defaultImage) {
      otherMismatches.push({ file: path.relative(BUILD_DIR, file), ogImage });
    }
  }

  const generatedPagesChecked = docPagesChecked - overridePagesChecked;

  console.log(`[validate-og-images] ${docPagesChecked} doc page(s) checked, ${skippedPartials} partial(s) skipped (not routed)`);
  console.log(`[validate-og-images] ${generatedPagesChecked - docMismatches.length}/${generatedPagesChecked} doc page(s) have a correct generated og:image + twitter:image`);
  console.log(`[validate-og-images] ${generatedPagesChecked - missingPngs.length}/${generatedPagesChecked} doc page(s) have their generated PNG present on disk`);
  console.log(`[validate-og-images] ${overridePagesChecked - overrideMismatches.length}/${overridePagesChecked} manual-override doc page(s) kept their own og:image`);
  console.log(`[validate-og-images] ${otherFiles.length - otherMismatches.length}/${otherFiles.length} non-doc page(s) still match the site default`);

  const failures = docMismatches.length + missingPngs.length + overrideMismatches.length + otherMismatches.length;
  if (failures > 0) {
    if (docMismatches.length > 0) {
      console.error(`\n${docMismatches.length} doc page(s) have an unexpected og:image/twitter:image:\n`);
      for (const m of docMismatches.slice(0, 20)) {
        console.error(`  ${m.file}: expected ${m.expected}, got og:image=${m.ogImage} twitter:image=${m.twitterImage}`);
      }
    }
    if (overrideMismatches.length > 0) {
      console.error(`\n${overrideMismatches.length} manual-override page(s) had their override replaced or not applied correctly:\n`);
      for (const m of overrideMismatches.slice(0, 20)) {
        console.error(`  ${m.file}: expected ${m.expected}, got og:image=${m.ogImage} twitter:image=${m.twitterImage}`);
      }
    }
    if (missingPngs.length > 0) {
      console.error(`\n${missingPngs.length} doc page(s) reference a PNG that doesn't exist on disk:\n`);
      for (const m of missingPngs.slice(0, 20)) {
        console.error(`  ${m.file}: missing ${m.expectedPngPath}`);
      }
    }
    if (otherMismatches.length > 0) {
      console.error(`\n${otherMismatches.length} non-doc page(s) no longer match the site default:\n`);
      for (const m of otherMismatches.slice(0, 20)) {
        console.error(`  ${m.file}: ${m.ogImage ?? '(no og:image tag found)'}`);
      }
    }
    process.exit(1);
  }

  console.log('\nOK: every doc page has a correct generated og:image (or kept its manual override), and every other page still uses the site default.');
}

module.exports = { walkHtmlFiles, extractMetaContent, getSiteConfig };

if (require.main === module) {
  main();
}
