// --- SHIM: define gtag early so GTM tags won't throw ---
window.dataLayer = window.dataLayer || [];
window.gtag =
  window.gtag ||
  function () {
    window.dataLayer.push(arguments);
  };
window.gtag('js', new Date());

// Default every Google tag to denied until the consent-banner element (see
// src/theme/Root.tsx) says otherwise. Must run before the GTM container script
// below loads, so gated tags never fire ungated on first paint.
window.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
});

// The consent cookie is written on the shared `.temporal.io` apex domain, so a
// decision made on temporal.io (or a prior docs.temporal.io visit) is already
// readable here. Synchronously upgrade the default above before GTM loads —
// same script block, so there's no race with the container.
(function () {
  var match = document.cookie.match(/(?:^|;\s*)consent=([^;]*)/);
  if (!match) return;

  try {
    var consent = JSON.parse(decodeURIComponent(match[1]));
    if (typeof consent.analytics !== 'boolean' || typeof consent.advertising !== 'boolean') return;

    var adState = consent.advertising ? 'granted' : 'denied';
    window.gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: adState,
      ad_user_data: adState,
      ad_personalization: adState,
    });
  } catch (e) {
    // Malformed cookie value: leave the denied defaults above in place.
  }
})();

(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-TSXFPF2');
