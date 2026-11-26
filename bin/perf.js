#!/usr/bin/env node
// Before-and-after performance testing for a fixed sample of docs pages.
//
// Three commands share this file:
//
//   run      Runs Lighthouse through the PageSpeed Insights API on every page in
//            bin/perf-pages.json, mobile and desktop, several times each, and
//            writes the medians to perf/runs/<date>-<label>.json.
//   compare  Compares two saved runs and prints the changes that are bigger
//            than run-to-run noise, as Markdown.
//   field    Reads up to 25 weeks of Chrome real-user data (CrUX History API)
//            for the origin and each sample page, writes it to
//            perf/field/<date>.json, and prints the latest 75th percentiles.
//            --change YYYY-MM-DD averages the weeks before and after a change.
//
// Lab timings vary a lot from run to run, mostly because third-party tags do
// different amounts of work on each load (the Reddit pixel ranged from 70 ms to
// 1.9 s on the same page). So compare treats timing metrics as changed only when
// both runs have at least 5 samples per page and the two sets don't overlap.
// Byte and request counts are steadier and use size thresholds. Compare runs
// taken with the same Lighthouse version (compare warns when they differ), and
// don't start two runs of the same pages at once: PageSpeed returns its cached
// result for a URL it tested moments ago, so the runs would share samples.
//
// Usage:
//   PSI_API_KEY=... node bin/perf.js run --label before-gtm [options]
//   node bin/perf.js compare [before.json after.json] [options]
//   PSI_API_KEY=... node bin/perf.js field [--change YYYY-MM-DD]
//
// run options:
//   --label NAME          Short name for the run, used in the file name. Required.
//   --base URL            Site to test. Default: https://docs.temporal.io. Must be
//                         publicly reachable, because Google's servers load it.
//   --runs N              Runs per page and form factor. Default: 5.
//   --concurrency N       Requests in flight at once. Default: 5.
//   --pages /a,/b         Test only these paths from the sample.
//   --form-factors LIST   mobile, desktop, or both (comma-separated). Default: both.
//
// compare options:
//   (no files)            Compares the two most recent runs in perf/runs.
//   --all                 Show every metric, not only the changes.
//   --json                Print the comparison as JSON.
//   --fail-on-worse       Exit 1 if any metric got worse.
//
// field options:
//   --change YYYY-MM-DD   Date a change shipped. Prints the average p75 of the
//                         weekly windows that ended before it and of those that
//                         started on or after it.
//   --json                Print the data as JSON instead of Markdown.
//
// The API key is read from PSI_API_KEY. One Google Cloud key with the PageSpeed
// Insights API and the Chrome UX Report API enabled covers both.

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const PAGES_FILE = path.join(__dirname, 'perf-pages.json');
const RUNS_DIR = path.join(ROOT, 'perf', 'runs');
const FIELD_DIR = path.join(ROOT, 'perf', 'field');
const DEFAULT_BASE = 'https://docs.temporal.io';
const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const CRUX_HISTORY_ENDPOINT = 'https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord';
const FORM_FACTORS = ['mobile', 'desktop'];
const CRUX_FORM_FACTOR = { mobile: 'PHONE', desktop: 'DESKTOP' };
const PSI_TIMEOUT_MS = 150_000;

// Metrics compared between runs. A change counts only when it's at least minAbs
// and, when minRel is set, at least that fraction of the earlier value. Lower is
// better unless higherIsBetter is set. Timing metrics also need MIN_TIMING_SAMPLES
// runs on each side with no overlap; with fewer runs they're reported as possible.
const MIN_TIMING_SAMPLES = 5;
const METRICS = [
  { key: 'score', label: 'Performance score', unit: 'pts', minAbs: 5, minRel: 0, higherIsBetter: true, timing: true },
  { key: 'a11y', label: 'Accessibility score', unit: 'pts', minAbs: 2, minRel: 0, higherIsBetter: true },
  { key: 'fcp', label: 'First paint', unit: 'ms', minAbs: 150, minRel: 0.15, timing: true },
  { key: 'lcp', label: 'Largest paint', unit: 'ms', minAbs: 150, minRel: 0.15, timing: true },
  { key: 'tbt', label: 'Blocking time', unit: 'ms', minAbs: 100, minRel: 0.2, timing: true },
  { key: 'cls', label: 'Layout shift', unit: 'cls', minAbs: 0.02, minRel: 0 },
  { key: 'si', label: 'Speed index', unit: 'ms', minAbs: 300, minRel: 0.15, timing: true },
  { key: 'mainThread', label: 'Main-thread work', unit: 'ms', minAbs: 200, minRel: 0.15, timing: true },
  {
    key: 'thirdPartyMainThread',
    label: 'Third-party main thread',
    unit: 'ms',
    minAbs: 100,
    minRel: 0.2,
    timing: true,
  },
  { key: 'bytes', label: 'Page weight', unit: 'bytes', minAbs: 20 * 1024, minRel: 0.05 },
  { key: 'scriptBytes', label: 'Script bytes', unit: 'bytes', minAbs: 20 * 1024, minRel: 0.05 },
  { key: 'thirdPartyBytes', label: 'Third-party bytes', unit: 'bytes', minAbs: 20 * 1024, minRel: 0.05 },
  { key: 'requests', label: 'Requests', unit: 'count', minAbs: 5, minRel: 0.1 },
];

