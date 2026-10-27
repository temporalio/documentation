const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Folder-level frontmatter defaults. A folder may contain `_frontmatter.yml`;
// its values apply to every .md/.mdx file below that folder.
//
// Only keys listed in INHERITABLE_KEYS may appear in the file. Each key
// declares how it combines with the page's own value (`merge`) and, optionally,
// the shape its value must have (`type`: 'list' or 'string'):
//   'union'   - ancestor folders first, then nearer folders, then the page;
//               duplicates dropped. A page can add values but not remove them.
//   'replace' - the page's value wins, then the nearest folder, then ancestors.
//
// This runs in Docusaurus's `markdown.parseFrontMatter` hook. Scripts that read
// raw frontmatter through gray-matter (bin/check-*, plugins/markdown-pages,
// plugins/og-image, plugins/cookbook-index) do not see defaults, so before
// adding a key here, check which of them read that key and route them through
// applyDefaults.

const DEFAULTS_FILENAME = '_frontmatter.yml';

const INHERITABLE_KEYS = {
  tags: { merge: 'union', type: 'list' },
  section_title: { merge: 'replace', type: 'string' },
};

const TYPE_CHECKS = {
  list: { test: Array.isArray, description: 'a list' },
  string: { test: (value) => typeof value === 'string' && value.trim() !== '', description: 'a non-empty string' },
};

const sharedCache = new Map();

function loadDefaultsFile(filePath, { keys = INHERITABLE_KEYS, cache = sharedCache } = {}) {
  let mtimeMs;
  try {
    mtimeMs = fs.statSync(filePath).mtimeMs;
  } catch {
    cache.delete(filePath);
    return null;
  }

  const cached = cache.get(filePath);
  if (cached && cached.mtimeMs === mtimeMs) return cached.value;

  const raw = fs.readFileSync(filePath, 'utf8');
  // js-yaml throws on an empty document, but an empty (or comment-only) file just means no defaults.
  const isBlank = raw.split(/\r?\n/).every((line) => /^\s*(#.*)?$/.test(line));
  let parsed;
  try {
    parsed = isBlank ? {} : yaml.load(raw);
  } catch (error) {
    throw new Error(`Invalid YAML in ${filePath}: ${error.message}`);
  }
  const value = parsed ?? {};
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${filePath} must be a YAML mapping of frontmatter keys.`);
  }
  for (const key of Object.keys(value)) {
    if (!Object.hasOwn(keys, key)) {
      throw new Error(
        `${filePath} sets "${key}", which can't be inherited. Allowed keys: ${Object.keys(keys).join(', ')}.`,
      );
    }
    const check = TYPE_CHECKS[keys[key].type];
    if (check && !check.test(value[key])) {
      throw new Error(`${filePath} must set "${key}" as ${check.description}.`);
    }
  }

  cache.set(filePath, { mtimeMs, value });
  return value;
}

function isInside(dir, root) {
  const rel = path.relative(root, dir);
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

// The defaults files between the doc's folder and rootDir, outermost first.
function collectDefaults(docPath, { rootDir, keys, cache }) {
  const root = path.resolve(rootDir);
  const layers = [];
  let dir = path.dirname(path.resolve(docPath));
  while (isInside(dir, root)) {
    const layer = loadDefaultsFile(path.join(dir, DEFAULTS_FILENAME), { keys, cache });
    if (layer) layers.unshift(layer);
    if (dir === root) break;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return layers;
}

function tagIdentity(tag) {
  return typeof tag === 'string' ? tag : (tag && tag.label) || JSON.stringify(tag);
}

function unionValues(values) {
  const seen = new Set();
  return values.filter((item) => {
    const id = tagIdentity(item);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function asList(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Combine folder defaults with a page's own frontmatter.
 *
 * @param {string} docPath Path to the .md/.mdx file.
 * @param {Record<string, unknown>} frontMatter The page's own frontmatter.
 * @param {{ rootDir: string, keys?: Record<string, { merge: 'union' | 'replace', type?: 'list' | 'string' }>, cache?: Map }} options
 *   rootDir bounds the upward search for `_frontmatter.yml` files.
 * @returns {Record<string, unknown>} A new object; the input is not modified.
 */
function applyDefaults(docPath, frontMatter, { rootDir, keys = INHERITABLE_KEYS, cache = sharedCache }) {
  const layers = collectDefaults(docPath, { rootDir, keys, cache });
  if (layers.length === 0) return frontMatter;

  const result = { ...frontMatter };
  for (const [key, { merge }] of Object.entries(keys)) {
    const inherited = layers.filter((layer) => Object.hasOwn(layer, key));
    if (inherited.length === 0) continue;

    if (merge === 'union') {
      result[key] = unionValues([...inherited.flatMap((layer) => asList(layer[key])), ...asList(frontMatter[key])]);
    } else if (!Object.hasOwn(frontMatter, key)) {
      result[key] = inherited[inherited.length - 1][key];
    }
  }
  return result;
}

module.exports = { DEFAULTS_FILENAME, INHERITABLE_KEYS, applyDefaults, collectDefaults, loadDefaultsFile };
