module.exports = {
  title: 'Temporal',
  tagline: 'Invincible applications, invisible infrastructure',
  url: 'https://docs.temporal.io',
  baseUrl: '/',
  favicon: 'img/favicon.svg',
  organizationName: 'Temporal Technologies Inc', // Usually your GitHub org/user name.
  projectName: 'temporal-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Temporal',
      logo: {
        alt: 'My Site Logo',
        src: 'img/favicon.svg',
      },
      links: [
        {
          to: 'docs/overview',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/temporalio/temporal',
          label: 'GitHub',
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
              to: 'docs/overview',
            },
            {
              label: 'Java SDK',
              to: 'docs/java-quick-start',
            },
            {
              label: 'Go SDK',
              to: 'docs/go-quick-start',
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/temporal-workflow',
            },
            {
              label: 'Slack',
              href: 'https://join.slack.com/t/temporalio/shared_invite/zt-c1e99p8g-beF7~ZZW2HP6gGStXD8Nuw',
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
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/temporalio/temporal-docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
