// Grouping and Slack formatting for the daily feedback digest
// (api/feedback-digest.js), with no I/O. See readme/FEEDBACK.md.

const DOCS_ORIGIN = 'https://docs.temporal.io';

// The order agent report categories appear in. Product reports come first,
// since they're forwarded to another team.
const CATEGORY_SECTIONS = [
  { category: 'product', title: 'Product reports', note: 'Forward to the team that owns the feature.' },
  { category: 'documentation', title: 'Documentation reports' },
  { category: 'docs_search', title: 'Docs search reports' },
  { category: 'other', title: 'Other reports' },
];
const SEVERITY_ORDER = { high: 0, medium: 1, low: 2 };

// The widget's wording for each reason, from src/components/PageFeedback.
const REASON_LABELS = {
  inaccurate: 'inaccurate',
  not_found: "couldn't find it",
  hard_to_understand: 'hard to understand',
  code_sample_errors: 'code sample errors',
  accurate: 'accurate',
  solved_problem: 'solved my problem',
  easy_to_understand: 'easy to understand',
  helped_decide: 'helped decide',
  other: 'another reason',
};

// Slack's limits are 50 blocks per message and 3,000 characters per section.
// These leave room for the header, the summary, and the overflow note.
const MAX_BLOCKS = 46;
const MAX_SECTION_CHARS = 2800;
const WEEKLY_TOP = 10;
// Different messages shown under one grouped report.
const MESSAGES_SHOWN = 3;

