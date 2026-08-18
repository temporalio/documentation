#!/usr/bin/env node

// Fetches the latest published version of each Temporal SDK from its package
// registry and writes src/data/sdk-versions.json. Powers the version chips on
// the /develop overview page (src/components/elements/Sdk/SdkOverviewCards).
//
// Also keeps a short whitelist of hardcoded "install this version" code
// samples (VERSION_ANCHORS below) in sync, and flags — without editing —
// pages that name a specific SDK version for a different reason, such as
// "requires 1.28.0 or later" (REVIEW_PAGES below). Those are facts about when
// a feature shipped, not something that should track "latest", so a human
// decides whether they still need a look.
//
// Each SDK's registry is queried independently: one registry being down,
// renamed, or rate-limiting doesn't block updating the other seven. A failed
// fetch keeps the previously recorded version rather than clearing it. The
// files are only rewritten when a version actually changed, so a scheduled
// run that finds nothing new produces no diff (and no PR).
//
//   node bin/update-sdk-versions.js           # report to stdout, touch nothing
//   node bin/update-sdk-versions.js --write   # write sdk-versions.json + anchors

const https = require("https");
const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.join(__dirname, "..");
const OUT_PATH = path.join(REPO_ROOT, "src", "data", "sdk-versions.json");
const USER_AGENT = "temporal-docs-sdk-version-bot (+https://github.com/temporalio/documentation)";

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": USER_AGENT, Accept: "application/json" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          fetchText(res.headers.location).then(resolve, reject);
          return;
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            return;
          }
          resolve(data);
        });
      })
      .on("error", reject);
  });
}

async function fetchJSON(url) {
  return JSON.parse(await fetchText(url));
}

// Strips a leading "v" so chips read e.g. "1.31.0" consistently — Go and PHP
// tag releases as "v1.2.3"; the other registries don't.
function stripV(version) {
  return version.replace(/^v/, "");
}

const STABLE_SEMVER = /^v?\d+\.\d+\.\d+$/;

// One fetcher per SDK in src/constants/sdks.js. Keep the id keys in sync with
// that file's SDKS[].id.
const FETCHERS = {
  async go() {
    const data = await fetchJSON("https://proxy.golang.org/github.com/temporalio/sdk-go/@latest");
    return stripV(data.Version);
  },
  async java() {
    const xml = await fetchText(
      "https://repo1.maven.org/maven2/io/temporal/temporal-sdk/maven-metadata.xml"
    );
    const match = xml.match(/<release>([^<]+)<\/release>/);
    if (!match) throw new Error("no <release> in maven-metadata.xml");
    return match[1];
  },
  async dotnet() {
    const data = await fetchJSON("https://api.nuget.org/v3-flatcontainer/temporalio/index.json");
    const stable = data.versions.filter((v) => STABLE_SEMVER.test(v));
    if (stable.length === 0) throw new Error("no stable NuGet version found");
    return stable[stable.length - 1];
  },
  async php() {
    const data = await fetchJSON("https://repo.packagist.org/p2/temporal/sdk.json");
    const versions = data.packages["temporal/sdk"];
    const stable = versions.find((v) => STABLE_SEMVER.test(v.version));
    if (!stable) throw new Error("no stable Packagist version found");
    return stripV(stable.version);
  },
  async python() {
    const data = await fetchJSON("https://pypi.org/pypi/temporalio/json");
    return data.info.version;
  },
  async ruby() {
    const data = await fetchJSON("https://rubygems.org/api/v1/gems/temporalio.json");
    return data.version;
  },
  async rust() {
    const data = await fetchJSON("https://crates.io/api/v1/crates/temporalio-sdk");
    const version = data.crate.max_stable_version || data.crate.newest_version;
    if (!version) throw new Error("no version in crates.io response");
    return version;
  },
  async typescript() {
    const data = await fetchJSON("https://registry.npmjs.org/@temporalio/client/latest");
    return data.version;
  },
};

// ---------------------------------------------------------------------------
// VERSION_ANCHORS — hardcoded "install this version" code samples.
//
// These are hand-authored dependency-manifest snippets (pom.xml, build.gradle,
// composer.json, Cargo.toml) or illustrative install output, not Snipsync
// content, so editing them here is safe. Each anchor's regex has two capture
// groups (text immediately before/after the version number) so the
// replacement only ever touches the number itself.
// ---------------------------------------------------------------------------

const VERSION_NUM = "\\d+\\.\\d+(?:\\.\\d+)?";

