// ⚠️ LLM MARKDOWN PIPELINE: also consumed by scripts/mdx-to-md.mjs for
// ReleaseNoteHeader label resolution. Keep in sync when adding feature mappings.
export const FEATURE_RELEASE_TYPES = {
  cloudCli: "prerelease",
  standaloneActivity: "publicPreview",
  nexus: "publicPreview",
  workflowStreams: "publicPreview",
  serverlessWorkers: "publicPreview",
};
