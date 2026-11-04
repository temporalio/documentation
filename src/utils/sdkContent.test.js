const { describe, it } = require('node:test');
const assert = require('node:assert');
const { SDK_DATA, SDK_TERMS } = require('../constants/sdkData');
const { SDK_IDS, sdkFromSourcePath, parseSdkList, sdkOnlyIncludes, resolveSdkTerm } = require('./sdkContent');

describe('SDK_TERMS', () => {
  it('gives every term a non-empty value for every SDK', () => {
    for (const [name, term] of Object.entries(SDK_TERMS)) {
      assert.deepStrictEqual(Object.keys(term.values).sort(), [...SDK_IDS].sort(), `term "${name}" SDK keys`);
      for (const [sdk, value] of Object.entries(term.values)) {
        assert.ok(typeof value === 'string' && value.length > 0, `term "${name}" is empty for ${sdk}`);
      }
    }
  });
});

describe('SDK_DATA', () => {
  it('has unique ids, tab keys, and tab slots', () => {
    for (const field of ['id', 'tabKey', 'tabSlot']) {
      const values = SDK_DATA.map((s) => s[field]);
      assert.strictEqual(new Set(values).size, values.length, `duplicate ${field}`);
    }
  });
});

describe('sdkFromSourcePath', () => {
  it('reads the SDK from a docs/develop/<id>/ path', () => {
    assert.strictEqual(sdkFromSourcePath('docs/develop/go/workflows/timers.mdx'), 'go');
    assert.strictEqual(sdkFromSourcePath('@site/docs/develop/python/index.mdx'), 'python');
    assert.strictEqual(sdkFromSourcePath('/abs/repo/docs/develop/dotnet/a/b.mdx#tab'), 'dotnet');
  });

  it('returns null for cross-language and non-develop pages', () => {
    assert.strictEqual(sdkFromSourcePath('docs/develop/plugins-guide.mdx'), null);
    assert.strictEqual(sdkFromSourcePath('docs/develop/worker-performance/configuration.mdx'), null);
    assert.strictEqual(sdkFromSourcePath('docs/develop/_shared/topic/when.mdx'), null);
    assert.strictEqual(sdkFromSourcePath('docs/encyclopedia/workflow-definition.mdx'), null);
    assert.strictEqual(sdkFromSourcePath(undefined), null);
  });
});

describe('parseSdkList', () => {
  it('accepts space- or comma-separated ids', () => {
    assert.deepStrictEqual(parseSdkList('go java'), ['go', 'java']);
    assert.deepStrictEqual(parseSdkList('go, java,python'), ['go', 'java', 'python']);
  });

  it('rejects unknown ids and empty lists', () => {
    assert.throws(() => parseSdkList('go py'), /unknown SDK id "py"/);
    assert.throws(() => parseSdkList(''), /at least one SDK id/);
  });
});

describe('sdkOnlyIncludes', () => {
  it('matches `sdks` and `not`', () => {
    assert.strictEqual(sdkOnlyIncludes({ sdks: 'go java' }, 'java'), true);
    assert.strictEqual(sdkOnlyIncludes({ sdks: 'go java' }, 'python'), false);
    assert.strictEqual(sdkOnlyIncludes({ not: 'python' }, 'go'), true);
    assert.strictEqual(sdkOnlyIncludes({ not: 'python' }, 'python'), false);
  });

  it('requires exactly one of `sdks` or `not`', () => {
    assert.throws(() => sdkOnlyIncludes({}, 'go'), /exactly one/);
    assert.throws(() => sdkOnlyIncludes({ sdks: 'go', not: 'java' }, 'go'), /exactly one/);
  });

  it('fails outside an SDK context', () => {
    assert.throws(() => sdkOnlyIncludes({ sdks: 'go' }, null), /outside an SDK page/);
  });
});

describe('resolveSdkTerm', () => {
  it('resolves dictionary terms per SDK', () => {
    assert.deepStrictEqual(resolveSdkTerm('null', 'go'), { text: 'nil', code: true });
    assert.deepStrictEqual(resolveSdkTerm('null', 'python'), { text: 'None', code: true });
  });

  it('resolves the derived label and sdkName terms', () => {
    assert.deepStrictEqual(resolveSdkTerm('label', 'dotnet'), { text: '.NET', code: false });
    assert.deepStrictEqual(resolveSdkTerm('sdkName', 'dotnet'), { text: '.NET SDK', code: false });
  });

  it('fails on unknown terms and outside an SDK context', () => {
    assert.throws(() => resolveSdkTerm('nope', 'go'), /unknown SDK term "nope"/);
    assert.throws(() => resolveSdkTerm('null', null), /outside an SDK page/);
  });
});
