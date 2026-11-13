import React, {type ReactNode} from 'react';
import {UnlistedMetadata} from '@docusaurus/theme-common';
import type {Props} from '@theme/ContentVisibility/Unlisted';

// Swizzled from @docusaurus/theme-classic to drop the public "This page is
// unlisted" banner. Unlisted pages are used for older-version content that
// stays reachable by link but out of navigation, and the banner calls that out
// to readers. The noindex metadata is kept, so search engines still skip these
// pages.
export default function Unlisted(_props: Props): ReactNode {
  return <UnlistedMetadata />;
}
