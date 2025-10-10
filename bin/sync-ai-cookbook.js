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
const OUTPUT_SUBDIR = process.env.AI_COOKBOOK_OUTPUT_DIR ?? 'ai-cookbook';
const OUTPUT_DIR = path.join(WORKSPACE_ROOT, OUTPUT_SUBDIR);
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif', '.bmp']);

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
  runGit(['clone', '--branch', REPO_BRANCH, REPO_URL, REPO_TEMP_DIR], {cwd: TEMP_ROOT});
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

function sanitizeFilenameSegment(segment) {
  const sanitized = segment.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase();
  return sanitized.length > 0 ? sanitized : 'part';
}

function buildAssetTargetName(slug, relativePath, ext, usedNames) {
  const normalizedRelative = relativePath.replace(/\\/g, '/');
  const segments = normalizedRelative.split('/').filter((segment) => segment.length > 0);
  const parts = segments.map((segment, index) => {
    if (index === segments.length - 1) {
      const parsed = path.parse(segment);
      return sanitizeFilenameSegment(parsed.name);
    }
    return sanitizeFilenameSegment(segment);
  });
  const base = parts.length > 0 ? parts.join('-') : 'asset';
  const extension = ext.toLowerCase();
  let candidate = `${slug}-${base}${extension}`;
  let counter = 1;
  while (usedNames.has(candidate)) {
    candidate = `${slug}-${base}-${counter}${extension}`;
    counter += 1;
  }
  usedNames.add(candidate);
  return candidate;
}

async function copyRecipeAssets(readmePath, slug) {
  const recipeDir = path.dirname(readmePath);
  const stack = [recipeDir];
  const assetMap = new Map();
  const usedNames = new Set();

  await fs.mkdir(OUTPUT_DIR, {recursive: true});

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
      const ext = path.extname(entry.name).toLowerCase();
      if (!IMAGE_EXTENSIONS.has(ext)) {
        continue;
      }
      if (/^readme\.md$/i.test(entry.name)) {
        continue;
      }
      const relative = path.relative(recipeDir, entryPath);
      const targetName = buildAssetTargetName(slug, relative, ext, usedNames);
      const targetPath = path.join(OUTPUT_DIR, targetName);
      await fs.copyFile(entryPath, targetPath);
      assetMap.set(normalizePathKey(entryPath), `./${targetName}`);
    }
  }

  return assetMap;
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

function buildFrontMatter({baseData, title, lastUpdated, sourceUrl}) {
  const sanitized = {...baseData};
  delete sanitized.title;
  delete sanitized.last_updated;
  delete sanitized.lastUpdated;
  delete sanitized.lastUpdatedAt;
  delete sanitized.last_updated_at;
  delete sanitized.source;

  const ordered = {title};
  for (const [key, value] of Object.entries(sanitized)) {
    if (value === undefined) {
      continue;
    }
    ordered[key] = value;
  }
  ordered.last_updated = lastUpdated;
  if (sourceUrl) {
    ordered.source = sourceUrl;
  }
  const yamlString = yaml.dump(ordered, {lineWidth: 120, sortKeys: false}).trimEnd();
  return `---\n${yamlString}\n---`;
}