const VERSION_ANCHORS = [
  // Java — pom.xml + build.gradle snippets
  {
    sdk: "java",
    file: "docs/develop/java/set-up.mdx",
    regex: new RegExp(`(<artifactId>temporal-sdk</artifactId>\\s*\\n\\s*<version>)${VERSION_NUM}(</version>)`, "g"),
  },
  {
    sdk: "java",
    file: "docs/develop/java/set-up.mdx",
    regex: new RegExp(`(<artifactId>temporal-testing</artifactId>\\s*\\n\\s*<version>)${VERSION_NUM}(</version>)`, "g"),
  },
  {
    sdk: "java",
    file: "docs/develop/java/set-up.mdx",
    regex: new RegExp(`(implementation 'io\\.temporal:temporal-sdk:)${VERSION_NUM}(')`, "g"),
  },
  {
    sdk: "java",
    file: "docs/develop/java/set-up.mdx",
    regex: new RegExp(`(testImplementation 'io\\.temporal:temporal-testing:)${VERSION_NUM}(')`, "g"),
  },
  {
    sdk: "java",
    file: "docs/develop/java/best-practices/testing-suite.mdx",
    regex: new RegExp(`(<artifactId>temporal-testing</artifactId>\\s*\\n\\s*<version>)${VERSION_NUM}(</version>)`, "g"),
  },
  {
    sdk: "java",
    file: "docs/develop/java/best-practices/testing-suite.mdx",
    regex: new RegExp(`(testImplementation\\s*\\(?"io\\.temporal:temporal-testing:)${VERSION_NUM}("\\)?)`, "g"),
  },
  // PHP — composer.json. Composer convention is a caret on major.minor, so
  // the fetched full version (e.g. 2.17.1) is trimmed to 2.17.
  {
    sdk: "php",
    file: "docs/develop/php/set-up.mdx",
    regex: new RegExp(`("temporal/sdk":\\s*"\\^)${VERSION_NUM}(")`, "g"),
    version: (v) => v.split(".").slice(0, 2).join("."),
  },
  // Rust — Cargo.toml snippets + a prose mention. All temporalio-* crates in
  // the workspace release in lockstep, so the single "rust" version applies
  // to each of them.
  {
    sdk: "rust",
    file: "docs/develop/rust/quickstart.mdx",
    regex: new RegExp(`(temporalio-(?:client|common|macros|sdk|sdk-core) = ")${VERSION_NUM}(")`, "g"),
  },
  {
    sdk: "rust",
    file: "docs/develop/rust/workers/worker-process.mdx",
    regex: new RegExp(`(temporalio-(?:client|common|macros|sdk|sdk-core|workflow) = ")${VERSION_NUM}(")`, "g"),
  },
  {
    sdk: "rust",
    file: "docs/develop/rust/workers/worker-process.mdx",
    regex: new RegExp(`(written against \`temporalio-sdk\` )${VERSION_NUM}()`, "g"),
  },
  // Ruby — illustrative `bundle add` output, not a real command.
  {
    sdk: "ruby",
    file: "docs/develop/ruby/set-up.mdx",
    regex: new RegExp(`(Installing temporalio )${VERSION_NUM}()`, "g"),
  },
];

/**
 * Apply every anchor targeting one file to that file's content. Pure string
 * transform (no fs) so it's testable without touching real docs files.
 * @returns {{content: string, changed: boolean}}
 */
function applyAnchorsToContent(content, anchors, versions) {
  let next = content;
  let changed = false;
  for (const anchor of anchors) {
    const raw = versions[anchor.sdk];
    if (!raw) continue;
    const newVersion = anchor.version ? anchor.version(raw) : raw;
    const replaced = next.replace(anchor.regex, (_match, prefix, suffix) => `${prefix}${newVersion}${suffix ?? ""}`);
    if (replaced !== next) {
      next = replaced;
      changed = true;
    }
  }
  return { content: next, changed };
}

/**
 * Group VERSION_ANCHORS by file and rewrite each one in place.
 * @returns {string[]} relative paths of files actually changed
 */
function applyVersionAnchors(versions, { warnings } = {}) {
  const byFile = new Map();
  for (const anchor of VERSION_ANCHORS) {
    byFile.set(anchor.file, [...(byFile.get(anchor.file) || []), anchor]);
  }

  const changedFiles = [];
  for (const [relFile, anchors] of byFile) {
    const fullPath = path.join(REPO_ROOT, relFile);
    if (!fs.existsSync(fullPath)) {
      if (warnings) warnings.push(`version anchor target not found: ${relFile}`);
      continue;
    }
    const content = fs.readFileSync(fullPath, "utf8");
    const result = applyAnchorsToContent(content, anchors, versions);
    if (result.changed) {
      fs.writeFileSync(fullPath, result.content);
      changedFiles.push(relFile);
    }
  }
  return changedFiles;
}

