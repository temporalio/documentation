// ⚠️ LLM MARKDOWN PIPELINE: also consumed by scripts/mdx-to-md.mjs for
// ReleaseNoteHeader / FeatureStageLabel / FeatureStageTable resolution.
// Keep in sync when adding feature mappings or language overrides.

// Label + release-stages.mdx anchor for each stage. Shared by ReleaseNoteHeader,
// FeatureStageLabel, and FeatureStageTable so the labels/links live in one place.
export const STAGE_LABELS = {
  prerelease: {
    label: "Pre-release",
    descriptionLink: "/evaluate/development-production-features/release-stages#pre-release",
  },
  publicPreview: {
    label: "Public Preview",
    descriptionLink: "/evaluate/development-production-features/release-stages#public-preview",
  },
};

export const FEATURE_RELEASE_TYPES = {
  cloudCli: {
    stage: "prerelease",
    name: "Cloud CLI extension",
    description: "Manage Temporal Cloud resources, like Namespaces and users, from the Temporal CLI.",
    infoLink: "/cli/setup-cli",
  },
  standaloneActivity: {
    stage: "publicPreview",
    name: "Standalone Activities",
    description: "Run an Activity directly from a Temporal Client without a Workflow orchestrating it.",
    infoLink: "/standalone-activity",
    // Overrides `stage` only when the caller passes a matching `language` prop.
    // Keys must match ReleaseNoteHeader.js's LANGUAGE_TO_SDK_SVG vocabulary
    // (".NET" | "Go" | "Java" | "PHP" | "Python" | "Ruby" | "Rust" | "TypeScript").
    languageOverrides: {
      Java: "prerelease",
    },
  },
  standaloneNexusOperation: {
    stage: "prerelease",
    name: "Standalone Nexus Operations",
    description: "Execute a top-level Nexus Operation directly from a Client, without a caller Workflow.",
    infoLink: "/standalone-nexus-operation",
  },
  workflowStreams: {
    stage: "publicPreview",
    name: "Workflow Streams",
    description: "Add a durable event channel to a Workflow so outside observers can follow its progress in real time.",
    infoLink: "/workflow-streams",
  },
  serverlessWorkersLambda: {
    stage: "publicPreview",
    name: "Serverless Workers on AWS Lambda",
    description: "Run a Temporal Worker as an AWS Lambda function that Temporal Cloud invokes when tasks arrive.",
    infoLink: "/serverless-workers",
  },
  serverlessWorkersCloudRun: {
    stage: "prerelease",
    name: "Serverless Workers on GCP Cloud Run",
    description: "Run a Temporal Worker as a GCP Cloud Run service that Temporal Cloud invokes when tasks arrive.",
    infoLink: "/serverless-workers",
  },
  externalStorage: {
    stage: "publicPreview",
    name: "External Storage",
    description: "Offload large payloads to external storage, like Amazon S3, using the claim check pattern.",
    infoLink: "/external-storage",
  },
  projects: {
    stage: "prerelease",
    name: "Cloud Projects",
    description: "Organize Temporal Cloud resources, like Namespaces and Nexus Endpoints, around your organizational structure.",
    infoLink: "/cloud/projects",
  },
};

/** featureName lookup (with an optional per-language override) wins, then `type`, then default. */
export function resolveFeatureStage(featureName, { type, language } = {}) {
  const entry = FEATURE_RELEASE_TYPES[featureName];
  if (entry) {
    const override = language && entry.languageOverrides && entry.languageOverrides[language];
    return override || entry.stage;
  }
  return type || "publicPreview";
}
