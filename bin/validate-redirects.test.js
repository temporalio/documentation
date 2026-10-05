const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const {
  compileRedirects,
  findRedirect,
  followRedirects,
  markdownRedirect,
  normalizePath,
  sampleSource,
  substitute,
  destinationBase,
} = require('./redirect-utils');
const { validateRedirects, applyBaseline } = require('./validate-redirects');
const { buildRouteIndex } = require('./redirect-routes');

// A route index that serves exactly the given paths.
function routesFor(...paths) {
  const set = new Set(paths);
  return { has: (p) => set.has(normalizePath(p)), maybe: (p) => set.has(normalizePath(p)) };
}

function checksFor(rules, routes = routesFor('/new', '/develop')) {
  return validateRedirects(rules, routes).map((f) => `${f.check}:${f.source}`);
}

describe('redirect matching (Vercel path-to-regexp)', () => {
  const compile = (...sources) => compileRedirects(sources.map((source) => ({ source, destination: '/x' })));

  it('matches the bare path and sub-paths with /:param*', () => {
    const rules = compile('/foo/:path*');
    assert.ok(findRedirect('/foo', rules));
    assert.ok(findRedirect('/foo/a/b', rules));
  });

  it('does not match sub-paths when the slash before :param is missing', () => {
    const rules = compile('/foo:path*');
    assert.ok(findRedirect('/foo-go', rules));
    assert.strictEqual(findRedirect('/foo/bar', rules), null);
  });

  it('applies the first matching rule', () => {
    const rules = compileRedirects([
      { source: '/a/:path*', destination: '/first' },
      { source: '/a', destination: '/second' },
    ]);
    assert.strictEqual(findRedirect('/a', rules).rule.destination, '/first');
  });

  it('strips a trailing slash, query, and fragment before matching', () => {
    assert.strictEqual(normalizePath('/x/'), '/x');
    assert.strictEqual(normalizePath('/x/?a=b#c'), '/x');
    assert.strictEqual(normalizePath('/'), '/');
  });

  it('substitutes parameters, treating a missing one as empty', () => {
    assert.strictEqual(substitute('/new/:path*', { path: 'a/b' }), '/new/a/b');
    assert.strictEqual(substitute('/new/:path*', { path: undefined }), '/new/');
    assert.strictEqual(substitute('https://example.com:443/:p', { p: 'x' }), 'https://example.com:443/x');
  });

  it('samples a rule with the shortest and a longer matching path', () => {
    const [rule] = compile('/foo/:path*');
    assert.deepStrictEqual(sampleSource(rule), { min: '/foo', max: '/foo/x/y' });
  });

  it('does not sample a parameter with a custom regex', () => {
    const [rule] = compile('/foo/:id(\\d+)');
    assert.strictEqual(sampleSource(rule), null);
  });

  it('finds the fixed part of a parameterized destination', () => {
    assert.deepStrictEqual(destinationBase('/develop/:path*'), { base: '/develop', parameterized: true });
    assert.deepStrictEqual(destinationBase('/develop/go#a'), { base: '/develop/go', parameterized: false });
  });

  it('follows a chain of redirects to the end', () => {
    const rules = compileRedirects([
      { source: '/a', destination: '/b' },
      { source: '/b', destination: '/c' },
    ]);
    const result = followRedirects('/a', rules);
    assert.strictEqual(result.final, '/c');
    assert.strictEqual(result.chain.length, 2);
  });
});

