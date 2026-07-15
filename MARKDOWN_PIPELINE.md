# LLM Markdown Pipeline

Serves a clean Markdown version of every docs page at `/<path>.md` (next to the rendered
`/<path>` HTML) for LLM ingestion and search indexing. An LLM — or the on-page "View as
Markdown" / "Copy for LLM" buttons — can fetch `/workflows.md` and get readable Markdown
instead of the raw MDX source (imports, JSX components, frontmatter).

## Architecture

Generation happens **at build time, written directly into the build output directory**
(`outDir`), alongside the generated HTML. There are no committed `.md` artifacts and nothing
in `static/` — the files are produced fresh on every build and deployed as-is. Vercel already
serves `/(.*)\.md` with a `noindex` header (see `vercel.json`).

Two registered Docusaurus plugins (in `docusaurus.config.js`) own the build integration:

1. **`plugins/markdown-pages`** — a `postBuild({ outDir })` hook that walks `docs/`, resolves
   each page's URL path, runs the MDX through the transformer, and writes
   `outDir/<url-path>.md`. Pages with an `llm_exclude` frontmatter field are skipped (it
   writes the exclusion message instead).
2. **`docusaurus-plugin-llms`** — generates `llms.txt` (page index, llmstxt.org format) and
   `llms-full.txt` (all content concatenated). Configured with `generateMarkdownFiles: false`,
   since `markdown-pages` produces the per-page `.md` files.

The **transformer** (`scripts/mdx-to-md.mjs`) is the engine `markdown-pages` calls. It is a
standalone, **zero-dependency** ES module, separately unit-tested, so its behavior can be
verified in isolation from a full site build.

```
docs/**/*.mdx ──(postBuild)──▶ markdown-pages plugin ──▶ transformMdx() ──▶ outDir/<path>.md
                                                          (scripts/mdx-to-md.mjs)
docusaurus-plugin-llms ─────────────────────────────────▶ outDir/llms.txt, llms-full.txt
```

> **Note: `.md` files only exist after a production build.** Generation runs in the `postBuild`
> hook, which fires on `yarn build` but **not** on `yarn start`. The dev server skips it on
> purpose — `yarn start` optimizes for fast hot-reload authoring, and the `.md` files are derived
> build output, not authoring input. So `http://localhost:3000/<path>.md` will 404 under
> `yarn start`; to preview the `.md` output locally, run `yarn build && yarn serve`. (To inspect
> a single page's conversion without a full build, run `transformMdx` on it directly — that's what
> the unit tests do.)

## Design principles

- **Output, not source.** Generated `.md` lives in the build output (`outDir`), never in the
  repo. `build/` is already gitignored; nothing else needs ignoring.
- **Build-integrated.** The work runs inside the normal `docusaurus build` via the plugin's
  `postBuild` hook — no separate prebuild step, no manual generation in CI.
- **Zero-dependency transformer.** `scripts/mdx-to-md.mjs` uses only Node built-ins. The
  CommonJS plugin loads this ES module via dynamic `import()`.
- **Line-oriented state machine, not an AST.** The transformer understands JSX block
  boundaries by scanning lines — pragmatic given this repo's structured component patterns.
  If deeply nested JSX ever outgrows it, the upgrade path is `unified` + `remark-mdx`.
- **Component logic lives centrally in the transformer**, via a registry mapping each
  component name to a string strategy *or* a handler function. We deliberately did **not** put
  a `.toMarkdown()` method on the React components: the line parser has no evaluated prop tree,
  and the components are React-runtime coupled (hooks, `fetch`, Docusaurus context).
  Data-driven components resolve their source directly — e.g. `<JsonTable>` reads
  `static/json/*.json` rather than going through the component.
- **Runs after snipsync.** Code blocks are populated by the scheduled `snipsync` GitHub Action,
  which commits results to `main`. By build time the committed `.mdx` already has code, so the
  transformer sees populated snippets without running snipsync itself.

## Files

