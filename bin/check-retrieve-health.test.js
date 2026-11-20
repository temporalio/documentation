const { describe, it } = require('node:test');
const assert = require('node:assert');
const { CHECKS, evaluate } = require('./check-retrieve-health.js');

const [customQa, github] = CHECKS;
const DOCS = 'https://docs.temporal.io';

const pages = (count) => Array.from({ length: count }, (_, i) => ({ content: 'x', source_url: `${DOCS}/p${i}.md` }));
const ok = (body) => ({ status: 200, body });

describe('evaluate', () => {
  it('passes when the expected kind of result is there', () => {
    assert.deepStrictEqual(evaluate(customQa, ok([{ content: 'A', source_url: '' }, ...pages(5)])), []);
    assert.deepStrictEqual(
      evaluate(
        github,
        ok([{ content: 'R', source_url: 'https://github.com/temporalio/sdk-rust/blob/main/README.md' }, ...pages(4)])
      ),
      []
    );
  });

  it('fails a 502 and points at the runtime log line', () => {
    const problems = evaluate(customQa, { status: 502, body: { error: 'Search is unavailable. Try again later.' } });
    assert.strictEqual(problems.length, 1);
    assert.match(problems[0], /^HTTP 502: .*Search is unavailable/);
    assert.match(problems[0], /retrieve: Kapa returned/);
  });

  it('fails a request that never got a response', () => {
    assert.deepStrictEqual(evaluate(customQa, { error: 'The operation was aborted due to timeout' }), [
      'Request failed: The operation was aborted due to timeout',
    ]);
  });

  it('fails a body that is not an array', () => {
    assert.deepStrictEqual(evaluate(customQa, ok({ detail: 'nope' })), ['The response is not a JSON array.']);
  });

  // What production returned on 2026-11-02, after Kapa started applying the
  // source ID filter: plenty of results, all from web crawl sources.
  it('fails when only web crawl results come back', () => {
    const problems = evaluate(customQa, ok(pages(15)));
    assert.strictEqual(problems.length, 1);
    assert.match(problems[0], /^No result is a custom Q&A answer/);
    assert.match(evaluate(github, ok(pages(15)))[0], /^No result is a file in a github\.com\/temporalio repository/);
  });

  it('fails too few results, and reports each problem', () => {
    const problems = evaluate(customQa, ok(pages(2)));
    assert.deepStrictEqual(problems.length, 2);
    assert.strictEqual(problems[0], '2 results, expected at least 5.');
  });

  it('ignores malformed results instead of throwing', () => {
    assert.strictEqual(evaluate(github, ok([null, 'text', { content: 'no url' }, ...pages(5)])).length, 1);
  });

  // Production returned these under the source filter, from the release notes
  // web crawl, while the repository files were gone.
  it("doesn't count a GitHub release page", () => {
    const body = [
      { content: 'x', source_url: 'https://github.com/temporalio/sdk-python/releases/tag/1.35.0' },
      ...pages(5),
    ];
    assert.strictEqual(evaluate(github, ok(body)).length, 1);
  });

  it("doesn't count a github.com link outside temporalio", () => {
    const body = [{ content: 'x', source_url: 'https://github.com/someone/fork/blob/main/README.md' }, ...pages(5)];
    assert.strictEqual(evaluate(github, ok(body)).length, 1);
  });
});

const {
  FRESHNESS_CHECKS,
  evaluateFreshness,
  normalizeUrl,
  parseSitemap,
  blogCandidates,
  parseBlogPost,
  pickBlogPost,
  parseFrontmatter,
  isIndexPage,
  docUrl,
  parseAddedDocs,
  pickDocsPage,
} = require('./check-retrieve-health.js');

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.parse('2026-11-20T14:00:00Z');
const [blogCheck] = FRESHNESS_CHECKS;

