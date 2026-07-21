#!/usr/bin/env node

/**
 * Taxonomy discovery script (Phase 0).
 *
 * Walks all .md/.mdx files under a docs root, parses YAML front matter,
 * and reports usage of the `tags` and `keywords` fields:
 *
 *   - per-value usage counts for both fields, with file lists
 *   - overlap between `tags` and `keywords` values (case-insensitive)
 *   - distribution of `keywords` array length per file
 *   - files whose `keywords`/`tags` look like unedited placeholder values
 *
 * Usage:
 *   node taxonomy-inventory.js <path-to-docs-root> [--json out.json]
 *
 * No external dependencies. Front matter parsing is intentionally
 * minimal (handles the flat key/value and simple array shapes used in
 * this corpus) rather than a full YAML parser, since this is a one-off
 * discovery tool, not production tooling.
 */

const fs = require('fs');
const path = require('path');

// Checked against each *individual* array value, since inline/block
// arrays are split before this runs (e.g. `[keywords, go here]` becomes
// the two separate values "keywords" and "go here").
const PLACEHOLDER_PATTERNS = [
  /^keywords?$/i,
  /^tags?$/i,
  /^go\s*here$/i,
  /^placeholder$/i,
  /^todo$/i,
  /^tbd$/i,
  /^n\/?a$/i,
  /^example$/i,
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      walk(full, out);
    } else if (/\.mdx?$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function extractFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  return match[1];
}

// Minimal front-matter field extractor for flat scalars, inline arrays
// (`key: [a, b, c]`), and block list arrays (`key:\n  - a\n  - b`).
function extractListField(fmText, field) {
  const lines = fmText.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const inlineMatch = line.match(new RegExp(`^${field}\\s*:\\s*\\[(.*)\\]\\s*$`, 'i'));
    if (inlineMatch) {
      return inlineMatch[1]
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    }

    const blockHeaderMatch = line.match(new RegExp(`^${field}\\s*:\\s*$`, 'i'));
    if (blockHeaderMatch) {
      const values = [];
      let j = i + 1;
      while (j < lines.length && /^\s*-\s*/.test(lines[j])) {
        values.push(lines[j].replace(/^\s*-\s*/, '').trim().replace(/^['"]|['"]$/g, ''));
        j++;
      }
      if (values.length) return values;
    }

    const scalarMatch = line.match(new RegExp(`^${field}\\s*:\\s*(.+)$`, 'i'));
    if (scalarMatch && !inlineMatch) {
      const val = scalarMatch[1].trim().replace(/^['"]|['"]$/g, '');
      if (val && val !== '[]') return [val];
    }
  }
  return [];
}

function isPlaceholder(value) {
  return PLACEHOLDER_PATTERNS.some((re) => re.test(value.trim()));
}

function main() {
  const args = process.argv.slice(2);
  const root = args[0];
  if (!root) {
    console.error('Usage: node taxonomy-inventory.js <path-to-docs-root> [--json out.json]');
    process.exit(1);
  }
  const jsonFlagIndex = args.indexOf('--json');
  const jsonOutPath = jsonFlagIndex !== -1 ? args[jsonFlagIndex + 1] : null;

  const files = walk(root);

  const tagUsage = new Map(); // value(lowercase) -> { display, files: Set }
  const keywordUsage = new Map();
  const keywordCountPerFile = [];
  const placeholderHits = [];
  const filesMissingBoth = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const fm = extractFrontMatter(content);
    if (!fm) {
      filesMissingBoth.push(file);
      continue;
    }

    const tags = extractListField(fm, 'tags');
    const keywords = extractListField(fm, 'keywords');

    if (tags.length === 0 && keywords.length === 0) {
      filesMissingBoth.push(file);
    }

    for (const t of tags) {
      const key = t.toLowerCase();
      if (!tagUsage.has(key)) tagUsage.set(key, { display: t, files: new Set() });
      tagUsage.get(key).files.add(file);
      if (isPlaceholder(t)) placeholderHits.push({ file, field: 'tags', value: t });
    }

    for (const k of keywords) {
      const key = k.toLowerCase();
      if (!keywordUsage.has(key)) keywordUsage.set(key, { display: k, files: new Set() });
      keywordUsage.get(key).files.add(file);
      if (isPlaceholder(k)) placeholderHits.push({ file, field: 'keywords', value: k });
    }

    keywordCountPerFile.push({ file, count: keywords.length });
  }

  const overlap = [];
  for (const [key, tagEntry] of tagUsage) {
    if (keywordUsage.has(key)) {
      overlap.push({
        value: tagEntry.display,
        tagFileCount: tagEntry.files.size,
        keywordFileCount: keywordUsage.get(key).files.size,
      });
    }
  }

  const sortedTags = [...tagUsage.entries()]
    .map(([key, v]) => ({ value: v.display, count: v.files.size }))
    .sort((a, b) => b.count - a.count);

  const sortedKeywords = [...keywordUsage.entries()]
    .map(([key, v]) => ({ value: v.display, count: v.files.size }))
    .sort((a, b) => b.count - a.count);

  const keywordCounts = keywordCountPerFile.map((f) => f.count);
  const avgKeywords =
    keywordCounts.length > 0
      ? (keywordCounts.reduce((a, b) => a + b, 0) / keywordCounts.length).toFixed(2)
      : '0';
  const maxKeywords = keywordCounts.length > 0 ? Math.max(...keywordCounts) : 0;

  const report = {
    filesScanned: files.length,
    filesMissingTagsAndKeywords: filesMissingBoth.length,
    distinctTagValues: sortedTags.length,
    distinctKeywordValues: sortedKeywords.length,
    keywordsPerFile: { average: Number(avgKeywords), max: maxKeywords },
    tagValuesByUsage: sortedTags,
    keywordValuesByUsage: sortedKeywords,
    tagKeywordOverlap: overlap.sort((a, b) => b.tagFileCount - a.tagFileCount),
    placeholderHits,
  };

  console.log(`Scanned ${report.filesScanned} files under ${root}`);
  console.log(`Distinct tag values: ${report.distinctTagValues}`);
  console.log(`Distinct keyword values: ${report.distinctKeywordValues}`);
  console.log(`Avg keywords/file: ${report.keywordsPerFile.average}, max: ${report.keywordsPerFile.max}`);
  console.log(`Values appearing in BOTH tags and keywords: ${report.tagKeywordOverlap.length}`);
  console.log(`Placeholder-looking values found: ${report.placeholderHits.length}`);
  console.log(`Files with neither tags nor keywords: ${report.filesMissingTagsAndKeywords}`);
  console.log('\nTop 20 tags by file count:');
  for (const t of sortedTags.slice(0, 20)) console.log(`  ${t.count}\t${t.value}`);
  console.log('\nTop 20 keywords by file count:');
  for (const k of sortedKeywords.slice(0, 20)) console.log(`  ${k.count}\t${k.value}`);

  if (jsonOutPath) {
    const serializable = {
      ...report,
    };
    fs.writeFileSync(jsonOutPath, JSON.stringify(serializable, null, 2));
    console.log(`\nFull report written to ${jsonOutPath}`);
  }
}

main();
