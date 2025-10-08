'use strict';

const {existsSync, mkdirSync} = require('fs');
const fs = require('fs/promises');
const path = require('path');
const os = require('os');
const {spawnSync} = require('child_process');
const yaml = require('js-yaml');

const REPO_URL = process.env.AI_COOKBOOK_REPO ?? 'https://github.com/temporalio/ai-cookbook.git';
const REPO_BRANCH = process.env.AI_COOKBOOK_BRANCH ?? 'main';
const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const TEMP_ROOT = path.join(os.tmpdir(), 'ai-cookbook-sync');
const REPO_TEMP_DIR = path.join(TEMP_ROOT, 'repo');
const OUTPUT_SUBDIR = process.env.AI_COOKBOOK_OUTPUT_DIR ?? 'ai-cookbook-test';
const OUTPUT_DIR = path.join(WORKSPACE_ROOT, OUTPUT_SUBDIR);

function runGit(args, options = {}) {
  const result = spawnSync('git', args, {
    stdio: ['ignore', 'inherit', 'inherit'],
    cwd: options.cwd,
    env: process.env,
  });
  if (result.status !== 0) {
    throw new Error(`git ${args.join(' ')} failed with exit code ${result.status ?? 'null'}`);
  }
}

async function ensureRepo() {
  if (!existsSync(TEMP_ROOT)) {
    mkdirSync(TEMP_ROOT, {recursive: true});
  }

  if (existsSync(REPO_TEMP_DIR)) {
    await fs.rm(REPO_TEMP_DIR, {recursive: true, force: true});
  }

  console.log(`[sync-ai-cookbook] cloning ${REPO_URL} (${REPO_BRANCH})`);
  runGit(['clone', '--depth=1', '--branch', REPO_BRANCH, REPO_URL, REPO_TEMP_DIR], {cwd: TEMP_ROOT});
}

function slugifySegment(segment) {
  const normalized = segment
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-')
    .toLowerCase();
  return normalized.length > 0 ? normalized : 'index';
}

async function collectReadmeFiles(rootDir) {
  const stack = [rootDir];
  const readmes = [];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = await fs.readdir(current, {withFileTypes: true});
    for (const entry of entries) {
      if (entry.name === '.git' || entry.name === '.github') {
        continue;
      }
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
        continue;
      }
      if (entry.isFile() && entry.name.toLowerCase() === 'readme.md') {
        readmes.push(entryPath);
      }
    }
  }

  return readmes;
}

async function readFile(filePath) {
  return fs.readFile(filePath, 'utf8');
}

async function writeFile(targetPath, content) {
  await fs.mkdir(path.dirname(targetPath), {recursive: true});
  await fs.writeFile(targetPath, content, 'utf8');
}

async function clearExistingOutput() {
  if (!existsSync(OUTPUT_DIR)) {
    return;
  }

  const entries = await fs.readdir(OUTPUT_DIR, {withFileTypes: true});
  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.mdx'))
      .map((entry) => fs.unlink(path.join(OUTPUT_DIR, entry.name))),
  );
}

function extractFrontMatterComment(source) {
  const commentPattern = /^\s*<!--([\s\S]*?)-->/;
  const match = commentPattern.exec(source);
  if (!match) {
    return {error: 'missing front matter comment'};
  }
  const commentBody = match[1].replace(/\r/g, '').trim();
  let data;
  try {
    const normalizedLines = [];
    for (const rawLine of commentBody.split('\n')) {
      const line = rawLine.trimEnd();
      const isKeyLine = /^[ \t]*[\w-]+:/.test(line);
      if (isKeyLine || line.trim().length === 0 || normalizedLines.length === 0) {
        normalizedLines.push(line);
      } else {
        normalizedLines[normalizedLines.length - 1] = `${normalizedLines[normalizedLines.length - 1]} ${line.trim()}`;
      }
    }
    const normalizedComment = normalizedLines
      .join('\n')
      .replace(/(^|\n)([ \t]*[\w-]+):(?=\S)/g, (full, prefix, key) => `${prefix}${key}: `);
    data = yaml.load(normalizedComment) ?? {};
  } catch (error) {
    return {error: `invalid front matter comment: ${error.message}`};
  }
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    return {error: 'front matter comment must resolve to an object'};
  }
  const rest = source.slice(match.index + match[0].length);
  const body = rest.replace(/^\s+/, '');
  return {data, body};
}

