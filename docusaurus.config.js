//@ts-check
const path = require("path");
const visit = require("unist-util-visit");
const FontPreloadPlugin = require("webpack-font-preload-plugin");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Temporal Documentation",
  tagline: "Build invincible applications",
  url: "https://docs.temporal.io",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "temporalio", // Usually your GitHub org/user name.
  projectName: "temporal-documentation", // Usually your repo name.
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
    prism: {
      theme: require("prism-react-renderer/themes/nightOwlLight"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
      additionalLanguages: ["java", "ruby", "php"],
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
    //     'Content HERE',
    //      backgroundColor: "#141414",
    //      textColor: "#ffffff",
    //      isCloseable: true,
    //   },
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
          label: "Temporal Cloud",
          to: "/cloud",
          activeBasePath: "cloud",
          position: "left",
        },
        {
          label: "KB articles",
          to: "/kb",
          activeBasePath: "kb",
          position: "left",
        },
        {
          label: "Docs change log",
          to: "/change-log",
          activeBasePath: "change-log",
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
              href: "https://github.com/temporalio/temporal",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/temporalio",
            },
            {
              label: "YouTube",
              href: "https://www.youtube.com/channel/UCGovZyy8OfFPNlNV0i1fI1g",
            },
          ],
        },
        {
          items: [
            {
              label: "Meetups",
              href: "https://lu.ma/temporal",
            },
            {
              label: "Workshops",
              href: "https://temporal.io/community#workshops",
            },
            {
              label: "Support Forum",
              href: "https://community.temporal.io/",
            },
          ],
        },
        {
          items: [
            {
              label: "Use Cases",
              href: "https://temporal.io/use-cases",
            },
            {
              label: "Case Studies",
              href: "https://temporal.io/blog/tags/case-study/",
            },
            {
              label: "Blog",
              to: "https://temporal.io/blog",
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
              label: "Privacy Policy",
              to: "/privacy-policy",
            },
            {
              label: "Terms of Service",
              href: "https://docs.temporal.io/pdf/temporal-tos-2021-07-24.pdf",
            },
          ],
        },
        {
          items: [
            {
              label: "Join the Cloud Waitlist",
              href: "https://pages.temporal.io/cloud-early-access",
            },
            {
              label: "We're Hiring",
              href: "https://temporal.io/careers",
            },
            {
              label: "About the Docs",
              href: "https://github.com/temporalio/documentation/blob/master/README.md",
            },
          ],
        },
      ],
    },
    algolia: {
      apiKey: "cd527863e60d95ebe650cdd21c7a6f3f",
      indexName: "temporal",
      // contextualSearch: true, // Optional, If you different version of docs etc (v1 and v2) doesn't display dup results
      appId: "T5D6KNJCQS", // Optional, if you run the DocSearch crawler on your own
      // algoliaOptions: {}, // Optional, if provided by Algolia
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
          exclude: [
            "**/app-dev-context/**",
            "**/concept-context/**",
            "**/cloud-context/**",
          ], // do not render context content
          editUrl: "https://github.com/temporalio/documentation/blob/master",
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
          remarkPlugins: [
            [
              () =>
                function addTSNoCheck(tree) {
                  // Disable TS type checking for any TypeScript code blocks.
                  // This is because imports are messy with snipsync: we don't
                  // have a way to pull in a separate config for every example
                  // snipsync pulls from.
                  function visitor(node) {
                    if (!/^ts$/.test(node.lang)) {
                      return;
                    }
                    node.value = "// @ts-nocheck\n" + node.value.trim();
                  }

                  visit(tree, "code", visitor);
                },
              {},
            ],
            [
              require("remark-typescript-tools").transpileCodeblocks,
              {
                compilerSettings: {
                  tsconfig: path.join(
                    __dirname,
                    "docs",
                    "typescript",
                    "tsconfig.json"
                  ),
                  externalResolutions: {},
                },
                fileExtensions: [".md", ".mdx"],
                // remark-typescript-tools automatically running prettier with a custom config that doesn't
                // line up with ours. This disables any post processing, including the default prettier step.
                postProcessTs: (files) => files,
                postProcessTranspiledJs: (files) => files,
              },
            ],
            [
              () =>
                function removeTSNoCheck(tree) {
                  function visitor(node) {
                    if (!/^ts$/.test(node.lang) && !/^js$/.test(node.lang)) {
                      return;
                    }
                    if (node.value.startsWith("// @ts-nocheck\n")) {
                      node.value = node.value.slice("// @ts-nocheck\n".length);
                    }
                    // If TS compiled output is empty, replace it with a more helpful comment
                    if (
                      node.lang === "js" &&
                      node.value.trim() === "export {};"
                    ) {
                      node.value = "// Not required in JavaScript";
                    } else if (node.lang === "js") {
                      node.value = convertIndent4ToIndent2(node.value).trim();
                    }
                  }
                  visit(tree, "code", visitor);
                },
              {},
            ],
          ],
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
          changefreq: "weekly",
          priority: 0.5,
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
      src: "/scripts/set-tab-language.js",
      async: true,
      defer: true,
    },
    // {
    //   src: "/scripts/feedback.js",
    //   async: true,
    //   defer: true,
    // },
    // {
    //   src: "/scripts/fullstory.js",
    //   async: true,
    //   defer: true,
    // },
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        /**
         * Required for any multi-instance plugin
         */
        id: "cloud-release-notes",
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: "cloud/release-notes",
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: "cloud/release-notes",
        blogTitle: "Temporal Cloud release notes",
        blogSidebarTitle: "Recent release notes",
        showReadingTime: false, // Show estimated reading time for the blog post.
        feedOptions: {
          type: "all",
          copyright: `Copyright © ${new Date().getFullYear()} Temporal Technologies Inc.  All rights reserved. Copyright © 2020 Uber Technologies, Inc.`,
        },
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        /**
         * Required for any multi-instance plugin
         */
        id: "change-log",
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: "change-log",
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: "change-log",
        blogTitle: "Temporal documentation change log",
        blogSidebarTitle: "Docs change log",
        routeBasePath: "change-log",
        blogDescription: "A log of changes to this site's content.",
        showReadingTime: false, // Show estimated reading time for the blog post.
        feedOptions: {
          type: "all",
          copyright: `Copyright © ${new Date().getFullYear()} Temporal Technologies Inc.  All rights reserved. Copyright © 2020 Uber Technologies, Inc.`,
        },
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        /**
         * Required for any multi-instance plugin
         */
        id: "kb",
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: "kb",
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: "kb",
        blogTitle: "Temporal Platform knowledge base",
        blogSidebarTitle: "Recent KB articles",
        blogDescription:
          "User facing Temporal Platform knowledge base articles",
        showReadingTime: false, // Show estimated reading time for the blog post.
        feedOptions: {
          type: "all",
          copyright: `Copyright © ${new Date().getFullYear()} Temporal Technologies Inc.  All rights reserved. Copyright © 2020 Uber Technologies, Inc.`,
        },
      },
    ],
  ],
};

function convertIndent4ToIndent2(code) {
  // TypeScript always outputs 4 space indent. This is a workaround.
  // See https://github.com/microsoft/TypeScript/issues/4042
  return code.replace(/^( {4})+/gm, (match) => {
    return "  ".repeat(match.length / 4);
  });
}
