// Shared by the checkers that compile hand-written code samples in docs/
// against a published SDK: bin/check-typescript-samples.js,
// bin/check-python-samples.js, and any added later.
//
// Each checker supplies the part that depends on its language: fetching the
// SDK, compiling the samples, and deciding which compiler diagnostics are about
// the SDK. This module does the rest: finding the samples, applying the
// baseline of accepted findings, reporting, and the command line.
//
// A checker's command line:
//
//   node bin/check-<language>-samples.js                     # every page
//   node bin/check-<language>-samples.js docs/develop/...    # only these pages
//   node bin/check-<language>-samples.js --json              # machine-readable
//   node bin/check-<language>-samples.js --github            # also print Actions annotations
//   node bin/check-<language>-samples.js --update-baseline   # accept current findings
//   node bin/check-<language>-samples.js --sdk-version X     # instead of the latest release
//   node bin/check-<language>-samples.js --cache-dir DIR     # where the SDK is downloaded
//
// Exit codes: 0 clean, 2 findings (or stale baseline entries), 1 the check
// could not run at all, for example because the package registry was
// unreachable.

const fs = require('fs');
const os = require('os');
const path = require('path');

const DOCS_DIR = 'docs';

// ---------------------------------------------------------------------------
// Extraction
// ---------------------------------------------------------------------------

