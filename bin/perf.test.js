const { describe, it } = require('node:test');
const assert = require('node:assert');

const {
  METRICS,
  aggregateRuns,
  beforeAfter,
  classify,
  compareRuns,
  fetchPsi,
  fmt,
  fmtDelta,
  median,
  parseArgs,
  parseCruxHistory,
  psiUrl,
  redact,
  renderCompare,
  renderField,
  slugify,
  summarizeLhr,
  summarizePsiField,
} = require('./perf');

const metric = (key) => METRICS.find((m) => m.key === key);

// A Lighthouse result with only the fields summarizeLhr reads.
function lhr(overrides = {}) {
  return {
    lighthouseVersion: '13.6.0',
    fetchTime: '2026-11-25T10:00:00.000Z',
    finalDisplayedUrl: 'https://docs.temporal.io/workflows',
    runWarnings: [],
    categories: {
      performance: { score: 0.53 },
      accessibility: { score: 0.97 },
      'best-practices': { score: 0.96 },
      seo: { score: 1 },
    },
    audits: {
      'first-contentful-paint': { numericValue: 3300 },
      'largest-contentful-paint': { numericValue: 3400 },
      'total-blocking-time': { numericValue: 1360 },
      'cumulative-layout-shift': { numericValue: 0 },
      'speed-index': { numericValue: 8000 },
      'mainthread-work-breakdown': { numericValue: 6300 },
      'total-byte-weight': { numericValue: 4_500_000 },
      'network-requests': {
        details: {
          items: [
            { resourceType: 'Document', transferSize: 50_000 },
            { resourceType: 'Script', transferSize: 400_000 },
            { resourceType: 'Script', transferSize: 29_000 },
          ],
        },
      },
      'third-parties-insight': {
        details: {
          items: [
            { entity: 'reddit', mainThreadTime: 1193, transferSize: 29_000 },
            { entity: { text: 'Facebook' }, mainThreadTime: 143, transferSize: 220_000 },
          ],
        },
      },
    },
    ...overrides,
  };
}

describe('summarizeLhr', () => {
  it('reads scores, metrics, bytes, and third parties', () => {
    const s = summarizeLhr(lhr());
    assert.strictEqual(s.score, 53);
    assert.strictEqual(s.a11y, 97);
    assert.strictEqual(s.lcp, 3400);
    assert.strictEqual(s.tbt, 1360);
    assert.strictEqual(s.scriptBytes, 429_000);
    assert.strictEqual(s.requests, 3);
    assert.strictEqual(s.thirdPartyMainThread, 1336);
    assert.strictEqual(s.thirdPartyBytes, 249_000);
    assert.deepStrictEqual(Object.keys(s.thirdParties), ['reddit', 'Facebook']);
  });

  it('flags a largest paint inside the consent banner', () => {
    const base = lhr();
    base.audits['lcp-breakdown-insight'] = {
      details: {
        items: [
          { type: 'table' },
          {
            type: 'node',
            nodeLabel: 'We use necessary cookies to make our site work.',
            selector: 'div.copy > p.body',
            path: '1,HTML,1,BODY,2,DIV,7,TEMPORAL-CONSENT-BANNER,a,#document-fragment,1,P',
          },
        ],
      },
    };
    const s = summarizeLhr(base);
    assert.strictEqual(s.lcpElement.inConsentBanner, true);
    assert.strictEqual(aggregateRuns([s, summarizeLhr(lhr())]).lcpInConsentBanner, 1);
    assert.strictEqual(summarizeLhr(lhr()).lcpElement, null);
  });

  it('returns null for missing audits instead of throwing', () => {
    const s = summarizeLhr({ lighthouseVersion: '13.6.0', audits: {}, categories: {} });
    assert.strictEqual(s.score, null);
    assert.strictEqual(s.lcp, null);
    assert.strictEqual(s.requests, 0);
  });
});

describe('summarizePsiField', () => {
  it('maps PageSpeed field keys and scales layout shift', () => {
    const f = summarizePsiField({
      origin_fallback: true,
      metrics: { INTERACTION_TO_NEXT_PAINT: { percentile: 345 }, CUMULATIVE_LAYOUT_SHIFT_SCORE: { percentile: 5 } },
    });
    assert.deepStrictEqual(f, { scope: 'origin', metrics: { inp: 345, cls: 0.05 } });
  });

  it('returns null without metrics', () => {
    assert.strictEqual(summarizePsiField(undefined), null);
  });
});

describe('median and aggregateRuns', () => {
  it('takes the middle value and ignores nulls', () => {
    assert.strictEqual(median([3, 1, 2]), 2);
    assert.strictEqual(median([4, 1, 3, 2]), 2.5);
    assert.strictEqual(median([null, 5]), 5);
    assert.strictEqual(median([]), null);
  });

  it('treats a vendor missing from one run as zero', () => {
    const a = summarizeLhr(lhr());
    const b = summarizeLhr(lhr());
    delete b.thirdParties.reddit;
    const c = summarizeLhr(lhr());
    const agg = aggregateRuns([a, b, c]);
    assert.strictEqual(agg.thirdParties.reddit.mainThread, 1193);
    assert.strictEqual(agg.samples.length, 3);
    assert.deepStrictEqual(agg.lighthouseVersions, ['13.6.0']);
  });
});

