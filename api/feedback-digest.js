const crypto = require('crypto');
const { get, list } = require('@vercel/blob');
const { header } = require('./_log');
const {
  daysEnding,
  formatDigest,
  groupRecords,
  isDay,
  previousDay,
  sitemapPaths,
  topProblemPages,
} = require('./_feedback-digest-lib');

// Posts yesterday's /api/feedback submissions to Slack. Vercel Cron calls it
// daily (vercel.json `crons`) with `Authorization: Bearer $CRON_SECRET`, and
// on Mondays it adds a seven-day rollup. See readme/FEEDBACK.md.
//
// A person with the secret can also call it:
//   ?date=YYYY-MM-DD    digest that UTC day instead of yesterday
//   ?dry_run=1          return the Slack message instead of posting it
//   ?include_preview=1  count preview and development records too
//   ?weekly=1           add the seven-day rollup on any day

const SITEMAP_URL = 'https://docs.temporal.io/sitemap.xml';
const SITEMAP_TIMEOUT_MS = 5000;
const READ_CONCURRENCY = 8;

const HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

function send(response, status, body) {
  for (const [key, value] of Object.entries(HEADERS)) response.setHeader(key, value);
  response.status(status).send(JSON.stringify(body));
}

function authorized(request, secret) {
  const expected = Buffer.from(`Bearer ${secret}`);
  const actual = Buffer.from(header(request, 'authorization') || '');
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

// Every record stored under the given days. A record that can't be read is
// counted rather than failing the digest.
async function readRecords(days, token) {
  const pathnames = [];
  for (const day of days) {
    let cursor;
    do {
      const page = await list({ prefix: `feedback/${day}/`, cursor, limit: 1000, token });
      pathnames.push(...page.blobs.map((b) => b.pathname));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  }

  const records = [];
  let unreadable = 0;
  let next = 0;
  const worker = async () => {
    for (let i = next++; i < pathnames.length; i = next++) {
      try {
        const result = await get(pathnames[i], { access: 'private', token });
        records.push({ day: pathnames[i].split('/')[1], ...(await new Response(result.stream).json()) });
      } catch {
        unreadable++;
      }
    }
  };
  await Promise.all(Array.from({ length: READ_CONCURRENCY }, worker));
  return { records, unreadable };
}

// The paths the site serves, or null when the sitemap can't be fetched, in
// which case the digest goes out without the check.
async function fetchKnownPaths() {
  try {
    const response = await fetch(SITEMAP_URL, { signal: AbortSignal.timeout(SITEMAP_TIMEOUT_MS) });
    if (!response.ok) return null;
    const paths = sitemapPaths(await response.text());
    return paths.size ? paths : null;
  } catch {
    return null;
  }
}

module.exports = async (request, response) => {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    send(response, 405, { error: 'Use GET.' });
    return;
  }

  const secret = process.env.CRON_SECRET;
  if (!secret) {
    send(response, 500, { error: 'The digest is not configured.' });
    return;
  }
  if (!authorized(request, secret)) {
    send(response, 401, { error: 'Unauthorized.' });
    return;
  }

  const { searchParams } = new URL(request.url, 'https://docs.temporal.io');
  const now = new Date();
  const day = searchParams.get('date') || previousDay(now);
  if (!isDay(day)) {
    send(response, 400, { error: 'date takes YYYY-MM-DD.' });
    return;
  }
  const dryRun = searchParams.get('dry_run') === '1';
  const includePreview = searchParams.get('include_preview') === '1';
  // The Monday digest covers Sunday and adds the week ending Sunday.
  const weekly = searchParams.get('weekly') === '1' || new Date(`${day}T00:00:00Z`).getUTCDay() === 0;

  const token = process.env.FEEDBACK_BLOB_READ_WRITE_TOKEN;
  const webhook = process.env.SLACK_FEEDBACK_WEBHOOK;
  if (!token || (!webhook && !dryRun)) {
    send(response, 500, { error: 'The digest is not configured.' });
    return;
  }

  let read;
  try {
    read = await readRecords(weekly ? daysEnding(day, 7) : [day], token);
  } catch (error) {
    console.error(`feedback-digest: Blob list failed: ${error.message}`);
    send(response, 503, { error: "Feedback couldn't be read." });
    return;
  }
  const knownPaths = await fetchKnownPaths();

  const grouped = groupRecords(
    read.records.filter((r) => r.day === day),
    { includePreview }
  );
  const message = formatDigest(day, grouped, {
    knownPaths,
    unreadable: read.unreadable,
    weekly: weekly ? topProblemPages(groupRecords(read.records, { includePreview })) : null,
  });
  const counts = { date: day, reports: grouped.reports.length, pages_rated: grouped.ratings.length };

  if (dryRun) {
    send(response, 200, { ...counts, posted: false, message });
    return;
  }

  // Posted even on a day with no feedback, so a missing message means the
  // digest itself failed.
  try {
    const posted = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    if (!posted.ok) throw new Error(`Slack returned ${posted.status}`);
  } catch (error) {
    console.error(`feedback-digest: Slack post failed: ${error.message}`);
    send(response, 502, { error: "The digest couldn't be posted to Slack." });
    return;
  }

  console.log(JSON.stringify({ event: 'feedback-digest', ...counts, weekly }));
  send(response, 200, { ...counts, posted: true });
};
