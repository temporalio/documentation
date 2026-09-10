const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { renderCard } = require('./render');
const { walkDir, resolveUrlPath } = require('../shared/docsRouting');
const {
  extractTitle,
  hasManualOverride,
  overrideImageFor,
  hashFor,
  resolveImageOrigin,
  IMAGE_EXTENSION,
  DEFAULT_FOOTER_TEXT,
} = require('./shared');

const CACHE_DIR = path.join(__dirname, '../../node_modules/.cache/og-images');

function htmlPathForUrlPath(outDir, urlPath) {
  return urlPath === 'index'
    ? path.join(outDir, 'index.html')
    : path.join(outDir, urlPath, 'index.html');
}

async function getCardBuffer(title, description, footerText) {
  const hash = hashFor(title, description, footerText);
  const cachePath = path.join(CACHE_DIR, `${hash}.${IMAGE_EXTENSION}`);
  if (fs.existsSync(cachePath)) {
    return { hash, buffer: fs.readFileSync(cachePath), cached: true };
  }
  const buffer = await renderCard({ title, description, footerText });
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(cachePath, buffer);
  return { hash, buffer, cached: false };
}

// Accepts either a single {docsDir, routeBasePath} (back-compat) or a
// `targets` array, so one plugin instance can walk multiple docs plugin
// instances that live at different routeBasePaths (e.g. the main docs/ tree
// at '/' plus ai-cookbook/ at '/ai-cookbook').
function normalizeTargets(options) {
  if (Array.isArray(options.targets) && options.targets.length) {
    return options.targets;
  }
  return [{ docsDir: options.docsDir || 'docs', routeBasePath: options.routeBasePath }];
}

function ogImagePlugin(context, options = {}) {
  const targets = normalizeTargets(options).map(({ docsDir, routeBasePath, footerText }) => ({
    docsDir: path.resolve(context.siteDir, docsDir),
    routeBasePath,
    footerText: footerText || DEFAULT_FOOTER_TEXT,
  }));

  return {
    name: 'og-image',

    // plugins/og-image/remarkPlugin.js is what actually gets the correct
    // og:image/twitter:image into each page's rendered <head> — it injects
    // the same hash-based path computed below as real front matter, early
    // enough (during MDX compilation) that Docusaurus's own PageMetadata
    // component renders it identically during SSR and client hydration. All
    // this postBuild hook is responsible for is making sure the *image
    // bytes* that path points to actually exist in the build output.
    async postBuild({ outDir }) {
      let generated = 0;
      let cached = 0;
      let skipped = 0;
      let overridden = 0;
      let renderMs = 0;
      let outputBytes = 0;

      for (const { docsDir, routeBasePath, footerText } of targets) {
        const files = walkDir(docsDir);

        for (const filePath of files) {
          const raw = fs.readFileSync(filePath, 'utf8');
          const { data: frontmatter, content } = matter(raw);
          const urlPath = resolveUrlPath(docsDir, filePath, frontmatter, routeBasePath);
          const htmlPath = htmlPathForUrlPath(outDir, urlPath);

          if (!fs.existsSync(htmlPath)) {
            // Not a routed page (e.g. an underscore-prefixed partial or an
            // excluded directory) — nothing to render a card for.
            skipped++;
            continue;
          }

          if (hasManualOverride(frontmatter, content)) {
            // The page's own front matter/<Head> already won; nothing to
            // render.
            overridden++;
            continue;
          }

          const id = frontmatter.id || path.basename(filePath).replace(/\.(md|mdx)$/i, '');
          const title = extractTitle(content, frontmatter, id);
          const description = frontmatter.description;
          const renderStart = Date.now();
          const { hash, buffer, cached: wasCached } = await getCardBuffer(title, description, footerText);
          if (wasCached) {
            cached++;
          } else {
            generated++;
            renderMs += Date.now() - renderStart;
          }
          outputBytes += buffer.length;

          const cardOutPath = path.join(outDir, 'img', 'og', `${hash}.${IMAGE_EXTENSION}`);
          if (!fs.existsSync(cardOutPath)) {
            fs.mkdirSync(path.dirname(cardOutPath), { recursive: true });
            fs.copyFileSync(path.join(CACHE_DIR, `${hash}.${IMAGE_EXTENSION}`), cardOutPath);
          }
        }
      }

      console.log(
        `[og-image] ${generated} card(s) rendered, ${cached} served from cache, ${overridden} page(s) kept a manual override, ${skipped} page(s) skipped (not routed)`,
      );

      // Consumed by bin/check-og-build-budget.js so build-time/size
      // regressions can be caught in CI instead of just eyeballed.
      fs.writeFileSync(
        path.join(outDir, '.og-image-stats.json'),
        JSON.stringify({ generated, cached, overridden, skipped, renderMs, outputBytes }, null, 2),
      );
    },
  };
}

// Exposed so bin/validate-og-images.js and bin/generate-og-gallery.js can
// compute the exact same expected route/title/hash a doc page got, instead
// of re-deriving that logic and risking drift between the plugin and its
// own validation script.
ogImagePlugin.walkDir = walkDir;
ogImagePlugin.resolveUrlPath = resolveUrlPath;
ogImagePlugin.htmlPathForUrlPath = htmlPathForUrlPath;
ogImagePlugin.extractTitle = extractTitle;
ogImagePlugin.hashFor = hashFor;
ogImagePlugin.hasManualOverride = hasManualOverride;
ogImagePlugin.overrideImageFor = overrideImageFor;
ogImagePlugin.resolveImageOrigin = resolveImageOrigin;
ogImagePlugin.IMAGE_EXTENSION = IMAGE_EXTENSION;

module.exports = ogImagePlugin;
