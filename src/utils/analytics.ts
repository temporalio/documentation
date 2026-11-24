import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { hasDocsAnalyticsConsent } from './analyticsConsent';

export { hasDocsAnalyticsConsent };

// Sends an Amplitude event when the reader has given analytics consent and
// the Amplitude SDK has loaded. Tracking must never break the control that
// calls it, so any error is swallowed.
export function trackEvent(eventName: string, properties?: Record<string, unknown>): void {
  if (!ExecutionEnvironment.canUseDOM) return;
  try {
    if (hasDocsAnalyticsConsent() && window.amplitude) {
      window.amplitude.track(eventName, properties);
    }
  } catch {
    // Ignore: analytics is best effort.
  }
}
