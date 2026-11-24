import React from 'react';
import OriginalLogo from '@theme-original/Logo';
import { useThemeConfig } from '@docusaurus/theme-common';
import { isExternalHref } from '@site/src/utils/links';

// Used by Navbar/Logo (Footer/Logo is a separate component and already
// behaves correctly). The default only sets target/rel when navbar.logo.target
// is explicitly configured, so it falls through to Docusaurus's own default
// of opening every absolute URL in a new tab — including the logo's link to
// temporal.io itself. Cancel that for the temporal.io family.
export default function Logo(props) {
  const {
    navbar: { logo },
  } = useThemeConfig();

  return isExternalHref(logo?.href) ? (
    <OriginalLogo {...props} />
  ) : (
    <OriginalLogo {...props} target={undefined} rel={undefined} />
  );
}
