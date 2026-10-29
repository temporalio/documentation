#!/usr/bin/env node

// Fails when a Snipsync SNIPSTART marker in docs/ is missing its SNIPEND, or
// closes with the other marker style.
//
// Snipsync accepts two marker styles: <!--SNIPSTART id--> ... <!--SNIPEND--> and
// {/* SNIPSTART id */} ... {/* SNIPEND */}. A snippet has to open and close in the
// same style. When it doesn't, Snipsync logs "mismatched end marker", skips the
// snippet, and still exits 0, so the snippet stops refreshing and drifts from its
// source without anything failing. This check runs the same rule without needing
// the sample repositories or the network.
//
// It also reports a SNIPSTART opened inside another snippet, a SNIPSTART left open
// at the end of the file, and a SNIPEND outside any snippet.
//
//   node bin/check-snipsync-markers.js          # report
//   node bin/check-snipsync-markers.js --json   # machine-readable
//
// In GitHub Actions it also prints an error annotation for each finding.
//
// Exit codes: 0 clean, 2 findings, 1 error.

const fs = require('fs');
const path = require('path');
const { walkDocFiles, DOCS_DIR } = require('./check-orphan-pages');

// Marker styles, as Snipsync's writeMarkerStyles defines them. `fixStart` and
// `fixEnd` are the markers the fix message suggests.
const STYLES = [
  {
    name: '<!--SNIPSTART-->',
    start: /<!--\s*SNIPSTART\s+(\S+?)(?:\s|-->|$)/,
    end: /<!--\s*SNIPEND/,
    fixStart: (id) => `<!--SNIPSTART ${id}-->`,
    fixEnd: '<!--SNIPEND-->',
  },
  {
    name: '{/* SNIPSTART */}',
    start: /\{\/\*\s*SNIPSTART\s+(\S+?)(?:\s|\*\/|$)/,
    end: /\{\/\*\s*SNIPEND/,
    fixStart: (id) => `{/* SNIPSTART ${id} */}`,
    fixEnd: '{/* SNIPEND */}',
  },
];

function startOf(line) {
  for (let style = 0; style < STYLES.length; style++) {
    const match = line.match(STYLES[style].start);
    if (match) return { style, id: match[1] };
  }
  return null;
}

function endOf(line) {
  for (let style = 0; style < STYLES.length; style++) {
    if (STYLES[style].end.test(line)) return style;
  }
  return -1;
}

// Findings for one file's text. Each is { line, message, fix }.
function checkText(text) {
  const findings = [];
  let open = null;

  text.split(/\r?\n/).forEach((line, index) => {
    const lineNumber = index + 1;
    const start = startOf(line);
    const end = endOf(line);

    if (start && open) {
      findings.push({
        line: open.line,
        message: `Snippet "${open.id}" has no SNIPEND before the next SNIPSTART (line ${lineNumber}).`,
        fix: `Add ${STYLES[open.style].fixEnd} after the snippet.`,
      });
      open = null;
    }

    if (start) {
      open = { ...start, line: lineNumber };
      return;
    }

    if (end === -1) return;

    if (!open) {
      findings.push({
        line: lineNumber,
        message: 'SNIPEND with no matching SNIPSTART.',
        fix: 'Remove the SNIPEND, or add the missing SNIPSTART.',
      });
    } else if (end !== open.style) {
      findings.push({
        line: lineNumber,
        message: `Snippet "${open.id}" opens with ${STYLES[open.style].name} (line ${open.line}) but closes with the ${STYLES[end].fixEnd} style.`,
        fix: `Close it with ${STYLES[open.style].fixEnd}, or change the start marker to ${STYLES[end].fixStart(open.id)}.`,
      });
      open = null;
    } else {
      open = null;
    }
  });

  if (open) {
    findings.push({
      line: open.line,
      message: `Snippet "${open.id}" has no SNIPEND.`,
      fix: `Add ${STYLES[open.style].fixEnd} after the snippet.`,
    });
  }

  return findings;
}

function findIssues() {
  const issues = [];
  let checked = 0;

  for (const file of walkDocFiles(DOCS_DIR)) {
    const text = fs.readFileSync(file, 'utf8');
    if (!/SNIPSTART|SNIPEND/.test(text)) continue;
    checked++;
    for (const finding of checkText(text)) {
      issues.push({ path: path.relative(process.cwd(), file), ...finding });
    }
  }

  return { issues, checked };
}

function report({ issues, checked }) {
  const lines = [`Checked ${checked} doc file(s) with Snipsync markers.`, ''];

  if (issues.length) {
    lines.push('Snipsync markers that Snipsync would skip:');
    for (const issue of issues) {
      lines.push(`  ${issue.path}:${issue.line}`);
      lines.push(`      ${issue.message}`);
      lines.push(`      ${issue.fix}`);
    }
    lines.push('');
    lines.push(
      'Snipsync logs a warning for each of these, skips the snippet, and exits 0, so the snippet stops ' +
        'refreshing from its source repository.'
    );
    lines.push('');
  }

  lines.push(issues.length === 0 ? 'No mismatched Snipsync markers found.' : `${issues.length} issue(s) found.`);
  return lines.join('\n');
}

function main() {
  const result = findIssues();

  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(report(result));
  }

  if (process.env.GITHUB_ACTIONS === 'true') {
    for (const issue of result.issues) {
      console.log(`::error file=${issue.path},line=${issue.line}::${issue.message} ${issue.fix}`);
    }
  }

  return result.issues.length;
}

module.exports = { checkText, findIssues };

if (require.main === module) {
  try {
    if (main() > 0) process.exit(2);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
