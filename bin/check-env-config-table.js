#!/usr/bin/env node
/**
 * Checks the client environment configuration reference against the
 * implementations that actually read those variables.
 *
 * Each SDK implements environment variable loading independently, as does the
 * CLI, and nothing publishes a machine-readable list. So this script extracts the
 * variable names from each implementation's source and compares them against the
 * page, both the set of variables and which clients the page says read each one.
 *
 * The implementations are the authority here. temporalio/proposals has a design
 * document (all-sdk/external-client-configuration.md) that describes an intended
 * naming rule, but it is a proposal: it does not always match what shipped, and
 * it should not be used to justify documented behavior.
 *
 * It reports drift; it does not rewrite the page. Descriptions and wording stay
 * hand-maintained.
 *
 * Usage:
 *   node bin/check-env-config-table.js            # fetch sources from GitHub
 *   node bin/check-env-config-table.js --json     # machine-readable output
 *
 * Exit codes: 0 no drift, 1 drift found, 2 could not run (network, parse).
 */

const fs = require("fs");
const path = require("path");

const DOCS_PAGE = path.join(
  __dirname,
  "..",
  "docs",
  "references",
  "client-environment-configuration.mdx"
);

// Every client that reads environment variables.
const ALL_CLIENTS = ["Go", "Java", "Python", "TypeScript", ".NET", "Ruby", "CLI"];

// The page carries no copy of the support matrix for this script to drift from.
// Which clients read a variable is read back off the page itself: every variable
// gets its own heading and states its support in a "Read by:" line. A heading
// without one stops the check rather than passing quietly.
//
// Tokens accepted in a "Read by:" line, mapped to the labels sources use.
const CLIENT_TOKENS = new Map([
  ...ALL_CLIENTS.map((c) => [c.toLowerCase(), c]),
  ["temporal cli", "CLI"],
  ["cli", "CLI"],
  ["dotnet", ".NET"],
]);

// Implementations that read environment variables directly. `label` is the client
// name the page uses.
//
// Python, .NET, and Ruby do not implement env var loading themselves. They call
// into Rust core through their bridges, so they inherit core's set:
//   sdk-python  temporalio/envconfig.py      -> temporalio.bridge...envconfig
//   sdk-dotnet  ClientEnvConfig.cs           -> Bridge.EnvConfig
//   sdk-ruby    lib/temporalio/env_config.rb -> Internal::Bridge::EnvConfig
// Go, Java, TypeScript, and the CLI each read variables directly, so they are
// listed as their own sources instead. TypeScript in particular reads process.env
// in packages/envconfig/src/envconfig-toml.ts rather than going through core, so
// it must not inherit core's set.
const SOURCES = [
  {
    label: "Go",
    repo: "temporalio/sdk-go",
    ref: "main",
    files: ["contrib/envconfig/client_config_load.go"],
  },
  {
    label: "Core",
    repo: "temporalio/sdk-rust",
    ref: "main",
    files: ["crates/common/src/envconfig.rs"],
  },
  {
    label: "TypeScript",
    repo: "temporalio/sdk-typescript",
    ref: "main",
    files: ["packages/envconfig/src/envconfig-toml.ts"],
  },
  {
    label: "Java",
    repo: "temporalio/sdk-java",
    ref: "main",
    files: [
      "temporal-envconfig/src/main/java/io/temporal/envconfig/ClientConfigProfile.java",
      "temporal-envconfig/src/main/java/io/temporal/envconfig/ClientConfig.java",
      "temporal-envconfig/src/main/java/io/temporal/envconfig/LoadClientConfigProfileOptions.java",
    ],
  },
  {
    label: "CLI",
    repo: "temporalio/cli",
    ref: "main",
    // option-sets.yaml carries implied-env mappings; client.go reads the legacy
    // TLS variables that have no flag of their own.
    files: ["cliext/option-sets.yaml", "cliext/client.go"],
  },
];

const DELEGATES_TO_CORE = ["Python", ".NET", "Ruby"];

// Variables that appear in source as a prefix scan rather than a fixed name.
// TEMPORAL_GRPC_META_<name> is matched by prefix, so extraction sees the stem.
const PREFIX_VARS = { TEMPORAL_GRPC_META_: "TEMPORAL_GRPC_META_*" };