// PageSpeed's field-data keys, mapped to the short names used here.
const PSI_FIELD_KEYS = {
  LARGEST_CONTENTFUL_PAINT_MS: 'lcp',
  INTERACTION_TO_NEXT_PAINT: 'inp',
  CUMULATIVE_LAYOUT_SHIFT_SCORE: 'cls',
  FIRST_CONTENTFUL_PAINT_MS: 'fcp',
  EXPERIMENTAL_TIME_TO_FIRST_BYTE: 'ttfb',
};

// CrUX metric names, mapped to the short names used here.
const CRUX_METRICS = {
  largest_contentful_paint: 'lcp',
  interaction_to_next_paint: 'inp',
  cumulative_layout_shift: 'cls',
  first_contentful_paint: 'fcp',
  experimental_time_to_first_byte: 'ttfb',
};

// Google's "good" and "poor" boundaries for the field metrics.
const FIELD_THRESHOLDS = {
  lcp: [2500, 4000],
  inp: [200, 500],
  cls: [0.1, 0.25],
  fcp: [1800, 3000],
  ttfb: [800, 1800],
};

// ---------- argument parsing ----------

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const opts = { command, files: [], runs: 5, concurrency: 5, base: DEFAULT_BASE, formFactors: FORM_FACTORS };
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    const next = () => {
      const value = rest[++i];
      if (value === undefined) throw new Error(`${arg} needs a value`);
      return value;
    };
    switch (arg) {
      case '--label':
        opts.label = next();
        break;
      case '--base':
        opts.base = next().replace(/\/+$/, '');
        break;
      case '--runs':
        opts.runs = positiveInt(arg, next());
        break;
      case '--concurrency':
        opts.concurrency = positiveInt(arg, next());
        break;
      case '--pages':
        opts.pages = next()
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean);
        break;
      case '--form-factors':
        opts.formFactors = parseFormFactors(next());
        break;
      case '--change':
        opts.change = parseDate(next());
        break;
      case '--all':
        opts.all = true;
        break;
      case '--json':
        opts.json = true;
        break;
      case '--fail-on-worse':
        opts.failOnWorse = true;
        break;
      default:
        if (arg.startsWith('--')) throw new Error(`Unknown option ${arg}`);
        opts.files.push(arg);
    }
  }
  return opts;
}

function positiveInt(name, value) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1) throw new Error(`${name} must be a whole number of 1 or more`);
  return n;
}

function parseFormFactors(value) {
  const list = value
    .split(',')
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
  const expanded = list.includes('both') ? FORM_FACTORS : list;
  for (const f of expanded) if (!FORM_FACTORS.includes(f)) throw new Error(`Unknown form factor ${f}`);
  return [...new Set(expanded)];
}

function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) {
    throw new Error(`Expected a date like 2026-12-01, got ${value}`);
  }
  return value;
}

function slugify(label) {
  const slug = String(label)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!slug) throw new Error('--label must contain letters or numbers');
  return slug;
}

function loadPages(only) {
  const { pages } = JSON.parse(fs.readFileSync(PAGES_FILE, 'utf8'));
  if (!only) return pages;
  const unknown = only.filter((p) => !pages.some((page) => page.path === p));
  if (unknown.length) throw new Error(`Not in bin/perf-pages.json: ${unknown.join(', ')}`);
  return pages.filter((page) => only.includes(page.path));
}

function apiKey() {
  const key = process.env.PSI_API_KEY;
  if (!key)
    throw new Error(
      'Set PSI_API_KEY to a Google Cloud API key with the PageSpeed Insights and Chrome UX Report APIs enabled.'
    );
  return key;
}

// Keeps the API key out of anything printed.
function redact(text, key) {
  return key ? String(text).split(key).join('***') : String(text);
}

// ---------- statistics ----------

