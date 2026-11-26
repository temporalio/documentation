#!/usr/bin/env node
// Daily canary for the /api/retrieve agent search endpoint. Asks two fixed
// questions and fails when the endpoint is down or its results have lost a kind
// of source they should include.
//
// Both kinds of failure have happened without a deploy on our side. On
// 2026-10-30 Kapa started rejecting a request that names a deleted source, so
// every call returned 502. Kapa also started applying source_ids_include as a
// filter, which silently dropped custom Q&A answers and GitHub results. The
// first question catches both an outage and lost custom Q&A answers; the second
// catches lost GitHub repository files.
//
// Two freshness checks then ask for the newest temporal.io blog post and the
// newest docs page that are at least three days old, and fail when the post or
// page isn't in the results. From 2026-03 to 2026-11 the blog's Kapa web crawl
// source accepted 0 pages on every refresh, because a site redesign removed the
// element its selectors required, and Kapa sent no alert. The fixed questions
// above couldn't see that, since the index still held the March snapshot.
//
// Each request carries src=healthcheck, so the request log report can leave it
// out, and an agent value unique to the run, so the CDN can't answer from a
// cached response and the function runs every time.
//
// The docs check reads git history to find the newest page, because the docs
// sitemap has no <lastmod>. Run it from a clone with history (in CI,
// fetch-depth: 0).
//
// Usage: node bin/check-retrieve-health.js [baseUrl]
//   baseUrl defaults to https://docs.temporal.io. Exits 1 when a check fails.

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const BASE_URL = (process.argv[2] || 'https://docs.temporal.io').replace(/\/+$/, '');
const PAUSE_MS = 4_000;
const TIMEOUT_MS = 20_000;

const REPO_ROOT = path.join(__dirname, '..');
const BLOG_SITEMAP = 'https://temporal.io/sitemap.xml';
const DOCS_ORIGIN = 'https://docs.temporal.io';
const DOCS_SITEMAP = `${DOCS_ORIGIN}/sitemap.xml`;
const DAY_MS = 24 * 60 * 60 * 1000;
// Kapa refreshes web crawl sources daily, so three days gives it at least two
// chances to pick up a new page.
const MIN_AGE_DAYS = 3;
// How far back git history is searched for a new docs page.
const DOCS_LOOKBACK_DAYS = 120;
// Blog pages fetched to read their publish dates, at most, per run.
const MAX_BLOG_FETCHES = 20;

const STALE_SOURCE =
  'This usually means the Kapa web crawl source has stopped ingesting new pages: the site markup changed and the ' +
  "source's selectors no longer match, so every refresh accepts 0 pages, or a refresh is waiting in Kapa's review " +
  'queue. Kapa sends no notification for either. Open the source in the Kapa dashboard and look for a "Needs review" ' +
  'badge, or a recent refresh that accepted 0 pages.';

const CHECKS = [
  {
    question: 'free credits temporal cloud',
    minResults: 5,
    missing: 'No result is a custom Q&A answer (empty source_url).',
    matches: (result) => result.source_url === '',
    ifMissing:
      'The curated Temporal Cloud pricing answer is in Kapa as custom Q&A. It goes missing when Kapa applies a ' +
      'source filter, or when the custom Q&A source is removed.',
  },
  {
    question: 'rust sdk workflow determinism',
    minResults: 5,
    missing: 'No result is a file in a github.com/temporalio repository.',
    // A file (/blob/), not a release page: the SDK release notes are web crawl
    // sources, so they still come back when Kapa filters to web crawls.
    matches: (result) => /^https:\/\/github\.com\/temporalio\/[^/]+\/blob\//.test(result.source_url),
    ifMissing:
      'GitHub results go missing when Kapa applies a source filter, when the GitHub file sources are removed, ' +
      'or when RETRIEVE_URL_ALLOWLIST loses the github.com/temporalio/sdk-* entries.',
  },
];

// Returns the problems with a response that isn't a 200 with a JSON array, or
// [] when it is. `response` is { status, body } or { error } for a request that
// failed.
function responseProblems(response) {
  if (response.error) return [`Request failed: ${response.error}`];
  if (response.status !== 200) {
    const detail = typeof response.body === 'string' ? response.body : JSON.stringify(response.body);
    return [
      `HTTP ${response.status}: ${(detail || '').slice(0, 200)}. For a 502, find "retrieve: Kapa returned" in the ` +
        "Vercel runtime logs for /api/retrieve, which gives Kapa's status and reason.",
    ];
  }
  if (!Array.isArray(response.body)) return ['The response is not a JSON array.'];
  return [];
}

