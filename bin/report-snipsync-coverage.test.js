const { describe, it } = require('node:test');
const assert = require('node:assert');
const { extractCodeBlocks } = require('./code-blocks.js');
const {
  sdkLanguage,
  sectionOf,
  countLines,
  percent,
  tally,
  parseCatFileBatch,
  periodKey,
  samplePeriods,
  changedSections,
  isChanged,
  formatDelta,
  refLabel,
  parseArgs,
} = require('./report-snipsync-coverage.js');

const fence = '```';

describe('extractCodeBlocks', () => {
  it('finds fences indented inside a TabItem and removes the indentation', () => {
    const source = ['<TabItem value="go">', '', `  ${fence}go`, '  func A() {}', `  ${fence}`, '', '</TabItem>'].join(
      '\n'
    );
    const [block] = extractCodeBlocks(source);
    assert.strictEqual(block.lang, 'go');
    assert.strictEqual(block.code, 'func A() {}');
    assert.strictEqual(block.snipsync, false);
  });

  it('reads tilde fences and longer fences that contain shorter ones', () => {
    const source = ['~~~python', 'x = 1', '~~~', '````md', fence + 'go', 'func A() {}', fence, '````'].join('\n');
    const blocks = extractCodeBlocks(source);
    assert.deepStrictEqual(
      blocks.map((b) => b.lang),
      ['python', 'md']
    );
    assert.strictEqual(blocks[1].code, [fence + 'go', 'func A() {}', fence].join('\n'));
  });

  it('marks blocks inside an HTML-comment Snipsync wrapper and records the origin', () => {
    const source = [
      '<!--SNIPSTART go-worker-->',
      '[worker/main.go](https://github.com/temporalio/samples-go/blob/main/worker/main.go)',
      fence + 'go',
      'package main',
      fence,
      '<!--SNIPEND-->',
    ].join('\n');
    const [block] = extractCodeBlocks(source);
    assert.strictEqual(block.snipsync, true);
    assert.strictEqual(block.origin, 'temporalio/samples-go');
    assert.strictEqual(block.code, 'package main');
  });

  it('marks blocks inside an MDX-comment Snipsync wrapper with options', () => {
    const source = [
      '  {/* SNIPSTART ts-client {"highlightedLines": "1-2"} */}',
      '  [src/client.ts](https://github.com/temporalio/samples-typescript/blob/main/src/client.ts)',
      '  ' + fence + 'ts {1-2}',
      '  const a = 1;',
      '  ' + fence,
      '  {/* SNIPEND */}',
      fence + 'ts',
      'const b = 2;',
      fence,
    ].join('\n');
    const blocks = extractCodeBlocks(source);
    assert.strictEqual(blocks[0].snipsync, true);
    assert.strictEqual(blocks[0].origin, 'temporalio/samples-typescript');
    assert.strictEqual(blocks[1].snipsync, false);
    assert.strictEqual(blocks[1].origin, null);
  });

  it('leaves the origin null when the wrapper turns source links off', () => {
    const source = [
      '<!--SNIPSTART ts-deps {"enable_source_link": false}-->',
      fence + 'ts',
      'export {};',
      fence,
      '<!--SNIPEND-->',
    ].join('\n');
    const [block] = extractCodeBlocks(source);
    assert.strictEqual(block.snipsync, true);
    assert.strictEqual(block.origin, null);
  });

  it('skips fences inside an unclosed HTML comment', () => {
    const source = ['<!--', fence + 'go', 'func A() {}', fence, '-->', fence + 'go', 'func B() {}', fence].join('\n');
    const blocks = extractCodeBlocks(source);
    assert.strictEqual(blocks.length, 1);
    assert.strictEqual(blocks[0].code, 'func B() {}');
  });
});

describe('sdkLanguage', () => {
  it('normalizes SDK language tags', () => {
    assert.strictEqual(sdkLanguage('py'), 'Python');
    assert.strictEqual(sdkLanguage('typescript'), 'TypeScript');
    assert.strictEqual(sdkLanguage('js'), 'TypeScript');
    assert.strictEqual(sdkLanguage('csharp'), 'C#');
    assert.strictEqual(sdkLanguage('rb'), 'Ruby');
  });

  it('returns null for languages that are not SDK code', () => {
    for (const tag of ['bash', 'yaml', 'json', 'mermaid', 'text', '']) {
      assert.strictEqual(sdkLanguage(tag), null, tag);
    }
  });
});

describe('sectionOf', () => {
  it('uses the top-level directory under docs/', () => {
    assert.strictEqual(sectionOf('docs/guides/lock-shared-resources.mdx'), 'guides');
    assert.strictEqual(sectionOf('docs/design-patterns/saga-pattern.mdx'), 'design-patterns');
    assert.strictEqual(sectionOf('docs/cloud/metrics/index.mdx'), 'cloud');
  });

  it('splits develop/ by SDK directory', () => {
    assert.strictEqual(sectionOf('docs/develop/go/workers/run.mdx'), 'develop/go');
    assert.strictEqual(sectionOf('docs/develop/plugins-guide.mdx'), 'develop');
  });

  it('groups pages directly under docs/', () => {
    assert.strictEqual(sectionOf('docs/glossary.md'), '(top level)');
  });
});

describe('countLines', () => {
  it('counts non-blank lines', () => {
    assert.strictEqual(countLines('a\n\n  \nb'), 2);
    assert.strictEqual(countLines(''), 0);
  });
});

