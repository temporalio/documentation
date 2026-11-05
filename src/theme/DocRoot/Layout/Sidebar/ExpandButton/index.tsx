import React, { type ReactNode } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { hasAnalyticsConsent, readConsentFromDocumentCookie } from '@temporalio-web/consent-banner/core';
import ExpandButton from '@theme-original/DocRoot/Layout/Sidebar/ExpandButton';
import type ExpandButtonType from '@theme/DocRoot/Layout/Sidebar/ExpandButton';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof ExpandButtonType>;

const hasConsent = () => ExecutionEnvironment.canUseDOM && hasAnalyticsConsent(readConsentFromDocumentCookie());

// This control is a <div role="button"> that toggles local UI state, not a
// navigation link, so Amplitude autocapture (which attributes clicks by
// href/text) can't reliably identify it. Fire an explicit event instead, same
// pattern as CollapseButton and trackSearchEvent.ts.
export default function ExpandButtonWrapper(props: Props): ReactNode {
  const toggleSidebar = () => {
    if (hasConsent() && window.amplitude) {
      window.amplitude.track('Sidebar Expanded');
    }
    props.toggleSidebar();
  };

  return <ExpandButton {...props} toggleSidebar={toggleSidebar} />;
}
