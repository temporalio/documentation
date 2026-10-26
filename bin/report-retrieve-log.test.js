const { describe, it } = require('node:test');
const assert = require('node:assert');

const {
  EXAMPLE_QUESTION,
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
  uaFamily,
  yieldBucket,
  yieldOf,
} = require('./report-retrieve-log');

// A production record with the fields api/retrieve.js writes.
function record(overrides = {}) {
  return {
    ts: '2026-10-24T12:00:00.000Z',
    q: 'How do I set a Retry Policy?',
    jtb: null,
    src: 'llms',
    agent: 'claude-code',
    ua: 'claude-code/1.0',
    country: 'US',
    ip_hash: 'aaaa',
    deployment: 'production',
    source_ids_sent: 19,
    fetched_count: 15,
    dropped_count: 3,
    status: 200,
    upstream_status: 200,
    result_count: 12,
    latency_ms: 1000,
    top_pages: [],
    ...overrides,
  };
}

describe('isExcluded', () => {
  it('keeps production traffic', () => {
    assert.strictEqual(isExcluded(record()), false);
  });

  it('leaves out preview and development unless asked', () => {
    assert.strictEqual(isExcluded(record({ deployment: 'preview' })), true);
    assert.strictEqual(isExcluded(record({ deployment: 'development' })), true);
    assert.strictEqual(isExcluded(record({ deployment: 'preview' }), { includePreview: true }), false);
  });

  it('leaves out our own test traffic unless asked', () => {
    assert.strictEqual(isExcluded(record({ src: 'manual-test' })), true);
    assert.strictEqual(isExcluded(record({ src: 'link-check' })), true);
    assert.strictEqual(isExcluded(record({ src: 'link-check' }), { includeTests: true }), false);
  });
});

describe('normalizeAgent', () => {
  const cases = [
    ['claude-code', 'claude-code'],
    ['Claude Code', 'claude-code'],
    ['claude_code', 'claude-code'],
    ['  Cursor/0.42.3 ', 'cursor'],
    ['codex@1.2', 'codex'],
    ['ChatGPT v4', 'chatgpt'],
    ['gpt-4o', 'gpt-4o'],
    [null, '(missing)'],
    ['', '(missing)'],
    ['<your-name>', '(placeholder)'],
    ['your-name', '(placeholder)'],
  ];
  for (const [input, expected] of cases) {
    it(`${JSON.stringify(input)} -> ${expected}`, () => assert.strictEqual(normalizeAgent(input), expected));
  }
});

describe('normalizeSrc', () => {
  it('keeps the advertised values', () => {
    for (const src of ['llms', 'docs-page', 'md-page']) assert.strictEqual(normalizeSrc(src), src);
  });

  it('labels missing, placeholder, and unknown values', () => {
    assert.strictEqual(normalizeSrc(null), '(missing)');
    assert.strictEqual(normalizeSrc('<surface>'), '(placeholder)');
    assert.strictEqual(normalizeSrc('blog'), 'other: blog');
  });
});

describe('questionKey', () => {
  it('merges case, spacing, and trailing punctuation', () => {
    assert.strictEqual(questionKey('How many Workers do I need?'), questionKey('how many  workers do i need'));
    assert.strictEqual(questionKey('What is a Task Queue?!'), 'what is a task queue');
  });
});

describe('uaFamily', () => {
  it('finds known agent tokens inside browser-style strings', () => {
    assert.strictEqual(
      uaFamily('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot'),
      'ChatGPT-User'
    );
  });

  it('groups other browser strings', () => {
    assert.strictEqual(uaFamily('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'), 'Browser-like (Mozilla/...)');
  });

  it('uses the first product token otherwise', () => {
    assert.strictEqual(uaFamily('curl/8.7.1'), 'curl');
    assert.strictEqual(uaFamily('python-httpx/0.27.0'), 'python-httpx');
    assert.strictEqual(uaFamily(null), '(missing)');
  });
});

