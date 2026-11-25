const { describe, it, afterEach } = require('node:test');
const assert = require('node:assert');
const { SOURCES, buildSnapshot, decodeEntities, normalizeUrl, parsePage, parseSitemap } = require('./write-external-content');

describe('normalizeUrl', () => {
  it('drops the anchor, query, and trailing slash', () => {
    assert.strictEqual(normalizeUrl('https://Learn.temporal.io/tutorials/python/x/?a=1#step'), 'https://learn.temporal.io/tutorials/python/x');
  });

  it('keeps the root path and rejects non-URLs', () => {
    assert.strictEqual(normalizeUrl('https://temporal.io/'), 'https://temporal.io/');
    assert.strictEqual(normalizeUrl('not a url'), null);
  });
});

describe('decodeEntities', () => {
  it('decodes named, decimal, and hex entities', () => {
    assert.strictEqual(decodeEntities('Airflow &amp; EMR &#39;tale&#39; &#x2019;s &quot;x&quot;'), `Airflow & EMR 'tale' ’s "x"`);
  });

  it('leaves unknown entities alone', () => {
    assert.strictEqual(decodeEntities('&bogus;'), '&bogus;');
  });
});

describe('parseSitemap', () => {
  it('returns every <loc>, decoded and trimmed', () => {
    const xml = '<urlset><url><loc>https://a.test/x?a=1&amp;b=2</loc></url><url><loc>\n https://a.test/y </loc></url></urlset>';
    assert.deepStrictEqual(parseSitemap(xml), ['https://a.test/x?a=1&b=2', 'https://a.test/y']);
  });
});

describe('parsePage', () => {
  it('reads quoted og tags (blog)', () => {
    const html = `<meta name="description" content="Plain."/><meta property="og:title" content="Trading Airflow &amp; EMR"/><meta property="og:description" content="Mediaset replaced Airflow and six AWS services."/>`;
    assert.deepStrictEqual(parsePage(html), { title: 'Trading Airflow & EMR', description: 'Mediaset replaced Airflow and six AWS services.' });
  });

  it('reads bare attribute values and applies the cleaner (Learn)', () => {
    const html = `<meta  property=og:title content="Build a data pipeline with Python | Learn Temporal"/><meta  property=og:description content="You'll implement a data pipeline application."/>`;
    const clean = (title) => title.replace(/\s*\|\s*Learn Temporal$/, '');
    assert.deepStrictEqual(parsePage(html, clean), { title: 'Build a data pipeline with Python', description: "You'll implement a data pipeline application." });
  });

  it('falls back to <title> and the description meta tag', () => {
    const html = `<title data-rh="true">Python tutorials</title><meta name="description" content="All of the Python tutorials, in one place."/>`;
    assert.deepStrictEqual(parsePage(html), { title: 'Python tutorials', description: 'All of the Python tutorials, in one place.' });
  });

  it('returns null when the title or description is missing', () => {
    assert.strictEqual(parsePage('<meta property="og:title" content="Only a title"/>'), null);
    assert.strictEqual(parsePage('<p>nothing</p>'), null);
  });

  it('returns null for a description too short to show', () => {
    assert.strictEqual(parsePage('<meta property="og:title" content="Changelog"/><meta property="og:description" content="2023-05-17"/>'), null);
  });

  it('keeps the first of a repeated tag', () => {
    const html = `<meta property="og:title" content="First"/><meta property="og:title" content="Second"/><meta property="og:description" content="A description that is long enough."/>`;
    assert.strictEqual(parsePage(html).title, 'First');
  });
});

describe('source filters', () => {
  const blog = SOURCES[0].include;
  const learn = SOURCES[1].include;
  const url = (value) => new URL(value);

  it('includes blog posts but not the index or other sections', () => {
    assert.ok(blog(url('https://temporal.io/blog/some-post')));
    assert.ok(!blog(url('https://temporal.io/blog')));
    assert.ok(!blog(url('https://temporal.io/blog/tag/ai')));
    assert.ok(!blog(url('https://temporal.io/about')));
  });

  it('includes Learn tutorials, courses, and examples but not the root, tags, or search', () => {
    assert.ok(learn(url('https://learn.temporal.io/tutorials/python/')));
    assert.ok(learn(url('https://learn.temporal.io/courses/101')));
    assert.ok(!learn(url('https://learn.temporal.io/')));
    assert.ok(!learn(url('https://learn.temporal.io/tags/python')));
    assert.ok(!learn(url('https://learn.temporal.io/search')));
  });
});

