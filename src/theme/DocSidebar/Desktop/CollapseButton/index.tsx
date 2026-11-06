import React, { type ReactNode } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { hasAnalyticsConsent, readConsentFromDocumentCookie } from '@temporalio-web/consent-banner/core';
import CollapseButton from '@theme-original/DocSidebar/Desktop/CollapseButton';
import type CollapseButtonType from '@theme/DocSidebar/Desktop/CollapseButton';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof CollapseButtonType>;

const hasConsent = () => ExecutionEnvironment.canUseDOM && hasAnalyticsConsent(readConsentFromDocumentCookie());

// This control is a <button> that toggles local UI state, not a navigation
// link, so Amplitude autocapture (which attributes clicks by href/text) can't
// reliably identify it. Fire an explicit event instead, same pattern as
// trackSearchEvent.ts.
export default function CollapseButtonWrapper(props: Props): ReactNode {
  const handleClick: React.MouseEventHandler = (event) => {
    if (hasConsent() && window.amplitude) {
      window.amplitude.track('Sidebar Collapsed');
    }
    props.onClick(event);
  };

  return <CollapseButton {...props} onClick={handleClick} />;
}
