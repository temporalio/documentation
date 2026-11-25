import React, { type ReactNode } from 'react';
import { hasDocsAnalyticsConsent } from '@site/src/utils/analyticsConsent';
import CollapseButton from '@theme-original/DocSidebar/Desktop/CollapseButton';
import type CollapseButtonType from '@theme/DocSidebar/Desktop/CollapseButton';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof CollapseButtonType>;

// This control is a <button> that toggles local UI state, not a navigation
// link, so Amplitude autocapture (which attributes clicks by href/text) can't
// reliably identify it. Fire an explicit event instead, same pattern as
// trackSearchEvent.ts.
export default function CollapseButtonWrapper(props: Props): ReactNode {
  const handleClick: React.MouseEventHandler = (event) => {
    if (hasDocsAnalyticsConsent() && window.amplitude) {
      window.amplitude.track('Sidebar Collapsed');
    }
    props.onClick(event);
  };

  return <CollapseButton {...props} onClick={handleClick} />;
}
