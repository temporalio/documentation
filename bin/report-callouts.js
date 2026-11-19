#!/usr/bin/env node

// Reports how docs/ uses callouts: admonitions (`:::note`, `:::caution[Title]`, and so on) and the
// <ReleaseNoteHeader> component. Use it to see which callout types and titles pages use, find every
// instance of one, and confirm that a migration moved all of them.
//
//   node bin/report-callouts.js                       # the working tree
//   node bin/report-callouts.js --ref <ref>           # docs/ at a commit, without a checkout
//   node bin/report-callouts.js --base origin/main    # what this branch changes
//   node bin/report-callouts.js --where 'info[TLDR]'  # file:line of every match
//
// Add --json to any of them. --where takes an admonition keyword (`note`), a keyword
// and title (`caution[Currently in: Pre-release]`), or `ReleaseNoteHeader`.
//
// Counts are source-level: an admonition in a partial counts once, however many pages import it.
// Fenced code blocks and comments are skipped, so examples of the syntax aren't counted. Pages under
// docs/internal/ are left out too: they exist to show how callouts render, not to document anything.
//
// The numbers depend only on the files in docs/, so nothing is stored. Compare against a commit with
// --base instead of keeping a baseline file.
//
// Always exits 0 unless it can't run at all. This is a report, not a check.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { readWorkingTree, readAtRef, resolveCommit, refLabel } = require('./report-snipsync-coverage');

const REPO_ROOT = path.resolve(__dirname, '..');
const EXCLUDED_DIRS = ['docs/internal/'];
const FEATURE_RELEASE_TYPES_FILE = 'src/constants/featureReleaseTypes.js';

// ReleaseNoteHeader's own fallback when a page sets neither a known featureName nor a type.
const DEFAULT_RELEASE_STAGE = 'publicPreview';

// A backtick fence can't have a backtick in its info string, so ```foo``` is inline code, not a fence.
const FENCE_OPEN = /^\s*(?:(`{3,})(?!.*`)|(~{3,}))/;
const FENCE_CLOSE = /^\s*(`{3,}|~{3,})\s*$/;

const ADMONITION_START = /^\s*:{3,}([A-Za-z][\w-]*)/;

const RELEASE_NOTE_HEADER = /<ReleaseNoteHeader\b([^>]*?)(\/?)\s*>/g;

// Each line of the page, with lines inside fenced code blocks replaced by an empty string so line
// numbers still match the file.
function maskCodeFences(source) {
  const lines = source.split(/\r?\n/);
  let fence = null;
  return lines.map((line) => {
    if (fence) {
      const close = line.match(FENCE_CLOSE);
      if (close && close[1][0] === fence[0] && close[1].length >= fence.length) fence = null;
      return '';
    }
    const open = line.match(FENCE_OPEN);
    if (open) {
      fence = open[1] || open[2];
      return '';
    }
    return line;
  });
}

// Blanks out `<!-- -->` and `{/* */}` comments, keeping line breaks so line numbers still match.
function maskComments(text) {
  return text.replace(/<!--[\s\S]*?-->|\{\/\*[\s\S]*?\*\/\}/g, (comment) => comment.replace(/[^\n]/g, ' '));
}

// Blanks out inline code that names the component, so `<ReleaseNoteHeader />` in running text isn't
// counted as a use of it. Other backticks are left alone: a JSX prop can hold a template literal.
function maskInlineCode(text) {
  return text.replace(/`[^`\n]*<ReleaseNoteHeader\b[^`\n]*`/g, (code) => ' '.repeat(code.length));
}

// { keyword, title } for an admonition opener, or null. The opener is three or more colons, a
// keyword, then an optional `[title]` (which may hold balanced brackets, as a link does), optional
// `{attributes}`, and optional text after a space. With `mdx1Compat.admonitions` on, Docusaurus also
// reads that trailing text as the title (`:::note My title`).
function parseAdmonitionOpener(line) {
  const start = line.match(ADMONITION_START);
  if (!start) return null;
  const keyword = start[1].toLowerCase();
  let rest = line.slice(start[0].length);

  if (rest[0] === '[') {
    let depth = 0;
    for (let i = 0; i < rest.length; i++) {
      if (rest[i] === '[') depth++;
      else if (rest[i] === ']' && --depth === 0) return { keyword, title: rest.slice(1, i).trim() };
    }
    // Unbalanced brackets: still an admonition, so count it with what's there.
    return { keyword, title: rest.slice(1).trim() };
  }

  rest = rest.replace(/^\{[^}]*\}/, '');
  if (rest.trim() === '') return { keyword, title: '' };
  if (/^[ \t]/.test(rest)) return { keyword, title: rest.trim() };
  // Something like `:::note-to-self:` in prose.
  return null;
}

function propPattern(name) {
  return `(?:^|\\s)${name}\\s*=\\s*`;
}

function stringProp(attributes, name) {
  const match = attributes.match(
    new RegExp(`${propPattern(name)}(?:"([^"]*)"|'([^']*)'|\\{\\s*(?:"([^"]*)"|'([^']*)'|\`([^\`]*)\`)\\s*\\})`)
  );
  if (!match) return null;
  return match.slice(1).find((value) => value !== undefined);
}

