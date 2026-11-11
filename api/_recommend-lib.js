// Request parsing and card building for api/recommend.js. No I/O, so it can be
// unit tested without Kapa or Vercel. The leading underscore keeps Vercel from
// deploying this file as its own function. See readme/RECOMMEND.md.

const { DOCS_HOST, LIMITS: RETRIEVE_LIMITS, isAllowedResult, toMarkdownUrl, validResults } = require('./_retrieve-lib');

const ENDPOINT = `https://${DOCS_HOST}/api/recommend`;
const LEARN_HOST = 'learn.temporal.io';
const BLOG_HOST = 'temporal.io';

const LIMITS = { q: RETRIEVE_LIMITS.q, src: RETRIEVE_LIMITS.src, agent: RETRIEVE_LIMITS.agent };
const DEFAULT_LIMIT = 6;
const MAX_LIMIT = 10;

// Requests from the product UI send this src. It's logged and, with the agent,
// names the caller in Kapa analytics.
const DEFAULT_SRC = 'cloud-ui';

const USAGE =
  `GET ${ENDPOINT}?q=<topics>&limit=<1-${MAX_LIMIT}>&src=<surface>&agent=<name>. ` +
  `q is required (at most ${LIMITS.q} characters). limit defaults to ${DEFAULT_LIMIT}.`;

// Docs pages: the first matching prefix wins, so list the more specific paths
// first. Learn and the blog aren't docs pages. Their type comes from the host,
// in typeForUrl.
const TYPE_RULES = [
  { prefix: '/guides', type: 'guide', label: 'Guide' },
  { prefix: '/quickstarts', type: 'tutorial', label: 'Tutorial' },
  { prefix: '/develop', type: 'how-to', label: 'How-to' },
  { prefix: '/references', type: 'reference', label: 'Reference' },
  { prefix: '/cli', type: 'reference', label: 'Reference' },
];
const DEFAULT_TYPE = { type: 'docs', label: 'Docs' };

// Returns { q, limit, src, agent } or { error } for a 400. A limit that isn't a
// whole number from 1 to MAX_LIMIT is rejected, not clamped, so a typo shows up.
function parseParams(searchParams) {
  const get = (name) => (searchParams.get(name) || '').trim();

  const q = get('q');
  if (!q) return { error: 'Pass the topics as the q query parameter.' };
  if (q.length > LIMITS.q) {
    return { error: `q is ${q.length} characters. Shorten it to ${LIMITS.q} characters or fewer.` };
  }

  let limit = DEFAULT_LIMIT;
  const rawLimit = get('limit');
  if (rawLimit) {
    limit = Number(rawLimit);
    if (!Number.isInteger(limit) || limit < 1 || limit > MAX_LIMIT) {
      return { error: `limit must be a whole number from 1 to ${MAX_LIMIT}.` };
    }
  }

  const optional = (name) => get(name).slice(0, LIMITS[name]) || null;
  return { params: { q, limit, src: optional('src') || DEFAULT_SRC, agent: optional('agent') } };
}

function typeForPath(pathname) {
  const rule = TYPE_RULES.find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  return rule ? { type: rule.type, type_label: rule.label } : { type: DEFAULT_TYPE.type, type_label: DEFAULT_TYPE.label };
}

// Every Learn page is shown as a Tutorial, and every temporal.io/blog post as a
// Blog. Docs pages go by path. Returns null for a host that has no card type.
function typeForUrl(url) {
  if (url.hostname === DOCS_HOST) return typeForPath(url.pathname);
  if (url.hostname === LEARN_HOST) return { type: 'tutorial', type_label: 'Tutorial' };
  if (url.hostname === BLOG_HOST && url.pathname.startsWith('/blog/')) return { type: 'blog', type_label: 'Blog' };
  return null;
}

// Same key as bin/write-external-content.js: no anchor, query, or trailing slash.
function externalKey(url) {
  const pathname = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : url.pathname;
  return `${url.protocol}//${url.hostname.toLowerCase()}${pathname}`;
}

// Turns Kapa results into at most `limit` cards, one per page, in Kapa's order.
// A result becomes a card only when its page has a title and description on
// record: docs pages in `manifest` (bin/write-content-manifest.js), and blog and
// Learn pages in `external` (bin/write-external-content.js). Everything else is
// counted in `skipped`, not returned.
//
// Kapa may have indexed a docs page under an old URL, so its path goes through
// the vercel.json redirects (via toMarkdownUrl) before the lookup. Anchors are
// dropped: a card links to the page, not to the passage that matched.
function toCards(results, { allowlist, manifest, external = {}, compiledRedirects, limit }) {
  const cards = [];
  const seen = new Set();
  let skipped = 0;

  for (const result of validResults(results)) {
    if (!isAllowedResult(result, allowlist)) {
      skipped++;
      continue;
    }
    const { page_url: pageUrl } = toMarkdownUrl(result.source_url, compiledRedirects);
    let url;
    try {
      url = new URL(pageUrl);
    } catch {
      skipped++;
      continue;
    }
    const kind = typeForUrl(url);
    const isDocs = url.hostname === DOCS_HOST;
    const entry = kind && (isDocs ? manifest[url.pathname] : external[externalKey(url)]);
    if (!entry) {
      skipped++;
      continue;
    }
    const cardUrl = isDocs ? `https://${DOCS_HOST}${url.pathname}` : entry.url;
    if (seen.has(cardUrl)) continue;
    seen.add(cardUrl);

    cards.push({ title: entry.title, description: entry.description, ...kind, url: cardUrl });
    if (cards.length === limit) break;
  }
  return { cards, skipped };
}

module.exports = {
  DEFAULT_LIMIT,
  DEFAULT_SRC,
  ENDPOINT,
  LIMITS,
  MAX_LIMIT,
  USAGE,
  parseParams,
  toCards,
  typeForPath,
  typeForUrl,
};
