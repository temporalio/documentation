/**
 * component-handlers/hero.mjs
 *
 * Handler for the homepage hero cards (<ActionCard> / <CommunityCard>) used in
 * docs/index.mdx and rendered by src/components/elements/HomePageHero.js.
 *
 * The copy lives in the MDX itself: `title` and `href` are props on the tag and
 * the description is the element's children (which may contain inline links or
 * <span> markup). This handler parses one card element into a Markdown link-list
 * item: `- [title](href): description`.
 *
 * The layout wrappers (HeroWrapper, HeroSection, HeroContent, …) are handled by
 * the transformer's generic `strip-tag` strategy — they carry no copy of their
 * own, so there is nothing to resolve here.
 */

/** Read a `name="..."`, `name='...'`, or `name={"..."}` prop from a tag string. */
function getProp(tagStr, name) {
  const m =
    tagStr.match(new RegExp(`${name}=["']([^"']*)["']`)) ||
    tagStr.match(new RegExp(`${name}=\\{["'\`]([^"'\`]*)["'\`]\\}`));
  return m ? m[1] : "";
}

/** Convert the inline children markup to plain Markdown. */
function cleanInline(s) {
  return s
    // <a href="X">Y</a> → [Y](X)
    .replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    // drop any remaining inline HTML tags (e.g. <span class="linkify">)
    .replace(/<\/?[a-z][^>]*>/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Parse a single hero card element string into its parts.
 * @param {string} elementStr e.g. `<ActionCard href="/x" title="Y">desc</ActionCard>`
 * @returns {{href: string, title: string, description: string}}
 */
export function parseHeroCard(elementStr) {
  const openEnd = elementStr.indexOf(">");
  const closeStart = elementStr.lastIndexOf("</");
  const openTag = elementStr.slice(0, openEnd + 1);
  const inner = openEnd >= 0 && closeStart > openEnd ? elementStr.slice(openEnd + 1, closeStart) : "";
  return {
    href: getProp(openTag, "href"),
    title: getProp(openTag, "title"),
    description: cleanInline(inner),
  };
}

/**
 * Resolve a <HeroHeadline>…</HeroHeadline> element to a Markdown H1.
 * The homepage headline is a React-rendered <h1> (not a Markdown `#`) so it
 * skips the theme's h1 override; here we restore it as a heading for the .md.
 * @returns {string} `# text` (empty string if no text)
 */
export function heroHeadlineToMarkdown(elementStr) {
  const openEnd = elementStr.indexOf(">");
  const closeStart = elementStr.lastIndexOf("</");
  const text = openEnd >= 0 && closeStart > openEnd ? cleanInline(elementStr.slice(openEnd + 1, closeStart)) : "";
  return text ? `# ${text}` : "";
}

/**
 * Resolve a hero card element to a Markdown link-list item.
 * @returns {string} `- [title](href): description` (empty string if no content)
 */
export function heroCardToMarkdown(elementStr) {
  const { href, title, description } = parseHeroCard(elementStr);
  if (!href && !title) return "";
  const label = title || href;
  let line = href ? `- [${label}](${href})` : `- ${label}`;
  if (description) line += `: ${description}`;
  return line;
}
