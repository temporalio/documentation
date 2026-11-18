#!/usr/bin/env node
// Daily canary for the /api/retrieve agent search endpoint. Asks two fixed
// questions and fails when the endpoint is down or its results have lost a kind
// of source they should include.
//
// Both kinds of failure have happened without a deploy on our side. On
// 2026-10-30 Kapa started rejecting a request that names a deleted source, so
// every call returned 502. Kapa also started applying source_ids_include as a
// filter, which silently dropped custom Q&A answers and GitHub results. The
// first question catches both an outage and lost custom Q&A answers; the second
// catches lost GitHub repository files.
//
// Each request carries src=healthcheck, so the request log report can leave it
// out, and an agent value unique to the run, so the CDN can't answer from a
// cached response and the function runs every time.
//
// Usage: node bin/check-retrieve-health.js [baseUrl]
//   baseUrl defaults to https://docs.temporal.io. Exits 1 when a check fails.

const BASE_URL = (process.argv[2] || 'https://docs.temporal.io').replace(/\/+$/, '');
const PAUSE_MS = 4_000;
const TIMEOUT_MS = 20_000;

const CHECKS = [
  {
    question: 'free credits temporal cloud',
    minResults: 5,
    missing: 'No result is a custom Q&A answer (empty source_url).',
    matches: (result) => result.source_url === '',
    ifMissing:
      'The curated Temporal Cloud pricing answer is in Kapa as custom Q&A. It goes missing when Kapa applies a ' +
      'source filter, or when the custom Q&A source is removed.',
  },
  {
    question: 'rust sdk workflow determinism',
    minResults: 5,
    missing: 'No result is a file in a github.com/temporalio repository.',
    // A file (/blob/), not a release page: the SDK release notes are web crawl
    // sources, so they still come back when Kapa filters to web crawls.
    matches: (result) => /^https:\/\/github\.com\/temporalio\/[^/]+\/blob\//.test(result.source_url),
    ifMissing:
      'GitHub results go missing when Kapa applies a source filter, when the GitHub file sources are removed, ' +
      'or when RETRIEVE_URL_ALLOWLIST loses the github.com/temporalio/sdk-* entries.',
  },
];

// Returns the problems with one check's response, or [] when it passed.
// `response` is { status, body } or { error } for a request that failed.
function evaluate(check, response) {
  if (response.error) return [`Request failed: ${response.error}`];
  if (response.status !== 200) {
    const detail = typeof response.body === 'string' ? response.body : JSON.stringify(response.body);
    return [
      `HTTP ${response.status}: ${(detail || '').slice(0, 200)}. For a 502, find "retrieve: Kapa returned" in the ` +
        "Vercel runtime logs for /api/retrieve, which gives Kapa's status and reason.",
    ];
  }
  if (!Array.isArray(response.body)) return ['The response is not a JSON array.'];

  const problems = [];
  if (response.body.length < check.minResults) {
    problems.push(`${response.body.length} results, expected at least ${check.minResults}.`);
  }
  const valid = response.body.filter((result) => result && typeof result.source_url === 'string');
  if (!valid.some(check.matches)) problems.push(`${check.missing} ${check.ifMissing}`);
  return problems;
}

async function ask(question, runId) {
  const params = new URLSearchParams({ q: question, src: 'healthcheck', agent: `healthcheck-${runId}` });
  try {
    const res = await fetch(`${BASE_URL}/api/retrieve?${params}`, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    const text = await res.text();
    let body = text;
    try {
      body = JSON.parse(text);
    } catch {
      // Leave a non-JSON body as text for the report.
    }
    return { status: res.status, body };
  } catch (err) {
    return { error: err.message };
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const runId = process.env.GITHUB_RUN_ID || Date.now().toString(36);
  const lines = [`## /api/retrieve health check`, '', `Endpoint: ${BASE_URL}/api/retrieve`, ''];
  let failed = false;

  for (const [index, check] of CHECKS.entries()) {
    if (index > 0) await sleep(PAUSE_MS);
    const response = await ask(check.question, runId);
    const problems = evaluate(check, response);
    const count = Array.isArray(response.body) ? `, ${response.body.length} results` : '';
    if (problems.length === 0) {
      lines.push(`- PASS "${check.question}" (HTTP ${response.status}${count})`);
    } else {
      failed = true;
      lines.push(`- FAIL "${check.question}"${count}`);
      for (const problem of problems) lines.push(`  - ${problem}`);
    }
  }

  const report = lines.join('\n');
  console.log(report);
  if (process.env.GITHUB_STEP_SUMMARY) {
    require('fs').appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${report}\n`);
  }
  if (failed) process.exitCode = 1;
}

if (require.main === module) main();

module.exports = { CHECKS, evaluate };
