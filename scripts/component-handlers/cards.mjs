/**
 * component-handlers/cards.mjs
 *
 * Handler for card components whose content is an inline
 *   items={[{ href, title, description }, ...]}
 * prop: <QuickstartCards>, <PatternCards>, and <GridCardList>.
 * Components:
 *   src/components/QuickstartCards.tsx
 *   src/components/PatternCards.tsx
 *   src/components/elements/GridCard/GridCardList.tsx
 *
 * These render a visual card grid in the browser; for the LLM markdown pipeline
 * we parse the inline `items` prop and emit a Markdown link list. The data lives
 * in the prop itself (no separate data file), so the parsing happens here rather
 * than reading a file.
 */

/**
 * Parse an `items={[{ href, title, description, tags, sdk }, ...]}` prop out of
 * a JSX tag string (which may span multiple lines, already joined). `tags` and
 * `sdk` are optional (only GridCardList items carry them) and surface in the
 * output the same way IntegrationsGrid's do — see cardsToMarkdown.
 * @returns {Array<{href: string, title: string, description: string, tags: string[], sdk: string}>}
 */
export function parseCardItems(tagStr) {
  const arr = tagStr.match(/items=\{(\[[\s\S]*\])\}/);
  if (!arr) return [];

  const items = [];
  // Each object literal { ... } — card objects have no nested braces (a
  // `tags: [...]` array uses brackets, not braces, so it doesn't confuse this).
  for (const m of arr[1].matchAll(/\{([^{}]+)\}/g)) {
    const obj = m[1];
    const get = (key) => {
      // Capture the opening quote character and require the *same* one to
      // close, rather than excluding all three quote characters — otherwise
      // an apostrophe inside a double-quoted string (e.g. "Temporal's")
      // truncates the match at the apostrophe instead of the real closing quote.
      const km = obj.match(new RegExp(`${key}:\\s*(["'\`])((?:(?!\\1).)*)\\1`));
      return km ? km[2] : "";
    };
    const getArray = (key) => {
      const km = obj.match(new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`));
      if (!km) return [];
      return [...km[1].matchAll(/(["'\`])((?:(?!\1).)*)\1/g)].map((m) => m[2]);
    };
    const href = get("href");
    const title = get("title");
    if (!href && !title) continue;
    items.push({
      href,
      title,
      description: get("description"),
      tags: getArray("tags"),
      sdk: get("sdk"),
    });
  }
  return items;
}

/**
 * Render parsed card items as a Markdown list. Items with `tags` and/or `sdk`
 * (GridCardList) get a trailing `_(SDK · tags)_` suffix, matching the format
 * IntegrationsGrid uses (integrations.mjs's integrationsToMarkdownList).
 * @returns {string}
 */
export function cardsToMarkdown(items) {
  return items
    .map((it) => {
      const label = it.title || it.href;
      const link = it.href ? `[${label}](${it.href})` : label;
      const meta = [it.sdk, ...(it.tags || [])].filter(Boolean).join(" · ");
      const suffix = meta ? ` _(${meta})_` : "";
      return it.description ? `- ${link}: ${it.description}${suffix}` : `- ${link}${suffix}`;
    })
    .join("\n");
}
