#!/usr/bin/env node

// Turns a `yarn build` failure log into an actionable summary for a PR
// comment. Docusaurus throws well-known, structured messages for the most
// common content mistakes (broken links/anchors, unresolved Markdown links,
// MDX syntax errors); we pull the specific page/target out of those so
// contributors don't have to dig through the full Vercel build log.

const fs = require('fs');

const MAX_FINDINGS_PER_SECTION = 25;
const RAW_TAIL_LINES = 60;

function stripAnsi(text) {
  // eslint-disable-next-line no-control-regex
  return text.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '');
}

// Matches the blocks Docusaurus emits from createBrokenLinksMessage(), e.g.:
//   - Broken anchor on source page path = /visibility:
//      -> linking to /references/operation-list#operations
function extractBrokenLinkFindings(log, type) {
  const blockRegex = new RegExp(
    `- Broken ${type} on source page path = (.+?):\\n((?:[ \\t]*-> linking to .+\\n?)+)`,
    'g',
  );
  const findings = [];
  let match;
  while ((match = blockRegex.exec(log))) {
    const sourcePage = match[1].trim();
    match[2]
      .split('-> linking to')
      .map((s) => s.replace(/^[:\s-]+|\s+$/g, ''))
      .filter(Boolean)
      .forEach((target) => findings.push({ sourcePage, target }));
  }
  return findings;
}

// Matches mdx-loader's compileToJSX() failure:
//   MDX compilation failed for file "docs/foo.mdx"
//   Cause: <message>
function findMdxCompilationErrors(log) {
  const regex = /MDX compilation failed for file "?(.+?)"?\r?\nCause: (.+)/g;
  const findings = [];
  let match;
  while ((match = regex.exec(log))) {
    findings.push({ file: match[1].trim(), cause: match[2].trim() });
  }
  return findings;
}

// Matches resolveMarkdownLinks' onBrokenMarkdownLinks() report:
//   Markdown link with URL "./foo.md" in source file path "docs/bar.mdx" ... couldn't be resolved.
function findBrokenMarkdownLinks(log) {
  const regex = /Markdown link with URL "(.+?)" in source file path "(.+?)"[^\n]*couldn't be resolved\./g;
  const findings = [];
  let match;
  while ((match = regex.exec(log))) {
    findings.push({ url: match[1].trim(), sourceFile: match[2].trim() });
  }
  return findings;
}

function parseBuildFailure(rawLog) {
  const log = stripAnsi(rawLog);
  return {
    brokenLinks: extractBrokenLinkFindings(log, 'link'),
    brokenAnchors: extractBrokenLinkFindings(log, 'anchor'),
    mdxErrors: findMdxCompilationErrors(log),
    brokenMarkdownLinks: findBrokenMarkdownLinks(log),
  };
}

function isEmpty(findings) {
  return (
    findings.brokenLinks.length === 0 &&
    findings.brokenAnchors.length === 0 &&
    findings.mdxErrors.length === 0 &&
    findings.brokenMarkdownLinks.length === 0
  );
}

function truncatedNote(count) {
  return count > MAX_FINDINGS_PER_SECTION
    ? `\n_...and ${count - MAX_FINDINGS_PER_SECTION} more. See the full build log for the rest._\n`
    : '';
}

function renderLinkSection(heading, tip, findings) {
  if (findings.length === 0) return '';
  const rows = findings
    .slice(0, MAX_FINDINGS_PER_SECTION)
    .map((f) => `| \`${f.sourcePage}\` | \`${f.target}\` |`)
    .join('\n');
  return `### ${heading}

${tip}

| Page | Broken target |
|------|----------------|
${rows}
${truncatedNote(findings.length)}`;
}

function renderMdxSection(findings) {
  if (findings.length === 0) return '';
  const items = findings
    .slice(0, MAX_FINDINGS_PER_SECTION)
    .map((f) => `- \`${f.file}\`: ${f.cause}`)
    .join('\n');
  return `### MDX compilation errors

The following file(s) have invalid MDX/JSX syntax (an unescaped \`<\`, \`{\`, or a broken component reference are common causes).

${items}
${truncatedNote(findings.length)}`;
}

function renderBrokenMarkdownLinksSection(findings) {
  if (findings.length === 0) return '';
  const items = findings
    .slice(0, MAX_FINDINGS_PER_SECTION)
    .map((f) => `- \`${f.sourceFile}\` links to \`${f.url}\`, which doesn't resolve to a real file`)
    .join('\n');
  return `### Unresolved Markdown links

${items}
${truncatedNote(findings.length)}`;
}

function tailOf(rawLog, lines) {
  return stripAnsi(rawLog).trim().split('\n').slice(-lines).join('\n');
}

function buildComment(findings, rawLog) {
  const marker = '<!-- docs-build-check -->';
  const header = '### ❌ Docs build failed\n\nThis PR fails the same production build that Vercel runs, so the deployment will fail too.';

  if (isEmpty(findings)) {
    return `${marker}
${header}

We couldn't automatically identify the specific error from the build output. Here are the last ${RAW_TAIL_LINES} lines of the build log:

<details>
<summary>Build log tail</summary>

\`\`\`
${tailOf(rawLog, RAW_TAIL_LINES)}
\`\`\`

</details>

Run \`yarn build\` locally to reproduce the full error.`;
  }

  const sections = [
    renderLinkSection(
      'Broken links',
      'Update the link to point to a page that exists, or fix the typo in the path.',
      findings.brokenLinks,
    ),
    renderLinkSection(
      'Broken anchors',
      "The target page exists, but the heading/anchor it links to doesn't. Fix the anchor, or add the missing heading to the target page.",
      findings.brokenAnchors,
    ),
    renderBrokenMarkdownLinksSection(findings.brokenMarkdownLinks),
    renderMdxSection(findings.mdxErrors),
  ].filter(Boolean);

  return `${marker}
${header}

${sections.join('\n\n')}

Run \`yarn build\` locally to reproduce.`;
}

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node parse-build-failure.js <build-log-file>');
    process.exit(1);
  }
  const rawLog = fs.readFileSync(filePath, 'utf8');
  const findings = parseBuildFailure(rawLog);
  process.stdout.write(buildComment(findings, rawLog));
}

if (require.main === module) {
  main();
} else {
  module.exports = {
    stripAnsi,
    extractBrokenLinkFindings,
    findMdxCompilationErrors,
    findBrokenMarkdownLinks,
    parseBuildFailure,
    isEmpty,
    buildComment,
  };
}
