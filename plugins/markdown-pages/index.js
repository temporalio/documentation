const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { walkDir, resolveUrlPath: resolveUrlPathShared } = require('../shared/docsRouting');

module.exports = function markdownPagesPlugin(context, options = {}) {
  const docsDir = path.resolve(context.siteDir, options.docsDir || 'docs');
  const routeBasePath = options.routeBasePath || '/';

  const resolveUrlPath = (filePath, frontmatter) => resolveUrlPathShared(docsDir, filePath, frontmatter);

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
