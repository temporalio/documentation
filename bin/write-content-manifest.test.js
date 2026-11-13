const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { buildManifest } = require('./write-content-manifest');

// Builds the manifest from a throwaway site tree, so the test doesn't depend on
// the real docs/ content.

let siteDir;

function write(relPath, content) {
  const full = path.join(siteDir, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

const page = (frontmatter) => `---\n${frontmatter}\n---\n\nBody\n`;

before(() => {
  siteDir = fs.mkdtempSync(path.join(os.tmpdir(), 'content-manifest-'));
  write('docs/workflows.mdx', page('id: workflows\ntitle: Workflows\ndescription: What a Workflow is.'));
  write('docs/develop/python/_frontmatter.yml', 'section_title: Python SDK\n');
  write('docs/develop/python/versioning.mdx', page('title: Versioning\ndescription: Patch Workflows.'));
  write('docs/guides/index.mdx', page('id: guides-index\nslug: /guides\ntitle: Guides\ndescription: All guides.'));
  write('docs/draft-page.mdx', page('title: Draft\ndescription: Not built.\ndraft: true'));
  write('docs/hidden.mdx', page('title: Hidden\ndescription: Off the sidebar.\nunlisted: true'));
  write('docs/no-description.mdx', page('title: No description'));
  write('docs/_partial.mdx', page('title: Partial\ndescription: Only imported.'));
  write('ai-cookbook/recipe.mdx', page('title: Recipe\ndescription: A recipe.'));
});

after(() => fs.rmSync(siteDir, { recursive: true, force: true }));

describe('buildManifest', () => {
  const targets = [
    { docsDir: 'docs', routeBasePath: '/' },
    { docsDir: 'ai-cookbook', routeBasePath: 'ai/cookbook' },
  ];

  it('keys pages by URL path with title and description', () => {
    const manifest = buildManifest({ siteDir, targets });
    assert.deepStrictEqual(manifest['/workflows'], { title: 'Workflows', description: 'What a Workflow is.' });
    assert.deepStrictEqual(manifest['/guides'], { title: 'Guides', description: 'All guides.' });
  });

  it('appends the folder section title, as the site title does', () => {
    const manifest = buildManifest({ siteDir, targets });
    assert.strictEqual(manifest['/develop/python/versioning'].title, 'Versioning - Python SDK');
  });

  it('includes pages from the cookbook target under its route base', () => {
    const manifest = buildManifest({ siteDir, targets });
    assert.ok(manifest['/ai/cookbook/recipe']);
  });

  it('leaves out drafts, unlisted pages, partials, and pages with no description', () => {
    const urls = Object.keys(buildManifest({ siteDir, targets }));
    for (const url of ['/draft-page', '/hidden', '/no-description', '/_partial']) {
      assert.ok(!urls.includes(url), url);
    }
  });
});