// Test fixtures and doc comments mention variables that are not read. Extraction
// is deliberately broad, so drop names that are only ever examples.
const NOT_A_REAL_VARIABLE = /^TEMPORAL_GRPC_META_SOME/;

function extractVariables(text) {
  const found = new Set();
  for (const match of text.matchAll(/TEMPORAL_[A-Z0-9_]+/g)) {
    let name = match[0];
    if (NOT_A_REAL_VARIABLE.test(name)) continue;
    if (PREFIX_VARS[name]) name = PREFIX_VARS[name];
    found.add(name);
  }
  return found;
}

async function fetchSource({ repo, ref, files }) {
  const texts = [];
  for (const file of files) {
    const url = `https://raw.githubusercontent.com/${repo}/${ref}/${file}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`${url} returned ${res.status}`);
    }
    texts.push(await res.text());
  }
  return texts.join("\n");
}

/**
 * Reads the documented variables off the page. Each variable has its own heading
 * followed by a "Read by:" line. Returns a Map of variable name to the Set of
 * clients the page says read it.
 */
function parseDocsPage(mdx) {
  const lines = mdx.split("\n");
  const documented = new Map();
  const problems = [];
  // The heading of the variable currently being read, awaiting its "Read by:".
  let pending = null;

  const closePending = () => {
    if (pending && !documented.has(pending)) {
      problems.push(`${pending} has its own heading but no "Read by:" line`);
    }
    pending = null;
  };

  for (const line of lines) {
    const heading = line.match(/^#{2,}\s+(.*?)\s*$/);
    if (heading) {
      closePending();
      const name = heading[1].match(/^`(TEMPORAL_[A-Z0-9_*]+)`$/);
      if (name) pending = name[1];
      continue;
    }

    const readBy = pending && line.match(/^-\s+Read by:\s*(.+?)\s*$/);
    if (readBy) {
      const clients = parseReadBy(readBy[1]);
      if (!clients) {
        problems.push(`${pending} has an unrecognized "Read by:" value: ${readBy[1]}`);
      } else {
        documented.set(pending, clients);
      }
      // The block is satisfied either way; the next heading starts a new one.
      pending = null;
      continue;
    }

    // Every variable belongs under its own heading. A variable reintroduced as a
    // table row would carry no "Read by:" line, so reject the row outright
    // rather than leave its support unchecked.
    if (line.trim().startsWith("|")) {
      const name = (line.split("|")[1] || "").replace(/`/g, "").trim();
      if (name.startsWith("TEMPORAL_")) {
        problems.push(`${name} is a table row; it needs its own heading and a "Read by:" line`);
      }
    }
  }
  closePending();

  if (documented.size === 0) {
    problems.push("found no documented variables at all; the page layout changed");
  }
  return { documented, problems };
}

/**
 * Reads a "Read by:" value into a set of clients. Accepts "every client",
 * "every client except A, B", "none", or an explicit list.
 */
