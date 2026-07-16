//@ts-check
const FontPreloadPlugin = require('webpack-font-preload-plugin');
const { prismDarkTheme, prismLightTheme } = require('./src/prismThemes');
const { ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY, ALGOLIA_INDEX_NAME } = require('./src/constants/algolia');

/** @type {import('@docusaurus/types').DocusaurusConfig} */

module.exports = async function createConfigAsync() {
  return {
    title: 'Temporal Platform Documentation',
    tagline: 'Build invincible applications',
    url: 'https://docs.temporal.io',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenAnchors: 'throw',
    favicon: 'favicon.ico',
    organizationName: 'temporalio', // Usually your GitHub org/user name.
    projectName: 'temporal-documentation', // Usually your repo name.
    // JSON-LD structured data (Organization/SoftwareApplication/WebPage) is
    // rendered per-page instead of injected globally here — see
    // src/theme/DocItem/StructuredData and src/constants/organizationSchema.
    // A single global block would put the full Organization property set on
    // every page, which is exactly the drift risk the JSON-LD audit flagged.
    clientModules: ['./src/client/remote-amplitude-analytics.js', './src/client/scrollSidebarToActivePage.ts'],
    themeConfig: {
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
        // switchConfig: {
        //   darkIcon: "🌙",
        //   darkIconStyle: {
        //     content: `url(/img/assets/moon.svg)`,
        //     transform: "scale(2)",
        //     margin: "0 0.2rem",
        //   },
        //   lightIcon: "\u{1F602}",
        //   lightIconStyle: {
        //     content: `url(/img/assets/sun.svg)`,
        //     transform: "scale(2)",
        //   },
        // },
      },
      metadata: [
        { name: 'robots', content: 'follow, index' },
        { property: 'og:type', content: 'website' },
      ],
      image: '/img/assets/open-graph-shiny.png',
      prism: {
        theme: prismLightTheme,
        darkTheme: prismDarkTheme,
        additionalLanguages: ['java', 'ruby', 'php', 'csharp', 'toml', 'bash', 'docker', 'hcl'],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      // announcementBar: {
      //   id: "replay_announcement",
      //   content: 'Replay is coming to London, March 3-5! <a href="https://www.eventbrite.com/e/replay-conference-2025-tickets-1045108576887">Secure your ticket</a>',
      //   backgroundColor: "#312e81",
      //   textColor: "#ffffff",
      //   isCloseable: true,
      // },
      //      announcementBar: {
      //        id: "new_feedback_widget",
      //        content: "<b>How are we doing? Try our new on-page feedback.</b>",
      //        backgroundColor: "#312e81",
      //        textColor: "#ffffff",
      //        isCloseable: true,
      //      },
      navbar: {
        hideOnScroll: false,
        logo: {
          alt: 'Temporal logo',
          src: 'img/assets/temporal-logo-dark.svg',
          srcDark: 'img/assets/temporal-logo.svg',
          href: 'https://temporal.io',
        },
        items: [
          {
            label: 'Home',
            to: '/',
            position: 'left',
            activeBasePath: 'none',
          },
          {
            label: 'Courses',
            href: 'https://learn.temporal.io/getting_started/',
            right: 'left',
          },
          {
            label: 'SDKs',
            href: '/develop',
            right: 'left',
          },
          {
            label: 'AI Cookbook',
            to: '/ai-cookbook',
            activeBasePath: 'ai-cookbook',
            position: 'left',
          },
          // hide this for now, making this a soft-launch
          // {
          //   label: 'Design Patterns',
          //   to: '/design-patterns',
          //   activeBasePath: 'design-patterns',
          //   position: 'left',
          // },
          {
            label: 'Code Exchange',
            href: 'https://temporal.io/code-exchange',
            position: 'left',
          },
          {
            label: 'Temporal Cloud',
            to: '/cloud',
            activeBasePath: 'cloud',
            position: 'left',
          },
          {
            type: 'custom-askAI',
            position: 'right',
          },
        ],
      },
      footer: {
        logo: {
          alt: 'Temporal logo',
          src: 'img/favicon.png',
          href: 'https://temporal.io',
          width: 24,
        },
        copyright: `Copyright © ${new Date().getFullYear()} Temporal Technologies Inc.`,
        links: [
          {
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/temporalio',
              },
              {
                label: 'Twitter',
                href: 'https://x.com/temporalio',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/c/Temporalio',
              },
              {
                label: 'About the docs',
                href: 'https://github.com/temporalio/documentation/blob/main/README.md',
              },
            ],
          },
          {
            items: [
              {
                label: 'Temporal Cloud',
                href: 'https://temporal.io/cloud',
              },
              {
                label: 'Meetups',
                href: 'https://temporal.io/community#events',
              },
              {
                label: 'Support forum',
                href: 'https://community.temporal.io/',
              },
              {
                label: 'Ask an expert',
                href: 'https://pages.temporal.io/ask-an-expert',
              },
            ],
          },
          {
            items: [
              {
                label: 'Learn Temporal',
                href: 'https://learn.temporal.io',
              },
              {
                label: 'Blog',
                href: 'https://temporal.io/blog',
              },
              {
                label: 'Use cases',
                href: 'https://temporal.io/in-use',
              },
              {
                label: 'Newsletter signup',
                href: 'https://pages.temporal.io/newsletter-subscribe',
              },
            ],
          },
          {
            items: [
              {
                label: 'Security',
                to: '/security',
              },
              {
                label: 'Privacy policy',
                href: 'https://temporal.io/global-privacy-policy',
              },
              {
                label: 'Terms of service',
                href: 'https://temporal.io/terms-of-service',
              },
              {
                label: "We're hiring",
                href: 'https://temporal.io/careers',
              },
            ],
          },
        ],
      },
      algolia: {
        apiKey: ALGOLIA_SEARCH_API_KEY,
        indexName: ALGOLIA_INDEX_NAME,
        externalUrlRegex: 'temporal\\.io',
        // contextualSearch: true, // Optional; if you have different version of docs etc (v1 and v2), doesn't display dup results
        appId: ALGOLIA_APP_ID, // Optional, if you run the DocSearch crawler on your own
        // algoliaOptions: {}, // Optional, if provided by Algolia
        searchPagePath: false, // Disable default search page - using custom implementation at src/pages/search.tsx
        insights: true,
        searchParameters: {
          attributesToRetrieve: [
            'hierarchy',
            'content',
            'anchor',
            'url',
            'url_without_anchor',
            'type',
            'sdk_language',
          ],
        },
      },
    },
    presets: [
      [
        '@docusaurus/preset-classic',
        {
          // Will be passed to @docusaurus/plugin-content-docs
          docs: {
            sidebarPath: require.resolve('./sidebars.js'),
            routeBasePath: '/',
            exclude: [
              '**/_*.{js,jsx,ts,tsx,md,mdx}',
              '**/_*/**',
              '**/clusters/**',
              '**/ai-cookbook/**',
            ], // partials (underscore-prefixed) + context content we don't render
            editUrl: 'https://github.com/temporalio/documentation/edit/main/docs/',
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
            // // below remark plugin disabled until we can figure out why it is not transpiling to ESNext properly - swyx
            // // original PR https://github.com/temporalio/documentation/pull/496/files
            admonitions: {
              keywords: ['note', 'tip', 'info', 'caution', 'danger', 'competency', 'copycode'],
            },
            remarkPlugins: [(await import('remark-math')).default],
            rehypePlugins: [(await import('rehype-katex')).default],
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
          // Will be passed to @docusaurus/plugin-content-blog
          // options: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog
          // blog: {},
          // Will be passed to @docusaurus/theme-classic.
          // gtag: {
          //   trackingID: "GTM-TSXFPF2",
          //   // Optional fields.
          //   anonymizeIP: false, // Should IPs be anonymized?
          // },
          // Will be passed to @docusaurus/plugin-content-sitemap
          sitemap: {
            // Per v2.0.0-alpha.72 cacheTime is now deprecated
            //cacheTime: 600 * 1000, // 600 sec - cache purge period
            changefreq: 'daily',
            priority: 0.5,
            filename: 'sitemap.xml',
            ignorePatterns: ['/getting-started', '/changelog', '/blog', '/blog/**'],
          },
        },
      ],
    ],
    scripts: [
      {
        src: '/scripts/googletag.js',
        async: true,
        defer: true,
      },
      {
        src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
        'data-button-hide': 'true',
        'data-website-id': '91a88508-9cdc-441f-b1df-37aa9329e6bc',
        'data-project-name': 'Temporal',
        'data-project-color': '#000000',
        'data-mcp-enabled': 'true',
        'data-mcp-server-url': 'https://temporal.mcp.kapa.ai',
        'data-project-logo': 'https://avatars.githubusercontent.com/u/56493103?s=280&v=4',
        'data-modal-title': "Temporal's AI developer assistant",
        'data-user-analytics-fingerprint-enabled': true,
        'data-modal-disclaimer':
          "I am Temporal's AI developer assistant. I can access developer docs, forum posts, product blogs, and SDK references. Responses are generated by combining various sources to provide the best possible answer, however I may not be fully accurate, so please use your best judgement. If you have feedback please give a thumbs up or down as I continue to improve.",
        'data-modal-example-questions': [
          'What is Temporal?',
          'How do I get started using Temporal?',
          'I need a Workflow written in TypeScript',
          'How do Signals work?',
        ],
        async: true,
        defer: true,
      },
      {
        src: '/scripts/copycode-notice.js',
        async: true,
        defer: true,
      },
    ],
    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
        type: 'text/css',
        integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
        crossorigin: 'anonymous',
      },
    ],
    plugins: [
      function preloadFontPlugin() {
        return {
          name: 'preload-font-plugin',
          configureWebpack() {
            return {
              plugins: [new FontPreloadPlugin()],
            };
          },
        };
      },
      [
        './plugins/cloud-region-counts',
        {
          regionFiles: {
            aws: 'docs/cloud/references/regions/awsregions.md',
            gcp: 'docs/cloud/references/regions/gcpregions.md',
          },
        },
      ],
      [
        'docusaurus-pushfeedback',
        {
          project: '6c1ptrxbky',
          privacyPolicyText: 'false',
          buttonPosition: 'center-right',
          modalPosition: 'sidebar-right',
          modalTitle: 'Feedback',
        },
      ],
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'ai-cookbook',
          path: 'ai-cookbook',
          routeBasePath: 'ai-cookbook', // published at /ai-cookbook/* ✅
          sidebarPath: false, // no left nav for these pages ✅
          // optional polish:
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // use a custom item to center the content:
          docItemComponent: '@site/src/components/Cookbook/DocItem/CookbookDocItem',
          docCategoryGeneratedIndexComponent: '@site/src/components/Cookbook/DocItem/CookbookCategoryIndex', // ⬅️ isolated override
        },
      ],
      [
        require.resolve('./plugins/cookbook-index'),
        {
          docsDir: 'ai-cookbook', // change if your folder differs
          routeBasePath: 'ai-cookbook', // change if you use a different base
        },
      ],
      [
        require.resolve('./plugins/markdown-pages'),
        {
          docsDir: 'docs',
        },
      ],
      [
        require.resolve('./plugins/og-image'),
        {
          docsDir: 'docs',
        },
      ],
      [
        'docusaurus-plugin-llms',
        {
          // Generate both llms.txt (index) and llms-full.txt (complete content)
          generateLLMsTxt: true,
          generateLLMsFullTxt: true,
          generateMarkdownFiles: false,

          // Exclude imported markdown partials that should not be published as standalone LLM docs.
          ignoreFiles: ['docs/cloud/references/regions/private-service.md', 'docs/cloud/references/regions/gcpregions.md'],

          // Tell agents how to fetch individual pages as raw markdown
          rootContent:
            'This file contains links to documentation sections following the llmstxt.org standard.\n\n' +
            '## Fetching individual pages\n\n' +
            'To fetch any page as raw Markdown, append `.md` to its URL path. ' +
            'For example, `https://docs.temporal.io/encyclopedia.md` returns the raw Markdown source for the Encyclopedia page.\n\n' +
            'Some pages (interactive demos, landing pages) are not available as Markdown. ' +
            'Requesting `.md` for those pages returns a short explanation instead.',

          // Clean up content for better LLM consumption
          excludeImports: true,
          removeDuplicateHeadings: true,

          // Organize content in a logical order for LLMs
          includeOrder: [
            'quickstarts/**',
            'evaluate/**',
            'develop/**',
            'production-deployment/**',
            'cli/**',
            'references/**',
            'troubleshooting/**',
            'encyclopedia/**',
            'security*',
            'web-ui*',
            'glossary*',
          ],

          // Path transformation to clean URLs
          pathTransformation: {
            ignorePaths: ['docs'],
          },

          // Custom LLM files for specific use cases
          customLLMFiles: [
            {
              filename: 'llms-quickstart.txt',
              includePatterns: ['docs/evaluate/**/*.mdx', 'docs/develop/**/*.mdx'],
              fullContent: true,
              title: 'Temporal Quickstart Guide',
            },
            {
              filename: 'llms-api-reference.txt',
              includePatterns: ['docs/references/**/*.mdx', 'docs/cli/**/*.mdx'],
              fullContent: true,
              title: 'Temporal API and CLI Reference',
            },
          ],
        },
      ],
    ],
    markdown: {
      mdx1Compat: {
        // Required for snipsync HTML comment markers (<!--SNIPSTART-->, <!--SNIPEND-->)
        comments: true,
        admonitions: true,
      },
      mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],
    future: {
      v4: true,
      faster: true,
    },
  };

  function convertIndent4ToIndent2(code) {
    // TypeScript always outputs 4 space indent. This is a workaround.
    // See https://github.com/microsoft/TypeScript/issues/4042
    return code.replace(/^( {4})+/gm, (match) => {
      return '  '.repeat(match.length / 4);
    });
  }

  // Remove the minimum leading whitespace on each line, excluding whitespace-only
  // lines. Helpful for cleaning up TypeScript examples that are pulled from
  // the body of a function.
  function dedent(code) {
    const lines = code.split('\n');

    if (!lines.length) {
      return code;
    }

    // First, find the minimum number of leading space characters, excluding
    // lines that are whitespace-only.
    let minIndent = Number.POSITIVE_INFINITY;
    for (const line of lines) {
      if (line.trim().length === 0) {
        continue;
      }

      const match = line.match(/^( +)/);
      if (match && match[0].length < minIndent) {
        minIndent = match[0].length;
      } else if (!match) {
        minIndent = 0;
      }
    }

    // If there's no leading whitespace, just return the code
    if (minIndent === 0 || minIndent === Number.POSITIVE_INFINITY) {
      return code;
    }

    // Otherwise, remove leading spaces from each line
    return lines.map((line) => line.replace(new RegExp(`^ {${minIndent}}`), '')).join('\n');
  }
};
