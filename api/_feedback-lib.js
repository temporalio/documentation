// Submission parsing, page URL normalization, and entry identifiers for
// api/feedback.js. No I/O, so it can be unit tested without Blob or Vercel.
// The leading underscore keeps Vercel from deploying this file as its own
// function.

const crypto = require('crypto');
const { followRedirects } = require('../bin/redirect-utils');

const DOCS_HOST = 'docs.temporal.io';
const ORIGIN = `https://${DOCS_HOST}`;
const ENDPOINT = `${ORIGIN}/api/feedback`;

// Text fields over their limit are rejected, so the sender can shorten them
// instead of losing the end of a report. Metadata fields (agent, src,
// product_version) are cut, as in api/retrieve.js, since they're only labels.
const LIMITS = {
  title: 120,
  message: 2000,
  expected: 1000,
  context: 1000,
  comment: 1000,
  page_url: 300,
  product_version: 64,
  agent: 64,
  src: 32,
  // Enum values and IDs, cut before they're checked.
  category: 32,
  severity: 16,
  rating: 8,
  reason: 32,
  id: 64,
  amend_token: 64,
};
const REJECT_OVER_LIMIT = ['title', 'message', 'expected', 'context', 'comment', 'page_url'];

// The agent categories and severities match the Temporal Docs MCP server's
// give_feedback tool, so reports from both can be read together.
const CATEGORIES = ['documentation', 'docs_search', 'product', 'other'];
const SEVERITIES = ['high', 'medium', 'low'];
const RATINGS = ['up', 'down'];
const REASONS = {
  up: ['accurate', 'solved_problem', 'easy_to_understand', 'helped_decide', 'other'],
  down: ['inaccurate', 'not_found', 'hard_to_understand', 'code_sample_errors', 'other'],
};

// How long after the rating the widget can add a reason or comment.
const AMEND_WINDOW_MS = 30 * 60 * 1000;

const USAGE =
  `Report a problem with the Temporal docs or with Temporal itself. ` +
  `POST ${ENDPOINT} with a JSON body, or GET ${ENDPOINT}?title=...&message=... with the same fields as query parameters. ` +
  `Required: title (at most ${LIMITS.title} characters) and message (at most ${LIMITS.message}): what happened. ` +
  `Optional: expected (what the docs said or what you expected), context (what you were trying to do), ` +
  `category (${CATEGORIES.join(', ')}; pick by what you saw, not what you think caused it), ` +
  `severity (high: blocked, medium: found a workaround, low: annoyance), page_url, product_version, ` +
  `agent (your name), src. Don't include personal data, credentials, or confidential information.`;

// The value of one field as a trimmed string, '' when it's absent, or null
// when it's present but not a string.
function stringField(input, name) {
  const value = input[name];
  if (value === undefined || value === null) return '';
  if (typeof value !== 'string') return null;
  return value.trim();
}

