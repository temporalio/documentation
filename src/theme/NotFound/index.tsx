import React, { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { hasAnalyticsConsent, readConsentFromDocumentCookie } from '@temporalio-web/consent-banner/core';
import NotFound from '@theme-original/NotFound';
import type NotFoundType from '@theme/NotFound';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof NotFoundType>;

const hasConsent = () => ExecutionEnvironment.canUseDOM && hasAnalyticsConsent(readConsentFromDocumentCookie());

export default function NotFoundWrapper(props: Props): JSX.Element {
  useEffect(() => {
    if (hasConsent() && window.amplitude) {
      window.amplitude.track('Docs Page Not Found', {
        url: window.location.href,
        referrer: document.referrer,
      });
    }
  }, []);

  return <NotFound {...props} />;
}
