const { describe, it } = require('node:test');
const assert = require('node:assert');
const {
  maskCodeFences,
  maskComments,
  parseAdmonitionOpener,
  scanSource,
  resolveStage,
  parseFeatureReleaseTypes,
  isCountedPage,
  admonitionKey,
  tally,
  where,
  compare,
  formatComparisonText,
  parseArgs,
} = require('./report-callouts.js');

const page = (path, source) => ({ path, source });

describe('parseAdmonitionOpener', () => {
  it('reads a title holding balanced brackets, such as a link', () => {
    assert.deepStrictEqual(parseAdmonitionOpener(':::note[See [the guide](/x)]'), {
      keyword: 'note',
      title: 'See [the guide](/x)',
    });
  });

  it('reads a title holding inline code with brackets', () => {
    assert.strictEqual(parseAdmonitionOpener(':::tip[Use `a[0]`]').title, 'Use `a[0]`');
  });

  it('still counts an admonition whose title brackets are unbalanced', () => {
    assert.deepStrictEqual(parseAdmonitionOpener(':::note[Unclosed'), { keyword: 'note', title: 'Unclosed' });
  });

  it('ignores prose that starts with colons and a word', () => {
    assert.strictEqual(parseAdmonitionOpener(':::note-to-self: remember this'), null);
    assert.strictEqual(parseAdmonitionOpener(':::'), null);
  });
});

describe('scanSource admonitions', () => {
  it('finds a bare admonition with its line', () => {
    const { admonitions } = scanSource('# Page\n\n:::note\nBody.\n:::\n');
    assert.deepStrictEqual(admonitions, [{ keyword: 'note', title: '', line: 3 }]);
  });

  it('reads a bracketed title', () => {
    const [admonition] = scanSource(':::info[TLDR]\nShort version.\n:::\n').admonitions;
    assert.strictEqual(admonition.keyword, 'info');
    assert.strictEqual(admonition.title, 'TLDR');
  });

  it('reads a title with a colon and spaces', () => {
    const [admonition] = scanSource(':::caution[Currently in: Pre-release]\nBody.\n:::\n').admonitions;
    assert.strictEqual(admonitionKey(admonition), 'caution[Currently in: Pre-release]');
  });

  it('reads the MDX 1 title syntax after a space', () => {
    const [admonition] = scanSource(':::tip Use the CLI\nBody.\n:::\n').admonitions;
    assert.strictEqual(admonition.title, 'Use the CLI');
  });

  it('lowercases the keyword', () => {
    const [admonition] = scanSource(':::NOTE\nBody.\n:::\n').admonitions;
    assert.strictEqual(admonition.keyword, 'note');
  });

  it('ignores directive attributes', () => {
    const [admonition] = scanSource(':::note[Title]{#anchor}\nBody.\n:::\n').admonitions;
    assert.strictEqual(admonitionKey(admonition), 'note[Title]');
  });

  it('counts both levels when an admonition with a longer fence holds another', () => {
    const source = '::::caution\nOuter.\n:::note\nInner.\n:::\n::::\n';
    assert.deepStrictEqual(
      scanSource(source).admonitions.map((a) => [a.keyword, a.line]),
      [
        ['caution', 1],
        ['note', 3],
      ]
    );
  });

  it('finds an indented admonition inside a list item', () => {
    const { admonitions } = scanSource('1. Step\n\n   :::tip\n   Body.\n   :::\n');
    assert.deepStrictEqual(admonitions, [{ keyword: 'tip', title: '', line: 3 }]);
  });

  it('does not count a closing fence', () => {
    assert.deepStrictEqual(scanSource(':::\n::::\n').admonitions, []);
  });

  it('skips admonitions shown inside a backtick code block', () => {
    const source = '```md\n:::note\nExample.\n:::\n```\n\n:::tip\nReal.\n:::\n';
    assert.deepStrictEqual(
      scanSource(source).admonitions.map((a) => [a.keyword, a.line]),
      [['tip', 7]]
    );
  });

  it('skips admonitions inside a tilde code block', () => {
    assert.deepStrictEqual(scanSource('~~~\n:::note\n:::\n~~~\n').admonitions, []);
  });

  it('does not treat a line that starts with inline triple-backtick code as a fence', () => {
    const source = '```foo``` is inline code.\n\n:::note\nBody.\n:::\n';
    assert.deepStrictEqual(
      scanSource(source).admonitions.map((a) => [a.keyword, a.line]),
      [['note', 3]]
    );
  });

  it('skips admonitions inside HTML and MDX comments, keeping line numbers', () => {
    const source = '<!--\n:::note\n:::\n-->\n{/*\n:::tip\n:::\n*/}\n:::caution\n:::\n';
    assert.deepStrictEqual(
      scanSource(source).admonitions.map((a) => [a.keyword, a.line]),
      [['caution', 9]]
    );
  });

  it('keeps a code block open until a closing fence at least as long as the opener', () => {
    const source = '````md\n```\n:::note\n```\n````\n:::tip\n:::\n';
    assert.deepStrictEqual(
      scanSource(source).admonitions.map((a) => a.keyword),
      ['tip']
    );
  });
});

