//@ts-check
const FontPreloadPlugin = require("webpack-font-preload-plugin");

/** @type {import('@docusaurus/types').DocusaurusConfig} */

module.exports = async function createConfigAsync() {
  return {
    title: "Temporal Platform Documentation",
    tagline: "Build invincible applications",
    url: "https://docs.temporal.io",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenAnchors: "throw",
    favicon: "img/favicon.svg",
    organizationName: "temporalio", // Usually your GitHub org/user name.
    projectName: "temporal-documentation", // Usually your repo name.
    headTags: [
      {
        tagName: "link",
        attributes: {
          rel: "preload",
          href: "https://iq.temporal.io",
          as: "document",
        },
      },
    ],
    themeConfig: {
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        // switchConfig: {
        //   darkIcon: "🌙",
        //   darkIconStyle: {
        //     content: `url(/img/moon.svg)`,
        //     transform: "scale(2)",
        //     margin: "0 0.2rem",
        //   },
        //   lightIcon: "\u{1F602}",
        //   lightIconStyle: {
        //     content: `url(/img/sun.svg)`,
        //     transform: "scale(2)",
        //   },
        // },
      },
      metadata: [{ name: "robots", content: "follow, index" }],
      image: "/img/open-graph-shiny.png",
      prism: {
        //theme: require("prism-react-renderer/themes/nightOwlLight"),
        // darkTheme: require("prism-react-renderer/themes/dracula"),
        additionalLanguages: ["java", "ruby", "php", "csharp"],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      // announcementBar: {
      //   id: "replay_announcement",
      //   content:
      //     'Replay will return September 18-20 in Seattle! <a href="https://www.eventbrite.com/e/replay-2024-tickets-744609486017?aff=ebdsoporgprofile">Secure your ticket</a>.',
      //   backgroundColor: "#141414",
      //   textColor: "#ffffff",
      //   isCloseable: true,
      // },
      navbar: {
        hideOnScroll: false,
        logo: {
          alt: "Temporal logo",
          src: "img/temporal-logo-dark.svg",
          srcDark: "img/temporal-logo.svg",
          href: "https://temporal.io",
        },
        items: [
          {
            label: "Home",
            to: "/",
            position: "left",
            activeBasePath: "none",
          },
          {
            label: "Start learning",
            href: "https://learn.temporal.io/getting_started/",
            right: "left",
          },
          {
            label: "Start building",
            href: "/develop",
            right: "left",
          },
          {
            label: "Temporal Cloud",
            to: "/cloud",
            activeBasePath: "cloud",
            position: "left",
          },
        ],
      },
      footer: {
        logo: {
          alt: "Temporal logo",
          src: "img/favicon.png",
          href: "https://temporal.io",
          width: 24,
        },
        copyright: `Copyright © ${new Date().getFullYear()}</span> Temporal Technologies Inc.</div><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TSXFPF2"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
        links: [
          {
            items: [
              {
                label: "Github",
                href: "https://github.com/temporalio",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/temporalio",
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/c/Temporalio",
              },
              {
                label: "About the docs",
                href: "https://github.com/temporalio/documentation/blob/master/README.md",
              },
            ],
          },
          {
            items: [
              {
                label: "Temporal Cloud",
                href: "https://temporal.io/cloud",
              },
              {
                label: "Meetups",
                href: "https://temporal.io/community#events",
              },
              {
                label: "Workshops",
                href: "https://temporal.io/community#workshops",
              },
              {
                label: "Support forum",
                href: "https://community.temporal.io/",
              },
              {
                label: "Ask an expert",
                href: "https://pages.temporal.io/ask-an-expert",
              },
            ],
          },
          {
            items: [
              {
                label: "Learn Temporal",
                href: "https://learn.temporal.io",
              },
              {
                label: "Blog",
                href: "https://temporal.io/blog",
              },
              {
                label: "Use cases",
                href: "https://temporal.io/use-cases",
              },
              {
                label: "Newsletter signup",
                href: "https://pages.temporal.io/newsletter-subscribe",
              },
            ],
          },
          {
            items: [
              {
                label: "Security",
                to: "/security",
              },
              {
                label: "Privacy policy",
                to: "https://temporal.io/global-privacy-policy",
              },
              {
                label: "Terms of service",
                href: "https://docs.temporal.io/pdf/temporal-tos-2021-07-24.pdf",
              },
              {
                label: "We're hiring",
                href: "https://temporal.io/careers",
              },
            ],
          },
        ],
      },
      algolia: {
        apiKey: "4a2fa646f476d7756a7cdc599b625bec",
        indexName: "temporal",
        externalUrlRegex: "temporal\\.io",
        // contextualSearch: true, // Optional; if you have different version of docs etc (v1 and v2), doesn't display dup results
        appId: "T5D6KNJCQS", // Optional, if you run the DocSearch crawler on your own
        // algoliaOptions: {}, // Optional, if provided by Algolia
        insights: true,
      },
    },
    presets: [
      [
        "@docusaurus/preset-classic",
        {
          // Will be passed to @docusaurus/plugin-content-docs
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            routeBasePath: "/",
            exclude: ["**/clusters/**"], // do not render context content
            editUrl: "https://github.com/temporalio/documentation/edit/main/docs/",
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
              keywords: ["note", "tip", "info", "caution", "danger", "competency", "copycode"],
            },
            remarkPlugins: [(await import("remark-math")).default],
            rehypePlugins: [(await import("rehype-katex")).default],
          },
          // Will be passed to @docusaurus/plugin-content-blog
          // options: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog
          // blog: {},
          // Will be passed to @docusaurus/theme-classic.
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
          // gtag: {
          //   trackingID: "GTM-TSXFPF2",
          //   // Optional fields.
          //   anonymizeIP: false, // Should IPs be anonymized?
          // },
          // Will be passed to @docusaurus/plugin-content-sitemap
          sitemap: {
            // Per v2.0.0-alpha.72 cacheTime is now deprecated
            //cacheTime: 600 * 1000, // 600 sec - cache purge period
            changefreq: "daily",
            priority: 0.5,
            filename: "sitemap.xml",
          },
        },
      ],
    ],
    scripts: [
      {
        src: "/scripts/googletag.js",
        async: true,
        defer: true,
      },
      {
        src: "https://widget.kapa.ai/kapa-widget.bundle.js",
        "data-website-id": "91a88508-9cdc-441f-b1df-37aa9329e6bc",
        "data-project-name": "Temporal",
        "data-project-color": "#000000",
        "data-project-logo": "https://avatars.githubusercontent.com/u/56493103?s=280&v=4",
        "data-modal-title": "Temporal's AI developer assistant",
        "data-user-analytics-fingerprint-enabled": true,
        "data-modal-disclaimer":
          "I am Temporal's AI developer assistant. I can access developer docs, forum posts, product blogs, and SDK references. Responses are generated by combining various sources to provide the best possible answer, however I may not be fully accurate, so please use your best judgement. If you have feedback please give a thumbs up or down as I continue to improve.",
        "data-modal-example-questions": [
          "What is Temporal?",
          "How do I get started using Temporal?",
          "I need a Workflow written in TypeScript",
          "How do Signals work?",
        ],
        async: true,
        defer: true,
      },
      {
        src: "/scripts/copycode-notice.js",
        async: true,
        defer: true,
      },
    ],
    stylesheets: [
      {
        href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
        type: "text/css",
        integrity: "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
        crossorigin: "anonymous",
      },
    ],
    plugins: [
      function preloadFontPlugin() {
        return {
          name: "preload-font-plugin",
          configureWebpack() {
            return {
              plugins: [new FontPreloadPlugin()],
            };
          },
        };
      },
    ],
  };

  function convertIndent4ToIndent2(code) {
    // TypeScript always outputs 4 space indent. This is a workaround.
    // See https://github.com/microsoft/TypeScript/issues/4042
    return code.replace(/^( {4})+/gm, (match) => {
      return "  ".repeat(match.length / 4);
    });
  }

  // Remove the minimum leading whitespace on each line, excluding whitespace-only
  // lines. Helpful for cleaning up TypeScript examples that are pulled from
  // the body of a function.
  function dedent(code) {
    const lines = code.split("\n");

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
    return lines.map((line) => line.replace(new RegExp(`^ {${minIndent}}`), "")).join("\n");
  }
};
