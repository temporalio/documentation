module.exports = {
  serverSidebar: [
    {
      type: "category",
      label: "Server",
      collapsed: false,
      items: [
        "server/introduction",
        "server/quick-install",
        "server/production-deployment",
        "server-architecture",
        "server/versions-and-dependencies",
        "server/namespaces",
        "server/workflow-search",
        "server/elasticsearch-setup",
        "server/options",
        "server/security",
        "server/configuration",
        "server/event-types",
        "server/archive-data",
        "server/multi-cluster"
      ],
    },
    {
      type: "category",
      label: "Quick links",
      collapsed: false,
      items: [
        {
          type: "link",
          label: "Concepts",
          href: "/docs/concepts/introduction",
        },
        {
          type: "link",
          label: "SDKs",
          href: "/application-development",
        },
        {
          type: "link",
          label: "System tools",
          href: "/docs/system-tools/introduction",
        },
        {
          type: "link",
          label: "Additional resources",
          href: "/docs/external-resources",
        },
      ],
    },
  ],
  toolingSidebar: [
    {
      type: "category",
      label: "System Tools",
      collapsed: false,
      items: [
        "system-tools/introduction",
        "system-tools/tctl",
        "system-tools/web-ui",
      ],
    },
    {
      type: "category",
      label: "Quick links",
      collapsed: false,
      items: [
        {
          type: "link",
          label: "Concepts",
          href: "/docs/concepts/introduction",
        },
        {
          type: "link",
          label: "Server",
          href: "/docs/server/introduction",
        },
        {
          type: "link",
          label: "SDKs",
          href: "/application-development",
        },
        {
          type: "link",
          label: "Additional resources",
          href: "/docs/external-resources",
        },
      ],
    },
  ],
  goSidebar: [
    {
      type: "category",
      label: "Go",
      collapsed: false,
      items: [
        "go/introduction",
        {
          type: "link",
          label: "Reference",
          href: "https://pkg.go.dev/go.temporal.io/sdk",
        },
        {
          type: "category",
          label: "Tutorials",
          collapsed: false,
          items: [
            "go/tutorial-prerequisites",
            "go/run-your-first-app-tutorial",
            "go/hello-world-tutorial",
            "go/sdk-video-tutorial",
            {
              type: "link",
              label: "Build an eCommerce app",
              href: "/blog/tags/go-ecommerce-tutorial",
            },
          ],
        },
        "go/workflows",
        "go/activities",
        "go/workers",
        "go/task-queues",
        "go/signals",
        "go/queries",
        "go/retries",
        "go/error-handling",
        "go/selectors",
        "go/side-effect",
        "go/testing",
        "go/versioning",
        "go/sessions",
        "go/distributed-cron",
        "go/tracing",
        "go/search-apis",
      ],
    },
    {
      type: "category",
      label: "Quick links",
      collapsed: false,
      items: [
        {
          type: "link",
          label: "Concepts",
          href: "/docs/concepts/introduction",
        },
        {
          type: "link",
          label: "Server",
          href: "/docs/server/introduction",
        },
        {
          type: "link",
          label: "SDKs",
          href: "/application-development",
        },
        {
          type: "link",
          label: "System tools",
          href: "/docs/system-tools/introduction",
        },
        {
          type: "link",
          label: "Additional resources",
          href: "/docs/external-resources",
        },
      ],
    },
  ],
  javaSidebar: [
    {
      type: "category",
      label: "Java",
      collapsed: false,
      items: [
        "java/introduction",
        {
          type: "link",
          label: "Reference",
          href: "https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/index.html",
        },
        {
          type: "category",
          label: "Tutorials",
          collapsed: false,
          items: [
            "java/tutorial-prerequisites",
            "java/run-your-first-app-tutorial",
            "java/hello-world-tutorial",
          ],
        },
        "java/workflows",
        "java/activities",
        "java/workers",
        "java/task-queues",
        "java/signals",
        "java/queries",
        "java/versioning",
        "java/side-effect",
        "java/distributed-cron",
        "java/testing-and-debugging",
      ],
    },
    {
      type: "category",
      label: "Quick links",
      collapsed: false,
      items: [
        {
          type: "link",
          label: "Concepts",
          href: "/docs/concepts/introduction",
        },
        {
          type: "link",
          label: "Server",
          href: "/docs/server/introduction",
        },
        {
          type: "link",
          label: "SDKs",
          href: "/application-development",
        },
        {
          type: "link",
          label: "System tools",
          href: "/docs/system-tools/introduction",
        },
        {
          type: "link",
          label: "Additional resources",
          href: "/docs/external-resources",
        },
      ],
    },
  ],
  phpSidebar: [
    {
      type: "category",
      label: "PHP",
      collapsed: false,
      items: [
        "php/introduction",
        "php/workflows",
        "php/activities",
        "php/task-queues",
        "php/workers",
        "php/signals",
        "php/queries",
        "php/retries",
        "php/error-handling",
        "php/side-effect",
        "php/versioning",
        "php/distributed-cron",
      ],
    },
    {
      type: "category",
      label: "Quick links",
      collapsed: false,
      items: [
        {
          type: "link",
          label: "Concepts",
          href: "/docs/concepts/introduction",
        },
        {
          type: "link",
          label: "Server",
          href: "/docs/server/introduction",
        },
        {
          type: "link",
          label: "SDKs",
          href: "/application-development",
        },
        {
          type: "link",
          label: "System tools",
          href: "/docs/system-tools/introduction",
        },
        {
          type: "link",
          label: "Additional resources",
          href: "/docs/external-resources",
        },
      ],
    },
  ],
  nodejsSidebar: [
    {
      type: "category",
      label: "Node (alpha)",
      collapsed: false,
      items: [
        "node/introduction",
        {
          type: "link",
          label: "Reference",
          href: "https://nodejs.temporal.io",
        },
        "node/getting-started",
        {
          type: "category",
          label: "Tutorials",
          collapsed: false,
          items: ["node/hello-world"],
        },
        {
          type: "category",
          label: "Workflows",
          items: [
            "node/determinism",
            "node/versioning",
            "node/workflow-scopes-and-cancellation",
            "node/workflow-external-dependencies",
          ],
        },
        {
          type: "doc",
          id: "node/package-initializer",
          label: "Package initializer",
        },
        "node/tls",
        "node/logging",
      ],
    },
    {
      type: "category",
      label: "Quick links",
      collapsed: false,
      items: [
        {
          type: "link",
          label: "Concepts",
          href: "/docs/concepts/introduction",
        },
        {
          type: "link",
          label: "Server",
          href: "/docs/server/introduction",
        },
        {
          type: "link",
          label: "SDKs",
          href: "/application-development",
        },
        {
          type: "link",
          label: "System tools",
          href: "/docs/system-tools/introduction",
        },
        {
          type: "link",
          label: "Additional resources",
          href: "/docs/external-resources",
        },
      ],
    },
  ],
  coreConcepts: [
    {
      type: "category",
      label: "Core concepts",
      collapsed: false,
      items: [
        "concepts/introduction",
        "concepts/workflows",
        "concepts/activities",
        "concepts/workers",
        "concepts/task-queues",
        "concepts/signals",
        "concepts/queries",
      ],
    },
    {
      type: "category",
      label: "Additional resources",
      collapsed: false,
      items: ["external-resources", "cadence-to-temporal", "glossary"],
    },
    {
      type: "category",
      label: "Quick links",
      collapsed: false,
      items: [
        {
          type: "link",
          label: "Server",
          href: "/docs/server/introduction",
        },
        {
          type: "link",
          label: "SDKs",
          href: "/application-development",
        },
        {
          type: "link",
          label: "System tools",
          href: "/docs/system-tools/introduction",
        },
      ],
    },
  ],
};
