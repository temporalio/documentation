#!/usr/bin/env node

// Post-processes generated CLI docs before committing.
//
// - Regenerates the command-reference index to list top-level commands
//   (not individual cloud subcommands).
// - Injects a ReleaseNoteHeader component into cloud CLI reference pages.
// - Removes pages for unreleased features.
//
// Run after copying gen-docs output into docs/cli/command-reference/.
// When the cloud CLI reaches GA, remove the ReleaseNoteHeader injection below
// and the "cloudCli" entry from src/constants/featureReleaseTypes.js.
// When a feature ships, remove it from EXCLUDED_PAGES.

const fs = require("fs");
const path = require("path");

const CMD_REF_DIR = path.join(
  __dirname,
  "..",
  "docs",
  "cli",
  "command-reference"
);

const CLOUD_DIR = path.join(CMD_REF_DIR, "cloud");

const IMPORT_LINE = `import { ReleaseNoteHeader } from '@site/src/components';`;

const COMPONENT_BLOCK = `<ReleaseNoteHeader featureName="cloudCli" />`;

const EXCLUDED_PAGES = [];

// ---------------------------------------------------------------------------
// 1. Remove excluded pages
// ---------------------------------------------------------------------------
for (const page of EXCLUDED_PAGES) {
  const filePath = path.join(CLOUD_DIR, page);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`[post-process] removed excluded page: cloud/${page}`);
  }
}

// ---------------------------------------------------------------------------
// 2. Regenerate command-reference/index.mdx
//    Lists top-level .mdx files and subdirectories (like cloud/) as single
//    entries, rather than expanding every cloud subcommand.
// ---------------------------------------------------------------------------
const topLevelCommands = [];

for (const entry of fs.readdirSync(CMD_REF_DIR)) {
  const fullPath = path.join(CMD_REF_DIR, entry);
  const stat = fs.statSync(fullPath);

  if (stat.isDirectory()) {
    topLevelCommands.push(entry);
  } else if (entry.endsWith(".mdx") && entry !== "index.mdx") {
    topLevelCommands.push(entry.replace(".mdx", ""));
  }
}

topLevelCommands.sort();

const indexLines = [
  "---",
  "id: index",
  "title: Temporal CLI command reference",
  "sidebar_label: Overview",
  "description: Complete command reference for the Temporal CLI, including the cloud extension.",
  "slug: /cli/command-reference",
  "toc_max_heading_level: 4",
  "keywords:",
  "  - temporal cli",
  "  - command reference",
  "tags:",
  "  - Temporal CLI",
  "---",
  "",
  "This section includes the complete command reference for the `temporal` CLI, including the cloud extension.",
  "",
];

for (const cmd of topLevelCommands) {
  indexLines.push(`- [${cmd}](/cli/command-reference/${cmd})`);
}
indexLines.push("");

fs.writeFileSync(path.join(CMD_REF_DIR, "index.mdx"), indexLines.join("\n"));
console.log(`[post-process] regenerated command-reference index with ${topLevelCommands.length} entries`);

// ---------------------------------------------------------------------------
// 3. Inject ReleaseNoteHeader into each cloud page
// ---------------------------------------------------------------------------
const cloudFiles = fs.readdirSync(CLOUD_DIR).filter((f) => f.endsWith(".mdx"));
let count = 0;

for (const file of cloudFiles) {
  const filePath = path.join(CLOUD_DIR, file);
  const content = fs.readFileSync(filePath, "utf-8");

  // Skip if component already present
  if (content.includes("ReleaseNoteHeader")) {
    continue;
  }

  // Insert after the auto-generated comment block
  const marker = "*/}\n\n";
  const markerIndex = content.indexOf(marker);
  if (markerIndex === -1) {
    // For index.mdx and other non-generated pages, insert after frontmatter
    const fmEnd = content.indexOf("---", 3);
    if (fmEnd === -1) {
      console.warn(`[post-process] no insertion point found in cloud/${file}, skipping`);
      continue;
    }
    const insertAt = fmEnd + 4; // after "---\n"
    const updated =
      content.slice(0, insertAt) +
      "\n" +
      IMPORT_LINE +
      "\n\n" +
      COMPONENT_BLOCK +
      "\n\n" +
      content.slice(insertAt);

    fs.writeFileSync(filePath, updated);
    count++;
    continue;
  }

  // Insert import after frontmatter
  const fmEnd = content.indexOf("---", 3);
  const afterFm = fmEnd + 4; // after "---\n"
  const withImport =
    content.slice(0, afterFm) +
    "\n" +
    IMPORT_LINE +
    "\n" +
    content.slice(afterFm);

  // Recalculate marker position after import insertion
  const newMarkerIndex = withImport.indexOf(marker);
  const newInsertAt = newMarkerIndex + marker.length;

  const updated =
    withImport.slice(0, newInsertAt) +
    COMPONENT_BLOCK +
    "\n\n" +
    withImport.slice(newInsertAt);

  fs.writeFileSync(filePath, updated);
  count++;
}

console.log(`[post-process] injected ReleaseNoteHeader into ${count} cloud page(s)`);
