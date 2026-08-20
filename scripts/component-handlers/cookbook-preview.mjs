/**
 * component-handlers/cookbook-preview.mjs
 *
 * Handler for <CookbookPreview limit={N} />.
 * Component: src/components/Cookbook/Preview/CookbookPreview.tsx.
 *
 * CookbookPreview renders, in the browser, a strip of the top-N AI Cookbook
 * recipes (via useCookbookItems, sourced from plugins/cookbook-index's
 * plugin data) plus a "Browse all recipes" link. The LLM markdown pipeline
 * runs outside a live Docusaurus plugin instance, so instead of reaching
 * into that plugin's data we read the same ai-cookbook/*.mdx front matter
 * directly and mirror the sort plugins/cookbook-index/index.js's postBuild
 * uses for its own generated index: priority (front matter, descending),
 * then title alphabetically. Keep both in sync if either changes.
 *
 * Degrades gracefully: if the recipes directory can't be resolved (e.g. no
 * projectRoot in a unit test) it returns a short placeholder and pushes a
 * warning.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import matter from "gray-matter";

const RECIPES_REL = "ai-cookbook";

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return /\.(md|mdx)$/i.test(name) ? [full] : [];
  });
}

/**
 * Read + sort every AI Cookbook recipe the way the site's own cookbook-index
 * plugin does for its own generated index (see plugins/cookbook-index/index.js).
 * @param {string} projectRoot
 */
export function readCookbookRecipes(projectRoot) {
  const docsDir = join(projectRoot, RECIPES_REL);
  const items = walk(docsDir)
    .map((file) => {
      const { data } = matter(readFileSync(file, "utf8"));
      const rel = relative(docsDir, file).replace(/\\/g, "/").replace(/\.(md|mdx)$/i, "");
      if (data.id === "cookbook" || /(^|\/)index$/i.test(rel)) return null;

      const slug = (data.slug || data.id || rel).replace(/^\/+/, "");
      const title = data.title || slug;
      const description = data.description || "";
      const rawPriority = data.priority;
      const priority =
        typeof rawPriority === "number"
          ? rawPriority
          : Number.isFinite(Number(rawPriority))
            ? Number(rawPriority)
            : undefined;

      return { title, description, permalink: `/ai/cookbook/${slug}`, priority };
    })
    .filter(Boolean);

  return items.sort((a, b) => {
    const pa = typeof a.priority === "number" ? a.priority : -Infinity;
    const pb = typeof b.priority === "number" ? b.priority : -Infinity;
    if (pa !== pb) return pb - pa;
    return a.title.localeCompare(b.title);
  });
}

/**
 * Render a list of resolved recipes as a Markdown list.
 * Each entry: - [title](permalink) — description
 */
export function cookbookRecipesToMarkdownList(items) {
  return items
    .map((it) => `- [${it.title}](${it.permalink})${it.description ? ` — ${it.description}` : ""}`)
    .join("\n");
}

/**
 * Resolve a <CookbookPreview limit={N} /> to a Markdown list matching the
 * component's default view (the top `limit` recipes), plus the "Browse all
 * recipes" link the live component also renders below the strip.
 *
 * @param {number} limit
 * @param {object} options
 * @param {string} [options.projectRoot]
 * @param {string[]} [options.warnings]
 * @param {string}   [options.sourceFile]
 * @returns {string}
 */
export function cookbookPreviewToMarkdown(limit, options = {}) {
  const { projectRoot, warnings, sourceFile = "<unknown>" } = options;

  if (!projectRoot) {
    return "<!-- CookbookPreview (not resolved) -->";
  }

  try {
    const items = readCookbookRecipes(projectRoot).slice(0, limit);
    if (items.length === 0) {
      return "<!-- CookbookPreview (no recipes found) -->";
    }
    return `${cookbookRecipesToMarkdownList(items)}\n\n[Browse all recipes](/ai/cookbook)`;
  } catch (err) {
    if (warnings) warnings.push(`[${sourceFile}] CookbookPreview parse error — ${err.message}`);
    return "<!-- CookbookPreview (parse error) -->";
  }
}
