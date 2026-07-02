#!/usr/bin/env node
/**
 * find-snippable-hardcoded.mjs
 *
 * For every hardcoded (non-SnipSync) code block in an SDK source language,
 * checks whether its content already exists verbatim (or near-verbatim) in
 * one of the public repos configured as SnipSync origins (snipsync.config.yaml).
 * If it does, that block is a candidate to convert into a SnipSync snippet
 * (wrap the source with @@@SNIPSTART/@@@SNIPEND markers and reference it with
 * <!--SNIPSTART/SNIPEND--> in the doc) instead of being hand-maintained.
 *
 * Separately, if a block has a ViewSourceCodeNotice link immediately above it
 * (see audit-snippets.mjs), this also checks that specific linked file/repo
 * directly: does it actually still contain this snippet, or has it drifted /
 * gone missing? That's independent of the broad cross-repo search above,
 * since the linked file might live in a repo not in snipsync.config.yaml.
 *
 * This clones the origin repos (shallow) into .snippet-audit/repos/ the first
 * time it runs, then reuses that clone on subsequent runs. Delete
 * .snippet-audit/ (or pass --refresh) to re-clone with latest content.
 * Repos referenced only by a ViewSourceCodeNotice link (not already in
 * snipsync.config.yaml) are cloned too, at the ref the link points to.
 *
 * Matching is done with a plain-JS substring prefilter + contiguous line-match
 * scan (no `rg` binary dependency), since it needs to run anywhere `node` runs.
 *
 * Usage:
 *   node scripts/find-snippable-hardcoded.mjs [--root /path/to/repo] [--refresh] [--json out.json]
 *
 * Output:
 *   - Console summary: exact matches, partial matches, no match, skipped
 *   - Writes SNIPPABLE_CANDIDATES.md to the repo root with per-match detail
 */

import { execFileSync } from "child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, relative, dirname } from "path";
import { fileURLToPath } from "url";
import { load as loadYaml } from "js-yaml";
import { parseFile, LANG_TO_EXT, findFiles } from "./audit-snippets.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
function argVal(name) {
  const idx = args.indexOf(name);
  return idx !== -1 ? args[idx + 1] : undefined;
}
const PROJECT_ROOT = argVal("--root") || join(__dirname, "..");
const REFRESH = args.includes("--refresh");
const JSON_OUT = argVal("--json");

const AUDIT_DIR = join(PROJECT_ROOT, ".snippet-audit");
const REPOS_DIR = join(AUDIT_DIR, "repos");
const DOCS_DIR = join(PROJECT_ROOT, "docs");

// ---------------------------------------------------------------------------
// 1. Collect hardcoded snippets from the docs (this also tells us which repos
//    are referenced by ViewSourceCodeNotice links, so we know what to clone)
// ---------------------------------------------------------------------------
const docFiles = [...findFiles(DOCS_DIR, [".mdx"]), ...findFiles(DOCS_DIR, [".md"])];
const hardcodedSnippets = [];
for (const filePath of docFiles) {
  const content = readFileSync(filePath, "utf8");
  const relPath = relative(PROJECT_ROOT, filePath);
  for (const snip of parseFile(content)) {
    if (!snip.managed && LANG_TO_EXT[snip.lang] && snip.body.trim().length > 0) {
      hardcodedSnippets.push({ ...snip, file: relPath });
    }
  }
}

console.log(`Hardcoded snippets in SDK source languages: ${hardcodedSnippets.length}`);

// ---------------------------------------------------------------------------
// 2. Determine which repos to clone: snipsync.config.yaml origins, plus any
//    repo referenced by a ViewSourceCodeNotice link that isn't already there.
// ---------------------------------------------------------------------------
const config = loadYaml(readFileSync(join(PROJECT_ROOT, "snipsync.config.yaml"), "utf8"));

const repoSpecs = [];
const seen = new Set();
for (const origin of config.origins || []) {
  if (!origin.owner || !origin.repo) continue; // skip local `files:` patterns
  if (origin.repo === "documentation") continue; // that's this repo; sample-apps/ is already local
  const key = `${origin.owner}/${origin.repo}`;
  if (seen.has(key)) continue;
  seen.add(key);
  repoSpecs.push({ owner: origin.owner, repo: origin.repo, ref: origin.ref });
}

