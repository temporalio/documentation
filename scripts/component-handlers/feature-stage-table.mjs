/**
 * component-handlers/feature-stage-table.mjs
 *
 * Handler for <FeatureStageTable /> (self-closing, no props).
 * Component: src/components/elements/Tables/FeatureStageTable.js
 *
 * Renders the current FEATURE_RELEASE_TYPES registry as Markdown tables, one
 * per stage (Pre-release, then Public Preview), matching the React
 * component's grouping and Notes-column behavior for language overrides.
 */

// Language-override note, e.g. "**Note:** Java support is in Pre-release." The
// stage itself isn't repeated here — the section heading already says it.
function noteFor(entry, stageLabels) {
  if (!entry.languageOverrides) return "";
  const clauses = Object.entries(entry.languageOverrides).map(
    ([lang, stage]) => `${lang} support is in ${stageLabels[stage].label}`
  );
  return `**Note:** ${clauses.join("; ")}.`;
}

function detailsFor(entry, stageLabels) {
  const note = noteFor(entry, stageLabels);
  return note ? `${entry.description} ${note}` : entry.description;
}

/**
 * @param {object} featureReleaseTypes FEATURE_RELEASE_TYPES from featureReleaseTypes.js
 * @param {object} stageLabels STAGE_LABELS from featureReleaseTypes.js
 * @returns {string}
 */
export function featureStageTableToMarkdown(featureReleaseTypes, stageLabels) {
  const stageOrder = ["prerelease", "publicPreview"];
  const headingByStage = {
    prerelease: "### Pre-release features",
    publicPreview: "### Public Preview features",
  };

  const sections = stageOrder
    .map((stage) => {
      const entries = Object.values(featureReleaseTypes).filter((entry) => entry.stage === stage);
      if (entries.length === 0) return null;

      const rows = entries.map(
        (entry) => `| [${entry.name}](${entry.infoLink}) | ${detailsFor(entry, stageLabels)} |`
      );

      return [
        headingByStage[stage],
        "",
        "| Feature | Details |",
        "| --- | --- |",
        ...rows,
      ].join("\n");
    })
    .filter(Boolean);

  return sections.join("\n\n");
}