describe('classify', () => {
  it('ignores changes below the absolute threshold', () => {
    assert.strictEqual(classify(metric('tbt'), 1000, 1080), 'same');
  });

  it('ignores changes below the relative threshold', () => {
    assert.strictEqual(classify(metric('tbt'), 2000, 2150), 'same');
  });

  it('reports lower blocking time as better and higher score as better', () => {
    const five = (v) => [v - 2, v - 1, v, v + 1, v + 2];
    assert.strictEqual(classify(metric('tbt'), 1400, 300, five(1400), five(300)), 'better');
    assert.strictEqual(classify(metric('score'), 53, 70, five(53), five(70)), 'better');
    assert.strictEqual(classify(metric('score'), 70, 53, five(70), five(53)), 'worse');
  });

  it('calls it the same when the two sets of runs overlap', () => {
    assert.strictEqual(classify(metric('tbt'), 1000, 1400, [800, 1000, 1500], [1200, 1400, 1600]), 'same');
    assert.strictEqual(
      classify(metric('tbt'), 1000, 1400, [900, 950, 1000, 1050, 1100], [1300, 1350, 1400, 1450, 1500]),
      'worse'
    );
  });

  it('calls a timing change possible with fewer than 5 runs a side', () => {
    assert.strictEqual(classify(metric('tbt'), 1000, 1400, [900, 1000, 1100], [1300, 1400, 1500]), 'possibly worse');
  });

  it('needs no minimum run count for byte metrics', () => {
    assert.strictEqual(classify(metric('bytes'), 4_000_000, 3_000_000, [4_000_000], [3_000_000]), 'better');
  });

  it('reports missing values', () => {
    assert.strictEqual(classify(metric('lcp'), null, 1000), 'missing');
  });
});

describe('compareRuns and renderCompare', () => {
  const run = (label, tbt, reddit, version = '13.6.0') => ({
    label,
    createdAt: `2026-11-2${label === 'before' ? 5 : 6}T00:00:00.000Z`,
    base: 'https://docs.temporal.io',
    lighthouseVersions: [version],
    results: [
      {
        path: '/workflows',
        formFactor: 'mobile',
        median: { score: 50, tbt, lcp: 3000 },
        samples: [-100, -50, 0, 50, 100].map((d) => ({ tbt: tbt + d, lcp: 3000 })),
        thirdParties: reddit ? { reddit: { mainThread: reddit, bytes: 29_000 } } : {},
      },
    ],
  });

  it('flags real changes and vendor differences', () => {
    const cmp = compareRuns(run('before', 1400, 1200), run('after', 300, 0));
    assert.strictEqual(cmp.counts.better, 1);
    assert.strictEqual(cmp.counts.worse, 0);
    assert.strictEqual(cmp.versionMismatch, false);
    const md = renderCompare(cmp);
    assert.match(md, /Blocking time \| 1\.40 s \| 300 ms \| −1\.10 s \(−79%\) \| better/);
    assert.match(md, /\| reddit \| 1\.20 s \| 0 ms \|/);
    assert.match(md, /appeared on more or fewer pages \(mobile, out of 1\)/);
    assert.match(md, /\| reddit \| 1 \| 0 \|/);
  });

  it('averages vendors over the pages both runs tested', () => {
    const before = run('before', 1400, 1000);
    before.results.push({ ...before.results[0], path: '/evaluate', thirdParties: { reddit: { mainThread: 3000 } } });
    const cmp = compareRuns(before, run('after', 1400, 1000));
    assert.strictEqual(cmp.vendors.find((v) => v.name === 'reddit').before, 1000);
  });

  it('warns when Lighthouse versions differ', () => {
    const cmp = compareRuns(run('before', 1400, 0), run('after', 1400, 0, '13.7.0'));
    assert.strictEqual(cmp.versionMismatch, true);
    assert.match(renderCompare(cmp), /different Lighthouse versions/);
  });

  it('lists pages missing from the later run', () => {
    const after = run('after', 1400, 0);
    after.results = [];
    assert.deepStrictEqual(compareRuns(run('before', 1400, 0), after).missing, ['mobile /workflows']);
  });
});

