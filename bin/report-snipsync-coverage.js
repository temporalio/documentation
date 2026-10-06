#!/usr/bin/env node

// Reports how much of the SDK code shown in docs/ comes from Snipsync rather
// than being written into the page by hand. Code that Snipsync pulls from a
// sample repository is compiled in that repository's CI; hand-written code is
// not, so this is the share of SDK code we know builds.
//
// The headline counts non-blank lines inside fenced code blocks tagged with an
// SDK language (Python, TypeScript/JavaScript, Go, Java, C#, Ruby, PHP, Rust).
// A second line counts every fenced block except mermaid diagrams, which
// includes shell commands and configuration that would never come from a
// sample repository.
//
//   node bin/report-snipsync-coverage.js                   # the working tree
//   node bin/report-snipsync-coverage.js --ref <ref>       # docs/ at a commit
//   node bin/report-snipsync-coverage.js --base <ref>      # compare against a commit
//   node bin/report-snipsync-coverage.js --history [--since YYYY-MM-DD] [--every day|week|month] [--branch <ref>]
//
// Output is a plain-text report by default; add --json or --markdown. History
// is always CSV, oldest first, one row per period (the last commit in it).
//
// The numbers depend only on the files in docs/, so the trend is rebuilt from
// git history instead of being stored anywhere.
//
// Always exits 0 unless it can't run at all. This is a report, not a check.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { extractCodeBlocks } = require('./code-blocks');

const DOCS_DIR = 'docs';
const DOC_EXTENSIONS = new Set(['.md', '.mdx']);
const MAX_BUFFER = 1024 * 1024 * 1024;

const SDK_LANGUAGES = {
  py: 'Python',
  python: 'Python',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  tsx: 'TypeScript',
  js: 'TypeScript',
  javascript: 'TypeScript',
  jsx: 'TypeScript',
  go: 'Go',
  golang: 'Go',
  java: 'Java',
  cs: 'C#',
  csharp: 'C#',
  'c#': 'C#',
  dotnet: 'C#',
  rb: 'Ruby',
  ruby: 'Ruby',
  php: 'PHP',
  rs: 'Rust',
  rust: 'Rust',
};

// Never counted, even in the all-languages total.
const EXCLUDED_LANGUAGES = new Set(['mermaid']);

// ---------------------------------------------------------------------------
// Counting
// ---------------------------------------------------------------------------

function sdkLanguage(tag) {
  return SDK_LANGUAGES[tag] || null;
}

// The section a page belongs to: its top-level directory under docs/, with
// develop/ split one level further so each SDK gets its own row.
function sectionOf(file) {
  const parts = file.split('/');
  if (parts[0] === DOCS_DIR) parts.shift();
  if (parts.length === 1) return '(top level)';
  if (parts[0] === 'develop' && parts.length > 2) return `develop/${parts[1]}`;
  return parts[0];
}

function countLines(code) {
  return code.split('\n').filter((line) => line.trim() !== '').length;
}

function emptyCount() {
  return { synced: 0, inline: 0 };
}

function percent(count) {
  const total = count.synced + count.inline;
  return total === 0 ? null : (count.synced / total) * 100;
}