describe('scanSource ReleaseNoteHeader', () => {
  it('reads a self-closing header with featureName', () => {
    const [header] = scanSource('<ReleaseNoteHeader featureName="cloudCli" />\n').releaseNoteHeaders;
    assert.strictEqual(header.selfClosing, true);
    assert.strictEqual(header.featureName, 'cloudCli');
    assert.strictEqual(header.type, null);
  });

  it('reads a header with a body, type, languages, and guidePath across lines', () => {
    const source =
      'Intro.\n\n<ReleaseNoteHeader\n  type="prerelease"\n  languages={["Go", "Java"]}\n  guidePath="nexus/feature-guide"\n>\n  Body.\n</ReleaseNoteHeader>\n';
    const [header] = scanSource(source).releaseNoteHeaders;
    assert.deepStrictEqual(header, {
      line: 3,
      selfClosing: false,
      type: 'prerelease',
      featureName: null,
      languages: true,
      guidePath: true,
      label: false,
      href: false,
    });
  });

  it('reads a prop written as a JSX string expression', () => {
    const [header] = scanSource(
      "<ReleaseNoteHeader type={'publicPreview'}>\nBody.\n</ReleaseNoteHeader>\n"
    ).releaseNoteHeaders;
    assert.strictEqual(header.type, 'publicPreview');
  });

  it('does not count the closing tag or the import', () => {
    const source =
      'import { ReleaseNoteHeader } from \'@site/src/components\';\n\n<ReleaseNoteHeader type="publicPreview">\nBody.\n</ReleaseNoteHeader>\n';
    assert.strictEqual(scanSource(source).releaseNoteHeaders.length, 1);
  });

  it('skips a header inside a code block', () => {
    const source = '```jsx\n<ReleaseNoteHeader type="prerelease" />\n```\n';
    assert.deepStrictEqual(scanSource(source).releaseNoteHeaders, []);
  });

  it('skips a header named in inline code or a comment', () => {
    const source =
      'Use `<ReleaseNoteHeader type="prerelease" />` here.\n{/* <ReleaseNoteHeader type="prerelease" /> */}\n';
    assert.deepStrictEqual(scanSource(source).releaseNoteHeaders, []);
  });

  it('does not read a prop from the end of a longer attribute name', () => {
    const [header] = scanSource('<ReleaseNoteHeader data-type="x" aria-label="y" />\n').releaseNoteHeaders;
    assert.strictEqual(header.type, null);
    assert.strictEqual(header.label, false);
  });

  it('reads props with spaces around the equals sign and backtick strings', () => {
    const [header] = scanSource('<ReleaseNoteHeader type = "prerelease" featureName={`azure`} />\n').releaseNoteHeaders;
    assert.strictEqual(header.type, 'prerelease');
    assert.strictEqual(header.featureName, 'azure');
  });

  it('treats a slash followed by a space before the bracket as self-closing', () => {
    const [header] = scanSource('<ReleaseNoteHeader featureName="azure" / >\n').releaseNoteHeaders;
    assert.strictEqual(header.selfClosing, true);
  });
});

describe('release stages', () => {
  const types = parseFeatureReleaseTypes(
    'export const FEATURE_RELEASE_TYPES = {\n  azure: "publicPreview",\n  projects: "prerelease",\n};\n'
  );

  it('parses the featureName map from featureReleaseTypes.js source', () => {
    assert.deepStrictEqual(types, { azure: 'publicPreview', projects: 'prerelease' });
  });

  it('resolves the stage the way the component does', () => {
    assert.strictEqual(resolveStage({ featureName: 'projects', type: 'publicPreview' }, types), 'prerelease');
    assert.strictEqual(resolveStage({ featureName: 'unknown', type: 'prerelease' }, types), 'prerelease');
    assert.strictEqual(resolveStage({ featureName: null, type: null }, types), 'publicPreview');
  });

  it('counts rendered stages separately from the type prop', () => {
    const { releaseNoteHeader } = tally(
      [
        page(
          'docs/a.mdx',
          '<ReleaseNoteHeader featureName="projects" />\n<ReleaseNoteHeader type="publicPreview" />\n'
        ),
      ],
      types
    );
    assert.deepStrictEqual(releaseNoteHeader.stages, { prerelease: 1, publicPreview: 1 });
    assert.deepStrictEqual(releaseNoteHeader.types, { publicPreview: 1 });
  });
});

describe('isCountedPage', () => {
  it('leaves out the internal fixture pages', () => {
    assert.strictEqual(isCountedPage(page('docs/internal/callouts.mdx', '')), false);
    assert.strictEqual(isCountedPage(page('docs/encyclopedia/workflows.mdx', '')), true);
  });
});