for (const snip of hardcodedSnippets) {
  const link = snip.sourceLink;
  if (!link || link.repo === "documentation") continue; // "documentation" is this repo, already local
  const key = `${link.owner}/${link.repo}`;
  if (seen.has(key)) continue;
  seen.add(key);
  repoSpecs.push({ owner: link.owner, repo: link.repo, ref: link.ref });
}

console.log(`\nRepos to clone (snipsync.config.yaml + ViewSourceCodeNotice links): ${repoSpecs.length}`);
for (const r of repoSpecs) console.log(`  - ${r.owner}/${r.repo}${r.ref ? ` @ ${r.ref}` : ""}`);

// ---------------------------------------------------------------------------
// 3. Clone (or reuse) each repo
// ---------------------------------------------------------------------------
mkdirSync(REPOS_DIR, { recursive: true });

function cloneDirFor(spec) {
  return join(REPOS_DIR, `${spec.owner}__${spec.repo}`);
}

for (const spec of repoSpecs) {
  const dest = cloneDirFor(spec);
  if (existsSync(dest) && !REFRESH) {
    console.log(`Using cached clone: ${relative(PROJECT_ROOT, dest)}`);
    continue;
  }
  if (existsSync(dest)) {
    execFileSync("rm", ["-rf", dest]);
  }
  const url = `https://github.com/${spec.owner}/${spec.repo}.git`;
  const cloneArgs = ["clone", "--depth", "1", "--single-branch"];
  if (spec.ref) cloneArgs.push("--branch", spec.ref);
  cloneArgs.push(url, dest);
  console.log(`Cloning ${spec.owner}/${spec.repo}${spec.ref ? ` @ ${spec.ref}` : ""}...`);
  try {
    execFileSync("git", cloneArgs, { stdio: ["ignore", "ignore", "pipe"] });
  } catch (err) {
    console.warn(`  ! failed to clone ${spec.owner}/${spec.repo}: ${err.message.split("\n")[0]}`);
  }
}

// Local search roots: every cloned repo, plus this repo's own sample-apps/
// (referenced directly by `files:` patterns in snipsync.config.yaml).
const searchRoots = [
  ...repoSpecs.map((s) => ({ label: `${s.owner}/${s.repo}`, dir: cloneDirFor(s) })).filter((r) => existsSync(r.dir)),
  { label: "temporalio/documentation (sample-apps/)", dir: join(PROJECT_ROOT, "sample-apps") },
].filter((r) => existsSync(r.dir));

console.log(`\nSearch roots available: ${searchRoots.length}`);

// Resolves a ViewSourceCodeNotice's parsed link to a local file path, whether
// it points at this repo (already checked out) or one of the cloned origins.
function resolveSourceLinkPath(link) {
  if (link.repo === "documentation") return join(PROJECT_ROOT, link.path);
  const spec = repoSpecs.find((s) => s.owner === link.owner && s.repo === link.repo);
  if (!spec) return null;
  return join(cloneDirFor(spec), link.path);
}

// ---------------------------------------------------------------------------
// 4. Match each hardcoded snippet against the cloned source repos
// ---------------------------------------------------------------------------
const MIN_LINES_TO_CHECK = 3; // below this, matching is too noisy to be useful
const EXACT_THRESHOLD = 1.0;
const PARTIAL_THRESHOLD = 0.6;

function normLine(l) {
  return l.trim().replace(/\s+/g, " ");
}

function nonBlankLines(body) {
  return body
    .split("\n")
    .map((l, i) => ({ text: normLine(l), lineNo: i }))
    .filter((l) => l.text.length > 0);
}

// Pick an anchor line to grep for: the longest non-trivial line, since short
// lines (braces, "return nil", etc.) match too many files to be useful.
function pickAnchor(lines) {
  const candidates = lines
    .filter((l) => l.text.length >= 15 && /[a-zA-Z]{3,}/.test(l.text))
    .sort((a, b) => b.text.length - a.text.length);
  return candidates[0]?.text;
}

// Directories that would otherwise pollute matches with vendored/generated
// copies of the same code, or just waste time walking.
const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  "vendor",
  "dist",
  "build",
  "target",
  "bin",
  ".venv",
  "venv",
  "__pycache__",
  ".tox",
  "coverage",
]);