const sitemap = (entries) =>
  `<?xml version="1.0"?><urlset>${entries
    .map(([loc, lastmod]) => `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)
    .join('')}</urlset>`;

const postHtml = (title, datePublished) =>
  `<html><head><title>${title} | Temporal</title>` +
  `<script type="application/ld+json">{"@type":"BlogPosting","datePublished":"${datePublished}"}</script>` +
  '</head><body></body></html>';

// A fetchPage stub that serves `pages` by URL and records what was asked for.
function stubFetch(pages) {
  const fetched = [];
  const fetchPage = async (url) => {
    fetched.push(url);
    if (!(url in pages)) throw new Error(`HTTP 404 from ${url}`);
    return pages[url];
  };
  return { fetchPage, fetched };
}

describe('normalizeUrl', () => {
  it('drops the anchor, query, trailing slash, and .md suffix', () => {
    assert.strictEqual(normalizeUrl('https://temporal.io/blog/post#conclusion'), 'https://temporal.io/blog/post');
    assert.strictEqual(normalizeUrl('https://docs.temporal.io/cloud/x.md'), 'https://docs.temporal.io/cloud/x');
    assert.strictEqual(normalizeUrl('https://docs.temporal.io/cloud/x/?a=1'), 'https://docs.temporal.io/cloud/x');
    assert.strictEqual(normalizeUrl(''), '');
  });
});

describe('parseSitemap and blogCandidates', () => {
  it('keeps one-segment /blog/ posts, newest lastmod first, entries without lastmod last', () => {
    const entries = parseSitemap(
      sitemap([
        ['https://temporal.io/blog', null],
        ['https://temporal.io/blog/old', '2024-12-18T00:00-08:00'],
        ['https://temporal.io/blog/undated', null],
        ['https://temporal.io/blog/new', '2026-11-17'],
        ['https://temporal.io/blog/tags/ai', '2026-11-19'],
        ['https://temporal.io/about', '2026-11-19'],
      ])
    );
    assert.deepStrictEqual(
      blogCandidates(entries).map((entry) => entry.loc),
      ['https://temporal.io/blog/new', 'https://temporal.io/blog/old', 'https://temporal.io/blog/undated']
    );
  });
});

describe('parseBlogPost', () => {
  it('reads the title without the site suffix, and the JSON-LD publish date', () => {
    const post = parseBlogPost(
      postHtml('Who needs workflows when you have agents&#x3F; It&#x27;s  &amp;', '2026-11-10')
    );
    assert.strictEqual(post.title, "Who needs workflows when you have agents? It's &");
    assert.strictEqual(post.published, Date.parse('2026-11-10'));
  });

  it('reports a missing publish date as null', () => {
    assert.strictEqual(parseBlogPost('<title>x | Temporal</title>').published, null);
  });
});

describe('pickBlogPost', () => {
  it('skips posts newer than three days and stops once lastmod falls behind the best publish date', async () => {
    const entries = parseSitemap(
      sitemap([
        ['https://temporal.io/blog/today', '2026-11-20'],
        ['https://temporal.io/blog/edited', '2026-11-19'],
        ['https://temporal.io/blog/three-days', '2026-11-17'],
        ['https://temporal.io/blog/older', '2026-11-12'],
      ])
    );
    const { fetchPage, fetched } = stubFetch({
      'https://temporal.io/blog/today': postHtml('Today', '2026-11-20'),
      // Edited recently, published long ago: lastmod is ahead of the publish date.
      'https://temporal.io/blog/edited': postHtml('Edited', '2026-11-01'),
      'https://temporal.io/blog/three-days': postHtml('Three days', '2026-11-17'),
      'https://temporal.io/blog/older': postHtml('Older', '2026-11-12'),
    });
    const picked = await pickBlogPost(entries, fetchPage, NOW);
    assert.deepStrictEqual(picked, {
      url: 'https://temporal.io/blog/three-days',
      title: 'Three days',
      published: Date.parse('2026-11-17'),
    });
    assert.ok(!fetched.includes('https://temporal.io/blog/older'));
  });

  it('keeps going past a page that fails to load', async () => {
    const entries = parseSitemap(
      sitemap([
        ['https://temporal.io/blog/broken', '2026-11-16'],
        ['https://temporal.io/blog/fine', '2026-11-15'],
      ])
    );
    const { fetchPage } = stubFetch({ 'https://temporal.io/blog/fine': postHtml('Fine', '2026-11-15') });
    assert.strictEqual((await pickBlogPost(entries, fetchPage, NOW)).url, 'https://temporal.io/blog/fine');
  });

  it('reports a problem when no post is old enough within the fetch budget', async () => {
    const entries = parseSitemap(
      sitemap([
        ['https://temporal.io/blog/a', '2026-11-20'],
        ['https://temporal.io/blog/b', '2026-11-19'],
        ['https://temporal.io/blog/c', '2026-11-01'],
      ])
    );
    const { fetchPage } = stubFetch({
      'https://temporal.io/blog/a': postHtml('A', '2026-11-20'),
      'https://temporal.io/blog/b': postHtml('B', '2026-11-19'),
      'https://temporal.io/blog/c': postHtml('C', '2026-11-01'),
    });
    const picked = await pickBlogPost(entries, fetchPage, NOW, 2);
    assert.match(picked.problem, /^Couldn't find a blog post at least 3 days old among the 2 most recently modified/);
  });

  it('reports a sitemap with no posts', async () => {
    const picked = await pickBlogPost(
      parseSitemap(sitemap([['https://temporal.io/', null]])),
      stubFetch({}).fetchPage,
      NOW
    );
    assert.match(picked.problem, /lists no \/blog\/ posts/);
  });
});

describe('docs page selection', () => {
  it('parses frontmatter scalars, quoted or not', () => {
    const text = "---\nid: x\ntitle: 'It''s new'\nslug: \"/cloud/x\"\nunlisted: true\ntags:\n  - Cloud\n---\nBody";
    assert.deepStrictEqual(parseFrontmatter(text), { id: 'x', title: "It's new", slug: '/cloud/x', unlisted: true });
    assert.deepStrictEqual(parseFrontmatter('No frontmatter'), {});
  });

  it('recognizes index pages', () => {
    assert.ok(isIndexPage('develop/rust/best-practices/index.mdx'));
    assert.ok(isIndexPage('cloud/connectivity/connectivity.mdx'));
    assert.ok(!isIndexPage('cloud/connectivity/azure-connectivity.mdx'));
  });

  it('builds the URL from slug, id, or file name', () => {
    assert.strictEqual(docUrl('cloud/x.mdx', { slug: '/elsewhere/y' }), 'https://docs.temporal.io/elsewhere/y');
    assert.strictEqual(docUrl('cloud/x.mdx', { slug: 'y' }), 'https://docs.temporal.io/cloud/y');
    assert.strictEqual(docUrl('cloud/x.mdx', { id: 'z' }), 'https://docs.temporal.io/cloud/z');
    assert.strictEqual(docUrl('01-guide/02-step.mdx', {}), 'https://docs.temporal.io/guide/step');
  });

  it('parses git log output, newest first, keeping docs pages only', () => {
    const output =
      '\x012026-11-17T11:01:09-05:00\n\ndocs/cloud/a.mdx\ndocs/cloud/img.png\n' +
      '\x012026-11-16T09:00:00Z\n\ndocs/cloud/b.md\nsrc/x.js\n';
    assert.deepStrictEqual(parseAddedDocs(output), [
      { date: Date.parse('2026-11-17T16:01:09Z'), file: 'docs/cloud/a.mdx' },
      { date: Date.parse('2026-11-16T09:00:00Z'), file: 'docs/cloud/b.md' },
    ]);
  });

  const files = {
    'docs/cloud/brand-new.mdx': '---\ntitle: Brand new page\nslug: /cloud/brand-new\n---\n',
    'docs/develop/rust/external-storage.mdx':
      '---\ntitle: External Storage\nslug: /develop/rust/external-storage\n---\n',
    'docs/develop/rust/index.mdx': '---\ntitle: Rust SDK\nslug: /develop/rust\n---\n',
    'docs/internal/callouts.mdx': '---\ntitle: Callout reference\nslug: /internal/callouts\nunlisted: true\n---\n',
    'docs/cloud/_partial.mdx': '---\ntitle: Partial\n---\n',
    'docs/cloud/not-deployed.mdx': '---\ntitle: Not deployed yet\nslug: /cloud/not-deployed\n---\n',
    'docs/cloud/the-one.mdx': '---\ntitle: Payload encryption validation\nslug: /cloud/the-one\n---\n',
  };
  const added = [
    ['docs/cloud/brand-new.mdx', '2026-11-19T00:00:00Z'],
    ['docs/develop/rust/external-storage.mdx', '2026-11-16T00:00:00Z'],
    ['docs/develop/rust/index.mdx', '2026-11-16T00:00:00Z'],
    ['docs/internal/callouts.mdx', '2026-11-15T00:00:00Z'],
    ['docs/cloud/_partial.mdx', '2026-11-15T00:00:00Z'],
    ['docs/cloud/deleted-since.mdx', '2026-11-15T00:00:00Z'],
    ['docs/cloud/not-deployed.mdx', '2026-11-14T00:00:00Z'],
    ['docs/cloud/the-one.mdx', '2026-11-13T00:00:00Z'],
  ].map(([file, date]) => ({ file, date: Date.parse(date) }));
  const sitemapUrls = new Set(
    ['brand-new', 'the-one']
      .map((slug) => `https://docs.temporal.io/cloud/${slug}`)
      .concat([
        'https://docs.temporal.io/develop/rust/external-storage',
        'https://docs.temporal.io/develop/rust',
        'https://docs.temporal.io/internal/callouts',
      ])
  );
  const titleCounts = new Map([
    ['external storage', 6],
    ['payload encryption validation', 1],
    ['brand new page', 1],
  ]);
  const readDoc = (file) => files[file] ?? null;

  it('skips new, index, unlisted, partial, deleted, undeployed, and shared-title pages', () => {
    assert.deepStrictEqual(pickDocsPage({ added, sitemapUrls, readDoc, titleCounts, now: NOW }), {
      url: 'https://docs.temporal.io/cloud/the-one',
      title: 'Payload encryption validation',
      published: Date.parse('2026-11-13T00:00:00Z'),
      file: 'docs/cloud/the-one.mdx',
    });
  });

  it('points at a shallow clone when git history has no added pages', () => {
    const picked = pickDocsPage({ added: [], sitemapUrls, readDoc, titleCounts, now: NOW });
    assert.match(picked.problem, /fetch-depth: 0/);
  });

  it('reports when no page qualifies', () => {
    const picked = pickDocsPage({ added: added.slice(0, 2), sitemapUrls, readDoc, titleCounts, now: NOW });
    assert.match(picked.problem, /^None of the 2 pages added under docs\//);
  });
});

