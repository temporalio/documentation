const { test } = require('node:test');
const assert = require('node:assert/strict');
const { absolutizeImageUrls } = require('./image-urls');

const base = {
  siteUrl: 'https://docs.temporal.io',
  urlPath: 'guides/my-guide',
  sourceDir: '/repo/docs/guides',
  fileExists: () => true,
};

function run(md, overrides = {}) {
  const copied = [];
  const out = absolutizeImageUrls(md, {
    ...base,
    ...overrides,
    copyAsset: (from, to) => copied.push([from, to]),
  });
  return { out, copied };
}

test('rewrites page-relative images and copies the file', () => {
  const { out, copied } = run('![Alt](assets/x/a.png)');
  assert.equal(out, '![Alt](https://docs.temporal.io/guides/assets/x/a.png)');
  assert.deepEqual(copied, [['/repo/docs/guides/assets/x/a.png', 'guides/assets/x/a.png']]);
});

test('prefixes root-relative images with the site URL', () => {
  const { out, copied } = run('![Alt](/img/a.png "Title")');
  assert.equal(out, '![Alt](https://docs.temporal.io/img/a.png "Title")');
  assert.equal(copied.length, 0);
});

test('leaves external, data, and missing-file images alone', () => {
  const md = '![a](https://x.io/a.png)\n![b](data:image/png;base64,AAA)';
  assert.equal(run(md).out, md);
  assert.equal(run('![c](nope.png)', { fileExists: () => false }).out, '![c](nope.png)');
});

test('skips fenced code blocks', () => {
  const md = '```\n![a](assets/a.png)\n```';
  assert.equal(run(md).out, md);
});
