import React, { useEffect, type ReactNode } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { hasAnalyticsConsent, readConsentFromDocumentCookie } from '@temporalio-web/consent-banner/core';

// Importing the package registers <temporal-consent-banner> (client-side only;
// the element itself no-ops under SSR, but customElements isn't defined there).
if (ExecutionEnvironment.canUseDOM) {
  import('@temporalio-web/consent-banner');
}

// docs.temporal.io is a *.temporal.io subdomain, so the element's default
// geo-endpoint (consent.temporal.io) already shares the apex consent cookie
// with the rest of Temporal's properties — no geo-endpoint override needed.
// A reader who follows a suggested page from a 404 arrives with utm_source=docs-404
// (see api/_not-found-lib.js). Record that once, then remove the parameters so
// a copied address stays clean. Runs on full page loads only, which is how
// every suggestion link is followed.
function trackSuggestionFollowed(): void {
  const params = new URLSearchParams(window.location.search);
  if (params.get('utm_source') !== 'docs-404') return;

  if (hasAnalyticsConsent(readConsentFromDocumentCookie()) && window.amplitude) {
    window.amplitude.track('Docs 404 Suggestion Followed', {
      url: window.location.origin + window.location.pathname,
      rank: Number(params.get('utm_content')) || null,
      referrer: document.referrer,
    });
  }

  for (const key of [...params.keys()]) {
    if (key.startsWith('utm_')) params.delete(key);
  }
  const search = params.toString();
  window.history.replaceState(
    window.history.state,
    '',
    window.location.pathname + (search ? `?${search}` : '') + window.location.hash,
  );
}

export default function Root({ children }: { children: ReactNode }): ReactNode {
  useEffect(() => {
    try {
      trackSuggestionFollowed();
    } catch {
      // Tracking must never break a page.
    }
  }, []);

  return (
    <>
      {children}
      <temporal-consent-banner />
    </>
  );
}
