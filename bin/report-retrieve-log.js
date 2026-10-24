#!/usr/bin/env node
// Summarizes the /api/retrieve request log for the agent search experiment.
//
// Reads every record in the private Blob store under retrieve-log/ for the
// date range, aggregates them in memory, and prints a Markdown report. No
// record is written to disk: readme/AGENT-RETRIEVE.md allows records to leave
// the store only as aggregates. The report does print question text and a
// sample of jtb values, since reading them is the point of the experiment.
// --hide-text leaves them out.
//
// By default the report counts production traffic only, and leaves out the
// requests we send ourselves (src=manual-test and src=link-check).
//
// Usage:
//   BLOB_READ_WRITE_TOKEN=... node bin/report-retrieve-log.js [options]
//
// Options:
//   --since YYYY-MM-DD   First day to include (UTC). Default: 14 days before --until.
//   --until YYYY-MM-DD   Last day to include (UTC). Default: today.
//   --include-preview    Also count preview and development deployments.
//   --include-tests      Also count src=manual-test and src=link-check.
//   --hide-text          Leave out question text and jtb values.
//   --top N              Rows per table. Default: 15.

const KNOWN_SRC = ['llms', 'docs-page', 'md-page'];
const TEST_SRC = ['manual-test', 'link-check'];
const PLACEHOLDER = /^<?\s*(your[-_ ]?name|question|job[-_ ]to[-_ ]be[-_ ]done|agent|name)\s*>?$/i;

// Crawler and agent names that appear anywhere in a user agent string, checked
// before falling back to the first product token.
const UA_TOKENS = [
  'ChatGPT-User',
  'OAI-SearchBot',
  'GPTBot',
  'Claude-User',
  'Claude-SearchBot',
  'ClaudeBot',
  'Perplexity-User',
  'PerplexityBot',
  'Google-Extended',
  'Googlebot',
  'Bingbot',
  'Applebot',
  'cohere-ai',
];

// Rough topic buckets for questions. A question can match more than one.
const TOPICS = [
  ['Python SDK', /\bpython\b|\bpy\b/i],
  ['TypeScript SDK', /\btypescript\b|\bjavascript\b|\bnode(\.?js)?\b|\bts sdk\b/i],
  // Bare "go" is too common an English word to count on its own.
  ['Go SDK', /\bgolang\b|\bgo sdk\b|\bin go\b|\bgo (client|worker|code|module)s?\b|\bgo\.temporal\.io\b/i],
  ['Java SDK', /\bjava\b|\bspring\b/i],
  ['.NET SDK', /\.net\b|\bdotnet\b|\bc#/i],
  ['PHP SDK', /\bphp\b/i],
  ['Ruby SDK', /\bruby\b/i],
  ['Temporal Cloud', /\bcloud\b/i],
  ['CLI', /\bcli\b|\btemporal (workflow|server|operator|activity) /i],
  ['Self-hosted', /self[- ]host|\bhelm\b|\bkubernetes\b|\bk8s\b|\bdatabases?\b|\bpersistence\b|\bcassandra\b|\bpostgres|\bmysql\b|\belasticsearch\b/i],
  ['Task Queues', /\btask queues?\b/i],
  ['Workers', /\bworkers?\b/i],
  ['Versioning', /\bversion|\bpatch(ing|ed)?\b|\bdeterminis/i],
  ['Signals, Queries, Updates', /\bsignals?\b|\bquer(y|ies)\b|\bupdates?\b/i],
  ['Activities', /\bactivit(y|ies)\b/i],
  ['Nexus', /\bnexus\b/i],
  ['AI and agents', /\bllm\b|\bai\b|\bagents?\b|\bopenai\b|\bmcp\b/i],
];

function isExcluded(record, { includePreview = false, includeTests = false } = {}) {
  if (!includePreview && record.deployment !== 'production') return true;
  if (!includeTests && TEST_SRC.includes(record.src)) return true;
  return false;
}

// Groups the ways an agent might write its name: case, spaces, underscores,
// and a trailing version ("Cursor/0.42", "codex@1.2").
function normalizeAgent(agent) {
  if (agent == null || String(agent).trim() === '') return '(missing)';
  const value = String(agent).trim();
  if (PLACEHOLDER.test(value)) return '(placeholder)';
  return value
    .toLowerCase()
    .replace(/[/@ ]v?\d[\w.-]*$/, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeSrc(src) {
  if (src == null || String(src).trim() === '') return '(missing)';
  const value = String(src).trim();
  if (PLACEHOLDER.test(value) || value === '<surface>') return '(placeholder)';
  return KNOWN_SRC.includes(value) ? value : `other: ${value}`;
}

// The key that merges trivial variants of the same question.
function questionKey(q) {
  return String(q || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[\s?.!]+$/, '')
    .trim();
}

function uaFamily(ua) {
  if (!ua) return '(missing)';
  const token = UA_TOKENS.find((t) => ua.toLowerCase().includes(t.toLowerCase()));
  if (token) return token;
  if (/^Mozilla\//.test(ua)) return 'Browser-like (Mozilla/...)';
  return ua.split(/[\s/;(]/)[0] || '(missing)';
}

function topicsFor(q) {
  const found = TOPICS.filter(([, re]) => re.test(q || '')).map(([name]) => name);
  return found.length ? found : ['(no topic matched)'];
}

// Nearest-rank percentile of a list of numbers.
function percentile(values, p) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1)];
}

// Why a successful request returned no results. Records written before
// fetched_count existed only have dropped_count to go on.
function gapKind(record) {
  if (record.status !== 200 || record.result_count !== 0) return null;
  if (record.fetched_count == null) return record.dropped_count > 0 ? 'filtered' : 'empty';
  if (record.fetched_count === 0) return 'empty';
  return 'filtered';
}

function count(map, key, by = 1) {
  map.set(key, (map.get(key) || 0) + by);
}

function sortedEntries(map) {
  return [...map.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])));
}

