import { useEffect, useState } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { hasDocsAnalyticsConsent } from '@site/src/utils/analyticsConsent';

const CONSENT_CHANGE_EVENT = 'temporal:consentchange';

// Reads the shared `.temporal.io` consent cookie, falling back to the banner's
// localStorage record for opt-out regions that never write the cookie. See
// src/utils/analyticsConsent.js.
const readConsent = () => (ExecutionEnvironment.canUseDOM ? hasDocsAnalyticsConsent() : false);

// Whether the visitor currently grants analytics consent, kept in sync with
// the consent-banner element's CONSENT_CHANGE_EVENT so Algolia Insights turns
// on/off without a page reload.
export function useAnalyticsConsent(): boolean {
  const [hasConsent, setHasConsent] = useState(readConsent);

  useEffect(() => {
    const onConsentChange = () => setHasConsent(readConsent());
    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
  }, []);

  return hasConsent;
}
