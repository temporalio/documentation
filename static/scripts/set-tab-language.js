(function () {
  const platform = navigator.platform.toLowerCase();
  let activeTab = null;

  if (platform.includes('mac')) {
    activeTab = 'macos';
  } else if (platform.includes('win')) {
    activeTab = 'windows';
  } else {
    activeTab = 'linux';
  }

  const querystring = window.location.search;
  if (querystring) {
    const entries = querystring
      .slice(1)
      .split('&')
      .reduce((entries, str) => {
        const [key, value] = str.split('=').map((v) => decodeURIComponent(v));
        entries[key] = value;
        return entries;
      }, {});

    if (entries.lang === 'js') {
      window.localStorage.setItem('docusaurus.tab.language', 'js');
      window.localStorage.setItem('docusaurus.tab.site-lang', 'typescript');
    } else if (entries.lang === 'ts') {
      window.localStorage.setItem('docusaurus.tab.language', 'ts');
      window.localStorage.setItem('docusaurus.tab.site-lang', 'typescript');
    }

    // for DEV GUIDE
    if (typeof entries.lang === 'string') {
      const lang = entries.lang.toLowerCase();
      const validSiteLangs = [
        'go',
        'java',
        'php',
        'typescript',
        'python',
        'dotnet',
        'ruby',
        'rust',
      ];
      const isValid = validSiteLangs.indexOf(lang) !== -1;

      if (isValid) {
        window.localStorage.setItem('docusaurus.tab.site-lang', lang);
      }
    }
  }

  const tabItems = document.querySelectorAll('.tab-item');
  const tabPanes = document.querySelectorAll('.tab-pane');

  for (let i = 0; i < tabItems.length; i++) {
    const tabItem = tabItems[i];
    const tabPane = tabPanes[i];

    if (tabItem.getAttribute('data-tab') === activeTab) {
      tabItem.classList.add('active');
      tabPane.classList.add('active');
    }

    tabItem.addEventListener('click', (e) => {
      e.preventDefault();

      const activeTab = e.target.getAttribute('data-tab');

      for (let j = 0; j < tabItems.length; j++) {
        const item = tabItems[j];
        const pane = tabPanes[j];

        if (item.getAttribute('data-tab') === activeTab) {
          item.classList.add('active');
          pane.classList.add('active');
        } else {
          item.classList.remove('active');
          pane.classList.remove('active');
        }
      }
    });
  }
})();
