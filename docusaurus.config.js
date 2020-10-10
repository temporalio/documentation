const versions = require('./versions.json');

module.exports = {
  title: 'Temporal',
  tagline: 'Invincible applications, invisible infrastructure',
  url: 'https://docs.temporal.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'temporalio', // Usually your GitHub org/user name.
  projectName: 'temporal-documentation-legacy-v2', // Usually your repo name.
  themeConfig: {
    colorMode: {
      // "light" | "dark"
      defaultMode: 'dark',
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    navbar: {
      hideOnScroll: true,
      title: 'Temporal',
      logo: {
        alt: 'Temporal logo',
        src: 'img/favicon.svg',
      },
      items: [
        {
          to: 'docs/get-started/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        {
          to: 'blog',
          label: 'Blog',
          position: 'right',
        },
        {
          href: 'https://community.temporal.io/',
          label: 'Support',
          position: 'right',
        },
        {
          href: 'https://github.com/temporalio/temporal',
          label: 'GitHub',
          position: 'right',
        },
        {
          to: 'https://temporal.io/careers',
          label: 'Jobs',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/get-started/',
            },
            {
              label: 'Java SDK',
              to: 'docs/java-run-your-first-app/',
            },
            {
              label: 'Go SDK',
              to: 'docs/go-run-your-first-app/',
            },
            {
              label: 'About',
              to: '/about',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href:
                'https://stackoverflow.com/questions/tagged/temporal-workflow',
            },
            {
              label: 'Slack',
              href:
                'https://join.slack.com/t/temporalio/shared_invite/zt-c1e99p8g-beF7~ZZW2HP6gGStXD8Nuw',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/temporalio/temporal',
            },
            // {
            //   label: 'Twitter',
            //   href: 'https://twitter.com/docusaurus',
            // },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Temporal Technologies Inc.  All rights reserved. Copyright © 2020 Uber Technologies, Inc.`,
    },
    gtag: {
      trackingID: 'UA-163137879-1',
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
    algolia: {
      apiKey: '14805ba2eb682edb2e719df4d5e03c8a',
      indexName: 'temporal',
      // appId: 'app-id', // Optional, if you run the DocSearch crawler on your own
      // algoliaOptions: {}, // Optional, if provided by Algolia
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
          excludeNextVersionDocs: false,
        },
        // Will be passed to @docusaurus/plugin-content-blog
        blog: {
          routeBasePath: 'blog',
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
          cacheTime: 600 * 1000, // 600 sec - cache purge period
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
