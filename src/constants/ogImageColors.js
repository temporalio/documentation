// Colors used by the generated og:image cards (plugins/og-image/render.js).
// Where a value matches an existing brand color, it's the same hex as the
// CSS custom property in src/css/custom.css — CSS custom properties aren't
// consumable from a Node build script, so the value is duplicated here
// rather than imported. Keep these in sync if the source token changes.
module.exports = {
  // Matches --indigo-100 in src/css/custom.css.
  SUBTITLE_COLOR: '#cacbf9',
  // Matches --off-white in src/css/custom.css.
  FOOTER_COLOR: '#f8fafc',
  // Pure white per the design team's Figma spec — deliberately not
  // --off-white, no matching existing token.
  TITLE_COLOR: '#ffffff',
};