describe('markdownRedirect', () => {
  const rules = compileRedirects([
    { source: '/old', destination: '/new', permanent: true },
    { source: '/a', destination: '/b' },
    { source: '/b', destination: '/c' },
    { source: '/anchor', destination: '/new#section', permanent: true },
    { source: '/home', destination: '/' },
    { source: '/temporary', destination: '/b', permanent: false },
    { source: '/blog/:path*', destination: 'https://temporal.io/blog/:path*' },
    { source: '/loop', destination: '/loop' },
    { source: '/sitemap_index.xml', destination: '/sitemap.xml' },
  ]);

  it("sends a redirected page's .md to the destination's .md", () => {
    assert.deepStrictEqual(markdownRedirect('/old.md', rules), { status: 308, location: '/new.md' });
  });

  it('follows a chain of redirects to the end', () => {
    assert.deepStrictEqual(markdownRedirect('/a.md', rules), { status: 308, location: '/c.md' });
  });

  it('drops the fragment from the destination', () => {
    assert.strictEqual(markdownRedirect('/anchor.md', rules).location, '/new.md');
  });

  it('sends a redirect to the home page to /index.md', () => {
    assert.strictEqual(markdownRedirect('/home.md', rules).location, '/index.md');
  });

  it('is temporary when any hop is temporary', () => {
    assert.deepStrictEqual(markdownRedirect('/temporary.md', rules), { status: 307, location: '/c.md' });
  });

  it('ignores pages that are not redirected, paths without .md, external destinations, files, and loops', () => {
    assert.strictEqual(markdownRedirect('/other.md', rules), null);
    assert.strictEqual(markdownRedirect('/old', rules), null);
    assert.strictEqual(markdownRedirect('/blog/post.md', rules), null);
    assert.strictEqual(markdownRedirect('/sitemap_index.xml.md', rules), null);
    assert.strictEqual(markdownRedirect('/loop.md', rules), null);
  });
});

describe('api/markdown-not-found', () => {
  const handler = require('../api/markdown-not-found');

  function request(url) {
    const response = { headers: {} };
    response.status = (code) => Object.assign(response, { statusCode: code });
    response.setHeader = (key, value) => Object.assign(response, { headers: { ...response.headers, [key]: value } });
    response.send = (body) => Object.assign(response, { body });
    response.redirect = (code, location) => Object.assign(response, { statusCode: code, location });
    handler({ url }, response);
    return response;
  }

  it('redirects the .md URL of a page that vercel.json redirects', () => {
    const response = request('/cloud/limits.md');
    assert.strictEqual(response.statusCode, 308);
    assert.strictEqual(response.location, '/evaluate/cloud/limits.md');
  });

  it('returns the Markdown 404 for anything else', () => {
    for (const url of ['/no-such-page.md', '/no-such-page']) {
      const response = request(url);
      assert.strictEqual(response.statusCode, 404);
      assert.match(response.headers['Content-Type'], /^text\/markdown/);
    }
  });
});

describe('validateRedirects', () => {
  it('accepts a well-formed rule set', () => {
    const rules = [
      { source: '/old', destination: '/new' },
      { source: '/legacy/:path*', destination: '/develop/:path*' },
      { source: '/elsewhere', destination: 'https://example.com/x' },
    ];
    assert.deepStrictEqual(checksFor(rules), []);
  });

  it('flags a parameter glued to the previous segment', () => {
    const rules = [{ source: '/application-development:path*', destination: '/develop' }];
    assert.deepStrictEqual(checksFor(rules), ['glued-param:/application-development:path*']);
  });

  it('does not flag a parameter that follows a slash', () => {
    assert.deepStrictEqual(checksFor([{ source: '/application-development/:path*', destination: '/develop' }]), []);
  });

  it('flags a source with a trailing slash', () => {
    assert.deepStrictEqual(checksFor([{ source: '/old/', destination: '/new' }]), ['source-trailing-slash:/old/']);
  });

  it('flags a source containing a fragment', () => {
    assert.deepStrictEqual(checksFor([{ source: '/old#anchor', destination: '/new' }]), ['source-fragment:/old#anchor']);
  });

  it('flags a source with no leading slash', () => {
    assert.ok(checksFor([{ source: 'old', destination: '/new' }]).includes('source-no-leading-slash:old'));
  });

  it('flags a destination with no leading slash', () => {
    assert.deepStrictEqual(checksFor([{ source: '/old', destination: 'new' }], routesFor('/new')), ['relative-destination:/old']);
  });

  it('flags a destination parameter the source does not define', () => {
    const rules = [{ source: '/old/:path*', destination: '/develop/:rest*' }];
    assert.deepStrictEqual(checksFor(rules), ['undefined-param:/old/:path*']);
  });

  it('flags a source that does not compile', () => {
    assert.deepStrictEqual(checksFor([{ source: '/old/(', destination: '/new' }]), ['invalid-pattern:/old/(']);
  });

  it('flags a duplicate source', () => {
    const rules = [
      { source: '/old', destination: '/new' },
      { source: '/old', destination: '/develop' },
    ];
    assert.deepStrictEqual(checksFor(rules), ['duplicate-source:/old']);
  });

  it('flags a literal rule shadowed by an earlier parameter rule', () => {
    const rules = [
      { source: '/cookbook/:path*', destination: '/new/:path*' },
      { source: '/cookbook', destination: '/new' },
    ];
    assert.deepStrictEqual(checksFor(rules), ['shadowed:/cookbook']);
  });

  it('does not flag a specific rule placed before a broader one', () => {
    const rules = [
      { source: '/cookbook', destination: '/new' },
      { source: '/cookbook/:path*', destination: '/new/:path*' },
    ];
    assert.deepStrictEqual(checksFor(rules), []);
  });

  it('flags a redirect loop', () => {
    const rules = [
      { source: '/a', destination: '/b' },
      { source: '/b', destination: '/a' },
    ];
    const checks = checksFor(rules, routesFor('/a', '/b'));
    assert.ok(checks.includes('redirect-loop:/a'));
    assert.ok(checks.includes('redirect-loop:/b'));
  });

  it('flags a rule that redirects to itself', () => {
    assert.ok(checksFor([{ source: '/a', destination: '/a' }], routesFor()).includes('redirect-loop:/a'));
  });

  it('flags a source that is a page the site serves', () => {
    assert.deepStrictEqual(checksFor([{ source: '/new', destination: '/develop' }]), ['hides-live-page:/new']);
  });

  it('flags a destination the site does not serve', () => {
    assert.deepStrictEqual(checksFor([{ source: '/old', destination: '/missing' }]), ['broken-destination:/old']);
  });

  it('accepts a destination that is itself redirected to a served page', () => {
    const rules = [
      { source: '/old', destination: '/middle' },
      { source: '/middle', destination: '/new' },
    ];
    assert.deepStrictEqual(checksFor(rules), []);
  });

  it('checks the fixed part of a parameterized destination', () => {
    const rules = [{ source: '/old/:path*', destination: '/missing/:path*' }];
    assert.deepStrictEqual(checksFor(rules), ['broken-destination:/old/:path*']);
  });

  it('does not check a destination on another host', () => {
    assert.deepStrictEqual(checksFor([{ source: '/old', destination: 'https://example.com/x' }]), []);
  });
});

