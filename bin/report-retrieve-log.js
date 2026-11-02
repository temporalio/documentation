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
// requests we send ourselves (src=manual-test and src=link-check). Calls from
// automated audit tools are counted, but reported apart from agents.
//
// Usage:
//   BLOB_READ_WRITE_TOKEN=... node bin/report-retrieve-log.js [options]
//
// Options:
//   --since YYYY-MM-DD   First day to include (UTC). Default: 14 days before --until.
//   --until YYYY-MM-DD   Last day to include (UTC). Default: today.
//   --include-preview    Also count preview and development deployments.
//   --include-tests      Also count src=manual-test and src=link-check.
//   --automation REGEX   Also treat callers whose agent or user agent matches
//                        REGEX (case-insensitive) as automated tools. Repeatable.
//   --hide-text          Leave out question text and jtb values.
//   --top N              Rows per table. Default: 15.

const KNOWN_SRC = ['llms', 'docs-page', 'md-page'];
const TEST_SRC = ['manual-test', 'link-check'];
const PLACEHOLDER = /^<?\s*(your[-_ ]?name|question|job[-_ ]to[-_ ]be[-_ ]done|agent|name)\s*>?$/i;
const PLACEHOLDER_QUESTION = /<\s*question\s*>?|^\s*question\s*$/i;

// The example question in /llms.txt. Agents that send it word for word ran the
// example rather than asking their own question.
const EXAMPLE_QUESTION = 'How do I safely change Workflow code while executions are still running in the Python SDK?';

// A successful call that returned this many results or fewer is low-yield.
const LOW_YIELD = 2;

// Callers that audit how agent-ready a docs site is, rather than helping a
// person with a task. Matched against both the agent value and the user agent.
const AUTOMATION = [/audit/i, /\bargus\b/i, /inspector/i, /quality-review/i, /readiness/i, /scanner/i, /crawler/i];

// Crawler and agent names that appear anywhere in a user agent string, checked
// in order before falling back to the first product token. Claude Code sends
// "Claude-User (claude-code/...)", so claude-code comes before Claude-User.
const UA_TOKENS = [
  'ChatGPT-User',
  'OAI-SearchBot',
  'GPTBot',
  'claude-code',
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
  'OpenCode',
  'MistralAI-User',
  'grok-agent',
  'ExaUser',
  'Amazonbot',
  'HeadlessChrome',
];

// Agents shown per user agent family in the cross-tab before the rest are
// summed into one row.
const AGENTS_PER_UA = 3;

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
  ['Upgrades and migration', /\bupgrad|\bmigrat/i],
  ['Task Queues', /\btask queues?\b/i],
  ['Workers', /\bworkers?\b/i],
  ['Determinism', /\bdeterminis|\bnon-?deterministic\b|\breplay/i],
  ['Versioning', /\bversion|\bpatch(ing|ed)?\b/i],
  ['Timeouts and retries', /\btimeouts?\b|\bretr(y|ies|ying)\b|\bheartbeat/i],
  ['Failures and errors', /\bfail(ure|ures|ed|s)?\b|\berrors?\b|\bexceptions?\b|\bcompensat|\bsaga\b/i],
  ['Testing', /\btest(s|ing)?\b|\bmock/i],
  ['Schedules', /\bschedules?\b|\bcron\b/i],
  ['Child Workflows', /\bchild workflows?\b/i],
  ['Signals, Queries, Updates', /\bsignals?\b|\bquer(y|ies)\b|\bupdates?\b/i],
  ['Activities', /\bactivit(y|ies)\b/i],
  ['Nexus', /\bnexus\b/i],
  ['AI and agents', /\bllm\b|\bai\b|\bagents?\b|\bopenai\b|\bmcp\b/i],
];

// Openers that make a query a question even without a question mark.
const QUESTION_START = /^(how|what|why|when|where|which|who|whose|can|could|does|do|did|is|are|was|were|should|would|will|has|have|explain|describe|compare|list|show|tell)\b/i;

function isExcluded(record, { includePreview = false, includeTests = false } = {}) {
  if (!includePreview && record.deployment !== 'production') return true;
  if (!includeTests && TEST_SRC.includes(record.src)) return true;
  return false;
}

// The label for an automated caller, or null when the call came from an agent.
// Audit tools often send a real agent's name in `agent` (to see how the site
// answers Cursor or Claude Code) while their user agent gives them away, so a
// match on the user agent is labeled by the matching text, not by `agent`.
function automationLabel(record, extraPatterns = []) {
  const patterns = [...AUTOMATION, ...extraPatterns];
  if (patterns.some((re) => re.test(record.agent || ''))) return normalizeAgent(record.agent);
  for (const re of patterns) {
    const match = (record.ua || '').match(re);
    if (match) return `user agent containing "${match[0]}"`;
  }
  return null;
}