describe('topicsFor', () => {
  it('matches SDKs and features', () => {
    assert.deepStrictEqual(topicsFor('How do I version a Workflow in the Python SDK?'), ['Python SDK', 'Versioning']);
    assert.deepStrictEqual(topicsFor('Signals in golang'), ['Go SDK', 'Signals, Queries, Updates']);
  });

  it('matches Task Queues and persistence questions', () => {
    assert.deepStrictEqual(topicsFor('What is a Task Queue?'), ['Task Queues']);
    assert.deepStrictEqual(topicsFor('Does Temporal support Oracle as a database?'), ['Self-hosted']);
  });

  it('matches the newer topics', () => {
    assert.deepStrictEqual(topicsFor('workflow determinism'), ['Determinism']);
    assert.deepStrictEqual(topicsFor('activity heartbeat timeout'), ['Timeouts and retries', 'Activities']);
    assert.deepStrictEqual(topicsFor('Upgrade self-hosted Temporal on PostgreSQL 16'), ['Self-hosted', 'Upgrades and migration']);
    assert.deepStrictEqual(topicsFor('mock an activity in a unit test'), ['Testing', 'Activities']);
  });

  it("doesn't read the English word go as the Go SDK", () => {
    assert.ok(!topicsFor('How do I go about scaling?').includes('Go SDK'));
  });

  it('reports questions with no topic', () => {
    assert.deepStrictEqual(topicsFor('hello'), ['(no topic matched)']);
  });
});

describe('isAutomated', () => {
  it('matches audit tools by agent or user agent', () => {
    assert.strictEqual(isAutomated(record({ agent: 'auditor' })), true);
    assert.strictEqual(isAutomated(record({ agent: 'argus' })), true);
    assert.strictEqual(isAutomated(record({ agent: null, ua: 'argus-inspector/1.0' })), true);
    assert.strictEqual(isAutomated(record({ agent: null, ua: 'IF-source-quality-review/2' })), true);
  });

  it('leaves agents that help a person alone', () => {
    for (const agent of ['claude-code', 'cursor', 'copilot-review', 'research-bot']) {
      assert.strictEqual(isAutomated(record({ agent })), false, agent);
    }
  });

  it('takes extra patterns', () => {
    assert.strictEqual(isAutomated(record({ agent: 'peer-0' }), [/^peer-\d+$/i]), true);
  });
});

describe('queryStyle', () => {
  it('tells questions from keyword searches', () => {
    assert.strictEqual(queryStyle('What is the sticky execution cache on a Worker?'), 'Question');
    assert.strictEqual(queryStyle('how do i patch a workflow'), 'Question');
    assert.strictEqual(queryStyle('workflow determinism'), 'Keywords');
    assert.strictEqual(queryStyle('"WorkflowStub.fromTyped" "start" signal Java'), 'Keywords');
  });
});

describe('rejectReason', () => {
  it('explains a 400 from what was logged', () => {
    assert.strictEqual(rejectReason(record({ status: 400, q: null })), 'Missing q');
    assert.strictEqual(rejectReason(record({ status: 400, q: '  ' })), 'Missing q');
    assert.strictEqual(rejectReason(record({ status: 400, q: 'a'.repeat(200) })), 'q over the length limit');
    assert.strictEqual(rejectReason(record()), null);
  });
});

describe('yieldOf', () => {
  it('reads results, dropped, and fetched', () => {
    assert.deepStrictEqual(yieldOf(record({ result_count: 2, dropped_count: 13, fetched_count: 15 })), {
      results: 2,
      dropped: 13,
      fetched: 15,
    });
  });

  it('adds up fetched for records written before fetched_count', () => {
    assert.deepStrictEqual(yieldOf(record({ result_count: 6, dropped_count: 9, fetched_count: undefined })), {
      results: 6,
      dropped: 9,
      fetched: 15,
    });
  });

  it('buckets result counts', () => {
    assert.deepStrictEqual([0, 1, 2, 3, 5, 6, 10, 11, 15].map(yieldBucket), ['0', '1', '2', '3-5', '3-5', '6-10', '6-10', '11-15', '11-15']);
  });
});

