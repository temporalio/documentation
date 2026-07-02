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
    // Docusaurus treats a doc named the same as its parent folder (e.g.
    // `event-history/event-history.mdx`) as that folder's index page, the
    // same way it treats `index.mdx`/`README.mdx`. Mirror that convention
    // here so the generated .md file lands at the same route as the real page.
    if (id === 'index' || id === path.basename(dir)) return dir;
    return `${dir}/${id}`;
  }

  return {
    name: 'markdown-pages',

    async postBuild({ outDir }) {
      // The transformer is ESM (zero-dep, also unit-tested standalone); this
      // plugin is CommonJS, so load it via dynamic import. See
      // scripts/mdx-to-md.mjs and MARKDOWN_PIPELINE.md.
      const { pathToFileURL } = require('url');
      const { transformMdx } = await import(
        pathToFileURL(path.join(__dirname, '../../scripts/mdx-to-md.mjs')).href
      );

      const files = walkDir(docsDir);
      let generated = 0;
      let excluded = 0;
      let totalWarnings = 0;

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
          // Transform MDX → clean Markdown (flatten tabs, resolve components,
          // strip imports/JSX) rather than serving the raw source.
          const { markdown, warnings } = transformMdx(raw, {
            sourceFile: path.relative(context.siteDir, filePath),
            projectRoot: context.siteDir,
          });
          fs.writeFileSync(outputPath, markdown + '\n');
          totalWarnings += warnings.length;
          generated++;
        }
      }

      console.log(
        `[markdown-pages] Generated ${generated} clean markdown files, ${excluded} excluded` +
          (totalWarnings ? `, ${totalWarnings} transform warnings` : '')
      );
    },
  };
};