function normalizeDocsHref(href) {
  const trimmed = href.trim();
  if (!trimmed) {
    return null;
  }
  const match = trimmed.match(/^(?:https?:\/\/)?docs\.temporal\.io(?:(\/[^?#]*)?)(\?[^#]*)?(#.*)?$/i);
  if (!match) {
    return null;
  }
  const pathname = match[1] ?? '/';
  const search = match[2] ?? '';
  const hash = match[3] ?? '';
  return `${pathname}${search}${hash}`;
}

function rewriteDocsLink(href) {
  const normalized = normalizeDocsHref(href);
  if (normalized !== null) {
    return normalized;
  }
  if (href.startsWith('//')) {
    return normalizeDocsHref(`https:${href}`);
  }
  return null;
}

function processHref(href, baseDir, slugLookup, assetMap, options = {}) {
  const {isImage = false} = options;
  const trimmed = href.trim();
  if (!trimmed) {
    return null;
  }
  if (trimmed.startsWith('#')) {
    return null;
  }

  const docsNormalized = rewriteDocsLink(trimmed);
  if (docsNormalized !== null) {
    return docsNormalized;
  }

  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    return null;
  }

  if (trimmed.startsWith('/')) {
    const normalized = rewriteDocsLink(`https://docs.temporal.io${trimmed}`);
    return normalized ?? null;
  }

  if (trimmed.startsWith('//')) {
    const normalized = rewriteDocsLink(trimmed);
    return normalized ?? null;
  }

  const linkParts = trimmed.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  if (!linkParts) {
    return null;
  }
  const [, pathname = '', search = '', hash = ''] = linkParts;

  const resolved = path.resolve(baseDir, pathname || '.');
  const normalizedResolved = normalizePathKey(resolved);

  if (assetMap?.has(normalizedResolved)) {
    return `${assetMap.get(normalizedResolved)}${search ?? ''}${hash ?? ''}`;
  }

  const candidatePaths = [resolved];
  if (!/\.[a-z0-9]+$/i.test(resolved)) {
    candidatePaths.push(path.join(resolved, 'README.md'));
  }
  if (!resolved.toLowerCase().endsWith('readme.md')) {
    candidatePaths.push(`${resolved}.md`);
  }

  for (const candidate of candidatePaths) {
    const key = normalizePathKey(candidate);
    if (assetMap?.has(key)) {
      return `${assetMap.get(key)}${search ?? ''}${hash ?? ''}`;
    }
    if (slugLookup.has(key)) {
      const slug = slugLookup.get(key);
      if (slug) {
        return `./${slug}.mdx${search ?? ''}${hash ?? ''}`;
      }
    }
  }

  const ext = path.extname(resolved).toLowerCase();
  if (ext === '.md') {
    const baseName = path.basename(resolved, ext);
    let slug = null;
    if (/^readme$/i.test(baseName)) {
      slug = slugifySegment(path.basename(path.dirname(resolved)));
    } else if (baseName) {
      slug = slugifySegment(baseName);
    }
    if (slug) {
      return `./${slug}.mdx${search ?? ''}${hash ?? ''}`;
    }
  }

  if (assetMap && IMAGE_EXTENSIONS.has(ext)) {
    const key = normalizePathKey(resolved);
    if (assetMap.has(key)) {
      return `${assetMap.get(key)}${search ?? ''}${hash ?? ''}`;
    }
  }

  if (isImage) {
    const key = normalizePathKey(resolved);
    if (assetMap?.has(key)) {
      return `${assetMap.get(key)}${search ?? ''}${hash ?? ''}`;
    }
  }

  return null;
}

function rewriteLinks(body, readmePath, slugLookup, assetMap) {
  const baseDir = path.dirname(readmePath);
  const markdownRewritten = body.replace(/(!)?\[([^\]]*?)\]\(([^)]+)\)/g, (match, bang, text, rawHref) => {
    const isImage = bang === '!';
    const rewritten = processHref(rawHref, baseDir, slugLookup, assetMap, {isImage});
    if (rewritten === null) {
      return match;
    }
    const prefix = isImage ? '!' : '';
    return `${prefix}[${text}](${rewritten})`;
  });

  return markdownRewritten.replace(/<img\b([^>]*?)\bsrc=(['"])([^'"]+)\2/gi, (match, preAttrs, quote, rawHref) => {
    const rewritten = processHref(rawHref, baseDir, slugLookup, assetMap, {isImage: true});
    if (rewritten === null) {
      return match;
    }
    return `<img${preAttrs}src=${quote}${rewritten}${quote}`;
  });
}

async function transformReadme(readmePath, slugLookup) {
  const parentDir = path.basename(path.dirname(readmePath));
  const slug = slugifySegment(parentDir);
  const relativePath = path.relative(REPO_TEMP_DIR, readmePath);
  const relativePathPosix = relativePath.split(path.sep).join('/');
  const sourcePath = relativePathPosix.replace(/\/?README\.md$/i, '');
  const sourceTarget = sourcePath.length > 0 ? sourcePath : '';
  const repoHttpBase = REPO_URL.replace(/\.git$/i, '');
  const sourceUrl = `${repoHttpBase}/blob/${REPO_BRANCH}/${sourceTarget}`;
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
  const assetMap = await copyRecipeAssets(readmePath, slug);
  const frontMatterBlock = buildFrontMatter({
    baseData: commentData,
    title,
    lastUpdated: lastUpdatedResult.lastUpdated,
    sourceUrl,
  });

  const trimmedBody = body.replace(/\s+$/, '');
  const rewrittenBody = rewriteLinks(trimmedBody, readmePath, slugLookup, assetMap);
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
