// Fixed (not content-hashed) og:image path for the /ai-cookbook landing page
// (src/pages/ai-cookbook.tsx) — a plain React page, not an MDX doc, so it's
// outside the per-doc content-hash cache plugins/og-image/index.js uses for
// everything else. Its title/description are hardcoded literals that rarely
// change, so a fixed filename (same convention as themeConfig's sitewide
// default image) is simpler than keeping a hash in sync across a Node build
// script and a React component. Shared by plugins/cookbook-index/index.js
// (renders the file here), src/pages/ai-cookbook.tsx (references it in
// og:image/twitter:image meta), and bin/validate-og-images.js (asserts it).
module.exports = {
  AI_COOKBOOK_OG_IMAGE_PATH: '/img/og/ai-cookbook.jpg',
};
