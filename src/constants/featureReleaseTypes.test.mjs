import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { FEATURE_RELEASE_TYPES, resolveFeatureStage } from "./featureReleaseTypes.js";

// Mirrors the language vocabulary in ReleaseNoteHeader.js's LANGUAGE_TO_SDK_SVG
// (can't import it directly here — that file is JSX and pulls in React).
const CANONICAL_LANGUAGES = [".NET", "Go", "Java", "PHP", "Python", "Ruby", "Rust", "TypeScript"];

describe("resolveFeatureStage", () => {
  it("returns the entry's base stage when there is no language override", () => {
    assert.strictEqual(resolveFeatureStage("cloudCli"), "prerelease");
  });

  it("returns the language override when it matches", () => {
    assert.strictEqual(
      resolveFeatureStage("standaloneActivity", { language: "Java" }),
      "prerelease"
    );
  });

  it("falls through to the base stage when the language has no override", () => {
    assert.strictEqual(
      resolveFeatureStage("standaloneActivity", { language: "Go" }),
      "publicPreview"
    );
  });

  it("falls back to the `type` option for an unregistered featureName", () => {
    assert.strictEqual(
      resolveFeatureStage("notInTheRegistry", { type: "prerelease" }),
      "prerelease"
    );
  });

  it("defaults to publicPreview for an unregistered featureName with no `type`", () => {
    assert.strictEqual(resolveFeatureStage("notInTheRegistry"), "publicPreview");
  });
});

describe("FEATURE_RELEASE_TYPES data shape", () => {
  it("every languageOverrides key is a canonical SDK language", () => {
    for (const [featureName, entry] of Object.entries(FEATURE_RELEASE_TYPES)) {
      if (!entry.languageOverrides) continue;
      for (const lang of Object.keys(entry.languageOverrides)) {
        assert.ok(
          CANONICAL_LANGUAGES.includes(lang),
          `${featureName}.languageOverrides has an unrecognized language key: "${lang}"`
        );
      }
    }
  });

  it("every entry has the required display metadata", () => {
    for (const [featureName, entry] of Object.entries(FEATURE_RELEASE_TYPES)) {
      for (const field of ["stage", "name", "description", "infoLink"]) {
        assert.ok(entry[field], `${featureName} is missing "${field}"`);
      }
    }
  });
});
