const { describe, it } = require('node:test');
const assert = require('node:assert');

const {
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

  it("doesn't read the English word go as the Go SDK", () => {
    assert.ok(!topicsFor('How do I go about scaling?').includes('Go SDK'));
  });

  it('reports questions with no topic', () => {
    assert.deepStrictEqual(topicsFor('hello'), ['(no topic matched)']);
  });
});

describe('gapKind', () => {
  it('ignores requests with results or errors', () => {
    assert.strictEqual(gapKind(record()), null);
    assert.strictEqual(gapKind(record({ status: 502, result_count: null })), null);
  });

  it('tells "Kapa found nothing" from "all filtered"', () => {
    assert.strictEqual(gapKind(record({ result_count: 0, fetched_count: 0, dropped_count: 0 })), 'empty');
    assert.strictEqual(gapKind(record({ result_count: 0, fetched_count: 8, dropped_count: 8 })), 'filtered');
  });

  it('falls back to dropped_count for records written before fetched_count', () => {
    assert.strictEqual(gapKind(record({ result_count: 0, fetched_count: undefined, dropped_count: 0 })), 'empty');
    assert.strictEqual(gapKind(record({ result_count: 0, fetched_count: undefined, dropped_count: 4 })), 'filtered');
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
    record({ src: 'md-page', agent: null, q: 'Unknown thing', result_count: 0, fetched_count: 0, dropped_count: 0 }),
    record({ src: null, agent: null, q: 'Edu course?', result_count: 0, fetched_count: 5, dropped_count: 5, ip_hash: 'c' }),
    record({ status: 400, q: null, src: 'llms', latency_ms: 1 }),
    record({ src: 'manual-test' }),
    record({ deployment: 'preview' }),
  ];
  const s = summarize(records);

  it('counts what it left out', () => {
    assert.strictEqual(s.total, 8);
    assert.strictEqual(s.excluded, 2);
    assert.strictEqual(s.calls, 6);
  });

  it('counts calls per surface, agent, and day', () => {
    assert.strictEqual(s.bySrc.get('llms'), 3);
    assert.strictEqual(s.bySrc.get('(missing)'), 1);
    assert.strictEqual(s.byAgent.get('claude-code'), 3);
    assert.strictEqual(s.byAgent.get('(missing)'), 2);
    assert.strictEqual(s.byDay.get('2026-10-25'), 1);
  });

  it('merges question variants and leaves out rejected requests', () => {
    assert.strictEqual(s.questions.get('how do i set a retry policy').count, 3);
    assert.strictEqual(s.questions.size, 3);
  });

  it('splits gaps by cause', () => {
    assert.deepStrictEqual([...s.gaps.empty.keys()], ['unknown thing']);
    assert.deepStrictEqual([...s.gaps.filtered.keys()], ['edu course']);
  });

  it('counts jtb, missing src and agent, callers, and latency', () => {
    assert.strictEqual(s.jtbFilled, 1);
    assert.strictEqual(s.missingBoth, 1);
    assert.strictEqual(s.callers.get('a'), 2);
    assert.strictEqual(s.latencies.length, 5);
    assert.strictEqual(s.byStatus.get(400), 1);
  });
});

describe('renderMarkdown', () => {
  const s = summarize([
    record({ q: 'Secret | question', jtb: 'Private goal' }),
    record({ q: 'Gap question', result_count: 0, fetched_count: 0, dropped_count: 0 }),
  ]);
  const opts = { since: '2026-10-24', until: '2026-10-24' };

  it('prints each section', () => {
    const md = renderMarkdown(s, opts);
    for (const heading of ['## Discovery', '## Who', '## What', '## Gaps', '## Intent', '## Health', '## Noise']) {
      assert.ok(md.includes(heading), heading);
    }
    assert.ok(md.includes('| Gap question | 1 |'));
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

  it('rejects bad input', () => {
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
