const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  normalizeProse,
  proseLines,
  headingAnchors,
  topicKey,
  findLinkLists,
  analyzePartial,
  buildReport,
} = require('./report-sdk-duplication');

describe('normalizeProse', () => {
  it('treats lines that differ only in code, link targets, and SDK names as equal', () => {
    assert.strictEqual(
      normalizeProse('Set it to `None` in the [Python SDK](/develop/python/timers).'),
      normalizeProse('Set it to `nil` in the [Go SDK](/develop/go/timers).')
    );
    assert.strictEqual(normalizeProse('Use the .NET SDK.'), normalizeProse('Use the Ruby SDK.'));
  });

  it('drops heading anchors and MDX comments', () => {
    assert.strictEqual(normalizeProse('## What is it? {/* #what */}'), '## What is it?');
    assert.strictEqual(normalizeProse('## What is it? {#what}'), '## What is it?');
  });
});

describe('proseLines', () => {
  it('skips frontmatter, code, JSX, imports, admonition fences, and comments', () => {
    const source = [
      '---',
      'title: Long enough frontmatter title here',
      '---',
      "import { SdkTabs } from '@site/src/components';",
      '',
      'This sentence is long enough to count as prose.',
      '',
      '```go',
      'fmt.Println("this is code, not prose at all")',
      '```',
      '',
      '<CaptionedImage',
      '  src="/img/long-enough-image-path.png"',
      '/>',
      ':::note',
      '<!-- SNIPSTART some-long-snippet-identifier -->',
      '{/*',
      'A multi-line comment that is long enough.',
      '*/}',
      'Short.',
    ].join('\n');
    assert.deepStrictEqual(
      proseLines(source).map((p) => p.text),
      ['This sentence is long enough to count as prose.']
    );
  });
});

describe('headingAnchors', () => {
  it('collects explicit heading anchors in both syntaxes', () => {
    const anchors = headingAnchors('## What {/* #what */}\n### How {#how}\nNot a heading {#nope}\n## Plain');
    assert.deepStrictEqual([...anchors].sort(), ['how', 'what']);
  });
});

describe('topicKey', () => {
  it('folds known renames into one topic', () => {
    assert.strictEqual(topicKey('workers/run-process.mdx'), 'workers/run-worker-process');
    assert.strictEqual(topicKey('workers/worker-process.mdx'), 'workers/run-worker-process');
    assert.strictEqual(topicKey('workflows/timers.mdx'), 'workflows/timers');
  });
});

describe('findLinkLists', () => {
  it('finds runs of links covering 3+ SDKs and names the missing ones', () => {
    const source = [
      'Intro.',
      '- [Go](/develop/go/workflows/timers)',
      '- [Java](/develop/java/workflows/timers#how)',
      '- [Python](/develop/python/workflows/timers)',
      '',
      '- [Go](/develop/go/x)',
      '- [Java](/develop/java/x)',
    ].join('\n');
    const lists = findLinkLists(source);
    assert.strictEqual(lists.length, 1);
    assert.strictEqual(lists[0].line, 2);
    assert.deepStrictEqual(lists[0].sdks, ['go', 'java', 'python']);
    assert.ok(lists[0].missing.includes('ruby'));
  });

  it('counts an inline row and RelatedReadItem paths', () => {
    const row = '[Go](/develop/go/a) | [Java](/develop/java/a) | [.NET](/develop/dotnet/a)';
    assert.strictEqual(findLinkLists(row).length, 1);
    const related = [
      '<RelatedReadContainer>',
      '  <RelatedReadItem path="/develop/go/a" text="Go" />',
      '  <RelatedReadItem path="/develop/php/a" text="PHP" />',
      '  <RelatedReadItem path="/develop/rust/a" text="Rust" />',
      '</RelatedReadContainer>',
    ].join('\n');
    assert.deepStrictEqual(findLinkLists(related)[0].sdks, ['go', 'php', 'rust']);
  });

  it('ignores tab blocks and code fences', () => {
    const source = [
      '<Tabs>',
      '- [Go](/develop/go/a)',
      '- [Java](/develop/java/a)',
      '- [Python](/develop/python/a)',
      '</Tabs>',
      '```',
      '/develop/go/a /develop/java/a /develop/ruby/a',
      '```',
    ].join('\n');
    assert.strictEqual(findLinkLists(source).length, 0);
  });

  it('does not treat /develop/<id>-like paths as SDK links', () => {
    assert.strictEqual(findLinkLists('/develop/gopher /develop/javascript /develop/rusty').length, 0);
  });
});

