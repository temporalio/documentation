// Single source of truth for Mermaid diagram layout/typography, used by
// docusaurus.config.js (themeConfig.mermaid.options) and by the dev-only
// diagram review tool (scripts/mermaid-compare/, regenerate its
// mermaid-theme.json from this file after editing it).
//
// These are mode-independent (no colors) because Docusaurus applies
// `themeConfig.mermaid.options` identically in light and dark mode; only
// `themeConfig.mermaid.theme.{light,dark}` (a built-in theme name) varies by
// color mode. Brand colors are handled separately via CSS overrides in
// src/css/custom.css targeting Mermaid's generated SVG classes, which is not
// subject to that light/dark limitation — see the comment there for why.
module.exports = {
  // Kept mode-aware (matching Docusaurus's own default) rather than pinned
  // to a single base theme, as a safety net for anything custom.css's
  // Mermaid overrides don't explicitly recolor (e.g. rarely-used elements
  // like the sequenceNumber marker) — verified those still need Mermaid's
  // own light/dark split to stay correct, not just the CSS layer.
  theme: { light: 'default', dark: 'dark' },
  fontFamily: '"Aeonik", "Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
  flowchart: {
    padding: 14,
    nodeSpacing: 45,
    rankSpacing: 60,
    curve: 'basis',
    htmlLabels: true,
    wrap: true,
  },
  sequence: {
    actorMargin: 60,
    messageMargin: 40,
    boxMargin: 12,
    noteMargin: 12,
    // NOT wrap: true — Mermaid mis-sizes the note/message box width whenever
    // the text already has explicit <br/> breaks (a common pattern in these
    // diagrams) while wrap is on, at any font size: the box comes out
    // narrower than the actual rendered text, so text overflows its own
    // box. Confirmed by direct comparison; flowchart's `wrap` does not have
    // this problem (only sequence). Long single-line messages without <br/>
    // just render unwrapped (no auto line-break) instead — worse for that
    // one case, but the halo on .messageText already keeps unwrapped text
    // readable where it crosses a line, whereas a mis-sized note box is a
    // correctness bug with no equivalent mitigation.
    mirrorActors: false,
  },
  state: {
    padding: 14,
  },
};
