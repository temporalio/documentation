//@ts-check
const { prismDarkTheme, prismLightTheme } = require('./src/prismThemes');
const { ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY, ALGOLIA_INDEX_NAME } = require('./src/constants/algolia');
const mermaidTheme = require('./src/constants/mermaidTheme');
const { AEONIK_LIGHT_FILENAME, AEONIK_REGULAR_FILENAME } = require('./src/constants/preloadFonts');

/** @type {import('@docusaurus/types').DocusaurusConfig} */

module.exports = async function createConfigAsync() {
  return {
    title: 'Temporal Documentation',
    tagline: 'Build invincible applications',
    url: 'https://docs.temporal.io',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenAnchors: 'throw',
    favicon: 'favicon.ico',
    // Aeonik Light/Regular are used above the fold on every page (headings,
    // sidebar nav). Preloading them here covers non-Vercel previews; the
    // production Link header in vercel.json is what lets the browser fetch
    // them before it even has the HTML to parse this tag from. Filenames
    // come from src/constants/preloadFonts.js — see that file and
    // bin/check-font-preload-hash.js for why they're hardcoded.
    headTags: [
      {
        tagName: 'link',
        attributes: {
          rel: 'preload',
          href: `/assets/fonts/${AEONIK_LIGHT_FILENAME}`,
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      },
      {
        tagName: 'link',
        attributes: {
          rel: 'preload',
          href: `/assets/fonts/${AEONIK_REGULAR_FILENAME}`,
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      },
    ],
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
      },
      metadata: [
        { name: 'robots', content: 'follow, index' },
        { property: 'og:type', content: 'website' },
      ],
      image: '/img/assets/open-graph-shiny.jpg',
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
            title: 'Resources',
            items: [
              {
                label: 'Glossary',
                to: '/glossary',
              },
              {
                label: 'Learn Temporal',
                href: 'https://learn.temporal.io',
              },
              {
                label: 'Code Exchange',
                href: 'https://temporal.io/code-exchange',
              },
              {
                label: 'Blog',
                href: 'https://temporal.io/blog',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/c/Temporalio',
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
            title: 'Company',
            items: [
              {
                label: 'Temporal Cloud',
                href: 'https://temporal.io/cloud',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/temporalio',
              },
              {
                label: 'Trust Center',
                href: 'https://trust.temporal.io/',
              },
              {
                label: 'Security',
                href: 'https://temporal.io/security',
              },
              {
                label: 'Changelog',
                href: 'https://temporal.io/changelog',
              },
            ],
          },
          {
            title: 'For agents',
            items: [
              {
                label: 'Develop with AI',
                to: '/with-ai',
              },
              {
                label: 'llms.txt',
                href: 'https://docs.temporal.io/llms.txt',
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
      mermaid: {
        theme: mermaidTheme.theme,
        options: {
          themeVariables: { fontFamily: mermaidTheme.fontFamily },
          flowchart: mermaidTheme.flowchart,
          sequence: mermaidTheme.sequence,
          state: mermaidTheme.state,
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
            editUrl: 'https://github.com/temporalio/documentation/blob/main/',
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
            remarkPlugins: [require('./plugins/og-image/remarkPlugin')],
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
    plugins: [
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
          // Same remark plugin the main docs preset uses (see the `docs` preset
          // option above) — injects the generated og:image path as real front
          // matter during MDX compilation so it survives client hydration.
          // footerText must match the og-image plugin's ai-cookbook target
          // below, or the hash this injects won't match what postBuild renders.
          remarkPlugins: [[require('./plugins/og-image/remarkPlugin'), { footerText: 'AI COOKBOOK' }]],
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
          targets: [
            { docsDir: 'docs', routeBasePath: '/' },
            { docsDir: 'ai-cookbook', routeBasePath: 'ai-cookbook' },
          ],
          llmsTxt: {
            siteUrl: 'https://docs.temporal.io',
            title: 'Temporal Platform Documentation',
            description: 'This file is a structured index of Temporal\'s documentation, following the llmstxt.org standard. Temporal is an open-source platform for building crash-proof applications that resume exactly where they left off after failures.',
            fullDescription: 'This file is the complete text of Temporal\'s documentation, intended for bulk ingestion. Temporal is an open-source platform for building crash-proof applications that resume exactly where they left off after failures.',
            rootContent:
              'To fetch any page as raw Markdown, append `.md` to its URL path (e.g., `https://docs.temporal.io/workflows.md`).\n\n' +
              'Every page concatenated into one file is available at `https://docs.temporal.io/llms-full.txt`. ' +
              'It is roughly 7 MB, which exceeds most context windows. Prefer the section indexes below and fetch individual `.md` pages; ' +
              'use the full text for bulk ingestion.\n\n' +
              'This documentation reflects the latest Temporal SDK and Platform behavior. If you\'re working with an older SDK version, verify API compatibility before applying suggestions from this content.\n\n' +
              '## Tools for agents\n\n' +
              '- [Temporal Developer Skill](https://github.com/temporalio/skill-temporal-developer): An agent skill covering Temporal\'s programming model, including Workflow determinism rules, Activity patterns, Retry Policies, error handling, testing, Worker configuration, and versioning. Works with Claude Code, Codex, Cursor, and other agents that support Skills.\n' +
              '- [Temporal Docs MCP Server](https://temporal.mcp.kapa.ai): Search this documentation over MCP. Sign-in is required through MCP OAuth with Google or GitHub, which keeps the server from being used for automated bulk querying. Anonymous requests are rejected. If your client cannot complete an OAuth flow, use the `.md` URLs above instead.',
            excludePaths: ['tctl-v1'],
            sections: [
              {
                title: 'Core Primitives',
                description: 'Fundamental building blocks of the Temporal Platform. Read this section first for foundational concepts referenced everywhere else.',
                inline: true,
                autoDiscoverSubsections: 'encyclopedia',
              },
              {
                title: 'Concepts',
                description: 'What Temporal is and how it works.',
                inline: true,
                pages: [
                  'temporal', 'glossary',
                ],
              },
              { autoDiscover: 'develop', title: 'SDK Development Guides', description: 'Each SDK guide is organized by topic (e.g., workflows, activities, testing). All SDKs follow the same structure, with minor differences depending on language-specific features. Use these for language-specific implementation details.' },
              { path: 'develop', title: 'Cross-SDK Development Guides', description: 'Development guidance that applies across SDKs (worker performance, safe deployments, plugins).' },
              { path: 'cloud', title: 'Temporal Cloud', description: 'Deploy and manage Temporal Cloud' },
              { path: 'evaluate', title: 'Evaluating Temporal', description: 'Background for deciding whether and how to adopt Temporal, including feature comparisons and use cases.' },
              { path: 'production-deployment', title: 'Production Deployment', description: 'Deploy Temporal to production' },
              { path: 'self-hosted-guide', title: 'Self-Hosted Service Guide', description: 'Deploy, configure, and operate a self-hosted Temporal Service.' },
              { path: 'cli', title: 'CLI Reference', description: 'Temporal CLI command reference' },
              { path: 'references', title: 'References', description: 'Configuration and API references' },
              { path: 'troubleshooting', title: 'Troubleshooting', description: 'Common issues and solutions' },
              { path: 'best-practices', title: 'Best Practices', description: 'Recommended patterns for Temporal' },
              { path: 'design-patterns', title: 'Design Patterns', description: 'Reusable Workflow and Activity patterns for common orchestration problems.' },
              { path: 'guides', title: 'Guides', description: 'End-to-end walkthroughs that solve a specific problem with Temporal.' },
              { path: 'ai-cookbook', title: 'AI Cookbook', description: 'Runnable examples for building AI and agent applications with Temporal.' },
              { path: 'demos', title: 'Interactive Demos', description: 'Browser-based interactive demos. These pages are visual tools rather than prose documentation.' },
            ],
          },
        },
      ],
      [
        require.resolve('./plugins/og-image'),
        {
          targets: [
            { docsDir: 'docs', routeBasePath: '/' },
            { docsDir: 'ai-cookbook', routeBasePath: 'ai-cookbook', footerText: 'AI COOKBOOK' },
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
