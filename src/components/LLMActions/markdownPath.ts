/**
 * Site-relative path to the generated clean Markdown for a doc permalink.
 *
 * The markdown-pages plugin writes each page to `<permalink>.md` at build time
 * (see MARKDOWN_PIPELINE.md). Shared by LLMActions (Copy / View as Markdown) and
 * MarkdownAlternateLink (the <link rel="alternate"> head tag) so the convention
 * lives in one place.
 */
export function getMarkdownPath(permalink: string): string {
  return `${permalink.replace(/\/$/, '')}.md`;
}
