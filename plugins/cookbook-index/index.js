const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

module.exports = function cookbookIndexPlugin(context, options = {}) {
console.log('[cookbook-index] init with docsDir:', options.docsDir);
  console.log('[cookbook-index] resolved docsDir:', path.isAbsolute(options.docsDir)
    ? options.docsDir
    : path.join(context.siteDir, options.docsDir || 'cookbook'));  
  const docsDir = path.isAbsolute(options.docsDir)
    ? options.docsDir
    : path.join(context.siteDir, options.docsDir || 'cookbook');

  const routeBasePath = options.routeBasePath || 'cookbook';

  function walk(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`[cookbook-index] walk(): directory not found -> ${dir}`);
    return [];
  }
  const entries = fs.readdirSync(dir);
  return entries.flatMap((name) => {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) return walk(full);
    if (/\.(md|mdx)$/i.test(name)) {
      return [full];
    }
    return [];
  });
}

  function readItems() {
  const files = walk(docsDir);

  const items = files
    .map((file) => {
      const src = fs.readFileSync(file, 'utf8');
      const { data } = matter(src);

      const rel = path.relative(docsDir, file).replace(/\\/g, '/');
      const base = rel.replace(/\.(md|mdx)$/i, '');

      // Skip the cookbook index doc only
      if (data.id === 'cookbook' || /(^|\/)index$/i.test(base)) {
        return null; // will be removed by .filter(Boolean)
      }

      const id = data.id || base;
      const slug = (data.slug || base).replace(/^\/+/, '');
      const title = data.title || id;
      const description = data.description || '';
      const tags = Array.isArray(data.tags)
        ? data.tags.map((t) => (typeof t === 'string' ? t : t?.label || t?.name || t?.title)).filter(Boolean)
        : [];
      const permalink = `/${routeBasePath}/${slug}`.replace(/\/+/g, '/');

      const item = { id, title, description, tags, permalink };

      return item; // ← IMPORTANT: actually return the object
    })
    .filter(Boolean); // remove null/undefined entries

  return items;
}

  return {
    name: 'cookbook-index',
    getPathsToWatch() {
      return [`${docsDir}/**/*.{md,mdx}`];
    },
    async loadContent() {
      return { items: readItems() };
    },
    async contentLoaded({ content, actions }) {
      const { createData, setGlobalData } = actions;
      await createData('cookbook.index.json', JSON.stringify(content.items, null, 2));
      setGlobalData({ items: content.items });
    },
  };

  
};
