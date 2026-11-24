// Finds the code blocks on a docs page and records which ones Snipsync
// manages. Used by bin/report-snipsync-coverage.js.

// Snipsync wraps synced code in either an HTML comment or an MDX comment.
const SNIPSTART = /^\s*(?:<!--|\{\/\*)\s*SNIPSTART\b/;
const SNIPEND = /^\s*(?:<!--|\{\/\*)\s*SNIPEND\b/;

const FENCE_OPEN = /^(\s*)(`{3,}|~{3,})\s*([^\s`{]*)/;
const FENCE_CLOSE = /^\s*(`{3,}|~{3,})\s*$/;

// A <CodeSnippet> element (src/components/Quickstart/SetupSteps) whose
// children are written into the page rather than a fenced block from Snipsync:
//   <CodeSnippet language="go">{`package main`}</CodeSnippet>
const CODE_SNIPPET_OPEN = /<CodeSnippet\b([^>]*?)(\/?)>/;
const CODE_SNIPPET_CLOSE = '</CodeSnippet>';
const LANGUAGE_ATTRIBUTE = /\blanguage=["']([^"']*)["']/;

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

// The code a <CodeSnippet> renders from its children: a template literal
// ({`...`}) or plain text, with the indentation the lines share removed. When
// the code starts on the same line as `{\``, that line's indentation belongs to
// the JSX around it, so only the lines after it are compared.
function codeSnippetCode(children) {
  let code = children.trim();
  const literal = code.match(/^\{\s*`([\s\S]*)`\s*\}$/);
  if (literal) code = literal[1].replace(/\\([`$\\])/g, '$1');
  const ownLine = /^[ \t]*\n/.test(code);
  const lines = code
    .replace(/^\s*\n/, '')
    .replace(/\n\s*$/, '')
    .split('\n');
  const rest = ownLine ? lines : lines.slice(1);
  const indents = rest.filter((line) => line.trim()).map((line) => line.match(/^[ \t]*/)[0].length);
  const indent = indents.length ? Math.min(...indents) : 0;
  return lines.map((line, i) => (ownLine || i > 0 ? line.slice(indent) : line.trimStart())).join('\n');
}

// A <CodeSnippet> that opens on line `start`, or null when there isn't one or
// its children hold a fenced block (which the fence parser reads instead).
function readCodeSnippet(lines, start) {
  const open = lines[start].match(CODE_SNIPPET_OPEN);
  if (!open || open[2]) return null;
  const first = lines[start].slice(open.index + open[0].length);
  const children = [];
  for (let i = start; i < lines.length; i++) {
    const text = i === start ? first : lines[i];
    const close = text.indexOf(CODE_SNIPPET_CLOSE);
    children.push(close === -1 ? text : text.slice(0, close));
    if (close !== -1) {
      if (children.some((line) => FENCE_OPEN.test(line))) return null;
      const language = open[1].match(LANGUAGE_ATTRIBUTE);
      const leading = children.findIndex((line) => line.replace(/^\s*\{\s*`/, '').trim() !== '');
      return {
        end: i,
        block: {
          lang: language ? language[1].toLowerCase() : '',
          line: start + 1 + Math.max(leading, 0),
          code: codeSnippetCode(children.join('\n')),
          snipsync: false,
          origin: null,
          component: 'CodeSnippet',
        },
      };
    }
  }
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
// A <CodeSnippet> with its code written inline counts as a hand-written block
// too, with `component: 'CodeSnippet'`. Fenced blocks have `component: null`.
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
          component: null,
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

    const snippet = readCodeSnippet(lines, i);
    if (snippet) {
      blocks.push(snippet.block);
      i = snippet.end;
      continue;
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
