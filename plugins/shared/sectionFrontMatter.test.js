const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  FRONTMATTER_FILENAME,
  collectSectionFrontMatter,
  mergeWithSectionFrontMatter,
} = require('./sectionFrontMatter');

describe('sectionFrontMatter', () => {
  /** @type {string} */
  let root;

  before(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'section-fm-'));
    fs.mkdirSync(path.join(root, 'docs', 'develop', 'java', 'activities'), { recursive: true });
    fs.writeFileSync(
      path.join(root, 'docs', 'develop', 'java', FRONTMATTER_FILENAME),
      'sdks: [java]\ncontent_type: how-to\n',
    );
    fs.writeFileSync(
      path.join(root, 'docs', 'develop', 'java', 'activities', FRONTMATTER_FILENAME),
      'content_type: reference\n',
    );
    fs.writeFileSync(path.join(root, 'docs', FRONTMATTER_FILENAME), 'section: docs\n');
    fs.writeFileSync(
      path.join(root, 'docs', 'develop', 'java', 'activities', 'timeouts.mdx'),
      '---\ntitle: Timeouts\nsdks: [rust]\n---\n\nBody\n',
    );
    fs.writeFileSync(
      path.join(root, 'docs', 'develop', 'java', 'index.mdx'),
      '---\ntitle: Java SDK\n---\n\nBody\n',
    );
  });

  after(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  it('merges ancestor defaults with nearer folders winning', () => {
    const filePath = path.join(root, 'docs', 'develop', 'java', 'activities', 'timeouts.mdx');
    assert.deepEqual(collectSectionFrontMatter(filePath, { stopDir: root }), {
      section: 'docs',
      sdks: ['java'],
      content_type: 'reference',
    });
  });

  it('lets page front matter replace inherited keys entirely', () => {
    const filePath = path.join(root, 'docs', 'develop', 'java', 'activities', 'timeouts.mdx');
    const merged = mergeWithSectionFrontMatter(
      filePath,
      { title: 'Timeouts', sdks: ['rust'] },
      { stopDir: root },
    );
    assert.deepEqual(merged, {
      section: 'docs',
      sdks: ['rust'],
      content_type: 'reference',
      title: 'Timeouts',
    });
  });

  it('applies folder defaults when the page omits those keys', () => {
    const filePath = path.join(root, 'docs', 'develop', 'java', 'index.mdx');
    const merged = mergeWithSectionFrontMatter(filePath, { title: 'Java SDK' }, { stopDir: root });
    assert.deepEqual(merged, {
      section: 'docs',
      sdks: ['java'],
      content_type: 'how-to',
      title: 'Java SDK',
    });
  });

  it('returns {} when no _frontmatter.yml exists on the path', () => {
    const orphanDir = path.join(root, 'orphan');
    fs.mkdirSync(orphanDir, { recursive: true });
    const filePath = path.join(orphanDir, 'page.mdx');
    fs.writeFileSync(filePath, '---\ntitle: Orphan\n---\n');
    assert.deepEqual(collectSectionFrontMatter(filePath, { stopDir: orphanDir }), {});
  });

  it('does not walk above stopDir', () => {
    const filePath = path.join(root, 'docs', 'develop', 'java', 'index.mdx');
    const docsOnly = collectSectionFrontMatter(filePath, {
      stopDir: path.join(root, 'docs'),
    });
    assert.equal(docsOnly.section, 'docs');
    assert.deepEqual(docsOnly.sdks, ['java']);

    // stop at java/ — docs/_frontmatter.yml must not apply
    const javaOnly = collectSectionFrontMatter(filePath, {
      stopDir: path.join(root, 'docs', 'develop', 'java'),
    });
    assert.equal(javaOnly.section, undefined);
    assert.deepEqual(javaOnly.sdks, ['java']);
  });

  it('rejects non-mapping YAML', () => {
    const badDir = path.join(root, 'bad');
    fs.mkdirSync(badDir, { recursive: true });
    fs.writeFileSync(path.join(badDir, FRONTMATTER_FILENAME), '- just\n- a\n- list\n');
    const filePath = path.join(badDir, 'page.mdx');
    fs.writeFileSync(filePath, '---\ntitle: Bad\n---\n');
    assert.throws(
      () => collectSectionFrontMatter(filePath, { stopDir: badDir }),
      /must be a YAML mapping/,
    );
  });
});
