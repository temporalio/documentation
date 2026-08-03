#!/usr/bin/env node

// Compares the SDK metrics reference against the metric definitions in the
// SDK repositories, and reports where they disagree.
//
// This is the companion to bin/check-metrics-reference.js. That check only
// proves the page does not contradict itself; this one proves the page matches
// the SDKs. It is advisory rather than a merge gate, because extracting metric
// names from three languages is inherently approximate and the SDK default
// branches move ahead of released versions.
//
//   node bin/check-metrics-against-sdks.js                    # report
//   node bin/check-metrics-against-sdks.js --json             # machine-readable
//   node bin/check-metrics-against-sdks.js --update-baseline  # accept current gaps
//   node bin/check-metrics-against-sdks.js --cache-dir /tmp/sdks
//
// Exit codes: 0 clean, 2 drift found, 1 the comparison could not run at all,
// which is what happens when a definition file is renamed upstream.

const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { parseTable } = require('./check-metrics-reference.js');

const PAGE = path.join('docs', 'references', 'sdk-metrics.mdx');
const BASELINE = path.join('bin', 'metrics-baseline.json');

// Names are stored on the page without the temporal_ prefix that SDKs add on
// export, so everything is normalized to the bare name for comparison.
const PREFIX = 'temporal_';

const METRIC_NAME = /^[a-z][a-z0-9_]*$/;

// ---------------------------------------------------------------------------
// Extraction
// ---------------------------------------------------------------------------

// Rust keeps unit tests in the same file behind a #[cfg(test)] mod, and those
// register throwaway instruments named "ctr", "histo" and so on.
function stripRustTestModule(source) {
  const lines = source.split('\n');
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i] === '#[cfg(test)]' && /^mod \w+/.test(lines[i + 1])) {
      return lines.slice(0, i).join('\n');
    }
  }
  return source;
}

