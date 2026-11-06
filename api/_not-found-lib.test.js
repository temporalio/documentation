const { describe, it } = require('node:test');
const assert = require('node:assert');

const {
  injectIntoHtml,
  pathToQuery,
  pickSuggestions,
  searchSuggestions,
  toHtmlBlock,
  toMarkdownList,
  withUtm,
} = require('./_not-found-lib');

const D = 'https://docs.temporal.io';

describe('pathToQuery', () => {
  const cases = [
    ['dashes and slashes', '/develop/python/workflow-versioning', 'develop python workflow versioning'],
    ['.md extension', '/develop/python/workflow-versioning.md', 'develop python workflow versioning'],
    ['underscores, dots, plus', '/a_b.c+d', 'a b c d'],
    ['percent escapes', '/workflow%20versioning', 'workflow versioning'],
    ['malformed escape', '/workflows%E0%A4%A', 'workflows e0 a4 a'],
    ['numbers dropped', '/release-notes/2024/v1-31-0', 'release notes v1'],
    ['repeated words', '/workflows/workflows-workflows', 'workflows'],
    ['uppercase', '/Cloud/Namespaces', 'cloud namespaces'],
    ['root', '/', ''],
    ['nothing searchable', '/---/123', ''],
    ['not a string', undefined, ''],
  ];
  for (const [name, input, expected] of cases) {
    it(name, () => assert.strictEqual(pathToQuery(input), expected));
  }

  it('caps the number of words and the length', () => {
    const q = pathToQuery('/' + Array.from({ length: 30 }, (_, i) => `word${String.fromCharCode(97 + (i % 26))}x${i}`).join('/'));
    assert.strictEqual(q.split(' ').length, 8);
    assert.ok(q.length <= 100);
  });
});

describe('pickSuggestions', () => {
  const hit = (url, lvl0, lvl1) => ({ url, hierarchy: { lvl0, lvl1 } });

  it('keeps docs pages once each, in rank order', () => {
    const picked = pickSuggestions(
      [
        hit(`${D}/workflows#a`, 'Concepts', 'What is a Workflow?'),
        hit(`${D}/workflows#b`, 'Concepts', 'What is a Workflow?'),
        hit(`${D}/activities/`, 'Concepts', 'What is an Activity?'),
      ],
      '/missing',
    );
    assert.deepStrictEqual(picked, [
      { url: `${D}/workflows`, title: 'Concepts: What is a Workflow?' },
      { url: `${D}/activities`, title: 'Concepts: What is an Activity?' },
    ]);
  });

  it('drops other sites, the requested page, and untitled hits', () => {
    const picked = pickSuggestions(
      [
        hit('https://learn.temporal.io/courses/x', 'Course', 'X'),
        hit(`${D}/missing`, 'Concepts', 'Missing'),
        { url: `${D}/no-title`, hierarchy: {} },
        { url: 'not a url', hierarchy: { lvl0: 'Bad' } },
        hit(`${D}/real`, 'Real', null),
      ],
      '/missing',
    );
    assert.deepStrictEqual(picked, [{ url: `${D}/real`, title: 'Real' }]);
  });

  it('strips zero-width spaces from titles and honors the limit', () => {
    const hits = Array.from({ length: 10 }, (_, i) => hit(`${D}/p${i}`, 'S', `Title\u200B ${i}`));
    const picked = pickSuggestions(hits, '/x', 3);
    assert.strictEqual(picked.length, 3);
    assert.strictEqual(picked[0].title, 'S: Title 0');
  });

  it('decodes the HTML entities Algolia stores in headings', () => {
    const picked = pickSuggestions([hit(`${D}/a`, 'Messages', 'Signals, Queries, &amp; Updates &lt;x&gt;')], '/x');
    assert.strictEqual(picked[0].title, 'Messages: Signals, Queries, & Updates <x>');
  });

  it('tolerates a missing hits array', () => {
    assert.deepStrictEqual(pickSuggestions(undefined, '/x'), []);
  });
});

