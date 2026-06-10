#!/usr/bin/env node

// Post-processes generated CLI docs before committing.
//
// - Injects a pre-release admonition into cloud CLI reference pages.
// - Removes pages for unreleased features.
//
// Run after copying gen-docs output into docs/cli/command-reference/.
// When the cloud CLI reaches GA, remove the admonition block below.
// When a feature ships, remove it from EXCLUDED_PAGES.

const fs = require("fs");
const path = require("path");

const CLOUD_DIR = path.join(
  __dirname,
  "..",
  "docs",
  "cli",
  "command-reference",
  "cloud"
);

const ADMONITION = `:::tip SUPPORT, STABILITY, and DEPENDENCY INFO

The \`temporal cloud\` CLI extension is in [Pre-release](/evaluate/development-production-features/release-stages#pre-release).
Commands and options may change before the stable release.

:::`;

const EXCLUDED_PAGES = ["custom-role.mdx"];

// Remove excluded pages
for (const page of EXCLUDED_PAGES) {
  const filePath = path.join(CLOUD_DIR, page);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`[post-process] removed excluded page: cloud/${page}`);
  }
}

// Inject admonition into each cloud page
const files = fs.readdirSync(CLOUD_DIR).filter((f) => f.endsWith(".mdx"));
let count = 0;

for (const file of files) {
  const filePath = path.join(CLOUD_DIR, file);
  const content = fs.readFileSync(filePath, "utf-8");

  // Skip if admonition already present
  if (content.includes("SUPPORT, STABILITY, and DEPENDENCY INFO")) {
    continue;
  }

  // Insert after the auto-generated comment block
  const marker = "*/}\n\n";
  const markerIndex = content.indexOf(marker);
  if (markerIndex === -1) {
    console.warn(`[post-process] no marker found in cloud/${file}, skipping`);
    continue;
  }

  const insertAt = markerIndex + marker.length;
  const updated =
    content.slice(0, insertAt) +
    ADMONITION +
    "\n\n" +
    content.slice(insertAt);

  fs.writeFileSync(filePath, updated);
  count++;
}

console.log(`[post-process] injected pre-release admonition into ${count} cloud page(s)`);