function median(values) {
  const nums = values.filter((v) => typeof v === 'number' && Number.isFinite(v)).sort((a, b) => a - b);
  if (!nums.length) return null;
  const mid = Math.floor(nums.length / 2);
  return nums.length % 2 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function mean(values) {
  const nums = values.filter((v) => typeof v === 'number' && Number.isFinite(v));
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : null;
}

function range(values) {
  const nums = values.filter((v) => typeof v === 'number' && Number.isFinite(v));
  return nums.length ? [Math.min(...nums), Math.max(...nums)] : null;
}

// ---------- Lighthouse results ----------

const score = (category) => (category && typeof category.score === 'number' ? Math.round(category.score * 100) : null);
const numeric = (audit) => (audit && typeof audit.numericValue === 'number' ? audit.numericValue : null);
const entityName = (entity) => (typeof entity === 'string' ? entity : entity?.text || 'Unknown');

// Reduces one Lighthouse result to the numbers this tool keeps.
function summarizeLhr(lhr) {
  const audits = lhr.audits || {};
  const requests = audits['network-requests']?.details?.items || [];
  const thirdParties = {};
  for (const item of audits['third-parties-insight']?.details?.items || []) {
    const name = entityName(item.entity);
    thirdParties[name] = { mainThread: item.mainThreadTime || 0, bytes: item.transferSize || 0 };
  }
  const tp = Object.values(thirdParties);
  return {
    lighthouseVersion: lhr.lighthouseVersion,
    fetchTime: lhr.fetchTime,
    benchmarkIndex: lhr.environment?.benchmarkIndex ?? null,
    finalUrl: lhr.finalDisplayedUrl || lhr.finalUrl,
    warnings: lhr.runWarnings || [],
    score: score(lhr.categories?.performance),
    a11y: score(lhr.categories?.accessibility),
    bestPractices: score(lhr.categories?.['best-practices']),
    seo: score(lhr.categories?.seo),
    fcp: numeric(audits['first-contentful-paint']),
    lcp: numeric(audits['largest-contentful-paint']),
    tbt: numeric(audits['total-blocking-time']),
    cls: numeric(audits['cumulative-layout-shift']),
    si: numeric(audits['speed-index']),
    mainThread: numeric(audits['mainthread-work-breakdown']),
    bytes: numeric(audits['total-byte-weight']),
    scriptBytes: requests.filter((r) => r.resourceType === 'Script').reduce((sum, r) => sum + (r.transferSize || 0), 0),
    requests: requests.length,
    thirdPartyMainThread: tp.reduce((sum, t) => sum + t.mainThread, 0),
    thirdPartyBytes: tp.reduce((sum, t) => sum + t.bytes, 0),
    thirdParties,
    lcpElement: lcpElement(audits),
  };
}

// Names the element Lighthouse picked as the largest paint. On phones that's
// sometimes the consent banner rather than page content, which makes the largest
// paint time depend on when the banner appears.
function lcpElement(audits) {
  const node = (audits['lcp-breakdown-insight']?.details?.items || []).find((item) => item.type === 'node');
  if (!node) return null;
  const label = String(node.nodeLabel || node.snippet || node.selector || '').slice(0, 80);
  return { label, selector: node.selector || null, inConsentBanner: /TEMPORAL-CONSENT-BANNER/i.test(node.path || '') };
}

// Reads the field data PageSpeed returns next to the lab result. PageSpeed falls
// back to origin-wide data when the page doesn't have enough traffic.
function summarizePsiField(experience) {
  if (!experience?.metrics) return null;
  const metrics = {};
  for (const [psiKey, key] of Object.entries(PSI_FIELD_KEYS)) {
    const metric = experience.metrics[psiKey];
    if (!metric) continue;
    metrics[key] = key === 'cls' ? metric.percentile / 100 : metric.percentile;
  }
  return { scope: experience.origin_fallback ? 'origin' : 'url', metrics };
}

// Combines several runs of one page and form factor into medians.
function aggregateRuns(summaries) {
  const median_ = {};
  for (const { key } of METRICS) median_[key] = median(summaries.map((s) => s[key]));
  for (const key of ['bestPractices', 'seo']) median_[key] = median(summaries.map((s) => s[key]));
  const names = new Set(summaries.flatMap((s) => Object.keys(s.thirdParties || {})));
  const thirdParties = {};
  for (const name of names) {
    thirdParties[name] = {
      mainThread: median(summaries.map((s) => s.thirdParties?.[name]?.mainThread ?? 0)),
      bytes: median(summaries.map((s) => s.thirdParties?.[name]?.bytes ?? 0)),
    };
  }
  const samples = summaries.map((s) => {
    const sample = { fetchTime: s.fetchTime };
    for (const { key } of METRICS) sample[key] = s[key];
    sample.lcpElement = s.lcpElement?.label ?? null;
    sample.benchmarkIndex = s.benchmarkIndex ?? null;
    sample.thirdParties = Object.fromEntries(
      Object.entries(s.thirdParties || {}).map(([name, tp]) => [name, Math.round(tp.mainThread)])
    );
    return sample;
  });
  return {
    median: median_,
    thirdParties,
    samples,
    lcpInConsentBanner: summaries.filter((s) => s.lcpElement?.inConsentBanner).length,
    lighthouseVersions: [...new Set(summaries.map((s) => s.lighthouseVersion).filter(Boolean))],
    warnings: [...new Set(summaries.flatMap((s) => s.warnings))],
  };
}

// ---------- PageSpeed Insights ----------

function psiUrl(pageUrl, strategy, key) {
  const params = new URLSearchParams({ url: pageUrl, strategy });
  for (const category of ['performance', 'accessibility', 'best-practices', 'seo']) params.append('category', category);
  params.set('key', key);
  return `${PSI_ENDPOINT}?${params}`;
}

async function fetchPsi(pageUrl, strategy, key, { fetchImpl = fetch, attempts = 3, sleep = delay } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const res = await fetchImpl(psiUrl(pageUrl, strategy, key), { signal: AbortSignal.timeout(PSI_TIMEOUT_MS) });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.lighthouseResult) return body;
      lastError = new Error(`PageSpeed returned ${res.status}: ${body.error?.message || 'no Lighthouse result'}`);
      if (res.status === 400 || res.status === 403) break;
    } catch (err) {
      lastError = err;
    }
    if (attempt < attempts) await sleep(attempt * 10_000);
  }
  throw new Error(redact(lastError?.message || lastError, key));
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pool(tasks, limit) {
  const results = new Array(tasks.length);
  let next = 0;
  async function worker() {
    while (next < tasks.length) {
      const index = next++;
      results[index] = await tasks[index]();
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
  return results;
}

async function commandRun(
  opts,
  { fetchImpl = fetch, log = (m) => process.stderr.write(`${m}\n`), now = new Date() } = {}
) {
  if (!opts.label) throw new Error('run needs --label, for example --label before-gtm');
  const key = apiKey();
  const pages = loadPages(opts.pages);
  const jobs = [];
  for (let run = 1; run <= opts.runs; run++) {
    for (const page of pages) {
      for (const formFactor of opts.formFactors) jobs.push({ page, formFactor, run });
    }
  }
  log(
    `Testing ${pages.length} pages × ${opts.formFactors.length} form factors × ${opts.runs} runs on ${opts.base} (${jobs.length} requests)`
  );
  let done = 0;
  const outcomes = await pool(
    jobs.map((job) => async () => {
      const url = opts.base + job.page.path;
      try {
        const body = await fetchPsi(url, job.formFactor, key, { fetchImpl });
        const summary = summarizeLhr(body.lighthouseResult);
        log(
          `[${++done}/${jobs.length}] ${job.formFactor} ${job.page.path} run ${job.run}: score ${summary.score}, LCP ${fmt(summary.lcp, 'ms')}, TBT ${fmt(summary.tbt, 'ms')}`
        );
        return { ...job, summary, field: summarizePsiField(body.loadingExperience) };
      } catch (err) {
        log(`[${++done}/${jobs.length}] ${job.formFactor} ${job.page.path} run ${job.run}: FAILED ${err.message}`);
        return { ...job, error: err.message };
      }
    }),
    opts.concurrency
  );

  const results = [];
  for (const page of pages) {
    for (const formFactor of opts.formFactors) {
      const mine = outcomes.filter((o) => o.page.path === page.path && o.formFactor === formFactor);
      const ok = mine.filter((o) => o.summary);
      const entry = {
        path: page.path,
        kind: page.kind,
        formFactor,
        url: opts.base + page.path,
        runs: ok.length,
        failures: mine.length - ok.length,
      };
      if (ok.length)
        Object.assign(entry, aggregateRuns(ok.map((o) => o.summary)), {
          field: ok.find((o) => o.field)?.field || null,
        });
      const errors = [...new Set(mine.filter((o) => o.error).map((o) => o.error))];
      if (errors.length) entry.errors = errors;
      results.push(entry);
    }
  }

  const output = {
    schema: 1,
    label: opts.label,
    createdAt: now.toISOString(),
    base: opts.base,
    runsPerPage: opts.runs,
    lighthouseVersions: [...new Set(results.flatMap((r) => r.lighthouseVersions || []))],
    results,
  };
  fs.mkdirSync(RUNS_DIR, { recursive: true });
  const file = path.join(RUNS_DIR, `${output.createdAt.slice(0, 10)}-${slugify(opts.label)}.json`);
  fs.writeFileSync(file, `${JSON.stringify(output, null, 2)}\n`);
  return { file, output };
}

// ---------- compare ----------

function classify(metric, before, after, beforeSamples = [], afterSamples = []) {
  if (before == null || after == null) return 'missing';
  const delta = after - before;
  const size = Math.abs(delta);
  if (size < metric.minAbs) return 'same';
  if (metric.minRel && before !== 0 && size / Math.abs(before) < metric.minRel) return 'same';
  const improved = metric.higherIsBetter ? delta > 0 : delta < 0;
  const direction = improved ? 'better' : 'worse';
  // A change only counts when the two sets of runs don't overlap at all. With 5
  // runs a side, that happens by chance less than 1% of the time; with 3, about
  // 10% of the time, so timing metrics need 5.
  const a = range(beforeSamples);
  const b = range(afterSamples);
  const n = Math.min(beforeSamples.length, afterSamples.length);
  if (n >= 3 && a && b && a[0] <= b[1] && b[0] <= a[1]) return 'same';
  if (metric.timing && n < MIN_TIMING_SAMPLES) return `possibly ${direction}`;
  return direction;
}

function compareRuns(before, after) {
  const rows = [];
  for (const b of before.results) {
    const a = after.results.find((r) => r.path === b.path && r.formFactor === b.formFactor);
    if (!a || !a.median || !b.median) continue;
    for (const metric of METRICS) {
      const status = classify(
        metric,
        b.median[metric.key],
        a.median[metric.key],
        (b.samples || []).map((s) => s[metric.key]),
        (a.samples || []).map((s) => s[metric.key])
      );
      rows.push({
        path: b.path,
        formFactor: b.formFactor,
        metric: metric.key,
        label: metric.label,
        unit: metric.unit,
        before: b.median[metric.key],
        after: a.median[metric.key],
        status,
      });
    }
  }
  // Vendors are compared over the pages both runs tested, so a run of a few pages
  // can be compared with a full one.
  const vendors = {};
  const pairs = before.results
    .map((b) => [b, after.results.find((a) => a.path === b.path && a.formFactor === b.formFactor)])
    .filter(([b, a]) => a?.median && b.median);
  for (const [b, a] of pairs) {
    for (const [side, r] of [
      ['before', b],
      ['after', a],
    ]) {
      for (const [name, tp] of Object.entries(r.thirdParties || {})) {
        const k = `${r.formFactor}\u0000${name}`;
        vendors[k] ||= { formFactor: r.formFactor, name, before: 0, after: 0, pagesBefore: 0, pagesAfter: 0 };
        vendors[k][side] += tp.mainThread || 0;
        if ((tp.mainThread || 0) > 0 || (tp.bytes || 0) > 0)
          vendors[k][side === 'before' ? 'pagesBefore' : 'pagesAfter']++;
      }
    }
  }
  const pageCount = (ff) => pairs.filter(([b]) => b.formFactor === ff).length || 1;
  const vendorRows = Object.values(vendors).map((v) => ({
    ...v,
    pages: pageCount(v.formFactor),
    before: v.before / pageCount(v.formFactor),
    after: v.after / pageCount(v.formFactor),
  }));
  const missing = before.results
    .filter((b) => !after.results.some((a) => a.path === b.path && a.formFactor === b.formFactor && a.median))
    .map((b) => `${b.formFactor} ${b.path}`);
  return {
    before: {
      label: before.label,
      createdAt: before.createdAt,
      base: before.base,
      lighthouseVersions: before.lighthouseVersions,
    },
    after: {
      label: after.label,
      createdAt: after.createdAt,
      base: after.base,
      lighthouseVersions: after.lighthouseVersions,
    },
    versionMismatch: String(before.lighthouseVersions) !== String(after.lighthouseVersions),
    rows,
    vendors: vendorRows,
    missing,
    counts: {
      better: rows.filter((r) => r.status === 'better').length,
      worse: rows.filter((r) => r.status === 'worse').length,
      possible: rows.filter((r) => r.status.startsWith('possibly')).length,
    },
  };
}

function fmt(value, unit) {
  if (value == null) return '–';
  if (unit === 'ms') return value >= 1000 ? `${(value / 1000).toFixed(2)} s` : `${Math.round(value)} ms`;
  if (unit === 'bytes')
    return value >= 1024 * 1024 ? `${(value / 1024 / 1024).toFixed(2)} MB` : `${Math.round(value / 1024)} KB`;
  if (unit === 'cls') return value.toFixed(3);
  return String(Math.round(value));
}

function fmtDelta(before, after, unit) {
  if (before == null || after == null) return '–';
  const delta = after - before;
  const sign = delta > 0 ? '+' : delta < 0 ? '−' : '±';
  const pct = before ? ` (${sign}${Math.abs(Math.round((delta / before) * 100))}%)` : '';
  return `${sign}${fmt(Math.abs(delta), unit)}${pct}`;
}

const STATUS_MARK = {
  better: 'better',
  worse: 'worse',
  'possibly better': 'possibly better (fewer than 5 runs)',
  'possibly worse': 'possibly worse (fewer than 5 runs)',
  same: 'same',
  missing: 'no data',
};

function renderCompare(cmp, { all = false } = {}) {
  const lines = [];
  lines.push(`# Performance comparison: ${cmp.before.label} → ${cmp.after.label}`, '');
  lines.push(
    `- Before: \`${cmp.before.label}\`, ${cmp.before.createdAt}, ${cmp.before.base}, Lighthouse ${cmp.before.lighthouseVersions.join(', ')}`
  );
  lines.push(
    `- After: \`${cmp.after.label}\`, ${cmp.after.createdAt}, ${cmp.after.base}, Lighthouse ${cmp.after.lighthouseVersions.join(', ')}`
  );
  lines.push(
    `- ${cmp.counts.better} metrics better, ${cmp.counts.worse} worse, beyond run-to-run noise.` +
      (cmp.counts.possible ? ` ${cmp.counts.possible} possible timing changes need 5 runs a side to confirm.` : '')
  );
  if (cmp.versionMismatch)
    lines.push(
      '- **Warning:** the runs used different Lighthouse versions, so some differences may come from Lighthouse rather than the site.'
    );
  if (cmp.missing.length) {
    const byPath = {};
    for (const m of cmp.missing) {
      const [ff, p] = m.split(' ');
      (byPath[p] ||= []).push(ff);
    }
    const list = Object.entries(byPath).map(([p, ffs]) => `\`${p}\`${ffs.length === 1 ? ` (${ffs[0]})` : ''}`);
    lines.push(`- Not in the later run, so not compared: ${list.join(', ')}`);
  }
  lines.push('');
  for (const ff of FORM_FACTORS) {
    const rows = cmp.rows.filter(
      (r) => r.formFactor === ff && (all || (r.status !== 'same' && r.status !== 'missing'))
    );
    if (!cmp.rows.some((r) => r.formFactor === ff)) continue;
    lines.push(`## ${ff === 'mobile' ? 'Mobile' : 'Desktop'}`, '');
    if (!rows.length) {
      lines.push('No changes beyond run-to-run noise.', '');
    } else {
      lines.push('| Page | Metric | Before | After | Change | Result |', '| --- | --- | ---: | ---: | ---: | --- |');
      for (const r of rows) {
        lines.push(
          `| \`${r.path}\` | ${r.label} | ${fmt(r.before, r.unit)} | ${fmt(r.after, r.unit)} | ${fmtDelta(r.before, r.after, r.unit)} | ${STATUS_MARK[r.status]} |`
        );
      }
      lines.push('');
    }
    const vendors = cmp.vendors
      .filter((v) => v.formFactor === ff && Math.abs(v.after - v.before) >= 20)
      .sort((x, y) => Math.abs(y.after - y.before) - Math.abs(x.after - x.before))
      .slice(0, 12);
    if (vendors.length) {
      lines.push(
        `Third-party main-thread time, average per page over the pages both runs tested (${ff}). These vary a lot between loads, so read them as a guide:`,
        '',
        '| Vendor | Before | After | Change |',
        '| --- | ---: | ---: | ---: |'
      );
      for (const v of vendors)
        lines.push(
          `| ${v.name} | ${fmt(v.before, 'ms')} | ${fmt(v.after, 'ms')} | ${fmtDelta(v.before, v.after, 'ms')} |`
        );
      lines.push('');
    }
    const presence = cmp.vendors
      .filter((v) => v.formFactor === ff && v.pagesBefore !== v.pagesAfter)
      .sort((x, y) => Math.abs(y.pagesAfter - y.pagesBefore) - Math.abs(x.pagesAfter - x.pagesBefore));
    if (presence.length) {
      lines.push(
        `Third parties that appeared on more or fewer pages (${ff}, out of ${presence[0].pages}):`,
        '',
        '| Vendor | Pages before | Pages after |',
        '| --- | ---: | ---: |'
      );
      for (const v of presence) lines.push(`| ${v.name} | ${v.pagesBefore} | ${v.pagesAfter} |`);
      lines.push('');
    }
  }
  return lines.join('\n');
}

function latestRuns(count = 2) {
  if (!fs.existsSync(RUNS_DIR)) return [];
  return fs
    .readdirSync(RUNS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => path.join(RUNS_DIR, f))
    .map((file) => ({ file, createdAt: JSON.parse(fs.readFileSync(file, 'utf8')).createdAt }))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .slice(-count)
    .map((r) => r.file);
}

function commandCompare(opts) {
  const files = opts.files.length ? opts.files : latestRuns(2);
  if (files.length !== 2) throw new Error('compare needs two run files, or at least two runs in perf/runs');
  const [before, after] = files.map((f) => JSON.parse(fs.readFileSync(f, 'utf8')));
  return compareRuns(before, after);
}

// ---------- CrUX field data ----------

const cruxDate = (d) => `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;

function parseCruxHistory(record) {
  const periods = (record.collectionPeriods || []).map((p) => ({
    firstDate: cruxDate(p.firstDate),
    lastDate: cruxDate(p.lastDate),
  }));
  const metrics = {};
  for (const [name, key] of Object.entries(CRUX_METRICS)) {
    const p75s = record.metrics?.[name]?.percentilesTimeseries?.p75s;
    if (p75s) metrics[key] = p75s.map((v) => (v == null || v === 'NaN' ? null : Number(v)));
  }
  return { periods, metrics };
}

async function fetchCruxHistory(body, key, { fetchImpl = fetch } = {}) {
  const res = await fetchImpl(`${CRUX_HISTORY_ENDPOINT}?key=${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...body, metrics: Object.keys(CRUX_METRICS) }),
    signal: AbortSignal.timeout(30_000),
  });
  if (res.status === 404) return null; // Not enough traffic for a record.
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(redact(`CrUX returned ${res.status}: ${json.error?.message || 'unknown error'}`, key));
  return parseCruxHistory(json.record);
}

