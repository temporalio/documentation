import React from "react";
import Admonition from "@theme/Admonition";
import Link from "@docusaurus/Link";

const STAGE_CONFIG = {
  "pre-release": {
    label: "Pre-release",
    anchor: "#pre-release",
  },
  "public-preview": {
    label: "Public Preview",
    anchor: "#public-preview",
  },
};

const RELEASE_STAGES_PATH = "/evaluate/development-production-features/release-stages";

/**
 * ReleaseStage - Standardized release phase callout.
 *
 * Usage:
 *   <ReleaseStage stage="public-preview" feature="Provisioned Capacity" />
 *   <ReleaseStage
 *     stage="public-preview"
 *     feature="Connectivity rules"
 *     verb="are"
 *   />
 *   <ReleaseStage stage="pre-release" feature=".NET SDK Nexus support">
 *     All APIs are experimental and may be subject to backwards-incompatible changes.
 *   </ReleaseStage>
 *   <ReleaseStage>
 *     Custom content with multiple stages or non-standard text.
 *   </ReleaseStage>
 */
export default function ReleaseStage({ stage, feature, verb = "is", children }) {
  const config = stage ? STAGE_CONFIG[stage] : null;

  if (config && feature) {
    return (
      <Admonition type="tip" title="Support, stability, and dependency info">
        <p>
          {feature} {verb} in{" "}
          <Link to={`${RELEASE_STAGES_PATH}${config.anchor}`}>{config.label}</Link>.
        </p>
        {children}
      </Admonition>
    );
  }

  // Children-only mode for complex/multi-stage callouts
  return (
    <Admonition type="tip" title="Support, stability, and dependency info">
      {children}
    </Admonition>
  );
}
