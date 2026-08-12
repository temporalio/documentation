/**
 * component-handlers/data-tables.mjs
 *
 * Handler for <JsonTable filename="/json/foo.json" />.
 * Component: src/components/Tables/JsonTable.js (carries a matching comment).
 *
 * JsonTable renders, at runtime in the browser, a table fetched from a JSON
 * file under static/. The JSON shape is { columns: string[], rows: string[][] }.
 * For the LLM markdown pipeline we resolve that JSON at build time and emit a
 * real Markdown table — the data is the source of truth, not the React
 * component (which only fetches + renders it).
 *
 * Handlers degrade gracefully: if the file can't be resolved (e.g. no
 * projectRoot in a unit test, or a missing file) they return a short
 * placeholder and push a warning rather than throwing.
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";

/**
 * Escape a cell value for Markdown table use (pipes break table syntax).
 */
function escapeCell(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ").trim();
}

/**
 * Render a { columns, rows } object as a GitHub-flavored Markdown table.
 * @returns {string} markdown table, or "" if the shape is invalid.
 */
export function jsonToMarkdownTable(data) {
  if (
    !data ||
    !Array.isArray(data.columns) ||
    !Array.isArray(data.rows) ||
    data.columns.length === 0
  ) {
    return "";
  }

  const header = `| ${data.columns.map(escapeCell).join(" | ")} |`;
  const divider = `| ${data.columns.map(() => "---").join(" | ")} |`;
  const body = data.rows
    .map((row) => `| ${row.map(escapeCell).join(" | ")} |`)
    .join("\n");

  return [header, divider, body].join("\n");
}

/**
 * Resolve a <JsonTable filename="..." /> to a Markdown table.
 *
 * @param {string} filename  - the `filename` prop, e.g. "/json/privatelink_aws.json"
 * @param {object} options
 * @param {string} [options.projectRoot] - Docusaurus root; the file lives under static/
 * @param {string[]} [options.warnings]  - array to push warnings into
 * @param {string}   [options.sourceFile]
 * @returns {string} markdown table or a placeholder line
 */
export function jsonTableToMarkdown(filename, options = {}) {
  const { projectRoot, warnings, sourceFile = "<unknown>" } = options;

  if (!filename) {
    return "<!-- JsonTable: missing filename -->";
  }

  if (!projectRoot) {
    // No root to resolve against (e.g. a unit test invoking transformMdx
    // directly). Emit a placeholder so output is still valid Markdown.
    return `<!-- JsonTable: ${filename} (not resolved) -->`;
  }

  // filename is an absolute-from-static path like "/json/foo.json"
  const rel = filename.replace(/^\//, "");
  const fullPath = join(projectRoot, "static", rel);

  if (!existsSync(fullPath)) {
    if (warnings) warnings.push(`[${sourceFile}] JsonTable file not found: ${filename}`);
    return `<!-- JsonTable: ${filename} (file not found) -->`;
  }

  try {
    const data = JSON.parse(readFileSync(fullPath, "utf8"));
    const table = jsonToMarkdownTable(data);
    if (!table) {
      if (warnings) warnings.push(`[${sourceFile}] JsonTable invalid shape: ${filename}`);
      return `<!-- JsonTable: ${filename} (invalid shape) -->`;
    }
    return table;
  } catch (err) {
    if (warnings) warnings.push(`[${sourceFile}] JsonTable parse error: ${filename} — ${err.message}`);
    return `<!-- JsonTable: ${filename} (parse error) -->`;
  }
}