function hasProp(attributes, name) {
  return new RegExp(propPattern(name)).test(attributes);
}

function lineOf(text, index) {
  let line = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) line++;
  return line;
}

// Every callout on one page: { admonitions: [{ keyword, title, line }], releaseNoteHeaders: [...] }.
function scanSource(source) {
  const text = maskComments(maskCodeFences(source).join('\n'));
  const admonitions = [];

  text.split('\n').forEach((line, index) => {
    const opener = parseAdmonitionOpener(line);
    if (opener) admonitions.push({ ...opener, line: index + 1 });
  });

  const jsx = maskInlineCode(text);
  const releaseNoteHeaders = [];
  for (const match of jsx.matchAll(RELEASE_NOTE_HEADER)) {
    const attributes = match[1];
    releaseNoteHeaders.push({
      line: lineOf(jsx, match.index),
      selfClosing: match[2] === '/',
      type: stringProp(attributes, 'type'),
      featureName: stringProp(attributes, 'featureName'),
      languages: hasProp(attributes, 'languages'),
      guidePath: hasProp(attributes, 'guidePath'),
      label: hasProp(attributes, 'label'),
      href: hasProp(attributes, 'href'),
    });
  }

  return { admonitions, releaseNoteHeaders };
}

// The stage ReleaseNoteHeader renders: the featureName's stage from featureReleaseTypes.js, else the
// type prop, else the component's default. Mirrors getResolvedType in the component.
function resolveStage(header, featureReleaseTypes) {
  return (header.featureName && featureReleaseTypes[header.featureName]) || header.type || DEFAULT_RELEASE_STAGE;
}

// The featureName → stage map from featureReleaseTypes.js source. The file is an ES module, so it's
// read as text rather than required.
function parseFeatureReleaseTypes(source) {
  const body = (source.match(/FEATURE_RELEASE_TYPES\s*=\s*\{([\s\S]*?)\}/) || [])[1] || '';
  const types = {};
  for (const match of body.matchAll(/["']?(\w+)["']?\s*:\s*["'](\w+)["']/g)) types[match[1]] = match[2];
  return types;
}

function readFeatureReleaseTypes(ref) {
  try {
    const source = ref
      ? execFileSync('git', ['show', `${ref}:${FEATURE_RELEASE_TYPES_FILE}`], { stdio: ['ignore', 'pipe', 'ignore'] })
      : fs.readFileSync(FEATURE_RELEASE_TYPES_FILE);
    return parseFeatureReleaseTypes(source.toString('utf8'));
  } catch {
    return {};
  }
}

function isCountedPage(file) {
  return !EXCLUDED_DIRS.some((dir) => file.path.startsWith(dir));
}

function admonitionKey(admonition) {
  return admonition.title ? `${admonition.keyword}[${admonition.title}]` : admonition.keyword;
}

function increment(counts, key) {
  counts[key] = (counts[key] || 0) + 1;
}

function sortedCounts(counts) {
  return Object.fromEntries(Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])));
}

