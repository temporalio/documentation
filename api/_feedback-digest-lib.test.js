const { describe, it } = require('node:test');
const assert = require('node:assert');
const {
  code,
  daysEnding,
  formatDigest,
  groupRecords,
  isDay,
  previousDay,
  sitemapPaths,
  topProblemPages,
} = require('./_feedback-digest-lib');

const DOCS = 'https://docs.temporal.io';

const report = (fields = {}) => ({
  kind: 'report',
  channel: 'agent',
  deployment: 'production',
  title: 'Wrong flag',
  message: 'The page says --foo; the CLI has --bar.',
  category: 'documentation',
  severity: 'medium',
  page_url: `${DOCS}/cli`,
  agent: 'claude-code',
  ...fields,
});
const rating = (id, fields = {}) => ({
  kind: 'rating',
  id,
  deployment: 'production',
  page_url: `${DOCS}/workflows`,
  rating: 'down',
  ...fields,
});
const amendment = (id, fields = {}) => ({
  kind: 'amendment',
  id,
  deployment: 'production',
  amended_at: '2026-11-03T10:00:00.000Z',
  rating: 'down',
  reason: 'code_sample_errors',
  ...fields,
});

const allText = (message) =>
  message.blocks.map((b) => (b.text ? b.text.text : b.elements.map((e) => e.text).join(''))).join('\n');

describe('days', () => {
  it('finds the previous UTC day', () => {
    assert.strictEqual(previousDay(new Date('2026-11-04T15:00:00Z')), '2026-11-03');
    assert.strictEqual(previousDay(new Date('2026-03-01T00:30:00Z')), '2026-02-28');
  });

  it('lists the days ending with a day, oldest first', () => {
    assert.deepStrictEqual(daysEnding('2026-11-02', 3), ['2026-10-31', '2026-11-01', '2026-11-02']);
  });

  it('checks the date format', () => {
    assert.ok(isDay('2026-11-03'));
    assert.ok(!isDay('2026-13-40'));
    assert.ok(!isDay('yesterday'));
  });
});

describe('code', () => {
  it('escapes Slack control characters so text cannot mention anyone', () => {
    const text = code('<!channel> <@U123> & <https://evil.example|click>', 200);
    assert.ok(!text.includes('<'));
    assert.ok(!text.includes('>'));
    assert.match(text, /&lt;!channel&gt;/);
    assert.match(text, /&amp;/);
  });

  it('keeps text inside one code span', () => {
    assert.strictEqual(code('a `b`\n\nc', 50), "`a 'b' c`");
  });

  it('cuts long text', () => {
    assert.strictEqual(code('x'.repeat(20), 10), `\`${'x'.repeat(9)}…\``);
  });
});

describe('sitemapPaths', () => {
  it('reads paths from <loc> entries', () => {
    const paths = sitemapPaths(
      `<urlset><url><loc>${DOCS}/workflows</loc></url><url><loc>${DOCS}/</loc></url></urlset>`
    );
    assert.deepStrictEqual([...paths].sort(), ['/', '/workflows']);
  });
});

describe('groupRecords', () => {
  it('leaves out preview and development records by default', () => {
    const grouped = groupRecords([report(), report({ deployment: 'preview', title: 'Other' })]);
    assert.strictEqual(grouped.reports.length, 1);
    assert.strictEqual(grouped.skipped, 1);
    assert.strictEqual(groupRecords([report({ deployment: 'preview' })], { includePreview: true }).reports.length, 1);
  });

  it('collapses reports with the same page and title', () => {
    const { reports } = groupRecords([
      report(),
      report({ title: '  wrong   FLAG ', agent: 'codex', severity: 'high' }),
      report({ page_url: `${DOCS}/workflows` }),
    ]);
    assert.strictEqual(reports.length, 2);
    const merged = reports.find((r) => r.count === 2);
    assert.deepStrictEqual(merged.agents, ['claude-code', 'codex']);
    assert.strictEqual(merged.severity, 'high');
    assert.strictEqual(reports[0], merged, 'higher severity sorts first');
  });

  it('counts senders and keeps the different messages of a grouped report', () => {
    const { reports } = groupRecords([
      report({ ip_hash: 'a' }),
      report({ ip_hash: 'a', message: '  the page says --FOO; the CLI has --bar. ' }),
      report({ ip_hash: 'a', message: 'Second message' }),
      report({ ip_hash: 'b', message: 'Third message' }),
    ]);
    assert.strictEqual(reports.length, 1);
    assert.deepStrictEqual(reports[0].senders, ['a', 'b']);
    assert.deepStrictEqual(reports[0].messages, [
      'The page says --foo; the CLI has --bar.',
      'Second message',
      'Third message',
    ]);
  });

  it('merges a rating with its latest amendment', () => {
    const { ratings } = groupRecords([
      rating('a'),
      amendment('a', { amended_at: '2026-11-03T10:05:00.000Z', rating: 'up', reason: 'solved_problem' }),
      amendment('a', { amended_at: '2026-11-03T10:01:00.000Z', reason: 'inaccurate' }),
      rating('b'),
      amendment('b', { comment: 'Import is wrong.' }),
      rating('c', { rating: 'up' }),
      amendment('orphan'),
    ]);
    assert.strictEqual(ratings.length, 1);
    const page = ratings[0];
    assert.strictEqual(page.up.count, 2);
    assert.deepStrictEqual(page.up.reasons, { solved_problem: 1, none: 1 });
    assert.strictEqual(page.down.count, 1);
    assert.deepStrictEqual(page.down.reasons, { code_sample_errors: 1 });
    assert.deepStrictEqual(page.comments, [
      { rating: 'down', reason: 'code_sample_errors', comment: 'Import is wrong.' },
    ]);
  });
});

