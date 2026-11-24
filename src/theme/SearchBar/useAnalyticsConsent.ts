import { useEffect, useState } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { hasAnalyticsConsent, readConsentFromDocumentCookie } from '@temporalio-web/consent-banner/core';

const CONSENT_CHANGE_EVENT = 'temporal:consentchange';

// The consent cookie is shared across the `.temporal.io` apex domain, so a decision
// made on temporal.io (or another docs.temporal.io session) already applies
// here. Read it directly rather than waiting on this page's own banner.
const readConsent = () =>
  ExecutionEnvironment.canUseDOM ? hasAnalyticsConsent(readConsentFromDocumentCookie()) : false;

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
