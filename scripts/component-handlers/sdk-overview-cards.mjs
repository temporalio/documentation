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
 * The id/label/apiReferenceHref list below mirrors src/constants/sdks.js
 * SDKS. That file can't be imported directly here — it's built for the
 * webpack bundle (icon component imports), not plain Node — so keep SDKS
 * below in sync if a label or API reference link changes there.
 *
 * Degrades gracefully: if the versions file can't be resolved (e.g. no
 * projectRoot in a unit test) it omits version chips rather than throwing.
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";

const VERSIONS_REL = "src/data/sdk-versions.json";

// Mirrors src/constants/sdks.js SDKS — id, label, apiReferenceHref only.
// icon/tabKey/blockName are presentational and have no Markdown equivalent.
const SDKS = [
  { id: "go", label: "Go", apiReferenceHref: "http://t.mp/go-api" },
  { id: "java", label: "Java", apiReferenceHref: "http://t.mp/java-api" },
  { id: "dotnet", label: ".NET", apiReferenceHref: "https://dotnet.temporal.io/" },
  { id: "php", label: "PHP", apiReferenceHref: "https://php.temporal.io/namespaces/temporal.html" },
  { id: "python", label: "Python", apiReferenceHref: "https://python.temporal.io" },
  { id: "ruby", label: "Ruby", apiReferenceHref: "https://ruby.temporal.io/" },
  { id: "rust", label: "Rust", apiReferenceHref: "https://docs.rs/temporalio-sdk/latest/temporalio_sdk/" },
  { id: "typescript", label: "TypeScript", apiReferenceHref: "https://typescript.temporal.io" },
];

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

  return SDKS.map(({ id, label, apiReferenceHref }) => {
    const version = versions[id];
    const versionSuffix = version ? ` (v${version})` : "";
    return `- **${label}**${versionSuffix}: [Developer guide](/develop/${id}) · [API reference](${apiReferenceHref})`;
  }).join("\n");
}
