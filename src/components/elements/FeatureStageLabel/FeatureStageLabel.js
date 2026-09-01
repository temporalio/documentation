import React from "react";
import Link from "@docusaurus/Link";
import { resolveFeatureStage, STAGE_LABELS } from "../../../constants/featureReleaseTypes";

// Inline sibling of ReleaseNoteHeader for mid-sentence prose, e.g.
// "The Rust SDK is in <FeatureStageLabel featureName="..." />." Renders a
// plain prose link — no pill/badge styling — sourced from the same registry
// so these mentions can't drift the way hand-written links have.
export default function FeatureStageLabel({ featureName, language, type }) {
  const resolvedType = resolveFeatureStage(featureName, { type, language });
  const meta = STAGE_LABELS[resolvedType] || STAGE_LABELS.publicPreview;

  return <Link to={meta.descriptionLink}>{meta.label}</Link>;
}