describe('maskComments', () => {
  it('keeps line breaks inside a comment', () => {
    assert.strictEqual(maskComments('a<!--\nb-->c'), 'a    \n    c');
  });
});

describe('maskCodeFences', () => {
  it('keeps the line count so line numbers match the file', () => {
    const source = 'a\n```\nb\n```\nc';
    assert.deepStrictEqual(maskCodeFences(source), ['a', '', '', '', 'c']);
  });
});

describe('tally', () => {
  const files = [
    page('docs/a.mdx', ':::note\nA.\n:::\n\n:::info[TLDR]\nB.\n:::\n'),
    page('docs/b.mdx', '<ReleaseNoteHeader type="publicPreview" languages={["Go"]}>\nC.\n</ReleaseNoteHeader>\n'),
    page('docs/c.mdx', 'No callouts.\n'),
  ];

  it('counts keywords, titles, and pages', () => {
    const report = tally(files);
    assert.strictEqual(report.pages, 3);
    assert.strictEqual(report.pagesWithCallouts, 2);
    assert.deepStrictEqual(report.keywords, { info: 1, note: 1 });
    assert.deepStrictEqual(report.titles, { 'info[TLDR]': 1 });
  });

  it('counts ReleaseNoteHeader props', () => {
    const { releaseNoteHeader } = tally(files);
    assert.strictEqual(releaseNoteHeader.total, 1);
    assert.strictEqual(releaseNoteHeader.selfClosing, 0);
    assert.strictEqual(releaseNoteHeader.withLanguages, 1);
    assert.deepStrictEqual(releaseNoteHeader.types, { publicPreview: 1 });
  });

  it('orders counts from most to least used', () => {
    const report = tally([page('docs/a.mdx', ':::tip\n:::\n:::note\n:::\n:::note\n:::\n')]);
    assert.deepStrictEqual(Object.keys(report.keywords), ['note', 'tip']);
  });
});

describe('where', () => {
  const files = [
    page('docs/a.mdx', ':::info[TLDR]\nA.\n:::\n:::info\nB.\n:::\n'),
    page('docs/b.mdx', '<ReleaseNoteHeader featureName="azure" />\n'),
  ];

  it('lists every admonition with a keyword, titled or not', () => {
    assert.deepStrictEqual(where(files, 'info'), ['docs/a.mdx:1', 'docs/a.mdx:4']);
  });

  it('lists only the matching title, ignoring case', () => {
    assert.deepStrictEqual(where(files, 'INFO[tldr]'), ['docs/a.mdx:1']);
  });

  it('lists ReleaseNoteHeader uses, ignoring case', () => {
    assert.deepStrictEqual(where(files, 'ReleaseNoteHeader'), ['docs/b.mdx:1']);
    assert.deepStrictEqual(where(files, 'releasenoteheader'), ['docs/b.mdx:1']);
  });
});

describe('compare', () => {
  it('reports only the counts that changed, including ones that went to zero', () => {
    const base = tally([page('docs/a.mdx', ':::info[TLDR]\n:::\n:::note\n:::\n')]);
    const head = tally([page('docs/a.mdx', ':::summary\n:::\n:::note\n:::\n')]);
    const changes = compare(base, head);
    assert.deepStrictEqual(changes.keywords, [
      ['info', 1, 0],
      ['summary', 0, 1],
    ]);
    assert.deepStrictEqual(changes.titles, [['info[TLDR]', 1, 0]]);
    assert.deepStrictEqual(changes.releaseNoteHeader, []);
  });

  it('formats a delta and says when a section has no change', () => {
    const text = formatComparisonText(
      { keywords: [['info', 2, 1]], titles: [], releaseNoteHeader: [] },
      { base: 'main', head: 'working tree' }
    );
    assert.match(text, /info: 2 → 1 \(-1\)/);
    assert.match(text, /Titled admonitions:\n  no change/);
  });
});

describe('parseArgs', () => {
  it('defaults to a text report of the working tree', () => {
    assert.deepStrictEqual(parseArgs([]), { format: 'text' });
  });

  it('reads --json, --ref, --base, and --where', () => {
    assert.deepStrictEqual(parseArgs(['--json', '--ref', 'abc', '--base', 'main']), {
      format: 'json',
      ref: 'abc',
      base: 'main',
    });
    assert.strictEqual(parseArgs(['--where', 'info[TLDR]']).where, 'info[TLDR]');
  });

  it('rejects unknown arguments, missing values, and --where with --base', () => {
    assert.throws(() => parseArgs(['--nope']), /Unknown argument/);
    assert.throws(() => parseArgs(['--ref']), /needs a value/);
    assert.throws(() => parseArgs(['--where', 'note', '--base', 'main']), /can not be used together/);
  });
});
