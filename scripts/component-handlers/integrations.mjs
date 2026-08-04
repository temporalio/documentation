/**
 * component-handlers/integrations.mjs
 *
 * Handler for <IntegrationsGrid defaultSdks={[...]} />.
 * Component: src/components/IntegrationsGrid/index.tsx (carries a matching comment).
 *
 * IntegrationsGrid renders, in the browser, an interactive filterable grid of
 * integrations sourced from src/components/IntegrationsGrid/integrations-data.json.
 * For the LLM markdown pipeline we resolve that JSON at build time and emit a
 * Markdown list reflecting the grid's *default* view: when `defaultSdks` is set,
 * only integrations for those SDKs are shown (mirroring the component's initial
 * SDK filter); otherwise all integrations are listed. Results are sorted by name,
 * matching the component.
 *
 * Degrades gracefully: if the data file can't be resolved (e.g. no projectRoot
 * in a unit test) it returns a short placeholder and pushes a warning.
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";

const DATA_REL = "src/components/IntegrationsGrid/integrations-data.json";

/**
 * Render an array of integration objects as a Markdown list.
 * Each entry: - [name](href) — description _(SDK · tags)_
 */
export function integrationsToMarkdownList(integrations) {
  return integrations
    .map((it) => {
      const meta = [it.sdk, ...(it.tags || [])].filter(Boolean).join(" · ");
      const suffix = meta ? ` _(${meta})_` : "";
      const desc = it.description ? ` — ${it.description}` : "";
      return `- [${it.name}](${it.href})${desc}${suffix}`;
    })
    .join("\n");
}

/**
 * Filter + sort integrations the way the grid does for its default view.
 * @param {Array} all - all integration objects
 * @param {string[]} defaultSdks - SDKs pre-selected by the `defaultSdks` prop
 */
export function selectIntegrations(all, defaultSdks = []) {
  let result = all;
  if (defaultSdks.length > 0) {
    result = all.filter((it) => it.sdk && defaultSdks.includes(it.sdk));
  }
  return [...result].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Resolve an <IntegrationsGrid defaultSdks={[...]} /> to a Markdown list.
 *
 * @param {string[]} defaultSdks
 * @param {object} options
 * @param {string} [options.projectRoot]
 * @param {string[]} [options.warnings]
 * @param {string}   [options.sourceFile]
 * @returns {string}
 */
export function integrationsGridToMarkdown(defaultSdks = [], options = {}) {
  const { projectRoot, warnings, sourceFile = "<unknown>" } = options;

  if (!projectRoot) {
    return "<!-- IntegrationsGrid (not resolved) -->";
  }

  const fullPath = join(projectRoot, DATA_REL);
  if (!existsSync(fullPath)) {
    if (warnings) warnings.push(`[${sourceFile}] IntegrationsGrid data not found: ${DATA_REL}`);
    return "<!-- IntegrationsGrid (data not found) -->";
  }

  try {
    const all = JSON.parse(readFileSync(fullPath, "utf8"));
    const selected = selectIntegrations(all, defaultSdks);
    if (selected.length === 0) {
      return "<!-- IntegrationsGrid (no matching integrations) -->";
    }
    return integrationsToMarkdownList(selected);
  } catch (err) {
    if (warnings) warnings.push(`[${sourceFile}] IntegrationsGrid parse error — ${err.message}`);
    return "<!-- IntegrationsGrid (parse error) -->";
  }
}