const RUST_CONST = /(?:const|static)\s+([A-Z][A-Z0-9_]*)\s*:\s*&(?:'static\s+)?str\s*=\s*"([a-z0-9_]+)"/g;
// Instruments are registered either as MetricParameters { name: <expr>.into() }
// or via a direct meter call such as meter.gauge_f64("...".into()).
const RUST_REGISTRATION = /(?:name:\s*|meter\.[a-z0-9_]+\(\s*)(?:"([a-z0-9_]+)"|([A-Z][A-Z0-9_]*))\s*\.into\(\)/g;

function extractRust(files) {
  const constants = new Map();
  const found = [];

  for (const { source } of files) {
    const body = stripRustTestModule(source);
    for (const m of body.matchAll(RUST_CONST)) {
      constants.set(m[1], m[2]);
    }
  }

  for (const { source } of files) {
    const body = stripRustTestModule(source);
    for (const m of body.matchAll(RUST_REGISTRATION)) {
      const name = m[1] ?? constants.get(m[2]);
      if (name && METRIC_NAME.test(name)) {
        found.push({ name, identifier: m[2] ?? null, annotations: [] });
      }
    }
  }
  return found;
}

// Metric names are always built from the prefix constant. A bare literal that
// happens to start with temporal_ is something else, such as the Go client tag
// value "temporal_go".
function referencesConstant(expression) {
  return /[A-Za-z_]/.test(expression.replace(/"[^"]*"/g, ''));
}

// Go and Java both build metric names by concatenating a prefix constant with
// a literal, sometimes chaining off another metric constant
// (TemporalRequestFailure = TemporalRequest + "_failure").
function resolveConcatenations(assignments) {
  const values = new Map();

  const resolve = (expr, depth = 0) => {
    if (depth > 10) return null;
    let out = '';
    for (const part of expr.split('+').map((p) => p.trim())) {
      const literal = part.match(/^"([^"]*)"$/);
      if (literal) {
        out += literal[1];
        continue;
      }
      if (values.has(part)) {
        out += values.get(part);
        continue;
      }
      const pending = assignments.find((a) => a.identifier === part);
      if (!pending) return null;
      const resolved = resolve(pending.expression, depth + 1);
      if (resolved === null) return null;
      values.set(part, resolved);
      out += resolved;
    }
    return out;
  };

  for (const assignment of assignments) {
    const value = resolve(assignment.expression);
    if (value !== null) values.set(assignment.identifier, value);
  }
  return values;
}

const GO_ASSIGNMENT = /^\s*([A-Z][A-Za-z0-9_]*)\s*=\s*(.+?)\s*(?:\/\/(.*))?$/;

function extractGo(files) {
  const assignments = [];

  for (const { source } of files) {
    // sdk-go marks deprecations with a trailing comment, but the Go convention
    // is a preceding one, so accept either.
    let preceding = '';
    for (const line of source.split('\n')) {
      const m = line.match(GO_ASSIGNMENT);
      if (!m || !m[2].includes('"')) {
        preceding = line.trim().startsWith('//') ? line : '';
        continue;
      }
      assignments.push({
        identifier: m[1],
        expression: m[2],
        annotations: /^\s*(?:\/\/\s*)?deprecated/i.test(m[3] ?? preceding.replace('//', '')) ? ['Deprecated'] : [],
      });
      preceding = '';
    }
  }

  const values = resolveConcatenations(assignments);
  return assignments
    .filter((a) => (values.get(a.identifier) ?? '').startsWith(PREFIX) && referencesConstant(a.expression))
    .map((a) => ({
      name: values.get(a.identifier).slice(PREFIX.length),
      identifier: a.identifier,
      annotations: a.annotations,
    }))
    .filter((m) => METRIC_NAME.test(m.name));
}

const JAVA_ASSIGNMENT = /((?:@\w+\s+)*)public static final String ([A-Z][A-Z0-9_]*)\s*=\s*([^;]+);/g;

function extractJava(files) {
  const assignments = [];

  for (const { source } of files) {
    // Comments can contain @Deprecated prose and stray semicolons.
    const body = source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
    for (const m of body.matchAll(JAVA_ASSIGNMENT)) {
      assignments.push({
        identifier: m[2],
        expression: m[3].replace(/\s+/g, ' ').trim(),
        annotations: [...m[1].matchAll(/@(\w+)/g)].map((a) => a[1]),
      });
    }
  }

  const values = resolveConcatenations(assignments);
  return assignments
    .filter((a) => (values.get(a.identifier) ?? '').startsWith(PREFIX) && referencesConstant(a.expression))
    .map((a) => ({
      name: values.get(a.identifier).slice(PREFIX.length),
      identifier: a.identifier,
      annotations: a.annotations,
    }))
    .filter((m) => METRIC_NAME.test(m.name));
}

// ---------------------------------------------------------------------------
// SDK configuration
// ---------------------------------------------------------------------------

// Definition files are listed explicitly rather than discovered. If one is
// renamed upstream the check fails loudly instead of quietly reporting that a
// whole SDK stopped emitting metrics.
const SDKS = [
  {
    name: 'Core',
    repo: 'temporalio/sdk-rust',
    files: [
      'crates/sdk-core/src/telemetry/metrics.rs',
      'crates/common/src/telemetry/metrics.rs',
      'crates/client/src/metrics.rs',
      'crates/sdk-core/src/worker/tuner/resource_based.rs',
    ],
    extract: extractRust,
    // Rust registers the instrument at the definition site, so appearing there
    // already means the metric is created.
    checkUsage: false,
  },
  {
    name: 'Go',
    repo: 'temporalio/sdk-go',
    files: ['internal/common/metrics/constants.go'],
    extract: extractGo,
    checkUsage: true,
    testPaths: [':(exclude)*_test.go'],
  },
  {
    name: 'Java',
    repo: 'temporalio/sdk-java',
    files: [
      'temporal-sdk/src/main/java/io/temporal/worker/MetricsType.java',
      'temporal-serviceclient/src/main/java/io/temporal/serviceclient/MetricsType.java',
    ],
    extract: extractJava,
    checkUsage: true,
    testPaths: [':(exclude)*/src/test/*', ':(exclude)*/src/testFixtures/*'],
  },
];

// ---------------------------------------------------------------------------
// Repository access
// ---------------------------------------------------------------------------

function ensureRepo(repo, dir) {
  if (fs.existsSync(path.join(dir, '.git'))) return dir;
  fs.mkdirSync(path.dirname(dir), { recursive: true });
  execFileSync('git', ['clone', '--depth', '1', '--quiet', `https://github.com/${repo}.git`, dir], {
    stdio: ['ignore', 'ignore', 'inherit'],
  });
  return dir;
}

function headSha(dir) {
  return execFileSync('git', ['-C', dir, 'rev-parse', '--short', 'HEAD'], {
    encoding: 'utf8',
  }).trim();
}

// A constant declared in the metrics file but referenced nowhere else is not
// actually emitted. sdk-go declares WorkflowActiveThreadCount and never uses
// it, and trusting the declaration would wrongly credit Go with that metric.
function findUnusedIdentifiers(dir, identifiers, definitionFiles, testPaths) {
  if (identifiers.length === 0) return new Set();

  const pathspec = ['.', ...definitionFiles.map((f) => `:(exclude)${f}`), ...testPaths];

  let output = '';
  try {
    output = execFileSync(
      'git',
      ['-C', dir, 'grep', '--no-color', '-how', '-E', identifiers.join('|'), '--', ...pathspec],
      { encoding: 'utf8', maxBuffer: 1024 * 1024 * 64 }
    );
  } catch (error) {
    // git grep exits 1 when nothing matches, which is a valid result.
    if (error.status !== 1) throw error;
  }

  const used = new Set(output.split('\n').filter(Boolean));
  return new Set(identifiers.filter((id) => !used.has(id)));
}

function collectSdk(sdk, cacheDir) {
  const dir = ensureRepo(sdk.repo, path.join(cacheDir, path.basename(sdk.repo)));

  const files = sdk.files.map((file) => {
    const full = path.join(dir, file);
    if (!fs.existsSync(full)) {
      throw new Error(
        `${sdk.repo}: definition file not found: ${file}\n` +
          'It was probably renamed upstream. Update SDKS in this script.'
      );
    }
    return { file, source: fs.readFileSync(full, 'utf8') };
  });

  let metrics = sdk.extract(files);
  let unused = [];

  if (sdk.checkUsage) {
    const identifiers = [...new Set(metrics.map((m) => m.identifier).filter(Boolean))];
    const dead = findUnusedIdentifiers(dir, identifiers, sdk.files, sdk.testPaths);
    unused = metrics.filter((m) => dead.has(m.identifier)).map((m) => ({ name: m.name, identifier: m.identifier }));
    metrics = metrics.filter((m) => !dead.has(m.identifier));
  }

  const byName = new Map();
  for (const metric of metrics) {
    byName.set(metric.name, metric);
  }

  return { name: sdk.name, repo: sdk.repo, sha: headSha(dir), metrics: byName, unused };
}

// ---------------------------------------------------------------------------
// Comparison
// ---------------------------------------------------------------------------

function compare(rows, sdks) {
  const documented = new Map(rows.map((r) => [r.name, r]));
  const everyName = new Set(sdks.flatMap((s) => [...s.metrics.keys()]));

  const unknown = [];
  const mismatched = [];
  const undocumented = [];

  for (const [name, row] of documented) {
    const actual = sdks.filter((s) => s.metrics.has(name)).map((s) => s.name);

    if (actual.length === 0) {
      unknown.push({ name, documented: row.availability });
      continue;
    }
    const expected = actual.join(', ');
    if (expected !== row.availability) {
      mismatched.push({ name, documented: row.availability, actual: expected });
    }
  }

  for (const name of [...everyName].sort()) {
    if (documented.has(name)) continue;
    const found = sdks.filter((s) => s.metrics.has(name));
    undocumented.push({
      name,
      sdks: found.map((s) => s.name).join(', '),
      annotations: [...new Set(found.flatMap((s) => s.metrics.get(name).annotations))],
    });
  }

  return { unknown, mismatched, undocumented };
}

// Not every metric an SDK defines belongs on the page: some are deprecated
// aliases, some are internals. Those are recorded in a baseline so the check
// reports only new drift. An entry with no note has not been reviewed yet.
function applyBaseline(result, baseline) {
  const known = new Map(baseline.undocumented.map((e) => [e.name, e]));

  const undocumented = result.undocumented.filter((u) => !known.has(u.name));
  const stale = baseline.undocumented
    .filter((e) => !result.undocumented.some((u) => u.name === e.name))
    .map((e) => e.name);

  return { ...result, undocumented, stale };
}

function report({ unknown, mismatched, undocumented, stale }, sdks) {
  const lines = [];

  lines.push('Sources:');
  for (const sdk of sdks) {
    lines.push(`  ${sdk.name.padEnd(5)} ${sdk.repo}@${sdk.sha} — ${sdk.metrics.size} metrics`);
    for (const u of sdk.unused) {
      lines.push(`      excluded ${u.name} (${u.identifier} is never referenced)`);
    }
  }
  lines.push('');

  if (unknown.length) {
    lines.push('Documented but not found in any SDK (likely a wrong name):');
    for (const u of unknown) {
      lines.push(`  ${u.name} — page says ${u.documented}`);
    }
    lines.push('');
  }

  if (mismatched.length) {
    lines.push('Availability disagrees with the SDK sources:');
    for (const m of mismatched) {
      lines.push(`  ${m.name}\n      page:   ${m.documented}\n      source: ${m.actual}`);
    }
    lines.push('');
  }

  if (undocumented.length) {
    lines.push('Emitted by an SDK but not documented, and not in the baseline:');
    for (const u of undocumented) {
      const notes = u.annotations.length ? ` [${u.annotations.join(', ')}]` : '';
      lines.push(`  ${u.name} — ${u.sdks}${notes}`);
    }
    lines.push('');
  }

  if (stale?.length) {
    lines.push('Baseline entries the SDKs no longer define (remove them):');
    for (const name of stale) lines.push(`  ${name}`);
    lines.push('');
  }

  const total = unknown.length + mismatched.length + undocumented.length + (stale?.length ?? 0);
  lines.push(total === 0 ? 'No drift found.' : `${total} difference(s) between the page and the SDK sources.`);

  return lines.join('\n');
}

function main() {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const cacheIndex = args.indexOf('--cache-dir');
  const cacheDir = cacheIndex === -1 ? path.join(os.tmpdir(), 'temporal-sdk-sources') : args[cacheIndex + 1];

  const rows = parseTable(fs.readFileSync(path.join(process.cwd(), PAGE), 'utf8')).filter((r) => r.name);

  if (rows.length === 0) {
    console.error(`No metrics found in ${PAGE}.`);
    process.exit(1);
  }

  const sdks = SDKS.map((sdk) => collectSdk(sdk, cacheDir));
  const baseline = JSON.parse(fs.readFileSync(BASELINE, 'utf8'));
  const raw = compare(rows, sdks);
  const result = applyBaseline(raw, baseline);

  if (args.includes('--update-baseline')) {
    const notes = new Map(baseline.undocumented.map((e) => [e.name, e.note]));
    const updated = {
      comment: baseline.comment,
      undocumented: raw.undocumented.map((u) => ({
        name: u.name,
        sdks: u.sdks,
        note: notes.get(u.name) ?? '',
      })),
    };
    fs.writeFileSync(BASELINE, `${JSON.stringify(updated, null, 2)}\n`);
    console.log(
      `Wrote ${BASELINE} with ${updated.undocumented.length} entries. ` + 'Add a note for any entry that has none.'
    );
    return;
  }

  if (json) {
    console.log(
      JSON.stringify(
        {
          page: PAGE,
          documented: rows.length,
          sources: sdks.map((s) => ({
            sdk: s.name,
            repo: s.repo,
            sha: s.sha,
            metrics: s.metrics.size,
          })),
          ...result,
        },
        null,
        2
      )
    );
  } else {
    console.log(report(result, sdks));
  }

  return result.unknown.length + result.mismatched.length + result.undocumented.length + result.stale.length;
}

module.exports = {
  SDKS,
  BASELINE,
  applyBaseline,
  stripRustTestModule,
  extractRust,
  extractGo,
  extractJava,
  resolveConcatenations,
  compare,
};

if (require.main === module) {
  try {
    if (main() > 0) process.exit(2);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
