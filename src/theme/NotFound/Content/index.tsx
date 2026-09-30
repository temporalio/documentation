import React, { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { hasAnalyticsConsent, readConsentFromDocumentCookie } from '@temporalio-web/consent-banner/core';
import NotFoundContent from '@theme-original/NotFound/Content';
import type NotFoundContentType from '@theme/NotFound/Content';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof NotFoundContentType>;

const hasConsent = () => ExecutionEnvironment.canUseDOM && hasAnalyticsConsent(readConsentFromDocumentCookie());

export default function NotFoundContentWrapper(props: Props): JSX.Element {
  useEffect(() => {
    if (hasConsent() && window.amplitude) {
      window.amplitude.track('Docs Page Not Found', {
        url: window.location.href,
        referrer: document.referrer,
      });
    }
  }, []);

  return <NotFoundContent {...props} />;
}
