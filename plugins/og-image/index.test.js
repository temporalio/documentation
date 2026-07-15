const { describe, it } = require('node:test');
const assert = require('node:assert');
const ogImagePlugin = require('./index');

const SITE_URL = 'https://docs.temporal.io/';

describe('hasManualOverride', () => {
  it('is true when front matter has an image field', () => {
    assert.strictEqual(ogImagePlugin.hasManualOverride({ image: '/img/custom.png' }, 'Body text'), true);
  });

  it('is true when content has a <Head> og:image override', () => {
    const content = `
import Head from '@docusaurus/Head';

<Head>
  <meta property="og:image" content="https://docs.temporal.io/img/custom.png" />
</Head>

Body text`;
    assert.strictEqual(ogImagePlugin.hasManualOverride({}, content), true);
  });

  it('is false for a normal page with neither', () => {
    assert.strictEqual(ogImagePlugin.hasManualOverride({}, 'Just a normal doc page.'), false);
  });

  it('is false when <Head> is used for something other than og:image', () => {
    const content = `
<Head>
  <link rel="canonical" href="https://docs.temporal.io/some-page" />
</Head>

Body text`;
    assert.strictEqual(ogImagePlugin.hasManualOverride({}, content), false);
  });
});

describe('overrideImageFor', () => {
  it('resolves a relative front-matter image against the site URL', () => {
    assert.strictEqual(
      ogImagePlugin.overrideImageFor({ image: '/img/custom.png' }, '', SITE_URL),
      'https://docs.temporal.io/img/custom.png',
    );
  });

  it('leaves an already-absolute front-matter image as-is', () => {
    assert.strictEqual(
      ogImagePlugin.overrideImageFor({ image: 'https://example.com/img/custom.png' }, '', SITE_URL),
      'https://example.com/img/custom.png',
    );
  });

  it('extracts the content= value from a <Head> og:image override', () => {
    const content = `
<Head>
  <meta property="og:image" content="https://docs.temporal.io/img/custom.png" />
  <meta name="twitter:image" content="https://docs.temporal.io/img/custom.png" />
</Head>
`;
    assert.strictEqual(ogImagePlugin.overrideImageFor({}, content, SITE_URL), 'https://docs.temporal.io/img/custom.png');
  });

  it('prefers front-matter image over a <Head> override if somehow both are present', () => {
    const content = `
<Head>
  <meta property="og:image" content="https://docs.temporal.io/img/head-version.png" />
</Head>
`;
    assert.strictEqual(
      ogImagePlugin.overrideImageFor({ image: '/img/frontmatter-version.png' }, content, SITE_URL),
      'https://docs.temporal.io/img/frontmatter-version.png',
    );
  });

  it('returns null when there is no override to resolve', () => {
    assert.strictEqual(ogImagePlugin.overrideImageFor({}, 'Just a normal doc page.', SITE_URL), null);
  });
});
