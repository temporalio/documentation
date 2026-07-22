const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const ogImageRemarkPlugin = require('./remarkPlugin');
const { hashFor } = require('./shared');

// The transformer doesn't touch `tree` at all (title extraction reads raw
// content directly, same as postBuild), so these tests pass `null` for it.
function runTransform({ frontMatter, value, path: filePath = '/docs/example.mdx' }) {
  const transform = ogImageRemarkPlugin();
  const file = { data: { frontMatter }, value, path: filePath };
  transform(null, file);
  return frontMatter;
}

describe('ogImageRemarkPlugin', () => {
  let originalNodeEnv;

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('injects the same hash-based path postBuild would render for a normal page', () => {
    const frontMatter = runTransform({
      frontMatter: { title: 'Approval Pattern', description: 'Human-in-the-loop workflows.' },
      value: '---\ntitle: Approval Pattern\n---\n\nSome body content.',
    });
    const expectedHash = hashFor('Approval Pattern', 'Human-in-the-loop workflows.');
    assert.strictEqual(frontMatter.image, `/img/og/${expectedHash}.jpg`);
  });

  it('does nothing outside a production build (yarn start)', () => {
    process.env.NODE_ENV = 'development';
    const frontMatter = runTransform({
      frontMatter: { title: 'Approval Pattern' },
      value: '---\ntitle: Approval Pattern\n---\n\nSome body content.',
    });
    assert.strictEqual(frontMatter.image, undefined);
  });

  it('leaves a front-matter image override untouched', () => {
    const frontMatter = runTransform({
      frontMatter: { title: 'Custom Page', image: '/img/assets/custom.png' },
      value: '---\ntitle: Custom Page\nimage: /img/assets/custom.png\n---\n\nBody.',
    });
    assert.strictEqual(frontMatter.image, '/img/assets/custom.png');
  });

  it('leaves an inline <Head> og:image override untouched', () => {
    const value = `---
title: Custom Page
---

import Head from '@docusaurus/Head';

<Head>
  <meta property="og:image" content="https://docs.temporal.io/img/custom.png" />
</Head>

Body.`;
    const frontMatter = runTransform({ frontMatter: { title: 'Custom Page' }, value });
    assert.strictEqual(frontMatter.image, undefined);
  });

  it('falls back to the first heading, then a humanized id, when there is no front-matter title', () => {
    const withHeading = runTransform({
      frontMatter: {},
      value: '---\n---\n\n# My Heading\n\nBody.',
    });
    assert.strictEqual(withHeading.image, `/img/og/${hashFor('My Heading', undefined)}.jpg`);

    const withNeither = runTransform({
      frontMatter: {},
      value: '---\n---\n\nBody with no heading.',
      path: '/docs/design-patterns/my-page.mdx',
    });
    assert.strictEqual(withNeither.image, `/img/og/${hashFor('My Page', undefined)}.jpg`);
  });

  it('does nothing when frontMatter data is missing', () => {
    const transform = ogImageRemarkPlugin();
    const file = { data: {}, value: 'Body.', path: '/docs/example.mdx' };
    assert.doesNotThrow(() => transform(null, file));
  });
});
