% Docusaurus

This template summarizes how Docusaurus sites are typically structured and how to safely edit docs, navigation, and config. It’s based primarily on the official configuration docs for Docusaurus v3.9.2 ([Docusaurus configuration docs](https://docusaurus.io/docs/configuration)).

# Core Docusaurus structure

Most Docusaurus sites follow this pattern:

- `docusaurus.config.(js|ts|cjs|mjs)`: **Primary site configuration** (metadata, URLs, navbar/footer, plugins, themes, presets, etc.).
- `sidebars.(js|ts)`: **Docs sidebar navigation** for the `@docusaurus/plugin-content-docs` plugin.
- `docs/`: Markdown/MDX docs that appear in the docs sidebar.
- `blog/`: Blog posts (if using the blog plugin or the classic preset’s blog).
- `src/pages/`: “Free-form” React/MDX pages, routed by filename (e.g. `src/pages/index.tsx`).
- `static/`: Static assets served at the site root (e.g. `static/img/logo.svg` becomes `/img/logo.svg`).

When you modify docs in a Docusaurus project, you will often touch **both**:

1. One or more Markdown/MDX files (`docs/**`, `blog/**`, or `src/pages/**`), and  
2. The **config and/or sidebar** (`docusaurus.config.*`, `sidebars.*`) so the new/updated content appears in navigation and uses the right metadata.

---

# `docusaurus.config.*` basics

The main config file is executed in Node.js and must export a **config object** or a **function that returns a config object**. Docusaurus supports **ES modules, CommonJS, and TypeScript**; all of the following are valid and equivalent ([Docusaurus configuration docs](https://docusaurus.io/docs/configuration)):

```js
// ESM object export
export default {
  title: 'My Site',
  url: 'https://example.com',
  // ...
};
```

```js
// CommonJS
module.exports = {
  title: 'My Site',
  url: 'https://example.com',
  // ...
};
```

```ts
// TypeScript
import type {Config} from '@docusaurus/types';

export default {
  title: 'My Site',
  url: 'https://example.com',
  // ...
} satisfies Config;
```

```js
// Function export
export default function configCreator() {
  return {
    title: 'My Site',
    url: 'https://example.com',
    // ...
  };
}
```

```js
// Async function export (useful for ESM-only imports)
export default async function createConfigAsync() {
  const lib = await import('lib'); // example

  return {
    title: 'My Site',
    url: 'https://example.com',
    // ...
  };
}
```

> When editing: **preserve the existing module style** (ESM vs CJS, object vs function) unless the user explicitly wants to refactor it.

## Key config sections

High‑level categories in `docusaurus.config.*` ([Docusaurus configuration docs](https://docusaurus.io/docs/configuration)):

- **Site metadata**: `title`, `tagline`, `url`, `baseUrl`, `favicon`, etc.
  - `title`: Used in the `<title>` tag and as a default site name.
  - `tagline`: Often used in the homepage and default SEO meta.
  - `url`: The production hostname, e.g. `https://docs.example.com`.
  - `baseUrl`: The path under which the site is served, e.g. `'/'` or `'/docs/'`.
  - `favicon`: Path to a favicon, typically in `static/`.
- **Deployment settings**:
  - `organizationName`, `projectName`, and optionally `deploymentBranch` when using the built‑in `docusaurus deploy` flow.
  - Other deployment/URL options like `trailingSlash`, `onBrokenLinks`, `onBrokenMarkdownLinks`.
- **Theme / plugin / preset configuration**:
  - `themes`: Array of theme packages (`'@docusaurus/theme-classic'` or shorthand `'classic'`).
  - `plugins`: Array of plugin packages (`'@docusaurus/plugin-content-docs'` or shorthand `'content-docs'`, etc.).
  - `presets`: Pre‑bundled config (most commonly `@docusaurus/preset-classic` / `'classic'`).
- **Custom fields**:
  - `customFields`: Arbitrary extra data that you can access from React components.

### Site metadata example

```js
export default {
  title: 'My Product Docs',
  tagline: 'Everything you need to build on My Product',
  url: 'https://docs.myproduct.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
};
```

Common edits:

- Updating `title`/`tagline` when the product name or branding changes.
- Changing `url`/`baseUrl` when the docs are moved under a new domain or sub‑path.
- Swapping `favicon` and other branding assets.

## Using Tabs for alternative approaches

Use the `<Tabs>` and `<TabItem>` components to organize multiple alternative approaches to accomplish the same task. This is particularly useful when documenting:

- Different methods (e.g., Web UI vs CLI vs API)
- Different operating systems (e.g., macOS vs Windows vs Linux)
- Different environments (e.g., local development vs Temporal Cloud)

Example usage:

```mdx
<Tabs>

<TabItem value="web-ui" label="Web UI">

Instructions for using the Web UI...

</TabItem>

<TabItem value="cli" label="Temporal CLI">

Instructions for using the CLI...

```bash
temporal workflow reset --workflow-id my-workflow
```

</TabItem>

</Tabs>
```

**When to use Tabs:**
- When presenting multiple ways to achieve the same goal
- When the reader should choose one approach based on their preference or environment
- When you want to reduce repetition and organize related content compactly

**When NOT to use Tabs:**
- For sequential steps where the reader needs to complete all of them
- For unrelated content that happens to be in the same section

When changing `url`/`baseUrl`, be careful:

- Check for **hard‑coded absolute links** in docs that might assume the old URL.
- If the site is deployed under a subpath (e.g. GitHub Pages), ensure `baseUrl` includes that subpath (e.g. `'/project-name/'`).

### Themes, plugins, and presets

In `docusaurus.config.*`, you define plugins/themes/presets like this ([Docusaurus configuration docs](https://docusaurus.io/docs/configuration)):

```js
export default {
  // ...
  plugins: [
    '@docusaurus/plugin-content-blog',
    '@docusaurus/plugin-content-pages',
  ],
  themes: ['@docusaurus/theme-classic'],
};
```

Docusaurus supports **module shorthands**:

```js
export default {
  // ...
  plugins: ['content-blog', 'content-pages'],
  themes: ['classic'],
};
```

To configure a plugin or theme, replace the string with `[name, options]`:

```js
export default {
  // ...
  plugins: [
    [
      'content-blog',
      {
        path: 'blog',
        routeBasePath: 'blog',
        include: ['*.md', '*.mdx'],
        // ...
      },
    ],
    'content-pages',
  ],
};
```

For presets (commonly `@docusaurus/preset-classic` / `'classic'`), options are passed inside `presets`:

```js
export default {
  // ...
  presets: [
    [
      '@docusaurus/preset-classic', // or 'classic'
      {
        docs: {
          sidebarPath: './sidebars.js',
          // other docs plugin options...
        },
        blog: {
          // blog options...
        },
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      },
    ],
  ],
};
```

Agent guidance:

- **Avoid renaming or removing plugins/presets** unless you are sure the corresponding directories (`docs`, `blog`, etc.) are not needed.
- When adding new doc sections or changing routing (e.g. `routeBasePath`), update links and navigation accordingly.
- Respect existing patterns (e.g. whether the project uses shorthands like `'classic'` or full package names).

### `themeConfig` (navbar, footer, colors, etc.)

Although not shown in the configuration doc excerpt above, almost all real projects use a `themeConfig` section for UI‑level settings such as:

- `navbar`: Logo, top‑nav links, docs version dropdowns.
- `footer`: Footer columns and links.
- `prism`: Code highlighting theme(s).
- `algolia`: Search config if using Algolia DocSearch.

Typical example shape:

```js
export default {
  // ...
  themeConfig: {
    navbar: {
      title: 'My Product',
      logo: {src: 'img/logo.svg'},
      items: [
        {type: 'docSidebar', sidebarId: 'default', position: 'left', label: 'Docs'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {href: 'https://github.com/org/repo', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{label: 'Getting Started', to: '/docs/intro'}],
        },
        // ...
      ],
    },
  },
};
```

Common edits:

- **Add a new top‑nav or footer link** when adding a major docs section or external resource.
- Update labels/URLs to reflect renamed sections.
- When adjusting navbar docs links, keep `sidebarId` in sync with `sidebars.*`.

### Custom fields

To add arbitrary config that is not part of the core Docusaurus API, use `customFields` ([Docusaurus configuration docs](https://docusaurus.io/docs/configuration)):

```js
export default {
  // ...
  customFields: {
    image: '',
    keywords: [],
    // Add more project‑specific values here
  },
};
```

These values are accessible in React via `useDocusaurusContext` (see next section).

### Accessing config inside React components

Docusaurus exposes the config through a React hook:

```js
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Hello() {
  const {siteConfig} = useDocusaurusContext();
  const {title, tagline} = siteConfig;

  return <div>{`${title} · ${tagline}`}</div>;
}
```

Use this for:

- Reading `customFields` or site metadata on the client.
- Avoiding hard‑coding the site name/URL in components.

If data is only used on the client and not needed globally, it can live in a regular module instead of `docusaurus.config.*`.

---

# Docs and navigation (`@docusaurus/plugin-content-docs`)

Most Docusaurus sites use the **docs plugin**, either directly in `plugins` or via the classic preset (`presets: [['classic', {docs: {...}}]]`).

Key concepts:

- **Docs directory**: Usually `docs/`, but configurable via `docs.path`.
- **IDs and slugs**:
  - Each doc has an `id` (by default derived from its filesystem path).
  - Front matter can set `id`, `slug`, `sidebar_label`, `title`, `tags`, etc.
- **Route base path**:
  - Controlled by `docs.routeBasePath` (e.g. `'docs'`, `'/'`).
  - Combined with `slug`/`id` to form final URLs.

Example doc front matter:

```md
---
id: getting-started
title: Getting started
sidebar_label: Getting started
slug: /getting-started
---

Your content here…
```

Agent guidance:

- **Adding a new page**:
  1. Create a `.md` or `.mdx` file under the docs directory.
  2. Add appropriate front matter (`title`, `sidebar_label`, optional `id`/`slug`).
  3. Ensure the page is referenced from the sidebar (`sidebars.*`) or linked from other pages.
- **Renaming/moving a page**:
  - Prefer keeping the same `id` / `slug` where possible to avoid breaking URLs.
  - If URLs must change, consider adding redirects using Docusaurus’ redirect mechanisms (if configured) or clearly communicating changes.

---

# Sidebars (`sidebars.js` / `sidebars.ts`)

The docs sidebar is typically defined in `sidebars.js` or `sidebars.ts`. Common sidebar item types:

- `type: 'doc'`: A single doc page.
- `type: 'category'`: A collapsible group of items (docs/categories/links).
- `type: 'link'`: External or internal link not tied to a specific doc ID.
- `type: 'autogenerated'`: Automatically builds a sidebar from a folder.

Basic example:

```js
// sidebars.js
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting started',
      collapsed: false,
      items: [
        'intro', // doc ID
        'getting-started', // doc ID
      ],
    },
    {
      type: 'doc',
      id: 'api/overview',
      label: 'API Overview',
    },
  ],
};

export default sidebars;
```

Autogenerated example:

```js
const sidebars = {
  docsSidebar: [
    {
      type: 'autogenerated',
      dirName: '.', // generate from the whole docs folder
    },
  ],
};
```

Common sidebar edits:

- **Add a new doc to a category**:
  - Ensure the doc has a stable `id`.
  - Add that `id` to the `items` array of the appropriate `category`.
- **Reorder docs**:
  - Reorder IDs in the `items` array.
- **Create a new category**:
  - Add a new `type: 'category'` with `label` and `items`.
- **Hide or deprecate docs**:
  - Remove the doc from the sidebar but leave the file in place (and ideally link to it from a deprecations/legacy page) if you want to keep URLs working.

When editing:

- Keep sidebar keys (e.g. `tutorialSidebar`, `docsSidebar`) consistent with what’s referenced in `docusaurus.config.*` (e.g. `themeConfig.navbar.items` that use `type: 'docSidebar'` and `sidebarId`).
- Avoid deleting entire categories unless you’re sure those docs are no longer needed anywhere.

---

# Blog and pages

If the project uses the blog or custom pages:

- **Blog**:
  - Posts live in `blog/` (configurable via plugin options).
  - Each post has front matter like `slug`, `title`, `authors`, `tags`, etc.
  - The blog route is usually `/blog` (configurable as `routeBasePath`).
- **Custom pages (`src/pages`)**:
  - Any `.js`/`.tsx` or `.mdx` file under `src/pages` becomes a route.
  - E.g. `src/pages/pricing.mdx` → `/pricing`.
  - Use this for custom layouts or landing pages outside the docs tree.

Agent guidance:

- When adding a marketing/landing page, prefer `src/pages/**`.
- When adding technical documentation, prefer `docs/**` and the docs sidebar.

---

# General guidance for agents

- **Mirror the existing structure**:
  - Use the same module format (ESM vs CJS, TS vs JS) and shorthand vs full package names.
  - Follow existing patterns in `sidebars.*` and `themeConfig`.
- **Prefer additive changes over destructive ones**:
  - Add new docs and sidebar entries rather than deleting old ones whenever possible.
  - If you must remove something, confirm it isn’t linked from navbar/footer or external docs.
- **Keep URLs stable**:
  - Be cautious when changing `baseUrl`, `routeBasePath`, `slug`, or `id`.
  - If URLs change, consider introducing redirects if the project supports them.
- **Use official docs for edge cases**:
  - For advanced config or plugin options not covered here, consult the official docs starting at [Docusaurus configuration docs](https://docusaurus.io/docs/configuration) and related sections (docs plugin, sidebars, presets, themes).