// Returns the problems with one check's response, or [] when it passed.
function evaluate(check, response) {
  const invalid = responseProblems(response);
  if (invalid.length > 0) return invalid;

  const problems = [];
  if (response.body.length < check.minResults) {
    problems.push(`${response.body.length} results, expected at least ${check.minResults}.`);
  }
  const valid = response.body.filter((result) => result && typeof result.source_url === 'string');
  if (!valid.some(check.matches)) problems.push(`${check.missing} ${check.ifMissing}`);
  return problems;
}

// --- Freshness checks ---

// Reduces a URL to origin and path, so a result's heading anchor, query, trailing
// slash, or .md suffix (docs results point at the Markdown copy) doesn't stop it
// matching the page.
function normalizeUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`.replace(/\.md$/, '').replace(/\/+$/, '').toLowerCase();
  } catch {
    return '';
  }
}

const isoDate = (ms) => new Date(ms).toISOString().slice(0, 10);

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, name) => {
    if (name[0] === '#') {
      const code = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return ENTITIES[name.toLowerCase()] ?? match;
  });
}

// Returns [{ loc, lastmod }] from a sitemap, with lastmod in milliseconds or
// null when the entry has none.
function parseSitemap(xml) {
  const entries = [];
  for (const [, body] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = /<loc>\s*([^<]+?)\s*<\/loc>/.exec(body);
    if (!loc) continue;
    const lastmod = /<lastmod>\s*([^<]+?)\s*<\/lastmod>/.exec(body);
    const ms = lastmod ? Date.parse(lastmod[1]) : NaN;
    entries.push({ loc: decodeEntities(loc[1]), lastmod: Number.isNaN(ms) ? null : ms });
  }
  return entries;
}

// Blog posts from the temporal.io sitemap, most recently modified first.
function blogCandidates(entries) {
  return entries
    .filter((entry) => /^https:\/\/temporal\.io\/blog\/[^/?#]+$/.test(entry.loc))
    .sort((a, b) => (b.lastmod ?? -Infinity) - (a.lastmod ?? -Infinity));
}

// Reads the title (without the " | Temporal" suffix) and the JSON-LD
// datePublished from a blog post's HTML.
function parseBlogPost(html) {
  const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  let published = null;
  for (const [, json] of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    const date = /"datePublished"\s*:\s*"([^"]+)"/.exec(json);
    const ms = date ? Date.parse(date[1]) : NaN;
    if (!Number.isNaN(ms)) {
      published = ms;
      break;
    }
  }
  return {
    title: title
      ? decodeEntities(title[1])
          .replace(/\s+/g, ' ')
          .replace(/\s*\|\s*Temporal\s*$/, '')
          .trim()
      : '',
    published,
  };
}

// Picks the newest blog post, by JSON-LD datePublished, that's at least
// MIN_AGE_DAYS old. The sitemap's lastmod is the publish date or a later edit,
// never earlier, so pages are fetched newest lastmod first, and the search stops
// once lastmod falls behind the best publish date found. Returns
// { url, title, published } or { problem }.
async function pickBlogPost(entries, fetchPage, now, maxFetches = MAX_BLOG_FETCHES) {
  const cutoff = now - MIN_AGE_DAYS * DAY_MS;
  const candidates = blogCandidates(entries);
  if (candidates.length === 0) return { problem: `${BLOG_SITEMAP} lists no /blog/ posts.` };

  let best = null;
  let fetched = 0;
  const errors = [];
  for (const candidate of candidates) {
    if (best && (candidate.lastmod === null || candidate.lastmod < best.published)) break;
    if (fetched >= maxFetches) break;
    fetched += 1;
    let html;
    try {
      html = await fetchPage(candidate.loc);
    } catch (err) {
      errors.push(`${candidate.loc}: ${err.message}`);
      continue;
    }
    const post = parseBlogPost(html);
    if (!post.title || post.published === null) {
      errors.push(`${candidate.loc}: no <title> or JSON-LD datePublished`);
      continue;
    }
    if (post.published > cutoff) continue;
    if (!best || post.published > best.published) {
      best = { url: candidate.loc, title: post.title, published: post.published };
    }
  }
  if (best) return best;
  const detail = errors.length > 0 ? ` ${errors.slice(0, 3).join('; ')}` : '';
  return {
    problem:
      `Couldn't find a blog post at least ${MIN_AGE_DAYS} days old among the ${fetched} most recently modified in ` +
      `${BLOG_SITEMAP}.${detail}`,
  };
}