// Maps a page URL to the current docs page, or leaves a URL on another host as
// sent. A path or docs.temporal.io URL loses its query and fragment, a `.md`
// suffix maps to the HTML page, and vercel.json redirects are followed, so
// reports about one page group together however the sender reached it.
// Returns the URL string, or null when the value isn't an http(s) URL or a
// path.
function normalizePageUrl(value, compiledRedirects) {
  if (!/^(https?:\/\/|\/)/i.test(value)) return null;
  let url;
  try {
    url = new URL(value, ORIGIN);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  if (url.hostname.toLowerCase() !== DOCS_HOST) return url.href;

  let path = url.pathname.replace(/\.md$/, '');
  if (path === '/index') path = '/';
  const result = followRedirects(path, compiledRedirects);
  if (!result.external && !result.loop && !result.tooLong) path = result.final;
  return path === '/' ? `${ORIGIN}/` : `${ORIGIN}${path}`;
}

// Reads, checks, and limits the named string fields. Returns { fields } or
// { error }.
function readFields(input, names) {
  const fields = {};
  for (const name of names) {
    const value = stringField(input, name);
    if (value === null) return { error: `${name} must be a string.` };
    if (REJECT_OVER_LIMIT.includes(name) && value.length > LIMITS[name]) {
      return { error: `${name} is ${value.length} characters. Shorten it to ${LIMITS[name]} characters or fewer.` };
    }
    fields[name] = value.slice(0, LIMITS[name]) || null;
  }
  return { fields };
}

function checkEnum(name, value, allowed) {
  if (value === null || allowed.includes(value)) return null;
  return `${name} must be one of: ${allowed.join(', ')}.`;
}

// Checks a widget rating, reason, and comment together. A reason must belong
// to the rating, and a comment needs a reason, since the widget only offers
// the comment box after one is picked.
function checkRating(fields) {
  if (!fields.rating) return 'rating is required.';
  const error =
    checkEnum('rating', fields.rating, RATINGS) || checkEnum('reason', fields.reason, REASONS[fields.rating]);
  if (error) return error;
  if (fields.comment && !fields.reason) return 'comment needs a reason.';
  return null;
}

// Parses one submission. `input` is the JSON body of a POST or the query
// parameters of a GET, as a plain object. Returns one of:
//   { kind: 'report', fields }     an agent's report
//   { kind: 'rating', fields }     the widget's first submission for a page
//   { kind: 'amendment', fields }  the widget adding a reason or comment
//   { error }                      for a 400
function parseSubmission(input, { method, compiledRedirects }) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { error: 'Send a JSON object.' };
  }

  const channel = stringField(input, 'channel') || 'agent';
  if (channel !== 'agent' && channel !== 'widget') return { error: 'channel must be agent or widget.' };

  if (channel === 'widget') {
    if (method !== 'POST') return { error: 'The widget channel accepts POST only.' };
    const read = readFields(input, ['id', 'amend_token', 'rating', 'reason', 'comment', 'page_url']);
    if (read.error) return read;
    const { id, amend_token: amendToken, rating, reason, comment } = read.fields;
    const error = checkRating({ rating, reason, comment });
    if (error) return { error };

    if (id || amendToken) {
      if (!id || !amendToken) return { error: 'An amendment needs both id and amend_token.' };
      return { kind: 'amendment', fields: { id, amend_token: amendToken, rating, reason, comment } };
    }

    if (!read.fields.page_url) return { error: 'page_url is required.' };
    const pageUrl = normalizePageUrl(read.fields.page_url, compiledRedirects);
    if (!pageUrl || !pageUrl.startsWith(`${ORIGIN}/`)) return { error: 'page_url must be a docs page.' };
    return { kind: 'rating', fields: { page_url: pageUrl, rating, reason, comment } };
  }

  const read = readFields(input, [
    'title',
    'message',
    'expected',
    'context',
    'category',
    'severity',
    'page_url',
    'product_version',
    'agent',
    'src',
  ]);
  if (read.error) return read;
  const fields = read.fields;

  // A GET without both is most likely a crawler or a link prefetcher, so it
  // writes nothing.
  if (!fields.title) return { error: 'title is required.' };
  if (!fields.message) return { error: 'message is required.' };

  fields.category = fields.category ? fields.category.toLowerCase() : 'other';
  fields.severity = fields.severity ? fields.severity.toLowerCase() : 'medium';
  const error =
    checkEnum('category', fields.category, CATEGORIES) || checkEnum('severity', fields.severity, SEVERITIES);
  if (error) return { error };

  if (fields.page_url) {
    const pageUrl = normalizePageUrl(fields.page_url, compiledRedirects);
    if (!pageUrl) return { error: 'page_url must be an http(s) URL or a path that starts with /.' };
    fields.page_url = pageUrl;
  }

  return { kind: 'report', fields };
}

// Entry IDs start with the UTC time to the millisecond, so they sort in time
// order and the Blob folder (one per day) can be found from the ID alone.
function newId(date) {
  const compact = date.toISOString().replace(/[-:.]/g, '');
  return `${compact}-${crypto.randomBytes(4).toString('hex')}`;
}

const ID_PATTERN = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(\d{3})Z-[0-9a-f]{8}$/;

// The time an ID was issued, or null for anything that isn't an ID.
function idTime(id) {
  const m = ID_PATTERN.exec(id);
  if (!m) return null;
  const time = Date.UTC(m[1], m[2] - 1, m[3], m[4], m[5], m[6], m[7]);
  return Number.isNaN(time) ? null : time;
}

// The Blob path for an entry, or for an amendment to it. An amendment sits
// next to the entry it amends, in the entry's day folder.
function entryPath(id, amendedAt) {
  const day = `${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6, 8)}`;
  const suffix = amendedAt ? `.amend-${newId(amendedAt)}` : '';
  return `feedback/${day}/${id}${suffix}.json`;
}

// The widget gets this with its entry ID, and has to send it back to amend
// the entry, so no one can amend an entry they didn't create.
function amendToken(id, salt) {
  return crypto.createHmac('sha256', salt).update(`amend:${id}`).digest('hex').slice(0, 32);
}

// Returns null when the amendment is allowed, or { status, error }.
function checkAmendment(id, token, salt, now) {
  const issued = idTime(id);
  const expected = amendToken(id, salt);
  const valid =
    issued !== null &&
    typeof token === 'string' &&
    token.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  if (!valid) return { status: 403, error: 'id and amend_token do not match.' };
  if (now - issued > AMEND_WINDOW_MS || issued > now + 60_000) {
    return { status: 403, error: 'This feedback can no longer be changed.' };
  }
  return null;
}

module.exports = {
  AMEND_WINDOW_MS,
  CATEGORIES,
  ENDPOINT,
  LIMITS,
  REASONS,
  SEVERITIES,
  USAGE,
  amendToken,
  checkAmendment,
  entryPath,
  idTime,
  newId,
  normalizePageUrl,
  parseSubmission,
};
