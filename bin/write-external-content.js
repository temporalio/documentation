#!/usr/bin/env node
// Writes api/_external-content.json: a snapshot of the title and description of
// every temporal.io blog post and learn.temporal.io page. api/recommend.js uses
// it to turn a Kapa hit on those sites into a card, since Kapa returns only a
// passage and a URL for them.
//
// It reads each site's sitemap, then each page's og:title and og:description.
// The file is committed and refreshed weekly by .github/workflows/
// update-external-content.yml, so a slow or down third-party site can't break a
// docs build. See readme/RECOMMEND.md.
//
//   node bin/write-external-content.js           write api/_external-content.json
//   node bin/write-external-content.js --check   fetch, but print a summary only

const fs = require('fs');
const path = require('path');

const OUTPUT = path.join(__dirname, '..', 'api', '_external-content.json');

// Which sitemap URLs become cards. Blog posts are /blog/<slug>. Every learn page
// that isn't an index or a tag page counts, since Learn content is shown as a
// Tutorial.
const SOURCES = [
  {
    sitemap: 'https://temporal.io/sitemap.xml',
    include: (url) => url.hostname === 'temporal.io' && /^\/blog\/[^/]+$/.test(url.pathname),
    clean: (title) => title,
  },
  {
    sitemap: 'https://learn.temporal.io/sitemap.xml',
    include: (url) => url.hostname === 'learn.temporal.io' && url.pathname !== '/' && !/^\/(tags|search)(\/|$)/.test(url.pathname),
    clean: (title) => title.replace(/\s*\|\s*Learn Temporal$/, ''),
  },
];

// Shorter than this isn't a description. Learn's changelog and an API reference
// page have "2023-05-17" and "/checks GET", which would show as card text.
const MIN_DESCRIPTION_LENGTH = 30;

const CONCURRENCY = 6;
const REQUEST_TIMEOUT_MS = 20_000;
// A run that can't read this many pages is treated as broken, not as a snapshot
// to commit. Individual failures keep the page's previous entry.
const MAX_FAILURE_SHARE = 0.1;

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match);
}

// Canonical key for a page: no anchor, no query, no trailing slash. A Kapa result
// and a sitemap entry for the same page then match, however either spells it.
function normalizeUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  const pathname = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : url.pathname;
  return `${url.protocol}//${url.hostname.toLowerCase()}${pathname}`;
}

function parseSitemap(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => decodeEntities(match[1]));
}

// Attributes of one <meta> tag. Values may be double-quoted, single-quoted, or
// bare, since learn.temporal.io writes `property=og:title content="..."`.
function parseAttributes(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([a-zA-Z:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g)) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4];
  }
  return attributes;
}

// { title, description } from a page's HTML, or null when the title is missing
// or the description is missing or too short to show.
// Prefers og: tags and falls back to <title> and the description meta tag.
function parsePage(html, clean = (title) => title) {
  const meta = {};
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const { property, name, content } = parseAttributes(tag);
    if (content === undefined) continue;
    const key = (property || name || '').toLowerCase();
    if (key && !(key in meta)) meta[key] = decodeEntities(content).trim();
  }
  const titleTag = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const title = clean(meta['og:title'] || (titleTag ? decodeEntities(titleTag[1]).trim() : ''));
  const description = meta['og:description'] || meta.description || '';
  return title && description.length >= MIN_DESCRIPTION_LENGTH ? { title, description } : null;
}

const RETRIES = 3;
const RETRY_DELAY_MS = 1500;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// A dropped connection or a 429 or 5xx is retried with a growing delay. Under
// load, a site that throttles scrapers closes connections, and a single try
// lost about a fifth of the Learn pages. Other 4xx responses are final.
async function fetchText(url, { retryDelay = RETRY_DELAY_MS } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS), redirect: 'follow' });
      if (response.ok) return await response.text();
      const error = new Error(`${response.status} for ${url}`);
      error.retryable = response.status === 429 || response.status >= 500;
      throw error;
    } catch (error) {
      const retryable = error.retryable ?? true;
      if (!retryable || attempt === RETRIES) {
        throw new Error(error.message.includes(url) ? error.message : `${error.cause?.code || error.message} for ${url}`);
      }
      await sleep(retryDelay * (attempt + 1));
    }
  }
}

async function mapWithConcurrency(items, limit, task) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;
        results[index] = await task(items[index]);
      }
    })
  );
  return results;
}

// Builds the snapshot. `previous` supplies the entry for a page that fails to
// load this time. Pages no longer in a sitemap are dropped.
async function buildSnapshot({ previous = {}, sources = SOURCES, log = () => {}, retryDelay } = {}) {
  const pages = [];
  for (const source of sources) {
    const urls = parseSitemap(await fetchText(source.sitemap, { retryDelay })).filter((loc) => {
      try {
        return source.include(new URL(loc));
      } catch {
        return false;
      }
    });
    if (urls.length === 0) throw new Error(`${source.sitemap} listed no pages. Its layout may have changed.`);
    log(`${source.sitemap}: ${urls.length} pages`);
    pages.push(...urls.map((loc) => ({ loc, clean: source.clean })));
  }

  let failed = 0;
  const entries = await mapWithConcurrency(pages, CONCURRENCY, async ({ loc, clean }) => {
    const key = normalizeUrl(loc);
    try {
      const page = parsePage(await fetchText(loc, { retryDelay }), clean);
      if (page) return [key, { ...page, url: loc }];
      log(`no title or description: ${loc}`);
      return null;
    } catch (error) {
      failed++;
      log(`failed: ${error.message}`);
      return previous[key] ? [key, previous[key]] : null;
    }
  });

  if (failed / pages.length > MAX_FAILURE_SHARE) {
    throw new Error(`${failed} of ${pages.length} pages failed to load. Not writing a snapshot.`);
  }
  const sorted = entries.filter(Boolean).sort(([a], [b]) => a.localeCompare(b));
  return Object.fromEntries(sorted);
}

async function main() {
  const check = process.argv.includes('--check');
  let previous = {};
  try {
    previous = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
  } catch {
    // First run, or the file is unreadable: start from nothing.
  }

  const snapshot = await buildSnapshot({ previous, log: (line) => console.error(`[external-content] ${line}`) });
  const count = Object.keys(snapshot).length;
  if (check) {
    console.log(`[external-content] ${count} pages (not written)`);
    return;
  }
  fs.writeFileSync(OUTPUT, `${JSON.stringify(snapshot, null, 1)}\n`);
  console.log(`[external-content] Wrote ${count} pages to ${path.relative(process.cwd(), OUTPUT)}`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`[external-content] ${error.message}`);
    process.exit(1);
  });
}

module.exports = { SOURCES, buildSnapshot, decodeEntities, normalizeUrl, parsePage, parseSitemap };
