const { describe, it } = require('node:test');
const assert = require('node:assert');
const {
  VERSION_ANCHORS,
  applyAnchorsToContent,
  buildReviewNotes,
} = require('./update-sdk-versions.js');

function anchorsFor(file) {
  return VERSION_ANCHORS.filter((a) => a.file === file);
}

describe('applyAnchorsToContent', () => {
  it('bumps a Java pom.xml + build.gradle snippet, leaving unrelated text alone', () => {
    const content = `
<dependency>
  <groupId>io.temporal</groupId>
  <artifactId>temporal-sdk</artifactId>
  <version>1.33.0</version>
</dependency>

    <groupId>io.temporal</groupId>
    <artifactId>temporal-testing</artifactId>
    <version>1.33.0</version>
    <scope>test</scope>

implementation 'io.temporal:temporal-sdk:1.33.0'
testImplementation 'io.temporal:temporal-testing:1.33.0'
`;
    const { content: next, changed } = applyAnchorsToContent(
      content,
      anchorsFor('docs/develop/java/set-up.mdx'),
      { java: '1.37.0' }
    );
    assert.equal(changed, true);
    assert.match(next, /<artifactId>temporal-sdk<\/artifactId>\s*\n\s*<version>1\.37\.0<\/version>/);
    assert.match(next, /<artifactId>temporal-testing<\/artifactId>\s*\n\s*<version>1\.37\.0<\/version>/);
    assert.match(next, /implementation 'io\.temporal:temporal-sdk:1\.37\.0'/);
    assert.match(next, /testImplementation 'io\.temporal:temporal-testing:1\.37\.0'/);
    assert.doesNotMatch(next, /1\.33\.0/);
  });

  it('bumps both testImplementation call styles in testing-suite.mdx', () => {
    const content = `
testImplementation ("io.temporal:temporal-testing:1.36.0")

testImplementation("io.temporal:temporal-testing:1.36.0") {
    capabilities {
        requireCapability("io.temporal:temporal-testing-junit4")
    }
}
`;
    const { content: next, changed } = applyAnchorsToContent(
      content,
      anchorsFor('docs/develop/java/best-practices/testing-suite.mdx'),
      { java: '1.37.0' }
    );
    assert.equal(changed, true);
    assert.match(next, /testImplementation \("io\.temporal:temporal-testing:1\.37\.0"\)/);
    assert.match(next, /testImplementation\("io\.temporal:temporal-testing:1\.37\.0"\) \{/);
    // The unrelated capability string must survive untouched.
    assert.match(next, /requireCapability\("io\.temporal:temporal-testing-junit4"\)/);
  });

  it('trims the PHP composer caret to major.minor', () => {
    const content = `        "temporal/sdk": "^2.16"`;
    const { content: next, changed } = applyAnchorsToContent(
      content,
      anchorsFor('docs/develop/php/set-up.mdx'),
      { php: '2.17.1' }
    );
    assert.equal(changed, true);
    assert.equal(next, `        "temporal/sdk": "^2.17"`);
  });

  it('bumps every temporalio-* crate in a Cargo.toml snippet to the same version', () => {
    const content = `
[dependencies]
futures = "0.3.32"
temporalio-client = "0.5.0"
temporalio-common = "0.5.0"
temporalio-macros = "0.5.0"
temporalio-sdk = "0.5.0"
temporalio-sdk-core = "0.5.0"
`;
    const { content: next, changed } = applyAnchorsToContent(
      content,
      anchorsFor('docs/develop/rust/quickstart.mdx'),
      { rust: '0.6.0' }
    );
    assert.equal(changed, true);
    assert.match(next, /futures = "0\.3\.32"/); // unrelated crate untouched
    assert.doesNotMatch(next, /temporalio[a-z-]* = "0\.5\.0"/);
    assert.equal(next.match(/= "0\.6\.0"/g).length, 5);
  });

  it('bumps the worker-process.mdx prose mention and its extra temporalio-workflow crate', () => {
    const content = 'The code on this page is written against `temporalio-sdk` 0.5.0.\n\ntemporalio-workflow = "0.5.0"';
    const { content: next, changed } = applyAnchorsToContent(
      content,
      anchorsFor('docs/develop/rust/workers/worker-process.mdx'),
      { rust: '0.6.0' }
    );
    assert.equal(changed, true);
    assert.match(next, /written against `temporalio-sdk` 0\.6\.0\./); // trailing period preserved
    assert.match(next, /temporalio-workflow = "0\.6\.0"/);
  });

  it('bumps the Ruby illustrative bundle-add output', () => {
    const content = '    Installing temporalio 0.4.0 (arm64-darwin)';
    const { content: next, changed } = applyAnchorsToContent(
      content,
      anchorsFor('docs/develop/ruby/set-up.mdx'),
      { ruby: '1.6.0' }
    );
    assert.equal(changed, true);
    assert.equal(next, '    Installing temporalio 1.6.0 (arm64-darwin)');
  });

  it('is idempotent — re-applying with the same version changes nothing', () => {
    const content = `implementation 'io.temporal:temporal-sdk:1.37.0'`;
    const once = applyAnchorsToContent(content, anchorsFor('docs/develop/java/set-up.mdx'), { java: '1.37.0' });
    assert.equal(once.changed, false);
    assert.equal(once.content, content);
  });

  it('skips an anchor when its SDK has no fetched version', () => {
    const content = `implementation 'io.temporal:temporal-sdk:1.33.0'`;
    const { content: next, changed } = applyAnchorsToContent(content, anchorsFor('docs/develop/java/set-up.mdx'), {});
    assert.equal(changed, false);
    assert.equal(next, content);
  });
});

describe('buildReviewNotes', () => {
  it('returns "" when no changed SDK has review pages', () => {
    const notes = buildReviewNotes(['php'], { php: '2.17.1' }, { php: '2.16.0' });
    assert.equal(notes, '');
  });

  it('returns "" when nothing changed', () => {
    assert.equal(buildReviewNotes([], {}, {}), '');
  });

  it('lists review pages for a changed SDK with its version transition', () => {
    const notes = buildReviewNotes(
      ['python'],
      { python: '1.32.0' },
      { python: '1.31.0' }
    );
    assert.match(notes, /\*\*python\*\* 1\.31\.0 → 1\.32\.0/);
    assert.match(notes, /docs\/develop\/python\/integrations\/google-genai\.mdx/);
  });

  it('omits unrelated SDKs even when they also changed', () => {
    const notes = buildReviewNotes(['rust'], { rust: '0.7.0' }, { rust: '0.6.0' });
    assert.equal(notes, '');
  });
});
