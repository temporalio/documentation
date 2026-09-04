// Single source of truth for the Algolia app/index used by both the search
// UI (docusaurus.config.js theme config) and the client-side search-insights
// setup (src/theme/SearchBar/algoliaInsights.ts, src/pages/search.tsx).
module.exports = {
  ALGOLIA_APP_ID: 'T5D6KNJCQS',
  ALGOLIA_SEARCH_API_KEY: '7f9927fa05ed55464439db9097050857',
  ALGOLIA_INDEX_NAME: 'temporal-search-experiment',
};
