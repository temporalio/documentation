import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import aa from 'search-insights';
import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY } from '../../constants/algolia';

if (ExecutionEnvironment.canUseDOM) {
  aa('init', {
    appId: ALGOLIA_APP_ID,
    apiKey: ALGOLIA_SEARCH_API_KEY,
    // No cookie: still correlates events within a session (search-insights
    // falls back to an in-memory anonymous token), just doesn't persist
    // across reloads/new tabs.
    useCookie: false,
  });
}

export default aa;
