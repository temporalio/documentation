#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(process.cwd(), 'docs');
const BASE_SHA = process.env.BASE_SHA;
const PREVIEW_BASE_URL = process.env.DOCS_PREVIEW_BASE_URL || '';

if (!BASE_SHA) {
  console.error('BASE_SHA environment variable is required.');
  process.exit(1);
}

function getChangedDocFiles(baseSha) {
  const diffCommand = [
    'git',
    'diff',
    '--name-only',
    `${baseSha}..HEAD`,
    '--',
    'docs/**/*.mdx',
    'docs/**/*.md'
  ].join(' ');

  const output = execSync(diffCommand, { encoding: 'utf8' });
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
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

  ['slug', 'title', 'sidebar_label'].forEach((key) => {
    const pattern = new RegExp(`^${key}:\\s*(.+)$`, 'm');
    const valueMatch = block.match(pattern);
    if (valueMatch) {
      result[key] = valueMatch[1].trim().replace(/^['"]|['"]$/g, '');
    }
  });

  return result;
}

function relativeSlugFromPath(filePath) {
  const relativePath = path.relative(DOCS_DIR, filePath);
  const withoutExtension = relativePath.replace(/\.[^.]+$/, '');
  const parts = withoutExtension.split(path.sep);

  if (parts[parts.length - 1] === 'index') {
    parts.pop();
  }

  return parts.join('/');
}

function normalizeSlug(slug, filePath) {
  if (typeof slug === 'string' && slug.trim().length > 0) {
    const trimmed = slug.trim();
    return trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
  }

  return relativeSlugFromPath(filePath);
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

  const base = PREVIEW_BASE_URL.endsWith('/')
    ? PREVIEW_BASE_URL.slice(0, -1)
    : PREVIEW_BASE_URL;
  return `${base}${normalized}`;
}

function collectDocInfo(filePath) {
  const frontMatter = extractFrontMatter(filePath);
  const slug = normalizeSlug(frontMatter.slug, filePath);
  const segments = slug.split('/').filter((segment) => segment.length > 0);
  const label =
    frontMatter.sidebar_label ||
    frontMatter.title ||
    humanizeSegment(segments[segments.length - 1] || path.basename(filePath, path.extname(filePath)));
  const url = buildUrlForSlug(slug);

  return { filePath, slug, segments, label };
}

function insertIntoTree(tree, docInfo) {
  let currentLevel = tree;

  docInfo.segments.forEach((segment, index) => {
    if (!currentLevel.children.has(segment)) {
      currentLevel.children.set(segment, {
        segment,
        label: humanizeSegment(segment),
        children: new Map()
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
      children: new Map()
    });
  }
}

function renderNode(node, depth) {
  const indentation = '  '.repeat(depth);
  const label = node.url ? `[${node.label}](${node.url})` : node.label;
  const lines = [`${indentation}- ${label}`];

  const sortedChildren = Array.from(node.children.values()).sort((a, b) =>
    a.label.localeCompare(b.label)
  );

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
  const changedFiles = getChangedDocFiles(BASE_SHA);

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

main();
