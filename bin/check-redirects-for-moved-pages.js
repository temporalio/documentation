#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const VERCEL_JSON = path.join(process.cwd(), 'vercel.json');
const BASE_SHA = process.env.BASE_SHA;

if (!BASE_SHA) {
  console.error('BASE_SHA environment variable is required.');
  process.exit(1);
}

function filePathToUrlPath(filePath) {
  let urlPath = filePath
    .replace(/^docs\//, '/')
    .replace(/\.mdx?$/, '')
    .replace(/\/index$/, '');

  if (urlPath === '') urlPath = '/';
  return urlPath;
}

function extractSlugFromContent(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const slugMatch = match[1].match(/^slug:\s*(.+)$/m);
  return slugMatch ? slugMatch[1].trim() : null;
}

function getFileContentAtRef(filePath, ref) {
  try {
    return execSync(`git show ${ref}:${filePath}`, { encoding: 'utf8' });
  } catch {
    return null;
  }
}

function resolveOldUrl(filePath, ref) {
  const content = getFileContentAtRef(filePath, ref);
  if (content) {
    const slug = extractSlugFromContent(content);
    if (slug) {
      if (slug.startsWith('/')) return slug;
      // Relative slug: resolve against the doc's directory path
      const dirUrl = filePathToUrlPath(filePath).replace(/\/[^/]*$/, '');
      return `${dirUrl}/${slug}`;
    }
  }
  return filePathToUrlPath(filePath);
}

function getMovedOrDeletedDocFiles() {
  const mergeBase = execSync(`git merge-base HEAD ${BASE_SHA}`, {
    encoding: 'utf8',
  }).trim();

  // -M enables rename detection, --diff-filter=DR shows only deletes and renames
  const output = execSync(
    `git diff --name-status -M --diff-filter=DR ${mergeBase}..HEAD -- docs/`,
    { encoding: 'utf8' },
  );

  const results = [];
  for (const line of output.split('\n').filter((l) => l.trim())) {
    const parts = line.split('\t');
    const status = parts[0];

    if (status === 'D') {
      results.push({ type: 'deleted', oldPath: parts[1] });
    } else if (status.startsWith('R')) {
      results.push({ type: 'renamed', oldPath: parts[1], newPath: parts[2] });
    }
  }

  const files = results.filter((r) => /\.(mdx|md)$/.test(r.oldPath));
  return { files, mergeBase };
}

function vercelPatternToRegex(pattern) {
  // Convert Vercel redirect patterns like /foo/:path* to a regex.
  // Replace named params before escaping so the colons and wildcards are
  // consumed first, then escape whatever literal characters remain.
  const tokens = [];
  const tokenized = pattern
    .replace(/:([a-zA-Z]+)\*/g, () => {
      tokens.push('.+');
      return `__TOKEN_${tokens.length - 1}__`;
    })
    .replace(/:([a-zA-Z]+)/g, () => {
      tokens.push('[^/]+');
      return `__TOKEN_${tokens.length - 1}__`;
    });

  let regexStr = tokenized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  for (let i = 0; i < tokens.length; i++) {
    regexStr = regexStr.replace(`__TOKEN_${i}__`, tokens[i]);
  }
  return new RegExp(`^${regexStr}$`);
}

function loadRedirects() {
  const config = JSON.parse(fs.readFileSync(VERCEL_JSON, 'utf8'));
  return (config.redirects || []).map((r) => ({
    source: r.source,
    regex: vercelPatternToRegex(r.source),
  }));
}

function findMatchingRedirect(urlPath, redirects) {
  return redirects.find((r) => r.regex.test(urlPath));
}

function main() {
  const { files: movedFiles, mergeBase } = getMovedOrDeletedDocFiles();

  if (movedFiles.length === 0) {
    console.log('No docs pages were moved or deleted. Nothing to check.');
    process.exit(0);
  }

  const redirects = loadRedirects();
  const missing = [];

  for (const file of movedFiles) {
    const oldUrl = resolveOldUrl(file.oldPath, mergeBase);
    const match = findMatchingRedirect(oldUrl, redirects);

    if (!match) {
      file.oldUrl = oldUrl;
      missing.push(file);
    }
  }

  if (missing.length === 0) {
    console.log(
      `All ${movedFiles.length} moved/deleted page(s) have redirects.`,
    );
    process.exit(0);
  }

  console.error('Missing redirects for moved/deleted pages:\n');
  for (const file of missing) {
    if (file.type === 'renamed') {
      const newUrl = resolveOldUrl(file.newPath, 'HEAD');
      console.error(
        `  ${file.oldUrl} -> ${newUrl} (renamed, no redirect found)`,
      );
    } else {
      console.error(`  ${file.oldUrl} (deleted, no redirect found)`);
    }
  }

  console.error(
    `\nAdd redirect entries to vercel.json for the ${missing.length} path(s) above.`,
  );
  process.exit(1);
}

main();
