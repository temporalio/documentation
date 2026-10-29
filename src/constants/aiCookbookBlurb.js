// Single source of the /ai/cookbook landing page blurb, used by
// src/components/Cookbook/Home/CookbookHome.tsx for the visible hero
// paragraph. ai-cookbook/index.mdx duplicates this exact text in its own
// `description` front matter (frontmatter can't reference a JS constant) —
// keep the two in sync if this ever changes.
module.exports = {
  AI_COOKBOOK_BLURB:
    'Step-by-step recipes for building reliable AI systems with Temporal, covering LLM integrations, agentic loops, tool calling, and production patterns.',
};
