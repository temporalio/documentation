const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Folder-level defaults for doc front matter. A directory may contain
// `_frontmatter.yml`; values apply to every doc under that folder.
// See TAXONOMY.md ("Folder-level defaults").
//
// Precedence (later wins): ancestor `_frontmatter.yml` → nearer folder →
// page front matter. Keys replace entirely (no array union / deep merge).

const FRONTMATTER_FILENAME = '_frontmatter.yml';

function isInsideOrEqual(dir, root) {
  const rel = path.relative(path.resolve(root), path.resolve(dir));
  return rel === '' || (!rel.startsWith(`..${path.sep}`) && rel !== '..' && !path.isAbsolute(rel));
}

function loadFrontMatterFile(filePath, cache) {
  let mtimeMs;
  try {
    mtimeMs = fs.statSync(filePath).mtimeMs;
  } catch {
    cache.delete(filePath);
    return {};
  }

  const cached = cache.get(filePath);
  if (cached && cached.mtimeMs === mtimeMs) {
    return cached.value;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = yaml.load(raw);
  if (parsed == null) {
    const value = {};
    cache.set(filePath, { mtimeMs, value });
    return value;
  }
  if (typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`${FRONTMATTER_FILENAME} must be a YAML mapping: ${filePath}`);
  }

  cache.set(filePath, { mtimeMs, value: parsed });
  return parsed;
}

/**
 * Defaults from `_frontmatter.yml` files between the doc's directory and
 * `stopDir` (inclusive), nearest folder winning over ancestors.
 *
 * @param {string} filePath Absolute or relative path to the doc file
 * @param {{ stopDir: string, cache?: Map<string, {mtimeMs: number, value: object}> }} options
 * @returns {Record<string, unknown>}
 */
function collectSectionFrontMatter(filePath, { stopDir, cache = new Map() } = {}) {
  if (!stopDir) {
    throw new Error('collectSectionFrontMatter requires stopDir');
  }

  const stop = path.resolve(stopDir);
  let dir = path.dirname(path.resolve(filePath));
  /** @type {Record<string, unknown>[]} leaf → root */
  const layers = [];

  while (isInsideOrEqual(dir, stop)) {
    layers.push(loadFrontMatterFile(path.join(dir, FRONTMATTER_FILENAME), cache));
    if (path.resolve(dir) === stop) {
      break;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }

  // Ancestor first, then nearer folders override.
  return Object.assign({}, ...layers.reverse());
}

/**
 * Merge section defaults under page front matter (page keys always win).
 *
 * @param {string} filePath
 * @param {Record<string, unknown>} pageFrontMatter
 * @param {{ stopDir: string, cache?: Map<string, {mtimeMs: number, value: object}> }} options
 * @returns {Record<string, unknown>}
 */
function mergeWithSectionFrontMatter(filePath, pageFrontMatter, options) {
  const defaults = collectSectionFrontMatter(filePath, options);
  return { ...defaults, ...(pageFrontMatter || {}) };
}

module.exports = {
  FRONTMATTER_FILENAME,
  collectSectionFrontMatter,
  mergeWithSectionFrontMatter,
};
