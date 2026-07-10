const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const matter = require('gray-matter');
const { renderCard, TEMPLATE_VERSION } = require('./render');

const CACHE_DIR = path.join(__dirname, '../../node_modules/.cache/og-images');

function walkDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) return walkDir(full);
    if (/\.(md|mdx)$/i.test(name)) return [full];
    return [];
  });
}

// Mirrors plugins/markdown-pages's route resolution (slug/id front matter
// takes precedence over the file path) so generated cards land at the same
// route Docusaurus actually builds the page at.
function resolveUrlPath(docsDir, filePath, frontmatter) {
  if (frontmatter.slug) {
    const slug = frontmatter.slug.replace(/^\/+/, '').replace(/\/+$/, '');
    return slug || 'index';
  }
  const rel = path.relative(docsDir, filePath).replace(/\\/g, '/');
  const withoutExt = rel.replace(/\.(md|mdx)$/i, '');
  const id = frontmatter.id || path.basename(withoutExt);
  const dir = path.dirname(withoutExt);
  if (dir === '.') return id === 'index' ? 'index' : id;
  if (id === 'index' || id === path.basename(dir)) return dir;
  return `${dir}/${id}`;
}

function htmlPathForUrlPath(outDir, urlPath) {
  return urlPath === 'index'
    ? path.join(outDir, 'index.html')
    : path.join(outDir, urlPath, 'index.html');
}

