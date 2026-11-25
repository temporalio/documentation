const { describe, it } = require('node:test');
const assert = require('node:assert');
const {
  stripFrontmatter,
  tokenize,
  changedWordCount,
  resolveLastModified,
  parseIgnoreRevs,
  parseRawLog,
} = require('./lastModified');

const PARAGRAPH =
  'A Workflow Definition must be deterministic. The Worker polls the Temporal Service for tasks and runs ' +
  'the Workflow code it receives. Activities can call external services, and they retry on failure according ' +
  'to their Retry Policy.';

function version(commit, source, timestamp) {
  return { commit, timestamp, author: 'someone', tokens: tokenize(stripFrontmatter(source)) };
}

function page(frontmatter, body) {
  return `---\n${frontmatter}\n---\n\n${body}\n`;
}

function datedCommit(versions, options) {
  return resolveLastModified(versions, options)?.commit;
}

describe('stripFrontmatter', () => {
  it('removes a leading YAML block, including CRLF line endings', () => {
    assert.strictEqual(stripFrontmatter('---\ntitle: X\n---\nBody'), 'Body');
    assert.strictEqual(stripFrontmatter('---\r\ntitle: X\r\n---\r\nBody'), 'Body');
  });

  it('leaves a page without frontmatter alone', () => {
    assert.strictEqual(stripFrontmatter('# Title\n\n---\n'), '# Title\n\n---\n');
  });
});

describe('tokenize', () => {
  it('ignores punctuation, case, and Markdown formatting', () => {
    assert.deepStrictEqual(tokenize('**Start** a `Workflow`, then: _wait_.'), tokenize('start a workflow then wait'));
  });
});

describe('changedWordCount', () => {
  it('counts added plus removed words', () => {
    assert.strictEqual(changedWordCount(tokenize('one two three'), tokenize('one too three')), 2);
    assert.strictEqual(changedWordCount(tokenize('one two'), tokenize('one two three four')), 2);
    assert.strictEqual(changedWordCount(tokenize('same text'), tokenize('same text')), 0);
  });

  it('stops counting at the limit', () => {
    const a = tokenize(PARAGRAPH);
    const b = tokenize('Completely different words replace everything that was here before now.');
    assert.strictEqual(changedWordCount(a, b, 5), 5);
  });
});

describe('resolveLastModified', () => {
  const original = version('a', page('title: Workflows', PARAGRAPH), 1);

  it('keeps the date when only frontmatter changes', () => {
    const versions = [original, version('b', page('title: Workflows\nsection_title: Go SDK', PARAGRAPH), 2)];
    assert.strictEqual(datedCommit(versions), 'a');
  });

  it('keeps the date for a typo fix', () => {
    const versions = [original, version('b', page('title: Workflows', PARAGRAPH.replace('receives', 'recieves')), 2)];
    assert.strictEqual(datedCommit(versions), 'a');
  });

  it('keeps the date for formatting and reflow', () => {
    const reflowed = PARAGRAPH.replace('Worker', '**Worker**').replace(/\. /g, '.\n\n');
    assert.strictEqual(datedCommit([original, version('b', page('title: Workflows', reflowed), 2)]), 'a');
  });

  it('moves the date for a 20+ word edit', () => {
    const added =
      PARAGRAPH +
      ' Set a Start-To-Close Timeout on every Activity so the Temporal Service can detect a Worker that crashed ' +
      'while it was running the Activity.';
    assert.strictEqual(datedCommit([original, version('b', page('title: Workflows', added), 2)]), 'b');
  });

  it('accumulates small edits until they pass the threshold', () => {
    const words = PARAGRAPH.split(' ');
    const versions = [original];
    for (let i = 1; i <= 8; i++) {
      // Each commit rewrites one more word than the last version had.
      const edited = words.map((word, index) => (index < i * 2 ? `changed${index}` : word)).join(' ');
      versions.push(version(`edit${i}`, page('title: Workflows', edited), 1 + i));
    }
    // Each step changes 2 words (4 added + removed) but none alone reaches 20.
    for (let i = 1; i < versions.length; i++) {
      assert.ok(changedWordCount(versions[i - 1].tokens, versions[i].tokens) < 20);
    }
    // Against the dated version, edit5 is the first to reach 20 (10 words
    // replaced). edit5 then becomes the baseline, and edit6-8 add only 12.
    assert.strictEqual(datedCommit(versions.slice(0, 5)), 'a');
    assert.strictEqual(datedCommit(versions), 'edit5');
  });

  it('skips ignored revisions and uses their text as the new baseline', () => {
    const swept = PARAGRAPH.replace(/\b(\w+)\b/g, (word, w, index) => (index % 3 === 0 ? `${w}x` : w));
    const sweep = version('sweep', page('title: Workflows', swept), 2);
    assert.ok(changedWordCount(original.tokens, sweep.tokens) >= 20);
    const typo = version('typo', page('title: Workflows', sweep.tokens.join(' ').replace('receives', 'gets')), 3);
    assert.strictEqual(datedCommit([original, sweep, typo]), 'sweep');
    assert.strictEqual(datedCommit([original, sweep, typo], { ignoreRevs: new Set(['sweep']) }), 'a');
  });
});

describe('parseIgnoreRevs', () => {
  it('reads one SHA per line and drops comments', () => {
    assert.deepStrictEqual([...parseIgnoreRevs('# sweeps\nabc123 # zoom images\n\ndef456\n')], ['abc123', 'def456']);
  });
});

describe('parseRawLog', () => {
  it('carries a file history across a rename', () => {
    const log = [
      'C\tc1\t100\tAda',
      ':000000 100644 0000000 blob1 A\tdocs/old.mdx',
      '',
      'C\tc2\t200\tAda',
      ':100644 100644 blob1 blob1 R100\tdocs/old.mdx\tdocs/new.mdx',
      '',
      'C\tc3\t300\tAda',
      ':100644 000000 blob9 0000000 D\tdocs/gone.mdx',
    ].join('\n');
    const chains = parseRawLog(log);
    assert.deepStrictEqual([...chains.keys()], ['docs/new.mdx']);
    assert.deepStrictEqual(
      chains.get('docs/new.mdx').map((v) => [v.commit, v.blob, v.timestamp]),
      [
        ['c1', 'blob1', 100000],
        ['c2', 'blob1', 200000],
      ]
    );
  });

  it('keeps the date across a rename with an unchanged body', () => {
    const chain = parseRawLog(
      [
        'C\tc1\t100\tAda',
        ':000000 100644 0000000 blob1 A\tdocs/old.mdx',
        'C\tc2\t200\tAda',
        ':100644 100644 blob1 blob1 R100\tdocs/old.mdx\tdocs/new.mdx',
      ].join('\n')
    ).get('docs/new.mdx');
    const versions = chain.map((v) => ({ ...v, tokens: tokenize(PARAGRAPH) }));
    assert.strictEqual(resolveLastModified(versions).commit, 'c1');
  });
});
