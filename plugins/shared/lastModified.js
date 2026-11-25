/**
 * Last-modified dates for docs pages, based on significant changes only.
 *
 * The sitemap's <lastmod>, the page JSON-LD `dateModified`, and the
 * "Last updated" line in each .md page all read this one source, through the
 * Docusaurus VCS hook (`future.experimental_vcs` in docusaurus.config.js).
 *
 * A page's date is the latest commit on main that moved its body at least
 * SIGNIFICANT_WORDS words (added + removed) away from the version at its
 * previous date. Frontmatter is ignored, punctuation and formatting count as
 * zero, and small edits accumulate until they pass the threshold. That keeps
 * metadata sweeps, typo fixes, and reflows from presenting every page as
 * freshly changed, which is what makes search engines stop trusting lastmod.
 *
 * Commits listed in .lastmod-ignore-revs never set a date. Use it for
 * mechanical sweeps large enough to pass the threshold. See
 * readme/MARKDOWN_PIPELINE.md#last-updated-dates.
 */
const { execFileSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SIGNIFICANT_WORDS = 20;
const IGNORE_REVS_FILENAME = '.lastmod-ignore-revs';

const FRONTMATTER = /^﻿?---\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/;

function stripFrontmatter(source) {
  return source.replace(FRONTMATTER, '');
}

// Words only: letters and digits. Markdown syntax (including _emphasis_),
// punctuation, and whitespace never count as a change.
function tokenize(body) {
  return body.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
}

/**
 * Number of tokens added plus removed to turn `a` into `b`, capped: returns
 * `limit` as soon as the count reaches it. Myers' O(ND) diff after trimming
 * the common prefix and suffix, so typical small edits are cheap and large
 * rewrites stop early.
 */
function changedWordCount(a, b, limit = Infinity) {
  let start = 0;
  while (start < a.length && start < b.length && a[start] === b[start]) start++;
  let endA = a.length;
  let endB = b.length;
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA--;
    endB--;
  }
  const n = endA - start;
  const m = endB - start;
  if (n === 0 || m === 0) return Math.min(n + m, limit);

  const max = Math.min(n + m, limit);
  const offset = max + 1;
  const v = new Int32Array(2 * max + 3);
  for (let d = 0; d <= max; d++) {
    for (let k = -d; k <= d; k += 2) {
      let x = k === -d || (k !== d && v[offset + k - 1] < v[offset + k + 1]) ? v[offset + k + 1] : v[offset + k - 1] + 1;
      let y = x - k;
      while (x < n && y < m && a[start + x] === b[start + y]) {
        x++;
        y++;
      }
      v[offset + k] = x;
      if (x >= n && y >= m) return d;
    }
  }
  return limit;
}

/**
 * Walk one file's versions (oldest first) and return the version that sets
 * its date. Each version is `{ commit, timestamp, author, tokens }`.
 */
function resolveLastModified(versions, { threshold = SIGNIFICANT_WORDS, ignoreRevs = new Set() } = {}) {
  let baseline = null;
  let dated = null;
  for (const version of versions) {
    if (baseline === null) {
      baseline = version.tokens;
      if (!ignoreRevs.has(version.commit)) dated = version;
      continue;
    }
    if (ignoreRevs.has(version.commit)) {
      // The sweep's text becomes the new baseline, so later edits aren't
      // credited with its changes.
      baseline = version.tokens;
      continue;
    }
    if (changedWordCount(baseline, version.tokens, threshold) >= threshold) {
      baseline = version.tokens;
      dated = version;
    }
  }
  return dated;
}

