const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = function markdownPagesPlugin(context, options = {}) {
  const docsDir = path.resolve(context.siteDir, options.docsDir || 'docs');
  const routeBasePath = options.routeBasePath || '/';
  const llmsTxt = options.llmsTxt || null;

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

  function findSection(page, sections) {
    const urlPath = page.urlPath;
    for (const section of sections) {
      if (section.pages && section.pages.some(p => urlPath === p)) {
        return section;
      }
      if (section.autoDiscoverSubsections && page.relPath) {
        const prefix = section.autoDiscoverSubsections + '/';
        if (page.relPath.startsWith(prefix)) {
          return section;
        }
      }
    }
    let bestMatch = null;
    let bestLength = 0;
    for (const section of sections) {
      if (!section.path) continue;
      const prefix = section.path;
      if (
        (urlPath === prefix || urlPath.startsWith(prefix + '/')) &&
        prefix.length > bestLength
      ) {
        bestMatch = section;
        bestLength = prefix.length;
      }
    }
    return bestMatch;
  }

  function expandSections(sections, pages) {
    const expanded = [];
    for (const section of sections) {
      if (section.autoDiscover) {
        const prefix = section.autoDiscover;
        const subdirs = new Set();
        for (const page of pages) {
          if (page.urlPath.startsWith(prefix + '/')) {
            const rest = page.urlPath.slice(prefix.length + 1);
            const subdir = rest.split('/')[0];
            if (rest.includes('/')) {
              subdirs.add(subdir);
            }
          }
        }
        const sorted = [...subdirs].sort();
        for (const subdir of sorted) {
          const sdkPath = `${prefix}/${subdir}`;
          const indexPage = pages.find(
            p => p.urlPath === sdkPath || p.urlPath === sdkPath + '/index'
          );
          const sdkTitle = indexPage ? indexPage.title : subdir;
          expanded.push({
            path: sdkPath,
            title: sdkTitle,
            _autoDiscovered: true,
            _groupTitle: section.title,
            _groupDescription: section.description || '',
          });
        }
      } else {
        expanded.push(section);
      }
    }
    return expanded;
  }

  function generateLlmsTxtFiles(outDir, pages) {
    const { siteUrl, title, description, rootContent, excludePaths = [] } = llmsTxt;
    const sections = expandSections(llmsTxt.sections, pages);
    const baseUrl = siteUrl.replace(/\/+$/, '');

    function sectionKey(section) {
      return section.path || section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const sectionBuckets = new Map();
    for (const section of sections) {
      sectionBuckets.set(sectionKey(section), []);
    }
    const otherPages = [];

    for (const page of pages) {
      if (excludePaths.some(p => page.urlPath === p || page.urlPath.startsWith(p + '/'))) {
        continue;
      }
      const section = findSection(page, sections);
      if (section) {
        sectionBuckets.get(sectionKey(section)).push(page);
      } else {
        otherPages.push(page);
      }
    }

    for (const section of sections) {
      if (section.inline) continue;
      const key = sectionKey(section);
      const bucket = sectionBuckets.get(key);
      bucket.sort((a, b) => a.urlPath.localeCompare(b.urlPath));
      const lines = [`# ${section.title}`, '', `> ${section.description}`, ''];
      for (const page of bucket) {
        lines.push(`- [${page.title}](${baseUrl}/${page.urlPath}.md)`);
      }
      lines.push('');
      const outputPath = path.join(outDir, key, 'llms.txt');
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, lines.join('\n'));
    }

    const rootLines = [`# ${title}`, '', `> ${description}`, ''];
    if (rootContent) {
      rootLines.push(rootContent, '');
    }

    const inlineSections = sections.filter(s => s.inline);
    const linkedSections = sections.filter(s => !s.inline);

    for (const section of inlineSections) {
      const key = sectionKey(section);
      const bucket = sectionBuckets.get(key);
      rootLines.push(`## ${section.title}`, '');
      if (section.description) {
        rootLines.push(section.description, '');
      }
      if (section.autoDiscoverSubsections) {
        const prefix = section.autoDiscoverSubsections + '/';
        const subGroups = new Map();
        for (const page of bucket) {
          if (!page.relPath || !page.relPath.startsWith(prefix)) continue;
          const rest = page.relPath.slice(prefix.length);
          const parts = rest.split('/');
          if (parts.length < 2) continue;
          const subdir = parts[0];
          if (!subGroups.has(subdir)) subGroups.set(subdir, []);
          subGroups.get(subdir).push(page);
        }
        const sortedDirs = [...subGroups.keys()].sort();
        for (const subdir of sortedDirs) {
          const subPages = subGroups.get(subdir);
          const normalized = subdir.replace(/-/g, '');
          const indexPage =
            subPages.find(p => {
              const filename = p.relPath.split('/').pop().replace(/\.(md|mdx)$/i, '');
              return filename === 'index' || filename === subdir;
            }) ||
            subPages.find(p => {
              const filename = p.relPath.split('/').pop().replace(/\.(md|mdx)$/i, '');
              return filename === normalized || filename.endsWith('-overview');
            });
          const subTitle = indexPage
            ? (indexPage.sidebarLabel || indexPage.title)
            : subdir;
          subPages.sort((a, b) => a.urlPath.localeCompare(b.urlPath));
          rootLines.push(`### ${subTitle}`, '');
          for (const page of subPages) {
            rootLines.push(`- [${page.title}](${baseUrl}/${page.urlPath}.md)`);
          }
          rootLines.push('');
        }
        const ungrouped = bucket.filter(p => {
          if (!p.relPath || !p.relPath.startsWith(prefix)) return true;
          const rest = p.relPath.slice(prefix.length);
          return rest.split('/').length < 2;
        });
        if (ungrouped.length > 0) {
          ungrouped.sort((a, b) => a.urlPath.localeCompare(b.urlPath));
          rootLines.push(`### Other`, '');
          for (const page of ungrouped) {
            rootLines.push(`- [${page.title}](${baseUrl}/${page.urlPath}.md)`);
          }
          rootLines.push('');
        }
      } else {
        bucket.sort((a, b) => a.urlPath.localeCompare(b.urlPath));
        for (const page of bucket) {
          rootLines.push(`- [${page.title}](${baseUrl}/${page.urlPath}.md)`);
        }
        rootLines.push('');
      }
    }

    if (linkedSections.length > 0) {
      let currentGroup = null;
      for (const section of linkedSections) {
        const group = section._groupTitle || 'Sections';
        if (group !== currentGroup) {
          if (currentGroup !== null) rootLines.push('');
          rootLines.push(`## ${group}`, '');
          if (section._groupDescription) {
            rootLines.push(section._groupDescription, '');
          }
          currentGroup = group;
        }
        const desc = section.description ? `: ${section.description}` : '';
        rootLines.push(
          `- [${section.title}](${baseUrl}/${sectionKey(section)}/llms.txt)${desc}`
        );
      }
      rootLines.push('');
    }

    otherPages.sort((a, b) => a.urlPath.localeCompare(b.urlPath));
    if (otherPages.length > 0) {
      rootLines.push('## Other', '');
      for (const page of otherPages) {
        rootLines.push(`- [${page.title}](${baseUrl}/${page.urlPath}.md)`);
      }
      rootLines.push('');
    }

    const rootOutputPath = path.join(outDir, 'llms.txt');
    fs.writeFileSync(rootOutputPath, rootLines.join('\n'));

    const rootSize = Buffer.byteLength(rootLines.join('\n'), 'utf8');
    console.log(
      `[markdown-pages] Generated root llms.txt (${rootSize} bytes) and ${sections.length} section llms.txt files`
    );
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
      const pages = [];

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

          if (llmsTxt && frontmatter.title) {
            pages.push({
              urlPath,
              title: frontmatter.title,
              sidebarLabel: frontmatter.sidebar_label || '',
              description: frontmatter.description || '',
              relPath: path.relative(docsDir, filePath).replace(/\\/g, '/'),
            });
          }
        }
      }

      console.log(
        `[markdown-pages] Generated ${generated} clean markdown files, ${excluded} excluded` +
          (totalWarnings ? `, ${totalWarnings} transform warnings` : '')
      );

      if (llmsTxt) {
        generateLlmsTxtFiles(outDir, pages);
      }
    },
  };
};
