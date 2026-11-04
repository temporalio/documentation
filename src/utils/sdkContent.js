// Resolution rules for SDK-conditional content: <SdkOnly>, <SdkTerm>, and the
// "current SDK" a page or partial renders for. Used by the React components
// (src/components/elements/Sdk/SdkContent.js) and by the LLM Markdown pipeline
// (scripts/mdx-to-md.mjs), so the rendered page and its .md output can't
// disagree about which text an SDK gets.
//
// Pure and dependency-free so the same code runs in the browser bundle and in
// Node. Invalid input throws: the React side surfaces that as a build error,
// and the pipeline turns it into a warning.

const { SDK_DATA, SDK_TERMS } = require('../constants/sdkData');

const SDK_IDS = SDK_DATA.map(({ id }) => id);

// The SDK a doc belongs to, from its source path: `docs/develop/<id>/...`,
// with or without an `@site/` prefix. Null for any other page, including
// cross-language pages directly under docs/develop/.
function sdkFromSourcePath(sourcePath) {
  if (typeof sourcePath !== 'string') return null;
  const m = sourcePath.replace(/\\/g, '/').match(/(?:^|\/)docs\/develop\/([^/]+)\//);
  return m && SDK_IDS.includes(m[1]) ? m[1] : null;
}

// "go java" or "go, java" → ['go', 'java'], rejecting unknown ids.
function parseSdkList(value) {
  const ids = String(value || '')
    .split(/[\s,]+/)
    .filter(Boolean);
  if (ids.length === 0) throw new Error('expected at least one SDK id');
  const unknown = ids.filter((id) => !SDK_IDS.includes(id));
  if (unknown.length > 0) {
    throw new Error(`unknown SDK id ${unknown.map((u) => `"${u}"`).join(', ')} (expected one of: ${SDK_IDS.join(', ')})`);
  }
  return ids;
}

// Whether <SdkOnly sdks="..."> or <SdkOnly not="..."> shows its content for `sdk`.
function sdkOnlyIncludes({ sdks, not }, sdk) {
  const hasSdks = sdks !== undefined && sdks !== null;
  const hasNot = not !== undefined && not !== null;
  if (hasSdks === hasNot) throw new Error('<SdkOnly> needs exactly one of `sdks` or `not`');
  if (!sdk) throw new Error('<SdkOnly> is used outside an SDK page or <SdkScope>');
  return hasSdks ? parseSdkList(sdks).includes(sdk) : !parseSdkList(not).includes(sdk);
}

// { text, code } for <SdkTerm name="..."> on `sdk`'s page.
function resolveSdkTerm(name, sdk) {
  if (!sdk) throw new Error(`<SdkTerm name="${name}"> is used outside an SDK page or <SdkScope>`);
  const entry = SDK_DATA.find(({ id }) => id === sdk);
  if (!entry) throw new Error(`unknown SDK id "${sdk}"`);
  if (name === 'label') return { text: entry.label, code: false };
  if (name === 'sdkName') return { text: `${entry.label} SDK`, code: false };
  const term = SDK_TERMS[name];
  if (!term) {
    const known = ['label', 'sdkName', ...Object.keys(SDK_TERMS)];
    throw new Error(`unknown SDK term "${name}" (expected one of: ${known.join(', ')})`);
  }
  return { text: term.values[sdk], code: Boolean(term.code) };
}

module.exports = { SDK_IDS, sdkFromSourcePath, parseSdkList, sdkOnlyIncludes, resolveSdkTerm };
