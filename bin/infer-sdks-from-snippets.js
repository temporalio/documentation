#!/usr/bin/env node

/**
 * Infer `sdks:` front matter from language-tagged code samples in MDX.
 *
 * Signals (union of all found):
 *   - fenced code blocks: ```go, ```python, …
 *   - <CodeSnippet language="…">
 *   - <SdkTabs.Go> / <SdkTabs.Python> / …
 *   - <TabItem value="go"> (only known SDK values)
 *
 * Usage:
 *   node bin/infer-sdks-from-snippets.js              # dry-run (default)
 *   node bin/infer-sdks-from-snippets.js --dry-run
 *   node bin/infer-sdks-from-snippets.js --write       # add sdks only when missing
 *   node bin/infer-sdks-from-snippets.js --write --force  # replace existing sdks
 *   node bin/infer-sdks-from-snippets.js --include-develop  # also scan docs/develop/<lang>/
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const yaml = require('js-yaml');
const { mergeWithSectionFrontMatter } = require('../plugins/shared/sectionFrontMatter');

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, 'docs');
const SDKS_VOCAB_PATH = path.join(DOCS_DIR, 'taxonomy', 'sdks.yml');

/** Fence / attribute / tab tokens → canonical vocab id */
const TOKEN_TO_SDK = {
  go: 'go',
  golang: 'go',
  java: 'java',
  python: 'python',
  py: 'python',
  typescript: 'typescript',
  ts: 'typescript',
  tsx: 'typescript',
  js: 'typescript',
  jsx: 'typescript',
  javascript: 'typescript',
  php: 'php',
  csharp: 'dotnet',
  cs: 'dotnet',
  dotnet: 'dotnet',
  'c#': 'dotnet',
  ruby: 'ruby',
  rb: 'ruby',
  rust: 'rust',
  rs: 'rust',
};

/** <SdkTabs.Go> component suffix → vocab id */
const SDKTABS_TO_SDK = {
  Go: 'go',
  Java: 'java',
  Python: 'python',
  TypeScript: 'typescript',
  PHP: 'php',
  Php: 'php',
  DotNet: 'dotnet',
  Ruby: 'ruby',
  Rust: 'rust',
};

