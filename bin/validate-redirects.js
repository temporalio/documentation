#!/usr/bin/env node

// Checks the `redirects` in vercel.json for rules that can't work as written.
// Each check corresponds to a mistake that has shipped and 404'd in
// production:
//
//   invalid-pattern         the source doesn't compile with Vercel's path-to-regexp
//   source-no-leading-slash source doesn't start with `/`, so it never matches
//   source-trailing-slash   source ends in `/`; Vercel strips the slash from the
//                           request before matching (trailingSlash: false), so it never matches
//   source-fragment         source contains `#`; browsers never send the fragment
//   glued-param             `/foo:path*` instead of `/foo/:path*`; the parameter
//                           matches only text glued onto `foo`, never `/foo/bar`
//   relative-destination    destination doesn't start with `/` or a scheme, so it
//                           resolves against the requested URL
//   undefined-param         destination uses `:name` that the source doesn't define
//   duplicate-source        the same source appears twice; the later rule never runs
//   shadowed                every path the rule matches is claimed by an earlier rule
//   redirect-loop           following the rule reaches a path already visited, or
//                           takes more than 10 hops
//   hides-live-page         the source is a page the site serves, so the page is
//                           unreachable
//   broken-destination      the destination (after following further redirects)
//                           isn't a page the site serves
//
// Known, accepted findings are recorded with a note in
// bin/redirect-baseline.json. Anything else fails the check.
//
//   node bin/validate-redirects.js                    # report
//   node bin/validate-redirects.js --json             # machine-readable
//   node bin/validate-redirects.js --update-baseline  # accept current findings
//
// Exit codes: 0 clean, 2 findings (or stale baseline entries) found.

const fs = require('fs');
const path = require('path');
const {
  compileRedirects,
  destinationParams,
  destinationBase,
  followRedirects,
  findRedirect,
  isExternal,
  normalizePath,
  sampleSource,
} = require('./redirect-utils');
const { buildRouteIndex } = require('./redirect-routes');

const VERCEL_JSON = path.join(process.cwd(), 'vercel.json');
const BASELINE = path.join('bin', 'redirect-baseline.json');

const DEFAULT_COMMENT =
  'Redirect rules in vercel.json that bin/validate-redirects.js flags, and that we have decided to ' +
  'leave as they are. Each entry is a check name plus a rule source. An empty note means the entry has ' +
  'not been reviewed yet; either fix the rule or fill in the note explaining why it stays. Regenerate ' +
  'with: node bin/validate-redirects.js --update-baseline';

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

// Checks that need only the rule's own text.
function checkRuleText(rule, add) {
  if (rule.error) {
    add('invalid-pattern', rule, rule.error);
    return;
  }

  const { source, destination } = rule;

  if (!source.startsWith('/')) {
    add('source-no-leading-slash', rule, 'Source must start with `/`. Vercel never matches it.');
  }
  if (source.length > 1 && source.endsWith('/')) {
    add('source-trailing-slash', rule, 'Source ends with `/`. Requests are redirected to the no-slash URL first, so it never matches.');
  }
  if (source.includes('#')) {
    add('source-fragment', rule, 'Source contains `#`. Browsers never send the fragment, so it never matches.');
  }

  // A parameter with no `/` before it, directly after literal text.
  rule.tokens.forEach((token, i) => {
    const previous = rule.tokens[i - 1];
    if (typeof token === 'object' && token.prefix === '' && typeof previous === 'string' && !previous.endsWith('/')) {
      add(
        'glued-param',
        rule,
        `\`:${token.name}\` is attached to \`${previous.split('/').pop()}\` with no \`/\` between them. ` +
          `It matches only text appended to that segment, not a sub-path. Use \`${previous}/:${token.name}${token.modifier}\`.`
      );
    }
  });

  if (!destination.startsWith('/') && !isExternal(destination)) {
    add('relative-destination', rule, `Destination \`${destination}\` has no leading \`/\`, so it resolves relative to the requested URL.`);
  }

  const defined = new Set(rule.keys.map((key) => key.name));
  for (const name of new Set(destinationParams(destination))) {
    if (!defined.has(name)) {
      add('undefined-param', rule, `Destination uses \`:${name}\`, which the source doesn't define.`);
    }
  }
}

// Checks that depend on the other rules.
function checkRuleOrder(compiled, add) {
  const firstBySource = new Map();
  for (const rule of compiled) {
    if (rule.error) continue;
    if (firstBySource.has(rule.source)) {
      const first = firstBySource.get(rule.source);
      add('duplicate-source', rule, `Same source as rule ${first.index + 1}. The later rule never runs.`);
      continue;
    }
    firstBySource.set(rule.source, rule);

    if (rule.conditional) continue;
    const samples = sampleSource(rule);
    if (!samples) continue;

    // Fully shadowed: every sample path is claimed by a rule that comes first.
    const hits = [samples.min, samples.max].map((sample) => findRedirect(sample, compiled));
    if (hits.every((hit) => hit && hit.rule.index < rule.index)) {
      const winner = hits[0].rule;
      add('shadowed', rule, `Every path it matches is already redirected by an earlier rule: \`${winner.source}\` (rule ${winner.index + 1}).`);
    }
  }
}

