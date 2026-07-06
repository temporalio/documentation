/**
 * tests/test-mdx-to-md.mjs
 *
 * Test suite for the MDX → Markdown transformer.
 * Uses only Node.js built-ins (no test framework).
 *
 * Run: node tests/test-mdx-to-md.mjs
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  transformMdx,
  parseFrontmatter,
  extractProp,
  parseTabValues,
  parseReadList,
  parseSdkGuideLinks,
  dedent,
  scanMarkdownImports,
  COMPONENT_REGISTRY,
} from "../scripts/mdx-to-md.mjs";
import { jsonToMarkdownTable } from "../scripts/component-handlers/data-tables.mjs";
import {
  selectIntegrations,
  integrationsToMarkdownList,
} from "../scripts/component-handlers/integrations.mjs";
import { parseCardItems, cardsToMarkdown } from "../scripts/component-handlers/cards.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const FIXTURES_DIR = join(__dirname, "../fixtures");
const SNAPSHOTS_DIR = join(__dirname, "snapshots");

if (!existsSync(SNAPSHOTS_DIR)) mkdirSync(SNAPSHOTS_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Minimal test harness
// ---------------------------------------------------------------------------
let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (err) {
    console.log(`  ❌ ${name}`);
    console.log(`     ${err.message}`);
    failures.push({ name, error: err.message });
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || "Assertion failed");
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(
      message ||
        `Expected:\n${JSON.stringify(expected)}\n\nGot:\n${JSON.stringify(actual)}`
    );
  }
}

function assertContains(haystack, needle, message) {
  if (!haystack.includes(needle)) {
    throw new Error(
      message || `Expected output to contain:\n  ${JSON.stringify(needle)}\n\nOutput was:\n${haystack.slice(0, 500)}`
    );
  }
}

function assertNotContains(haystack, needle, message) {
  if (haystack.includes(needle)) {
    throw new Error(
      message || `Expected output NOT to contain: ${JSON.stringify(needle)}`
    );
  }
}

function assertMatchesSnapshot(name, actual) {
  const snapshotPath = join(SNAPSHOTS_DIR, `${name}.snap.md`);
  if (!existsSync(snapshotPath)) {
    // First run — write the snapshot
    writeFileSync(snapshotPath, actual, "utf8");
    console.log(`     📸 Snapshot created: ${name}`);
    return;
  }
  const expected = readFileSync(snapshotPath, "utf8");
  if (actual !== expected) {
    const diffLines = [];
    const actualLines = actual.split("\n");
    const expectedLines = expected.split("\n");
    const maxLen = Math.max(actualLines.length, expectedLines.length);
    for (let i = 0; i < maxLen; i++) {
      if (actualLines[i] !== expectedLines[i]) {
        diffLines.push(`Line ${i + 1}:`);
        diffLines.push(`  expected: ${JSON.stringify(expectedLines[i])}`);
        diffLines.push(`  actual:   ${JSON.stringify(actualLines[i])}`);
        if (diffLines.length > 20) { diffLines.push("  ... (truncated)"); break; }
      }
    }
    throw new Error(
      `Snapshot mismatch for "${name}".\n` +
      `To accept new output: delete tests/snapshots/${name}.snap.md and re-run.\n` +
      diffLines.join("\n")
    );
  }
}

// ---------------------------------------------------------------------------
// Unit tests: parseFrontmatter
// ---------------------------------------------------------------------------
console.log("\n📦 parseFrontmatter");

test("extracts title and description", () => {
  const { data } = parseFrontmatter(
    `---\ntitle: My Page\ndescription: Some desc\n---\n\nContent`
  );
  assertEqual(data.title, "My Page");
  assertEqual(data.description, "Some desc");
});

test("handles missing frontmatter", () => {
  const { data, content } = parseFrontmatter("No frontmatter here");
  assertEqual(Object.keys(data).length, 0);
  assertEqual(content, "No frontmatter here");
});

test("strips surrounding quotes from values", () => {
  const { data } = parseFrontmatter(`---\ntitle: "Quoted Title"\n---\n`);
  assertEqual(data.title, "Quoted Title");
});

test("ignores YAML arrays/lists (does not crash)", () => {
  const { data } = parseFrontmatter(
    `---\ntitle: Page\ntags:\n  - foo\n  - bar\n---\n`
  );
  assertEqual(data.title, "Page");
  // tags is a list — we just skip it, no crash
});

// ---------------------------------------------------------------------------
// Unit tests: extractProp
// ---------------------------------------------------------------------------
console.log("\n📦 extractProp");

test("extracts double-quoted prop", () => {
  assertEqual(extractProp('<TabItem value="go" label="Go">', "label"), "Go");
});

test("extracts single-quoted prop", () => {
  assertEqual(extractProp("<TabItem value='typescript'>", "value"), "typescript");
});

test("returns null when prop absent", () => {
  assertEqual(extractProp("<TabItem>", "label"), null);
});

// ---------------------------------------------------------------------------
// Unit tests: parseTabValues
// ---------------------------------------------------------------------------
console.log("\n📦 parseTabValues");

test("parses values array from Tabs tag", () => {
  const tag = `<Tabs defaultValue="go" values={[{label: 'Go', value: 'go'},{label: 'Java', value: 'java'}]}>`;
  const vals = parseTabValues(tag);
  assertEqual(vals.length, 2);
  assertEqual(vals[0].label, "Go");
  assertEqual(vals[0].value, "go");
  assertEqual(vals[1].label, "Java");
});

test("returns empty array when no values prop", () => {
  const vals = parseTabValues("<Tabs>");
  assertEqual(vals.length, 0);
});

// ---------------------------------------------------------------------------
// Unit tests: parseReadList
// ---------------------------------------------------------------------------
console.log("\n📦 parseReadList");

test("parses readList prop", () => {
  const tag = `<RelatedReadList readList={[["Workflow Definition", "/workflow-definition", "concept"],["Activities", "/activities", "concept"]]} />`;
  const items = parseReadList(tag);
  assertEqual(items.length, 2);
  assertEqual(items[0].text, "Workflow Definition");
  assertEqual(items[0].href, "/workflow-definition");
});

// ---------------------------------------------------------------------------
// Unit tests: parseSdkGuideLinks
// ---------------------------------------------------------------------------
console.log("\n📦 parseSdkGuideLinks");

test("generates links from path + filter + title props", () => {
  const tag = `<SdkGuideLinks path="activities/standalone-activities" filter={['go', 'python', 'ruby']} title="Standalone Activities" />`;
  const items = parseSdkGuideLinks(tag);
  assertEqual(items.length, 3);
  assertEqual(items[0].text, "Standalone Activities - Go");
  assertEqual(items[0].href, "/develop/go/activities/standalone-activities");
  assertEqual(items[2].text, "Standalone Activities - Ruby");
  assertEqual(items[2].href, "/develop/ruby/activities/standalone-activities");
});

test("generates links for all SDKs when filter is omitted", () => {
  const tag = `<SdkGuideLinks path="client/temporal-client" title="Temporal Client" />`;
  const items = parseSdkGuideLinks(tag);
  assertEqual(items.length, 8);
});

test("uses the explicit links prop when provided", () => {
  const tag = `<SdkGuideLinks links={[{ name: 'goLangBlock', href: '/develop/go/foo', label: 'Go' }]} />`;
  const items = parseSdkGuideLinks(tag);
  assertEqual(items.length, 1);
  assertEqual(items[0].text, "Go");
  assertEqual(items[0].href, "/develop/go/foo");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — imports
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — imports & exports");

test("strips single-line import statements", () => {
  const { markdown } = transformMdx(`import Tabs from "@theme/Tabs";\n\nContent`);
  assertNotContains(markdown, "import");
  assertContains(markdown, "Content");
});

test("strips multi-line import statements", () => {
  const input = `import RelatedReadList\n  from "@site/src/components/RelatedReadList";\n\nContent`;
  const { markdown } = transformMdx(input);
  assertNotContains(markdown, "import");
  assertContains(markdown, "Content");
});

test("strips export statements", () => {
  const { markdown } = transformMdx(`export const myVar = 42;\n\nContent`);
  assertNotContains(markdown, "export");
  assertContains(markdown, "Content");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — frontmatter title injection
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — frontmatter");

test("emits h1 from frontmatter title", () => {
  const { markdown } = transformMdx(`---\ntitle: My Page\n---\n\nBody`);
  assertContains(markdown, "# My Page");
});

test("emits description blockquote when different from title", () => {
  const { markdown } = transformMdx(
    `---\ntitle: Page\ndescription: A longer description\n---\n\nBody`
  );
  assertContains(markdown, "> A longer description");
});

test("drops a body H1 that duplicates the frontmatter title", () => {
  const { markdown } = transformMdx(
    `---\ntitle: API reference\n---\n\n# API reference\n\nBody text.`
  );
  const h1s = markdown.split("\n").filter((l) => /^# /.test(l));
  assertEqual(h1s.length, 1, "expected exactly one H1");
  assertContains(markdown, "Body text.");
});

test("dedupes a duplicate title H1 even with a {#anchor} suffix", () => {
  const { markdown } = transformMdx(
    `---\ntitle: Overview\n---\n\n# Overview {#overview}\n\nBody.`
  );
  const h1s = markdown.split("\n").filter((l) => /^# /.test(l));
  assertEqual(h1s.length, 1, "expected exactly one H1");
});

test("keeps a body H1 that differs from the title", () => {
  const { markdown } = transformMdx(`---\ntitle: Page\n---\n\n# Different Heading\n\nBody.`);
  const h1s = markdown.split("\n").filter((l) => /^# /.test(l));
  assertEqual(h1s.length, 2, "different H1 should be preserved");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — admonitions
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — admonitions");

test("converts :::note to blockquote", () => {
  const { markdown } = transformMdx(":::note\nBe careful here.\n:::");
  assertContains(markdown, "> **📝 Note:**");
  assertContains(markdown, "> Be careful here.");
});

test("converts :::caution to blockquote with caution label", () => {
  const { markdown } = transformMdx(":::caution\nThis is dangerous.\n:::");
  assertContains(markdown, "> **⚠️ Caution:**");
  assertContains(markdown, "> This is dangerous.");
});

test("converts :::danger to blockquote with danger label", () => {
  const { markdown } = transformMdx(":::danger\nHigh risk!\n:::");
  assertContains(markdown, "> **🚨 Danger:**");
});

test("converts :::tip to blockquote with tip label", () => {
  const { markdown } = transformMdx(":::tip\nUseful tip.\n:::");
  assertContains(markdown, "> **💡 Tip:**");
});

test("admonition does not bleed into surrounding content", () => {
  const input = `Before\n\n:::note\nNote content\n:::\n\nAfter`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "Before");
  assertContains(markdown, "> Note content");
  assertContains(markdown, "After");
  assertNotContains(markdown, ":::");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — Tabs / TabItem
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — Tabs / TabItem");

test("flattens tab content with bold labels", () => {
  const input = `
<Tabs defaultValue="go" values={[{label: 'Go', value: 'go'},{label: 'Java', value: 'java'}]}>
<TabItem value="go">

\`\`\`go
func Hello() {}
\`\`\`

</TabItem>
<TabItem value="java">

\`\`\`java
public void hello() {}
\`\`\`

</TabItem>
</Tabs>
`.trim();

  const { markdown } = transformMdx(input);
  assertContains(markdown, "**Go**");
  assertContains(markdown, "**Java**");
  assertContains(markdown, "func Hello()");
  assertContains(markdown, "public void hello()");
  assertNotContains(markdown, "<Tabs");
  assertNotContains(markdown, "<TabItem");
});

test("uses label from TabItem tag when not in values array", () => {
  const input = `
<Tabs>
<TabItem value="ts" label="TypeScript">

TypeScript content

</TabItem>
</Tabs>
`.trim();
  const { markdown } = transformMdx(input);
  assertContains(markdown, "**TypeScript**");
  assertContains(markdown, "TypeScript content");
});

test("nested content inside TabItem is preserved", () => {
  const input = `
<Tabs>
<TabItem value="go" label="Go">

## Sub heading

A paragraph with **bold**.

</TabItem>
</Tabs>
`.trim();
  const { markdown } = transformMdx(input);
  assertContains(markdown, "Sub heading");
  assertContains(markdown, "**bold**");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — ZoomPanPinch
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — ZoomPanPinch");

test("strips ZoomPanPinch wrapper, preserves inner image", () => {
  const input = `<ZoomPanPinch>\n  ![My Diagram](/img/diagram.svg)\n</ZoomPanPinch>`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "![My Diagram](/img/diagram.svg)");
  assertNotContains(markdown, "ZoomPanPinch");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — RelatedReadList
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — RelatedReadList");

test("converts RelatedReadList to markdown link list", () => {
  const input = `<RelatedReadList readList={[["Workflow Definition", "/workflow-definition", "concept"],["Activities", "/activities", "concept"]]} />`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "**Related:**");
  assertContains(markdown, "- [Workflow Definition](/workflow-definition)");
  assertContains(markdown, "- [Activities](/activities)");
  assertNotContains(markdown, "RelatedReadList");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — SdkGuideLinks
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — SdkGuideLinks");

test("converts SdkGuideLinks to a markdown link list", () => {
  const input = `<SdkGuideLinks path="activities/standalone-activities" filter={['go', 'ruby']} title="Standalone Activities" />`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "- [Standalone Activities - Go](/develop/go/activities/standalone-activities)");
  assertContains(markdown, "- [Standalone Activities - Ruby](/develop/ruby/activities/standalone-activities)");
  assertNotContains(markdown, "SdkGuideLinks");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — anchor stripping
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — heading anchors");

test("strips {#anchor} from headings", () => {
  const { markdown } = transformMdx("## My Section {#my-section}");
  assertContains(markdown, "## My Section");
  assertNotContains(markdown, "{#my-section}");
});

test("preserves heading level", () => {
  const { markdown } = transformMdx("### Deep Heading {#deep}");
  assertContains(markdown, "### Deep Heading");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — code blocks not parsed as JSX
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — code block passthrough");

test("code inside fences is not parsed as JSX", () => {
  const input = "```jsx\n<Tabs>\n<TabItem>hi</TabItem>\n</Tabs>\n```";
  const { markdown } = transformMdx(input);
  assertContains(markdown, "<Tabs>");
  assertContains(markdown, "<TabItem>hi</TabItem>");
  assertContains(markdown, "</Tabs>");
});

test("triple-backtick code blocks are preserved intact", () => {
  const input = "```go\nfunc main() {\n    fmt.Println(\"hello\")\n}\n```";
  const { markdown } = transformMdx(input);
  assertContains(markdown, "```go");
  assertContains(markdown, 'fmt.Println("hello")');
  assertContains(markdown, "```");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — strip-block components
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — strip-block components");

test("DocCardList is stripped entirely", () => {
  const input = `Before\n<DocCardList />\nAfter`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "Before");
  assertContains(markdown, "After");
  assertNotContains(markdown, "DocCardList");
});

test("multiline DocCardList with children is stripped", () => {
  const input = `Before\n<DocCardList>\n  <Card title="foo" />\n</DocCardList>\nAfter`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "Before");
  assertContains(markdown, "After");
  assertNotContains(markdown, "DocCardList");
  assertNotContains(markdown, "Card");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — warnings for unknown components
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — unknown component warnings");

test("emits warning for unknown open component", () => {
  const { warnings } = transformMdx(`<UnknownWidget foo="bar">\nContent\n</UnknownWidget>`);
  assert(warnings.some((w) => w.includes("UnknownWidget")), "Expected warning for UnknownWidget");
});

test("emits warning for unknown self-closing component", () => {
  const { warnings } = transformMdx(`<MysteryComponent />`);
  assert(warnings.some((w) => w.includes("MysteryComponent")), "Expected warning for MysteryComponent");
});

test("no warnings for known components", () => {
  const input = `<ZoomPanPinch>\n  ![img](/img/foo.svg)\n</ZoomPanPinch>`;
  const { warnings } = transformMdx(input, { sourceFile: "test.mdx" });
  assert(
    !warnings.some((w) => w.includes("ZoomPanPinch")),
    "Should not warn for registered ZoomPanPinch"
  );
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — details/summary
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — details/summary");

test("renders details with summary as heading and body expanded", () => {
  const input = `<details>\n<summary>Show more</summary>\n\nHidden content here.\n\n</details>`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "#### Show more");
  assertContains(markdown, "Hidden content here.");
  assertNotContains(markdown, "<details>");
  assertNotContains(markdown, "<summary>");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — CodeSnippet
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — CodeSnippet");

test("CodeSnippet becomes a fenced code block with language", () => {
  const input = `<CodeSnippet language="bash">\ngo version\n</CodeSnippet>`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "```bash");
  assertContains(markdown, "go version");
  assertNotContains(markdown, "<CodeSnippet");
});

test("CodeSnippet on a single line is handled", () => {
  const input = `<CodeSnippet language="bash">brew install temporal</CodeSnippet>`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "```bash");
  assertContains(markdown, "brew install temporal");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — image components
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — image components");

test("EnlargeImage (multi-line) becomes a markdown image", () => {
  const input = `<EnlargeImage\n  src="/img/foo.png"\n  alt="A foo diagram"\n/>`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "![A foo diagram](/img/foo.png)");
  assertNotContains(markdown, "EnlargeImage");
  assertNotContains(markdown, "src=");
});

test("CaptionedImage uses caption/title when no alt", () => {
  const input = `<Components.CaptionedImage\nsrc="/diagrams/x.svg"\ntitle="Persistence"\n/>`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "![Persistence](/diagrams/x.svg)");
});

test("PhotoCarousel emits one image per entry with captions", () => {
  const input = `<PhotoCarousel\n  images={[\n    'https://x/a.jpeg',\n    'https://x/b.jpeg',\n  ]}\n  captions={[\n    'First',\n    'Second',\n  ]}\n/>`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "![First](https://x/a.jpeg)");
  assertContains(markdown, "![Second](https://x/b.jpeg)");
  assertNotContains(markdown, "PhotoCarousel");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — SdkTabs
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — SdkTabs");

test("SdkTabs flattens sub-tabs with language labels", () => {
  const input = `<SdkTabs>\n  <SdkTabs.Python>\n\nPython content\n\n  </SdkTabs.Python>\n  <SdkTabs.DotNet>\n\nDotNet content\n\n  </SdkTabs.DotNet>\n</SdkTabs>`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "**Python**");
  assertContains(markdown, "**.NET**"); // DotNet → .NET label mapping
  assertContains(markdown, "Python content");
  assertContains(markdown, "DotNet content");
  assertNotContains(markdown, "<SdkTabs");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — ToolTipTerm & MDX comments (inline)
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — inline transforms");

test("ToolTipTerm is replaced inline with the term text", () => {
  const input = `Add a <ToolTipTerm term="replica" /> region to your namespace.`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "Add a replica region");
  assertNotContains(markdown, "ToolTipTerm");
});

test("MDX comments are stripped", () => {
  const input = `Before\n{/* SNIPSTART foo */}\nAfter`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "Before");
  assertContains(markdown, "After");
  assertNotContains(markdown, "SNIPSTART");
});

test("comment-only line collapses to blank (no indented-code artifact)", () => {
  const input = `text\n    {/* SNIPEND */}\nmore`;
  const { markdown } = transformMdx(input);
  assertNotContains(markdown, "    {/*");
  // The whitespace-only remnant should not survive as an indented line
  assert(!markdown.split("\n").some((l) => /^\s+$/.test(l)), "found whitespace-only line");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — ReleaseNoteHeader
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — ReleaseNoteHeader");

test("ReleaseNoteHeader prepends availability note and keeps body", () => {
  const input = `<ReleaseNoteHeader type="publicPreview" languages={["Go", "Java"]}>\nThis feature is in preview.\n</ReleaseNoteHeader>`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "> **Public Preview** — Go, Java");
  assertContains(markdown, "This feature is in preview.");
  assertNotContains(markdown, "ReleaseNoteHeader");
});

test("ReleaseNoteHeader maps prerelease type", () => {
  const input = `<ReleaseNoteHeader type="prerelease">\nBody.\n</ReleaseNoteHeader>`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "> **Pre-release**");
});

test("self-closing ReleaseNoteHeader does NOT swallow the page body", () => {
  // Regression: <ReleaseNoteHeader ... /> has no close tag; the body must survive.
  const input = `<ReleaseNoteHeader\n  type="publicPreview"\n/>\n\nReal page content here.\n\n## A heading\n\nMore content.`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "> **Public Preview**");
  assertContains(markdown, "Real page content here.");
  assertContains(markdown, "## A heading");
  assertContains(markdown, "More content.");
  assertNotContains(markdown, "ReleaseNoteHeader");
});