function isDay(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

// The UTC day before `now`, as YYYY-MM-DD.
function previousDay(now) {
  const d = new Date(now);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

// The `count` days ending with `day`, oldest first.
function daysEnding(day, count) {
  const days = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(`${day}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

// The paths in a sitemap, for flagging reports about pages that don't exist.
function sitemapPaths(xml) {
  const paths = new Set();
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    try {
      paths.add(new URL(match[1].trim()).pathname.replace(/\/$/, '') || '/');
    } catch {
      // Skip a malformed entry.
    }
  }
  return paths;
}

function docsPath(pageUrl) {
  if (!pageUrl || !pageUrl.startsWith(`${DOCS_ORIGIN}/`)) return null;
  return pageUrl.slice(DOCS_ORIGIN.length).replace(/\/$/, '') || '/';
}

// Collapses one day's (or week's) records into agent reports and per-page
// widget ratings. Preview and development records are left out unless
// `includePreview` is set, because previews write to the same store.
function groupRecords(records, { includePreview = false } = {}) {
  const kept = records.filter((r) => r && (includePreview || r.deployment === 'production'));
  const skipped = records.length - kept.length;

  // Reports with the same page and title, ignoring case and spacing, are one
  // problem reported more than once. The senders (by IP hash) and the
  // different messages are kept, so a reader can tell one caller retrying
  // from several callers hitting the same problem.
  const reportsByKey = new Map();
  const norm = (text) => (text || '').toLowerCase().replace(/\s+/g, ' ').trim();
  for (const r of kept.filter((r) => r.kind === 'report')) {
    const key = `${r.page_url || ''}\n${norm(r.title)}`;
    let group = reportsByKey.get(key);
    if (group) {
      group.count++;
      if (r.agent && !group.agents.includes(r.agent)) group.agents.push(r.agent);
      if (SEVERITY_ORDER[r.severity] < SEVERITY_ORDER[group.severity]) group.severity = r.severity;
    } else {
      group = { ...r, count: 1, agents: r.agent ? [r.agent] : [], senders: [], messages: [] };
      reportsByKey.set(key, group);
    }
    if (r.ip_hash && !group.senders.includes(r.ip_hash)) group.senders.push(r.ip_hash);
    if (r.message && !group.messages.some((m) => norm(m) === norm(r.message))) group.messages.push(r.message);
  }
  const reports = [...reportsByKey.values()].sort(
    (a, b) => (SEVERITY_ORDER[a.severity] ?? 1) - (SEVERITY_ORDER[b.severity] ?? 1) || b.count - a.count
  );

  // A widget entry is its rating plus any amendments, and the latest
  // amendment wins, since a reader can change their rating after a misclick.
  const entries = new Map();
  for (const r of kept.filter((r) => r.kind === 'rating')) {
    entries.set(r.id, { page_url: r.page_url, rating: r.rating, reason: null, comment: null, amendedAt: '' });
  }
  for (const a of kept.filter((r) => r.kind === 'amendment')) {
    const entry = entries.get(a.id);
    if (!entry || (a.amended_at || '') < entry.amendedAt) continue;
    Object.assign(entry, { rating: a.rating, reason: a.reason, comment: a.comment, amendedAt: a.amended_at || '' });
  }

  const pages = new Map();
  for (const entry of entries.values()) {
    const page = pages.get(entry.page_url) || {
      page_url: entry.page_url,
      up: { count: 0, reasons: {} },
      down: { count: 0, reasons: {} },
      comments: [],
    };
    const side = page[entry.rating];
    if (!side) continue;
    side.count++;
    const reason = entry.reason || 'none';
    side.reasons[reason] = (side.reasons[reason] || 0) + 1;
    if (entry.comment) page.comments.push({ rating: entry.rating, reason: entry.reason, comment: entry.comment });
    pages.set(entry.page_url, page);
  }
  const ratings = [...pages.values()].sort(
    (a, b) => b.down.count - a.down.count || b.up.count + b.down.count - (a.up.count + a.down.count)
  );

  return { reports, ratings, skipped };
}

// The pages with the most problems over a week: No ratings plus agent
// reports about the docs.
function topProblemPages(grouped, top = WEEKLY_TOP) {
  const scores = new Map();
  const add = (pageUrl, field, by) => {
    if (!pageUrl) return;
    const row = scores.get(pageUrl) || { page_url: pageUrl, down: 0, reports: 0 };
    row[field] += by;
    scores.set(pageUrl, row);
  };
  for (const page of grouped.ratings) add(page.page_url, 'down', page.down.count);
  for (const r of grouped.reports) {
    if (r.category === 'documentation' || r.category === 'docs_search') add(r.page_url, 'reports', r.count);
  }
  return [...scores.values()]
    .filter((row) => row.down + row.reports > 0)
    .sort((a, b) => b.down + b.reports - (a.down + a.reports))
    .slice(0, top);
}

// Untrusted text as Slack inline code: one line, cut to `max` characters,
// with Slack's control characters escaped so it can't mention anyone,
// including <!channel> and <!here>, or render as a link.
function code(text, max) {
  if (!text) return '';
  let value = String(text).replace(/\s+/g, ' ').trim().replace(/`/g, "'");
  if (value.length > max) value = `${value.slice(0, max - 1)}…`;
  value = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `\`${value}\``;
}

// A docs page as a Slack link, flagged when the sitemap doesn't have it. Any
// other URL is untrusted text.
function pageRef(pageUrl, knownPaths) {
  if (!pageUrl) return '_no page_';
  const path = docsPath(pageUrl);
  if (!path || !/^[\w\-./~%]*$/.test(path)) return code(pageUrl, 120);
  const link = `<${DOCS_ORIGIN}${path === '/' ? '/' : path}|${path}>`;
  return knownPaths && !knownPaths.has(path) ? `${link} (not in sitemap)` : link;
}

// How many times a grouped report was sent, and by how many senders when
// that's known: "reported 6 times from 1 sender".
function timesSent(report) {
  if (report.count < 2) return null;
  const senders = report.senders || [];
  if (!senders.length) return `reported ${report.count} times`;
  return `reported ${report.count} times from ${senders.length} ${senders.length === 1 ? 'sender' : 'senders'}`;
}

function reportLines(report, knownPaths) {
  const meta = [
    report.severity,
    timesSent(report),
    report.agents.length ? report.agents.map((a) => code(a, 40)).join(', ') : null,
    report.product_version ? code(report.product_version, 40) : null,
  ].filter(Boolean);
  const lines = [`• *${code(report.title, 120)}* · ${meta.join(' · ')} · ${pageRef(report.page_url, knownPaths)}`];
  const messages = report.messages && report.messages.length ? report.messages : [report.message].filter(Boolean);
  for (const message of messages.slice(0, MESSAGES_SHOWN)) lines.push(`    ${code(message, 300)}`);
  if (messages.length > MESSAGES_SHOWN) {
    const more = messages.length - MESSAGES_SHOWN;
    lines.push(`    _and ${more} more ${more === 1 ? 'message' : 'messages'} in the Blob store_`);
  }
  if (report.expected) lines.push(`    Expected: ${code(report.expected, 200)}`);
  return lines.join('\n');
}

function reasonSummary(side) {
  const parts = Object.entries(side.reasons)
    .sort((a, b) => b[1] - a[1])
    .map(([reason, n]) => `${reason === 'none' ? 'no reason' : REASON_LABELS[reason] || reason} ${n}`);
  return parts.length ? ` (${parts.join(', ')})` : '';
}

function ratingLines(page, knownPaths) {
  const sides = [];
  if (page.down.count) sides.push(`No ${page.down.count}${reasonSummary(page.down)}`);
  if (page.up.count) sides.push(`Yes ${page.up.count}${reasonSummary(page.up)}`);
  const lines = [`• ${pageRef(page.page_url, knownPaths)}: ${sides.join(', ')}`];
  for (const c of page.comments) {
    const label = REASON_LABELS[c.reason] || c.reason;
    lines.push(`    ${c.rating === 'up' ? 'Yes' : 'No'}, ${label}: ${code(c.comment, 300)}`);
  }
  return lines.join('\n');
}

// Packs item texts into section blocks under a bold title, splitting where a
// block would pass Slack's length limit.
function sectionBlocks(title, note, items) {
  const blocks = [];
  let text = `*${title}* (${items.length})${note ? `\n_${note}_` : ''}`;
  for (const item of items) {
    if (text.length + item.length + 1 > MAX_SECTION_CHARS) {
      blocks.push(text);
      text = '';
    }
    text += `${text ? '\n' : ''}${item}`;
  }
  if (text) blocks.push(text);
  return blocks.map((t) => ({ type: 'section', text: { type: 'mrkdwn', text: t } }));
}

// The Slack message for one day: { text, blocks }. `weekly`, when given, is
// topProblemPages() output for the seven days ending on `day`.
function formatDigest(day, grouped, { knownPaths = null, weekly = null, unreadable = 0 } = {}) {
  const { reports, ratings, skipped } = grouped;
  const reportCount = reports.reduce((n, r) => n + r.count, 0);
  const up = ratings.reduce((n, p) => n + p.up.count, 0);
  const down = ratings.reduce((n, p) => n + p.down.count, 0);

  const summary =
    reportCount || up || down
      ? `${reportCount} agent ${reportCount === 1 ? 'report' : 'reports'}, ${up + down} page ${
          up + down === 1 ? 'rating' : 'ratings'
        } (${up} Yes, ${down} No).`
      : 'No feedback.';
  const notes = [
    skipped ? `${skipped} preview or development ${skipped === 1 ? 'record' : 'records'} left out.` : null,
    unreadable ? `${unreadable} ${unreadable === 1 ? 'record' : 'records'} couldn't be read.` : null,
    knownPaths ? null : "The sitemap couldn't be fetched, so pages aren't checked against it.",
  ].filter(Boolean);

  const body = [];
  for (const { category, title, note } of CATEGORY_SECTIONS) {
    const items = reports.filter((r) => (r.category || 'other') === category);
    if (items.length)
      body.push(
        ...sectionBlocks(
          title,
          note,
          items.map((r) => reportLines(r, knownPaths))
        )
      );
  }
  if (ratings.length)
    body.push(
      ...sectionBlocks(
        'Page ratings',
        null,
        ratings.map((p) => ratingLines(p, knownPaths))
      )
    );
  if (weekly && weekly.length) {
    const items = weekly.map((row) => {
      const parts = [row.down ? `No ${row.down}` : null, row.reports ? `reports ${row.reports}` : null].filter(Boolean);
      return `• ${pageRef(row.page_url, knownPaths)}: ${parts.join(', ')}`;
    });
    body.push(...sectionBlocks('Last 7 days: pages with the most problems', null, items));
  }

  const blocks = [
    { type: 'header', text: { type: 'plain_text', text: `Docs feedback for ${day}` } },
    { type: 'section', text: { type: 'mrkdwn', text: [summary, ...notes].join('\n') } },
  ];
  const shown = body.slice(0, MAX_BLOCKS);
  blocks.push(...shown);
  if (body.length > shown.length) {
    blocks.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `${body.length - shown.length} more sections didn't fit. Read the rest in the feedback Blob store under \`feedback/${day}/\`.`,
        },
      ],
    });
  }
  return { text: `Docs feedback for ${day}: ${summary}`, blocks };
}

module.exports = {
  REASON_LABELS,
  code,
  daysEnding,
  formatDigest,
  groupRecords,
  isDay,
  previousDay,
  sitemapPaths,
  topProblemPages,
};
