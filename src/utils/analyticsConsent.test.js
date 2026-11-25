const { describe, it } = require('node:test');
const assert = require('node:assert');
const { analyticsConsentFrom } = require('./analyticsConsent');

const record = (decided, analytics) => JSON.stringify({ decided, necessary: true, analytics, advertising: analytics });
const cookie = (value) => `other=1; consent=${encodeURIComponent(value)}; theme=dark`;

describe('analyticsConsentFrom', () => {
  it('denies when neither store has a record', () => {
    assert.strictEqual(analyticsConsentFrom('', null), false);
  });

  it('grants from localStorage when there is no cookie (us_opt_out default)', () => {
    assert.strictEqual(analyticsConsentFrom('other=1', record(false, true)), true);
  });

  it('denies from localStorage when the stored default is denied (opt_in, undecided)', () => {
    assert.strictEqual(analyticsConsentFrom('', record(false, false)), false);
  });

  it('uses a decided cookie over localStorage', () => {
    assert.strictEqual(analyticsConsentFrom(cookie(record(true, false)), record(false, true)), false);
    assert.strictEqual(analyticsConsentFrom(cookie(record(true, true)), record(false, false)), true);
  });

  it('grants from a decided cookie when localStorage is empty (decision made on temporal.io)', () => {
    assert.strictEqual(analyticsConsentFrom(cookie(record(true, true)), null), true);
  });

  it('falls back to localStorage when the cookie is legacy or malformed', () => {
    assert.strictEqual(analyticsConsentFrom('consent=accepted', record(false, true)), true);
    assert.strictEqual(analyticsConsentFrom('consent=%7Bbad', null), false);
  });

  it('denies when localStorage holds malformed data', () => {
    assert.strictEqual(analyticsConsentFrom('', 'not json'), false);
  });
});

// static/scripts/googletag.js runs as an inline <head> script before any bundle,
// so it can't import analyticsConsentFrom and repeats the rule. Run it in a
// sandbox and check it sets the same analytics consent for GTM.
describe('static/scripts/googletag.js consent bootstrap', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const vm = require('node:vm');
  const source = fs.readFileSync(path.join(__dirname, '../../static/scripts/googletag.js'), 'utf8');

  // Returns the analytics_storage value GTM would start with, and the ad state.
  function runBootstrap(cookieString, storage) {
    const commands = [];
    const head = { insertBefore() {} };
    const window = { dataLayer: [] };
    window.gtag = function () {
      commands.push([...arguments]);
    };
    const document = {
      cookie: cookieString,
      getElementById: () => null,
      getElementsByTagName: () => [{ parentNode: head }],
      createElement: () => ({}),
    };
    const localStorage =
      storage === 'blocked'
        ? {
            getItem() {
              throw new Error('blocked');
            },
          }
        : { getItem: (key) => (key in storage ? storage[key] : null) };
    vm.runInNewContext(source, { window, document, localStorage });
    const update = commands.find(([cmd, action]) => cmd === 'consent' && action === 'update');
    return update ? { analytics: update[2].analytics_storage, ads: update[2].ad_storage } : null;
  }

  const cases = [
    ['no cookie, no localStorage', '', {}],
    ['no cookie, localStorage granted (us_opt_out)', 'other=1', { consent: record(false, true) }],
    ['no cookie, localStorage denied (opt_in undecided)', '', { consent: record(false, false) }],
    ['decided cookie denies over localStorage', cookie(record(true, false)), { consent: record(false, true) }],
    ['decided cookie grants, no localStorage', cookie(record(true, true)), {}],
    ['legacy cookie, localStorage granted', 'consent=accepted', { consent: record(false, true) }],
    ['malformed localStorage', '', { consent: 'not json' }],
  ];

  for (const [name, cookieString, storage] of cases) {
    it(`matches analyticsConsentFrom: ${name}`, () => {
      const expected = analyticsConsentFrom(cookieString, storage.consent ?? null);
      const result = runBootstrap(cookieString, storage);
      assert.strictEqual(result?.analytics === 'granted', expected);
    });
  }

  it('leaves GTM denied when there is no record', () => {
    assert.strictEqual(runBootstrap('', {}), null);
  });

  it('keeps advertising denied when Do Not Sell is set', () => {
    const result = runBootstrap('', { consent: record(false, true), 'do-not-sell': 'true' });
    assert.deepStrictEqual(result, { analytics: 'granted', ads: 'denied' });
  });

  it('uses a decided cookie when localStorage is blocked', () => {
    assert.strictEqual(runBootstrap(cookie(record(true, true)), 'blocked')?.analytics, 'granted');
    assert.strictEqual(runBootstrap('', 'blocked'), null);
  });
});
