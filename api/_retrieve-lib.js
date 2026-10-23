// Request parsing and result shaping for api/retrieve.js. No I/O, so it can be
// unit tested without Kapa or Vercel. The leading underscore keeps Vercel from
// deploying this file as its own function.

const { followRedirects } = require('../bin/redirect-utils');

const DOCS_HOST = 'docs.temporal.io';
const ENDPOINT = `https://${DOCS_HOST}/api/retrieve`;

const LIMITS = { q: 500, jtb: 300, src: 32, agent: 64 };

const USAGE =
  `GET ${ENDPOINT}?q=<question>&jtb=<job-to-be-done>&src=<surface>&agent=<your-name>. ` +
  `q is required (at most ${LIMITS.q} characters). jtb, src, and agent are optional.`;

// Returns { params: { q, jtb, src, agent } } or { error } for a 400. Optional
// values that are too long are cut to their limit rather than rejected, since
// they're only logged. An unrecognized src is kept as sent: a surface we didn't
// expect is itself a result.
function parseParams(searchParams) {
  const get = (name) => (searchParams.get(name) || '').trim();

  const q = get('q');
  if (!q) {
    return { error: 'Pass a question as the q query parameter.' };
  }
  if (q.length > LIMITS.q) {
    return { error: `q is ${q.length} characters. Shorten the question to ${LIMITS.q} characters or fewer.` };
  }

  const optional = (name) => get(name).slice(0, LIMITS[name]) || null;
  return { params: { q, jtb: optional('jtb'), src: optional('src'), agent: optional('agent') } };
}

function parseDocsUrl(sourceUrl) {
  try {
    const url = new URL(sourceUrl);
    return url.hostname === DOCS_HOST ? url : null;
  } catch {
    return null;
  }
}

// Maps a docs page URL from Kapa to the current page's raw Markdown URL
// (`source_url`) and its HTML URL (`page_url`). Kapa may have indexed a page
// under an old URL, so this follows the vercel.json redirects first, the same
// way api/markdown-not-found.js does for `.md` requests.
//
// The anchor is kept on `page_url` only. A `.md` file served as text/markdown
// has no anchor targets.
//
// URLs on other hosts, and docs URLs with no Markdown version (files such as
// /sitemap.xml, and the tag pages Docusaurus generates), come back unchanged.
function toMarkdownUrl(sourceUrl, compiledRedirects) {
  const unchanged = { source_url: sourceUrl, page_url: sourceUrl };
  const url = parseDocsUrl(sourceUrl);
  if (!url) return unchanged;

  const result = followRedirects(url.pathname, compiledRedirects);
  if (result.external || result.loop || result.tooLong) return unchanged;

  const path = result.final;
  if (/\.[^/]*$/.test(path) || /^\/tags(\/|$)/.test(path)) return unchanged;

  const origin = `https://${DOCS_HOST}`;
  return {
    source_url: `${origin}${path === '/' ? '/index' : path}.md`,
    page_url: `${origin}${path}${url.hash}`,
  };
}

// Kapa returns [{ content, source_url }], most relevant first. Adds page_url
// and points source_url at the Markdown version.
function shapeResults(results, compiledRedirects) {
  return results.map((result) => ({
    content: result.content,
    ...toMarkdownUrl(result.source_url, compiledRedirects),
  }));
}

// A comma-separated env var as a list, ignoring spaces and empty entries.
function parseIdList(value) {
  return (value || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
}

module.exports = { DOCS_HOST, ENDPOINT, LIMITS, USAGE, parseIdList, parseParams, toMarkdownUrl, shapeResults };
