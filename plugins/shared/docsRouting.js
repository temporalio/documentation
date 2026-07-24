const fs = require('fs');
const path = require('path');

// Shared by plugins/markdown-pages and plugins/og-image, which both need to
// walk the same docs tree and independently re-derive the route Docusaurus
// will build each file to. Keeping this in one place means the two plugins
// can't silently drift apart on what counts as a routed doc page.

function walkDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) return walkDir(full);
    if (/\.(md|mdx)$/i.test(name)) return [full];
    return [];
  });
}

// Mirrors Docusaurus's own route resolution (front-matter `slug` takes
// precedence, then `id`, then the file path) so callers land on the same
// route Docusaurus actually builds the page at.
function resolveUrlPath(docsDir, filePath, frontmatter) {
  if (frontmatter.slug) {
    const slug = frontmatter.slug.replace(/^\/+/, '').replace(/\/+$/, '');
    return slug || 'index';
  }
  const rel = path.relative(docsDir, filePath).replace(/\\/g, '/');
  const withoutExt = rel.replace(/\.(md|mdx)$/i, '');
  const id = frontmatter.id || path.basename(withoutExt);
  const dir = path.dirname(withoutExt);
  if (dir === '.') return id === 'index' ? 'index' : id;
  // Docusaurus treats a doc named the same as its parent folder (e.g.
  // `event-history/event-history.mdx`) as that folder's index page, the
  // same way it treats `index.mdx`/`README.mdx`. Mirror that convention
  // here so callers land on the same route as the real page.
  if (id === 'index' || id === path.basename(dir)) return dir;
  return `${dir}/${id}`;
}

module.exports = { walkDir, resolveUrlPath };
