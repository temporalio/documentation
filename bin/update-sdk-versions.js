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

  if (process.argv.includes("--write")) {
    fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2) + "\n");
    console.error(`Wrote ${OUT_PATH}`);
  } else {
    console.log(JSON.stringify(output, null, 2));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