function normalizePathKey(filePath) {
  return path.normalize(filePath).replace(/\\/g, '/').toLowerCase();
}

function extractTitleFromBody(body) {
  const headingPattern = /^#\s*(.+?)(?:\n+|$)/;
  const match = headingPattern.exec(body);
  if (!match) {
    return {error: 'missing H1 title'};
  }
  const title = match[1].trim();
  if (!title) {
    return {error: 'empty H1 title'};
  }
  const remainder = body.slice(match.index + match[0].length).replace(/^\s+/, '');
  return {title, body: remainder};
}

function getLastUpdatedDate(readmePath) {
  const relative = path.relative(REPO_TEMP_DIR, readmePath);
  const result = spawnSync('git', ['log', '-1', '--format=%cI', '--', relative], {
    cwd: REPO_TEMP_DIR,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (result.status !== 0) {
    return {error: `unable to read git history (exit ${result.status})`};
  }
  const isoTimestamp = result.stdout.trim();
  if (!isoTimestamp) {
    return {error: 'git history returned empty timestamp'};
  }
  const parsed = new Date(isoTimestamp);
  if (Number.isNaN(parsed.getTime())) {
    return {error: `unable to parse timestamp "${isoTimestamp}"`};
  }
  return {lastUpdated: parsed.toISOString().slice(0, 10)};
}

function buildFrontMatter({baseData, title, lastUpdated}) {
  const sanitized = {...baseData};
  delete sanitized.title;
  delete sanitized.last_updated;
  delete sanitized.lastUpdated;
  delete sanitized.lastUpdatedAt;
  delete sanitized.last_updated_at;

  const ordered = {title};
  for (const [key, value] of Object.entries(sanitized)) {
    if (value === undefined) {
      continue;
    }
    ordered[key] = value;
  }
  ordered.last_updated = lastUpdated;
  const yamlString = yaml.dump(ordered, {lineWidth: 120, sortKeys: false}).trimEnd();
  return `---\n${yamlString}\n---`;
}

function rewriteDocsLink(href) {
  try {
    const url = new URL(href);
    if (url.hostname === 'docs.temporal.io') {
      const pathname = url.pathname || '/';
      const search = url.search ?? '';
      const hash = url.hash ?? '';
      return `${pathname}${search}${hash}` || '/';
    }
  } catch {
    // Ignore parsing errors for relative URLs.
  }
  return null;
}

function rewriteLinks(body, readmePath, slugLookup) {
  const baseDir = path.dirname(readmePath);
  return body.replace(/\[([^\]]+)]\(([^)]+)\)/g, (match, text, rawHref) => {
    const href = rawHref.trim();
    if (!href) {
      return match;
    }

    if (href.startsWith('#')) {
      return match;
    }

    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(href)) {
      const rewritten = rewriteDocsLink(href);
      if (rewritten !== null) {
        return `[${text}](${rewritten})`;
      }
      return match;
    }

    if (href.startsWith('//') || href.startsWith('/')) {
      const rewritten = href.startsWith('https://docs.temporal.io') ? rewriteDocsLink(`https:${href}`) : null;
      if (rewritten !== null) {
        return `[${text}](${rewritten})`;
      }
      return match;
    }

    const linkParts = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
    if (!linkParts) {
      return match;
    }
    const [, pathname = '', search = '', hash = ''] = linkParts;
    const resolved = path.resolve(baseDir, pathname || '.');
    const candidates = [];
    candidates.push(resolved);
    if (!/\.[a-z0-9]+$/i.test(resolved)) {
      candidates.push(path.join(resolved, 'README.md'));
    }
    if (!resolved.toLowerCase().endsWith('readme.md')) {
      candidates.push(`${resolved}.md`);
    }

    let slug = null;
    for (const candidate of candidates) {
      const normalizedKey = normalizePathKey(candidate);
      if (slugLookup.has(normalizedKey)) {
        slug = slugLookup.get(normalizedKey);
        break;
      }
    }

    if (!slug) {
      const targetExt = path.extname(resolved).toLowerCase();
      if (targetExt === '.md' || targetExt === '.mdx') {
        const baseName = path.basename(resolved, targetExt);
        if (/^readme$/i.test(baseName)) {
          slug = slugifySegment(path.basename(path.dirname(resolved)));
        } else if (baseName) {
          slug = slugifySegment(baseName);
        }
      }
    }

    if (!slug) {
      return match;
    }

    return `[${text}](./${slug}.mdx${search ?? ''}${hash ?? ''})`;
  });
}

