// Single source of the /ai-cookbook landing page blurb. Shared by
// src/components/Cookbook/Home/CookbookHome.tsx (visible hero paragraph),
// src/pages/ai-cookbook.tsx (meta description and og:description), and
// plugins/cookbook-index/index.js (the generated ai-cookbook.md blockquote and
// the og:image card). Plain CommonJS because the plugin is a build-time script
// that can't import a .tsx module — same convention as aiCookbookOgImage.js.
module.exports = {
  AI_COOKBOOK_BLURB:
    'Step-by-step recipes for building reliable AI systems with Temporal, covering LLM integrations, agentic loops, tool calling, and production patterns.',
};
