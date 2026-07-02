#!/usr/bin/env node
/**
 * audit-snippets.mjs
 *
 * Scans docs/**\/*.mdx (and *.md) for fenced code blocks and classifies each
 * one as either:
 *   - snipsync:  managed by SnipSync (wrapped in <!--SNIPSTART--> / <!--SNIPEND-->,
 *                content is synced in from a source repo by `npm run update-code-snippets`)
 *   - hardcoded: a plain fenced code block with no SnipSync markers, edited by
 *                hand directly in the doc
 *
 * Usage:
 *   node scripts/audit-snippets.mjs [--root /path/to/repo] [--json out.json]
 *
 * Output:
 *   - Console summary: totals, percentages, breakdown by language and by top-level docs section
 *   - Writes SNIPPET_AUDIT.md (human-readable report) to the repo root
 *   - With --json, writes the full per-snippet data (including hardcoded snippet
 *     bodies) to the given path, consumed by scripts/find-snippable-hardcoded.mjs
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, relative, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function findFiles(dir, exts, results = []) {
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) findFiles(full, exts, results);
    else if (exts.some((ext) => entry.endsWith(ext))) results.push(full);
  }
  return results;
}

// Maps a fenced code block's language tag to the file extension it would
// carry as real source code. Anything not in this map is infra/output content
// (bash, yaml, json, console output, etc.) rather than SDK source code, so it
// is reported but excluded from the "could this be snipped" phase.
const LANG_TO_EXT = {
  go: ".go",
  python: ".py",
  py: ".py",
  java: ".java",
  typescript: ".ts",
  ts: ".ts",
  javascript: ".js",
  js: ".js",
  csharp: ".cs",
  cs: ".cs",
  ruby: ".rb",
  rb: ".rb",
  php: ".php",
  rust: ".rs",
};

const SNIP_REGION_RE = /<!--SNIPSTART\s+([^\s>]+)[^>]*-->([\s\S]*?)<!--SNIPEND-->/g;

// The ViewSourceCodeNotice component (src/components/elements/ViewSourceCodeNotice.js)
// renders a "View the source code" link. It takes a single `href` prop (a full
// GitHub blob URL) and, per the migration in #4807, is placed immediately above
// the fenced code block it documents (with zero or one blank lines in between,
// never any other content). Match across lines since the JSX tag is sometimes
// wrapped, e.g. `<ViewSourceCodeNotice\n  href="..."\n/>`.
const VIEW_SOURCE_NOTICE_RE = /<ViewSourceCodeNotice\b[^>]*?\bhref=["']([^"']+)["'][^>]*?\/?>/gs;

const GITHUB_BLOB_URL_RE = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/;

function parseGithubBlobUrl(href) {
  const m = href.match(GITHUB_BLOB_URL_RE);
  if (!m) return null;
  return { owner: m[1], repo: m[2], ref: m[3], path: m[4] };
}

function parseFile(content) {
  // Pass 1: find SnipSync-managed regions (id + [start, end) char offsets).
  const regions = [];
  let m;
  SNIP_REGION_RE.lastIndex = 0;
  while ((m = SNIP_REGION_RE.exec(content)) !== null) {
    regions.push({ id: m[1], start: m.index, end: m.index + m[0].length });
  }

  // ViewSourceCodeNotice tags: record their href + end offset so each fence
  // can check "is one of these immediately above me".
  const viewSourceNotices = [];
  VIEW_SOURCE_NOTICE_RE.lastIndex = 0;
  while ((m = VIEW_SOURCE_NOTICE_RE.exec(content)) !== null) {
    viewSourceNotices.push({ href: m[1], end: m.index + m[0].length });
  }
  function precedingSourceLink(fenceStartOffset) {
    let best = null;
    for (const notice of viewSourceNotices) {
      if (notice.end > fenceStartOffset) continue;
      // "Immediately above" means nothing but whitespace between the tag and the fence.
      if (content.slice(notice.end, fenceStartOffset).trim() !== "") continue;
      if (!best || notice.end > best.end) best = notice;
    }
    return best ? best.href : null;
  }

  // Pass 2: find every fenced code block in the file (line-based scan so
  // indented fences inside lists/admonitions are still detected).
  const lines = content.split("\n");
  const lineOffsets = [];
  let offset = 0;
  for (const line of lines) {
    lineOffsets.push(offset);
    offset += line.length + 1;
  }

  const fences = [];
  let inFence = false;
  let fenceLang = "";
  let fenceStartLine = -1;
  let fenceStartOffset = -1;
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!inFence) {
      if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
        inFence = true;
        fenceLang = trimmed.slice(3).trim().split(/\s+/)[0] || "";
        fenceStartLine = i;
        fenceStartOffset = lineOffsets[i];
      }
    } else if (trimmed === "```" || trimmed === "~~~") {
      inFence = false;
      const endOffset = lineOffsets[i] + lines[i].length;
      fences.push({
        lang: fenceLang.toLowerCase().replace(/^\{|\}$/g, ""),
        startLine: fenceStartLine + 1, // 1-indexed for humans
        endLine: i + 1,
        startOffset: fenceStartOffset,
        endOffset,
        body: lines.slice(fenceStartLine + 1, i).join("\n"),
      });
    }
  }

  // Classify each fence against the managed regions.
  return fences.map((fence) => {
    const region = regions.find((r) => fence.startOffset >= r.start && fence.endOffset <= r.end);
    const sourceLinkHref = precedingSourceLink(fence.startOffset);
    return {
      lang: fence.lang,
      startLine: fence.startLine,
      endLine: fence.endLine,
      body: fence.body,
      managed: !!region,
      snipId: region ? region.id : null,
      sourceLinkHref,
      sourceLink: sourceLinkHref ? parseGithubBlobUrl(sourceLinkHref) : null,
    };
  });
}

function tally(list, keyFn) {
  const counts = new Map();
  for (const item of list) {
    const key = keyFn(item) || "(none)";
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function main() {
  const args = process.argv.slice(2);
  function argVal(name) {
    const idx = args.indexOf(name);
    return idx !== -1 ? args[idx + 1] : undefined;
  }
  const PROJECT_ROOT = argVal("--root") || join(__dirname, "..");
  const JSON_OUT = argVal("--json");
  const DOCS_DIR = join(PROJECT_ROOT, "docs");

  const files = [...findFiles(DOCS_DIR, [".mdx"]), ...findFiles(DOCS_DIR, [".md"])];
  console.log(`\nScanning ${files.length} doc files under ${relative(PROJECT_ROOT, DOCS_DIR)}\n`);

  const allSnippets = [];
  for (const filePath of files) {
    const content = readFileSync(filePath, "utf8");
    const relPath = relative(PROJECT_ROOT, filePath);
    const section = relPath.split("/")[1] || relPath; // docs/<section>/...
    for (const snip of parseFile(content)) {
      allSnippets.push({ ...snip, file: relPath, section });
    }
  }

  const total = allSnippets.length;
  const snipsync = allSnippets.filter((s) => s.managed);
  const hardcoded = allSnippets.filter((s) => !s.managed);
  const pct = (n) => (total > 0 ? ((n / total) * 100).toFixed(1) : "0.0");

  console.log(`Total fenced code blocks:  ${total}`);
  console.log(`  SnipSync-managed:        ${snipsync.length} (${pct(snipsync.length)}%)`);
  console.log(`  Hardcoded:               ${hardcoded.length} (${pct(hardcoded.length)}%)`);

  console.log(`\nHardcoded blocks by language:`);
  const hardcodedByLang = tally(hardcoded, (s) => s.lang);
  for (const [lang, count] of hardcodedByLang) {
    console.log(`  ${lang.padEnd(15)} ${String(count).padStart(4)}`);
  }

  console.log(`\nHardcoded blocks by docs section (top 15):`);
  const hardcodedBySection = tally(hardcoded, (s) => s.section);
  for (const [section, count] of hardcodedBySection.slice(0, 15)) {
    console.log(`  ${section.padEnd(25)} ${String(count).padStart(4)}`);
  }

  const snippableLangs = new Set(Object.keys(LANG_TO_EXT));
  const hardcodedSnippable = hardcoded.filter((s) => snippableLangs.has(s.lang) && s.body.trim().length > 0);
  console.log(
    `\nHardcoded blocks in SDK source languages (go/python/java/ts/js/csharp/ruby/php/rust): ${hardcodedSnippable.length}`
  );
  console.log(`(these are the candidates scripts/find-snippable-hardcoded.mjs will check against source repos)`);

  const hardcodedWithLink = hardcoded.filter((s) => s.sourceLinkHref);
  const pctOfHardcoded = (n) => (hardcoded.length > 0 ? ((n / hardcoded.length) * 100).toFixed(1) : "0.0");
  console.log(
    `\nHardcoded blocks with a ViewSourceCodeNotice link immediately above them: ${hardcodedWithLink.length} (${pctOfHardcoded(
      hardcodedWithLink.length
    )}% of hardcoded)`
  );
  console.log(`(scripts/find-snippable-hardcoded.mjs verifies whether the link actually contains the snippet)`);

  // Write human-readable report to repo root.
  const reportPath = join(PROJECT_ROOT, "SNIPPET_AUDIT.md");
  const reportLines = [
    "# Snippet Usage Audit",
    "",
    "Generated by `scripts/audit-snippets.mjs`. Run to update.",
    "",
    `**Total fenced code blocks: ${total}**`,
    `- SnipSync-managed: ${snipsync.length} (${pct(snipsync.length)}%)`,
    `- Hardcoded: ${hardcoded.length} (${pct(hardcoded.length)}%)`,
    `- Hardcoded in SDK source languages (candidates for snipping): ${hardcodedSnippable.length}`,
    `- Hardcoded with a \`ViewSourceCodeNotice\` link above them: ${hardcodedWithLink.length} (${pctOfHardcoded(
      hardcodedWithLink.length
    )}% of hardcoded) — see SNIPPABLE_CANDIDATES.md for whether each link's target actually contains the snippet`,
    "",
    "## Hardcoded blocks by language",
    "",
    "| Language | Count |",
    "|----------|-------|",
    ...hardcodedByLang.map(([lang, count]) => `| \`${lang || "(none)"}\` | ${count} |`),
    "",
    "## Hardcoded blocks by docs section",
    "",
    "| Section | Count |",
    "|---------|-------|",
    ...hardcodedBySection.map(([section, count]) => `| \`${section}\` | ${count} |`),
  ];
  writeFileSync(reportPath, reportLines.join("\n") + "\n", "utf8");
  console.log(`\nWritten: ${relative(PROJECT_ROOT, reportPath)}`);

  if (JSON_OUT) {
    writeFileSync(JSON_OUT, JSON.stringify({ total, snipsync, hardcoded, allSnippets }, null, 2), "utf8");
    console.log(`Written: ${JSON_OUT}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export { parseFile, LANG_TO_EXT, findFiles, parseGithubBlobUrl };