describe('tally', () => {
  const page = [
    '<!--SNIPSTART go-a-->',
    '[a.go](https://github.com/temporalio/samples-go/blob/main/a.go)',
    fence + 'go',
    'package a',
    '',
    'func A() {}',
    fence,
    '<!--SNIPEND-->',
    fence + 'python',
    'x = 1',
    fence,
    fence + 'bash',
    'temporal server start-dev',
    fence,
    fence + 'mermaid',
    'flowchart TD',
    fence,
  ].join('\n');

  it('counts synced and inline lines, excluding the source link and mermaid', () => {
    const result = tally([{ path: 'docs/guides/a.mdx', source: page }]);
    assert.deepStrictEqual(result.sdk, { synced: 2, inline: 1 });
    assert.deepStrictEqual(result.all, { synced: 2, inline: 2 });
    assert.deepStrictEqual(result.sections.guides.sdk, { synced: 2, inline: 1 });
    assert.deepStrictEqual(result.languages.Go, { synced: 2, inline: 0 });
    assert.deepStrictEqual(result.languages.Python, { synced: 0, inline: 1 });
    assert.deepStrictEqual(result.origins, { 'temporalio/samples-go': 2 });
  });

  it('records synced blocks without a source link as unattributed', () => {
    const source = ['<!--SNIPSTART a {"enable_source_link": false}-->', fence + 'go', 'func A() {}', fence].join('\n');
    const result = tally([{ path: 'docs/develop/go/a.mdx', source }]);
    assert.deepStrictEqual(result.origins, { unattributed: 1 });
  });
});

describe('percent', () => {
  it('returns null when there is nothing to count', () => {
    assert.strictEqual(percent({ synced: 0, inline: 0 }), null);
    assert.strictEqual(percent({ synced: 1, inline: 3 }), 25);
  });
});

describe('parseCatFileBatch', () => {
  it('splits objects by their byte size, including multi-byte characters', () => {
    const first = 'café →';
    const second = 'plain\ntext';
    const buffer = Buffer.concat([
      Buffer.from(`aaa blob ${Buffer.byteLength(first)}\n`),
      Buffer.from(first),
      Buffer.from('\n'),
      Buffer.from(`bbb blob ${Buffer.byteLength(second)}\n`),
      Buffer.from(second),
      Buffer.from('\n'),
    ]);
    assert.deepStrictEqual(parseCatFileBatch(buffer), [first, second]);
  });

  it('throws on a missing object', () => {
    assert.throws(() => parseCatFileBatch(Buffer.from('abc missing\n')), /missing/);
  });
});

describe('periodKey', () => {
  it('starts weeks on Monday', () => {
    assert.strictEqual(periodKey('2026-10-04T23:00:00Z', 'week'), '2026-09-28');
    assert.strictEqual(periodKey('2026-10-05T01:00:00Z', 'week'), '2026-10-05');
  });

  it('uses UTC dates for days and months', () => {
    assert.strictEqual(periodKey('2026-10-05T23:30:00-07:00', 'day'), '2026-10-06');
    assert.strictEqual(periodKey('2026-09-30T12:00:00Z', 'month'), '2026-09');
  });
});

describe('samplePeriods', () => {
  it('keeps the newest commit in each period, oldest period first', () => {
    const commits = [
      { sha: 'c', date: '2026-10-02T00:00:00Z' },
      { sha: 'b', date: '2026-10-01T00:00:00Z' },
      { sha: 'a', date: '2026-09-15T00:00:00Z' },
    ];
    assert.deepStrictEqual(
      samplePeriods(commits, 'month').map((s) => [s.period, s.sha]),
      [
        ['2026-09', 'a'],
        ['2026-10', 'c'],
      ]
    );
  });
});

describe('comparison', () => {
  const base = {
    sdk: { synced: 10, inline: 90 },
    sections: { guides: { sdk: { synced: 0, inline: 50 } }, cloud: { sdk: { synced: 10, inline: 40 } } },
  };

  it('finds the sections whose SDK counts changed', () => {
    const head = {
      sdk: { synced: 30, inline: 70 },
      sections: { guides: { sdk: { synced: 20, inline: 30 } }, cloud: { sdk: { synced: 10, inline: 40 } } },
    };
    assert.deepStrictEqual(changedSections(base, head), ['guides']);
    assert.strictEqual(isChanged(base, head), true);
  });

  it('reports a section that appears or disappears', () => {
    const head = { sdk: base.sdk, sections: { cloud: base.sections.cloud } };
    assert.deepStrictEqual(changedSections(base, head), ['guides']);
  });

  it('is unchanged when only other languages change', () => {
    assert.strictEqual(isChanged(base, { ...base, all: { synced: 1, inline: 1 } }), false);
  });
});

describe('formatDelta', () => {
  it('formats percentage-point changes', () => {
    assert.strictEqual(formatDelta(10, 12.34), '+2.3 pts');
    assert.strictEqual(formatDelta(12, 10), '−2.0 pts');
    assert.strictEqual(formatDelta(10, 10.01), '±0.0 pts');
    assert.strictEqual(formatDelta(null, 10), '');
  });
});

describe('refLabel', () => {
  it('shortens full SHAs only', () => {
    assert.strictEqual(refLabel('1c2c9d2bc555aaaaaaaaaaaaaaaaaaaaaaaaaaaa'), '1c2c9d2');
    assert.strictEqual(refLabel('origin/main'), 'origin/main');
  });
});

describe('parseArgs', () => {
  it('reads formats and valued options', () => {
    assert.deepStrictEqual(parseArgs(['--base', 'main', '--markdown']), {
      format: 'markdown',
      every: 'week',
      base: 'main',
    });
  });

  it('rejects unknown arguments, missing values, and bad periods', () => {
    assert.throws(() => parseArgs(['--nope']), /Unknown argument/);
    assert.throws(() => parseArgs(['--ref']), /needs a value/);
    assert.throws(() => parseArgs(['--history', '--every', 'year']), /--every/);
  });
});
