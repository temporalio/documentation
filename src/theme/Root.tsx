import React, { type ReactNode } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Importing the package registers <temporal-consent-banner> (client-side only;
// the element itself no-ops under SSR, but customElements isn't defined there).
if (ExecutionEnvironment.canUseDOM) {
  import('@temporalio-web/consent-banner');
}

// docs.temporal.io is a *.temporal.io subdomain, so the element's default
// geo-endpoint (consent.temporal.io) already shares the apex consent cookie
// with the rest of Temporal's properties — no geo-endpoint override needed.
export default function Root({ children }: { children: ReactNode }): ReactNode {
  return (
    <>
      {children}
      <temporal-consent-banner />
    </>
  );
}
