// Appends a page's `section_title` frontmatter value to its title, e.g.
// "Workflow basics" + "Java SDK" -> "Workflow basics - Java SDK". Used for the
// browser <title> and og:title (src/theme/DocItem/Metadata) and for titles in
// llms.txt (plugins/markdown-pages), but not for the on-page heading.
//
// Pure and dependency-free so the same code runs in the browser bundle and in
// Node build plugins. A title that already mentions the section title is left
// alone, so "Set up your local with the Java SDK" doesn't become
// "... Java SDK - Java SDK".

const SEPARATOR = ' - ';

function titleWithSection(title, sectionTitle) {
  if (typeof title !== 'string' || typeof sectionTitle !== 'string') return title;
  const section = sectionTitle.trim();
  if (!section || title.toLowerCase().includes(section.toLowerCase())) return title;
  return `${title}${SEPARATOR}${section}`;
}

module.exports = { titleWithSection };
