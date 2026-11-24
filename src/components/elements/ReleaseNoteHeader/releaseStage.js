// Release stage data and helpers for ReleaseNoteHeader. Kept free of React so
// tests/release-note-header.test.mjs can import it with plain Node.
//
// ⚠️ LLM MARKDOWN PIPELINE: scripts/mdx-to-md.mjs mirrors these labels in RELEASE_NOTE_LABELS.

import { FEATURE_RELEASE_TYPES } from '../../../constants/featureReleaseTypes.js';

export const BASE_RELEASE_STAGES = {
  prerelease: {
    label: 'Pre-release',
    descriptionLink: '/evaluate/product-release-stages#pre-release',
  },
  publicPreview: {
    label: 'Public Preview',
    descriptionLink: '/evaluate/product-release-stages#public-preview',
  },
};

export const DEFAULT_RELEASE_STAGE = 'publicPreview';

const LANGUAGE_TO_SDK_SLUG = {
  '.NET': 'dotnet',
  Go: 'go',
  Java: 'java',
  PHP: 'php',
  Python: 'python',
  Ruby: 'ruby',
  Rust: 'rust',
  TypeScript: 'typescript',
};

// The stage a header renders: the featureName's stage from featureReleaseTypes.js, else the type prop,
// else Public Preview. An unknown stage also falls back to Public Preview.
export function resolveReleaseStage({ featureName, type }, featureReleaseTypes = FEATURE_RELEASE_TYPES) {
  const stage = (featureName && featureReleaseTypes[featureName]) || type || DEFAULT_RELEASE_STAGE;
  return BASE_RELEASE_STAGES[stage] ? stage : DEFAULT_RELEASE_STAGE;
}

// One chip per language. A chip links to that SDK's guide only when the page passes guidePath and the
// language has an SDK section under /develop.
export function sdkChips(languages = [], guidePath) {
  return languages.map((language) => {
    const slug = LANGUAGE_TO_SDK_SLUG[language];
    return { language, href: guidePath && slug ? `/develop/${slug}/${guidePath}` : null };
  });
}