describe('evaluateFreshness', () => {
  const target = {
    url: 'https://temporal.io/blog/fast-apis-with-durable-execution-using-temporal-update-with-start',
    title: 'Fast APIs',
    published: Date.parse('2026-11-17'),
  };

  it('passes when a result is the page, under a heading anchor', () => {
    const body = [{ content: 'x', source_url: `${target.url}#conclusion`, page_url: `${target.url}#conclusion` }];
    assert.deepStrictEqual(evaluateFreshness(blogCheck, target, ok(body)), []);
  });

  it('matches a docs result by its .md source_url or its page_url', () => {
    const docsTarget = { url: 'https://docs.temporal.io/cloud/x', title: 'X', published: NOW - 4 * DAY };
    const [, docsCheck] = FRESHNESS_CHECKS;
    assert.deepStrictEqual(
      evaluateFreshness(
        docsCheck,
        docsTarget,
        ok([{ content: 'x', source_url: 'https://docs.temporal.io/cloud/x.md' }])
      ),
      []
    );
    assert.deepStrictEqual(
      evaluateFreshness(docsCheck, docsTarget, ok([{ content: 'x', source_url: '', page_url: `${docsTarget.url}#a` }])),
      []
    );
  });

  // What the blog source returned from 2026-03 to 2026-11, when every refresh
  // accepted 0 pages: docs pages and older posts, never the new one.
  it('fails when the page is missing, and says what to look for in Kapa', () => {
    const body = [
      ...pages(10),
      {
        content: 'x',
        source_url: 'https://temporal.io/blog/2022-start-here',
        page_url: 'https://temporal.io/blog/2022-start-here',
      },
    ];
    const problems = evaluateFreshness(blogCheck, target, ok(body));
    assert.strictEqual(problems.length, 1);
    assert.match(problems[0], /^No result is https:\/\/temporal\.io\/blog\/fast-apis.*, published 2026-11-17\./);
    assert.match(problems[0], /selectors no longer match/);
    assert.match(problems[0], /Needs review/);
    assert.match(problems[0], /temporal\.io\/blog web crawl/);
  });

  it('reports an endpoint failure the same way the other checks do', () => {
    assert.match(evaluateFreshness(blogCheck, target, { status: 502, body: 'x' })[0], /^HTTP 502/);
  });
});