| Path | Purpose |
|------|---------|
| `plugins/markdown-pages/index.js` | **Production integration.** `postBuild` hook: walks `docs/`, resolves URL paths, calls the transformer, writes `outDir/<path>.md`. Honors `llm_exclude`. |
| `scripts/mdx-to-md.mjs` | **The transformer.** Exports `transformMdx()` + parsing helpers and `COMPONENT_REGISTRY`. Zero-dependency ES module. |
| `scripts/component-handlers/data-tables.mjs` | Handler for `<JsonTable>` — resolves a `static/json/*.json` file into a Markdown table. |
| `scripts/component-handlers/integrations.mjs` | Handler for `<IntegrationsGrid>` — reads `src/components/IntegrationsGrid/integrations-data.json`, filters by the `defaultSdks` prop, and emits a Markdown list. |
| `scripts/component-handlers/home-page-hero.mjs` | Handler for `<HomePageHero>` — emits the homepage hero's headline, intro, and link cards. Content is mirrored from the component (no shared data file). |
| `scripts/component-handlers/cards.mjs` | Handler for `<QuickstartCards>` / `<PatternCards>` — parses the inline `items={[{href,title,description}]}` prop into a Markdown link list. |
| `scripts/audit-components.mjs` | Inventory/coverage tool. Scans all docs, reports per-component coverage, writes `COMPONENT_REGISTRY.md` at the repo root. |
| `src/components/LLMActions/LLMActions.tsx` | On-page actions (Copy, View as Markdown, Open in ChatGPT/Claude). Points at the generated `/<path>.md` (not the raw MDX). |
| `tests/` | Zero-framework test suites. Fixtures in `fixtures/docs/`, golden snapshots in `tests/snapshots/`. |
| `COMPONENT_REGISTRY.md` | Generated coverage report (repo root — intentionally *not* under `docs/`, so it is never published). |

## How the transformer works

`transformMdx(mdxContent, { sourceFile, projectRoot })` returns `{ markdown, warnings }`. It
parses frontmatter (emitting `title` as an H1 and `description` as a blockquote), then runs a
line-oriented state machine that:

