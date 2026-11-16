// Suggested pages for a missing docs URL: the request path is turned into a
// search string, Algolia is asked about it, and the top results come back as
// links. Shared by api/not-found.js (HTML) and api/markdown-not-found.js.
// The leading underscore keeps Vercel from deploying this file as its own
// function. See readme/NOT-FOUND-SUGGESTIONS.md.

const { ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY, ALGOLIA_INDEX_NAME } = require('../src/constants/algolia');

const SITE = 'https://docs.temporal.io';
const MAX_WORDS = 8;
const MAX_QUERY_LENGTH = 100;
const MAX_SUGGESTIONS = 4;
const SEARCH_TIMEOUT_MS = 2000;

// The values of the index's `sdk_language` facet, which is also the URL segment
// of an SDK's pages (/develop/php/...).
const SDK_LANGUAGES = ['python', 'typescript', 'java', 'go', 'dotnet', 'ruby', 'php', 'rust'];

// utm_term is left out on purpose: it would copy the search string derived from
// the requested path into every analytics URL.
const UTM = {
  utm_source: 'docs-404',
  utm_medium: 'suggestion',
  utm_campaign: '404-suggestions',
};

// "/develop/python/workflow-versioning.md" -> "develop python workflow versioning".
// Splits on anything that isn't a letter or digit, drops numbers (version
// numbers and dates match too many pages), and removes repeated words.
function pathToQuery(pathname) {
  let path = String(pathname || '');
  try {
    path = decodeURIComponent(path);
  } catch {
    // A malformed escape such as "%E0%A4%A" is searched as written.
  }
  path = path.replace(/\.(md|html?)$/i, '');

  const seen = new Set();
  const words = [];
  for (const word of path.toLowerCase().split(/[^\p{L}\p{N}]+/u)) {
    if (!word || /^\d+$/.test(word) || seen.has(word)) continue;
    seen.add(word);
    words.push(word);
    if (words.length === MAX_WORDS) break;
  }
  return words.join(' ').slice(0, MAX_QUERY_LENGTH).trim();
}

// Builds the Algolia search for a missing path.
// - The last path segment is the page name, so its words are required. Words
//   from the segments above it ("develop", "workflows") are optional: they
//   rarely appear in a title, and as required words they outvote a misspelled
//   page name.
// - When a whole segment names an SDK (/develop/php/basics), that language
//   becomes a filter and leaves the text query, so "php" can't be dropped as an
//   unmatched word and the results stay in that SDK. Only whole segments count,
//   so a word like "go" inside a longer slug doesn't.
function pathToSearch(pathname) {
  const segments = String(pathname || '')
    .toLowerCase()
    .split('/')
    .map((segment) => segment.replace(/\.(md|html?)$/, ''))
    .filter(Boolean);
  const language = SDK_LANGUAGES.find((candidate) => segments.includes(candidate));

  let words = pathToQuery(pathname).split(' ').filter(Boolean);
  // Nothing else to search for ("/php"), so search for the language itself.
  const sdkLanguage = language && words.some((word) => word !== language) ? language : null;
  if (sdkLanguage) words = words.filter((word) => word !== sdkLanguage);

  const pageSegment = segments.filter((segment) => segment !== sdkLanguage).pop() || '';
  const pageWords = new Set(pathToQuery(`/${pageSegment}`).split(' '));
  const optionalWords = words.filter((word) => !pageWords.has(word));

  // With every word optional, Algolia would match any one of them.
  return { query: words.join(' '), sdkLanguage, optionalWords: optionalWords.length < words.length ? optionalWords : [] };
}

// Drops query string and anchor, and a trailing slash, so the same page found
// through two sections of the index counts once.
function pageUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.origin !== SITE) return null;
  const path = parsed.pathname.replace(/\/+$/, '') || '/';
  return `${SITE}${path === '/' ? '' : path}`;
}

// DocSearch records the page title at lvl1, or at lvl0 for a page whose title
// is the section name. Algolia pads headings with zero-width spaces and keeps
// them HTML-escaped, so they're decoded here and escaped again on output.
const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" };

