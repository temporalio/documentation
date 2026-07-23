const crypto = require('crypto');
const matter = require('gray-matter');
const { TEMPLATE_VERSION, IMAGE_EXTENSION } = require('./constants');

// Shared by plugins/og-image/index.js (postBuild: renders the actual image
// bytes) and plugins/og-image/remarkPlugin.js (build-time MDX compilation:
// injects the front-matter `image` path Docusaurus's own metadata pipeline
// renders). Keeping this logic in one place guarantees both sides compute
// the exact same hash/path for a given page — if they drifted, a page's
// <meta> tag and its actual rendered file would point at different hashes.

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

// A page opts out of the generated card either via front matter `image:`
// (the mechanism Docusaurus already supports natively for docs) or by
// embedding its own <Head> og:image override directly in the MDX content
// (the mechanism used for pages without front matter support).
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

// Deliberately excludes section: render.js doesn't render it (dropped along
// with the section pill in the Figma redesign), so including it here would
// just fragment the cache between pages that render pixel-identically.
function hashFor(title, description) {
  return crypto
    .createHash('sha256')
    .update(`v${TEMPLATE_VERSION}:${title}:${description || ''}`)
    .digest('hex')
    .slice(0, 16);
}

// The remark plugin gets raw MDX source straight from Docusaurus's compiler
// (frontmatter block still attached), unlike postBuild/bin scripts which
// read files directly through gray-matter and already have it split into
// {data, content}. Re-splitting it the same way here (rather than, say,
// deriving a title from the mdast tree) guarantees both sides extract the
// exact same title from the exact same content for a given page.
function stripFrontmatter(raw) {
  return matter(raw).content;
}

module.exports = {
  humanize,
  extractTitle,
  hasManualOverride,
  overrideImageFor,
  hashFor,
  stripFrontmatter,
  IMAGE_EXTENSION,
};
