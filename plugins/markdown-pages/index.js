const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = function markdownPagesPlugin(context, options = {}) {
  const docsDir = path.resolve(context.siteDir, options.docsDir || 'docs');
  const routeBasePath = options.routeBasePath || '/';

  function walkDir(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).flatMap((name) => {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) return walkDir(full);
      if (/\.(md|mdx)$/i.test(name)) return [full];
      return [];
    });
  }

  function resolveUrlPath(filePath, frontmatter) {
    if (frontmatter.slug) {
      const slug = frontmatter.slug.replace(/^\/+/, '').replace(/\/+$/, '');
      return slug || 'index';
    }
    const rel = path.relative(docsDir, filePath).replace(/\\/g, '/');
    const withoutExt = rel.replace(/\.(md|mdx)$/i, '');
    const id = frontmatter.id || path.basename(withoutExt);
    const dir = path.dirname(withoutExt);
    if (dir === '.') return id === 'index' ? 'index' : id;
    if (id === 'index') return dir;
    return `${dir}/${id}`;
  }

  return {
    name: 'markdown-pages',

    async postBuild({ outDir }) {
      const files = walkDir(docsDir);
      let generated = 0;
      let excluded = 0;

      for (const filePath of files) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter } = matter(raw);

        const urlPath = resolveUrlPath(filePath, frontmatter);
        const outputPath = path.join(outDir, urlPath + '.md');

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });

        if (frontmatter.llm_exclude) {
          fs.writeFileSync(outputPath, frontmatter.llm_exclude + '\n');
          excluded++;
        } else {
          fs.writeFileSync(outputPath, raw);
          generated++;
        }
      }

      console.log(
        `[markdown-pages] Generated ${generated} markdown files, ${excluded} excluded`
      );
    },
  };
};