function isAutomated(record, extraPatterns = []) {
  return automationLabel(record, extraPatterns) !== null;
}

// Groups the ways an agent might write its name: case, spaces, underscores,
// surrounding quotes, and a trailing version ("Cursor/0.42", "codex@1.2").
function normalizeAgent(agent) {
  const value = String(agent ?? '')
    .trim()
    .replace(/^["'`]+|["'`]+$/g, '')
    .trim();
  if (value === '') return '(missing)';
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

// Whether the caller asked a question or sent search keywords.
function queryStyle(q) {
  const text = String(q || '').trim();
  return /\?$/.test(text) || QUESTION_START.test(text) ? 'Question' : 'Keywords';
}

function uaFamily(ua) {
  if (!ua) return '(missing)';
  const token = UA_TOKENS.find((t) => ua.toLowerCase().includes(t.toLowerCase()));
  if (token) return token;
  if (/^Mozilla\//.test(ua)) return 'Browser-like (Mozilla/...)';
  return ua.split(/[\s/;(]/)[0] || '(missing)';
}

// Rows for the user agent by agent table: the top user agent families by
// calls, each followed by its most common agent values and one row summing
// the rest.
function uaAgentRows(byUaAgent, { families = 15, perFamily = AGENTS_PER_UA } = {}) {
  const totals = new Map([...byUaAgent].map(([ua, agents]) => [ua, [...agents.values()].reduce((a, b) => a + b, 0)]));
  const rows = [];
  for (const [ua, total] of sortedEntries(totals).slice(0, families)) {
    const agents = sortedEntries(byUaAgent.get(ua));
    for (const [agent, n] of agents.slice(0, perFamily)) rows.push([ua, agent, n, pct(n, total)]);
    const rest = agents.slice(perFamily);
    if (rest.length) {
      const n = rest.reduce((a, [, v]) => a + v, 0);
      rows.push([ua, `(${rest.length} other agents)`, n, pct(n, total)]);
    }
  }
  return rows;
}

function topicsFor(q) {
  const found = TOPICS.filter(([, re]) => re.test(q || '')).map(([name]) => name);
  return found.length ? found : ['(no topic matched)'];
}

// Why a request was rejected. The function only returns 400 for a missing q
// or a q over the length limit, and logs at most 200 characters of it.
function rejectReason(record) {
  if (record.status !== 400) return null;
  return record.q && String(record.q).trim() ? 'q over the length limit' : 'Missing q';
}

// How many results Kapa returned and the allowlist dropped. Records written
// before fetched_count existed didn't cap results, so fetched is the sum.
function yieldOf(record) {
  const results = record.result_count ?? 0;
  const dropped = record.dropped_count ?? 0;
  const fetched = record.fetched_count ?? results + dropped;
  return { results, dropped, fetched };
}

function yieldBucket(results) {
  if (results <= 2) return String(results);
  if (results <= 5) return '3-5';
  if (results <= 10) return '6-10';
  return '11-15';
}

// Nearest-rank percentile of a list of numbers.
function percentile(values, p) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1)];
}

function count(map, key, by = 1) {
  map.set(key, (map.get(key) || 0) + by);
}

function sortedEntries(map) {
  return [...map.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])));
}

