const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { syncNavigation } = require('./sync-navigation');
const { createNavbar } = require('../src/utils/navigation');
const snapshot = require('../src/data/navigation.json');

async function fixture(t) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'navigation-test-'));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  const snapshotPath = path.join(dir, 'navigation.json');
  const saved = `${JSON.stringify(snapshot)}\n`;
  await fs.writeFile(snapshotPath, saved);
  const warnings = [];
  return {
    snapshotPath,
    saved,
    warnings,
    logger: { log() {}, warn: (message) => warnings.push(message) },
  };
}

describe('syncNavigation', () => {
  it('saves valid API updates for the next build', async (t) => {
    const options = await fixture(t);
    const update = structuredClone(snapshot);
    update.items[0].label = 'Updated platform';
    await syncNavigation({
      ...options,
      fetchImpl: async (url, { signal }) => {
        assert.equal(url, 'https://temporal.io/api/navigation');
        assert(signal instanceof AbortSignal);
        return { ok: true, json: async () => update };
      },
    });
    assert.deepEqual(JSON.parse(await fs.readFile(options.snapshotPath, 'utf8')), update);
    assert.equal(options.warnings.length, 0);
  });

  for (const [reason, fetchImpl] of [
    ['network failure', async () => { throw new Error('offline'); }],
    ['timeout', async () => { throw new DOMException('Timed out', 'TimeoutError'); }],
    ['HTTP error', async () => ({ ok: false, status: 503 })],
    ['invalid JSON', async () => ({ ok: true, json: async () => { throw new SyntaxError('Invalid JSON'); } })],
    ['invalid schema', async () => ({ ok: true, json: async () => ({ items: [] }) })],
    ['unsafe URL', async () => {
      const data = structuredClone(snapshot);
      data.items[1].href = 'javascript:alert(1)';
      return { ok: true, json: async () => data };
    }],
  ]) {
    it(`warns and preserves the snapshot on ${reason}`, async (t) => {
      const options = await fixture(t);
      await syncNavigation({ ...options, fetchImpl });
      assert.equal(await fs.readFile(options.snapshotPath, 'utf8'), options.saved);
      assert.equal(options.warnings.length, 1);
      assert.match(options.warnings[0], /using saved snapshot/);
    });
  }

  it('fails when neither the API nor the saved snapshot is usable', async (t) => {
    const options = await fixture(t);
    await fs.writeFile(options.snapshotPath, '{}');
    await assert.rejects(syncNavigation({
      ...options,
      fetchImpl: async () => { throw new Error('offline'); },
    }));
    await fs.unlink(options.snapshotPath);
    await assert.rejects(syncNavigation({
      ...options,
      fetchImpl: async () => { throw new Error('offline'); },
    }), { code: 'ENOENT' });
  });
});

describe('createNavbar', () => {
  it('preserves section structure and group CTAs while adapting links', () => {
    const data = structuredClone(snapshot);
    data.items[0].ctas = [data.ctas[0]];
    const navbar = createNavbar(data);
    assert.equal(navbar.logo.srcDark, data.logo.dark);
    const platform = navbar.items[0];
    assert.equal(platform.type, 'custom-universalGroup');
    assert.equal(platform.sections.length, data.items[0].sections.length);
    assert.equal(platform.ctas[0].href, data.ctas[0].href);
    assert.equal(navbar.items[1].to, '/');
    assert.equal(navbar.items[1].activeBasePath, '/');
    assert.equal(navbar.items[3].sections[1].title, 'By Industry');
    assert.deepEqual(navbar.items.slice(data.items.length, data.items.length + 3).map((item) => item.label),
      ['Courses', 'SDKs', 'Durable AI']);
    assert.deepEqual(navbar.items.filter((item) => item.position === 'right').map((item) => item.label ?? item.type),
      ['Try Free', 'Log In', 'custom-askAI']);
  });
});
