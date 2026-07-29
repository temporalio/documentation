#!/usr/bin/env node
/**
 * Checks the environment variable table in the client environment configuration
 * reference against the implementations that actually read those variables.
 *
 * Each SDK implements environment variable loading independently, as does the
 * CLI, and nothing publishes a machine-readable list. So this script extracts the
 * variable names from each implementation's source and compares them against the
 * docs table.
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

// Every client the Supported by column can name. "All" expands to this set.
const ALL_CLIENTS = ["Go", "Java", "Python", "TypeScript", ".NET", "Ruby", "CLI"];

// The table says "Temporal CLI" for readability; sources label it "CLI".
const CLIENT_ALIASES = { "Temporal CLI": "CLI" };

// Implementations that read environment variables directly. `label` is the token
// expected in the docs "Supported by" column.
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
 * Reads the variable rows out of the docs table. Expects a Markdown table whose
 * first column is a backticked variable name and which has a "Supported by"
 * column. Returns a Map of variable name to the set of support tokens.
 */
function parseDocsTable(mdx) {
  const lines = mdx.split("\n");
  const rows = new Map();
  let tablesFound = 0;

  // The page has several tables (client settings, plus CLI-only groups). Every
  // table with these columns contributes rows.
  for (let i = 0; i < lines.length; i++) {
    if (!(lines[i].includes("| Variable") && /supported by/i.test(lines[i]))) continue;
    tablesFound++;

    const columns = lines[i].split("|").map((c) => c.trim().toLowerCase());
    const varCol = columns.findIndex((c) => c === "variable");
    const supportCol = columns.findIndex((c) => c === "supported by");

    for (let j = i + 2; j < lines.length; j++) {
      if (!lines[j].trim().startsWith("|")) break;
      const cells = lines[j].split("|").map((c) => c.trim());
      const name = (cells[varCol] || "").replace(/`/g, "").trim();
      if (!name.startsWith("TEMPORAL_")) continue;
      rows.set(name, parseSupportCell(cells[supportCol] || ""));
      i = j;
    }
  }

  if (tablesFound === 0) {
    return { rows: null, reason: 'no table with "Variable" and "Supported by" columns' };
  }
  return { rows };
}

/**
 * Reads a "Supported by" cell into a set of client names. Accepts an explicit
 * list ("Go, Java"), "All", or "All except Go, Java".
 */
function parseSupportCell(cell) {
  const text = cell.replace(/`/g, "").trim();
  if (!text) return new Set();

  const canonical = (s) => {
    const trimmed = s.trim();
    return CLIENT_ALIASES[trimmed] || trimmed;
  };

  const except = text.match(/^All\s+except\s+(.+)$/i);
  if (except) {
    const excluded = new Set(except[1].split(",").map(canonical));
    return new Set(ALL_CLIENTS.filter((c) => !excluded.has(c)));
  }
  if (/^All$/i.test(text)) return new Set(ALL_CLIENTS);

  return new Set(text.split(",").map(canonical).filter(Boolean));
}

/** Expands source labels into the SDK tokens the docs table uses. */
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
  const { rows, reason } = parseDocsTable(mdx);
  if (!rows) {
    console.error(`[env-config-check] could not parse the docs table: ${reason}`);
    process.exit(2);
  }

  const sourceVars = new Set(supportBySource.keys());
  const docsVars = new Set(rows.keys());

  const missingFromDocs = setDiff(sourceVars, docsVars);
  const missingFromSources = setDiff(docsVars, sourceVars);

  const supportMismatches = [];
  for (const [name, documented] of rows) {
    if (!supportBySource.has(name)) continue;
    const expected = expandSupport(supportBySource.get(name));
    // An empty or prose-only cell is treated as unverified rather than wrong.
    if (documented.size === 0) continue;
    const unexpected = setDiff(documented, expected);
    const unlisted = setDiff(expected, documented);
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
    `[env-config-check] ${checked.variablesInSources} variables across ${checked.sources.length} sources, ${checked.variablesInDocs} in the docs table\n`
  );

  if (missingFromDocs.length) {
    console.log("Read by an implementation but absent from the docs table:");
    for (const name of missingFromDocs) {
      const where = [...expandSupport(supportBySource.get(name))].sort().join(", ");
      console.log(`  ${name}  (${where})`);
    }
    console.log("");
  }

  if (missingFromSources.length) {
    console.log("In the docs table but read by no implementation:");
    for (const name of missingFromSources) console.log(`  ${name}`);
    console.log("");
  }

  if (supportMismatches.length) {
    console.log('"Supported by" disagrees with the sources:');
    for (const { variable, unlisted, unexpected } of supportMismatches) {
      const parts = [];
      if (unlisted.length) parts.push(`missing ${unlisted.join(", ")}`);
      if (unexpected.length) parts.push(`claims ${unexpected.join(", ")} but no source reads it`);
      console.log(`  ${variable}: ${parts.join("; ")}`);
    }
    console.log("");
  }

  if (!missingFromDocs.length && !missingFromSources.length && !supportMismatches.length) {
    console.log("[env-config-check] OK: docs table matches every implementation.");
  }
}

main();
