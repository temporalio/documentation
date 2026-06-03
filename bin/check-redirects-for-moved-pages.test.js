const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const {
  filePathToUrlPath,
  extractFrontMatter,
  resolveOldUrl,
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
});