function parseReadBy(value) {
  const text = value.replace(/`/g, "").trim();
  const toClients = (list) => {
    const clients = list
      .split(/,|\band\b/)
      .map((s) => s.trim().toLowerCase().replace(/^the\s+/, "").replace(/\s+sdk$/, ""))
      .filter(Boolean)
      .map((s) => CLIENT_TOKENS.get(s));
    return clients.some((c) => !c) ? null : clients;
  };

  const except = text.match(/^every client except\s+(.+)$/i);
  if (except) {
    const excluded = toClients(except[1]);
    if (!excluded) return null;
    return new Set(ALL_CLIENTS.filter((c) => !excluded.includes(c)));
  }
  if (/^every client$/i.test(text)) return new Set(ALL_CLIENTS);

  const listed = toClients(text.replace(/\s+only$/i, ""));
  return listed ? new Set(listed) : null;
}

/** Expands source labels into the client names the page uses. */
function expandSupport(labels) {
  const expanded = new Set();
  for (const label of labels) {
    if (label === "Core") {
      for (const sdk of DELEGATES_TO_CORE) expanded.add(sdk);
    } else {
      expanded.add(label);
    }
  }
  return expanded;
}

function setDiff(a, b) {
  return [...a].filter((x) => !b.has(x)).sort();
}

async function main() {
  const asJson = process.argv.includes("--json");

  if (!fs.existsSync(DOCS_PAGE)) {
    console.error(`[env-config-check] docs page not found: ${DOCS_PAGE}`);
    process.exit(2);
  }

  // variable name -> Set of source labels that read it
  const supportBySource = new Map();
  for (const source of SOURCES) {
    let text;
    try {
      text = await fetchSource(source);
    } catch (err) {
      console.error(
        `[env-config-check] could not read ${source.repo}: ${err.message}`
      );
      process.exit(2);
    }
    for (const name of extractVariables(text)) {
      if (!supportBySource.has(name)) supportBySource.set(name, new Set());
      supportBySource.get(name).add(source.label);
    }
  }

  // --dump prints what the sources say, for building or auditing the table by hand.
  if (process.argv.includes("--dump")) {
    for (const name of [...supportBySource.keys()].sort()) {
      const where = [...expandSupport(supportBySource.get(name))].sort().join(", ");
      console.log(`${name}\t${where}`);
    }
    process.exit(0);
  }

  const mdx = fs.readFileSync(DOCS_PAGE, "utf-8");
  const { documented: docsSupport, problems } = parseDocsPage(mdx);
  if (problems.length) {
    console.error("[env-config-check] could not read support off the page:");
    for (const problem of problems) console.error(`  ${problem}`);
    process.exit(2);
  }

  const sourceVars = new Set(supportBySource.keys());
  const docsVars = new Set(docsSupport.keys());

  const missingFromDocs = setDiff(sourceVars, docsVars);
  const missingFromSources = setDiff(docsVars, sourceVars);

  const supportMismatches = [];
  for (const [name, documented] of docsSupport) {
    if (!supportBySource.has(name)) continue;
    const actual = expandSupport(supportBySource.get(name));
    const unexpected = setDiff(documented, actual);
    const unlisted = setDiff(actual, documented);
    if (unexpected.length || unlisted.length) {
      supportMismatches.push({ variable: name, unlisted, unexpected });
    }
  }

  const result = {
    missingFromDocs,
    missingFromSources,
    supportMismatches,
    checked: {
      variablesInSources: sourceVars.size,
      variablesInDocs: docsVars.size,
      sources: SOURCES.map((s) => `${s.repo}@${s.ref}`),
    },
  };

  if (asJson) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    report(result, supportBySource);
  }

  const drifted =
    missingFromDocs.length || missingFromSources.length || supportMismatches.length;
  process.exit(drifted ? 1 : 0);
}

function report({ missingFromDocs, missingFromSources, supportMismatches, checked }, supportBySource) {
  console.log(
    `[env-config-check] ${checked.variablesInSources} variables across ${checked.sources.length} sources, ${checked.variablesInDocs} documented on the page\n`
  );

  if (missingFromDocs.length) {
    console.log("Read by an implementation but absent from the page:");
    for (const name of missingFromDocs) {
      const where = [...expandSupport(supportBySource.get(name))].sort().join(", ");
      console.log(`  ${name}  (${where})`);
    }
    console.log("");
  }

  if (missingFromSources.length) {
    console.log("On the page but read by no implementation:");
    for (const name of missingFromSources) console.log(`  ${name}`);
    console.log("");
  }

  if (supportMismatches.length) {
    console.log("The page and the sources disagree about which clients read a variable:");
    for (const { variable, unlisted, unexpected } of supportMismatches) {
      const parts = [];
      if (unlisted.length) parts.push(`${unlisted.join(", ")} now reads it`);
      if (unexpected.length) parts.push(`${unexpected.join(", ")} no longer reads it`);
      console.log(`  ${variable}: ${parts.join("; ")}`);
    }
    console.log("");
  }

  if (!missingFromDocs.length && !missingFromSources.length && !supportMismatches.length) {
    console.log("[env-config-check] OK: the page matches every implementation.");
  }
}

main();
