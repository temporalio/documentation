const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const {
  filePathToUrlPath,
  extractFrontMatter,
  resolveUrlFromContent,
  resolveOldUrl,
  getLiveUrls,
  vercelPatternToRegex,
  findMatchingRedirect,
  loadRedirects,
} = require('./check-redirects-for-moved-pages.js');

describe('filePathToUrlPath', () => {
  it('strips docs/ prefix and extension', () => {
    assert.strictEqual(
      filePathToUrlPath('docs/cloud/terraform-provider.mdx'),
      '/cloud/terraform-provider',
    );
  });

  it('handles .md extension', () => {
    assert.strictEqual(filePathToUrlPath('docs/glossary.md'), '/glossary');
  });

  it('strips /index from directory pages', () => {
    assert.strictEqual(filePathToUrlPath('docs/cloud/index.mdx'), '/cloud');
  });

  it('handles deeply nested paths', () => {
    assert.strictEqual(
      filePathToUrlPath('docs/develop/go/best-practices/data-handling/data-conversion.mdx'),
      '/develop/go/best-practices/data-handling/data-conversion',
    );
  });
});

describe('extractFrontMatter', () => {
  it('extracts slug', () => {
    const content = '---\nid: foo\nslug: /custom/path\n---\nBody text';
    assert.deepStrictEqual(extractFrontMatter(content), {
      id: 'foo',
      slug: '/custom/path',
    });
  });

  it('returns empty object when no frontmatter', () => {
    assert.deepStrictEqual(extractFrontMatter('Just body text'), {});
  });

  it('handles frontmatter with only id', () => {
    const content = '---\nid: my-page\ntitle: My Page\n---\n';
    assert.deepStrictEqual(extractFrontMatter(content), { id: 'my-page' });
  });
});

describe('resolveOldUrl against real repo pages', () => {
  it('file path only (no slug, no id)', () => {
    const url = resolveOldUrl('docs/cloud/terraform-provider.mdx', 'HEAD');
    assert.strictEqual(url, '/cloud/terraform-provider');
  });

  it('absolute slug override', () => {
    const url = resolveOldUrl(
      'docs/develop/go/best-practices/data-handling/data-conversion.mdx',
      'HEAD',
    );
    assert.strictEqual(url, '/develop/go/data-handling/data-conversion');
  });

  it('id replacing filename', () => {
    const url = resolveOldUrl('docs/develop/go/set-up.mdx', 'HEAD');
    assert.strictEqual(url, '/develop/go/set-up-your-local-go');
  });

  it('index page', () => {
    const url = resolveOldUrl('docs/cloud/index.mdx', 'HEAD');
    assert.strictEqual(url, '/cloud');
  });

  it('page-to-folder rename resolves to same URL', () => {
    // e.g. serverless-workers.mdx -> serverless-workers/index.mdx
    // Both should resolve to the same URL, so no redirect is needed.
    const oldUrl = filePathToUrlPath('docs/encyclopedia/workers/serverless-workers.mdx');
    const newUrl = filePathToUrlPath('docs/encyclopedia/workers/serverless-workers/index.mdx');
    assert.strictEqual(oldUrl, newUrl);
    assert.strictEqual(oldUrl, '/encyclopedia/workers/serverless-workers');
  });
});

describe('resolveUrlFromContent', () => {
  it('resolves from raw content without touching git', () => {
    const content = '---\nid: my-page\n---\nBody';
    assert.strictEqual(
      resolveUrlFromContent('docs/cloud/foo.mdx', content),
      '/cloud/my-page',
    );
  });

  it('falls back to the file path when content is null', () => {
    assert.strictEqual(
      resolveUrlFromContent('docs/cloud/foo.mdx', null),
      '/cloud/foo',
    );
  });
});

describe('getLiveUrls', () => {
  const liveUrls = getLiveUrls('HEAD');

  it('includes URLs served by real pages at HEAD', () => {
    assert.ok(liveUrls.has('/cloud/terraform-provider'));
    assert.ok(liveUrls.has('/cloud'));
  });

  it('resolves frontmatter id/slug overrides into live URLs', () => {
    // docs/develop/go/set-up.mdx has id: set-up-your-local-go
    assert.ok(liveUrls.has('/develop/go/set-up-your-local-go'));
    // The bare file path is NOT the served URL.
    assert.ok(!liveUrls.has('/develop/go/set-up'));
  });

  it('does not contain paths for pages that do not exist', () => {
    assert.ok(!liveUrls.has('/this/page/never/existed'));
  });
});

describe('vercelPatternToRegex', () => {
  it('matches wildcard patterns', () => {
    const regex = vercelPatternToRegex('/production-deployment/cloud/:path*');
    assert.ok(regex.test('/production-deployment/cloud/terraform-provider'));
    assert.ok(regex.test('/production-deployment/cloud/foo/bar'));
    assert.ok(!regex.test('/cloud/terraform-provider'));
  });

  it('matches single-segment params', () => {
    const regex = vercelPatternToRegex('/dev-guide/:slug');
    assert.ok(regex.test('/dev-guide/hello'));
    assert.ok(!regex.test('/dev-guide/hello/world'));
  });

  it('matches exact paths', () => {
    const regex = vercelPatternToRegex('/cloud/billing-reports');
    assert.ok(regex.test('/cloud/billing-reports'));
    assert.ok(!regex.test('/cloud/billing-reports/extra'));
  });
});

describe('findMatchingRedirect', () => {
  it('finds a match from real vercel.json redirects', () => {
    const redirects = loadRedirects();
    const match = findMatchingRedirect(
      '/production-deployment/cloud/terraform-provider',
      redirects,
    );
    assert.ok(match, 'expected wildcard redirect to match');
  });

  it('returns undefined for paths with no redirect', () => {
    const redirects = loadRedirects();
    const match = findMatchingRedirect(
      '/this/path/does/not/exist',
      redirects,
    );
    assert.strictEqual(match, undefined);
  });

  it('redirects the old AI Cookbook markdown landing page', () => {
    const redirects = loadRedirects();
    const match = findMatchingRedirect('/ai-cookbook.md', redirects);
    assert.ok(match, 'expected /ai-cookbook.md to have a redirect');
    assert.strictEqual(match.source, '/ai-cookbook.md');
    assert.strictEqual(match.destination, '/ai/cookbook.md');
  });

  it('redirects renamed AI Cookbook recipe markdown URLs to the new slug', () => {
    const redirects = loadRedirects();
    const match = findMatchingRedirect(
      '/ai-cookbook/basic-python.md',
      redirects,
    );
    assert.ok(match, 'expected /ai-cookbook/basic-python.md to have a redirect');
    assert.strictEqual(match.source, '/ai-cookbook/basic-python.md');
    assert.strictEqual(
      match.destination,
      '/ai/cookbook/hello-world-openai-responses-python.md',
    );
  });

  it('redirects the even older /cookbook.md landing page', () => {
    const redirects = loadRedirects();
    const match = findMatchingRedirect('/cookbook.md', redirects);
    assert.ok(match, 'expected /cookbook.md to have a redirect');
    assert.strictEqual(match.source, '/cookbook.md');
    assert.strictEqual(match.destination, '/ai/cookbook.md');
  });
});