function humanize(id) {
  return id
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractTitle(content, frontmatter, id) {
  if (frontmatter.title) return frontmatter.title;
  const heading = content.match(/^#\s+(.+)$/m);
  if (heading) return heading[1].trim();
  return humanize(id);
}

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

// Top-level folder name -> display label, for the cases where the generic
// humanize() (hyphens -> spaces, capitalize each word) reads wrong, e.g.
// "cli" -> "Cli" instead of "CLI".
const SECTION_OVERRIDES = {
  cli: 'CLI',
  'tctl-v1': 'tctl v1',
};

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

// A page opts out of the generated card either via front matter `image:`
// (the mechanism Docusaurus already supports natively for docs) or by
// embedding its own <Head> og:image override directly in the MDX content
// (the mechanism used for pages without front matter support). Either way,
// Docusaurus/react-helmet has already rendered that override into the built
// HTML by the time postBuild runs, so all we have to do is leave it alone.
function hasManualOverride(frontmatter, content) {
  return Boolean(frontmatter.image) || /<Head[^>]*>[\s\S]*?og:image[\s\S]*?<\/Head>/i.test(content);
}

// For a page with a manual override, this is the image it's actually using
// — front-matter `image:` if set, otherwise whatever content= value the
// page's own <Head> og:image tag has. Used by bin/validate-og-images.js and
// bin/generate-og-gallery.js so neither has to re-parse the <Head> block.
function overrideImageFor(frontmatter, content, siteUrl) {
  if (frontmatter.image) return new URL(frontmatter.image, siteUrl).toString();
  const headMatch = content.match(/<Head[^>]*>([\s\S]*?)<\/Head>/i);
  if (!headMatch) return null;
  const tagMatch = headMatch[1].match(/<meta[^>]*property=["']?og:image["']?[^>]*>/i);
  if (!tagMatch) return null;
  const contentMatch = tagMatch[0].match(/content=["']?([^"'\s>]+)["']?/i);
  return contentMatch ? contentMatch[1] : null;
}

function hashFor(title, description, section) {
  return crypto
    .createHash('sha256')
    .update(`v${TEMPLATE_VERSION}:${section}:${title}:${description || ''}`)
    .digest('hex')
    .slice(0, 16);
}

async function getCardBuffer(title, description, section) {
  const hash = hashFor(title, description, section);
  const cachePath = path.join(CACHE_DIR, `${hash}.png`);
  if (fs.existsSync(cachePath)) {
    return { hash, buffer: fs.readFileSync(cachePath), cached: true };
  }
  const buffer = await renderCard({ title, description, section });
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(cachePath, buffer);
  return { hash, buffer, cached: false };
}

// On a Vercel preview (or local dev) deployment, generated cards only exist
// on that deployment's own URL — siteConfig.url is always the production
// domain, which never got this build's images. Pointing og:image there
// means Slack/X/Facebook/etc. 404 when fetching a preview link, since they
// resolve the literal URL in the meta tag, not wherever the page happens to
// be served from. VERCEL_URL is Vercel's own reachable hostname for the
// current deployment (preview or production); only substitute it for
// non-production deployments, since production should keep the stable
// custom domain. Local builds (no VERCEL_ENV) are unaffected.
function resolveSiteUrl(siteConfig) {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return siteConfig.url;
}

function replaceImageMeta(html, absoluteUrl) {
  return html
    .replace(
      /(<meta[^>]*property=["']?og:image["']?[^>]*content=)["']?[^"'\s>]+["']?/i,
      `$1${absoluteUrl}`,
    )
    .replace(
      /(<meta[^>]*name=["']?twitter:image["']?[^>]*content=)["']?[^"'\s>]+["']?/i,
      `$1${absoluteUrl}`,
    );
}

function ogImagePlugin(context, options = {}) {
  const docsDir = path.resolve(context.siteDir, options.docsDir || 'docs');

  return {
    name: 'og-image',

    async postBuild({ outDir, siteConfig }) {
      const files = walkDir(docsDir);
      let generated = 0;
      let cached = 0;
      let skipped = 0;
      let overridden = 0;
      let renderMs = 0;
      let outputBytes = 0;

      for (const filePath of files) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content } = matter(raw);
        const urlPath = resolveUrlPath(docsDir, filePath, frontmatter);
        const htmlPath = htmlPathForUrlPath(outDir, urlPath);

        if (!fs.existsSync(htmlPath)) {
          // Not a routed page (e.g. an underscore-prefixed partial or an
          // excluded directory) — nothing to inject an og:image into.
          skipped++;
          continue;
        }

        if (hasManualOverride(frontmatter, content)) {
          // Docusaurus already rendered the author's own image into this
          // page's meta tags — don't touch it.
          overridden++;
          continue;
        }

        const id = frontmatter.id || path.basename(filePath).replace(/\.(md|mdx)$/i, '');
        const title = extractTitle(content, frontmatter, id);
        const description = frontmatter.description;
        const section = resolveSection(docsDir, filePath);
        const renderStart = Date.now();
        const { hash, buffer, cached: wasCached } = await getCardBuffer(title, description, section);
        if (wasCached) {
          cached++;
        } else {
          generated++;
          renderMs += Date.now() - renderStart;
        }
        outputBytes += buffer.length;

        const cardOutPath = path.join(outDir, 'img', 'og', `${hash}.png`);
        if (!fs.existsSync(cardOutPath)) {
          fs.mkdirSync(path.dirname(cardOutPath), { recursive: true });
          fs.copyFileSync(path.join(CACHE_DIR, `${hash}.png`), cardOutPath);
        }

        const absoluteUrl = new URL(
          path.posix.join(siteConfig.baseUrl, 'img/og', `${hash}.png`),
          resolveSiteUrl(siteConfig),
        ).toString();

        const html = fs.readFileSync(htmlPath, 'utf8');
        fs.writeFileSync(htmlPath, replaceImageMeta(html, absoluteUrl));
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

// Exposed so bin/validate-og-images.js can compute the exact same expected
// route/title/hash a doc page got, instead of re-deriving that logic and
// risking drift between the plugin and its own validation script.
ogImagePlugin.walkDir = walkDir;
ogImagePlugin.resolveUrlPath = resolveUrlPath;
ogImagePlugin.htmlPathForUrlPath = htmlPathForUrlPath;
ogImagePlugin.extractTitle = extractTitle;
ogImagePlugin.resolveSection = resolveSection;
ogImagePlugin.hashFor = hashFor;
ogImagePlugin.hasManualOverride = hasManualOverride;
ogImagePlugin.overrideImageFor = overrideImageFor;
ogImagePlugin.resolveSiteUrl = resolveSiteUrl;

module.exports = ogImagePlugin;
