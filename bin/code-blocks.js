// Finds the fenced code blocks on a docs page and records which ones Snipsync
// manages. Shared by bin/report-snipsync-coverage.js and the checkers that
// compile hand-written samples.

// Snipsync wraps synced code in either an HTML comment or an MDX comment.
const SNIPSTART = /^\s*(?:<!--|\{\/\*)\s*SNIPSTART\b/;
const SNIPEND = /^\s*(?:<!--|\{\/\*)\s*SNIPEND\b/;

const FENCE_OPEN = /^(\s*)(`{3,}|~{3,})\s*([^\s`{]*)/;
const FENCE_CLOSE = /^\s*(`{3,}|~{3,})\s*$/;

// The line Snipsync writes above a synced block when source links are on:
// [path/to/file.go](https://github.com/owner/repo/blob/ref/path/to/file.go)
const SOURCE_LINK = /^\s*\[[^\]]*\]\(https:\/\/github\.com\/([^/\s)]+)\/([^/\s)]+)\/blob\//;

// The closing token of a comment that opens on this line and doesn't close,
// or null. Fenced code inside an unclosed comment is never rendered.
function openComment(line) {
  const rest = line.replace(/<!--.*?-->/g, '').replace(/\{\/\*.*?\*\/\}/g, '');
  if (rest.includes('<!--')) return '-->';
  if (rest.includes('{/*')) return '*/}';
  return null;
}

function dedent(line, indent) {
  let i = 0;
  while (i < indent && (line[i] === ' ' || line[i] === '\t')) i++;
  return line.slice(i);
}

// Every fenced code block on a page, with the 1-based line of its first line
// of code and whether Snipsync manages it. Code inside a list item or a JSX
// component is indented to match its fence; that indentation is removed.
//
// A synced block also carries `origin`, the `owner/repo` from the source link
// Snipsync wrote above it, or null when the wrapper turns source links off.
function extractCodeBlocks(source) {
  const lines = source.split('\n');
  const blocks = [];
  let fence = null;
  let snipsync = false;
  let origin = null;
  let comment = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (fence) {
      const close = line.match(FENCE_CLOSE);
      if (close && close[1][0] === fence.marker[0] && close[1].length >= fence.marker.length) {
        blocks.push({
          lang: fence.lang,
          line: fence.line,
          code: fence.body.join('\n'),
          snipsync: fence.snipsync,
          origin: fence.origin,
        });
        fence = null;
      } else {
        fence.body.push(dedent(line, fence.indent));
      }
      continue;
    }

    if (comment) {
      if (line.includes(comment)) comment = null;
      continue;
    }

    if (SNIPSTART.test(line)) {
      snipsync = true;
      origin = null;
      continue;
    }
    if (SNIPEND.test(line)) {
      snipsync = false;
      origin = null;
      continue;
    }

    if (snipsync) {
      const link = line.match(SOURCE_LINK);
      if (link) {
        origin = `${link[1]}/${link[2]}`;
        continue;
      }
    }

    const open = line.match(FENCE_OPEN);
    if (open) {
      fence = {
        marker: open[2],
        indent: open[1].length,
        lang: open[3].toLowerCase(),
        line: i + 2,
        body: [],
        snipsync,
        origin: snipsync ? origin : null,
      };
      continue;
    }

    comment = openComment(line);
  }

  return blocks;
}

module.exports = { SNIPSTART, SNIPEND, extractCodeBlocks };
