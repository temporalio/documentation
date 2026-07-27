const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { walkDir, resolveUrlPath: resolveUrlPathShared } = require('../shared/docsRouting');

// Accepts either a single {docsDir, routeBasePath} (back-compat) or a
// `targets` array, so one plugin instance can walk multiple docs plugin
// instances that live at different routeBasePaths (e.g. the main docs/ tree
// at '/' plus ai-cookbook/ at '/ai-cookbook').
function normalizeTargets(options) {
  if (Array.isArray(options.targets) && options.targets.length) {
    return options.targets;
  }
  return [{ docsDir: options.docsDir || 'docs', routeBasePath: options.routeBasePath }];
}

module.exports = function markdownPagesPlugin(context, options = {}) {
  const targets = normalizeTargets(options).map(({ docsDir, routeBasePath }) => ({
    docsDir: path.resolve(context.siteDir, docsDir),
    routeBasePath,
  }));

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

      let generated = 0;
      let excluded = 0;
      let totalWarnings = 0;

      for (const { docsDir, routeBasePath } of targets) {
        const files = walkDir(docsDir);

        for (const filePath of files) {
          const raw = fs.readFileSync(filePath, 'utf8');
          const { data: frontmatter } = matter(raw);

          const urlPath = resolveUrlPathShared(docsDir, filePath, frontmatter, routeBasePath);
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
      }

      console.log(
        `[markdown-pages] Generated ${generated} clean markdown files, ${excluded} excluded` +
          (totalWarnings ? `, ${totalWarnings} transform warnings` : '')
      );
    },
  };
};
