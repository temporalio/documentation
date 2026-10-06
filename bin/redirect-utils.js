// Matching helpers for the `redirects` array in vercel.json.
//
// Vercel compiles each `source` with path-to-regexp 6.1.0 and applies the
// first rule that matches. This module uses that same library (installed as
// `vercel-path-to-regexp` so it can't be swapped for the other versions of
// path-to-regexp that other packages in node_modules depend on), so a rule
// matches here exactly when it matches in production.
//
// Used by bin/validate-redirects.js, bin/check-redirects-for-moved-pages.js,
// and api/markdown-not-found.js (at request time, so it ships with that function).

const { parse, pathToRegexp } = require('vercel-path-to-regexp');

// The pattern path-to-regexp assigns to a parameter with no custom regex, e.g.
// `:path`. Parameters with any other pattern can't be sampled automatically.
const DEFAULT_PARAM_PATTERN = '[^\\/#\\?]+?';

// A named parameter in a destination: `:path`, `:path*`, `:path+`, `:path?`.
// A port number (`:443`) or a scheme (`https:`) doesn't match, because a
// parameter name can't start with a digit and `//` isn't a name character.
const DESTINATION_PARAM = /:([A-Za-z_][A-Za-z0-9_]*)([*+?]?)/g;

const MAX_HOPS = 10;

function isExternal(destination) {
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(destination);
}

function compileRule(rule, index) {
  const compiled = {
    index,
    source: rule.source,
    destination: rule.destination,
    // Vercel treats a rule without `permanent` as permanent (308).
    permanent: rule.permanent !== false,
    // Rules with `has`/`missing` depend on request headers, cookies, or query
    // strings. They can't be evaluated from a path alone, so matching skips them.
    conditional: Boolean(rule.has || rule.missing),
    tokens: [],
    keys: [],
    regex: null,
    error: null,
  };

  if (typeof rule.source !== 'string' || typeof rule.destination !== 'string') {
    compiled.error = 'source and destination must both be strings';
    return compiled;
  }

  try {
    compiled.tokens = parse(rule.source);
    compiled.regex = pathToRegexp(rule.source, compiled.keys);
  } catch (error) {
    compiled.error = error.message;
  }
  return compiled;
}

function compileRedirects(rules) {
  return rules.map((rule, index) => compileRule(rule, index));
}

// Strip the query string and fragment, and remove a trailing slash. With
// `trailingSlash: false` Vercel 308-redirects /x/ to /x before it evaluates
// any rule, so rules only ever see the path without a trailing slash.
function normalizePath(urlPath, { trailingSlash = false } = {}) {
  let p = urlPath.replace(/[?#].*$/, '');
  if (!p.startsWith('/')) p = `/${p}`;
  if (!trailingSlash && p.length > 1) p = p.replace(/\/+$/, '') || '/';
  return p;
}

function matchRule(rule, urlPath) {
  if (!rule.regex) return null;
  const m = rule.regex.exec(urlPath);
  if (!m) return null;
  const params = {};
  rule.keys.forEach((key, i) => {
    params[key.name] = m[i + 1];
  });
  return params;
}

function destinationParams(destination) {
  return [...destination.matchAll(DESTINATION_PARAM)].map((m) => m[1]);
}

function substitute(destination, params) {
  return destination.replace(DESTINATION_PARAM, (_, name) => params[name] ?? '');
}

// First rule that matches `urlPath`, or null. `urlPath` must already be
// normalized.
function findRedirect(urlPath, compiled) {
  for (const rule of compiled) {
    if (rule.conditional) continue;
    const params = matchRule(rule, urlPath);
    if (params) return { rule, params };
  }
  return null;
}

// Follow redirects from `start` until a path no rule matches (a served path or
// a 404), an external URL, a loop, or MAX_HOPS.
function followRedirects(start, compiled, options = {}) {
  const normalize = (p) => normalizePath(p, options);
  const chain = [];
  const seen = new Set();
  let current = normalize(start);

  for (let hop = 0; hop < MAX_HOPS; hop++) {
    seen.add(current);
    const hit = findRedirect(current, compiled);
    if (!hit) return { chain, final: current, loop: false, tooLong: false, external: false };

    const destination = substitute(hit.rule.destination, hit.params);
    chain.push({ from: current, rule: hit.rule, to: destination });

    if (isExternal(destination)) {
      return { chain, final: destination, loop: false, tooLong: false, external: true };
    }

    current = normalize(destination);
    if (seen.has(current)) return { chain, final: current, loop: true, tooLong: false, external: false };
  }
  return { chain, final: current, loop: false, tooLong: true, external: false };
}

// Where a request for the Markdown alternate of a redirected page should go.
// Rules match page paths, so the rule for `/old` doesn't match `/old.md`.
// This follows the rules for `/old` and returns `{ status, location }` for the
// destination's `.md`, or null when `urlPath` isn't a `.md` path, the page
// isn't redirected, or the destination has no Markdown alternate (it's off the
// site, it's a file such as /sitemap.xml, or it's a tag page, which Docusaurus
// generates and the markdown-pages plugin doesn't write a .md for).
function markdownRedirect(urlPath, compiled) {
  const p = normalizePath(urlPath);
  if (!p.endsWith('.md')) return null;

  const result = followRedirects(p.slice(0, -'.md'.length) || '/', compiled);
  if (result.chain.length === 0 || result.external || result.loop || result.tooLong) return null;
  if (/\.[^/]*$/.test(result.final) || /^\/tags(\/|$)/.test(result.final)) return null;

  // The home page's Markdown is /index.md, not /.md.
  const page = result.final === '/' ? '/index' : result.final;
  const permanent = result.chain.every((hop) => hop.rule.permanent);
  return { status: permanent ? 308 : 307, location: `${page}.md` };
}

// Two representative request paths that match `rule`: the shortest (optional
// and zero-or-more parameters omitted) and a longer one (repeating parameters
// given two segments). Returns null when the rule has a parameter with a
// custom regex, since a matching path can't be generated for it.
function sampleSource(rule) {
  if (rule.error) return null;
  let min = '';
  let max = '';
  for (const token of rule.tokens) {
    if (typeof token === 'string') {
      min += token;
      max += token;
      continue;
    }
    if (token.pattern !== DEFAULT_PARAM_PATTERN) return null;
    const { prefix, suffix, modifier } = token;
    if (modifier === '' || modifier === '+') min += `${prefix}x${suffix}`;
    const repeats = modifier === '*' || modifier === '+';
    max += `${prefix}${repeats ? 'x/y' : 'x'}${suffix}`;
  }
  return { min: normalizePath(min || '/'), max: normalizePath(max || '/') };
}

// The part of a destination before its first parameter, without a trailing
// slash, or the whole destination (no query or fragment) when it has none.
// This is the path whose existence a parameterized destination depends on.
function destinationBase(destination) {
  const first = destination.search(new RegExp(DESTINATION_PARAM.source));
  if (first === -1) return { base: destination.replace(/[?#].*$/, ''), parameterized: false };
  return { base: destination.slice(0, first).replace(/\/+$/, ''), parameterized: true };
}

module.exports = {
  DEFAULT_PARAM_PATTERN,
  DESTINATION_PARAM,
  MAX_HOPS,
  isExternal,
  compileRule,
  compileRedirects,
  normalizePath,
  matchRule,
  destinationParams,
  substitute,
  findRedirect,
  followRedirects,
  markdownRedirect,
  sampleSource,
  destinationBase,
};
