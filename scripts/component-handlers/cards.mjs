/**
 * component-handlers/cards.mjs
 *
 * Handler for card components whose content is an inline
 *   items={[{ href, title, description }, ...]}
 * prop: <QuickstartCards> and <PatternCards>.
 * Components:
 *   src/components/QuickstartCards.tsx
 *   src/components/PatternCards.tsx
 *
 * These render a visual card grid in the browser; for the LLM markdown pipeline
 * we parse the inline `items` prop and emit a Markdown link list. The data lives
 * in the prop itself (no separate data file), so the parsing happens here rather
 * than reading a file.
 */

/**
 * Parse an `items={[{ href, title, description }, ...]}` prop out of a JSX tag
 * string (which may span multiple lines, already joined).
 * @returns {Array<{href: string, title: string, description: string}>}
 */
export function parseCardItems(tagStr) {
  const arr = tagStr.match(/items=\{(\[[\s\S]*\])\}/);
  if (!arr) return [];

  const items = [];
  // Each object literal { ... } — card objects have no nested braces.
  for (const m of arr[1].matchAll(/\{([^{}]+)\}/g)) {
    const obj = m[1];
    const get = (key) => {
      const km = obj.match(new RegExp(`${key}:\\s*["'\`]([^"'\`]*)["'\`]`));
      return km ? km[1] : "";
    };
    const href = get("href");
    const title = get("title");
    if (!href && !title) continue;
    items.push({ href, title, description: get("description") });
  }
  return items;
}

/**
 * Render parsed card items as a Markdown list.
 * @returns {string}
 */
export function cardsToMarkdown(items) {
  return items
    .map((it) => {
      const label = it.title || it.href;
      const link = it.href ? `[${label}](${it.href})` : label;
      return it.description ? `- ${link}: ${it.description}` : `- ${link}`;
    })
    .join("\n");
}