// Totals across every page. `keywords` counts each admonition by keyword, titled or not; `titles`
// counts only titled ones, by `keyword[title]` as written. For ReleaseNoteHeader, `types` counts the
// type prop as written and `stages` counts the stage each one renders.
function tally(files, featureReleaseTypes = {}) {
  const keywords = {};
  const titles = {};
  const releaseNoteHeader = {
    total: 0,
    selfClosing: 0,
    withType: 0,
    withFeatureName: 0,
    withLanguages: 0,
    withGuidePath: 0,
    withLabel: 0,
    withHref: 0,
    stages: {},
    types: {},
    featureNames: {},
  };
  let pagesWithCallouts = 0;

  for (const file of files) {
    const { admonitions, releaseNoteHeaders } = scanSource(file.source);
    if (admonitions.length || releaseNoteHeaders.length) pagesWithCallouts++;

    for (const admonition of admonitions) {
      increment(keywords, admonition.keyword);
      if (admonition.title) increment(titles, admonitionKey(admonition));
    }

    for (const header of releaseNoteHeaders) {
      releaseNoteHeader.total++;
      increment(releaseNoteHeader.stages, resolveStage(header, featureReleaseTypes));
      if (header.selfClosing) releaseNoteHeader.selfClosing++;
      if (header.type !== null) {
        releaseNoteHeader.withType++;
        increment(releaseNoteHeader.types, header.type);
      }
      if (header.featureName !== null) {
        releaseNoteHeader.withFeatureName++;
        increment(releaseNoteHeader.featureNames, header.featureName);
      }
      if (header.languages) releaseNoteHeader.withLanguages++;
      if (header.guidePath) releaseNoteHeader.withGuidePath++;
      if (header.label) releaseNoteHeader.withLabel++;
      if (header.href) releaseNoteHeader.withHref++;
    }
  }

  releaseNoteHeader.stages = sortedCounts(releaseNoteHeader.stages);
  releaseNoteHeader.types = sortedCounts(releaseNoteHeader.types);
  releaseNoteHeader.featureNames = sortedCounts(releaseNoteHeader.featureNames);

  return {
    pages: files.length,
    pagesWithCallouts,
    keywords: sortedCounts(keywords),
    titles: sortedCounts(titles),
    releaseNoteHeader,
  };
}

