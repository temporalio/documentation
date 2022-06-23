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

  if (entries.language === "js") {
    window.localStorage.setItem("docusaurus.tab.language", "js");
  } else if (entries.language === "ts") {
    window.localStorage.setItem("docusaurus.tab.language", "ts");
  }
})();