// Averages the weekly p75 values of the windows entirely before and entirely
// after a change date. Windows that straddle the date are left out.
function beforeAfter(entry, change) {
  const out = {};
  for (const [key, values] of Object.entries(entry.metrics)) {
    const before = values.filter((_, i) => entry.periods[i].lastDate < change);
    const after = values.filter((_, i) => entry.periods[i].firstDate >= change);
    out[key] = {
      before: mean(before),
      after: mean(after),
      beforeWeeks: before.filter((v) => v != null).length,
      afterWeeks: after.filter((v) => v != null).length,
    };
  }
  return out;
}

// Index of the most recent weekly window with any value, or -1. Pages near the
// traffic threshold drop in and out of CrUX, so the newest window can be empty.
function lastWindowWithData(entry) {
  if (!entry.periods) return -1;
  for (let i = entry.periods.length - 1; i >= 0; i--) {
    if (Object.values(entry.metrics).some((values) => values[i] != null)) return i;
  }
  return -1;
}

function rating(key, value) {
  const t = FIELD_THRESHOLDS[key];
  if (!t || value == null) return '';
  return value <= t[0] ? 'good' : value <= t[1] ? 'needs improvement' : 'poor';
}

function fmtField(key, value) {
  if (value == null) return '–';
  return key === 'cls' ? value.toFixed(2) : `${Math.round(value)} ms`;
}

