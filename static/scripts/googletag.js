// Google Consent Mode bootstrap + GTM container loader.
//
// This file is injected as a SYNCHRONOUS inline <head> script (see headTags in
// docusaurus.config.js), not loaded async/deferred. That ordering is essential:
// `gtag('consent', 'default', ...)` must register the denied baseline
// BEFORE the GTM container initializes. This cannot run async, as GTM will initialize
// first and fire advertising/analytics tags before the denied default applied
// (google_tag_data.ics._wasSetLate === true), so vendor tags set cookies even
// with consent undecided or rejected. This is now modeled on temporal.io's
// src/app.html.

(function () {
  window.dataLayer = window.dataLayer || [];
  // Push `arguments` so Consent Mode can detect gtag commands.
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };

  // Redact ad-click identifiers and suppress ad cookies while ad_storage is
  // denied, matching the temporal.io bootstrap.
  window.gtag('set', 'ads_data_redaction', true);

  // Default every Google tag to denied until a consent decision says otherwise.
  // Registered before the container loads so gated tags never fire ungated.
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  // The consent cookie is written on the shared `.temporal.io` apex domain, so a
  // decision made on temporal.io (or a prior docs.temporal.io visit) is already
  // readable here. Synchronously upgrade the denied default before GTM loads, and
  // do it within the same script block, so there's no race with the container.
  (function () {
    var match = document.cookie.match(/(?:^|;\s*)consent=([^;]*)/);
    if (!match) return;

    try {
      var consent = JSON.parse(decodeURIComponent(match[1]));
      if (typeof consent.analytics !== 'boolean' || typeof consent.advertising !== 'boolean') return;

      // Do Not Sell (us_opt_out) is stored separately and overrides advertising.
      var doNotSell = false;
      try {
        doNotSell = localStorage.getItem('do-not-sell') === 'true';
      } catch (e) {
        // localStorage unavailable (e.g. blocked cookies): treat as not set.
      }

      var adState = consent.advertising && !doNotSell ? 'granted' : 'denied';
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

  window.gtag('js', new Date());

  // Inject the GTM container once. The ID guard prevents a duplicate
  // container init (and the resulting second `gtm.js` dataLayer event).
  (function (w, d, s, l, i) {
    if (d.getElementById('gtm-script')) return;
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.id = 'gtm-script';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'GTM-TSXFPF2');
})();
