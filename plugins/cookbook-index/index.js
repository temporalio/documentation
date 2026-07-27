const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { renderCard } = require('../og-image/render');
const { DEFAULT_FOOTER_TEXT } = require('../og-image/constants');
const { AI_COOKBOOK_OG_IMAGE_PATH } = require('../../src/constants/aiCookbookOgImage');

// Mirrors the hero blurb in src/components/Cookbook/Home/CookbookHome.tsx —
// duplicated (not imported) because that file is a .tsx React component and
// this is a plain build-time script. Keep these in sync if the copy changes.
const HERO_BLURB =
  'Step-by-step solutions that show you how to build reliable, production-ready AI systems with Temporal. Learn practical paradigms for prompts, tools, retries, and Workflow design.';

const HOME_TITLE = 'AI Cookbook';
// Deliberately the site default (not the 'AI COOKBOOK' footer the individual
// recipe cards use) — this card's title already says "AI Cookbook", so
// repeating it in the footer would be redundant.
const HOME_FOOTER_TEXT = DEFAULT_FOOTER_TEXT;

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

      const source = typeof data.source === 'string' ? data.source : undefined;

      const rawPriority = data.priority;
      let priority;
      if (typeof rawPriority === 'number') {
        priority = Number.isFinite(rawPriority) ? rawPriority : undefined;
      } else if (typeof rawPriority === 'string') {
        const parsed = Number(rawPriority);
        priority = Number.isFinite(parsed) ? parsed : undefined;
      }

      const item = { id, title, description, tags, permalink, source };
      if (typeof priority === 'number') {
        item.priority = priority;
      }

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

    // The /ai-cookbook landing page (src/pages/ai-cookbook.tsx) is a plain
    // React page, not an MDX doc, so it's invisible to plugins/markdown-pages
    // (which only walks docsDir trees). It links to a markdown alternate
    // (<link rel="alternate" type="text/markdown">) same as every recipe
    // page, so something has to actually produce that file — this plugin
    // already has the exact item list/sort needed, so it does it here rather
    // than duplicating cookbook-item-shaping logic elsewhere.
    async postBuild({ outDir }) {
      const items = readItems();
      const sorted = [...items].sort((a, b) => {
        const priorityA = typeof a.priority === 'number' ? a.priority : -Infinity;
        const priorityB = typeof b.priority === 'number' ? b.priority : -Infinity;
        if (priorityA !== priorityB) return priorityB - priorityA;
        return a.title.localeCompare(b.title);
      });

      const lines = [
        '# AI Cookbook',
        '',
        `> ${HERO_BLURB}`,
        '',
        ...sorted.map((item) => `- [${item.title}](${item.permalink}): ${item.description}`),
        '',
      ];

      fs.writeFileSync(path.join(outDir, 'ai-cookbook.md'), lines.join('\n'));
      console.log(`[cookbook-index] Generated ai-cookbook.md index (${sorted.length} recipe(s))`);

      // Same reasoning as the .md file above: this page is invisible to
      // plugins/og-image's docsDir walk, so nothing else renders it a card.
      const cardBuffer = await renderCard({ title: HOME_TITLE, description: HERO_BLURB, footerText: HOME_FOOTER_TEXT });
      const cardOutPath = path.join(outDir, AI_COOKBOOK_OG_IMAGE_PATH);
      fs.mkdirSync(path.dirname(cardOutPath), { recursive: true });
      fs.writeFileSync(cardOutPath, cardBuffer);
      console.log(`[cookbook-index] Generated ${AI_COOKBOOK_OG_IMAGE_PATH} og:image card`);
    },
  };
};
