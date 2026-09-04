// Split out from render.js so shared.js (used by the remark plugin, which
// runs on every doc during MDX compilation) can depend on these without
// pulling in render.js's heavy image-rendering dependencies (satori, resvg,
// sharp) just to compute a hash/path.

// Bump this whenever the card layout/design changes (including the encoding
// step in render.js) so cached images invalidate even though the underlying
// page content didn't change.
const TEMPLATE_VERSION = 8;

const IMAGE_EXTENSION = 'jpg';

// Footer label rendered bottom-right of the card, next to the logo. Per-target
// overrides (e.g. ai-cookbook) are passed explicitly alongside docsDir/
// routeBasePath wherever a target is configured — see docusaurus.config.js.
const DEFAULT_FOOTER_TEXT = 'DOCS.TEMPORAL.IO';

// Matches docusaurus.config.js's `url`. Kept as its own literal rather than
// importing that config module: this constant only needs the production
// origin for og:image URLs, not the rest of the site config, and
// docusaurus.config.js already pulls in enough of this plugin's tree that
// requiring it back from here risks a cycle.
const PRODUCTION_SITE_URL = 'https://docs.temporal.io';

module.exports = { TEMPLATE_VERSION, IMAGE_EXTENSION, DEFAULT_FOOTER_TEXT, PRODUCTION_SITE_URL };
