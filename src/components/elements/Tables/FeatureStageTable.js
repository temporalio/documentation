import React from "react";
import Link from "@docusaurus/Link";
import { DocsTable, DocsTableRow, NewDocsCell } from '@site/src/components';
import { FEATURE_RELEASE_TYPES, STAGE_LABELS } from "../../../constants/featureReleaseTypes";

const STAGE_ORDER = ["prerelease", "publicPreview"];
const HEADING_BY_STAGE = {
  prerelease: "Pre-release features",
  publicPreview: "Public Preview features",
};

// Language-override note, e.g. "Java support is in Pre-release." The stage
// itself isn't repeated here — the section heading already says it.
function languageOverrideNote(entry) {
  if (!entry.languageOverrides) return null;
  const clauses = Object.entries(entry.languageOverrides)
    .map(([lang, stage]) => `${lang} support is in ${STAGE_LABELS[stage].label}`)
    .join("; ");
  return `${clauses}.`;
}

export default function FeatureStageTable() {
  return (
    <>
      {STAGE_ORDER.map((stage) => {
        const entries = Object.values(FEATURE_RELEASE_TYPES).filter((entry) => entry.stage === stage);
        if (entries.length === 0) return null;

        return (
          <React.Fragment key={stage}>
            <h3>{HEADING_BY_STAGE[stage]}</h3>
            <DocsTable Columns={["Feature", "Details"]}>
              {entries.map((entry) => {
                const note = languageOverrideNote(entry);
                return (
                  <DocsTableRow key={entry.name}>
                    <NewDocsCell><Link to={entry.infoLink}>{entry.name}</Link></NewDocsCell>
                    <NewDocsCell>
                      {entry.description}
                      {note && <> <strong>Note:</strong> {note}</>}
                    </NewDocsCell>
                  </DocsTableRow>
                );
              })}
            </DocsTable>
          </React.Fragment>
        );
      })}
    </>
  );
}
