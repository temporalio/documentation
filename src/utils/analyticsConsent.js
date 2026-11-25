// Whether the reader currently grants analytics consent, for gating explicit
// Amplitude events and Algolia Insights.
//
// The consent banner keeps the reader's choice in two places:
//
// - The `consent` cookie on the `.temporal.io` apex, written once the reader
//   has decided (or the region grants silently, as in us_basic and row). A
//   decision made on temporal.io shows up here too.
// - localStorage `consent`, written on every load. In the us_opt_out regime
//   (California, Texas, Virginia, and other US states with an opt-out law) the
//   banner grants analytics by default but leaves the choice undecided and
//   writes no cookie, so localStorage is the only record of that grant. The
//   banner still tells Google Tag Manager that analytics is granted, so
//   autocapture fires for these readers.
//
// Reading only the cookie treated those readers as unconsented and dropped
// their explicit events while autocapture kept recording them. Follow the
// banner's own precedence instead: a decided cookie wins, otherwise use the
// localStorage record. Both stores hold the same JSON shape.
//
// Free of Docusaurus imports so `node --test` can load it.

const {
  CONSENT_COOKIE_NAME,
  hasAnalyticsConsent,
  parseConsentCookie,
  readConsentFromCookieString,
} = require('@temporalio-web/consent-banner/core');

function analyticsConsentFrom(cookieString, storedValue) {
  const fromCookie = readConsentFromCookieString(cookieString || '');
  if (fromCookie.decided) return hasAnalyticsConsent(fromCookie);
  return hasAnalyticsConsent(parseConsentCookie(storedValue));
}

function hasDocsAnalyticsConsent() {
  if (typeof document === 'undefined') return false;
  let storedValue = null;
  try {
    storedValue = window.localStorage.getItem(CONSENT_COOKIE_NAME);
  } catch {
    // localStorage can be blocked. Fall back to the cookie alone.
  }
  return analyticsConsentFrom(document.cookie, storedValue);
}

module.exports = { analyticsConsentFrom, hasDocsAnalyticsConsent };