describe('buildSnapshot', () => {
  const originalFetch = global.fetch;
  afterEach(() => {
    global.fetch = originalFetch;
  });

  const sources = [{ sitemap: 'https://a.test/sitemap.xml', include: () => true, clean: (title) => title }];
  const page = (title) => `<meta property="og:title" content="${title}"/><meta property="og:description" content="A description of ${title} that is long enough."/>`;

  function stubFetch(pages) {
    global.fetch = async (url) => {
      const body = url.endsWith('sitemap.xml')
        ? `<urlset>${Object.keys(pages).map((loc) => `<loc>${loc}</loc>`).join('')}</urlset>`
        : pages[url];
      if (body === undefined || body instanceof Error) return { ok: false, status: 500, text: async () => '' };
      return { ok: true, status: 200, text: async () => body };
    };
  }

  it('keys entries by normalized URL, keeps the canonical URL, and sorts', async () => {
    stubFetch({ 'https://a.test/b/': page('B'), 'https://a.test/a': page('A') });
    const snapshot = await buildSnapshot({ sources, retryDelay: 0 });
    assert.deepStrictEqual(Object.keys(snapshot), ['https://a.test/a', 'https://a.test/b']);
    assert.deepStrictEqual(snapshot['https://a.test/b'], { title: 'B', description: 'A description of B that is long enough.', url: 'https://a.test/b/' });
  });

  it('keeps the previous entry for a page that fails, among many that succeed', async () => {
    const pages = {};
    for (let i = 0; i < 20; i++) pages[`https://a.test/p${i}`] = page(`P${i}`);
    pages['https://a.test/p3'] = new Error('down');
    stubFetch(pages);
    const previous = { 'https://a.test/p3': { title: 'Old', description: 'Old.', url: 'https://a.test/p3' } };
    const snapshot = await buildSnapshot({ previous, sources, retryDelay: 0 });
    assert.strictEqual(snapshot['https://a.test/p3'].title, 'Old');
    assert.strictEqual(Object.keys(snapshot).length, 20);
  });

  it('drops pages that are no longer in the sitemap', async () => {
    stubFetch({ 'https://a.test/kept': page('Kept') });
    const previous = { 'https://a.test/gone': { title: 'Gone', description: 'x', url: 'https://a.test/gone' } };
    assert.deepStrictEqual(Object.keys(await buildSnapshot({ previous, sources, retryDelay: 0 })), ['https://a.test/kept']);
  });

  it('refuses to write when too many pages fail', async () => {
    stubFetch({ 'https://a.test/1': new Error('x'), 'https://a.test/2': page('Two') });
    await assert.rejects(buildSnapshot({ sources, retryDelay: 0 }), /failed to load/);
  });

  it('fails when a sitemap lists no matching pages', async () => {
    stubFetch({});
    await assert.rejects(buildSnapshot({ sources, retryDelay: 0 }), /listed no pages/);
  });

  function stubWithFlakyPages(handlers) {
    const attempts = {};
    const locs = Array.from({ length: 20 }, (_, n) => `https://a.test/p${n}`);
    global.fetch = async (url) => {
      if (url.endsWith('sitemap.xml')) return { ok: true, status: 200, text: async () => locs.map((loc) => `<loc>${loc}</loc>`).join('') };
      attempts[url] = (attempts[url] || 0) + 1;
      return (handlers[url] || (() => ({ ok: true, status: 200, text: async () => page('P') })))(attempts[url]);
    };
    return attempts;
  }

  it('retries a dropped connection until the page loads', async () => {
    const attempts = stubWithFlakyPages({
      'https://a.test/p0': (n) => {
        if (n < 3) throw new TypeError('fetch failed');
        return { ok: true, status: 200, text: async () => page('P0') };
      },
    });
    const snapshot = await buildSnapshot({ sources, retryDelay: 0 });
    assert.strictEqual(attempts['https://a.test/p0'], 3);
    assert.strictEqual(snapshot['https://a.test/p0'].title, 'P0');
  });

  it('does not retry a 404', async () => {
    const attempts = stubWithFlakyPages({ 'https://a.test/p0': () => ({ ok: false, status: 404, text: async () => '' }) });
    const snapshot = await buildSnapshot({ sources, retryDelay: 0 });
    assert.strictEqual(attempts['https://a.test/p0'], 1);
    assert.ok(!('https://a.test/p0' in snapshot));
  });

  it('retries a 503', async () => {
    const attempts = stubWithFlakyPages({
      'https://a.test/p0': (n) => (n < 2 ? { ok: false, status: 503, text: async () => '' } : { ok: true, status: 200, text: async () => page('P0') }),
    });
    await buildSnapshot({ sources, retryDelay: 0 });
    assert.strictEqual(attempts['https://a.test/p0'], 2);
  });
});
