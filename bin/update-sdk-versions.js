#!/usr/bin/env node

// Fetches the latest published version of each Temporal SDK from its package
// registry and writes src/data/sdk-versions.json. Powers the version chips on
// the /develop overview page (src/components/elements/Sdk/SdkOverviewCards).
//
// Each SDK's registry is queried independently: one registry being down,
// renamed, or rate-limiting doesn't block updating the other seven. A failed
// fetch keeps the previously recorded version rather than clearing it. The
// file is only rewritten when a version actually changed, so a scheduled run
// that finds nothing new produces no diff (and no PR).
//
//   node bin/update-sdk-versions.js           # report to stdout
//   node bin/update-sdk-versions.js --write   # write src/data/sdk-versions.json
//   node bin/update-sdk-versions.js --write --pr-dir <dir>
//       # also write <dir>/title.txt and <dir>/body.md naming each version
//       # change, for the pull request the workflow opens. Written only when a
//       # version changed.

const https = require("https");
const fs = require("fs");
const path = require("path");

const OUT_PATH = path.join(__dirname, "..", "src", "data", "sdk-versions.json");
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

// The patch component is optional because the PHP SDK sometimes tags a stable
// release as "vX.Y" with no patch number (e.g. v2.18, v2.19).
const STABLE_SEMVER = /^v?\d+\.\d+(\.\d+)?$/;

// Display label and GitHub release tag prefix per SDK, for the pull request
// text. Labels match src/constants/sdks.js. Tag prefixes match each repo's
// release tags: .NET and Python tag "1.2.3", the others "v1.2.3".
const SDK_INFO = {
  go: { label: "Go", tagPrefix: "v" },
  java: { label: "Java", tagPrefix: "v" },
  dotnet: { label: ".NET", tagPrefix: "" },
  php: { label: "PHP", tagPrefix: "v" },
  python: { label: "Python", tagPrefix: "" },
  ruby: { label: "Ruby", tagPrefix: "v" },
  rust: { label: "Rust", tagPrefix: "v" },
  typescript: { label: "TypeScript", tagPrefix: "v" },
};

// GitHub caps pull request titles at 256 characters, but a long title is hard
// to scan in the PR list. Past this length the title names a count instead.
const MAX_TITLE_LENGTH = 100;

// Builds the pull request title and body from the version changes. `changes`
// is [{ id, from, to }], where `from` is undefined for a newly added SDK.
function buildPrText(changes, failures) {
  const label = (id) => (SDK_INFO[id] ? SDK_INFO[id].label : id);

  let title;
  if (changes.length === 1) {
    const { id, from, to } = changes[0];
    title = from
      ? `Update ${label(id)} SDK version chip: ${from} → ${to}`
      : `Add ${label(id)} SDK version chip: ${to}`;
  } else {
    title = `Update SDK version chips: ${changes.map((c) => `${label(c.id)} ${c.to}`).join(", ")}`;
    if (title.length > MAX_TITLE_LENGTH) {
      title = `Update SDK version chips for ${changes.length} SDKs`;
    }
  }

  const rows = changes.map(({ id, from, to }) => {
    const info = SDK_INFO[id];
    const tag = info ? `${info.tagPrefix}${to}` : null;
    const notes = tag ? `[${tag}](https://github.com/temporalio/sdk-${id}/releases/tag/${tag})` : "";
    return `| ${label(id)} | ${from || "(none)"} | ${to} | ${notes} |`;
  });

  const lines = [
    "Automated update of the latest SDK versions shown on /develop (`src/data/sdk-versions.json`), sourced from each SDK's package registry.",
    "",
    "| SDK | Previous | New | Release notes |",
    "| --- | --- | --- | --- |",
    ...rows,
  ];
  if (failures.length > 0) {
    lines.push(
      "",
      `Registry fetch failed for ${failures.length} SDK(s) on this run, so their previous versions were kept:`,
      "",
      ...failures.map((f) => `- ${f}`)
    );
  }

  return { title, body: lines.join("\n") + "\n" };
}

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

async function main() {
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

  // Only bump the timestamp when a version actually changed, so a no-op run
  // (the common case) produces a byte-identical file and no git diff.
  const changed = JSON.stringify(versions) !== JSON.stringify(previousVersions);
  const output = {
    updatedAt: changed ? new Date().toISOString() : existing.updatedAt,
    versions,
  };

  const changes = Object.keys(versions)
    .filter((id) => versions[id] !== previousVersions[id])
    .map((id) => ({ id, from: previousVersions[id], to: versions[id] }));
  for (const { id, from, to } of changes) {
    console.error(`${id}: ${from || "(none)"} -> ${to}`);
  }

  if (process.argv.includes("--write")) {
    fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2) + "\n");
    console.error(`Wrote ${OUT_PATH}`);
  } else {
    console.log(JSON.stringify(output, null, 2));
  }

  const prDirIndex = process.argv.indexOf("--pr-dir");
  if (prDirIndex !== -1 && changes.length > 0) {
    const prDir = process.argv[prDirIndex + 1];
    if (!prDir) throw new Error("--pr-dir needs a directory");
    const { title, body } = buildPrText(changes, failures);
    fs.mkdirSync(prDir, { recursive: true });
    fs.writeFileSync(path.join(prDir, "title.txt"), title + "\n");
    fs.writeFileSync(path.join(prDir, "body.md"), body);
    console.error(`Wrote pull request text to ${prDir}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
