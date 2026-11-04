import React, { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { useLocation } from '@docusaurus/router';
import { hasAnalyticsConsent, readConsentFromDocumentCookie } from '@temporalio-web/consent-banner/core';
import NotFoundContent from '@theme-original/NotFound/Content';
import type NotFoundContentType from '@theme/NotFound/Content';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof NotFoundContentType>;

const hasConsent = () => ExecutionEnvironment.canUseDOM && hasAnalyticsConsent(readConsentFromDocumentCookie());

// Remembers the last URL we reloaded for, so a URL the server answers
// differently than the client router can't send the reader into a reload loop.
const RELOAD_GUARD_KEY = 'docs-notfound-reloaded';

// Asks the server what it would do for a full page load of the current URL.
// vercel.json redirects only run on a full page load, so a reader who reaches
// an old URL through client-side navigation (a search result, a link in a tab
// opened before a deploy) sees this page even though the server redirects it.
// Returns true when the server would redirect, or would serve a page this
// browser's JavaScript bundle doesn't know about.
async function serverKnowsThisUrl(): Promise<boolean> {
  try {
    if (window.sessionStorage.getItem(RELOAD_GUARD_KEY) === window.location.pathname) {
      return false;
    }
  } catch {
    // sessionStorage can be blocked. Without it, the probe below still ends in
    // a 404 for a missing page, so a loop needs a server that redirects to
    // itself.
  }

  // `redirect: 'manual'` returns an opaque response for a 3xx, which is all
  // we need: the server applied its redirect rules, including any added by a
  // deploy newer than this page's bundle.
  const response = await fetch(window.location.pathname + window.location.search, {
    redirect: 'manual',
    cache: 'no-store',
    credentials: 'same-origin',
  });
  return response.type === 'opaqueredirect' || response.ok;
}

export default function NotFoundContentWrapper(props: Props): JSX.Element {
  // NotFound stays mounted when the reader moves between two unmatched URLs,
  // so probe again whenever the URL changes.
  const { pathname, search } = useLocation();

  useEffect(() => {
    let cancelled = false;

    serverKnowsThisUrl()
      .catch(() => false)
      .then((reload) => {
        if (cancelled) return;
        if (reload) {
          try {
            window.sessionStorage.setItem(RELOAD_GUARD_KEY, window.location.pathname);
          } catch {
            // See above.
          }
          window.location.replace(window.location.href);
          return;
        }
        // Track only the 404s a full page load would also produce.
        if (hasConsent() && window.amplitude) {
          window.amplitude.track('Docs Page Not Found', {
            url: window.location.href,
            referrer: document.referrer,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [pathname, search]);

  return <NotFoundContent {...props} />;
}
