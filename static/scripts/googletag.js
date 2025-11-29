// --- SHIM: define gtag early so GTM tags won't throw ---
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
window.gtag('js', new Date());

(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({"gtm.start": new Date().getTime(), event: "gtm.js"});
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-TSXFPF2");
