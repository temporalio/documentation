// Request parsing and card building for api/recommend.js. No I/O, so it can be
// unit tested without Kapa or Vercel. The leading underscore keeps Vercel from
// deploying this file as its own function. See readme/RECOMMEND.md.

const { DOCS_HOST, LIMITS: RETRIEVE_LIMITS, isAllowedResult, toMarkdownUrl, validResults } = require('./_retrieve-lib');

const ENDPOINT = `https://${DOCS_HOST}/api/recommend`;
const LEARN_HOST = 'learn.temporal.io';
const BLOG_HOST = 'temporal.io';

const LIMITS = { q: RETRIEVE_LIMITS.q, src: RETRIEVE_LIMITS.src, agent: RETRIEVE_LIMITS.agent, usecase: 100 };
const DEFAULT_LIMIT = 6;
const MAX_LIMIT = 10;

// Requests from the product UI send this src. It's logged and, with the agent,
// names the caller in Kapa analytics.
const DEFAULT_SRC = 'cloud-ui';

const USAGE =
  `GET ${ENDPOINT}?q=<topics>&limit=<1-${MAX_LIMIT}>&sdk=<sdk>&usecase=<text>&os=<os>&src=<surface>&agent=<name>. ` +
  `q is required (at most ${LIMITS.q} characters). limit defaults to ${DEFAULT_LIMIT}. ` +
  'sdk, usecase, and os describe the user. They are optional hints, not filters.';

// Appended to every card URL so visits from the panel show up in analytics.
const UTM_SOURCE = 'recommendation';

// The docs site's language and OS tab groups (groupId="language" and "os") read
// these query parameters and select that tab, so a docs card opens on the user's
// SDK and operating system. Pages without those tabs ignore them. The sdk and os
// values are already the tab values. Blog and Learn pages have no such tabs.
const LANGUAGE_PARAM = 'language';
const OS_PARAM = 'os';

// The sdk values match the folder names under docs/develop. Anything else a
// caller sends is mapped through SDK_ALIASES or ignored: these are hints, so an
// unexpected value shouldn't fail the request.
const SDK_NAMES = {
  python: 'Python',
  ruby: 'Ruby',
  rust: 'Rust',
  dotnet: '.NET',
  java: 'Java',
  typescript: 'TypeScript',
  php: 'PHP',
  go: 'Go',
};
const SDK_ALIASES = { '.net': 'dotnet', csharp: 'dotnet', 'c#': 'dotnet', node: 'typescript', nodejs: 'typescript', ts: 'typescript', javascript: 'typescript', js: 'typescript', golang: 'go', py: 'python' };

const OS_NAMES = { windows: 'Windows', linux: 'Linux', macos: 'macOS' };
const OS_ALIASES = { mac: 'macos', osx: 'macos', darwin: 'macos', win: 'windows', win32: 'windows' };

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

// Returns { q, limit, src, agent, sdk, usecase, os } or { error } for a 400. A limit that isn't a
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
  const known = (name, names, aliases) => {
    const value = get(name).toLowerCase();
    const key = aliases[value] || value;
    return Object.hasOwn(names, key) ? key : null;
  };
  return {
    params: {
      q,
      limit,
      src: optional('src') || DEFAULT_SRC,
      agent: optional('agent'),
      sdk: known('sdk', SDK_NAMES, SDK_ALIASES),
      usecase: optional('usecase'),
      os: known('os', OS_NAMES, OS_ALIASES),
    },
  };
}

// The text sent to Kapa: the topics first, then the user's SDK in parentheses.
// Kapa matches by meaning, so "using the Python SDK" swamps the topic with
// SDK setup pages, while a parenthetical keeps the topic and adds SDK pages. os
// is left out for the same reason (it pulls in "Set up a local environment"
// pages). It's still parsed and logged. The context only nudges results.
function buildQuery({ q, usecase = null, sdk = null }) {
  return [q, usecase && `for ${usecase}`, sdk && `(${SDK_NAMES[sdk]})`].filter(Boolean).join(' ');
}

// The SDK a docs page belongs to, from /develop/<sdk>/..., or null.
function sdkForPath(pathname) {
  const [, section, folder] = pathname.split('/');
  return section === 'develop' && Object.hasOwn(SDK_NAMES, folder) ? folder : null;
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
// `total` is how many cards there were before the limit. With an `sdk`, docs
// pages for a different SDK move after the rest, never out of the list.
// A result becomes a card only when its page has a title and description on
// record: docs pages in `manifest` (bin/write-content-manifest.js), and blog and
// Learn pages in `external` (bin/write-external-content.js). Everything else is
// counted in `skipped`, not returned.
//
// Kapa may have indexed a docs page under an old URL, so its path goes through
// the vercel.json redirects (via toMarkdownUrl) before the lookup. Anchors are
// dropped: a card links to the page, not to the passage that matched.
function toCards(results, { allowlist, manifest, external = {}, compiledRedirects, limit, sdk = null, os = null }) {
  const cards = [];
  const otherSdk = new Set();
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

    const card = { title: entry.title, description: entry.description, ...kind, url: cardUrl };
    cards.push(card);
    const cardSdk = isDocs ? sdkForPath(url.pathname) : null;
    if (sdk && cardSdk && cardSdk !== sdk) otherSdk.add(card);
  }

  const ordered = otherSdk.size ? [...cards.filter((card) => !otherSdk.has(card)), ...cards.filter((card) => otherSdk.has(card))] : cards;
  return { cards: ordered.slice(0, limit).map((card) => withParams(card, { sdk, os })), total: cards.length, skipped };
}

// utm_source goes on every card. language and os go on docs cards only, and only
// when the caller sent them.
function withParams(card, { sdk, os }) {
  const url = new URL(card.url);
  url.searchParams.set('utm_source', UTM_SOURCE);
  if (url.hostname === DOCS_HOST) {
    if (sdk) url.searchParams.set(LANGUAGE_PARAM, sdk);
    if (os) url.searchParams.set(OS_PARAM, os);
  }
  return { ...card, url: url.toString() };
}

module.exports = {
  DEFAULT_LIMIT,
  DEFAULT_SRC,
  ENDPOINT,
  LIMITS,
  MAX_LIMIT,
  USAGE,
  LANGUAGE_PARAM,
  OS_PARAM,
  UTM_SOURCE,
  buildQuery,
  parseParams,
  sdkForPath,
  toCards,
  typeForPath,
  typeForUrl,
};