function titleOf(hierarchy) {
  const clean = (value) =>
    typeof value === 'string'
      ? value
          .replace(/[\u200B-\u200D\uFEFF]/g, '')
          .replace(/&(amp|lt|gt|quot|#39);/g, (entity) => ENTITIES[entity])
          .trim()
      : '';
  const lvl0 = clean(hierarchy && hierarchy.lvl0);
  const lvl1 = clean(hierarchy && hierarchy.lvl1);
  // "PHP SDK" above "PHP SDK developer guide" says the same thing twice.
  if (lvl0 && lvl1 && !lvl1.toLowerCase().includes(lvl0.toLowerCase())) return `${lvl0}: ${lvl1}`;
  return lvl1 || lvl0;
}

// True when Algolia matched any query word in that heading level.
function matched(hit, level) {
  const result = hit && hit._highlightResult && hit._highlightResult.hierarchy && hit._highlightResult.hierarchy[level];
  return Boolean(result) && result.matchLevel !== 'none';
}

// Keeps the first (best-ranked) hit for each docs page, skipping the page that
// was asked for. Hits from other sites in the index, such as the courses site,
// are dropped. Only the page title (H1) and H2 headings are searched. A hit
// whose H1 matched suggests the page. A hit that matched only in an H2 suggests
// that section, titled "Page: Section" and linked to its anchor, so the reader
// can see why the page was offered.
function pickSuggestions(hits, requestedPath, limit = MAX_SUGGESTIONS) {
  const requested = pageUrl(`${SITE}${requestedPath}`);
  const seen = new Set();
  const picked = [];
  for (const hit of Array.isArray(hits) ? hits : []) {
    const url = pageUrl(hit && (hit.url_without_anchor || hit.url));
    if (!url || url === requested || seen.has(url)) continue;

    const hierarchy = (hit && hit.hierarchy) || {};
    const h2 = titleOf({ lvl1: hierarchy.lvl2 });
    const h2Only = Boolean(h2) && matched(hit, 'lvl2') && !matched(hit, 'lvl1');
    const page = titleOf({ lvl1: hierarchy.lvl1 });
    let title = h2Only ? `${page}: ${h2}` : titleOf(hierarchy);
    // An SDK page's title doesn't say which SDK ("Workflow basics"), so lead
    // with the index's section name ("PHP SDK") in place of the generic
    // section, unless the title already names it.
    const sdk = hit && hit.sdk_language && titleOf({ lvl1: hit.section_title });
    if (sdk && page && !page.toLowerCase().includes(sdk.toLowerCase())) {
      title = h2Only ? `${sdk}: ${page}: ${h2}` : `${sdk}: ${page}`;
    }
    if (!title) continue;

    let target = url;
    if (h2Only) {
      const anchor = typeof hit.anchor === 'string' ? hit.anchor : new URL(hit.url, SITE).hash.slice(1);
      if (/^[\w.-]+$/.test(anchor)) target = `${url}#${anchor}`;
    }
    seen.add(url);
    picked.push({ url: target, title });
    if (picked.length === limit) break;
  }
  return picked;
}

// Adds the UTM parameters that mark a visit as coming from a 404 suggestion.
// `rank` is the 1-based position in the list.
function withUtm(url, rank) {
  const target = new URL(url);
  for (const [key, value] of Object.entries(UTM)) target.searchParams.set(key, value);
  target.searchParams.set('utm_content', String(rank));
  return target.toString();
}

// Any failure, including a timeout, returns no suggestions so the 404 page is
// never worse than it was.
async function searchSuggestions(pathname, { fetchImpl = fetch } = {}) {
  const { query, sdkLanguage, optionalWords } = pathToSearch(pathname);
  if (!query) return [];

  try {
    const response = await fetchImpl(`https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX_NAME}/query`, {
      method: 'POST',
      headers: {
        'X-Algolia-Application-Id': ALGOLIA_APP_ID,
        'X-Algolia-API-Key': ALGOLIA_SEARCH_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        // Room for hits from other sites in the index (the courses site), which
        // are dropped afterwards.
        hitsPerPage: 30,
        ...(optionalWords.length ? { optionalWords } : {}),
        ...(sdkLanguage ? { facetFilters: [`sdk_language:${sdkLanguage}`] } : {}),
        // Match page titles (H1) and H2 headings only. Body text and deeper
        // headings matched too loosely: "durable timer" suggested Schedules.
        restrictSearchableAttributes: ['hierarchy.lvl1', 'hierarchy.lvl2'],
        attributesToRetrieve: ['url', 'url_without_anchor', 'anchor', 'hierarchy', 'section_title', 'sdk_language'],
        attributesToHighlight: ['hierarchy.lvl1', 'hierarchy.lvl2'],
        attributesToSnippet: [],
      }),
      signal: AbortSignal.timeout(SEARCH_TIMEOUT_MS),
    });
    if (!response.ok) return [];
    const { hits } = await response.json();
    return pickSuggestions(hits, pathname);
  } catch {
    return [];
  }
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function toMarkdownList(suggestions) {
  return suggestions.map((s, i) => `- [${s.title.replace(/[[\]]/g, '\\$&')}](${withUtm(s.url, i + 1)})`).join('\n');
}

// A block for the 404 page. The same data goes into a JSON script so the page's
// React code can render the list in place and hide this block, which sits after
// the page body in the raw HTML.
function toHtmlBlock(suggestions) {
  if (suggestions.length === 0) return '';
  const items = suggestions
    .map((s, i) => `<li><a href="${escapeHtml(withUtm(s.url, i + 1))}">${escapeHtml(s.title)}</a></li>`)
    .join('');
  // "<" is escaped so a title can't close the script element.
  const data = JSON.stringify(suggestions.map((s, i) => ({ title: s.title, url: withUtm(s.url, i + 1) }))).replace(
    /</g,
    '\\u003c',
  );
  return (
    `<nav id="not-found-suggestions" aria-label="Suggested pages" style="max-width:40rem;margin:2rem auto;padding:0 1rem">` +
    `<h2>Pages you might be looking for</h2><ul>${items}</ul></nav>` +
    `<script id="not-found-suggestions-data" type="application/json">${data}</script>`
  );
}

// The host to fetch the static 404 page from. It must be the deployment that
// is answering, because the page names that build's JavaScript files, and a
// preview's differ from production's. Production always uses docs.temporal.io.
// Other environments (preview deployments, `vercel dev`) use the request's
// host, so long as it is a plain hostname. Those deployments only run code from
// the repository's own branches.
function pageHost(headers, vercelEnv) {
  if (vercelEnv === 'production') return 'docs.temporal.io';
  const raw = headers['x-forwarded-host'] || headers.host;
  const host = String(Array.isArray(raw) ? raw[0] : raw || '')
    .split(',')[0]
    .trim();
  return /^[a-z0-9]([a-z0-9.-]*[a-z0-9])?(:\d{1,5})?$/i.test(host) ? host : 'docs.temporal.io';
}

// Puts the block just before </body>, or at the end if the page has none.
function injectIntoHtml(html, block) {
  if (!block) return html;
  const index = html.lastIndexOf('</body>');
  return index === -1 ? html + block : html.slice(0, index) + block + html.slice(index);
}

module.exports = { injectIntoHtml, pageHost, pathToQuery, pathToSearch, pickSuggestions, searchSuggestions, toHtmlBlock, toMarkdownList, withUtm };
