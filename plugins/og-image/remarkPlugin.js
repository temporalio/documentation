const path = require('path');
const { extractTitle, hasManualOverride, hashFor, stripFrontmatter, IMAGE_EXTENSION } = require('./shared');

// This is what actually makes the generated og:image survive client-side
// hydration. The previous approach patched og:image/twitter:image directly
// into the built .html files from a postBuild hook — that fooled anything
// reading the raw static HTML (curl, and non-JS social-share scrapers like
// Slack/X/Facebook), but react-helmet-async (which Docusaurus uses for
// <head>) re-renders <head> from the component tree the moment the page
// hydrates in a real browser. Since that component tree had no idea a
// generated image existed, hydration silently reverted the tag back to the
// site-wide default.
//
// Front-matter `image:` is a mechanism Docusaurus's own PageMetadata
// component already renders correctly through both SSR and hydration (it's
// the same mechanism a page uses to manually opt out — see
// hasManualOverride below). So instead of patching HTML after the fact, this
// injects that same front-matter field with the path the generated card
// will actually be written to (by plugins/og-image/index.js's postBuild),
// early enough — during MDX compilation — that it becomes genuine front
// matter data. Docusaurus then renders it itself, identically, every time.
//
// Registered in docusaurus.config.js's docs preset `remarkPlugins`.
function ogImageRemarkPlugin() {
  return (tree, file) => {
    // `docusaurus build` always runs with NODE_ENV=production (see
    // @docusaurus/core's build command); `docusaurus start` (yarn start)
    // never does. Gating on it here means local dev keeps showing the
    // site-wide default image exactly as before — the actual card image
    // bytes only ever get rendered by postBuild, which only runs during a
    // real build anyway, so there's nothing for a dev-mode `image:` path to
    // point at.
    if (process.env.NODE_ENV !== 'production') return;

    const frontMatter = file.data && file.data.frontMatter;
    if (!frontMatter || typeof frontMatter !== 'object') return;

    const content = stripFrontmatter(String(file.value ?? ''));
    if (hasManualOverride(frontMatter, content)) return;

    const id = frontMatter.id || path.basename(file.path || '').replace(/\.(md|mdx)$/i, '');
    const title = extractTitle(content, frontMatter, id);
    const description = frontMatter.description;
    const hash = hashFor(title, description);

    // Mutating in place, not reassigning file.data.frontMatter — the mdx
    // loader holds the same object reference and serializes it into the
    // compiled module's `export const frontMatter = {...}` after this runs.
    frontMatter.image = `/img/og/${hash}.${IMAGE_EXTENSION}`;
  };
}

module.exports = ogImageRemarkPlugin;