describe('topProblemPages', () => {
  it('ranks pages by No ratings plus docs reports', () => {
    const grouped = groupRecords([
      rating('a'),
      rating('b'),
      rating('c', { page_url: `${DOCS}/cli`, rating: 'up' }),
      report(),
      report({ category: 'product', page_url: `${DOCS}/workers`, title: 'SDK bug' }),
    ]);
    assert.deepStrictEqual(topProblemPages(grouped), [
      { page_url: `${DOCS}/workflows`, down: 2, reports: 0 },
      { page_url: `${DOCS}/cli`, down: 0, reports: 1 },
    ]);
  });
});

describe('formatDigest', () => {
  it('puts product reports before documentation reports', () => {
    const grouped = groupRecords([report(), report({ category: 'product', title: 'Worker crashes' })]);
    const text = allText(formatDigest('2026-11-03', grouped, { knownPaths: new Set(['/cli']) }));
    assert.ok(text.indexOf('Product reports') < text.indexOf('Documentation reports'));
    assert.match(text, /<https:\/\/docs\.temporal\.io\/cli\|\/cli>/);
  });

  it('flags a docs page the sitemap does not have', () => {
    const grouped = groupRecords([report({ page_url: `${DOCS}/no-such-page` })]);
    const text = allText(formatDigest('2026-11-03', grouped, { knownPaths: new Set(['/cli']) }));
    assert.match(text, /no-such-page> \(not in sitemap\)/);
  });

  it('shows a URL on another host as text, not a link', () => {
    const grouped = groupRecords([report({ page_url: 'https://evil.example/x' })]);
    const text = allText(formatDigest('2026-11-03', grouped, { knownPaths: new Set() }));
    assert.match(text, /`https:\/\/evil\.example\/x`/);
    assert.ok(!text.includes('<https://evil'));
  });

  it('shows the sender count and up to three messages for a grouped report', () => {
    const records = ['a', 'b', 'c', 'd'].map((m) => report({ ip_hash: 'x', message: `Message ${m}` }));
    const text = allText(formatDigest('2026-11-03', groupRecords(records), { knownPaths: new Set(['/cli']) }));
    assert.match(text, /reported 4 times from 1 sender/);
    assert.match(text, /`Message a`[\s\S]*`Message b`[\s\S]*`Message c`/);
    assert.ok(!text.includes('Message d'));
    assert.match(text, /and 1 more message in the Blob store/);
  });

  it('leaves out the sender count when records have no IP hash', () => {
    const text = allText(formatDigest('2026-11-03', groupRecords([report(), report()]), { knownPaths: new Set() }));
    assert.match(text, /reported 2 times ·/);
  });

  it('neutralizes mentions in free text', () => {
    const grouped = groupRecords([report({ title: '<!channel> read this', message: '<!here>' })]);
    const text = allText(formatDigest('2026-11-03', grouped, { knownPaths: new Set() }));
    assert.ok(!text.includes('<!channel>'));
    assert.ok(!text.includes('<!here>'));
  });

  it('summarizes ratings with reasons and comments', () => {
    const grouped = groupRecords([rating('a'), amendment('a', { comment: 'Import is wrong.' }), rating('b')]);
    const message = formatDigest('2026-11-03', grouped, { knownPaths: new Set(['/workflows']) });
    assert.match(message.text, /0 agent reports, 2 page ratings \(0 Yes, 2 No\)/);
    assert.match(allText(message), /No 2 \((code sample errors 1, no reason 1|no reason 1, code sample errors 1)\)/);
    assert.match(allText(message), /No, code sample errors: `Import is wrong\.`/);
  });

  it('says so on a day with no feedback', () => {
    const message = formatDigest('2026-11-03', groupRecords([]), { knownPaths: new Set() });
    assert.match(message.text, /No feedback/);
  });

  it('notes a missing sitemap and unreadable records', () => {
    const text = allText(formatDigest('2026-11-03', groupRecords([]), { unreadable: 2 }));
    assert.match(text, /2 records couldn't be read/);
    assert.match(text, /sitemap couldn't be fetched/);
  });

  it("stays within Slack's block and length limits", () => {
    const many = Array.from({ length: 400 }, (_, i) => report({ title: `Problem ${i}`, message: 'x'.repeat(2000) }));
    const message = formatDigest('2026-11-03', groupRecords(many), { knownPaths: new Set() });
    assert.ok(message.blocks.length <= 50);
    for (const block of message.blocks) {
      if (block.text) assert.ok(block.text.text.length <= 3000);
    }
    assert.match(allText(message), /more sections didn't fit/);
  });

  it('adds the weekly rollup when given', () => {
    const grouped = groupRecords([rating('a')]);
    const text = allText(
      formatDigest('2026-11-01', grouped, { knownPaths: new Set(), weekly: topProblemPages(grouped) })
    );
    assert.match(text, /Last 7 days: pages with the most problems/);
  });
});
