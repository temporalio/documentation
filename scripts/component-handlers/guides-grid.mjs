/**
 * component-handlers/guides-grid.mjs
 *
 * Handler for <GuidesGrid /> (self-closing, no props).
 * Component: src/components/GuidesGrid/index.tsx
 *
 * GuidesGrid renders, in the browser, a filterable card grid of every Guide.
 * Its data lives in src/components/GuidesGrid/guides-data.json, which we read
 * at build time to emit a Markdown list with each Guide's description, SDK,
 * and tags.
 *
 * Degrades gracefully: with no projectRoot or an unreadable data file it
 * returns an empty string and records a warning rather than throwing.
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";

const DATA_REL = "src/components/GuidesGrid/guides-data.json";

/**
 * @param {object} options
 * @param {string} [options.projectRoot]
 * @param {string[]} [options.warnings]
 * @param {string}   [options.sourceFile]
 * @returns {string}
 */
export function guidesGridToMarkdown(options = {}) {
  const { projectRoot, warnings, sourceFile = "<unknown>" } = options;
  if (!projectRoot) return "";

  const fullPath = join(projectRoot, DATA_REL);
  if (!existsSync(fullPath)) {
    warnings?.push(`[${sourceFile}] GuidesGrid data not found: ${DATA_REL}`);
    return "";
  }

  let guides;
  try {
    guides = JSON.parse(readFileSync(fullPath, "utf8"));
  } catch (err) {
    warnings?.push(`[${sourceFile}] GuidesGrid data parse error — ${err.message}`);
    return "";
  }

  return guides
    .map(({ name, description, tags = [], sdk, href }) => {
      const meta = [sdk, ...tags].filter(Boolean).join(", ");
      return `- [${name}](${href}): ${description}${meta ? ` (${meta})` : ""}`;
    })
    .join("\n");
}
