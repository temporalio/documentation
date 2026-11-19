#!/usr/bin/env node

// Reports how much of docs/develop repeats itself across SDKs, and where the
// rest of docs/ hand-writes per-SDK link lists, so the work to share that
// content (partials, <SdkGuideLinks>) can be measured as it lands.
//
// - Topics: each SDK's docs/develop/<id>/ tree, matched by file path (with a
//   few known renames folded together). For each topic: which SDKs have it,
//   how many prose lines repeat another SDK's page for the same topic, and
//   which heading anchors every SDK shares.
// - Shared prose: a prose line is "shared" when another SDK's page for the
//   same topic has the same line once inline code, link targets, and SDK names
//   are replaced with placeholders. Code blocks, JSX, and imports don't count.
// - Link lists: runs of consecutive lines outside docs/develop that link to
//   3+ different SDKs' /develop/<id>/ pages, outside tab blocks. Each one is a
//   candidate for <SdkGuideLinks>.
// - Partials: files under docs/develop/_shared/, with the share of their lines
//   inside <SdkOnly> (more than a third is past the readability limit) and any
//   <SdkOnly>/<SdkTerm> with an unknown SDK id or term.
//
//   node bin/report-sdk-duplication.js                 # text report
//   node bin/report-sdk-duplication.js --json          # machine-readable
//   node bin/report-sdk-duplication.js --topic workflows/continue-as-new
//
// Always exits 0 unless it can't run at all. This is a report, not a check.

const fs = require('fs');
const path = require('path');
const { SDK_DATA } = require('../src/constants/sdkData');
const { parseSdkList, resolveSdkTerm } = require('../src/utils/sdkContent');
const { isExcludedDocPath } = require('../plugins/shared/docsRouting');

const DOCS_DIR = 'docs';
const DEVELOP_DIR = path.join(DOCS_DIR, 'develop');
const SHARED_DIR = path.join(DEVELOP_DIR, '_shared');
const SDK_IDS = SDK_DATA.map(({ id }) => id);

// The same topic under a different file name in some SDKs.
const TOPIC_ALIASES = {
  'workers/run-process': 'workers/run-worker-process',
  'workers/worker-process': 'workers/run-worker-process',
  'workflows/worker-versioning-legacy': 'worker-versioning-legacy',
};

// Headline and topic table cover topics at least this many SDKs have.
const MIN_SDKS = 3;
// Normalized prose lines shorter than this ("## Overview") aren't compared.
const MIN_LINE_LENGTH = 20;
// A partial past this share of conditional lines should go back into the pages.
const CONDITIONAL_LIMIT = 1 / 3;

// ---------------------------------------------------------------------------
// Files
// ---------------------------------------------------------------------------

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.mdx?$/.test(entry.name) ? [full] : [];
  });
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function topicKey(relPath) {
  const key = toPosix(relPath).replace(/\.mdx?$/, '');
  return TOPIC_ALIASES[key] || key;
}

function stripFrontmatter(source) {
  const m = source.match(/^---\n[\s\S]*?\n---\n/);
  return m ? source.slice(m[0].length) : source;
}

// ---------------------------------------------------------------------------
// Prose extraction
// ---------------------------------------------------------------------------