function summarize(records, options = {}) {
  const automation = options.automation || [];
  const included = records.filter((r) => !isExcluded(r, options));
  const s = {
    total: records.length,
    excluded: records.length - included.length,
    calls: included.length,
    automatedCalls: 0,
    byDay: new Map(),
    bySrc: new Map(),
    byAgent: new Map(),
    byUa: new Map(),
    byUaAgent: new Map(),
    byTool: new Map(),
    byStatus: new Map(),
    rejects: new Map(),
    placeholderQuestions: 0,
    byTopic: new Map(),
    byStyle: new Map(),
    exampleVerbatim: 0,
    questions: new Map(),
    byYield: new Map(),
    lowYield: new Map(),
    fetchedTotal: 0,
    droppedTotal: 0,
    jtbFilled: 0,
    jtbSamples: [],
    missingBoth: 0,
    callers: new Map(),
    latencies: [],
  };
  const exampleKey = questionKey(EXAMPLE_QUESTION);

  for (const r of included) {
    count(s.byDay, String(r.ts || '').slice(0, 10) || '(no date)');
    count(s.bySrc, normalizeSrc(r.src));
    count(s.byStatus, r.status ?? '(none)');
    const tool = automationLabel(r, automation);
    if (tool) {
      s.automatedCalls++;
      count(s.byTool, tool);
    } else {
      const agent = normalizeAgent(r.agent);
      const ua = uaFamily(r.ua);
      count(s.byAgent, agent);
      count(s.byUa, ua);
      if (!s.byUaAgent.has(ua)) s.byUaAgent.set(ua, new Map());
      count(s.byUaAgent.get(ua), agent);
    }
    const reason = rejectReason(r);
    if (reason) count(s.rejects, reason);
    if (r.q && PLACEHOLDER_QUESTION.test(r.q)) s.placeholderQuestions++;
    if (r.ip_hash) count(s.callers, r.ip_hash);
    if (r.src == null && r.agent == null) s.missingBoth++;
    if (r.jtb) {
      s.jtbFilled++;
      if (!s.jtbSamples.includes(r.jtb)) s.jtbSamples.push(r.jtb);
    }
    if (r.status === 200 && typeof r.latency_ms === 'number') s.latencies.push(r.latency_ms);

    // Only requests that reached Kapa have a question and results to count.
    if (r.status !== 200 || !r.q) continue;
    const key = questionKey(r.q);
    const entry = s.questions.get(key) || { text: r.q, count: 0 };
    entry.count++;
    s.questions.set(key, entry);
    if (key === exampleKey) s.exampleVerbatim++;
    count(s.byStyle, queryStyle(r.q));
    for (const topic of topicsFor(r.q)) count(s.byTopic, topic);

    const y = yieldOf(r);
    s.fetchedTotal += y.fetched;
    s.droppedTotal += y.dropped;
    count(s.byYield, yieldBucket(y.results));
    if (y.results <= LOW_YIELD) {
      const low = s.lowYield.get(key) || { count: 0, results: 0, dropped: 0, fetched: 0 };
      low.count++;
      low.results += y.results;
      low.dropped += y.dropped;
      low.fetched += y.fetched;
      s.lowYield.set(key, low);
    }
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
  const shareOf = (total) => (entries) => entries.map(([k, v]) => [k, v, pct(v, total)]);
  const share = shareOf(s.calls);
  const agentCalls = s.calls - s.automatedCalls;
  const repeatCallers = sortedEntries(s.callers).filter(([, n]) => n > 1);
  const answered = [...s.byYield.values()].reduce((a, b) => a + b, 0);

  out.push(`# /api/retrieve log: ${since} to ${until}\n`);
  out.push(
    `${s.calls} calls counted, ${s.automatedCalls} of them from automated audit tools. ` +
      `${s.excluded} of ${s.total} records were left out as preview or test traffic. ` +
      'CDN cache hits never reach the function, so a question repeated within five minutes counts once.\n'
  );

  out.push('## Discovery\n');
  out.push('Calls per day:\n');
  out.push(table(['Day', 'Calls'], [...s.byDay.entries()].sort((a, b) => a[0].localeCompare(b[0]))));
  out.push('Calls per surface (`src`):\n');
  out.push(table(['src', 'Calls', 'Share'], share(sortedEntries(s.bySrc))));

  out.push('## Who\n');
  out.push(
    `Calls per \`agent\` from the ${agentCalls} calls by agents, after merging case, spacing, and version suffixes. ` +
      'Automated audit tools are listed separately below.\n'
  );
  out.push(table(['agent', 'Calls', 'Share'], shareOf(agentCalls)(sortedEntries(s.byAgent).slice(0, top))));
  out.push('Calls per user agent family, same calls:\n');
  out.push(table(['User agent', 'Calls', 'Share'], shareOf(agentCalls)(sortedEntries(s.byUa).slice(0, top))));
  out.push(
    'The `agent` values sent with each user agent family, same calls. A user agent names the HTTP client, ' +
      'so this shows which agents call through `curl`, a script, or a browser-style string:\n'
  );
  out.push(table(['User agent', 'agent', 'Calls', 'Share of user agent'], uaAgentRows(s.byUaAgent, { families: top })));
  out.push(`Automated audit tools (${s.automatedCalls} calls, ${pct(s.automatedCalls, s.calls)} of all calls):\n`);
  out.push(table(['Tool', 'Calls'], sortedEntries(s.byTool).slice(0, top)));

  out.push('## What\n');
  out.push('Query style:\n');
  out.push(table(['Style', 'Calls', 'Share'], shareOf(answered)(sortedEntries(s.byStyle))));
  out.push(`The \`/llms.txt\` example question was sent word for word ${s.exampleVerbatim} times.\n`);
  out.push('Questions per topic (a question can match more than one):\n');
  out.push(table(['Topic', 'Questions'], sortedEntries(s.byTopic)));
  if (!hideText) {
    out.push(`Top questions (${s.questions.size} distinct):\n`);
    const rows = [...s.questions.values()].sort((a, b) => b.count - a.count || a.text.localeCompare(b.text));
    out.push(table(['Question', 'Calls'], rows.slice(0, top).map((q) => [q.text, q.count])));
  }

  out.push('## Gaps\n');
  out.push(
    `Kapa returns results for almost any question, so gaps show up as answers left thin after the allowlist. ` +
      `Across ${answered} answered calls, the allowlist dropped ${s.droppedTotal} of ${s.fetchedTotal} results ` +
      `(${pct(s.droppedTotal, s.fetchedTotal)}).\n`
  );
  out.push('Results returned per answered call:\n');
  const bucketOrder = ['0', '1', '2', '3-5', '6-10', '11-15'];
  out.push(
    table(
      ['Results', 'Calls', 'Share'],
      shareOf(answered)(bucketOrder.filter((b) => s.byYield.has(b)).map((b) => [b, s.byYield.get(b)]))
    )
  );
  const lowCalls = [...s.lowYield.values()].reduce((a, b) => a + b.count, 0);
  out.push(
    `Low-yield questions, with ${LOW_YIELD} or fewer results (${lowCalls} calls, ${s.lowYield.size} distinct). ` +
      'A high dropped share means the allowlist removed most of what Kapa found, usually because other sources outranked the docs:\n'
  );
  if (hideText) {
    out.push(`${s.lowYield.size} distinct questions.\n`);
  } else {
    const rows = [...s.lowYield.entries()]
      .sort((a, b) => b[1].count - a[1].count || b[1].dropped / (b[1].fetched || 1) - a[1].dropped / (a[1].fetched || 1))
      .slice(0, top)
      .map(([key, low]) => [
        s.questions.get(key).text,
        low.count,
        (low.results / low.count).toFixed(1),
        pct(low.dropped, low.fetched),
      ]);
    out.push(table(['Question', 'Calls', 'Avg results', 'Dropped'], rows));
  }

  out.push('## Intent\n');
  out.push(`\`jtb\` was filled in on ${s.jtbFilled} of ${s.calls} calls (${pct(s.jtbFilled, s.calls)}).\n`);
  if (!hideText && s.jtbSamples.length) {
    out.push('Sample values:\n');
    out.push(s.jtbSamples.slice(0, top).map((j) => `- ${String(j).replace(/\n/g, ' ')}`).join('\n') + '\n');
  }

  out.push('## Health\n');
  out.push(table(['Status', 'Calls'], sortedEntries(s.byStatus)));
  out.push('Why requests were rejected (400):\n');
  out.push(table(['Reason', 'Calls'], sortedEntries(s.rejects)));
  out.push(`${s.placeholderQuestions} calls sent a placeholder such as \`<question>\` as the question.\n`);
  const p50 = percentile(s.latencies, 50);
  const p95 = percentile(s.latencies, 95);
  out.push(`Latency for 200s: p50 ${p50 ?? 'n/a'} ms, p95 ${p95 ?? 'n/a'} ms.\n`);

  out.push('## Noise\n');
  out.push(
    `${s.callers.size} distinct callers by IP hash. ${repeatCallers.length} sent more than one call. ` +
      `${s.missingBoth} calls had neither \`src\` nor \`agent\`, so they found the URL some other way.\n`
  );
  if (repeatCallers.length) {
    out.push('Busiest callers:\n');
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
  const opts = { top: 15, automation: [] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--since') opts.since = argv[++i];
    else if (arg === '--until') opts.until = argv[++i];
    else if (arg === '--top') opts.top = Number.parseInt(argv[++i], 10);
    else if (arg === '--automation') {
      const pattern = argv[++i];
      try {
        opts.automation.push(new RegExp(pattern, 'i'));
      } catch {
        throw new Error(`--automation takes a regular expression: ${pattern}`);
      }
    } else if (arg === '--include-preview') opts.includePreview = true;
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
  EXAMPLE_QUESTION,
  automationLabel,
  daysBetween,
  isAutomated,
  isExcluded,
  normalizeAgent,
  normalizeSrc,
  parseArgs,
  percentile,
  queryStyle,
  questionKey,
  readRecords,
  rejectReason,
  renderMarkdown,
  summarize,
  topicsFor,
  uaAgentRows,
  uaFamily,
  yieldBucket,
  yieldOf,
};