describe('percentile', () => {
  it('uses nearest rank', () => {
    const values = [5, 1, 4, 2, 3, 10, 9, 8, 7, 6];
    assert.strictEqual(percentile(values, 50), 5);
    assert.strictEqual(percentile(values, 95), 10);
    assert.strictEqual(percentile([], 50), null);
  });
});

describe('summarize', () => {
  const records = [
    record({ src: 'llms', agent: 'Claude Code', jtb: 'Fix a retry bug', ip_hash: 'a' }),
    record({ src: 'llms', agent: 'claude-code', q: 'how do i set a retry policy', ip_hash: 'a' }),
    record({ src: 'docs-page', agent: 'cursor', ts: '2026-10-25T01:00:00.000Z', ip_hash: 'b' }),
    record({ src: 'md-page', agent: null, q: 'workflow determinism', result_count: 0, fetched_count: 15, dropped_count: 15 }),
    record({ src: null, agent: null, q: EXAMPLE_QUESTION, result_count: 1, fetched_count: 15, dropped_count: 14, ip_hash: 'c' }),
    record({ src: 'llms', agent: 'auditor', ua: 'audit-bot/1', q: 'What is a Worker?' }),
    record({ status: 400, q: null, src: 'llms', latency_ms: 1 }),
    record({ status: 400, q: '<question', src: 'llms', latency_ms: 1 }),
    record({ src: 'manual-test' }),
    record({ deployment: 'preview' }),
  ];
  const s = summarize(records);

  it('counts what it left out', () => {
    assert.strictEqual(s.total, 10);
    assert.strictEqual(s.excluded, 2);
    assert.strictEqual(s.calls, 8);
  });

  it('counts calls per surface and day, including automated tools', () => {
    assert.strictEqual(s.bySrc.get('llms'), 5);
    assert.strictEqual(s.bySrc.get('(missing)'), 1);
    assert.strictEqual(s.byDay.get('2026-10-25'), 1);
  });

  it('reports automated tools apart from agents', () => {
    assert.strictEqual(s.automatedCalls, 1);
    assert.strictEqual(s.byTool.get('auditor'), 1);
    assert.strictEqual(s.byAgent.get('auditor'), undefined);
    assert.strictEqual(s.byAgent.get('claude-code'), 4);
    assert.strictEqual(s.byAgent.get('(missing)'), 2);
  });

  it('merges question variants and leaves out rejected requests', () => {
    assert.strictEqual(s.questions.get('how do i set a retry policy').count, 3);
    assert.strictEqual(s.questions.size, 4);
  });

  it('counts query style and the verbatim example', () => {
    assert.strictEqual(s.byStyle.get('Question'), 5);
    assert.strictEqual(s.byStyle.get('Keywords'), 1);
    assert.strictEqual(s.exampleVerbatim, 1);
  });

  it('tracks yield and low-yield questions', () => {
    assert.strictEqual(s.byYield.get('0'), 1);
    assert.strictEqual(s.byYield.get('1'), 1);
    assert.strictEqual(s.byYield.get('11-15'), 4);
    assert.deepStrictEqual([...s.lowYield.keys()].sort(), [questionKey(EXAMPLE_QUESTION), 'workflow determinism']);
    assert.strictEqual(s.droppedTotal, 3 * 4 + 15 + 14);
  });

  it('explains rejections and counts placeholders', () => {
    assert.strictEqual(s.rejects.get('Missing q'), 1);
    assert.strictEqual(s.rejects.get('q over the length limit'), 1);
    assert.strictEqual(s.placeholderQuestions, 1);
  });

  it('counts jtb, missing src and agent, callers, and latency', () => {
    assert.strictEqual(s.jtbFilled, 1);
    assert.strictEqual(s.missingBoth, 1);
    assert.strictEqual(s.callers.get('a'), 2);
    assert.strictEqual(s.latencies.length, 6);
    assert.strictEqual(s.byStatus.get(400), 2);
  });
});

