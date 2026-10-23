#!/usr/bin/env node
// Asks the /api/retrieve endpoint a fixed set of questions and checks that
// every docs.temporal.io `source_url` it returns serves a page. The function
// rewrites Kapa's URLs to `.md` and follows vercel.json redirects, but Kapa
// may have indexed a page that has since been deleted, and its `.md` 404s.
//
// Requests carry src=link-check and agent=check-retrieve-links, so they can be
// filtered out of the experiment's request log. They're sent one at a time with
// a pause between them to stay under the endpoint's Vercel Firewall rate limit.
//
// Advisory: not run in CI. Non-200 links, including 308s, are reported and set
// the exit code to 1.
//
// Usage: node bin/check-retrieve-links.js [baseUrl]
//   baseUrl defaults to https://docs.temporal.io. Pass a preview deployment URL
//   to check a branch. Links are checked on docs.temporal.io either way, since
//   that's where the returned URLs point.

const BASE_URL = (process.argv[2] || 'https://docs.temporal.io').replace(/\/+$/, '');
const DOCS_ORIGIN = 'https://docs.temporal.io';
const PAUSE_MS = 4_000;
const TIMEOUT_MS = 20_000;

const QUESTIONS = [
  'How do I safely change Workflow code while executions are still running in the Python SDK?',
  'How do I set a Start-To-Close Timeout on an Activity in the TypeScript SDK?',
  'How do I send a Signal to a running Workflow in the Go SDK?',
  'How do I write a unit test for a Workflow in the Java SDK?',
  'How do I use Continue-As-New to keep Event History small in .NET?',
  'How do I heartbeat a long-running Activity in the Ruby SDK?',
  'How do I configure a Retry Policy for an Activity?',
  'What is the difference between a Signal, a Query, and an Update?',
  'How do I enable Worker Versioning with Worker Deployments?',
  'How do I create an API key for Temporal Cloud?',
  'How do I connect a Worker to Temporal Cloud with mTLS certificates?',
  'What are the default Namespace limits in Temporal Cloud?',
  'How do I start a local development server with the Temporal CLI?',
  'How do I list Workflow Executions with a Visibility query from the CLI?',
  'How do I deploy a self-hosted Temporal Service with Helm?',
  'Which databases does a self-hosted Temporal Service support for persistence?',
  'What Prometheus metrics should I monitor for Worker task backlog?',
  'How do I encrypt payloads with a custom Payload Codec?',
  'How do I run a Nexus Operation from a Workflow?',
  'How do I call an LLM from a Temporal Workflow?',
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retrieve(question) {
  const params = new URLSearchParams({ q: question, src: 'link-check', agent: 'check-retrieve-links' });
  const res = await fetch(`${BASE_URL}/api/retrieve?${params}`, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

async function status(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(TIMEOUT_MS) });
    return { status: res.status, location: res.headers.get('location') };
  } catch (err) {
    return { status: null, location: err.message };
  }
}

async function main() {
  console.log(`Checking ${QUESTIONS.length} questions against ${BASE_URL}/api/retrieve`);

  // url → questions that returned it
  const docsLinks = new Map();
  const otherHosts = new Map();
  const failedQuestions = [];
  let empty = 0;

  for (const [i, question] of QUESTIONS.entries()) {
    if (i > 0) await sleep(PAUSE_MS);
    try {
      const results = await retrieve(question);
      if (results.length === 0) empty++;
      for (const { source_url: url } of results) {
        const bucket = url.startsWith(`${DOCS_ORIGIN}/`) ? docsLinks : otherHosts;
        if (!bucket.has(url)) bucket.set(url, []);
        bucket.get(url).push(question);
      }
      process.stdout.write('.');
    } catch (err) {
      failedQuestions.push({ question, error: err.message });
      process.stdout.write('x');
    }
  }
  process.stdout.write('\n');

  const broken = [];
  for (const url of docsLinks.keys()) {
    const result = await status(url);
    if (result.status !== 200) broken.push({ url, ...result });
  }

  const hosts = new Map();
  for (const url of otherHosts.keys()) {
    const host = URL.canParse(url) ? new URL(url).host : '(not a URL)';
    hosts.set(host, (hosts.get(host) || 0) + 1);
  }

  console.log(`\n${docsLinks.size} distinct docs links, ${broken.length} not 200.`);
  console.log(`${otherHosts.size} distinct links on other hosts (left unchanged by the endpoint).`);
  for (const [host, count] of [...hosts].sort((a, b) => b[1] - a[1])) console.log(`  ${host}: ${count}`);
  if (empty) console.log(`${empty} questions returned no results.`);

  for (const { question, error } of failedQuestions) console.log(`\nFAILED: ${question}\n  ${error}`);
  for (const { url, status: code, location } of broken) {
    console.log(`\n${code ?? 'ERROR'} ${url}${location ? ` -> ${location}` : ''}`);
    for (const question of docsLinks.get(url)) console.log(`  from: ${question}`);
  }

  process.exitCode = broken.length > 0 || failedQuestions.length > 0 ? 1 : 0;
}

if (require.main === module) main();
