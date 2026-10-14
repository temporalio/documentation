#!/usr/bin/env node

// Fails when a docs page builds at a URL that ends in "/".
//
// Docusaurus gives a category index doc a URL ending in "/" unless its
// frontmatter sets `slug`. A category index is index.md(x), README.md(x), or a
// file named after its folder, such as event-history/event-history.mdx.
// docusaurus.config.js leaves `trailingSlash` unset, so that URL goes as-is
// into the page's canonical link, og:url, sitemap entry, JSON-LD, and every
// sidebar and breadcrumb link to it. vercel.json sets "trailingSlash": false,
// so each of those URLs 308-redirects to the same path without the slash.
//
// The fix is a `slug` without the trailing slash. Docusaurus writes the page
// to the same <path>/index.html file either way, so the URL the page is
// served at doesn't change and no redirect is needed.
//
// The URL comes from Docusaurus's own slug function, so this check agrees
// with the build. There's no baseline: Vercel redirects every trailing-slash
// URL, so no page should have one. The exceptions are the docs root
// (docs/index.mdx, served at "/") and the ai-cookbook docs instance, which
// lives outside docs/. Its root page can't drop the slash through `slug`, and
// its files are synced from another repository.
//
//   node bin/check-index-slugs.js          # report
//   node bin/check-index-slugs.js --json   # machine-readable
//
// In GitHub Actions it also prints an error annotation for each finding.
//
// Exit codes: 0 clean, 2 findings, 1 error.

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const getSlug = require('@docusaurus/plugin-content-docs/lib/slug.js').default;
const { DefaultNumberPrefixParser } = require('@docusaurus/plugin-content-docs/lib/numberPrefix.js');
const { isExcludedDocPath, walkDocFiles, DOCS_DIR } = require('./check-orphan-pages');

// The URL the main docs instance (routeBasePath '/') serves a doc at. `source`
// is the file's posix path relative to docs/. Mirrors the getSlug call in
// @docusaurus/plugin-content-docs/lib/docs.js.
function docPermalink(source, frontMatter) {
  const parseNumberPrefixes = frontMatter.parse_number_prefixes ?? true;
  const fileName = path.posix.basename(source, path.posix.extname(source));
  const baseID = frontMatter.id ?? (parseNumberPrefixes ? DefaultNumberPrefixParser(fileName).filename : fileName);
  return getSlug({
    baseID,
    source,
    sourceDirName: path.posix.dirname(source),
    frontMatterSlug: frontMatter.slug,
    stripDirNumberPrefixes: parseNumberPrefixes,
    numberPrefixParser: DefaultNumberPrefixParser,
  });
}

// What to do about a doc that builds at a URL ending in "/", or null if the
// URL is fine.
function checkDoc(source, frontMatter) {
  const permalink = docPermalink(source, frontMatter);
  if (permalink === '/' || !permalink.endsWith('/')) return null;

  const slug = permalink.replace(/\/+$/, '');
  const fix =
    frontMatter.slug === undefined
      ? `Add \`slug: ${slug}\` to the frontmatter.`
      : `Change \`slug: ${frontMatter.slug}\` to \`slug: ${slug}\`.`;
  return { permalink, fix };
}

// The line to annotate: the frontmatter's `slug` line if it has one, otherwise
// its `title` line, which is where docs/guides/index.mdx and its siblings put
// `slug`.
function annotationLine(text) {
  const lines = text.split(/\r?\n/);
  if (lines[0] !== '---') return 1;
  const end = lines.indexOf('---', 1);
  const frontMatter = lines.slice(0, end === -1 ? lines.length : end);
  for (const key of ['slug', 'title']) {
    const index = frontMatter.findIndex((line) => line.startsWith(`${key}:`));
    if (index !== -1) return index + 1;
  }
  return 1;
}

function findIssues() {
  const issues = [];
  let checked = 0;

  for (const file of walkDocFiles(DOCS_DIR)) {
    const relFromDocs = path.relative(DOCS_DIR, file);
    if (isExcludedDocPath(relFromDocs)) continue;
    checked++;

    const text = fs.readFileSync(file, 'utf8');
    const source = relFromDocs.split(path.sep).join('/');
    const finding = checkDoc(source, matter(text).data);
    if (finding) {
      issues.push({ path: path.relative(process.cwd(), file), line: annotationLine(text), ...finding });
    }
  }

  return { issues, checked };
}

function report({ issues, checked }) {
  const lines = [`Checked ${checked} doc file(s).`, ''];

  if (issues.length) {
    lines.push('Pages that build at a URL ending in "/":');
    for (const issue of issues) {
      lines.push(`  ${issue.path} (${issue.permalink})`);
      lines.push(`      ${issue.fix}`);
    }
    lines.push('');
    lines.push(
      "Vercel redirects each of these URLs to the same path without the slash, so the page's canonical URL, " +
        'sitemap entry, and sidebar links all point at a redirect. Docusaurus writes the page to the same file ' +
        "with the new slug, so the page's URL doesn't change and it needs no redirect."
    );
    lines.push('');
  }

  lines.push(issues.length === 0 ? 'No trailing-slash URLs found.' : `${issues.length} issue(s) found.`);
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
      const target = issue.permalink.replace(/\/+$/, '');
      console.log(
        `::error file=${issue.path},line=${issue.line}::Builds at ${issue.permalink}, which redirects to ${target}. ${issue.fix}`
      );
    }
  }

  return result.issues.length;
}

module.exports = { docPermalink, checkDoc, annotationLine, findIssues };

if (require.main === module) {
  try {
    if (main() > 0) process.exit(2);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