describe('analyzePartial', () => {
  it('measures the share of lines inside SdkOnly', () => {
    const source = [
      'Shared line one.',
      'Shared line two.',
      '',
      '<SdkOnly sdks="java">',
      '',
      'Java only.',
      '',
      '</SdkOnly>',
    ].join('\n');
    const result = analyzePartial('p.mdx', source);
    assert.strictEqual(result.contentLines, 3);
    assert.strictEqual(result.conditionalLines, 1);
    assert.strictEqual(result.overLimit, false);
    assert.deepStrictEqual(result.errors, []);
  });

  it('flags partials past the readability limit', () => {
    const source = 'Shared.\n\n<SdkOnly sdks="go">\n\nGo one.\n\nGo two.\n\n</SdkOnly>';
    assert.strictEqual(analyzePartial('p.mdx', source).overLimit, true);
  });

  it('reports unknown SDK ids and terms, and SdkOnly without exactly one prop', () => {
    const source = [
      'Text <SdkOnly sdks="py">x</SdkOnly>.',
      'Use <SdkTerm name="nope" />.',
      '<SdkOnly>',
      '',
      'x',
      '',
      '</SdkOnly>',
    ].join('\n');
    const { errors } = analyzePartial('p.mdx', source);
    assert.ok(errors.some((e) => e.startsWith('line 1:') && e.includes('unknown SDK id "py"')), errors.join('; '));
    assert.ok(errors.some((e) => e.startsWith('line 2:') && e.includes('unknown SDK term "nope"')), errors.join('; '));
    assert.ok(errors.some((e) => e.startsWith('line 3:') && e.includes('exactly one')), errors.join('; '));
  });

  it('ignores SDK tags inside code fences', () => {
    const { errors } = analyzePartial('p.mdx', '```mdx\n<SdkOnly sdks="py">\n```');
    assert.deepStrictEqual(errors, []);
  });
});

describe('buildReport', () => {
  let root;

  function write(relPath, content) {
    const full = path.join(root, relPath);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content);
  }

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'sdk-duplication-'));
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  it('reports topics, link lists, and partials for a docs tree', () => {
    const page = (sdk, extra) =>
      `---\ntitle: Timers\n---\n\n## Timers {/* #timers */}\n\nA Timer lets a Workflow sleep for a fixed time.\n\n${extra}\n`;
    write('docs/develop/go/workflows/timers.mdx', page('go', 'Go uses `workflow.Sleep` to pause for a while.'));
    write('docs/develop/java/workflows/timers.mdx', page('java', 'Java uses `Workflow.sleep` to pause for a while.'));
    write('docs/develop/python/workflows/timers.mdx', `## Timers\n\nPython has its own, unrelated wording here.\n`);
    write('docs/develop/go/workers/run-process.mdx', 'Workers poll Task Queues for work to do.\n');
    write('docs/develop/_shared/timers/intro.mdx', 'A shared partial line.\n');
    write(
      'docs/encyclopedia/timers.mdx',
      '- [Go](/develop/go/workflows/timers)\n- [Java](/develop/java/workflows/timers)\n- [Python](/develop/python/workflows/timers)\n'
    );
    write('docs/develop/go/links.mdx', '- [Go](/develop/go/a)\n- [Java](/develop/java/a)\n- [PHP](/develop/php/a)\n');

    const report = buildReport(root);

    const timers = report.topics.find((t) => t.topic === 'workflows/timers');
    assert.deepStrictEqual(timers.sdks, ['go', 'java', 'python']);
    // Go and Java share both prose lines (the SDK sentence differs only in
    // SDK name and code); Python shares none. "## Timers" is too short to count.
    assert.strictEqual(timers.proseLines, 5);
    assert.strictEqual(timers.sharedLines, 4);
    assert.deepStrictEqual(timers.anchors, { total: 1, shared: 0, missingBySdk: { python: ['timers'] } });

    assert.ok(report.topics.some((t) => t.topic === 'workers/run-worker-process'));
    assert.ok(!report.topics.some((t) => t.topic.includes('_shared')));
    assert.strictEqual(report.headline.topics, 1);

    // Lists inside a single SDK's develop tree aren't counted.
    assert.strictEqual(report.linkLists.count, 1);
    assert.strictEqual(report.linkLists.lists[0].file, 'docs/encyclopedia/timers.mdx');

    assert.deepStrictEqual(
      report.partials.map((p) => p.file),
      ['docs/develop/_shared/timers/intro.mdx']
    );
  });
});