const FENCE_RE = /^```([a-zA-Z0-9+#]+)/gm;
const CODE_SNIPPET_RE = /<CodeSnippet\b[^>]*\blanguage=["']([^"']+)["']/gi;
const SDKTABS_RE = /<SdkTabs\.(Go|Java|Python|TypeScript|PHP|Php|DotNet|Ruby|Rust)\b/g;
const TAB_ITEM_RE = /<TabItem\b[^>]*\bvalue=["']([^"']+)["']/gi;

function parseArgs(argv) {
  const args = {
    dryRun: true,
    write: false,
    force: false,
    includeDevelop: false,
  };
  for (const arg of argv) {
    if (arg === '--write') {
      args.write = true;
      args.dryRun = false;
    } else if (arg === '--dry-run') {
      args.dryRun = true;
      args.write = false;
    } else if (arg === '--force') {
      args.force = true;
    } else if (arg === '--include-develop') {
      args.includeDevelop = true;
    } else if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else {
      console.error(`Unknown argument: ${arg}`);
      args.help = true;
      args.badArgs = true;
    }
  }
  return args;
}

function loadVocabIds() {
  const parsed = yaml.load(fs.readFileSync(SDKS_VOCAB_PATH, 'utf8'));
  if (!Array.isArray(parsed)) {
    throw new Error(`Expected array in ${SDKS_VOCAB_PATH}`);
  }
  return new Set(parsed.map((entry) => entry.id));
}

function walkMdx(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (name.startsWith('_')) return [];
      return walkMdx(full);
    }
    if (!/\.mdx$/i.test(name)) return [];
    if (name.startsWith('_')) return [];
    return [full];
  });
}

/** Skip per-SDK develop trees — those use `_frontmatter.yml` defaults. */
function isDevelopSdkTree(filePath) {
  const rel = path.relative(DOCS_DIR, filePath).replace(/\\/g, '/');
  return /^develop\/(go|java|python|typescript|dotnet|php|ruby|rust)\//.test(rel);
}

function normalizeToken(raw) {
  const key = String(raw).trim().toLowerCase();
  return TOKEN_TO_SDK[key] || null;
}

function inferSdksFromBody(body, vocabIds) {
  const found = new Set();

  for (const match of body.matchAll(FENCE_RE)) {
    const id = normalizeToken(match[1]);
    if (id && vocabIds.has(id)) found.add(id);
  }

  for (const match of body.matchAll(CODE_SNIPPET_RE)) {
    const id = normalizeToken(match[1]);
    if (id && vocabIds.has(id)) found.add(id);
  }

  for (const match of body.matchAll(SDKTABS_RE)) {
    const id = SDKTABS_TO_SDK[match[1]];
    if (id && vocabIds.has(id)) found.add(id);
  }

  for (const match of body.matchAll(TAB_ITEM_RE)) {
    const id = normalizeToken(match[1]);
    if (id && vocabIds.has(id)) found.add(id);
  }

  return [...found].sort();
}

function normalizeSdksList(value) {
  if (value == null) return null;
  if (Array.isArray(value)) {
    return [...new Set(value.map((v) => String(v).trim()).filter(Boolean))].sort();
  }
  const single = String(value).trim();
  return single ? [single] : null;
}

function sameSdks(a, b) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  return a.every((id, i) => id === b[i]);
}

function formatSdks(list) {
  if (!list || list.length === 0) return '(none)';
  return `[${list.join(', ')}]`;
}

function writeSdksFrontMatter(filePath, sdks) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  parsed.data.sdks = sdks;
  const next = matter.stringify(parsed.content.replace(/^\n/, ''), parsed.data);
  fs.writeFileSync(filePath, next);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(`Usage: node bin/infer-sdks-from-snippets.js [--dry-run|--write] [--force] [--include-develop]`);
    process.exit(args.badArgs ? 1 : 0);
  }
  if (args.force && !args.write) {
    console.error('--force requires --write');
    process.exit(1);
  }

  const vocabIds = loadVocabIds();
  const sectionCache = new Map();
  const files = walkMdx(DOCS_DIR).filter(
    (filePath) => args.includeDevelop || !isDevelopSdkTree(filePath),
  );

  const summary = {
    scanned: files.length,
    withSignals: 0,
    noSignals: 0,
    alreadyMatch: 0,
    wouldAdd: 0,
    wouldChange: 0,
    wouldSkipExplicit: 0,
    written: 0,
  };

  const rows = [];

  for (const filePath of files) {
    const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data: pageData, content } = matter(raw);
    const inferred = inferSdksFromBody(content, vocabIds);
    const explicit = normalizeSdksList(pageData.sdks);
    const effective = normalizeSdksList(
      mergeWithSectionFrontMatter(filePath, pageData, {
        stopDir: ROOT,
        cache: sectionCache,
      }).sdks,
    );

    if (inferred.length === 0) {
      summary.noSignals++;
      continue;
    }

    summary.withSignals++;

    let action;
    if (sameSdks(effective, inferred)) {
      action = 'match';
      summary.alreadyMatch++;
    } else if (!explicit) {
      action = 'add';
      summary.wouldAdd++;
    } else if (args.force) {
      action = 'change';
      summary.wouldChange++;
    } else {
      action = 'skip-explicit';
      summary.wouldSkipExplicit++;
    }

    rows.push({ rel, inferred, explicit, effective, action });

    if (args.write && (action === 'add' || action === 'change')) {
      writeSdksFrontMatter(filePath, inferred);
      summary.written++;
    }
  }

  const actionable = rows.filter((r) => r.action === 'add' || r.action === 'change');
  const skipped = rows.filter((r) => r.action === 'skip-explicit');

  console.log(args.write ? 'Mode: write' : 'Mode: dry-run');
  console.log(
    `Scanned ${summary.scanned} MDX files` +
      (args.includeDevelop ? ' (including develop/<sdk>/)' : ' (skipping develop/<sdk>/)'),
  );
  console.log(`With SDK snippet signals: ${summary.withSignals}`);
  console.log(`No SDK snippet signals: ${summary.noSignals}`);
  console.log(`Already match effective sdks: ${summary.alreadyMatch}`);
  console.log(`Would add sdks (no explicit field): ${summary.wouldAdd}`);
  console.log(`Would change (needs --force): ${summary.wouldChange}`);
  console.log(`Skip (explicit sdks differs, no --force): ${summary.wouldSkipExplicit}`);
  if (args.write) {
    console.log(`Written: ${summary.written}`);
  }
  console.log('');

  if (actionable.length > 0) {
    console.log(args.write ? 'Updated:' : 'Would update:');
    for (const row of actionable) {
      console.log(
        `  ${row.action.toUpperCase()}  ${row.rel}\n` +
          `         inferred=${formatSdks(row.inferred)}  explicit=${formatSdks(row.explicit)}  effective=${formatSdks(row.effective)}`,
      );
    }
    console.log('');
  }

  if (skipped.length > 0) {
    console.log('Skipped (explicit sdks present; pass --force to overwrite):');
    for (const row of skipped) {
      console.log(
        `  ${row.rel}\n` +
          `         inferred=${formatSdks(row.inferred)}  explicit=${formatSdks(row.explicit)}`,
      );
    }
    console.log('');
  }

  if (!args.write && summary.wouldAdd + summary.wouldChange > 0) {
    console.log('Re-run with --write to apply additions (add --force to overwrite explicit sdks).');
  }
}

main();