function parseIgnoreRevs(text) {
  return new Set(
    text
      .split('\n')
      .map((line) => line.replace(/#.*/, '').trim())
      .filter(Boolean)
  );
}

function readIgnoreRevs(repoRoot) {
  const file = path.join(repoRoot, IGNORE_REVS_FILENAME);
  return fs.existsSync(file) ? parseIgnoreRevs(fs.readFileSync(file, 'utf8')) : new Set();
}

/**
 * Parse `git log --raw` output into per-path version chains, following
 * renames. Returns Map<repo-relative path, [{ commit, timestamp, author, blob }]>.
 */
function parseRawLog(log) {
  const chains = new Map();
  let commit = null;
  for (const line of log.split('\n')) {
    if (line.startsWith('C\t')) {
      const [, hash, seconds, author] = line.split('\t');
      commit = { commit: hash, timestamp: Number(seconds) * 1000, author };
      continue;
    }
    if (!line.startsWith(':') || !commit) continue;
    const [meta, ...paths] = line.split('\t');
    const [, , , blob, status] = meta.split(' ');
    if (status.startsWith('D')) {
      chains.delete(paths[0]);
      continue;
    }
    const target = paths[paths.length - 1];
    if (status.startsWith('R')) {
      const carried = chains.get(paths[0]) || [];
      chains.delete(paths[0]);
      chains.set(target, carried);
    }
    if (!chains.has(target)) chains.set(target, []);
    chains.get(target).push({ ...commit, blob });
  }
  return chains;
}

function readBlobs(repoRoot, shas) {
  const result = spawnSync('git', ['cat-file', '--batch'], {
    cwd: repoRoot,
    input: shas.join('\n') + '\n',
    maxBuffer: 1024 * 1024 * 1024,
  });
  if (result.status !== 0) throw new Error(`git cat-file failed: ${result.stderr}`);
  const out = result.stdout;
  const blobs = new Map();
  let i = 0;
  while (i < out.length) {
    const nl = out.indexOf(10, i);
    const header = out.toString('utf8', i, nl).split(' ');
    if (header.length < 3) {
      // "<sha> missing"
      i = nl + 1;
      continue;
    }
    const size = Number(header[2]);
    blobs.set(header[0], out.toString('utf8', nl + 1, nl + 1 + size));
    i = nl + 1 + size + 1;
  }
  return blobs;
}

function git(repoRoot, args) {
  return execFileSync('git', args, { cwd: repoRoot, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }).trim();
}

/**
 * Compute dates for every Markdown file under `pathPrefix`.
 * Returns { shallow, commitCount, files: Map<absolute path, { timestamp, author }> }.
 * A shallow clone returns no dates: its boundary commit would make every
 * untouched file look modified on the same day.
 */
function computeLastModified(repoRoot, { pathPrefix = 'docs/', threshold = SIGNIFICANT_WORDS, ignoreRevs } = {}) {
  const shallow = git(repoRoot, ['rev-parse', '--is-shallow-repository']) === 'true';
  const commitCount = Number(git(repoRoot, ['rev-list', '--count', 'HEAD']));
  if (shallow) return { shallow, commitCount, files: new Map() };

  // First-parent history with merges diffed against their first parent, so a
  // merged branch's dates are when the change landed on main.
  const log = git(repoRoot, [
    '-c',
    'log.showSignature=false',
    'log',
    '--reverse',
    '--first-parent',
    '--diff-merges=first-parent',
    '--raw',
    '-M',
    '--no-abbrev',
    '--format=C%x09%H%x09%ct%x09%an',
    '--',
    pathPrefix,
  ]);
  const chains = parseRawLog(log);
  const markdown = [...chains.entries()].filter(([file]) => /\.mdx?$/.test(file));
  const shas = [...new Set(markdown.flatMap(([, chain]) => chain.map((v) => v.blob)))];
  const blobs = readBlobs(repoRoot, shas);
  const tokenCache = new Map();
  const tokensFor = (sha) => {
    if (!tokenCache.has(sha)) tokenCache.set(sha, tokenize(stripFrontmatter(blobs.get(sha) || '')));
    return tokenCache.get(sha);
  };

  const revs = ignoreRevs || readIgnoreRevs(repoRoot);
  const files = new Map();
  for (const [file, chain] of markdown) {
    const versions = chain.map((v) => ({ ...v, tokens: tokensFor(v.blob) }));
    const dated = resolveLastModified(versions, { threshold, ignoreRevs: revs });
    if (dated) files.set(path.resolve(repoRoot, file), { timestamp: dated.timestamp, author: dated.author });
  }
  return { shallow, commitCount, files };
}

/**
 * A Docusaurus VcsConfig. Files under docs/ get significant-change dates;
 * everything else (the ai-cookbook clone, for example) uses Docusaurus's
 * own git-eager preset, as does `yarn start`.
 */
function createDocsVcs({ siteDir, pathPrefix = 'docs/' }) {
  const { getVcsPreset } = require('@docusaurus/utils');
  const fallback = getVcsPreset('default-v2');
  const docsRoot = path.resolve(siteDir, pathPrefix);
  const isProduction = process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test';
  let pending = null;

  function load() {
    if (!pending) {
      pending = Promise.resolve().then(() => {
        const started = Date.now();
        let result;
        try {
          result = computeLastModified(siteDir, { pathPrefix });
        } catch (error) {
          console.warn(`[lastmod] Couldn't read git history, omitting last-updated dates for ${pathPrefix}: ${error.message}`);
          return new Map();
        }
        const seconds = ((Date.now() - started) / 1000).toFixed(1);
        if (result.shallow) {
          console.warn(
            `[lastmod] Shallow git clone (${result.commitCount} commits): omitting last-updated dates for ${pathPrefix}. ` +
              'Set VERCEL_DEEP_CLONE=true on the Vercel project, or fetch-depth: 0 in GitHub Actions.'
          );
        } else {
          console.log(
            `[lastmod] is-shallow-repository: false, ${result.commitCount} commits; ` +
              `dated ${result.files.size} ${pathPrefix} files in ${seconds}s`
          );
        }
        return result.files;
      });
    }
    return pending;
  }

  const isDocsFile = (absolute) => absolute.startsWith(docsRoot + path.sep);

  return {
    initialize(params) {
      fallback.initialize(params);
      if (isProduction) load();
    },
    getFileCreationInfo(filePath) {
      return fallback.getFileCreationInfo(filePath);
    },
    async getFileLastUpdateInfo(filePath) {
      const absolute = path.resolve(siteDir, filePath);
      if (!isProduction || !isDocsFile(absolute)) return fallback.getFileLastUpdateInfo(filePath);
      return (await load()).get(absolute) ?? null;
    },
  };
}

module.exports = {
  SIGNIFICANT_WORDS,
  IGNORE_REVS_FILENAME,
  stripFrontmatter,
  tokenize,
  changedWordCount,
  resolveLastModified,
  parseIgnoreRevs,
  parseRawLog,
  computeLastModified,
  createDocsVcs,
};
