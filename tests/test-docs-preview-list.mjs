/**
 * tests/test-docs-preview-list.mjs
 *
 * Test suite for the docs PR preview-link generator's URL derivation.
 * Uses only Node.js built-ins (no test framework).
 *
 * Run: node tests/test-docs-preview-list.mjs
 */

import { writeFileSync, mkdtempSync } from "fs";
import { join, dirname } from "path";
import { tmpdir } from "os";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const {
  extractFrontMatter,
  relativeSlugFromPath,
  normalizeSlug,
} = require("../bin/generate-docs-preview-list.js");

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
// Must match the generator's DOCS_DIR (process.cwd()/docs); the CI/test runner
// invokes tests from the repo root, so PROJECT_ROOT is the working directory.
const DOCS_DIR = join(PROJECT_ROOT, "docs");

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

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(
      message || `Expected:\n  ${JSON.stringify(expected)}\nGot:\n  ${JSON.stringify(actual)}`
    );
  }
}

function docPath(...segments) {
  return join(DOCS_DIR, ...segments);
}

// ---------------------------------------------------------------------------
// extractFrontMatter — now reads `id`
// ---------------------------------------------------------------------------
console.log("\n📦 extractFrontMatter");

test("extracts a custom id", () => {
  const dir = mkdtempSync(join(tmpdir(), "preview-fm-"));
  const file = join(dir, "temporal-nexus.mdx");
  writeFileSync(file, `---\nid: nexus\ntitle:  Self-hosted Temporal Nexus\nsidebar_label: Temporal Nexus\n---\n\nBody\n`);
  const fm = extractFrontMatter(file);
  assertEqual(fm.id, "nexus");
  assertEqual(fm.sidebar_label, "Temporal Nexus");
});

test("id is undefined when absent", () => {
  const dir = mkdtempSync(join(tmpdir(), "preview-fm-"));
  const file = join(dir, "page.mdx");
  writeFileSync(file, `---\ntitle: Page\n---\n\nBody\n`);
  const fm = extractFrontMatter(file);
  assertEqual(fm.id, undefined);
});

// ---------------------------------------------------------------------------
// relativeSlugFromPath — honors a custom id
// ---------------------------------------------------------------------------
console.log("\n📦 relativeSlugFromPath");

test("custom id overrides the filename segment (the reported bug)", () => {
  const slug = relativeSlugFromPath(
    docPath("production-deployment", "self-hosted-guide", "temporal-nexus.mdx"),
    "nexus"
  );
  assertEqual(slug, "production-deployment/self-hosted-guide/nexus");
});

test("no id falls back to the filename", () => {
  const slug = relativeSlugFromPath(
    docPath("production-deployment", "self-hosted-guide", "temporal-nexus.mdx"),
    undefined
  );
  assertEqual(slug, "production-deployment/self-hosted-guide/temporal-nexus");
});

test("index file with no id drops the index segment", () => {
  const slug = relativeSlugFromPath(docPath("cloud", "connectivity", "index.mdx"), undefined);
  assertEqual(slug, "cloud/connectivity");
});

test("index file with a custom id uses the id, not the folder", () => {
  const slug = relativeSlugFromPath(docPath("cloud", "connectivity", "index.mdx"), "overview");
  assertEqual(slug, "cloud/connectivity/overview");
});

test("empty/whitespace id is treated as absent", () => {
  const slug = relativeSlugFromPath(docPath("develop", "go", "set-up.mdx"), "   ");
  assertEqual(slug, "develop/go/set-up");
});

// ---------------------------------------------------------------------------
// normalizeSlug — slug wins over id; id used only as fallback
// ---------------------------------------------------------------------------
console.log("\n📦 normalizeSlug");

test("explicit slug takes precedence over id", () => {
  const slug = normalizeSlug("/cli/cloud", docPath("cli", "temporal-cloud.mdx"), "cloud");
  assertEqual(slug, "cli/cloud");
});

test("falls back to id-aware path when slug is absent", () => {
  const slug = normalizeSlug(undefined, docPath("develop", "go", "set-up.mdx"), "set-up-your-local-go");
  assertEqual(slug, "develop/go/set-up-your-local-go");
});

test("falls back to filename when neither slug nor id present", () => {
  const slug = normalizeSlug(undefined, docPath("develop", "go", "set-up.mdx"), undefined);
  assertEqual(slug, "develop/go/set-up");
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