// Snipsync wraps synced code in either an HTML comment or an MDX comment.
const SNIPSTART = /^\s*(?:<!--|\{\/\*)\s*SNIPSTART\b/;
const SNIPEND = /^\s*(?:<!--|\{\/\*)\s*SNIPEND\b/;

const FENCE_OPEN = /^(\s*)(`{3,}|~{3,})\s*([^\s`{]*)/;
const FENCE_CLOSE = /^\s*(`{3,}|~{3,})\s*$/;

// The closing token of a comment that opens on this line and doesn't close,
// or null. Fenced code inside an unclosed comment is never rendered.
function openComment(line) {
  const rest = line.replace(/<!--.*?-->/g, '').replace(/\{\/\*.*?\*\/\}/g, '');
  if (rest.includes('<!--')) return '-->';
  if (rest.includes('{/*')) return '*/}';
  return null;
}

function dedent(line, indent) {
  let i = 0;
  while (i < indent && (line[i] === ' ' || line[i] === '\t')) i++;
  return line.slice(i);
}

// Every fenced code block on a page, with the 1-based line of its first line
// of code and whether Snipsync manages it. Code inside a list item or a JSX
// component is indented to match its fence; that indentation is removed.
function extractCodeBlocks(source) {
  const lines = source.split('\n');
  const blocks = [];
  let fence = null;
  let snipsync = false;
  let comment = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (fence) {
      const close = line.match(FENCE_CLOSE);
      if (close && close[1][0] === fence.marker[0] && close[1].length >= fence.marker.length) {
        blocks.push({
          lang: fence.lang,
          line: fence.line,
          code: fence.body.join('\n'),
          snipsync: fence.snipsync,
        });
        fence = null;
      } else {
        fence.body.push(dedent(line, fence.indent));
      }
      continue;
    }

    if (comment) {
      if (line.includes(comment)) comment = null;
      continue;
    }

    if (SNIPSTART.test(line)) {
      snipsync = true;
      continue;
    }
    if (SNIPEND.test(line)) {
      snipsync = false;
      continue;
    }

    const open = line.match(FENCE_OPEN);
    if (open) {
      fence = {
        marker: open[2],
        indent: open[1].length,
        lang: open[3].toLowerCase(),
        line: i + 2,
        body: [],
        snipsync,
      };
      continue;
    }

    comment = openComment(line);
  }

  return blocks;
}

// The hand-written samples on a page in any of `languages`.
function extractSamples(source, languages) {
  return extractCodeBlocks(source).filter((b) => languages.has(b.lang) && !b.snipsync);
}

function walkMdx(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return target.endsWith('.mdx') ? [target] : [];
  return fs
    .readdirSync(target, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => walkMdx(path.join(target, entry.name)));
}

function collectSamples(targets, languages) {
  const samples = [];
  let snipsync = 0;
  for (const file of [...new Set(targets.flatMap(walkMdx))]) {
    for (const block of extractCodeBlocks(fs.readFileSync(file, 'utf8'))) {
      if (!languages.has(block.lang)) continue;
      if (block.snipsync) {
        snipsync++;
        continue;
      }
      samples.push({ file: file.split(path.sep).join('/'), line: block.line, code: block.code });
    }
  }
  return { samples, snipsync };
}

// ---------------------------------------------------------------------------
// Baseline
// ---------------------------------------------------------------------------

function defaultComment(script) {
  return (
    `Findings from ${script} that we have decided to leave as they are, for example a sample that ` +
    'deliberately shows an older API. Each entry is a page, a kind, and a subject; line numbers are left out so ' +
    'an entry survives edits elsewhere on the page. An empty note means the entry has not been reviewed yet; ' +
    'either fix the sample or fill in the note explaining why it stays. ' +
    `Regenerate with: node ${script} --update-baseline`
  );
}

const keyOf = (f) => `${f.file}\u0000${f.kind}\u0000${f.subject}`;

// Accepted findings are recorded without line numbers, so one entry covers
// every occurrence of the same subject on a page.
function applyBaseline(findings, baseline) {
  const known = new Set(baseline.findings.map(keyOf));
  const found = new Set(findings.map(keyOf));
  return {
    remaining: findings.filter((f) => !known.has(keyOf(f))),
    baselined: findings.filter((f) => known.has(keyOf(f))).length,
    stale: baseline.findings.filter((e) => !found.has(keyOf(e))),
  };
}

function updatedBaseline(findings, baseline, comment = '') {
  const notes = new Map(baseline.findings.map((e) => [keyOf(e), e.note]));
  const entries = new Map();
  for (const f of findings) {
    const key = keyOf(f);
    if (!entries.has(key)) {
      entries.set(key, { file: f.file, kind: f.kind, subject: f.subject, note: notes.get(key) ?? '' });
    }
  }
  return {
    comment: baseline.comment || comment,
    findings: [...entries.values()].sort((a, b) => keyOf(a).localeCompare(keyOf(b))),
  };
}

function loadBaseline(file, comment) {
  if (!fs.existsSync(file)) return { comment, findings: [] };
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------

function report({ remaining, baselined, stale }, { sources, sampleCount, snipsync, fullScan, baselineFile }) {
  const lines = [...sources];
  lines.push(`${sampleCount} hand-written samples checked; ${snipsync} Snipsync samples skipped.`, '');

  const byFile = new Map();
  for (const f of remaining) {
    if (!byFile.has(f.file)) byFile.set(f.file, []);
    byFile.get(f.file).push(f);
  }
  for (const [file, list] of byFile) {
    lines.push(file);
    for (const f of list) lines.push(`  ${String(f.line).padStart(5)}  ${f.kind.padEnd(14)}  ${f.message}`);
    lines.push('');
  }

  if (fullScan && stale.length) {
    lines.push('Baseline entries that no longer match anything (remove them):');
    for (const e of stale) lines.push(`  ${e.file}  ${e.kind}  ${e.subject}`);
    lines.push('');
  }

  const accepted = baselined ? ` (${baselined} more accepted in ${baselineFile})` : '';
  lines.push(
    remaining.length === 0
      ? `No findings${accepted}.`
      : `${remaining.length} finding(s) in ${byFile.size} page(s)${accepted}.`
  );
  return lines.join('\n');
}

// GitHub Actions workflow commands, one warning per finding.
function annotations(findings, title) {
  const escape = (s) => s.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
  return findings.map(
    (f) => `::warning file=${f.file},line=${f.line},title=${title} (${f.kind})::${escape(f.message)}`
  );
}

// ---------------------------------------------------------------------------
// Command line
// ---------------------------------------------------------------------------

function optionValue(args, name) {
  const i = args.indexOf(name);
  if (i === -1) return null;
  const value = args[i + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} needs a value.`);
  args.splice(i, 2);
  return value;
}

// Runs a checker from the command line. `checker` provides:
//
//   script      the checker's path, for messages
//   languages   the code fence languages it checks
//   baseline    the path of its baseline file
//   title       the annotation title, such as "TypeScript sample"
//   check       async (samples, { version, cacheDir }) => { findings, sources, details }
//
// `sources` is a list of lines naming what the samples were checked against,
// and `details` is merged into the --json output. `check` throws when it
// can't run, which exits 1.
async function run(checker) {
  const args = process.argv.slice(2);
  const version = optionValue(args, '--sdk-version') ?? 'latest';
  const cacheDir = path.resolve(
    optionValue(args, '--cache-dir') ?? path.join(os.tmpdir(), path.basename(checker.script, '.js'))
  );
  const flags = new Set(args.filter((a) => a.startsWith('--')));
  const targets = args.filter((a) => !a.startsWith('--'));
  const fullScan = targets.length === 0;

  for (const flag of flags) {
    if (!['--json', '--github', '--update-baseline'].includes(flag)) throw new Error(`Unknown option ${flag}.`);
  }
  if (!fullScan && flags.has('--update-baseline')) {
    throw new Error('--update-baseline needs a full scan; drop the paths.');
  }

  const missing = targets.filter((t) => !fs.existsSync(t));
  if (missing.length) throw new Error(`No such file or directory: ${missing.join(', ')}`);
  const { samples, snipsync } = collectSamples(fullScan ? [DOCS_DIR] : targets, checker.languages);

  const { findings, sources, details = {} } = await checker.check(samples, { version, cacheDir });
  findings.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);

  const comment = defaultComment(checker.script);
  const baseline = loadBaseline(checker.baseline, comment);

  if (flags.has('--update-baseline')) {
    const updated = updatedBaseline(findings, baseline, comment);
    fs.writeFileSync(checker.baseline, `${JSON.stringify(updated, null, 2)}\n`);
    console.log(
      `Wrote ${checker.baseline} with ${updated.findings.length} entries. Add a note for any entry that has none.`
    );
    return 0;
  }

  const result = applyBaseline(findings, baseline);
  if (!fullScan) result.stale = [];

  if (flags.has('--json')) {
    console.log(JSON.stringify({ ...details, samples: samples.length, snipsync, ...result }, null, 2));
  } else {
    console.log(
      report(result, { sources, sampleCount: samples.length, snipsync, fullScan, baselineFile: checker.baseline })
    );
  }
  if (flags.has('--github')) {
    for (const line of annotations(result.remaining, checker.title)) console.log(line);
  }

  return result.remaining.length + result.stale.length;
}

// Runs a checker as the main module and exits with its status.
function main(checker) {
  run(checker).then(
    (count) => process.exit(count > 0 ? 2 : 0),
    (error) => {
      console.error(error.message);
      process.exit(1);
    }
  );
}

module.exports = {
  DOCS_DIR,
  extractCodeBlocks,
  extractSamples,
  collectSamples,
  defaultComment,
  applyBaseline,
  updatedBaseline,
  report,
  annotations,
  main,
};
