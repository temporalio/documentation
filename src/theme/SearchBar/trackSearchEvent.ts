import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { hasDocsAnalyticsConsent } from '@site/src/utils/analyticsConsent';

type SendEvent = (eventType: string, hit: any, eventName: string) => void;

// Fires the same click event to both Algolia insights (via InstantSearch's
// sendEvent, so it carries queryID/position) and Amplitude, so the two
// pipelines stay in sync without duplicating call sites.
export function trackSearchClick(
  sendEvent: SendEvent,
  hit: any,
  eventName = 'Search Result Clicked',
  extra?: Record<string, unknown>
): void {
  if (!hasDocsAnalyticsConsent()) return;

  sendEvent('click', hit, eventName);

  if (ExecutionEnvironment.canUseDOM && window.amplitude) {
    window.amplitude.track(eventName, {
      objectID: hit.objectID,
      url: hit.url,
      ...extra,
    });
  }
}

// Algolia's own Search Analytics dashboard already computes a no-results
// rate from the raw queries, so this is Amplitude-only — there's no
// objectID for a zero-result search to attach an insights event to.
export function trackNoResults(query: string): void {
  if (hasDocsAnalyticsConsent() && window.amplitude) {
    window.amplitude.track('Search No Results', { query });
  }
}
