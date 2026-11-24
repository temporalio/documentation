'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');

const NAVIGATION_URL = 'https://temporal.io/api/navigation';
const SNAPSHOT_PATH = path.join(__dirname, '../src/data/navigation.json');

function validateNavigation(data) {
  const text = (value) => assert(typeof value === 'string' && value.trim(), 'Expected non-empty text');
  const url = (value) => {
    text(value);
    assert(new URL(value).protocol === 'https:', 'Expected an HTTPS navigation URL');
  };
  const link = (value) => {
    text(value.id);
    text(value.label);
    url(value.href);
  };
  const ctas = (values) => {
    assert(Array.isArray(values), 'Expected a CTA array');
    values.forEach((value) => {
      link(value);
      assert(['primary', 'secondary'].includes(value.variant), 'Unsupported CTA variant');
      text(value.theme);
      text(value.size);
    });
  };

  text(data.logo.alt);
  [data.logo.href, data.logo.light, data.logo.dark].forEach(url);
  assert(Array.isArray(data.items) && data.items.length > 0, 'Expected navigation items');
  data.items.forEach((item) => {
    text(item.id);
    text(item.label);
    if (item.type === 'link') {
      link(item);
    } else {
      assert.equal(item.type, 'group', 'Unsupported navigation item type');
      assert(Array.isArray(item.sections), 'Expected group sections');
      item.sections.forEach((section) => {
        if (section.title !== undefined) text(section.title);
        assert(Array.isArray(section.links), 'Expected section links');
        section.links.forEach(link);
      });
      ctas(item.ctas);
    }
  });
  ctas(data.ctas);
  for (const mode of ['light', 'dark']) {
    for (const key of ['background', 'text', 'textHover', 'icon', 'iconHover']) {
      assert(
        /^#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})$/i.test(data.tokens[mode][key]),
        `Expected a hex color for tokens.${mode}.${key}`,
      );
    }
  }
  return data;
}

async function syncNavigation({
  fetchImpl = fetch,
  snapshotPath = SNAPSHOT_PATH,
  logger = console,
} = {}) {
  let data;
  try {
    const response = await fetchImpl(NAVIGATION_URL, { signal: AbortSignal.timeout(10_000) });
    if (!response.ok) throw new Error(`Navigation API returned HTTP ${response.status}`);
    data = validateNavigation(await response.json());
  } catch (error) {
    // A bad fallback must fail the build rather than publish an unusable navbar.
    validateNavigation(JSON.parse(await fs.readFile(snapshotPath, 'utf8')));
    logger.warn(`[sync-navigation] ${error.message}; using saved snapshot at ${snapshotPath}`);
    return;
  }

  await fs.mkdir(path.dirname(snapshotPath), { recursive: true });
  await fs.writeFile(snapshotPath, `${JSON.stringify(data, null, 2)}\n`);
  logger.log(`[sync-navigation] Updated ${snapshotPath}`);
}

if (require.main === module) {
  syncNavigation().catch((error) => {
    console.error(`[sync-navigation] ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { syncNavigation, validateNavigation };