describe('applyBaseline', () => {
  const finding = { check: 'hides-live-page', source: '/old' };

  it('removes findings listed in the baseline', () => {
    const { remaining, stale } = applyBaseline([finding], { exceptions: [{ check: 'hides-live-page', source: '/old', note: 'x' }] });
    assert.deepStrictEqual(remaining, []);
    assert.deepStrictEqual(stale, []);
  });

  it('keeps findings that are not in the baseline', () => {
    const { remaining } = applyBaseline([finding], { exceptions: [] });
    assert.strictEqual(remaining.length, 1);
  });

  it('reports baseline entries that no longer match a finding', () => {
    const { stale } = applyBaseline([], { exceptions: [{ check: 'hides-live-page', source: '/old', note: '' }] });
    assert.strictEqual(stale.length, 1);
  });
});

describe('route index', () => {
  const routes = buildRouteIndex();

  it('serves pages with an index file, an id, and a slug', () => {
    assert.ok(routes.has('/develop/go'));
    assert.ok(routes.has('/develop/go/data-handling')); // frontmatter slug
    assert.ok(!routes.has('/develop/go/best-practices/data-handling')); // slug overrides the file path
  });

  it('serves markdown alternates, src/pages routes, and static files', () => {
    assert.ok(routes.has('/develop/go.md'));
    assert.ok(routes.has('/search'));
    assert.ok(routes.has('/robots.txt'));
  });

  it('treats the cookbook as unverifiable rather than missing', () => {
    assert.ok(routes.maybe('/ai/cookbook/anything'));
    assert.ok(routes.maybe('/ai/cookbook.md'));
    assert.ok(!routes.maybe('/ai/cookbookx.md'));
  });
});

describe('vercel.json', () => {
  it('has no redirect problems beyond the baseline', () => {
    const config = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8'));
    const baseline = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'bin', 'redirect-baseline.json'), 'utf8'));
    const { remaining, stale } = applyBaseline(validateRedirects(config.redirects, buildRouteIndex()), baseline);
    assert.deepStrictEqual(remaining.map((f) => `${f.check}:${f.source}`), []);
    assert.deepStrictEqual(stale.map((e) => `${e.check}:${e.source}`), []);
  });
});
