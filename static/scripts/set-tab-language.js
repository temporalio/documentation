(function () {
  const querystring = window.location.search;
  if (!querystring) {
    return;
  }

  const entries = querystring
    .slice(1)
    .split("&")
    .reduce((entries, str) => {
      const [key, value] = str.split("=").map((v) => decodeURIComponent(v));
      entries[key] = value;
      return entries;
    }, {});

  if (entries.lang === "js") {
    window.localStorage.setItem("docusaurus.tab.language", "js");
    window.localStorage.setItem("docusaurus.tab.site-lang", "typescript");
  } else if (entries.lang === "ts") {
    window.localStorage.setItem("docusaurus.tab.language", "ts");
    window.localStorage.setItem("docusaurus.tab.site-lang", "typescript");
  }

  // for DEV GUIDE
  if (typeof entries.lang === "string") {
    const lang = entries.lang.toLowerCase();
    const validSiteLangs = [
      "go",
      "java",
      "php",
      "typescript",
      "python",
      "dotnet",
      "ruby",
      "rust",
    ];
    const isValid = validSiteLangs.indexOf(lang) !== -1;

    if (isValid) {
      window.localStorage.setItem("docusaurus.tab.site-lang", lang);
    }
  }
})();
