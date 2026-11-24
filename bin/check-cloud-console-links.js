#!/usr/bin/env node
// Checks every Temporal Cloud console link in the docs (https://cloud.temporal.io/...)
// against the live console. The Docusaurus build already fails on broken
// internal links (onBrokenLinks: 'throw'), but nothing checks links into the
// Cloud console, whose routes change independently of this repo.
//
// cloud.temporal.io answers unknown routes with a real HTTP 404 even when
// logged out, so a plain GET is enough: 404/410 means the page is gone.
// Redirects (3xx) are fine. Network errors and 5xx responses are reported as
// warnings and don't fail the check, so a console outage can't break the job.
//
// Usage: node bin/check-cloud-console-links.js [docsDir]

const fs = require('node:fs');
const path = require('node:path');

const CONSOLE_LINK_RE = /https:\/\/cloud\.temporal\.io(\/[A-Za-z0-9/_\-.~%]*)?(?:[?#][^\s)\]"'`<>]*)?/g;
const DOC_FILE_RE = /\.mdx?$/;
const CONCURRENCY = 4;
const TIMEOUT_MS = 15_000;

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (DOC_FILE_RE.test(entry.name)) yield full;
  }
}

// Every console link in a file's text, as { url, line }. The URL is
// normalized to scheme + host + path: the query string and fragment select a
// tab or filter inside a page and don't change whether the page exists, and
// trailing sentence punctuation isn't part of the link.
function extractConsoleLinks(text) {
  const links = [];
  text.split('\n').forEach((lineText, i) => {
    for (const match of lineText.matchAll(CONSOLE_LINK_RE)) {
      const pathname = (match[1] ?? '/').replace(/[.,;:]+$/, '');
      links.push({ url: `https://cloud.temporal.io${pathname}`, line: i + 1 });
    }
  });
  return links;
}

async function checkUrl(url) {
  try {
    const res = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (res.status === 404 || res.status === 410) return { url, status: res.status, broken: true };
    if (res.status >= 500) return { url, status: res.status, warning: `HTTP ${res.status}` };
    return { url, status: res.status };
  } catch (err) {
    return { url, status: null, warning: err.message };
  }
}

async function checkAll(urls) {
  const results = [];
  let next = 0;
  const worker = async () => {
    for (let i = next++; i < urls.length; i = next++) results.push(await checkUrl(urls[i]));
  };
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker));
  return results;
}

async function main() {
  const docsDir = process.argv[2] ?? 'docs';
  // url -> Set of "file:line". A Set because a Markdown link written as
  // [url](url) puts the same URL on one line twice.
  const occurrences = new Map();
  for (const file of walk(docsDir)) {
    for (const { url, line } of extractConsoleLinks(fs.readFileSync(file, 'utf8'))) {
      if (!occurrences.has(url)) occurrences.set(url, new Set());
      occurrences.get(url).add(`${file}:${line}`);
    }
  }

  const results = await checkAll([...occurrences.keys()].sort());
  const broken = results.filter((r) => r.broken);
  for (const r of results.filter((r) => r.warning)) {
    console.log(`::warning::Couldn't check ${r.url} (${r.warning})`);
  }
  for (const r of broken) {
    for (const where of occurrences.get(r.url)) {
      const [file, line] = where.split(':');
      console.log(`::error file=${file},line=${line}::${r.url} returns HTTP ${r.status}`);
    }
  }
  console.log(
    `Checked ${results.length} distinct Temporal Cloud console links: ${broken.length} broken.`,
  );
  process.exitCode = broken.length > 0 ? 1 : 0;
}

if (require.main === module) main();

module.exports = { extractConsoleLinks };