test("self-closing ReleaseNoteHeader resolves label from featureName", () => {
  const input = `<ReleaseNoteHeader featureName="cloudCli" />\n\nCommand reference content.`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "> **Pre-release**");
  assertContains(markdown, "Command reference content.");
  assertNotContains(markdown, "ReleaseNoteHeader");
});

test("ReleaseNoteHeader resolves label from featureName in paired form", () => {
  const input = `<ReleaseNoteHeader featureName="standaloneActivity">\nAvailable in preview.\n</ReleaseNoteHeader>`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "> **Public Preview**");
  assertContains(markdown, "Available in preview.");
  assertNotContains(markdown, "> ****");
});

test("ReleaseNoteHeader featureName overrides explicit type when mapped", () => {
  const input = `<ReleaseNoteHeader featureName="serverlessWorkers" type="publicPreview">\nBody.\n</ReleaseNoteHeader>`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "> **Pre-release**");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — CallToAction
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — CallToAction");

test("CallToAction becomes a markdown link with title and description", () => {
  const input = `<CallToAction href="https://example.com/learn">\n  <h3>Run your first app</h3>\n  <p>A quick guide</p>\n</CallToAction>`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "- [Run your first app](https://example.com/learn): A quick guide");
  assertNotContains(markdown, "CallToAction");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — ViewSourceCodeNotice
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — ViewSourceCodeNotice");

test("ViewSourceCodeNotice becomes a plain markdown link line", () => {
  const input = `<ViewSourceCodeNotice href="https://github.com/temporalio/documentation/blob/main/sample-apps/go/yourapp/your_workflow_definition_dacx.go" />`;
  const { markdown } = transformMdx(input);
  assertContains(
    markdown,
    "[View the source code](https://github.com/temporalio/documentation/blob/main/sample-apps/go/yourapp/your_workflow_definition_dacx.go) in the context of the rest of the application code."
  );
  assertNotContains(markdown, "ViewSourceCodeNotice");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — RelatedReadContainer
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — RelatedReadContainer");

test("RelatedReadContainer renders RelatedReadItems as a link list", () => {
  const input = `<RelatedReadContainer>\n  <RelatedReadItem path="/develop/go/foo" text="Foo in Go" archetype="feature-guide" />\n  <RelatedReadItem path="/develop/java/foo" text="Foo in Java" />\n</RelatedReadContainer>`;
  const { markdown } = transformMdx(input);
  assertContains(markdown, "**Related:**");
  assertContains(markdown, "- [Foo in Go](/develop/go/foo)");
  assertContains(markdown, "- [Foo in Java](/develop/java/foo)");
  assertNotContains(markdown, "RelatedReadItem");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — SetupSteps / SetupStep
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — SetupSteps / SetupStep");

test("SetupStep emits prose children and code from the code={} prop", () => {
  const input = [
    "<SetupSteps>",
    "<SetupStep code={",
    "  <>",
    '    <CodeSnippet language="bash">',
    "    go version",
    "    </CodeSnippet>",
    "  </>",
    "}>",
    "",
    "## Install Go",
    "",
    "Check your Go version.",
    "",
    "</SetupStep>",
    "</SetupSteps>",
  ].join("\n");
  const { markdown } = transformMdx(input);
  assertContains(markdown, "## Install Go");
  assertContains(markdown, "Check your Go version.");
  assertContains(markdown, "```bash");
  assertContains(markdown, "go version");
  assertNotContains(markdown, "SetupStep");
  assertNotContains(markdown, "code={");
});

test("SetupStep preserves non-code prose, links, and lists in the code={} prop", () => {
  const input = [
    "<SetupSteps>",
    "<SetupStep code={",
    "  <>",
    "    <p>Download the CLI for your platform:</p>",
    "    <ul>",
    '      <li><a href="https://example.com/win">Windows</a></li>',
    "    </ul>",
    "    <p>Then add <code>cli.exe</code> to your PATH.</p>",
    "  </>",
    "}>",
    "## Install CLI",
    "</SetupStep>",
    "</SetupSteps>",
  ].join("\n");
  const { markdown } = transformMdx(input);
  assertContains(markdown, "Download the CLI for your platform:");
  assertContains(markdown, "- [Windows](https://example.com/win)");
  assertContains(markdown, "Then add `cli.exe` to your PATH.");
  assertNotContains(markdown, "<p>");
  assertNotContains(markdown, "<li>");
});

test("SetupStep unwraps {`...`} template literals in CodeSnippet bodies", () => {
  const input = [
    "<SetupSteps>",
    "<SetupStep code={",
    "  <>",
    '    <CodeSnippet language="bash">{`dotnet build`}</CodeSnippet>',
    "  </>",
    "}>",
    "## Build",
    "</SetupStep>",
    "</SetupSteps>",
  ].join("\n");
  const { markdown } = transformMdx(input);
  assertContains(markdown, "```bash");
  assertContains(markdown, "dotnet build");
  assertNotContains(markdown, "{`");
  assertNotContains(markdown, "`}");
});

// ---------------------------------------------------------------------------
// Unit tests: transformMdx — JsonTable (graceful degradation without root)
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — JsonTable");

test("JsonTable without projectRoot emits a placeholder, not raw JSX", () => {
  const input = `<JsonTable filename="/json/foo.json" />`;
  const { markdown } = transformMdx(input);
  assertNotContains(markdown, "<JsonTable");
  assertContains(markdown, "JsonTable: /json/foo.json");
});

// ---------------------------------------------------------------------------
// Unit tests: data-tables handler
// ---------------------------------------------------------------------------
console.log("\n📦 component-handlers/data-tables");

test("jsonToMarkdownTable renders a GFM table", () => {
  const table = jsonToMarkdownTable({
    columns: ["Region", "Service"],
    rows: [["us-east-1", "svc-abc"], ["us-west-2", "svc-def"]],
  });
  assertContains(table, "| Region | Service |");
  assertContains(table, "| --- | --- |");
  assertContains(table, "| us-east-1 | svc-abc |");
});

test("jsonToMarkdownTable escapes pipes in cells", () => {
  const table = jsonToMarkdownTable({ columns: ["A"], rows: [["x|y"]] });
  assertContains(table, "x\\|y");
});

test("jsonToMarkdownTable returns empty string for invalid shape", () => {
  assert(jsonToMarkdownTable({}) === "", "expected empty string");
  assert(jsonToMarkdownTable(null) === "", "expected empty string");
});

// ---------------------------------------------------------------------------
// Unit tests: integrations handler
// ---------------------------------------------------------------------------
console.log("\n📦 component-handlers/integrations");

const SAMPLE_INTEGRATIONS = [
  { name: "Spring Boot", description: "Boot it.", tags: ["Framework"], sdk: "Java", href: "/a" },
  { name: "Datadog", description: "Watch it.", tags: ["Observability"], href: "https://dd" },
  { name: "Spring AI", description: "AI it.", tags: ["Agent framework"], sdk: "Java", href: "/b" },
  { name: "LangGraph", description: "Graph it.", tags: ["Agent framework"], sdk: "Python", href: "/c" },
];

test("selectIntegrations with no defaultSdks returns all, sorted by name", () => {
  const out = selectIntegrations(SAMPLE_INTEGRATIONS, []);
  assert(out.length === 4, "expected all 4");
  assert(out[0].name === "Datadog", "expected Datadog first (alphabetical)");
});

test("selectIntegrations filters to the given SDK(s)", () => {
  const out = selectIntegrations(SAMPLE_INTEGRATIONS, ["Java"]);
  assert(out.length === 2, "expected 2 Java integrations");
  assert(out.every((i) => i.sdk === "Java"), "expected only Java");
  // language-agnostic (no sdk) entries excluded, matching the component
  assert(!out.some((i) => i.name === "Datadog"), "agnostic entry should be excluded");
});

test("integrationsToMarkdownList renders link + description + meta", () => {
  const md = integrationsToMarkdownList([SAMPLE_INTEGRATIONS[0]]);
  assertContains(md, "- [Spring Boot](/a)");
  assertContains(md, "Boot it.");
  assertContains(md, "_(Java · Framework)_");
});

test("transformMdx resolves <IntegrationsGrid> to a real list (with projectRoot)", () => {
  const input = `<IntegrationsGrid defaultSdks={["Java"]} />`;
  const { markdown } = transformMdx(input, { projectRoot: PROJECT_ROOT });
  assertNotContains(markdown, "<IntegrationsGrid");
  assertContains(markdown, "- [Spring Boot](/develop/java/integrations/spring-boot-integration)");
  assertContains(markdown, "- [Spring AI](/develop/java/integrations/spring-ai)");
});

test("transformMdx IntegrationsGrid without projectRoot degrades to a comment", () => {
  const input = `<IntegrationsGrid />`;
  const { markdown } = transformMdx(input);
  assertNotContains(markdown, "<IntegrationsGrid");
  assertContains(markdown, "IntegrationsGrid (not resolved)");
});

// ---------------------------------------------------------------------------
// Unit tests: cards handler (QuickstartCards / PatternCards)
// ---------------------------------------------------------------------------
console.log("\n📦 component-handlers/cards");

test("parseCardItems extracts href/title/description from an items prop", () => {
  const tag = `<QuickstartCards items={[\n  { href: "/a", title: "Go", description: "Run Go." },\n  { href: "/b", title: "Java", description: "Run Java." },\n]} />`;
  const items = parseCardItems(tag);
  assert(items.length === 2, "expected 2 items");
  assert(items[0].title === "Go" && items[0].href === "/a", "first item parsed");
  assert(items[1].description === "Run Java.", "description parsed");
});

test("cardsToMarkdown renders a link list with descriptions", () => {
  const md = cardsToMarkdown([{ href: "/a", title: "Go", description: "Run Go." }]);
  assertContains(md, "- [Go](/a): Run Go.");
});

test("transformMdx renders QuickstartCards items as a list", () => {
  const input = `<QuickstartCards items={[\n  { href: "/develop/go", title: "Go", description: "Install the Go SDK." },\n]} />`;
  const { markdown } = transformMdx(input);
  assertNotContains(markdown, "QuickstartCards");
  assertContains(markdown, "- [Go](/develop/go): Install the Go SDK.");
});

test("transformMdx renders PatternCards items as a list", () => {
  const input = `<PatternCards items={[\n  { href: "https://x", title: "Company Security", description: "Learn more." },\n]} />`;
  const { markdown } = transformMdx(input);
  assertNotContains(markdown, "PatternCards");
  assertContains(markdown, "- [Company Security](https://x): Learn more.");
});

// ---------------------------------------------------------------------------
// Unit tests: HomePageHero handler
// ---------------------------------------------------------------------------
console.log("\n📦 component-handlers/home-page-hero");

test("transformMdx resolves <HomePageHero /> to hero content", () => {
  const input = `import HomePageHero from '@site/src/components/elements/HomePageHero';\n\n<HomePageHero />`;
  const { markdown } = transformMdx(input);
  assertNotContains(markdown, "<HomePageHero");
  assertContains(markdown, "## Build applications that never fail");
  assertContains(markdown, "crash-proof execution");
  assertContains(markdown, "- [Quickstart](/quickstarts)");
  assertContains(markdown, "- [Slack Community](https://temporal.io/slack)");
});

// ---------------------------------------------------------------------------
// Unit tests: helpers — dedent & scanMarkdownImports
// ---------------------------------------------------------------------------
console.log("\n📦 transformMdx — helpers");

test("dedent removes common leading whitespace", () => {
  const out = dedent(["    a", "      b", "    c"]);
  assert(out[0] === "a" && out[1] === "  b" && out[2] === "c", `got ${JSON.stringify(out)}`);
});

test("scanMarkdownImports finds .md component imports", () => {
  const map = scanMarkdownImports(`import AWSRegions from '@site/docs/regions/aws.md';\nimport X from './local.mdx';`);
  assert(map.AWSRegions === "@site/docs/regions/aws.md", "AWSRegions import missing");
  assert(map.X === "./local.mdx", "X import missing");
});

// ---------------------------------------------------------------------------
// Snapshot tests: fixture files
// ---------------------------------------------------------------------------
console.log("\n📸 Snapshot tests — fixture files");

const fixtureFiles = [
  ["docs/encyclopedia/workflows.mdx", "encyclopedia-workflows"],
  ["docs/develop/go/workflows/basics.mdx", "develop-go-workflows-basics"],
  ["docs/encyclopedia/workflow-definition.mdx", "encyclopedia-workflow-definition"],
];

for (const [relPath, snapshotName] of fixtureFiles) {
  const fixturePath = join(FIXTURES_DIR, relPath);
  test(`snapshot: ${relPath}`, () => {
    assert(existsSync(fixturePath), `Fixture file not found: ${fixturePath}`);
    const raw = readFileSync(fixturePath, "utf8");
    const { markdown, warnings } = transformMdx(raw, { sourceFile: relPath });

    // Basic sanity checks before snapshot
    assert(markdown.length > 50, "Output is suspiciously short");
    assertNotContains(markdown, "import Tabs");
    assertNotContains(markdown, "import TabItem");
    assertNotContains(markdown, "<Tabs");
    assertNotContains(markdown, "<TabItem");
    assertNotContains(markdown, ":::");

    assertMatchesSnapshot(snapshotName, markdown);
  });
}

// ---------------------------------------------------------------------------
// Integration test: batch generator computeOutputPath logic
// ---------------------------------------------------------------------------
console.log("\n🔗 Integration: path computation");

test("index.mdx maps to parent directory .md", () => {
  // inline path logic (no require in ESM)
  const docsDir = "/repo/docs";
  const mdxPath = "/repo/docs/encyclopedia/index.mdx";
  let rel = mdxPath.slice(docsDir.length + 1).replace(/.mdx?$/, "");
  const parts = rel.split("/");
  if (parts[parts.length - 1] === "index") parts.pop();
  rel = parts.join("/");
  assertEqual(rel, "encyclopedia");
});

test("normal file maps to matching .md path", () => {
  const docsDir = "/repo/docs";
  const mdxPath = "/repo/docs/encyclopedia/workflows.mdx";
  const rel = mdxPath.slice(docsDir.length + 1).replace(/.mdx?$/, "");
  assertEqual(rel, "encyclopedia/workflows");
});

test("slug frontmatter overrides computed path", () => {
  const docsDir = "/repo/docs";
  const mdxPath = "/repo/docs/some/deep/nested/page.mdx";
  const frontmatter = { slug: "/workflows" };
  let rel = mdxPath.slice(docsDir.length + 1).replace(/.mdx?$/, "");
  if (frontmatter.slug) rel = frontmatter.slug.replace(/^\//, "");
  assertEqual(rel, "workflows");
});

// ---------------------------------------------------------------------------
// Component registry completeness check
// ---------------------------------------------------------------------------
console.log("\n🗂️  COMPONENT_REGISTRY checks");

test("all known Temporal components are registered", () => {
  const requiredComponents = [
    "Tabs", "TabItem", "ZoomPanPinch", "RelatedReadList",
    "CaptionedImage", "DocCardList", "CardList",
  ];
  for (const comp of requiredComponents) {
    assert(
      COMPONENT_REGISTRY[comp] !== undefined,
      `Component "${comp}" missing from COMPONENT_REGISTRY`
    );
  }
});

test("all registry strategies are valid strings", () => {
  const validStrategies = [
    "tabs", "tabitem", "transparent", "related-read",
    "related-read-container", "related-read-item",
    "captioned-image", "photo-carousel", "code-snippet", "sdk-tabs", "tooltip-term",
    "release-note-header", "call-to-action", "setup-steps", "setup-step",
    "json-table", "integrations-grid", "home-page-hero", "view-source-code-notice", "cards", "strip-tag", "strip-block", "details", "summary",
    "sdk-guide-links",
  ];
  for (const [comp, strategy] of Object.entries(COMPONENT_REGISTRY)) {
    assert(
      validStrategies.includes(strategy),
      `Unknown strategy "${strategy}" for component "${comp}"`
    );
  }
});

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log(`\n${"─".repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);

if (failures.length > 0) {
  console.log("\nFailed tests:");
  for (const f of failures) {
    console.log(`  ❌ ${f.name}`);
  }
  process.exit(1);
} else {
  console.log("\n🎉 All tests passed!");
}
