const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { walkDir } = require('./docsRouting');

let root;

function write(relPath, content = '') {
  const full = path.join(root, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

function walked() {
  return walkDir(root)
    .map((f) => path.relative(root, f).split(path.sep).join('/'))
    .sort();
}

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'docs-routing-'));
});

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

describe('walkDir', () => {
  it('returns routed .md and .mdx pages', () => {
    write('index.mdx');
    write('develop/go/timers.mdx');
    write('glossary.md');
    write('develop/go/_frontmatter.yml');
    assert.deepStrictEqual(walked(), ['develop/go/timers.mdx', 'glossary.md', 'index.mdx']);
  });

  it('skips underscore-prefixed partial files', () => {
    write('cloud/permissions.mdx');
    write('cloud/_permissions_table.mdx');
    assert.deepStrictEqual(walked(), ['cloud/permissions.mdx']);
  });

  it('skips every file inside an underscore-prefixed folder', () => {
    write('develop/go/continue-as-new.mdx');
    write('develop/_shared/continue-as-new/when.mdx');
    assert.deepStrictEqual(walked(), ['develop/go/continue-as-new.mdx']);
  });

  it('judges exclusion relative to the walked root, not its parents', () => {
    root = path.join(root, '_tmp-parent', 'docs');
    write('page.mdx');
    assert.deepStrictEqual(walked(), ['page.mdx']);
  });
});