describe('renderMarkdown', () => {
  const s = summarize([
    record({ q: 'Secret | question', jtb: 'Private goal' }),
    record({ q: 'Gap question', result_count: 0, fetched_count: 15, dropped_count: 15 }),
  ]);
  const opts = { since: '2026-10-24', until: '2026-10-24' };

  it('prints each section', () => {
    const md = renderMarkdown(s, opts);
    for (const heading of ['## Discovery', '## Who', '## What', '## Gaps', '## Intent', '## Health', '## Noise']) {
      assert.ok(md.includes(heading), heading);
    }
    assert.ok(md.includes('| Gap question | 1 | 0.0 | 100% |'));
  });

  it('never leaves more than one blank line in a row', () => {
    assert.ok(!/\n{3,}/.test(renderMarkdown(s, opts)));
  });

  it('escapes pipes inside table cells', () => {
    assert.ok(renderMarkdown(s, opts).includes('Secret \\| question'));
  });

  it('leaves out question text and jtb with hideText', () => {
    const md = renderMarkdown(s, { ...opts, hideText: true });
    assert.ok(!md.includes('Secret'));
    assert.ok(!md.includes('Gap question'));
    assert.ok(!md.includes('Private goal'));
    assert.ok(md.includes('1 distinct questions.'));
  });
});

describe('daysBetween', () => {
  it('lists every day, inclusive, across a month boundary', () => {
    assert.deepStrictEqual(daysBetween('2026-10-30', '2026-11-02'), ['2026-10-30', '2026-10-31', '2026-11-01', '2026-11-02']);
  });
});

describe('parseArgs', () => {
  it('defaults to the 14 days ending on --until', () => {
    const opts = parseArgs(['--until', '2026-11-06']);
    assert.strictEqual(opts.since, '2026-10-24');
    assert.strictEqual(opts.top, 15);
  });

  it('collects --automation patterns', () => {
    const opts = parseArgs(['--automation', '^peer-\\d+$', '--automation', 'harness']);
    assert.strictEqual(opts.automation.length, 2);
    assert.ok(opts.automation[0].test('PEER-3'));
  });

  it('rejects bad input', () => {
    assert.throws(() => parseArgs(['--automation', '(']));
    assert.throws(() => parseArgs(['--since', '10/24/2026']));
    assert.throws(() => parseArgs(['--since', '2026-11-02', '--until', '2026-11-01']));
    assert.throws(() => parseArgs(['--bogus']));
  });
});

describe('readRecords', () => {
  it('lists each day with pagination and reads every record', async () => {
    const store = {
      'retrieve-log/2026-10-24/1.json': record({ q: 'one' }),
      'retrieve-log/2026-10-24/2.json': record({ q: 'two' }),
      'retrieve-log/2026-10-25/3.json': record({ q: 'three' }),
      'retrieve-log/2026-10-25/bad.json': '{not json',
    };
    const prefixes = [];
    const list = async ({ prefix, cursor }) => {
      prefixes.push(prefix);
      const names = Object.keys(store).filter((p) => p.startsWith(prefix));
      // One-item pages, so each day needs a second request.
      const start = cursor ? Number(cursor) : 0;
      const page = names.slice(start, start + 1);
      const hasMore = start + 1 < names.length;
      return { blobs: page.map((pathname) => ({ pathname })), hasMore, cursor: hasMore ? String(start + 1) : undefined };
    };
    const get = async (pathname, { access }) => {
      assert.strictEqual(access, 'private');
      const body = store[pathname];
      return { stream: new Response(typeof body === 'string' ? body : JSON.stringify(body)).body };
    };

    const { records, unreadable } = await readRecords(['2026-10-24', '2026-10-25'], { list, get });
    assert.deepStrictEqual(records.map((r) => r.q).sort(), ['one', 'three', 'two']);
    assert.strictEqual(unreadable, 1);
    assert.deepStrictEqual(prefixes, [
      'retrieve-log/2026-10-24/',
      'retrieve-log/2026-10-24/',
      'retrieve-log/2026-10-25/',
      'retrieve-log/2026-10-25/',
    ]);
  });
});
