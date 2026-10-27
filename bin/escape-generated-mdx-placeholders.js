// Normalizes generated command-reference MDX. Generated descriptions are
// Markdown, so `{name}` must be escaped to render as literal text in MDX.

const PLACEHOLDER = /\{([A-Za-z_][A-Za-z0-9_.-]*)\}/g;

function stripKeywordsFromFrontmatter(content) {
  const lines = content.split('\n');
  if (lines[0] !== '---') return content;

  const frontmatterEnd = lines.indexOf('---', 1);
  if (frontmatterEnd === -1) return content;

  const result = [];
  for (let index = 0; index < lines.length; index++) {
    if (index > 0 && index < frontmatterEnd && /^keywords:/.test(lines[index])) {
      while (index + 1 < frontmatterEnd && /^[ \t]/.test(lines[index + 1])) {
        index++;
      }
      continue;
    }
    result.push(lines[index]);
  }
  return result.join('\n');
}

function escapePlaceholdersInLine(line) {
  // Inline code is already literal MDX content. Process the text between code
  // spans so a generated example such as `--name {name}` is unchanged.
  return line
    .split(/(`[^`]*`)/)
    .map((part) => (part.startsWith('`') ? part : part.replace(PLACEHOLDER, '\\{$1\\}')))
    .join('');
}

function escapeGeneratedMdxPlaceholders(content) {
  const lines = content.split('\n');
  let inFrontmatter = lines[0] === '---';
  let fenceMarker;
  let inMdxComment = false;

  return lines
    .map((line, index) => {
      if (inFrontmatter) {
        if (index > 0 && line === '---') inFrontmatter = false;
        return line;
      }

      const fence = line.match(/^\s*(`{3,}|~{3,})/);
      if (fence) {
        if (!fenceMarker) {
          fenceMarker = fence[1][0];
        } else if (fence[1][0] === fenceMarker) {
          fenceMarker = undefined;
        }
        return line;
      }
      if (fenceMarker) return line;

      if (inMdxComment || line.includes('{/*')) {
        inMdxComment = !line.includes('*/}');
        return line;
      }

      // The generated command reference is Markdown, but the postprocessor
      // adds imports and JSX. Do not alter those MDX constructs.
      if (/^\s*(?:import|export)\b/.test(line) || /^\s*</.test(line)) {
        return line;
      }

      return escapePlaceholdersInLine(line);
    })
    .join('\n');
}

module.exports = { escapeGeneratedMdxPlaceholders, stripKeywordsFromFrontmatter };
