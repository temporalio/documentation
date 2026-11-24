// This adapter runs in docusaurus.config.js, not in the browser.
function navigationLink(link) {
  const url = new URL(link.href);
  return {
    label: link.label,
    ...(url.origin === 'https://docs.temporal.io'
      ? { to: `${url.pathname}${url.search}${url.hash}`, activeBasePath: url.pathname }
      : { href: link.href }),
  };
}

function navigationCta(cta) {
  return {
    ...navigationLink(cta),
    className: `universal-nav-cta universal-nav-cta--${cta.variant}`,
    'data-nav-theme': cta.theme,
    'data-size': cta.size,
  };
}

function createNavbar(navigation) {
  return {
    hideOnScroll: false,
    logo: {
      alt: navigation.logo.alt,
      href: navigation.logo.href,
      src: navigation.logo.light,
      srcDark: navigation.logo.dark,
    },
    items: [
      ...navigation.items.map((item) =>
        item.type === 'group'
          ? {
              type: 'custom-universalGroup',
              label: item.label,
              position: 'left',
              sections: item.sections.map((section) => ({
                title: section.title,
                links: section.links.map(navigationLink),
              })),
              ctas: item.ctas.map(navigationCta),
            }
          : { ...navigationLink(item), position: 'left' },
      ),
      { label: 'Courses', href: 'https://learn.temporal.io/getting_started/', position: 'left' },
      { label: 'SDKs', to: '/develop', activeBasePath: '/develop', position: 'left' },
      { label: 'Durable AI', to: '/ai', activeBasePath: '/ai', position: 'left' },
      ...navigation.ctas.map((cta) => ({ ...navigationCta(cta), position: 'right' })),
      { type: 'custom-askAI', position: 'right' },
    ],
  };
}

module.exports = { createNavbar };