// Tallies the code blocks in `files`, an array of { path, source }.
function tally(files) {
  const result = {
    files: files.length,
    sdk: emptyCount(),
    all: emptyCount(),
    sections: {},
    languages: {},
    origins: {},
  };

  for (const file of files) {
    const section = sectionOf(file.path);
    for (const block of extractCodeBlocks(file.source)) {
      if (EXCLUDED_LANGUAGES.has(block.lang)) continue;
      const lines = countLines(block.code);
      if (lines === 0) continue;

      const key = block.snipsync ? 'synced' : 'inline';
      result.sections[section] ??= { sdk: emptyCount(), all: emptyCount() };
      result.all[key] += lines;
      result.sections[section].all[key] += lines;

      const language = sdkLanguage(block.lang);
      if (!language) continue;
      result.sdk[key] += lines;
      result.sections[section].sdk[key] += lines;
      result.languages[language] ??= emptyCount();
      result.languages[language][key] += lines;
      if (block.snipsync) {
        const origin = block.origin || 'unattributed';
        result.origins[origin] = (result.origins[origin] || 0) + lines;
      }
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Reading docs/
// ---------------------------------------------------------------------------

function git(args, options = {}) {
  return execFileSync('git', args, { maxBuffer: MAX_BUFFER, ...options });
}

function isDocFile(file) {
  return DOC_EXTENSIONS.has(path.extname(file));
}

// Tracked files plus new files that aren't ignored, read from disk. This is
// what a commit of the working tree would contain.
function readWorkingTree() {
  return git(['ls-files', '-z', '--cached', '--others', '--exclude-standard', '--', DOCS_DIR])
    .toString('utf8')
    .split('\0')
    .filter((file) => file && isDocFile(file) && fs.existsSync(file))
    .sort()
    .map((file) => ({ path: file, source: fs.readFileSync(file, 'utf8') }));
}

// Splits `git cat-file --batch` output into the contents of each object.
function parseCatFileBatch(buffer) {
  const contents = [];
  let offset = 0;
  while (offset < buffer.length) {
    const newline = buffer.indexOf(0x0a, offset);
    if (newline === -1) break;
    const header = buffer.toString('utf8', offset, newline).split(' ');
    if (header[1] === 'missing') throw new Error(`git object ${header[0]} is missing`);
    const size = Number(header[2]);
    contents.push(buffer.toString('utf8', newline + 1, newline + 1 + size));
    offset = newline + 1 + size + 1;
  }
  return contents;
}

// docs/ as it was at `ref`, read from git objects without a checkout.
function readAtRef(ref) {
  const entries = git(['ls-tree', '-r', '-z', ref, '--', DOCS_DIR])
    .toString('utf8')
    .split('\0')
    .filter(Boolean)
    .map((entry) => {
      const [meta, file] = entry.split('\t');
      const [mode, type, sha] = meta.split(' ');
      return { mode, type, sha, path: file };
    })
    .filter((entry) => entry.type === 'blob' && entry.mode !== '120000' && isDocFile(entry.path))
    .sort((a, b) => a.path.localeCompare(b.path));

  if (entries.length === 0) return [];
  const contents = parseCatFileBatch(
    git(['cat-file', '--batch'], { input: entries.map((entry) => entry.sha).join('\n') + '\n' })
  );
  return entries.map((entry, i) => ({ path: entry.path, source: contents[i] }));
}

function resolveCommit(ref) {
  return git(['rev-parse', '--verify', `${ref}^{commit}`])
    .toString('utf8')
    .trim();
}

// ---------------------------------------------------------------------------
// History
// ---------------------------------------------------------------------------

// The key of the period a commit date falls in. Weeks start on Monday (UTC).
function periodKey(isoDate, every) {
  const date = new Date(isoDate);
  if (every === 'day') return date.toISOString().slice(0, 10);
  if (every === 'month') return date.toISOString().slice(0, 7);
  const monday = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7));
  return monday.toISOString().slice(0, 10);
}

// The last commit in each period, oldest period first. `commits` is newest
// first, as git log prints it.
function samplePeriods(commits, every) {
  const seen = new Set();
  const samples = [];
  for (const commit of commits) {
    const key = periodKey(commit.date, every);
    if (seen.has(key)) continue;
    seen.add(key);
    samples.push({ ...commit, period: key });
  }
  return samples.reverse();
}

function defaultBranch() {
  for (const ref of ['origin/main', 'main']) {
    try {
      resolveCommit(ref);
      return ref;
    } catch {
      // try the next one
    }
  }
  return 'HEAD';
}

function history({ since, every, branch }) {
  const args = ['log', '--first-parent', '--format=%H%x09%cI'];
  if (since) args.push(`--since=${since}`);
  args.push(branch);
  const commits = git(args)
    .toString('utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [sha, date] = line.split('\t');
      return { sha, date };
    });

  const rows = ['period,commit_date,commit,sdk_synced,sdk_inline,sdk_pct,all_pct,guides_pct,design_patterns_pct'];
  for (const sample of samplePeriods(commits, every)) {
    const result = tally(readAtRef(sample.sha));
    rows.push(
      [
        sample.period,
        sample.date.slice(0, 10),
        sample.sha.slice(0, 12),
        result.sdk.synced,
        result.sdk.inline,
        csvPercent(percent(result.sdk)),
        csvPercent(percent(result.all)),
        csvPercent(sectionPercent(result, 'guides')),
        csvPercent(sectionPercent(result, 'design-patterns')),
      ].join(',')
    );
  }
  return rows.join('\n');
}

function sectionPercent(result, section) {
  const entry = result.sections[section];
  return entry ? percent(entry.sdk) : null;
}

