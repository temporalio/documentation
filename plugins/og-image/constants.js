// Split out from render.js so shared.js (used by the remark plugin, which
// runs on every doc during MDX compilation) can depend on these without
// pulling in render.js's heavy image-rendering dependencies (satori, resvg,
// sharp) just to compute a hash/path.

// Bump this whenever the card layout/design changes (including the encoding
// step in render.js) so cached images invalidate even though the underlying
// page content didn't change.
const TEMPLATE_VERSION = 8;

const IMAGE_EXTENSION = 'jpg';

module.exports = { TEMPLATE_VERSION, IMAGE_EXTENSION };