function renderField(data, { change } = {}) {
  const lines = [`# Chrome real-user data (75th percentile), read ${data.createdAt.slice(0, 10)}`, ''];
  const keys = ['lcp', 'inp', 'cls', 'fcp', 'ttfb'];
  for (const ff of FORM_FACTORS) {
    const entries = data.entries.filter((e) => e.formFactor === ff);
    if (!entries.length) continue;
    lines.push(`## ${ff === 'mobile' ? 'Phone' : 'Desktop'}`, '');
    lines.push(
      '| Scope | Latest window | LCP | INP | CLS | FCP | TTFB |',
      '| --- | --- | ---: | ---: | ---: | ---: | ---: |'
    );
    for (const e of entries) {
      const name = e.scope === 'origin' ? 'Whole site' : `\`${e.path}\``;
      const last = lastWindowWithData(e);
      if (last === -1) {
        lines.push(`| ${name} | not enough traffic | | | | | |`);
        continue;
      }
      const cells = keys.map((k) => {
        const v = e.metrics[k]?.[last];
        const r = rating(k, v);
        return v == null ? '–' : `${fmtField(k, v)}${r && r !== 'good' ? ` (${r})` : ''}`;
      });
      const stale = last < e.periods.length - 1 ? ' (latest with data)' : '';
      lines.push(
        `| ${name} | ${e.periods[last].firstDate} to ${e.periods[last].lastDate}${stale} | ${cells.join(' | ')} |`
      );
    }
    lines.push('');
    const site = entries.find((e) => e.scope === 'origin' && e.periods);
    if (site) {
      lines.push('Whole-site trend, every fourth weekly window (each covers 28 days):', '');
      for (const k of ['inp', 'lcp']) {
        const points = site.periods
          .map((p, i) => ({ date: p.lastDate, v: site.metrics[k]?.[i] }))
          .filter((_, i, all) => (all.length - 1 - i) % 4 === 0)
          .map((p) => `${p.date.slice(5)}: ${fmtField(k, p.v)}`);
        lines.push(`- ${k.toUpperCase()}: ${points.join(' → ')}`);
      }
      lines.push('');
    }
    if (change) {
      lines.push(
        `Average of weekly windows before and after ${change}:`,
        '',
        '| Scope | Metric | Before | After | Weeks before / after |',
        '| --- | --- | ---: | ---: | --- |'
      );
      for (const e of entries.filter((x) => x.periods)) {
        const ba = beforeAfter(e, change);
        for (const k of ['lcp', 'inp', 'cls']) {
          if (!ba[k]) continue;
          lines.push(
            `| ${e.scope === 'origin' ? 'Whole site' : `\`${e.path}\``} | ${k.toUpperCase()} | ${fmtField(k, ba[k].before)} | ${fmtField(k, ba[k].after)} | ${ba[k].beforeWeeks} / ${ba[k].afterWeeks} |`
          );
        }
      }
      lines.push('');
    }
  }
  return lines.join('\n');
}

async function commandField(opts, { fetchImpl = fetch, now = new Date() } = {}) {
  const key = apiKey();
  const pages = loadPages(opts.pages);
  const origin = new URL(opts.base).origin;
  const entries = [];
  for (const formFactor of opts.formFactors) {
    const targets = [
      { scope: 'origin', body: { origin } },
      ...pages.map((p) => ({ scope: 'url', path: p.path, body: { url: origin + p.path } })),
    ];
    for (const t of targets) {
      const history = await fetchCruxHistory({ ...t.body, formFactor: CRUX_FORM_FACTOR[formFactor] }, key, {
        fetchImpl,
      });
      entries.push({ scope: t.scope, path: t.path, formFactor, ...(history || { periods: null, metrics: {} }) });
    }
  }
  const data = { schema: 1, createdAt: now.toISOString(), origin, entries };
  fs.mkdirSync(FIELD_DIR, { recursive: true });
  const file = path.join(FIELD_DIR, `${data.createdAt.slice(0, 10)}.json`);
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  return { file, data };
}

// ---------- run summary ----------

function renderRunSummary(output) {
  const lines = [
    `# ${output.label} (${output.createdAt.slice(0, 10)}, ${output.base}, Lighthouse ${output.lighthouseVersions.join(', ')})`,
    '',
  ];
  for (const ff of FORM_FACTORS) {
    const rows = output.results.filter((r) => r.formFactor === ff);
    if (!rows.length) continue;
    lines.push(`## ${ff === 'mobile' ? 'Mobile' : 'Desktop'} (median of ${output.runsPerPage} runs)`, '');
    lines.push(
      '| Page | Score | First paint | Largest paint | Blocking time | Layout shift | Weight | Third-party main thread |',
      '| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |'
    );
    for (const r of rows) {
      if (!r.median) {
        lines.push(`| \`${r.path}\` | failed: ${(r.errors || []).join('; ')} | | | | | | |`);
        continue;
      }
      const m = r.median;
      const banner = r.lcpInConsentBanner ? ` †` : '';
      lines.push(
        `| \`${r.path}\` | ${fmt(m.score)} | ${fmt(m.fcp, 'ms')} | ${fmt(m.lcp, 'ms')}${banner} | ${fmt(m.tbt, 'ms')} | ${fmt(m.cls, 'cls')} | ${fmt(m.bytes, 'bytes')} | ${fmt(m.thirdPartyMainThread, 'ms')} |`
      );
    }
    lines.push('');
  }
  if (output.results.some((r) => r.lcpInConsentBanner)) {
    lines.push('† In at least one run, the largest paint was the consent banner rather than page content.', '');
  }
  return lines.join('\n');
}

// ---------- main ----------

async function main(argv) {
  const opts = parseArgs(argv);
  if (opts.command === 'run') {
    const { file, output } = await commandRun(opts);
    console.log(renderRunSummary(output));
    console.log(`Saved ${path.relative(ROOT, file)}`);
    const failed = output.results.filter((r) => !r.median);
    if (failed.length) process.exitCode = 1;
  } else if (opts.command === 'compare') {
    const cmp = commandCompare(opts);
    console.log(opts.json ? JSON.stringify(cmp, null, 2) : renderCompare(cmp, { all: opts.all }));
    if (opts.failOnWorse && cmp.counts.worse) process.exitCode = 1;
  } else if (opts.command === 'field') {
    const { file, data } = await commandField(opts);
    console.log(opts.json ? JSON.stringify(data, null, 2) : renderField(data, { change: opts.change }));
    console.log(`Saved ${path.relative(ROOT, file)}`);
  } else {
    throw new Error(
      'Usage: node bin/perf.js run --label NAME | compare [before.json after.json] | field [--change YYYY-MM-DD]'
    );
  }
}

if (require.main === module) {
  main(process.argv.slice(2)).catch((err) => {
    console.error(redact(err.message, process.env.PSI_API_KEY));
    process.exit(1);
  });
}

module.exports = {
  METRICS,
  MIN_TIMING_SAMPLES,
  aggregateRuns,
  beforeAfter,
  classify,
  compareRuns,
  fetchPsi,
  fmt,
  fmtDelta,
  median,
  parseArgs,
  parseCruxHistory,
  psiUrl,
  redact,
  renderCompare,
  renderField,
  renderRunSummary,
  slugify,
  summarizeLhr,
  summarizePsiField,
};
