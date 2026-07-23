#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(process.cwd(), 'docs');
const BASE_SHA = process.env.BASE_SHA;
const PREVIEW_BASE_URL = process.env.DOCS_PREVIEW_BASE_URL || '';

// Mirrors docs.exclude in docusaurus.config.js — underscore-prefixed partials
// are not published as pages and should not appear in preview link lists.
function isExcludedDocPath(filePath) {
  const relativePath = filePath.startsWith('docs/')
    ? filePath.slice('docs/'.length)
    : path.relative(DOCS_DIR, filePath);

  const segments = relativePath.split(path.sep);
  const basename = segments[segments.length - 1];

  // **/_*.{js,jsx,ts,tsx,md,mdx}
  if (/^_[^.]/.test(basename) && /\.(mdx?|md)$/.test(basename)) {
    return true;
  }

  // **/_*/**
  if (segments.slice(0, -1).some((segment) => segment.startsWith('_'))) {
    return true;
  }

  return false;
}

function getChangedDocFiles(baseBranch = 'origin/main') {
  // Find the common ancestor (merge base)
  const mergeBase = execSync(`git merge-base HEAD ${baseBranch}`, { encoding: 'utf8' }).trim();

  const diffCommand = ['git', 'diff', '--name-only', `${mergeBase}..HEAD`, '--', 'docs/'].join(' ');

  const output = execSync(diffCommand, { encoding: 'utf8' });

  return output
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => /\.(mdx|md)$/.test(line))
    .filter((line) => !isExcludedDocPath(line))
    .filter((line) => fs.existsSync(line));
}

function extractFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    return {};
  }

  const block = match[1];
  const result = {};

  ['slug', 'id', 'title', 'sidebar_label'].forEach((key) => {
    const pattern = new RegExp(`^${key}:\\s*(.+)$`, 'm');
    const valueMatch = block.match(pattern);
    if (valueMatch) {
      result[key] = valueMatch[1].trim().replace(/^['"]|['"]$/g, '');
    }
  });

  return result;
}

function relativeSlugFromPath(filePath, id) {
  const relativePath = path.relative(DOCS_DIR, filePath);
  const withoutExtension = relativePath.replace(/\.[^.]+$/, '');
  const parts = withoutExtension.split(path.sep);

  // Mirror Docusaurus: when a doc has no `slug`, its URL is the directory path
  // plus its `id`. The `id` defaults to the filename, but a custom `id` in the
  // frontmatter overrides that last segment (e.g. temporal-nexus.mdx with
  // `id: nexus` publishes at .../nexus, not .../temporal-nexus).
  if (typeof id === 'string' && id.trim().length > 0) {
    parts[parts.length - 1] = id.trim();
  } else if (parts[parts.length - 1] === 'index') {
    parts.pop();
  }

  return parts.join('/');
}

function normalizeSlug(slug, filePath, id) {
  if (typeof slug === 'string' && slug.trim().length > 0) {
    const trimmed = slug.trim();
    return trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
  }

  return relativeSlugFromPath(filePath, id);
}

function humanizeSegment(segment) {
  return segment
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildUrlForSlug(slug) {
  const normalized = slug.length > 0 ? `/${slug}` : '/';
  if (!PREVIEW_BASE_URL) {
    return normalized;
  }

  const base = PREVIEW_BASE_URL.endsWith('/') ? PREVIEW_BASE_URL.slice(0, -1) : PREVIEW_BASE_URL;
  return `${base}${normalized}`;
}

function collectDocInfo(filePath) {
  const frontMatter = extractFrontMatter(filePath);
  const slug = normalizeSlug(frontMatter.slug, filePath, frontMatter.id);
  const segments = slug.split('/').filter((segment) => segment.length > 0);
  const label =
    frontMatter.sidebar_label ||
    frontMatter.title ||
    humanizeSegment(segments[segments.length - 1] || path.basename(filePath, path.extname(filePath)));
  const url = buildUrlForSlug(slug);

  return { filePath, slug, segments, label, url };
}

function insertIntoTree(tree, docInfo) {
  let currentLevel = tree;

  docInfo.segments.forEach((segment, index) => {
    if (!currentLevel.children.has(segment)) {
      currentLevel.children.set(segment, {
        segment,
        label: humanizeSegment(segment),
        children: new Map(),
      });
    }

    currentLevel = currentLevel.children.get(segment);

    if (index === docInfo.segments.length - 1) {
      currentLevel.label = docInfo.label;
      currentLevel.url = docInfo.url;
      currentLevel.filePath = docInfo.filePath;
    }
  });

  if (docInfo.segments.length === 0) {
    tree.roots.push({
      label: docInfo.label,
      url: docInfo.url,
      filePath: docInfo.filePath,
      children: new Map(),
    });
  }
}

function renderNode(node, depth) {
  const indentation = '  '.repeat(depth);
  const label = node.url ? `[${node.label}](${node.url})` : node.label;
  const lines = [`${indentation}- ${label}`];

  const sortedChildren = Array.from(node.children.values()).sort((a, b) => a.label.localeCompare(b.label));

  sortedChildren.forEach((child) => {
    lines.push(...renderNode(child, depth + 1));
  });

  return lines;
}

function renderTree(tree) {
  const lines = [];

  Array.from(tree.children.values())
    .sort((a, b) => a.label.localeCompare(b.label))
    .forEach((child) => {
      lines.push(...renderNode(child, 0));
    });

  tree.roots
    .sort((a, b) => a.label.localeCompare(b.label))
    .forEach((root) => {
      lines.push(...renderNode(root, 0));
    });

  return lines.join('\n');
}

function main() {
  if (!BASE_SHA) {
    console.error('BASE_SHA environment variable is required.');
    process.exit(1);
  }

  const changedFiles = getChangedDocFiles('origin/main');

  if (changedFiles.length === 0) {
    process.stdout.write('');
    return;
  }

  const tree = { children: new Map(), roots: [] };

  changedFiles
    .map((filePath) => collectDocInfo(path.resolve(filePath)))
    .forEach((docInfo) => {
      insertIntoTree(tree, docInfo);
    });

  const rendered = renderTree(tree);
  process.stdout.write(rendered);
}

if (require.main === module) {
  main();
} else {
  module.exports = {
    isExcludedDocPath,
    getChangedDocFiles,
    extractFrontMatter,
    relativeSlugFromPath,
    normalizeSlug,
    collectDocInfo,
    insertIntoTree,
    renderTree,
    main,
  };
}
