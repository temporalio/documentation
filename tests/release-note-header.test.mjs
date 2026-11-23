import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  BASE_RELEASE_STAGES,
  resolveReleaseStage,
  sdkChips,
} from '../src/components/elements/ReleaseNoteHeader/releaseStage.js';
import { FEATURE_RELEASE_TYPES } from '../src/constants/featureReleaseTypes.js';
import { RELEASE_NOTE_LABELS } from '../scripts/mdx-to-md.mjs';

const types = { projects: 'prerelease', azure: 'publicPreview' };

describe('resolveReleaseStage', () => {
  it('takes the stage from featureName over the type prop', () => {
    assert.strictEqual(resolveReleaseStage({ featureName: 'projects', type: 'publicPreview' }, types), 'prerelease');
  });

  it('falls back to the type prop for an unknown featureName', () => {
    assert.strictEqual(resolveReleaseStage({ featureName: 'unknown', type: 'prerelease' }, types), 'prerelease');
  });

  it('defaults to Public Preview, including for an unknown type', () => {
    assert.strictEqual(resolveReleaseStage({}, types), 'publicPreview');
    assert.strictEqual(resolveReleaseStage({ type: 'generalAvailability' }, types), 'publicPreview');
  });

  it('resolves every featureName in featureReleaseTypes.js to a stage the component can render', () => {
    for (const featureName of Object.keys(FEATURE_RELEASE_TYPES)) {
      const stage = resolveReleaseStage({ featureName });
      assert.strictEqual(stage, FEATURE_RELEASE_TYPES[featureName], featureName);
      assert.ok(BASE_RELEASE_STAGES[stage], featureName);
    }
  });
});

describe('stage labels', () => {
  it('match the labels the Markdown pipeline writes', () => {
    for (const [stage, { label }] of Object.entries(BASE_RELEASE_STAGES)) {
      assert.strictEqual(RELEASE_NOTE_LABELS[stage], label, stage);
    }
  });
});

describe('sdkChips', () => {
  it('links each SDK to its guide when guidePath is set', () => {
    assert.deepStrictEqual(sdkChips(['Go', '.NET'], 'nexus/feature-guide'), [
      { language: 'Go', href: '/develop/go/nexus/feature-guide' },
      { language: '.NET', href: '/develop/dotnet/nexus/feature-guide' },
    ]);
  });

  it('leaves chips unlinked without guidePath', () => {
    assert.deepStrictEqual(sdkChips(['Java', 'Python']), [
      { language: 'Java', href: null },
      { language: 'Python', href: null },
    ]);
  });

  it('leaves a language with no SDK section unlinked', () => {
    assert.deepStrictEqual(sdkChips(['Kotlin'], 'nexus/feature-guide'), [{ language: 'Kotlin', href: null }]);
  });

  it('returns no chips when no languages are passed', () => {
    assert.deepStrictEqual(sdkChips(), []);
  });
});