const SDK_NAME_RE = /(?<![\w.])(?:Go|Golang|Java|\.NET|C#|PHP|Python|Ruby|Rust|TypeScript|JavaScript|Node\.js)(?![\w])/g;

// One prose line as compared across SDKs.
function normalizeProse(line) {
  return line
    .replace(/\{\/\*[\s\S]*?\*\/\s*\}/g, '')
    .replace(/\s*\{#[^}]+\}\s*$/, '')
    .replace(/`[^`]*`/g, '`C`')
    .replace(/\]\([^)]*\)/g, '](L)')
    .replace(SDK_NAME_RE, 'SDK')
    .replace(/\s+/g, ' ')
    .trim();
}

// Whether a line is markup rather than prose: JSX tags and their prop lines,
// admonition fences, imports/exports, comments, and table rules.
function isMarkupLine(trimmed) {
  return (
    trimmed === '' ||
    /^<\/?[A-Za-z][\w.]*(\s[^>]*)?\/?>$/.test(trimmed) ||
    /^<\/?[A-Za-z][\w.]*$/.test(trimmed) ||
    /^\/?>$/.test(trimmed) ||
    /^[A-Za-z]+=[{"'`]/.test(trimmed) ||
    /^:{3,}/.test(trimmed) ||
    /^(import|export)\s/.test(trimmed) ||
    /^(<!--|\{\/\*).*(-->|\*\/\s*\})$/.test(trimmed) ||
    /^\|?[\s:|-]+\|?$/.test(trimmed)
  );
}

// Prose lines on a page, each with its normalized form and 1-based line number.
function proseLines(source) {
  const lines = stripFrontmatter(source).split('\n');
  const out = [];
  let fence = null;
  let comment = null;
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (fence) {
      if (trimmed.startsWith(fence)) fence = null;
      return;
    }
    if (comment) {
      if (trimmed.includes(comment)) comment = null;
      return;
    }
    const fenceMatch = trimmed.match(/^(`{3,}|~{3,})/);
    if (fenceMatch) {
      fence = fenceMatch[1];
      return;
    }
    if (trimmed.startsWith('<!--') && !trimmed.includes('-->')) {
      comment = '-->';
      return;
    }
    if (trimmed.startsWith('{/*') && !/\*\/\s*\}/.test(trimmed)) {
      comment = '*/';
      return;
    }
    if (isMarkupLine(trimmed)) return;
    const normalized = normalizeProse(trimmed);
    if (normalized.length >= MIN_LINE_LENGTH) out.push({ line: index + 1, text: trimmed, normalized });
  });
  return out;
}

// Explicit heading anchors: ## Heading {/* #id */} or ## Heading {#id}.
function headingAnchors(source) {
  const anchors = new Set();
  for (const line of stripFrontmatter(source).split('\n')) {
    if (!/^#{1,6}\s/.test(line)) continue;
    const m = line.match(/\{\/\*\s*#([\w-]+)\s*\*\/\s*\}|\{#([\w-]+)\}/);
    if (m) anchors.add(m[1] || m[2]);
  }
  return anchors;
}

// ---------------------------------------------------------------------------
// Topics
// ---------------------------------------------------------------------------

// { topic: { sdk: { file, source } } } for every routed page under
// docs/develop/<id>/.
function collectTopics(root) {
  const topics = {};
  for (const sdk of SDK_IDS) {
    const sdkDir = path.join(root, DEVELOP_DIR, sdk);
    for (const full of walk(sdkDir)) {
      if (isExcludedDocPath(path.relative(path.join(root, DOCS_DIR), full))) continue;
      const key = topicKey(path.relative(sdkDir, full));
      topics[key] = topics[key] || {};
      topics[key][sdk] = { file: toPosix(path.relative(root, full)), source: fs.readFileSync(full, 'utf8') };
    }
  }
  return topics;
}

function analyzeTopic(topic, pages) {
  const sdks = SDK_IDS.filter((sdk) => pages[sdk]);
  const prose = Object.fromEntries(sdks.map((sdk) => [sdk, proseLines(pages[sdk].source)]));
  const anchors = Object.fromEntries(sdks.map((sdk) => [sdk, headingAnchors(pages[sdk].source)]));

  const perSdk = {};
  let total = 0;
  let shared = 0;
  for (const sdk of sdks) {
    const others = new Set(sdks.filter((o) => o !== sdk).flatMap((o) => prose[o].map((p) => p.normalized)));
    const sharedLines = prose[sdk].filter((p) => others.has(p.normalized)).length;
    perSdk[sdk] = { file: pages[sdk].file, proseLines: prose[sdk].length, sharedLines };
    total += prose[sdk].length;
    shared += sharedLines;
  }

  const allAnchors = [...new Set(sdks.flatMap((sdk) => [...anchors[sdk]]))].sort();
  const sharedAnchors = allAnchors.filter((a) => sdks.every((sdk) => anchors[sdk].has(a)));
  const missingAnchors = {};
  for (const sdk of sdks) {
    const missing = allAnchors.filter((a) => !anchors[sdk].has(a));
    if (missing.length) missingAnchors[sdk] = missing;
  }

  return {
    topic,
    sdks,
    missing: SDK_IDS.filter((sdk) => !pages[sdk]),
    proseLines: total,
    sharedLines: shared,
    percent: total ? (100 * shared) / total : 0,
    anchors: { total: allAnchors.length, shared: sharedAnchors.length, missingBySdk: missingAnchors },
    perSdk,
  };
}

// ---------------------------------------------------------------------------
// Hand-written per-SDK link lists outside docs/develop
// ---------------------------------------------------------------------------

const DEVELOP_LINK_RE = new RegExp(`/develop/(${SDK_IDS.join('|')})(?=[/#"'\`)\\s]|$)`, 'g');

function linkedSdks(line) {
  return new Set([...line.matchAll(DEVELOP_LINK_RE)].map((m) => m[1]));
}

// Runs of consecutive lines that each link to a /develop/<id>/ page and that
// together cover MIN_SDKS or more SDKs. Code fences and tab blocks, whose
// content is per-language by design, are skipped.
function findLinkLists(source) {
  const lines = source.split('\n');
  const lists = [];
  let fence = null;
  let tabDepth = 0;
  let run = null;

  const closeRun = () => {
    if (run && run.sdks.size >= MIN_SDKS) {
      const sdks = SDK_IDS.filter((sdk) => run.sdks.has(sdk));
      lists.push({ line: run.start, sdks, missing: SDK_IDS.filter((sdk) => !run.sdks.has(sdk)) });
    }
    run = null;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (fence) {
      if (trimmed.startsWith(fence)) fence = null;
      return;
    }
    const fenceMatch = trimmed.match(/^(`{3,}|~{3,})/);
    if (fenceMatch) {
      closeRun();
      fence = fenceMatch[1];
      return;
    }
    if (/^<(Tabs|SdkTabs)[\s>]/.test(trimmed) || /^<(Tabs|SdkTabs)$/.test(trimmed)) tabDepth++;
    if (/^<\/(Tabs|SdkTabs)>/.test(trimmed)) {
      tabDepth = Math.max(0, tabDepth - 1);
      return;
    }
    if (tabDepth > 0) return;

    const sdks = linkedSdks(line);
    if (sdks.size === 0) {
      closeRun();
      return;
    }
    if (!run) run = { start: index + 1, sdks: new Set() };
    for (const sdk of sdks) run.sdks.add(sdk);
  });
  closeRun();
  return lists;
}

function collectLinkLists(root) {
  const docsRoot = path.join(root, DOCS_DIR);
  const results = [];
  for (const full of walk(docsRoot)) {
    const rel = path.relative(docsRoot, full);
    if (isExcludedDocPath(rel)) continue;
    const relPosix = toPosix(rel);
    if (SDK_IDS.some((sdk) => relPosix.startsWith(`develop/${sdk}/`))) continue;
    const lists = findLinkLists(fs.readFileSync(full, 'utf8'));
    for (const list of lists) results.push({ file: toPosix(path.relative(root, full)), ...list });
  }
  return results;
}

// ---------------------------------------------------------------------------
// Shared partials
// ---------------------------------------------------------------------------

function analyzePartial(file, source) {
  const lines = stripFrontmatter(source).split('\n');
  const errors = [];
  let contentLines = 0;
  let conditionalLines = 0;
  let inBlock = false;
  let fence = null;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const where = `line ${index + 1}`;
    if (fence) {
      if (trimmed.startsWith(fence)) fence = null;
    } else {
      const fenceMatch = trimmed.match(/^(`{3,}|~{3,})/);
      if (fenceMatch) fence = fenceMatch[1];
    }

    if (!fence) {
      for (const m of line.matchAll(/<SdkOnly\b([^>]*)>/g)) {
        const sdks = m[1].match(/\bsdks=["']([^"']*)["']/);
        const not = m[1].match(/\bnot=["']([^"']*)["']/);
        if (Boolean(sdks) === Boolean(not)) errors.push(`${where}: <SdkOnly> needs exactly one of \`sdks\` or \`not\``);
        try {
          parseSdkList((sdks || not || [])[1]);
        } catch (err) {
          errors.push(`${where}: ${err.message}`);
        }
      }
      for (const m of line.matchAll(/<SdkTerm\b[^>]*\bname=["']([^"']*)["'][^>]*\/>/g)) {
        try {
          resolveSdkTerm(m[1], SDK_IDS[0]);
        } catch (err) {
          errors.push(`${where}: ${err.message}`);
        }
      }
    }

    if (!fence && /^<SdkOnly\b[^>]*>$/.test(trimmed)) {
      inBlock = true;
      return;
    }
    if (!fence && /^<\/SdkOnly>$/.test(trimmed)) {
      inBlock = false;
      return;
    }
    if (trimmed === '' || /^(import|export)\s/.test(trimmed)) return;
    contentLines++;
    if (inBlock || /<SdkOnly\b/.test(line)) conditionalLines++;
  });

  const share = contentLines ? conditionalLines / contentLines : 0;
  return {
    file,
    contentLines,
    conditionalLines,
    percent: 100 * share,
    overLimit: share > CONDITIONAL_LIMIT,
    errors,
  };
}

function collectPartials(root) {
  return walk(path.join(root, SHARED_DIR)).map((full) =>
    analyzePartial(toPosix(path.relative(root, full)), fs.readFileSync(full, 'utf8'))
  );
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

function buildReport(root = process.cwd()) {
  const topics = Object.entries(collectTopics(root))
    .map(([topic, pages]) => analyzeTopic(topic, pages))
    .sort((a, b) => a.topic.localeCompare(b.topic));
  const covered = topics.filter((t) => t.sdks.length >= MIN_SDKS);
  const proseTotal = covered.reduce((n, t) => n + t.proseLines, 0);
  const sharedTotal = covered.reduce((n, t) => n + t.sharedLines, 0);

  const lists = collectLinkLists(root);
  return {
    sdks: SDK_IDS,
    headline: {
      topics: covered.length,
      proseLines: proseTotal,
      sharedLines: sharedTotal,
      percent: proseTotal ? (100 * sharedTotal) / proseTotal : 0,
    },
    topics,
    linkLists: {
      count: lists.length,
      pages: new Set(lists.map((l) => l.file)).size,
      incomplete: lists.filter((l) => l.missing.length > 0).length,
      lists,
    },
    partials: collectPartials(root),
  };
}

function pct(value) {
  return `${value.toFixed(1)}%`;
}

function num(n) {
  return n.toLocaleString('en-US');
}

function table(header, rows) {
  const widths = header.map((h, i) => Math.max(h.length, ...rows.map((r) => String(r[i]).length)));
  const fmt = (row) => row.map((cell, i) => String(cell).padEnd(widths[i])).join('  ').trimEnd();
  return [fmt(header), fmt(widths.map((w) => '-'.repeat(w))), ...rows.map(fmt)].join('\n');
}

function coverageMarks(sdks) {
  return SDK_IDS.map((sdk) => (sdks.includes(sdk) ? '✓' : '·')).join('');
}

function formatText(report) {
  const { headline, topics, linkLists, partials } = report;
  const out = [];
  out.push(`SDK duplication report (SDK order: ${SDK_IDS.join(', ')})`);
  out.push('');
  out.push(
    `Shared prose: ${pct(headline.percent)} of ${num(headline.proseLines)} prose lines in ${headline.topics} topics covered by ${MIN_SDKS}+ SDKs`
  );
  out.push(
    `Hand-written per-SDK link lists outside docs/develop: ${linkLists.count} lists on ${linkLists.pages} pages (${linkLists.incomplete} omit an SDK)`
  );
  out.push(`Shared partials (docs/develop/_shared): ${partials.length}`);

  const covered = topics.filter((t) => t.sdks.length >= MIN_SDKS).sort((a, b) => b.percent - a.percent);
  out.push('');
  out.push(`Topics covered by ${MIN_SDKS}+ SDKs, most shared first:`);
  out.push(
    table(
      ['topic', 'SDKs', 'prose lines', 'shared', 'anchors shared'],
      covered.map((t) => [
        t.topic,
        coverageMarks(t.sdks),
        num(t.proseLines),
        pct(t.percent),
        t.anchors.total ? `${t.anchors.shared}/${t.anchors.total}` : '-',
      ])
    )
  );

  const gaps = topics.filter((t) => t.sdks.length > 1 && t.missing.length > 0);
  out.push('');
  out.push('Topics some SDKs are missing:');
  out.push(table(['topic', 'SDKs', 'missing'], gaps.map((t) => [t.topic, coverageMarks(t.sdks), t.missing.join(', ')])));

  const single = topics.filter((t) => t.sdks.length === 1);
  out.push('');
  out.push(`Pages only one SDK has: ${single.length} (run with --json for the list)`);

  out.push('');
  out.push('Hand-written per-SDK link lists:');
  out.push(
    table(
      ['location', 'SDKs', 'missing'],
      linkLists.lists.map((l) => [`${l.file}:${l.line}`, coverageMarks(l.sdks), l.missing.join(', ') || '-'])
    )
  );

  out.push('');
  out.push('Shared partials:');
  if (partials.length === 0) {
    out.push('(none yet)');
  } else {
    out.push(
      table(
        ['partial', 'lines', 'conditional', 'note'],
        partials.map((p) => [
          p.file,
          p.contentLines,
          pct(p.percent),
          [p.overLimit ? 'over the 1/3 readability limit' : '', ...p.errors].filter(Boolean).join('; ') || '-',
        ])
      )
    );
  }
  return out.join('\n');
}

function formatTopic(report, key) {
  const t = report.topics.find((x) => x.topic === key);
  if (!t) return `No topic "${key}". Topics are paths under docs/develop/<sdk>/ without the extension.`;
  const out = [];
  out.push(`${t.topic}: ${pct(t.percent)} of ${num(t.proseLines)} prose lines shared across ${t.sdks.length} SDKs`);
  if (t.missing.length) out.push(`Missing: ${t.missing.join(', ')}`);
  out.push('');
  out.push(
    table(
      ['SDK', 'file', 'prose lines', 'shared', 'missing anchors'],
      t.sdks.map((sdk) => {
        const s = t.perSdk[sdk];
        return [
          sdk,
          s.file,
          s.proseLines,
          s.proseLines ? pct((100 * s.sharedLines) / s.proseLines) : '-',
          (t.anchors.missingBySdk[sdk] || []).join(' ') || '-',
        ];
      })
    )
  );
  return out.join('\n');
}

function parseArgs(argv) {
  const args = { json: false, topic: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--json') args.json = true;
    else if (argv[i] === '--topic') args.topic = argv[++i];
    else throw new Error(`Unknown argument: ${argv[i]}`);
  }
  return args;
}

function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const report = buildReport();
  if (args.json) {
    const json = args.topic ? report.topics.find((t) => t.topic === args.topic) || null : report;
    console.log(JSON.stringify(json, null, 2));
  } else {
    console.log(args.topic ? formatTopic(report, args.topic) : formatText(report));
  }
}

module.exports = {
  normalizeProse,
  proseLines,
  headingAnchors,
  topicKey,
  analyzeTopic,
  findLinkLists,
  analyzePartial,
  buildReport,
};

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