// file:line of every callout matching `key`: a keyword, `keyword[title]`, or `ReleaseNoteHeader`.
function where(files, key) {
  const wanted = key.trim();
  const isTitled = /\[.*\]$/.test(wanted);
  const results = [];

  for (const file of files) {
    const { admonitions, releaseNoteHeaders } = scanSource(file.source);
    if (wanted.toLowerCase() === 'releasenoteheader') {
      for (const header of releaseNoteHeaders) results.push(`${file.path}:${header.line}`);
      continue;
    }
    for (const admonition of admonitions) {
      const matches = isTitled
        ? admonitionKey(admonition).toLowerCase() === wanted.toLowerCase()
        : admonition.keyword === wanted.toLowerCase();
      if (matches) results.push(`${file.path}:${admonition.line}`);
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

function countLines(counts, indent = '  ') {
  const entries = Object.entries(counts);
  if (entries.length === 0) return [`${indent}(none)`];
  const width = Math.max(...entries.map(([, count]) => String(count).length));
  return entries.map(([key, count]) => `${indent}${String(count).padStart(width)}  ${key}`);
}

function formatText(report, label) {
  const header = report.releaseNoteHeader;
  return [
    `Callouts in docs/${label ? ` at ${label}` : ''}: ${report.pagesWithCallouts} of ${report.pages} pages use one.`,
    '',
    'Admonitions by keyword (titled or not):',
    ...countLines(report.keywords),
    '',
    'Titled admonitions:',
    ...countLines(report.titles),
    '',
    `ReleaseNoteHeader: ${header.total}`,
    `  ${header.selfClosing} self-closing (show the default text)`,
    `  ${header.withType} set type, ${header.withFeatureName} set featureName`,
    `  ${header.withLanguages} set languages, ${header.withGuidePath} set guidePath`,
    `  ${header.withLabel} set label, ${header.withHref} set href`,
    '  stage rendered (featureName lookup, then type, then the default):',
    ...countLines(header.stages, '    '),
    '  type prop as written:',
    ...countLines(header.types, '    '),
    '  featureName:',
    ...countLines(header.featureNames, '    '),
  ].join('\n');
}

// Rows of [key, base, head] for every count that differs.
function changedCounts(base, head) {
  const keys = new Set([...Object.keys(base), ...Object.keys(head)]);
  return [...keys]
    .map((key) => [key, base[key] || 0, head[key] || 0])
    .filter(([, before, after]) => before !== after)
    .sort((a, b) => a[0].localeCompare(b[0]));
}

function flattenReleaseNoteHeader(header) {
  const flat = {};
  for (const [key, value] of Object.entries(header)) {
    if (typeof value === 'number') flat[`ReleaseNoteHeader ${key}`] = value;
  }
  for (const [stage, count] of Object.entries(header.stages)) flat[`ReleaseNoteHeader stage=${stage}`] = count;
  for (const [type, count] of Object.entries(header.types)) flat[`ReleaseNoteHeader type=${type}`] = count;
  for (const [name, count] of Object.entries(header.featureNames))
    flat[`ReleaseNoteHeader featureName=${name}`] = count;
  return flat;
}

function compare(base, head) {
  return {
    keywords: changedCounts(base.keywords, head.keywords),
    titles: changedCounts(base.titles, head.titles),
    releaseNoteHeader: changedCounts(
      flattenReleaseNoteHeader(base.releaseNoteHeader),
      flattenReleaseNoteHeader(head.releaseNoteHeader)
    ),
  };
}

function formatDelta(before, after) {
  const delta = after - before;
  return `${before} → ${after} (${delta > 0 ? '+' : ''}${delta})`;
}

function formatComparisonText(changes, labels) {
  const section = (title, rows) => [
    `${title}:`,
    ...(rows.length ? rows.map(([key, before, after]) => `  ${key}: ${formatDelta(before, after)}`) : ['  no change']),
  ];
  return [
    `Callout changes, ${labels.base} → ${labels.head}`,
    '',
    ...section('Admonitions by keyword', changes.keywords),
    '',
    ...section('Titled admonitions', changes.titles),
    '',
    ...section('ReleaseNoteHeader', changes.releaseNoteHeader),
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Command line
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const options = { format: 'text' };
  const valued = { '--ref': 'ref', '--base': 'base', '--where': 'where' };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--json') options.format = 'json';
    else if (valued[arg]) {
      if (i + 1 >= argv.length) throw new Error(`${arg} needs a value`);
      options[valued[arg]] = argv[++i];
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  if (options.where && options.base) throw new Error('--where and --base can not be used together');
  return options;
}

function readPages(ref) {
  const commit = ref ? resolveCommit(ref) : null;
  const files = (commit ? readAtRef(commit) : readWorkingTree()).filter(isCountedPage);
  if (files.length === 0) throw new Error('No pages found under docs/.');
  return { files, featureReleaseTypes: readFeatureReleaseTypes(commit) };
}

function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  // Git and file paths are relative to the repository root, wherever the script is run from.
  process.chdir(REPO_ROOT);

  const pages = readPages(options.ref);
  const headLabel = options.ref ? refLabel(options.ref) : 'working tree';

  if (options.where) {
    const results = where(pages.files, options.where);
    if (options.format === 'json') return JSON.stringify({ key: options.where, results }, null, 2);
    return results.length ? results.join('\n') : `No callouts match ${options.where}.`;
  }

  const head = tally(pages.files, pages.featureReleaseTypes);
  if (!options.base) {
    if (options.format === 'json') return JSON.stringify({ ref: options.ref || null, ...head }, null, 2);
    return formatText(head, options.ref && headLabel);
  }

  const basePages = readPages(options.base);
  const base = tally(basePages.files, basePages.featureReleaseTypes);
  const changes = compare(base, head);
  if (options.format === 'json') {
    return JSON.stringify(
      { base: { ref: options.base, ...base }, head: { ref: options.ref || null, ...head }, changes },
      null,
      2
    );
  }
  return formatComparisonText(changes, { base: refLabel(options.base), head: headLabel });
}

module.exports = {
  maskCodeFences,
  maskComments,
  parseAdmonitionOpener,
  scanSource,
  resolveStage,
  parseFeatureReleaseTypes,
  isCountedPage,
  admonitionKey,
  tally,
  where,
  compare,
  formatText,
  formatComparisonText,
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