function csvPercent(value) {
  return value === null ? '' : value.toFixed(2);
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

function formatNumber(n) {
  return n.toLocaleString('en-US');
}

function formatPercent(value) {
  return value === null ? 'n/a' : `${value.toFixed(1)}%`;
}

// The change between two percentages as shown, so 15.0% → 15.1% reads +0.1
// even when the unrounded change is smaller.
function formatDelta(before, after) {
  if (before === null || after === null) return '';
  const delta = Number(after.toFixed(1)) - Number(before.toFixed(1));
  if (Math.abs(delta) < 0.05) return '±0.0 pts';
  return `${delta > 0 ? '+' : '−'}${Math.abs(delta).toFixed(1)} pts`;
}

function headline(count) {
  return `${formatPercent(percent(count))} (${formatNumber(count.synced)} of ${formatNumber(
    count.synced + count.inline
  )} lines)`;
}

// Sections with any SDK code, most SDK code first.
function sdkSections(result) {
  return Object.entries(result.sections)
    .filter(([, entry]) => entry.sdk.synced + entry.sdk.inline > 0)
    .sort(([a, x], [b, y]) => y.sdk.synced + y.sdk.inline - (x.sdk.synced + x.sdk.inline) || a.localeCompare(b));
}

function sortedCounts(counts) {
  return Object.entries(counts).sort(
    ([a, x], [b, y]) => y.synced + y.inline - (x.synced + x.inline) || a.localeCompare(b)
  );
}

function sortedOrigins(origins) {
  return Object.entries(origins).sort(([a, x], [b, y]) => y - x || a.localeCompare(b));
}

function markdownTable(header, rows) {
  const lines = [`| ${header.join(' | ')} |`, `| ${header.map((_, i) => (i === 0 ? '---' : '--:')).join(' | ')} |`];
  for (const row of rows) lines.push(`| ${row.join(' | ')} |`);
  return lines.join('\n');
}

function textTable(header, rows) {
  const widths = header.map((h, i) => Math.max(h.length, ...rows.map((row) => String(row[i]).length)));
  const format = (row) =>
    row.map((cell, i) => (i === 0 ? String(cell).padEnd(widths[i]) : String(cell).padStart(widths[i]))).join('  ');
  return [format(header), widths.map((w) => '-'.repeat(w)).join('  '), ...rows.map(format)].join('\n');
}

function countRow(name, count) {
  return [name, formatNumber(count.synced), formatNumber(count.inline), formatPercent(percent(count))];
}

const COUNT_HEADER = ['Snipsync lines', 'Inline lines', 'Snipsync %'];

function breakdownTables(result, table) {
  return [
    table(
      ['Section', ...COUNT_HEADER],
      sdkSections(result).map(([name, entry]) => countRow(name, entry.sdk))
    ),
    table(
      ['Language', ...COUNT_HEADER],
      sortedCounts(result.languages).map(([name, count]) => countRow(name, count))
    ),
    table(
      ['Snipsync origin', 'Lines'],
      sortedOrigins(result.origins).map(([name, lines]) => [name, formatNumber(lines)])
    ),
  ];
}

function formatText(result, label) {
  const [sections, languages, origins] = breakdownTables(result, textTable);
  return [
    `Snipsync coverage of SDK code in docs/${label ? ` at ${label}` : ''}`,
    '',
    `SDK languages: ${headline(result.sdk)}`,
    `All languages: ${headline(result.all)}`,
    '',
    sections,
    '',
    languages,
    '',
    origins,
  ].join('\n');
}

function formatMarkdown(result, label) {
  const [sections, languages, origins] = breakdownTables(result, markdownTable);
  return [
    '### Snipsync coverage',
    '',
    `**${formatPercent(percent(result.sdk))}** of SDK code lines in \`docs/\`${label ? ` at \`${label}\`` : ''} come from Snipsync (${formatNumber(
      result.sdk.synced
    )} of ${formatNumber(result.sdk.synced + result.sdk.inline)}). All languages: ${headline(result.all)}.`,
    '',
    sections,
    '',
    '<details><summary>By language and by origin</summary>',
    '',
    languages,
    '',
    origins,
    '',
    '</details>',
  ].join('\n');
}

function changedSections(base, head) {
  const names = new Set([...Object.keys(base.sections), ...Object.keys(head.sections)]);
  return [...names]
    .filter((name) => {
      const before = base.sections[name]?.sdk || emptyCount();
      const after = head.sections[name]?.sdk || emptyCount();
      return before.synced !== after.synced || before.inline !== after.inline;
    })
    .sort();
}

function isChanged(base, head) {
  return base.sdk.synced !== head.sdk.synced || base.sdk.inline !== head.sdk.inline;
}

function arrow(before, after) {
  return before === after ? formatNumber(after) : `${formatNumber(before)} → ${formatNumber(after)}`;
}

function comparisonRows(base, head) {
  return changedSections(base, head).map((name) => {
    const before = base.sections[name]?.sdk || emptyCount();
    const after = head.sections[name]?.sdk || emptyCount();
    return [
      name,
      arrow(before.synced, after.synced),
      arrow(before.inline, after.inline),
      `${formatPercent(percent(before))} → ${formatPercent(percent(after))}`,
      formatDelta(percent(before), percent(after)),
    ];
  });
}

const COMPARISON_HEADER = ['Section', 'Snipsync lines', 'Inline lines', 'Snipsync %', 'Change'];

function formatComparisonText(base, head, labels) {
  const rows = comparisonRows(base, head);
  return [
    `Snipsync coverage of SDK code in docs/: ${labels.base} → ${labels.head}`,
    '',
    `SDK languages: ${headline(base.sdk)} → ${headline(head.sdk)} ${formatDelta(percent(base.sdk), percent(head.sdk))}`,
    `All languages: ${headline(base.all)} → ${headline(head.all)}`,
    '',
    rows.length ? textTable(COMPARISON_HEADER, rows) : 'No section changed.',
    '',
    formatText(head, labels.head),
  ].join('\n');
}

function formatComparisonMarkdown(base, head, labels) {
  const rows = comparisonRows(base, head);
  const [sections, languages, origins] = breakdownTables(head, markdownTable);
  return [
    '### Snipsync coverage',
    '',
    `SDK code lines in \`docs/\` that come from Snipsync: **${formatPercent(percent(base.sdk))} → ${formatPercent(
      percent(head.sdk)
    )}** (${formatDelta(percent(base.sdk), percent(head.sdk))}), ${formatNumber(head.sdk.synced)} of ${formatNumber(
      head.sdk.synced + head.sdk.inline
    )} lines.`,
    '',
    rows.length ? markdownTable(COMPARISON_HEADER, rows) : 'No section changed.',
    '',
    '<details><summary>All sections</summary>',
    '',
    `All languages: ${headline(head.all)}.`,
    '',
    sections,
    '',
    languages,
    '',
    origins,
    '',
    '</details>',
    '',
    `Compared with \`${labels.base}\`. Counts non-blank lines in fenced code blocks tagged with an SDK language. Hand-written code isn't compiled anywhere; code Snipsync pulls from a sample repository is built in that repository's CI. See [UTILITIES.md](https://github.com/temporalio/documentation/blob/main/readme/UTILITIES.md#snipsync-coverage).`,
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Command line
// ---------------------------------------------------------------------------

// A full commit SHA is shortened for display; branch names and the like are
// shown as given.
function refLabel(ref) {
  return /^[0-9a-f]{40}$/.test(ref) ? ref.slice(0, 7) : ref;
}

function parseArgs(argv) {
  const options = { format: 'text', every: 'week' };
  const valued = { '--ref': 'ref', '--base': 'base', '--since': 'since', '--every': 'every', '--branch': 'branch' };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--json') options.format = 'json';
    else if (arg === '--markdown') options.format = 'markdown';
    else if (arg === '--history') options.history = true;
    else if (valued[arg]) {
      if (i + 1 >= argv.length) throw new Error(`${arg} needs a value`);
      options[valued[arg]] = argv[++i];
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!['day', 'week', 'month'].includes(options.every)) {
    throw new Error(`--every must be day, week, or month, not ${options.every}`);
  }
  return options;
}

function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);

  if (options.history) {
    return history({ since: options.since, every: options.every, branch: options.branch || defaultBranch() });
  }

  const head = options.ref ? tally(readAtRef(resolveCommit(options.ref))) : tally(readWorkingTree());
  const headLabel = options.ref ? refLabel(options.ref) : 'working tree';

  if (!options.base) {
    if (options.format === 'json') return JSON.stringify({ ref: options.ref || null, ...head }, null, 2);
    if (options.format === 'markdown') return formatMarkdown(head, options.ref && headLabel);
    return formatText(head, options.ref && headLabel);
  }

  const base = tally(readAtRef(resolveCommit(options.base)));
  const labels = { base: refLabel(options.base), head: headLabel };
  if (options.format === 'json') {
    return JSON.stringify(
      {
        base: { ref: options.base, ...base },
        head: { ref: options.ref || null, ...head },
        changed: isChanged(base, head),
      },
      null,
      2
    );
  }
  if (options.format === 'markdown') return formatComparisonMarkdown(base, head, labels);
  return formatComparisonText(base, head, labels);
}

module.exports = {
  SDK_LANGUAGES,
  sdkLanguage,
  sectionOf,
  countLines,
  percent,
  tally,
  parseCatFileBatch,
  periodKey,
  samplePeriods,
  changedSections,
  isChanged,
  formatDelta,
  refLabel,
  parseArgs,
};

if (require.main === module) {
  try {
    console.log(main());
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
