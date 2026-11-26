/**
 * component-handlers/sdk-overview-cards.mjs
 *
 * Handler for <SdkOverviewCards /> (self-closing, no props).
 * Component: src/components/elements/Sdk/SdkOverviewCards/SdkOverviewCards.tsx
 *
 * SdkOverviewCards renders, in the browser, a card grid — one card per SDK
 * with an icon, a version chip, a developer-guide link, and an API-reference
 * link. Versions come from src/data/sdk-versions.json (kept current by the
 * "Update SDK Versions" GitHub Action); we resolve that file at build time
 * for the Markdown output too.
 *
 * The SDK list (ids, labels, API reference links) comes from
 * src/constants/sdkData.js, the same data the React component renders.
 *
 * Degrades gracefully: if the versions file can't be resolved (e.g. no
 * projectRoot in a unit test) it omits version chips rather than throwing.
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { SDK_DATA } from "../../src/constants/sdkData.js";

const VERSIONS_REL = "src/data/sdk-versions.json";

/**
 * Resolve <SdkOverviewCards /> to a Markdown list.
 *
 * @param {object} options
 * @param {string} [options.projectRoot]
 * @param {string[]} [options.warnings]
 * @param {string}   [options.sourceFile]
 * @returns {string}
 */
export function sdkOverviewCardsToMarkdown(options = {}) {
  const { projectRoot, warnings, sourceFile = "<unknown>" } = options;

  let versions = {};
  if (projectRoot) {
    const fullPath = join(projectRoot, VERSIONS_REL);
    if (existsSync(fullPath)) {
      try {
        versions = JSON.parse(readFileSync(fullPath, "utf8")).versions || {};
      } catch (err) {
        if (warnings) {
          warnings.push(`[${sourceFile}] SdkOverviewCards versions parse error — ${err.message}`);
        }
      }
    } else if (warnings) {
      warnings.push(`[${sourceFile}] SdkOverviewCards versions not found: ${VERSIONS_REL}`);
    }
  }

  return SDK_DATA.map(({ id, label, apiReferenceHref }) => {
    const version = versions[id];
    const versionSuffix = version ? ` (v${version})` : "";
    return `- **${label}**${versionSuffix}: [Developer guide](/develop/${id}) · [API reference](${apiReferenceHref})`;
  }).join("\n");
}