function summarize(records, options = {}) {
  const included = records.filter((r) => !isExcluded(r, options));
  const s = {
    total: records.length,
    excluded: records.length - included.length,
    calls: included.length,
    byDay: new Map(),
    bySrc: new Map(),
    byAgent: new Map(),
    byUa: new Map(),
    byStatus: new Map(),
    byTopic: new Map(),
    questions: new Map(),
    gaps: { empty: new Map(), filtered: new Map() },
    jtbFilled: 0,
    jtbSamples: [],
    missingBoth: 0,
    callers: new Map(),
    latencies: [],
  };

  for (const r of included) {
    count(s.byDay, String(r.ts || '').slice(0, 10) || '(no date)');
    count(s.bySrc, normalizeSrc(r.src));
    count(s.byAgent, normalizeAgent(r.agent));
    count(s.byUa, uaFamily(r.ua));
    count(s.byStatus, r.status ?? '(none)');
    if (r.ip_hash) count(s.callers, r.ip_hash);
    if (r.src == null && r.agent == null) s.missingBoth++;
    if (r.jtb) {
      s.jtbFilled++;
      if (!s.jtbSamples.includes(r.jtb)) s.jtbSamples.push(r.jtb);
    }
    if (r.status === 200 && typeof r.latency_ms === 'number') s.latencies.push(r.latency_ms);

    // Only requests that reached Kapa have a question worth counting.
    if (r.status !== 200 || !r.q) continue;
    const key = questionKey(r.q);
    const entry = s.questions.get(key) || { text: r.q, count: 0 };
    entry.count++;
    s.questions.set(key, entry);
    for (const topic of topicsFor(r.q)) count(s.byTopic, topic);
    const gap = gapKind(r);
    if (gap) count(s.gaps[gap], key);
  }
  return s;
}

function table(headers, rows) {
  if (rows.length === 0) return '_None._\n';
  const line = (cells) => `| ${cells.map((c) => String(c).replace(/\|/g, '\\|').replace(/\n/g, ' ')).join(' | ')} |`;
  return [line(headers), line(headers.map(() => '---')), ...rows.map(line)].join('\n') + '\n';
}

function pct(n, total) {
  return total ? `${Math.round((n / total) * 100)}%` : '0%';
}

