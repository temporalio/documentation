/**
 * component-handlers/for-os.mjs
 *
 * Handler for <ForOs os="...">...</ForOs>.
 * Component: src/components/elements/ForOs/index.js
 *
 * In the browser, ForOs shows its children only for the reader's selected OS.
 * The Markdown output has no selected OS, so every variant is kept and labeled
 * with the OS it applies to:
 *
 *   Block:  <ForOs os="windows">  →  **Windows:**  (then the children)
 *   Inline: Open <ForOs os="windows">PowerShell</ForOs><ForOs os="macos linux">a terminal</ForOs>.
 *           →  Open (**Windows:** PowerShell; **macOS and Linux:** a terminal).
 *   A line that is only ForOs elements becomes one labeled paragraph per element.
 */

// Display labels for the values used by <Tabs groupId="os">.
export const OS_LABELS = {
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
  docker: "Docker",
};

const OS_PROP_RE = /\bos=(?:"([^"]*)"|'([^']*)')/;
const FOR_OS_ELEMENT = String.raw`<ForOs\b[^>]*>[\s\S]*?<\/ForOs>`;
const FOR_OS_RUN_RE = new RegExp(`${FOR_OS_ELEMENT}(?:\\s*${FOR_OS_ELEMENT})*`, "g");
const FOR_OS_PARTS_RE = /<ForOs\b([^>]*)>([\s\S]*?)<\/ForOs>/g;

/**
 * "macos linux" → "macOS and Linux". Unknown values pass through as written.
 * @param {string} attrs  The attribute string (or whole tag) holding `os=`.
 */
export function forOsLabel(attrs) {
  const m = attrs.match(OS_PROP_RE);
  const names = (m ? m[1] ?? m[2] : "")
    .split(/\s+/)
    .filter(Boolean)
    .map((os) => OS_LABELS[os.toLowerCase()] || os);
  if (names.length <= 2) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

/**
 * Rewrite every inline <ForOs> element in a prose line. Adjacent elements are
 * grouped into one parenthetical so a sentence still reads as one sentence.
 * @param {string} line
 * @returns {string}
 */
export function forOsInlineToMarkdown(line) {
  if (!line.includes("<ForOs")) return line;
  const wholeLine = line.trim().match(new RegExp(`^${FOR_OS_RUN_RE.source}$`));
  return line.replace(FOR_OS_RUN_RE, (run) => {
    const parts = [...run.matchAll(FOR_OS_PARTS_RE)].map(
      ([, attrs, inner]) => `**${forOsLabel(attrs)}:** ${inner.trim()}`
    );
    return wholeLine ? parts.join("\n\n") : `(${parts.join("; ")})`;
  });
}

/**
 * Handle a line that is only a block-level <ForOs> open or close tag.
 * Returns the label line for an open tag, "" for a close tag, and null for any
 * other line.
 * @param {string} line
 * @returns {string|null}
 */
export function forOsBlockLineToMarkdown(line) {
  const trimmed = line.trim();
  if (/^<ForOs\b[^>]*>$/.test(trimmed) && !trimmed.endsWith("/>")) {
    const indent = line.match(/^\s*/)[0];
    return `${indent}**${forOsLabel(trimmed)}:**`;
  }
  if (/^<\/ForOs>$/.test(trimmed)) return "";
  return null;
}