describe('CrUX history', () => {
  const record = {
    collectionPeriods: [
      { firstDate: { year: 2026, month: 10, day: 1 }, lastDate: { year: 2026, month: 10, day: 28 } },
      { firstDate: { year: 2026, month: 10, day: 8 }, lastDate: { year: 2026, month: 11, day: 4 } },
      { firstDate: { year: 2026, month: 12, day: 3 }, lastDate: { year: 2026, month: 12, day: 30 } },
    ],
    metrics: {
      interaction_to_next_paint: { percentilesTimeseries: { p75s: [350, 340, 250] } },
      cumulative_layout_shift: { percentilesTimeseries: { p75s: ['0.01', 'NaN', '0.02'] } },
    },
  };

  it('parses periods and p75 values, including string layout shift', () => {
    const parsed = parseCruxHistory(record);
    assert.strictEqual(parsed.periods[0].lastDate, '2026-10-28');
    assert.deepStrictEqual(parsed.metrics.inp, [350, 340, 250]);
    assert.deepStrictEqual(parsed.metrics.cls, [0.01, null, 0.02]);
  });

  it('averages whole windows before and after a change', () => {
    const ba = beforeAfter(parseCruxHistory(record), '2026-12-01');
    assert.deepStrictEqual(ba.inp, { before: 345, after: 250, beforeWeeks: 2, afterWeeks: 1 });
  });

  it('renders a not-enough-traffic row', () => {
    const md = renderField({
      createdAt: '2026-11-25T00:00:00.000Z',
      entries: [
        { scope: 'origin', formFactor: 'mobile', ...parseCruxHistory(record) },
        { scope: 'url', path: '/evaluate', formFactor: 'mobile', periods: null, metrics: {} },
      ],
    });
    assert.match(md, /Whole site \| 2026-12-03 to 2026-12-30 \| – \| 250 ms \(needs improvement\)/);
    assert.match(md, /`\/evaluate` \| not enough traffic/);
    assert.match(md, /- INP: 12-30: 250 ms/);
  });

  it('falls back to the latest window that has data', () => {
    const sparse = parseCruxHistory(record);
    sparse.metrics = { inp: [300, null, null], cls: [null, null, null] };
    const md = renderField({
      createdAt: '2026-11-25T00:00:00.000Z',
      entries: [{ scope: 'url', path: '/workflows', formFactor: 'mobile', ...sparse }],
    });
    assert.match(md, /`\/workflows` \| 2026-10-01 to 2026-10-28 \(latest with data\) \| – \| 300 ms/);
  });
});

describe('fetchPsi', () => {
  it('retries and then returns the body', async () => {
    let calls = 0;
    const fetchImpl = async () => {
      calls++;
      return calls === 1
        ? { ok: false, status: 500, json: async () => ({ error: { message: 'Lighthouse returned error' } }) }
        : { ok: true, status: 200, json: async () => ({ lighthouseResult: { audits: {} } }) };
    };
    const body = await fetchPsi('https://docs.temporal.io/', 'mobile', 'SECRET', { fetchImpl, sleep: async () => {} });
    assert.ok(body.lighthouseResult);
    assert.strictEqual(calls, 2);
  });

  it('stops on a 400 and keeps the key out of the error', async () => {
    let calls = 0;
    const fetchImpl = async () => {
      calls++;
      return { ok: false, status: 400, json: async () => ({ error: { message: 'bad key SECRET' } }) };
    };
    await assert.rejects(
      fetchPsi('https://docs.temporal.io/', 'mobile', 'SECRET', { fetchImpl, sleep: async () => {} }),
      (err) => {
        assert.doesNotMatch(err.message, /SECRET/);
        return true;
      }
    );
    assert.strictEqual(calls, 1);
  });
});

describe('helpers', () => {
  it('parses run options', () => {
    const opts = parseArgs([
      'run',
      '--label',
      'Before GTM',
      '--runs',
      '5',
      '--form-factors',
      'mobile',
      '--base',
      'https://example.vercel.app/',
    ]);
    assert.strictEqual(opts.command, 'run');
    assert.strictEqual(opts.runs, 5);
    assert.deepStrictEqual(opts.formFactors, ['mobile']);
    assert.strictEqual(opts.base, 'https://example.vercel.app');
    assert.throws(() => parseArgs(['run', '--runs', '0']), /whole number/);
    assert.throws(() => parseArgs(['field', '--change', 'tomorrow']), /Expected a date/);
  });

  it('builds the PageSpeed URL with every category', () => {
    const url = new URL(psiUrl('https://docs.temporal.io/', 'desktop', 'K'));
    assert.deepStrictEqual(url.searchParams.getAll('category'), [
      'performance',
      'accessibility',
      'best-practices',
      'seo',
    ]);
    assert.strictEqual(url.searchParams.get('strategy'), 'desktop');
  });

  it('slugifies labels, formats values, and redacts keys', () => {
    assert.strictEqual(slugify('Before GTM change!'), 'before-gtm-change');
    assert.throws(() => slugify('!!!'), /letters or numbers/);
    assert.strictEqual(fmt(1360, 'ms'), '1.36 s');
    assert.strictEqual(fmt(4_500_000, 'bytes'), '4.29 MB');
    assert.strictEqual(fmtDelta(100, 150, 'ms'), '+50 ms (+50%)');
    assert.strictEqual(redact('key=abc&x=abc', 'abc'), 'key=***&x=***');
  });
});