// ---------------------------------------------------------------------------
// REVIEW_PAGES — pages that name a specific SDK version for a reason other
// than "install the latest" (e.g. "requires 1.28.0 or later", or a minimum
// version table). These encode when a feature shipped, so they must NOT be
// auto-edited to "latest" — that would just make them wrong. Instead, when
// that SDK's version changes, they're listed for a human to glance at.
// ---------------------------------------------------------------------------

const REVIEW_PAGES = {
  go: ["docs/production-deployment/worker-deployments/worker-versioning.mdx"],
  java: ["docs/production-deployment/worker-deployments/worker-versioning.mdx"],
  dotnet: ["docs/production-deployment/worker-deployments/worker-versioning.mdx"],
  ruby: ["docs/production-deployment/worker-deployments/worker-versioning.mdx"],
  typescript: ["docs/production-deployment/worker-deployments/worker-versioning.mdx"],
  python: [
    "docs/production-deployment/worker-deployments/worker-versioning.mdx",
    "docs/production-deployment/worker-deployments/serverless-workers/cloud-run/index.mdx",
    "docs/develop/python/integrations/strands-agents.mdx",
    "docs/develop/python/integrations/langgraph.mdx",
    "docs/develop/python/integrations/langsmith.mdx",
    "docs/develop/python/integrations/google-adk.mdx",
    "docs/develop/python/integrations/google-genai.mdx",
    "docs/guides/durable-gaming-sessions.mdx",
    "docs/guides/entity-pattern-loyalty-points.mdx",
    "docs/guides/reliable-document-approvals.mdx",
  ],
};

/**
 * @param {string[]} changedIds - SDK ids whose version changed this run
 * @returns {string} Markdown block for the PR body, or "" if nothing to flag
 */
function buildReviewNotes(changedIds, versions, previousVersions) {
  const sections = [];
  for (const id of changedIds) {
    const pages = REVIEW_PAGES[id];
    if (!pages || pages.length === 0) continue;
    const from = previousVersions[id] ? `${previousVersions[id]} → ` : "";
    sections.push(`- **${id}** ${from}${versions[id]}\n${pages.map((p) => `  - ${p}`).join("\n")}`);
  }
  if (sections.length === 0) return "";
  return [
    "### SDK version changed — pages that name a specific version, worth a look (not auto-edited)",
    "",
    ...sections,
  ].join("\n");
}

async function main() {
  const write = process.argv.includes("--write");

  const existing = fs.existsSync(OUT_PATH)
    ? JSON.parse(fs.readFileSync(OUT_PATH, "utf-8"))
    : { updatedAt: null, versions: {} };
  const previousVersions = existing.versions || {};

  const versions = { ...previousVersions };
  const failures = [];

  for (const [id, fetchVersion] of Object.entries(FETCHERS)) {
    try {
      versions[id] = await fetchVersion();
    } catch (err) {
      failures.push(`${id}: ${err.message}`);
    }
  }

  if (failures.length > 0) {
    console.error(
      `Kept previous version for ${failures.length} SDK(s) after a fetch error:\n  ${failures.join("\n  ")}`
    );
  }
  if (failures.length === Object.keys(FETCHERS).length) {
    console.error("Every registry fetch failed — leaving sdk-versions.json unchanged.");
    process.exit(1);
  }

  const changedIds = Object.keys(versions).filter((id) => versions[id] !== previousVersions[id]);

  // Only bump the timestamp when a version actually changed, so a no-op run
  // (the common case) produces a byte-identical file and no git diff.
  const output = {
    updatedAt: changedIds.length > 0 ? new Date().toISOString() : existing.updatedAt,
    versions,
  };

  if (write) {
    fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2) + "\n");
    console.error(`Wrote ${OUT_PATH}`);

    const anchorWarnings = [];
    const changedFiles = applyVersionAnchors(versions, { warnings: anchorWarnings });
    anchorWarnings.forEach((w) => console.error(w));
    if (changedFiles.length > 0) {
      console.error(`Updated version anchors in:\n  ${changedFiles.join("\n  ")}`);
    }

    const notes = buildReviewNotes(changedIds, versions, previousVersions);
    if (notes) console.log(notes);
  } else {
    console.log(JSON.stringify(output, null, 2));
  }
}

module.exports = {
  FETCHERS,
  VERSION_ANCHORS,
  REVIEW_PAGES,
  applyAnchorsToContent,
  applyVersionAnchors,
  buildReviewNotes,
  stripV,
};

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