function findSourceFiles(dir, ext, results = []) {
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    let stat;
    try {
      stat = statSync(full);
    } catch {
      continue;
    }
    if (stat.isDirectory()) findSourceFiles(full, ext, results);
    else if (entry.endsWith(ext)) results.push(full);
  }
  return results;
}

// Index every file of a given extension under a search root once, then reuse
// across every hardcoded snippet in that language (no `rg` binary available
// in this environment, so filtering is done with a plain substring check).
const fileIndexCache = new Map();
function getIndexedFiles(root, ext) {
  const key = `${root.dir}::${ext}`;
  if (!fileIndexCache.has(key)) {
    const paths = findSourceFiles(root.dir, ext);
    fileIndexCache.set(
      key,
      paths.map((p) => {
        const content = readFileSync(p, "utf8");
        return { path: p, content, lines: nonBlankLines(content) };
      })
    );
  }
  return fileIndexCache.get(key);
}

// Slide the snippet's normalized lines over the candidate file's normalized
// lines and return the best contiguous match ratio + its location.
function bestContiguousMatch(snippetLines, fileLines) {
  const A = snippetLines.map((l) => l.text);
  const B = fileLines.map((l) => l.text);
  if (A.length === 0 || B.length === 0) return { ratio: 0 };
  let best = { ratio: 0, startLine: null, endLine: null };
  for (let i = 0; i <= B.length - 1; i++) {
    let matches = 0;
    let j = 0;
    for (; j < A.length && i + j < B.length; j++) {
      if (B[i + j] === A[j]) matches++;
    }
    const ratio = matches / A.length;
    if (ratio > best.ratio) {
      best = {
        ratio,
        startLine: fileLines[i].lineNo + 1,
        endLine: fileLines[Math.min(i + A.length, B.length) - 1].lineNo + 1,
      };
    }
  }
  return best;
}