async function transformReadme(readmePath, slugLookup) {
  const parentDir = path.basename(path.dirname(readmePath));
  const slug = slugifySegment(parentDir);
  const relativePath = path.relative(REPO_TEMP_DIR, readmePath);
  const rawContent = await readFile(readmePath);

  const commentParse = extractFrontMatterComment(rawContent);
  if ('error' in commentParse) {
    throw new Error(commentParse.error);
  }
  const {data: commentData, body: withoutComment} = commentParse;
  const titleExtraction = extractTitleFromBody(withoutComment);
  if ('error' in titleExtraction) {
    throw new Error(titleExtraction.error);
  }
  const {title, body} = titleExtraction;
  const lastUpdatedResult = getLastUpdatedDate(readmePath);
  if ('error' in lastUpdatedResult) {
    throw new Error(lastUpdatedResult.error);
  }
  const frontMatterBlock = buildFrontMatter({
    baseData: commentData,
    title,
    lastUpdated: lastUpdatedResult.lastUpdated,
  });

  const trimmedBody = body.replace(/\s+$/, '');
  const rewrittenBody = rewriteLinks(trimmedBody, readmePath, slugLookup);
  const finalContent = `${frontMatterBlock}\n\n${rewrittenBody.length > 0 ? `${rewrittenBody}\n` : ''}`;

  return {
    slug,
    source: relativePath,
    content: finalContent,
  };
}

async function syncReadmes() {
  await ensureRepo();
  const readmes = await collectReadmeFiles(REPO_TEMP_DIR);
  const slugLookup = new Map();
  readmes.forEach((readme) => {
    slugLookup.set(normalizePathKey(readme), slugifySegment(path.basename(path.dirname(readme))));
  });
  if (readmes.length === 0) {
    console.warn('[sync-ai-cookbook] no README.md files found in repository');
    return;
  }

  await clearExistingOutput();

  const writeOperations = readmes.map(async (readmePath) => {
    try {
      const transformed = await transformReadme(readmePath, slugLookup);
      const targetPath = path.join(OUTPUT_DIR, `${transformed.slug}.mdx`);
      await writeFile(targetPath, transformed.content);
      return {slug: transformed.slug, source: transformed.source};
    } catch (error) {
      console.warn(
        `[sync-ai-cookbook] skipped ${path.relative(REPO_TEMP_DIR, readmePath)}: ${error.message ?? String(error)}`,
      );
      return null;
    }
  });

  const results = (await Promise.all(writeOperations)).filter((value) => value !== null);
  results.sort((a, b) => a.slug.localeCompare(b.slug));

  if (results.length === 0) {
    console.warn('[sync-ai-cookbook] produced no files (see warnings above).');
    return;
  }

  console.log(
    `[sync-ai-cookbook] wrote ${results.length} file(s):\n` +
      results.map((item) => `  - ${item.slug}.mdx ← ${item.source}`).join(os.EOL),
  );
}

async function main() {
  try {
    await syncReadmes();
  } catch (error) {
    console.error('[sync-ai-cookbook] failed:', error);
    process.exitCode = 1;
  }
}

void main();