describe('withUtm', () => {
  it('adds the tracking parameters and rank', () => {
    const url = new URL(withUtm(`${D}/workflows`, 2));
    assert.strictEqual(url.searchParams.get('utm_source'), 'docs-404');
    assert.strictEqual(url.searchParams.get('utm_medium'), 'suggestion');
    assert.strictEqual(url.searchParams.get('utm_campaign'), '404-suggestions');
    assert.strictEqual(url.searchParams.get('utm_content'), '2');
    assert.strictEqual(url.searchParams.has('utm_term'), false);
  });

  it('keeps an existing query string', () => {
    const url = new URL(withUtm(`${D}/workflows?x=1`, 1));
    assert.strictEqual(url.searchParams.get('x'), '1');
  });
});

describe('renderers', () => {
  const suggestions = [{ url: `${D}/workflows`, title: 'A <b>"Workflow"</b> & [more]' }];

  it('escapes HTML in titles and URLs, and keeps the data script safe', () => {
    const html = toHtmlBlock(suggestions);
    assert.ok(html.includes('A &lt;b&gt;&quot;Workflow&quot;&lt;/b&gt; &amp; [more]'));
    assert.ok(html.includes('utm_content=1'));
    assert.strictEqual(html.match(/<script/g).length, 1);
    assert.ok(!/<b>/.test(html));
  });

  it('renders nothing when there are no suggestions', () => {
    assert.strictEqual(toHtmlBlock([]), '');
    assert.strictEqual(toMarkdownList([]), '');
  });

  it('renders a Markdown list with escaped brackets', () => {
    const md = toMarkdownList(suggestions);
    assert.ok(md.startsWith('- [A <b>"Workflow"</b> & \\[more\\]]('));
    assert.ok(md.includes('utm_source=docs-404'));
  });
});

describe('injectIntoHtml', () => {
  it('inserts before the last </body>', () => {
    assert.strictEqual(injectIntoHtml('<body>x</body></html>', '<nav/>'), '<body>x<nav/></body></html>');
  });
  it('appends when there is no body, and ignores an empty block', () => {
    assert.strictEqual(injectIntoHtml('x', '<nav/>'), 'x<nav/>');
    assert.strictEqual(injectIntoHtml('x', ''), 'x');
  });
});

describe('searchSuggestions', () => {
  const ok = (hits) => async () => ({ ok: true, json: async () => ({ hits }) });

  it('sends the derived query and returns picked pages', async () => {
    let body;
    const fetchImpl = async (_url, init) => {
      body = JSON.parse(init.body);
      return { ok: true, json: async () => ({ hits: [{ url: `${D}/workflows`, hierarchy: { lvl1: 'Workflows' } }] }) };
    };
    const result = await searchSuggestions('/workflow-defn', { fetchImpl });
    assert.strictEqual(body.query, 'workflow defn');
    assert.deepStrictEqual(result, [{ url: `${D}/workflows`, title: 'Workflows' }]);
  });

  it('returns nothing for an unsearchable path without calling Algolia', async () => {
    const fetchImpl = async () => assert.fail('should not call Algolia');
    assert.deepStrictEqual(await searchSuggestions('/123', { fetchImpl }), []);
  });

  it('returns nothing on an error status, a thrown error, or bad JSON', async () => {
    assert.deepStrictEqual(await searchSuggestions('/abc', { fetchImpl: async () => ({ ok: false }) }), []);
    assert.deepStrictEqual(
      await searchSuggestions('/abc', {
        fetchImpl: async () => {
          throw new Error('timeout');
        },
      }),
      [],
    );
    assert.deepStrictEqual(
      await searchSuggestions('/abc', {
        fetchImpl: async () => ({
          ok: true,
          json: async () => {
            throw new Error('bad json');
          },
        }),
      }),
      [],
    );
    assert.deepStrictEqual(await searchSuggestions('/abc', { fetchImpl: ok(undefined) }), []);
  });
});