function renderMarkdown(s, { since, until, top = 15, hideText = false } = {}) {
  const out = [];
  const share = (entries) => entries.map(([k, v]) => [k, v, pct(v, s.calls)]);
  const repeatCallers = sortedEntries(s.callers).filter(([, n]) => n > 1);

  out.push(`# /api/retrieve log: ${since} to ${until}\n`);
  out.push(
    `${s.calls} calls counted. ${s.excluded} of ${s.total} records were left out as preview or test traffic. ` +
      'CDN cache hits never reach the function, so a question repeated within five minutes counts once.\n'
  );

  out.push('## Discovery\n');
  out.push('Calls per day:\n');
  out.push(table(['Day', 'Calls'], [...s.byDay.entries()].sort((a, b) => a[0].localeCompare(b[0]))));
  out.push('\nCalls per surface (`src`):\n');
  out.push(table(['src', 'Calls', 'Share'], share(sortedEntries(s.bySrc))));

  out.push('\n## Who\n');
  out.push('Calls per `agent`, after merging case, spacing, and version suffixes:\n');
  out.push(table(['agent', 'Calls', 'Share'], share(sortedEntries(s.byAgent).slice(0, top))));
  out.push('\nCalls per user agent family:\n');
  out.push(table(['User agent', 'Calls', 'Share'], share(sortedEntries(s.byUa).slice(0, top))));

  out.push('\n## What\n');
  out.push('Questions per topic (a question can match more than one):\n');
  out.push(table(['Topic', 'Questions'], sortedEntries(s.byTopic)));
  if (!hideText) {
    out.push(`\nTop questions (${s.questions.size} distinct):\n`);
    const rows = [...s.questions.values()].sort((a, b) => b.count - a.count || a.text.localeCompare(b.text));
    out.push(table(['Question', 'Calls'], rows.slice(0, top).map((q) => [q.text, q.count])));
  }

  out.push('\n## Gaps\n');
  const gapRows = (map) => sortedEntries(map).map(([key, n]) => [hideText ? '(hidden)' : s.questions.get(key).text, n]);
  const emptyTotal = [...s.gaps.empty.values()].reduce((a, b) => a + b, 0);
  const filteredTotal = [...s.gaps.filtered.values()].reduce((a, b) => a + b, 0);
  out.push(`Kapa found nothing (${emptyTotal} calls). These point at missing docs:\n`);
  out.push(hideText ? `${s.gaps.empty.size} distinct questions.\n` : table(['Question', 'Calls'], gapRows(s.gaps.empty).slice(0, top)));
  out.push(`\nEvery hit was outside the allowlist (${filteredTotal} calls):\n`);
  out.push(
    hideText ? `${s.gaps.filtered.size} distinct questions.\n` : table(['Question', 'Calls'], gapRows(s.gaps.filtered).slice(0, top))
  );

  out.push('\n## Intent\n');
  out.push(`\`jtb\` was filled in on ${s.jtbFilled} of ${s.calls} calls (${pct(s.jtbFilled, s.calls)}).\n`);
  if (!hideText && s.jtbSamples.length) {
    out.push('\nSample values:\n');
    out.push(s.jtbSamples.slice(0, top).map((j) => `- ${String(j).replace(/\n/g, ' ')}`).join('\n') + '\n');
  }

  out.push('\n## Health\n');
  out.push(table(['Status', 'Calls'], sortedEntries(s.byStatus)));
  const p50 = percentile(s.latencies, 50);
  const p95 = percentile(s.latencies, 95);
  out.push(`\nLatency for 200s: p50 ${p50 ?? 'n/a'} ms, p95 ${p95 ?? 'n/a'} ms.\n`);

  out.push('\n## Noise\n');
  out.push(
    `${s.callers.size} distinct callers by IP hash. ${repeatCallers.length} sent more than one call. ` +
      `${s.missingBoth} calls had neither \`src\` nor \`agent\`, so they found the URL some other way.\n`
  );
  if (repeatCallers.length) {
    out.push('\nBusiest callers:\n');
    out.push(table(['Caller', 'Calls', 'Share'], share(repeatCallers.slice(0, 5)).map(([, n, p], i) => [`Caller ${i + 1}`, n, p])));
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

// Inclusive list of UTC days, as YYYY-MM-DD.
function daysBetween(since, until) {
  const days = [];
  for (let d = new Date(`${since}T00:00:00Z`); d <= new Date(`${until}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + 1)) {
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function parseArgs(argv) {
  const opts = { top: 15 };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--since') opts.since = argv[++i];
    else if (arg === '--until') opts.until = argv[++i];
    else if (arg === '--top') opts.top = Number.parseInt(argv[++i], 10);
    else if (arg === '--include-preview') opts.includePreview = true;
    else if (arg === '--include-tests') opts.includeTests = true;
    else if (arg === '--hide-text') opts.hideText = true;
    else throw new Error(`Unknown option: ${arg}`);
  }
  const isDay = (v) => /^\d{4}-\d{2}-\d{2}$/.test(v || '');
  opts.until ??= new Date().toISOString().slice(0, 10);
  if (!opts.since) {
    const d = new Date(`${opts.until}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() - 13);
    opts.since = d.toISOString().slice(0, 10);
  }
  if (!isDay(opts.since) || !isDay(opts.until)) throw new Error('--since and --until take YYYY-MM-DD.');
  if (opts.since > opts.until) throw new Error('--since is after --until.');
  if (!Number.isInteger(opts.top) || opts.top < 1) throw new Error('--top takes a positive number.');
  return opts;
}

async function readRecords(days, { list, get }) {
  const pathnames = [];
  for (const day of days) {
    let cursor;
    do {
      const page = await list({ prefix: `retrieve-log/${day}/`, cursor, limit: 1000 });
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
        const result = await get(pathnames[i], { access: 'private' });
        records.push(await new Response(result.stream).json());
      } catch {
        unreadable++;
      }
    }
  };
  await Promise.all(Array.from({ length: 8 }, worker));
  return { records, unreadable };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('Set BLOB_READ_WRITE_TOKEN to the docs-agent-retrieve-log store token. See readme/AGENT-RETRIEVE.md.');
    process.exitCode = 1;
    return;
  }
  const blob = require('@vercel/blob');
  const days = daysBetween(opts.since, opts.until);
  console.error(`Reading retrieve-log/ for ${days.length} days (${opts.since} to ${opts.until})...`);
  const { records, unreadable } = await readRecords(days, blob);
  if (unreadable) console.error(`${unreadable} records couldn't be read and were skipped.`);
  console.log(renderMarkdown(summarize(records, opts), opts));
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = {
  daysBetween,
  gapKind,
  isExcluded,
  normalizeAgent,
  normalizeSrc,
  parseArgs,
  percentile,
  questionKey,
  readRecords,
  renderMarkdown,
  summarize,
  topicsFor,
  uaFamily,
};
