const { themes } = require('prism-react-renderer');

function withCommentColor(theme, color) {
  return {
    ...theme,
    styles: theme.styles.map((entry) =>
      entry.types.includes('comment')
        ? { ...entry, style: { ...entry.style, color } }
        : entry,
    ),
  };
}

/** Palenight with accessible comment contrast on #292d3e (was #697098, now #8a93c8). */
const prismPalenightAccessible = withCommentColor(themes.palenight, '#8a93c8');

module.exports = {
  prismDarkTheme: prismPalenightAccessible,
  prismLightTheme: prismPalenightAccessible,
};