// Docs sometimes render a non-contiguous excerpt of a source file (either via
// SnipSync's `selectedLines` or the older `@dacx` line-range system used by
// sample-apps/), stitching the gaps together with a placeholder comment line.
// Filter those out before matching, since a real gap there isn't drift.
const ELISION_RE = /^(\/\/|#)\s*\.{3,}\s*$/;
function isElisionLine(text) {
  return ELISION_RE.test(text);
}

// Checks whether `codeLines` appear in `fileLines` as an in-order (but not
// necessarily contiguous) subsequence — i.e. "is this still in the file,
// possibly with unrelated lines in between", which is what an excerpt is.
// Unlike bestContiguousMatch, this is only safe to use against one known
// target file (verifySourceLink), not for searching across many candidate
// files, since over a large enough haystack an ordered subsequence of common
// short lines (e.g. repeated `}`) can match spuriously.
function bestOrderedSubsequenceMatch(snippetLines, fileLines) {
  const codeLines = snippetLines.filter((l) => !isElisionLine(l.text)).map((l) => l.text);
  if (codeLines.length === 0) return { ratio: 0 };
  const B = fileLines.map((l) => l.text);
  let si = 0;
  let firstIdx = -1;
  let lastIdx = -1;
  for (let fi = 0; fi < B.length && si < codeLines.length; fi++) {
    if (B[fi] === codeLines[si]) {
      if (firstIdx === -1) firstIdx = fi;
      lastIdx = fi;
      si++;
    }
  }
  return {
    ratio: si / codeLines.length,
    startLine: firstIdx >= 0 ? fileLines[firstIdx].lineNo + 1 : null,
    endLine: lastIdx >= 0 ? fileLines[lastIdx].lineNo + 1 : null,
  };
}

// Checks the ViewSourceCodeNotice link directly (if any): does the exact file
// it points at still contain this snippet? Independent of the broad search
// above, since the linked file may live in a repo not in snipsync.config.yaml.
function verifySourceLink(snip) {
  const link = snip.sourceLink;
  if (!link) return null;
  const targetPath = resolveSourceLinkPath(link);
  if (!targetPath) {
    return { href: snip.sourceLinkHref, status: "repo-not-cloned", matchRatio: null, targetPath: null };
  }
  if (!existsSync(targetPath) || statSync(targetPath).isDirectory()) {
    return {
      href: snip.sourceLinkHref,
      status: "file-not-found",
      matchRatio: null,
      targetPath: relative(PROJECT_ROOT, targetPath),
    };
  }
  const fileLines = nonBlankLines(readFileSync(targetPath, "utf8"));
  const match = bestOrderedSubsequenceMatch(nonBlankLines(snip.body), fileLines);
  const status = match.ratio >= EXACT_THRESHOLD ? "exact" : match.ratio >= PARTIAL_THRESHOLD ? "partial" : "mismatch";
  return {
    href: snip.sourceLinkHref,
    status,
    matchRatio: Math.round(match.ratio * 100),
    targetPath: relative(PROJECT_ROOT, targetPath),
    targetStartLine: match.startLine || null,
    targetEndLine: match.endLine || null,
  };
}

const results = { exact: [], partial: [], noMatch: [], skipped: [] };

for (const snip of hardcodedSnippets) {
  const linkVerification = verifySourceLink(snip);
  const lines = nonBlankLines(snip.body);
  if (lines.length < MIN_LINES_TO_CHECK) {
    results.skipped.push({ ...snip, reason: "too short", linkVerification });
    continue;
  }
  const anchor = pickAnchor(lines);
  if (!anchor) {
    results.skipped.push({ ...snip, reason: "no distinctive line to search for", linkVerification });
    continue;
  }

  const ext = LANG_TO_EXT[snip.lang];
  let best = { ratio: 0 };
  let bestFile = null;
  let bestRoot = null;

  for (const root of searchRoots) {
    const indexedFiles = getIndexedFiles(root, ext);
    for (const indexedFile of indexedFiles) {
      if (!indexedFile.content.includes(anchor)) continue;
      const match = bestContiguousMatch(lines, indexedFile.lines);
      if (match.ratio > best.ratio) {
        best = match;
        bestFile = indexedFile.path;
        bestRoot = root;
      }
      if (best.ratio >= EXACT_THRESHOLD) break;
    }
    if (best.ratio >= EXACT_THRESHOLD) break;
  }

  const record = {
    file: snip.file,
    startLine: snip.startLine,
    endLine: snip.endLine,
    lang: snip.lang,
    matchRatio: Math.round(best.ratio * 100),
    sourceRepo: bestRoot?.label || null,
    sourceFile: bestFile ? relative(bestRoot.dir, bestFile) : null,
    sourceStartLine: best.startLine || null,
    sourceEndLine: best.endLine || null,
    linkVerification,
  };

  if (best.ratio >= EXACT_THRESHOLD) results.exact.push(record);
  else if (best.ratio >= PARTIAL_THRESHOLD) results.partial.push(record);
  else results.noMatch.push(record);
}

// ---------------------------------------------------------------------------
// 5. Report
// ---------------------------------------------------------------------------
console.log(`\nResults (broad cross-repo search):`);
console.log(`  Exact match in a source repo (directly snippable): ${results.exact.length}`);
console.log(`  Partial match (source likely drifted, needs review): ${results.partial.length}`);
console.log(`  No match found:                                     ${results.noMatch.length}`);
console.log(`  Skipped (too short / no distinctive line):          ${results.skipped.length}`);

const allRecords = [...results.exact, ...results.partial, ...results.noMatch, ...results.skipped];
const linked = allRecords.filter((r) => r.linkVerification);
const linkedByStatus = (status) => linked.filter((r) => r.linkVerification.status === status);
const linkedExact = linkedByStatus("exact");
const linkedPartial = linkedByStatus("partial");
const linkedMismatch = linkedByStatus("mismatch");
const linkedNotFound = linkedByStatus("file-not-found");
const linkedRepoNotCloned = linkedByStatus("repo-not-cloned");
const linkedNeedsReview = [...linkedPartial, ...linkedMismatch, ...linkedNotFound, ...linkedRepoNotCloned];

console.log(`\nResults (ViewSourceCodeNotice link verification):`);
console.log(`  Hardcoded blocks with a source link:      ${linked.length}`);
console.log(`  Link target contains the snippet exactly: ${linkedExact.length}`);
console.log(`  Link target partially matches (drifted):  ${linkedPartial.length}`);
console.log(`  Link target exists but doesn't match:     ${linkedMismatch.length}`);
console.log(`  Link target file not found:               ${linkedNotFound.length}`);
console.log(`  Link's repo could not be cloned:          ${linkedRepoNotCloned.length}`);

function formatLinkCell(r) {
  const lv = r.linkVerification;
  if (!lv) return "—";
  if (lv.status === "exact") return "exact";
  if (lv.status === "partial") return `partial (${lv.matchRatio}%)`;
  if (lv.status === "mismatch") return `mismatch (${lv.matchRatio}%)`;
  if (lv.status === "file-not-found") return "file not found";
  if (lv.status === "repo-not-cloned") return "repo not cloned";
  return "—";
}

const reportPath = join(PROJECT_ROOT, "SNIPPABLE_CANDIDATES.md");
const lines = [
  "# Hardcoded Snippets That Could Be Converted to SnipSync",
  "",
  "Generated by `scripts/find-snippable-hardcoded.mjs`. Run to update.",
  "",
  `Checked ${hardcodedSnippets.length} hardcoded code blocks (SDK source languages only) against the public repos in \`snipsync.config.yaml\`, and verified any \`ViewSourceCodeNotice\` link found immediately above a block.`,
  "",
  "## Broad cross-repo search",
  "",
  `- **Exact match** (${results.exact.length}): identical code already exists in a source repo — wrap it with \`@@@SNIPSTART\`/\`@@@SNIPEND\` there and replace the doc's fenced block with \`<!--SNIPSTART-->\`/\`<!--SNIPEND-->\`.`,
  `- **Partial match** (${results.partial.length}, ≥60% of lines matched contiguously): related code exists but has likely drifted from the doc — needs a human look before snipping.`,
  `- **No match** (${results.noMatch.length}): no matching source found in the configured repos (may be doc-only pseudocode, or come from a repo not yet in snipsync.config.yaml).`,
  `- **Skipped** (${results.skipped.length}): too short (<${MIN_LINES_TO_CHECK} non-blank lines) or had no distinctive line to search on.`,
  "",
  "The `Link` column below reports on the `ViewSourceCodeNotice` link above the block, if any (independent of the search above): whether the file it points at still contains this exact snippet.",
  "",
  "## Exact matches",
  "",
  "| Doc | Lines | Lang | Source repo | Source file | Source lines | Link |",
  "|-----|-------|------|-------------|--------------|---------------|------|",
  ...results.exact.map(
    (r) =>
      `| \`${r.file}\` | ${r.startLine}-${r.endLine} | ${r.lang} | ${r.sourceRepo} | \`${r.sourceFile}\` | ${r.sourceStartLine}-${r.sourceEndLine} | ${formatLinkCell(r)} |`
  ),
  "",
  "## Partial matches (review before snipping)",
  "",
  "| Doc | Lines | Lang | Match % | Source repo | Source file | Source lines | Link |",
  "|-----|-------|------|---------|-------------|--------------|---------------|------|",
  ...results.partial.map(
    (r) =>
      `| \`${r.file}\` | ${r.startLine}-${r.endLine} | ${r.lang} | ${r.matchRatio}% | ${r.sourceRepo} | \`${r.sourceFile}\` | ${r.sourceStartLine}-${r.sourceEndLine} | ${formatLinkCell(r)} |`
  ),
  "",
  "## ViewSourceCodeNotice link verification",
  "",
  `Checked ${linked.length} hardcoded blocks that have a \`ViewSourceCodeNotice\` link immediately above them (regardless of which bucket they landed in above).`,
  "",
  `- **Verified exact** (${linkedExact.length}): the linked file still contains this exact snippet.`,
  `- **Needs review** (${linkedNeedsReview.length}): the link is stale, drifted, broken, or points at a repo that couldn't be cloned.`,
  "",
  "### Links that need review",
  "",
  "| Doc | Lines | Lang | Link href | Status | Target |",
  "|-----|-------|------|-----------|--------|--------|",
  ...linkedNeedsReview.map(
    (r) =>
      `| \`${r.file}\` | ${r.startLine}-${r.endLine} | ${r.lang} | ${r.linkVerification.href} | ${formatLinkCell(r)} | ${
        r.linkVerification.targetPath ? `\`${r.linkVerification.targetPath}\`` : "—"
      } |`
  ),
];
writeFileSync(reportPath, lines.join("\n") + "\n", "utf8");
console.log(`\nWritten: ${relative(PROJECT_ROOT, reportPath)}`);

if (JSON_OUT) {
  writeFileSync(JSON_OUT, JSON.stringify(results, null, 2), "utf8");
  console.log(`Written: ${JSON_OUT}`);
}