// Reads the frontmatter keys that decide a docs page's URL, title, and
// visibility. Values are single-line scalars in this repository.
function parseFrontmatter(text) {
  const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  const frontmatter = {};
  if (!block) return frontmatter;
  for (const line of block[1].split(/\r?\n/)) {
    const pair = /^(id|slug|title|unlisted|draft):\s*(.*?)\s*$/.exec(line);
    if (!pair) continue;
    let value = pair[2];
    if (/^'.*'$/.test(value)) value = value.slice(1, -1).replace(/''/g, "'");
    else if (/^".*"$/.test(value)) value = value.slice(1, -1).replace(/\\"/g, '"');
    frontmatter[pair[1]] = pair[1] === 'unlisted' || pair[1] === 'draft' ? value === 'true' : value;
  }
  return frontmatter;
}

const stripNumberPrefix = (segment) => segment.replace(/^\d+[-_.]/, '');

// A section's landing page. Its title tends to be a generic section name.
function isIndexPage(file) {
  const parts = file.split('/');
  const name = parts[parts.length - 1].replace(/\.mdx?$/, '');
  return /^(index|readme)$/i.test(name) || name === parts[parts.length - 2];
}

// The URL Docusaurus serves a page under docs/ at. `file` is relative to docs/.
function docUrl(file, frontmatter) {
  const parts = file.split('/');
  const name = stripNumberPrefix(parts.pop().replace(/\.mdx?$/, ''));
  const dir = parts.map(stripNumberPrefix).join('/');
  const dirPath = dir ? `/${dir}` : '';
  let urlPath;
  if (frontmatter.slug) {
    urlPath = frontmatter.slug.startsWith('/') ? frontmatter.slug : `${dirPath}/${frontmatter.slug}`;
  } else {
    urlPath = `${dirPath}/${frontmatter.id || name}`;
  }
  return `${DOCS_ORIGIN}${urlPath.replace(/\/+$/, '')}`;
}

// Parses `git log --format=%x01%cI --name-only` into [{ date, file }], newest
// first, keeping Markdown pages under docs/.
function parseAddedDocs(gitOutput) {
  const added = [];
  for (const commit of gitOutput.split('\x01')) {
    const [dateLine, ...files] = commit.split('\n');
    const date = Date.parse(dateLine.trim());
    if (Number.isNaN(date)) continue;
    for (const file of files.map((line) => line.trim())) {
      if (/^docs\/.+\.mdx?$/.test(file)) added.push({ date, file });
    }
  }
  return added;
}

function gitAddedDocs(now) {
  const since = new Date(now - DOCS_LOOKBACK_DAYS * DAY_MS).toISOString();
  // --no-renames, so the log doesn't need file contents to detect renames, which
  // a blobless CI clone would have to download.
  const output = execFileSync(
    'git',
    ['log', '--no-renames', '--diff-filter=A', '--format=%x01%cI', '--name-only', `--since=${since}`, '--', 'docs/'],
    { cwd: REPO_ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
  );
  return parseAddedDocs(output);
}

// How many pages under docs/ use each title, lowercased.
function docsTitleCounts() {
  const docsDir = path.join(REPO_ROOT, 'docs');
  const counts = new Map();
  for (const file of fs.readdirSync(docsDir, { recursive: true })) {
    if (!/\.mdx?$/.test(file)) continue;
    const { title } = parseFrontmatter(fs.readFileSync(path.join(docsDir, file), 'utf8'));
    if (title) counts.set(title.toLowerCase(), (counts.get(title.toLowerCase()) || 0) + 1);
  }
  return counts;
}

// Picks the newest page added under docs/ at least MIN_AGE_DAYS ago, skipping
// partials, index pages, unlisted and draft pages, pages whose title another page
// shares (one per SDK, for example), and pages the live sitemap doesn't list.
// `readDoc(file)` returns the file's text or null. Returns
// { url, title, published, file } or { problem }.
function pickDocsPage({ added, sitemapUrls, readDoc, titleCounts, now }) {
  const cutoff = now - MIN_AGE_DAYS * DAY_MS;
  if (added.length === 0) {
    return {
      problem:
        `git history shows no page added under docs/ in the last ${DOCS_LOOKBACK_DAYS} days. A shallow clone has ` +
        'no history to read: check out with fetch-depth: 0.',
    };
  }
  for (const { date, file } of added) {
    if (date > cutoff) continue;
    const relative = file.replace(/^docs\//, '');
    if (isIndexPage(relative) || /(^|\/)_/.test(relative)) continue;
    const text = readDoc(file);
    if (text === null) continue;
    const frontmatter = parseFrontmatter(text);
    if (!frontmatter.title || frontmatter.unlisted || frontmatter.draft) continue;
    if ((titleCounts.get(frontmatter.title.toLowerCase()) || 0) > 1) continue;
    const url = docUrl(relative, frontmatter);
    if (!sitemapUrls.has(normalizeUrl(url))) continue;
    return { url, title: frontmatter.title, published: date, file };
  }
  return {
    problem:
      `None of the ${added.length} pages added under docs/ in the last ${DOCS_LOOKBACK_DAYS} days is at least ` +
      `${MIN_AGE_DAYS} days old, listed in ${DOCS_SITEMAP}, and titled distinctively.`,
  };
}

const FRESHNESS_CHECKS = [
  {
    name: 'temporal.io blog',
    source: 'temporal.io/blog',
    async pick(now) {
      const entries = parseSitemap(await fetchText(BLOG_SITEMAP));
      return pickBlogPost(entries, fetchText, now);
    },
  },
  {
    name: 'docs.temporal.io',
    source: 'docs.temporal.io',
    async pick(now) {
      const entries = parseSitemap(await fetchText(DOCS_SITEMAP));
      return pickDocsPage({
        added: gitAddedDocs(now),
        sitemapUrls: new Set(entries.map((entry) => normalizeUrl(entry.loc))),
        readDoc: (file) => {
          try {
            return fs.readFileSync(path.join(REPO_ROOT, file), 'utf8');
          } catch {
            return null;
          }
        },
        titleCounts: docsTitleCounts(),
        now,
      });
    },
  },
];

// Returns the problems with the response to a question for `target`'s title, or
// [] when a result is that page.
function evaluateFreshness(check, target, response) {
  const invalid = responseProblems(response);
  if (invalid.length > 0) return invalid;
  const want = normalizeUrl(target.url);
  const found = response.body.some(
    (result) =>
      result &&
      [result.source_url, result.page_url].some((url) => typeof url === 'string' && normalizeUrl(url) === want)
  );
  if (found) return [];
  return [
    `No result is ${target.url}, published ${isoDate(target.published)}. ${STALE_SOURCE} The source to check is ` +
      `the ${check.source} web crawl.`,
  ];
}

async function fetchText(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.text();
}

async function ask(question, runId) {
  const params = new URLSearchParams({ q: question, src: 'healthcheck', agent: `healthcheck-${runId}` });
  try {
    const res = await fetch(`${BASE_URL}/api/retrieve?${params}`, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    const text = await res.text();
    let body = text;
    try {
      body = JSON.parse(text);
    } catch {
      // Leave a non-JSON body as text for the report.
    }
    return { status: res.status, body };
  } catch (err) {
    return { error: err.message };
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const runId = process.env.GITHUB_RUN_ID || Date.now().toString(36);
  const lines = [`## /api/retrieve health check`, '', `Endpoint: ${BASE_URL}/api/retrieve`, ''];
  let failed = false;

  for (const [index, check] of CHECKS.entries()) {
    if (index > 0) await sleep(PAUSE_MS);
    const response = await ask(check.question, runId);
    const problems = evaluate(check, response);
    const count = Array.isArray(response.body) ? `, ${response.body.length} results` : '';
    if (problems.length === 0) {
      lines.push(`- PASS "${check.question}" (HTTP ${response.status}${count})`);
    } else {
      failed = true;
      lines.push(`- FAIL "${check.question}"${count}`);
      for (const problem of problems) lines.push(`  - ${problem}`);
    }
  }

  lines.push('', 'Freshness: is the newest page at least 3 days old in the results?', '');
  const now = Date.now();
  for (const check of FRESHNESS_CHECKS) {
    let target;
    try {
      target = await check.pick(now);
    } catch (err) {
      target = { problem: `Couldn't pick a page to ask for: ${err.message}` };
    }
    if (target.problem) {
      failed = true;
      lines.push(`- FAIL ${check.name}: couldn't pick a page to ask for`, `  - ${target.problem}`);
      continue;
    }
    await sleep(PAUSE_MS);
    const response = await ask(target.title, runId);
    const problems = evaluateFreshness(check, target, response);
    const label = `${check.name} "${target.title}" (${isoDate(target.published)})`;
    if (problems.length === 0) {
      lines.push(`- PASS ${label}`);
    } else {
      failed = true;
      lines.push(`- FAIL ${label}`);
      for (const problem of problems) lines.push(`  - ${problem}`);
    }
  }

  const report = lines.join('\n');
  console.log(report);
  if (process.env.GITHUB_STEP_SUMMARY) {
    require('fs').appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${report}\n`);
  }
  if (failed) process.exitCode = 1;
}

if (require.main === module) main();

module.exports = {
  CHECKS,
  FRESHNESS_CHECKS,
  evaluate,
  evaluateFreshness,
  normalizeUrl,
  parseSitemap,
  blogCandidates,
  parseBlogPost,
  pickBlogPost,
  parseFrontmatter,
  isIndexPage,
  docUrl,
  parseAddedDocs,
  pickDocsPage,
};