1. Suspends all JSX parsing inside fenced code blocks (``` / ~~~).
2. Strips `import` / `export` statements and `{/* MDX comments */}`.
3. Converts admonitions (`:::note`, `:::tip`, `:::caution`, `:::danger`, `:::info`,
   `:::warning`) into labeled blockquotes.
4. Dispatches recognized components to their strategy (see below).
5. Strips `{#anchor}` suffixes from headings.
6. For unknown PascalCase JSX, strips the tag and records a warning, preserving inner text. Its
   detection regexes are anchored to whole lines, so inline generics in prose (`Foo<Bar>`) and
   placeholders (`<ID>`) are left untouched.

Nested content (tab bodies, `<details>`, release-note bodies, setup-step prose, transcluded
files) is handled by recursively calling `transformMdx` on the inner content.

`projectRoot` (passed by the plugin as `context.siteDir`) lets data-driven strategies read
`static/json/*.json` and resolve `@site/...` transclusion targets.

## Component coverage

Each component maps to a strategy in `COMPONENT_REGISTRY` (in `scripts/mdx-to-md.mjs`). Run
`node scripts/audit-components.mjs` to regenerate `COMPONENT_REGISTRY.md` with current counts.

| Component(s) | Strategy | Output |
|---|---|---|
| `Tabs` / `TabItem` | `tabs` / `tabitem` | All tabs flattened, each under a **bold label** header |
| `SdkTabs` / `SdkTabs.<Lang>` | `sdk-tabs` | Same, with language labels (`DotNet` → **.NET**) |
| `CodeSnippet` | `code-snippet` | Fenced code block using the `language` prop |
| `CaptionedImage`, `EnlargeImage`, `ZoomingImage`, `Components.CaptionedImage` | `captioned-image` | `![alt or caption or title](src)` |
| `PhotoCarousel` | `photo-carousel` | One `![caption](url)` per entry in the `images`/`captions` arrays |
| `CallToAction` | `call-to-action` | `- [h3 title](href): p description` |
| `ReleaseNoteHeader` | `release-note-header` | `> **Public Preview** — Go, Java…` availability note + body blockquote. The self-closing form (`<ReleaseNoteHeader … />`) emits just the note and leaves the page body intact. |
| `RelatedReadContainer` / `RelatedReadItem` | `related-read-container` / `related-read-item` | `**Related:**` Markdown link list |
| `RelatedReadList` | `related-read` | Link list from the `readList` prop |
| `ToolTipTerm` | `tooltip-term` | Inline: replaced with the bare `term` text |
| `SetupSteps` / `SetupStep` | `setup-steps` / `setup-step` | Prose children plus code extracted from the `code={…}` JSX prop |
| `JsonTable` | `json-table` | Markdown table resolved from the referenced `static/json/*.json` |
| `IntegrationsGrid` | `integrations-grid` | Markdown list resolved from `integrations-data.json`, filtered by the `defaultSdks` prop |
| `HomePageHero` | `home-page-hero` | Homepage hero's headline, intro paragraphs, and link cards (content mirrored from the component) |
| `QuickstartCards`, `PatternCards` | `cards` | Markdown link list parsed from the inline `items={[{href,title,description}]}` prop |
| `ZoomPanPinch` | `transparent` | Wrapper stripped; inner content passed through |
| `DocCardList`, `CardList`, `LandingCard`, `ThemedImage`, `SdkLogos`, `SdkSvg`, `CloudRegionCount`, `RetrySimulator`, `ServerlessWorkerDemo`, `OperationsTable`, `InvitationContent` | `strip-block` | Removed entirely (visual/dynamic, no extractable text) |
| `DL`, `DT`, `DD`, `DefinitionList` | `strip-tag` | Tags stripped, text content kept |
| `details` / `summary` | `details` / `summary` | `<summary>` becomes a heading; body expanded inline |

**Transclusion.** Components imported from a Markdown file
(`import AWSRegions from '@site/docs/.../awsregions.md'`) are inlined: when `<AWSRegions />` is
encountered, the referenced file is read and transformed in place. These show as `transclude`
in the audit.

**Audit false positives.** `scripts/audit-components.mjs` may list non-components (type
generics in code examples like `SayHelloWorkflow`, CLI placeholders like `<ID>`). The
transformer itself is safe from these — its detection is anchored to whole lines.

### Adding a new component

1. Add `ComponentName: "strategy"` to `COMPONENT_REGISTRY` in `scripts/mdx-to-md.mjs`.
2. If an existing strategy fits, you're done. Otherwise add a state branch in `transformMdx`,
   or — for data-driven components — a handler function under `scripts/component-handlers/`.
3. Add a unit test in `tests/test-mdx-to-md.mjs` (and a `validStrategies` entry if the strategy
   name is new).
4. Run `node scripts/audit-components.mjs` to refresh coverage.

**Keep handlers and components in sync.** When a handler reproduces content or logic that also
lives in the React component (data-driven components like `JsonTable`, `IntegrationsGrid`, or the
content-mirroring `HomePageHero`), add a cross-reference comment in *both* files — a `⚠️ LLM
MARKDOWN PIPELINE` comment in the component pointing at the handler, and a `Component:` line in
the handler pointing back — so a future change to one prompts updating the other. Components
transformed generically (e.g. `Tabs`, `CallToAction`) have no separate source of truth and don't
need this.

### Known limitation: content/logic duplicated between components and handlers (follow-up)

A few handlers currently re-express something that also lives in the React component, which
means two places to keep in sync. This is a known issue to be addressed in a follow-up; the
cross-reference comments above are an interim guard, not the fix.

- **`HomePageHero` — duplicated content.** `scripts/component-handlers/home-page-hero.mjs` holds
  its own copy of the homepage hero's text (headline, intro paragraphs, action/community cards),
  duplicating `src/components/elements/HomePageHero.js`. The intended fix is to move that content
  into the page's source of truth — `docs/index.mdx` — and reduce the component to presentation
  (content via props/children), so the hero-specific handler can be removed entirely.
- **`IntegrationsGrid` — duplicated logic.** The data is already shared
  (`integrations-data.json`), but the default-view filter/sort in
  `scripts/component-handlers/integrations.mjs` (`selectIntegrations`) mirrors the filtering in
  `src/components/IntegrationsGrid/index.tsx`. The intended fix is to extract that filtering into
  a shared, framework-agnostic module that both import (the pattern already used by
  `src/constants/featureReleaseTypes.js`).

Not affected: `JsonTable` (shared JSON data; only the render *format* differs) and
`QuickstartCards`/`PatternCards` (content lives in the MDX `items` prop — a single source).

## Testing

```bash
node tests/run-all.mjs        # all suites
```

- `tests/test-mdx-to-md.mjs` — unit tests for the transformer + helpers, plus snapshot tests
  against `fixtures/docs/*`. To accept intentionally-changed output, delete the relevant
  `tests/snapshots/*.snap.md` and re-run (regenerates on first run).

Fixtures in `fixtures/docs/` are copies of representative real pages (multi-language tabs,
admonitions, prose) used to keep snapshots stable as the live docs change.

During a real build the `markdown-pages` plugin logs a count of transform warnings
(`[markdown-pages] Generated N clean markdown files, … M transform warnings`), which surfaces
any unknown components in the live docs.

## Page actions (the buttons)

`src/components/LLMActions/LLMActions.tsx` renders the on-page action group — a **Copy**
split-button with a dropdown for **View as Markdown**, **Open in ChatGPT**, and **Open in
Claude**. All of these point at the generated clean Markdown at `<permalink>.md`:

- **Copy** fetches `<permalink>.md` and copies it (prefixed with a `Source:` line) to the clipboard.
- **View as Markdown** opens `<permalink>.md` in a new tab.
- **Open in ChatGPT / Claude** sends a prompt referencing the absolute `.md` URL.

It hides itself on pages with `llm_exclude` frontmatter, matching the pipeline.

> **Note: these buttons don't work under `yarn start`.** They depend on the generated `.md`
> files, which only exist after `yarn build` (the `postBuild` hook doesn't run in the dev
> server — see the note under [Architecture](#architecture)). Under `yarn start`, **Copy** and
> **View as Markdown** will hit a 404, and the ChatGPT/Claude prompts will reference a `.md` URL
> that isn't being served. To exercise the buttons locally, use `yarn build && yarn serve`.