function checkRuleBehavior(compiled, routes, add) {
  for (const rule of compiled) {
    if (rule.error || rule.conditional) continue;

    // A source that is itself a page the site serves hides that page.
    const samples = sampleSource(rule);
    if (samples) {
      const live = [...new Set([samples.min, samples.max])].find((sample) => {
        const hit = findRedirect(sample, compiled);
        return hit && hit.rule === rule && routes.has(sample);
      });
      if (live) add('hides-live-page', rule, `\`${live}\` is a page the site serves, but this redirect catches it first.`);
    }

    // Loops: follow from each sample path.
    let looped = false;
    for (const sample of samples ? [samples.min, samples.max] : []) {
      const result = followRedirects(sample, compiled);
      if (result.loop || result.tooLong) {
        if (!looped) {
          const trail = [...result.chain.map((hop) => hop.from), result.final].join(' -> ');
          add('redirect-loop', rule, `${result.loop ? 'Loops' : 'Takes more than 10 hops'}: ${trail}`);
        }
        looped = true;
      }
    }
    if (looped) continue;

    // Destination: follow to the end and check the final path exists.
    if (isExternal(rule.destination)) continue;
    const { base, parameterized } = destinationBase(rule.destination);
    if (parameterized && base === '') continue; // destination starts with a parameter; nothing fixed to check
    const result = followRedirects(base === '' ? '/' : base, compiled);
    if (result.loop || result.tooLong || result.external) continue;
    if (!routes.maybe(result.final)) {
      const via = result.chain.length ? ` (after redirecting through ${result.chain.map((hop) => `\`${hop.rule.source}\``).join(', ')})` : '';
      add('broken-destination', rule, `Destination \`${normalizePath(base || '/')}\`${via} ends at \`${result.final}\`, which the site doesn't serve.`);
    }
  }
}

function validateRedirects(rules, routes) {
  const compiled = compileRedirects(rules);
  const findings = [];
  const add = (check, rule, message) =>
    findings.push({ check, source: rule.source, destination: rule.destination, rule: rule.index + 1, message });

  for (const rule of compiled) checkRuleText(rule, add);
  checkRuleOrder(compiled, add);
  checkRuleBehavior(compiled, routes, add);

  findings.sort((a, b) => a.rule - b.rule || a.check.localeCompare(b.check));
  return findings;
}

// ---------------------------------------------------------------------------
// Baseline
// ---------------------------------------------------------------------------

const keyOf = (finding) => `${finding.check} ${finding.source}`;

function loadBaseline() {
  if (!fs.existsSync(BASELINE)) return { comment: DEFAULT_COMMENT, exceptions: [] };
  return JSON.parse(fs.readFileSync(BASELINE, 'utf8'));
}

// Baseline entries that no longer match a finding are reported so the
// baseline doesn't accumulate stale exceptions.
function applyBaseline(findings, baseline) {
  const known = new Set(baseline.exceptions.map((e) => `${e.check} ${e.source}`));
  const remaining = findings.filter((f) => !known.has(keyOf(f)));
  const current = new Set(findings.map(keyOf));
  const stale = baseline.exceptions.filter((e) => !current.has(`${e.check} ${e.source}`));
  return { remaining, stale };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function report({ remaining, stale, ruleCount, cookbookPresent }) {
  const lines = [`Checked ${ruleCount} redirect rule(s) in vercel.json.`];
  if (!cookbookPresent) {
    lines.push('ai-cookbook/ is not present; /ai/cookbook/* destinations are not verified.');
  }
  lines.push('');

  if (remaining.length) {
    lines.push('Redirect rules that will not work as written:');
    for (const f of remaining) {
      lines.push(`  [${f.check}] rule ${f.rule}: ${f.source} -> ${f.destination}`);
      lines.push(`      ${f.message}`);
    }
    lines.push('');
    lines.push(`Fix each rule in vercel.json, or add it to ${BASELINE} with a note if it's a known, accepted exception.`);
    lines.push('');
  }

  if (stale.length) {
    lines.push(`Baseline entries that no longer match a finding (remove from ${BASELINE}):`);
    for (const e of stale) lines.push(`  [${e.check}] ${e.source}`);
    lines.push('');
  }

  const total = remaining.length + stale.length;
  lines.push(total === 0 ? 'No invalid redirects found.' : `${total} issue(s) found.`);
  return lines.join('\n');
}

function main() {
  const args = process.argv.slice(2);
  const config = JSON.parse(fs.readFileSync(VERCEL_JSON, 'utf8'));
  const rules = config.redirects || [];

  if (config.trailingSlash !== false) {
    throw new Error(
      'vercel.json no longer sets "trailingSlash": false. The source-trailing-slash check assumes it does; update bin/validate-redirects.js before changing it.'
    );
  }

  const routes = buildRouteIndex();
  const findings = validateRedirects(rules, routes);
  const baseline = loadBaseline();

  if (args.includes('--update-baseline')) {
    const notes = new Map(baseline.exceptions.map((e) => [`${e.check} ${e.source}`, e.note]));
    const updated = {
      comment: baseline.comment || DEFAULT_COMMENT,
      exceptions: findings.map((f) => ({ check: f.check, source: f.source, note: notes.get(keyOf(f)) ?? '' })),
    };
    fs.writeFileSync(BASELINE, `${JSON.stringify(updated, null, 2)}\n`);
    console.log(`Wrote ${BASELINE} with ${updated.exceptions.length} entries. Add a note for any entry that has none.`);
    return 0;
  }

  const { remaining, stale } = applyBaseline(findings, baseline);
  if (args.includes('--json')) {
    console.log(JSON.stringify({ rules: rules.length, remaining, stale }, null, 2));
  } else {
    console.log(report({ remaining, stale, ruleCount: rules.length, cookbookPresent: routes.cookbookPresent }));
  }
  return remaining.length + stale.length;
}

module.exports = { validateRedirects, applyBaseline, checkRuleText, BASELINE };

if (require.main === module) {
  try {
    const issues = main();
    if (issues > 0) process.exit(2);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
