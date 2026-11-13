import React from 'react';
import { useQueryString, useStorageSlot } from '@docusaurus/theme-common';

// Same query string and storage key as <Tabs groupId="os" queryString>, so the
// selected OS tab and this component always agree.
const OS_QUERY_KEY = 'os';
const OS_STORAGE_KEY = 'docusaurus.tab.os';
const DEFAULT_OS = 'macos';

/**
 * Shows its children only when the reader's selected OS matches `os`, a
 * space-separated list such as "windows" or "macos linux". Renders no wrapper
 * element, so it works inline in a sentence and around block content.
 *
 * Use it only on a page that also has a <Tabs groupId="os" queryString> set,
 * since those tabs are how a reader switches OS.
 */
export default function ForOs({ os = '', children }) {
  const [queryOs] = useQueryString(OS_QUERY_KEY);
  const [storedOs] = useStorageSlot(OS_STORAGE_KEY);
  const current = queryOs || storedOs || DEFAULT_OS;
  const targets = os.toLowerCase().split(/\s+/).filter(Boolean);
  return targets.includes(current) ? <>{children}</> : null;
}
ForOs.displayName = 'ForOs';
