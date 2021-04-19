/** @type {import('@docusaurus/types').DocusaurusConfig} */

module.exports = {
  title: 'Temporal documentation',
  tagline: 'Build invincible applications',
  url: 'https://docs.temporal.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'temporalio', // Usually your GitHub org/user name.
  projectName: 'temporal-documentation', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      additionalLanguages: ['java', 'ruby', 'php'],
    },
    hideableSidebar: true,
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: 'Temporal logo',
        src: 'img/temporal-logo-dark.svg',
        srcDark: 'img/temporal-logo.svg',
      },
      items: [
        {
          to: '/',
          activeBasePath: 'none',
          label: 'Docs Home',
          position: 'right',
        },
        {
          to: '/docs/concept-overview',
          activeBasePath: 'none',
          label: 'Concepts',
          position: 'right',
        },
        {
          to: '/docs/server-introduction',
          activeBasePath: 'none',
          label: 'Server',
          position: 'right',
        },
        {
          to: '/application-development',
          activeBasePath: 'none',
          label: 'SDKs',
          position: 'right',
        },
        {
          to: '/docs/system-tooling-introduction',
          activeBasePath: 'none',
          label: 'System Tools',
          position: 'right',
        },
        {
          to: '/blog',
          activeBasePath: 'none',
          label: 'Blog',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          items: [
            {
              label: 'About the Docs',
              to: '/about',
            },
            {
              label: 'Privacy Policy',
              to: '/privacy-policy',
            },
            {
              label: 'Terms of Service',
              to: 'https://docs.temporal.io/pdf/temporal-tos-2021-01-19.pdf'
            },
          ],
        },
        {
          items: [
            {
              label: 'Application Development',
              to: '/application-development',
            },
            {
              label: 'Go SDK',
              to: '/docs/go-sdk-introduction',
            },
            {
              label: 'Java SDK',
              to: '/docs/go-sdk-introduction',
            },
            {
              label: 'PHP SDK',
              to: '/docs/go-sdk-introduction',
            },
          ],
        },
        {
          items: [
            {
              label: 'Core concepts',
              to: '/docs/concept-overview',
            },
            {
              label: 'Temporal Server',
              to: '/docs/server-introduction',
            },
            {
              label: 'System Tools',
              to: '/docs/system-tooling-introduction',
            },
            {
              label: 'Glossary',
              to: '/docs/glossary',
            },
            {
              label: 'External resources',
              to: '/docs/external-resources',
            },
            {
              label: 'Cadence to Temporal',
              to: '/docs/cadence-to-temporal',
            },
          ],
        },
        {
          items: [
            {
              label: 'Support Forum',
              href: 'https://community.temporal.io/',
            },
            {
              label: 'Public Slack',
              href:
                'https://join.slack.com/t/temporalio/shared_invite/zt-onhti57l-J0bl~Tr7MqSUnIc1upjRkw',
            },
            {
              label: 'Temporal Careers',
              href: 'https://temporal.io/careers',
            },
          ],
        },
        {
          items: [
            {
              label: 'Blog',
              href: '/blog',
            },
            {
              label: 'Case Studies',
              href: '/blog/tags/case-study',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/temporalio/temporal',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/temporalio',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/channel/UCGovZyy8OfFPNlNV0i1fI1g',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Temporal Technologies Inc.`,
    },
    gtag: {
      trackingID: 'UA-163137879-1',
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
    algolia: {
      apiKey: '14805ba2eb682edb2e719df4d5e03c8a',
      indexName: 'temporal',
      contextualSearch: true, // see if this matters
      // appId: 'app-id', // Optional, if you run the DocSearch crawler on your own
      searchParameters: { // used to be called algoliaOptions https://docusaurus.io/docs/search#using-algolia-docsearch
        facetFilters: [],
        facets: []
      }
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        // Will be passed to @docusaurus/plugin-content-docs
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
          editUrl: 'https://github.com/temporalio/documentation/blob/master',
          /**
           * Whether to display the author who last updated the doc.
           */
          showLastUpdateAuthor: false,
          /**
           * Whether to display the last date the doc was updated.
           */
          showLastUpdateTime: false,
          /**
           * Skip the next release docs when versioning is enabled.
           * This will not generate HTML files in the production build for documents
           * in `/docs/next` directory, only versioned docs.
           */
          // excludeNextVersionDocs: false,
          includeCurrentVersion: true, // excludeNextVersionDocs is now deprecated
        },
        // Will be passed to @docusaurus/plugin-content-blog
        blog: {
          routeBasePath: 'blog',
          path: 'blog',
          postsPerPage: 10,
          /**
           * Show estimated reading time for the blog post.
           */
          showReadingTime: true,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Temporal Technologies Inc.  All rights reserved. Copyright © 2020 Uber Technologies, Inc.`,
          },
        },
        // Will be passed to @docusaurus/theme-classic.
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        // Will be passed to @docusaurus/plugin-content-sitemap
        sitemap: {
          // Per v2.0.0-alpha.72 cacheTime is now deprecated
          //cacheTime: 600 * 1000, // 600 sec - cache purge period
          changefreq: 'weekly',
          priority: 0.5,
        },
      },
    ],
  ],
  scripts: [
    {
      src: '/scripts/feedback.js',
      async: true,
      defer: true,
    },
  ],
};
