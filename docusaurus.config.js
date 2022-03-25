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
    "docusaurus-tailwindcss-loader",
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
    // hideableSidebar: true,
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: "Temporal logo",
        src: "img/temporal-logo-dark.svg",
        srcDark: "img/temporal-logo.svg",
      },
      items: [
        {
          activeBasePath: "/docs",
          label: "Docs",
          items: [
            {
              to: "/docs/temporal-explained/introduction",
              activeBasePath: "/docs/temporal-explained/",
              label: "Explanation",
            },
            {
              to: "/docs/concepts",
              activeBasePath: "/docs/concepts/",
              label: "Concepts",
            },
            {
              to: "/docs/clusters",
              activeBasePath: "/docs/clusters/",
              label: "Clusters",
            },
            {
              to: "/docs/tctl/",
              activeBasePath: "/docs/tctl/",
              label: "tctl",
            },
            {
              to: "/docs/devtools/web-ui/",
              label: "Web UI",
            },
            {
              to: "/application-development",
              activeBaseRegex:
                "(/application-development)|(/docs/(go|java|php|node))",
              label: "SDKs",
            },
            {
              to: "/docs/operations/",
              activeBasePath: "/docs/operations",
              label: "Operation guides",
            },
            {
              to: "/docs/learning-paths",
              activeBasePath: "/docs/learning-paths",
              label: "Learning",
            },
            {
              to: "/docs/samples-library",
              activeBasePath: "/docs/samples-library",
              label: "Samples library",
            },
          ],
        },
        {
          activeBasePath: "none",
          label: "Case Studies",
          items: [
            {
              to: "/blog/how-datadog-ensures-database-reliability-with-temporal",
              label: "Datadog",
            },
            {
              to: "/blog/how-temporal-simplified-checkr-workflows",
              label: "Checkr",
            },
            {
              to: "/blog/temporal-a-central-brain-for-box",
              label: "Box",
            },
            {
              to: "/blog/reliable-crypto-transactions-at-coinbase",
              label: "Coinbase",
            },
            {
              to: "/blog/descript-case-study",
              label: "Descript",
            },
            {
              to: "/blog/zebra-medical-case-study",
              label: "Zebra",
            },
            {
              to: "/blog/airbyte-case-study",
              label: "Airbyte",
            },
          ],
        },
        {
          to: "/blog",
          activeBasePath: "/blog",
          label: "Blog",
        },
        {
          to: "/docs/external-resources",
          activeBasePath: "/docs/external-resources",
          label: "External Resources",
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
      copyright: `Copyright © ${new Date().getFullYear()}</span> Temporal Technologies Inc.</div>`,
      links: [
        {
          items: [
            {
              html: `<a href="https://github.com/temporalio/temporal" aria-label="GitHub"><svg xmlns="http://www.w3.org/2000/svg" class="footer__svg" width="16" height="16" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> GitHub</a>`,
            },
            {
              html: `<a href="https://twitter.com/temporalio" aria-label="Twitter"><svg xmlns="http://www.w3.org/2000/svg" class="footer__svg" width="16" height="16" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg> Twitter</a>`,
            },
            {
              html: `<a href="https://www.youtube.com/channel/UCGovZyy8OfFPNlNV0i1fI1g" aria-label="YouTube"><svg xmlns="http://www.w3.org/2000/svg" class="footer__svg" width="16" height="16" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg> YouTube</a>`,
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
              href: "https://docs.temporal.io/blog/tags/case-study/",
            },
            {
              label: "Blog",
              to: "/blog",
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
              href: "https://us17.list-manage.com/survey?u=2334a0f23e55fd1840613755d&id=f1895b6f4a",
            },
            {
              label: "Subscribe to the Newsletter",
              href: "https://temporal.us17.list-manage.com/subscribe/post?u=2334a0f23e55fd1840613755d&id=3475f910fc",
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
          routeBasePath: "docs",
          exclude: ["**/shared/**"], // do not render "shared" content
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
        blog: {
          routeBasePath: "blog",
          path: "blog",
          postsPerPage: 10,
          editUrl: "https://github.com/temporalio/documentation/blob/master",
          blogTitle: "Temporal Blog",
          showReadingTime: true, // Show estimated reading time for the blog post.
          feedOptions: {
            type: "all",
            copyright: `Copyright © ${new Date().getFullYear()} Temporal Technologies Inc.  All rights reserved. Copyright © 2020 Uber Technologies, Inc.`,
          },
        },
        // Will be passed to @docusaurus/theme-classic.
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "UA-163137879-1",
          // Optional fields.
          anonymizeIP: true, // Should IPs be anonymized?
        },
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
      src: "/scripts/feedback.js",
      async: true,
      defer: true,
    },
    {
      src: "/scripts/fullstory.js",
      async: true,
      defer: true,
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
