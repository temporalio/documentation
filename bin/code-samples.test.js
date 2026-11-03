const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { extractCodeBlocks, extractSamples, applyBaseline, updatedBaseline, annotations } = require('./code-samples.js');

const fence = '```';

describe('extractCodeBlocks', () => {
  it('reports the line of the first line of code', () => {
    const page = ['# Title', '', `${fence}ts`, 'const a = 1;', 'const b = 2;', fence].join('\n');
    const [block] = extractCodeBlocks(page);
    assert.strictEqual(block.lang, 'ts');
    assert.strictEqual(block.line, 4);
    assert.strictEqual(block.code, 'const a = 1;\nconst b = 2;');
  });

  it('reads the language out of an info string with a title or highlighted lines', () => {
    const page = [`${fence}typescript title="client.ts" {1,3}`, 'x', fence, `${fence}ts{2}`, 'y', fence].join('\n');
    assert.deepStrictEqual(
      extractCodeBlocks(page).map((b) => b.lang),
      ['typescript', 'ts']
    );
  });

  it('removes the indentation of a fence inside a list item or component', () => {
    const page = ['- Step one:', '', `  ${fence}ts`, '  if (a) {', '    b();', '  }', `  ${fence}`].join('\n');
    assert.strictEqual(extractCodeBlocks(page)[0].code, 'if (a) {\n  b();\n}');
  });

  it('keeps a shorter fence inside a longer one as code', () => {
    const page = ['````md', `${fence}ts`, 'nested();', fence, '````'].join('\n');
    const blocks = extractCodeBlocks(page);
    assert.strictEqual(blocks.length, 1);
    assert.strictEqual(blocks[0].lang, 'md');
  });

  it('accepts tilde fences', () => {
    const page = ['~~~js', 'run();', '~~~'].join('\n');
    assert.strictEqual(extractCodeBlocks(page)[0].code, 'run();');
  });

  it('marks blocks inside either form of Snipsync wrapper', () => {
    const page = [
      '<!--SNIPSTART typescript-hello-client-->',
      `${fence}ts`,
      'synced();',
      fence,
      '<!--SNIPEND-->',
      `${fence}ts`,
      'handWritten();',
      fence,
      '{/* SNIPSTART typescript-env-config {"highlightedLines": "1-2"} */}',
      `${fence}ts`,
      'alsoSynced();',
      fence,
      '{/* SNIPEND */}',
    ].join('\n');
    assert.deepStrictEqual(
      extractCodeBlocks(page).map((b) => [b.code, b.snipsync]),
      [
        ['synced();', true],
        ['handWritten();', false],
        ['alsoSynced();', true],
      ]
    );
  });

  it('skips code inside a comment, which is never rendered', () => {
    const page = [
      '<!--',
      `${fence}ts`,
      'hiddenHtml();',
      fence,
      '-->',
      '{/*',
      `${fence}ts`,
      'hiddenMdx();',
      fence,
      '*/}',
      '<!-- a one-line comment -->',
      `${fence}ts`,
      'shown();',
      fence,
    ].join('\n');
    assert.deepStrictEqual(
      extractCodeBlocks(page).map((b) => b.code),
      ['shown();']
    );
  });
});

describe('extractSamples', () => {
  it('keeps hand-written TypeScript and JavaScript only', () => {
    const page = [
      `${fence}ts`,
      'a();',
      fence,
      `${fence}javascript`,
      'b();',
      fence,
      `${fence}python`,
      'c()',
      fence,
      '<!--SNIPSTART x-->',
      `${fence}typescript`,
      'd();',
      fence,
      '<!--SNIPEND-->',
    ].join('\n');
    assert.deepStrictEqual(
      extractSamples(page, new Set(['ts', 'javascript'])).map((s) => s.code),
      ['a();', 'b();']
    );
  });
});

describe('applyBaseline', () => {
  const finding = (line, subject) => ({ file: 'docs/a.mdx', line, kind: 'missing-member', subject, message: '' });
  const baseline = {
    comment: '',
    findings: [
      { file: 'docs/a.mdx', kind: 'missing-member', subject: 'Client.getHandle', note: 'Deliberate.' },
      { file: 'docs/a.mdx', kind: 'missing-member', subject: 'Worker.gone', note: '' },
    ],
  };

  it('suppresses every occurrence of an accepted subject, whatever its line', () => {
    const result = applyBaseline(
      [finding(10, 'Client.getHandle'), finding(90, 'Client.getHandle'), finding(12, 'Connection.create')],
      baseline
    );
    assert.deepStrictEqual(
      result.remaining.map((f) => f.subject),
      ['Connection.create']
    );
    assert.strictEqual(result.baselined, 2);
  });

  it('reports an entry that no longer matches anything', () => {
    const result = applyBaseline([finding(10, 'Client.getHandle')], baseline);
    assert.deepStrictEqual(
      result.stale.map((e) => e.subject),
      ['Worker.gone']
    );
  });

  it('does not let an entry for one page suppress the same subject on another', () => {
    const other = { ...finding(10, 'Client.getHandle'), file: 'docs/b.mdx' };
    assert.strictEqual(applyBaseline([other], baseline).remaining.length, 1);
  });
});

describe('updatedBaseline', () => {
  it('records each subject once, sorted, and keeps existing notes', () => {
    const findings = [
      { file: 'docs/b.mdx', line: 3, kind: 'missing-member', subject: 'Client.getHandle' },
      { file: 'docs/a.mdx', line: 9, kind: 'comment-link', subject: '/x#y' },
      { file: 'docs/b.mdx', line: 7, kind: 'missing-member', subject: 'Client.getHandle' },
    ];
    const previous = {
      comment: 'Kept.',
      findings: [{ file: 'docs/b.mdx', kind: 'missing-member', subject: 'Client.getHandle', note: 'Reviewed.' }],
    };
    assert.deepStrictEqual(updatedBaseline(findings, previous), {
      comment: 'Kept.',
      findings: [
        { file: 'docs/a.mdx', kind: 'comment-link', subject: '/x#y', note: '' },
        { file: 'docs/b.mdx', kind: 'missing-member', subject: 'Client.getHandle', note: 'Reviewed.' },
      ],
    });
  });
});

describe('annotations', () => {
  it('writes one warning per finding, escaping what workflow commands require', () => {
    assert.deepStrictEqual(
      annotations(
        [{ file: 'docs/a.mdx', line: 4, kind: 'missing-member', message: '100% wrong\nreally' }],
        'TypeScript sample'
      ),
      ['::warning file=docs/a.mdx,line=4,title=TypeScript sample (missing-member)::100%25 wrong%0Areally']
    );
  });
});

describe('the checked-in baselines', () => {
  const files = fs.readdirSync(__dirname).filter((f) => f.endsWith('-samples-baseline.json'));

  it('exist', () => {
    assert.ok(files.length > 0);
  });

  for (const file of files) {
    const baseline = JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf8'));

    it(`${file} stays sorted and free of duplicates, the way --update-baseline writes it`, () => {
      assert.deepStrictEqual(baseline, updatedBaseline(baseline.findings, baseline));
    });

    it(`${file} explains every accepted finding`, () => {
      for (const entry of baseline.findings) {
        assert.ok(entry.note, `${entry.file} ${entry.subject} has no note`);
      }
    });

    it(`${file} points at pages that exist`, () => {
      for (const entry of baseline.findings) {
        assert.ok(fs.existsSync(path.join(__dirname, '..', entry.file)), `${entry.file} does not exist`);
      }
    });
  }
});
