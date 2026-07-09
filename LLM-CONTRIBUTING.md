# Contributing guidance for LLMs

This file guides AI coding agents working in the [Temporal documentation](https://github.com/temporalio/documentation) repository.

For human contributors, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Read these first

| Topic | File |
|-------|------|
| Where content belongs | [INFORMATION-ARCHITECTURE.md](./INFORMATION-ARCHITECTURE.md) |
| React components in MDX | [COMPONENTS.md](./COMPONENTS.md) |
| LLM Markdown pipeline | [MARKDOWN_PIPELINE.md](./MARKDOWN_PIPELINE.md) |
| Component → Markdown mapping | [COMPONENT_REGISTRY.md](./COMPONENT_REGISTRY.md) |

## Repository overview

- **Site:** Docusaurus static site for [docs.temporal.io](https://docs.temporal.io).
- **Content:** MDX files under `docs/`. URLs are served at the site root (`/workflows`), not under `/docs/`.
- **UI code:** React components in `src/components/`. Sidebar navigation is in `sidebars.js`.
- **Redirects:** Legacy URL changes go in `vercel.json` before or alongside file moves.

## Where to put content

Use [INFORMATION-ARCHITECTURE.md](./INFORMATION-ARCHITECTURE.md) to choose the section. 

## Style Guide

Follow [STYLE.md](./STYLE.md) and Vale rules in `vale/styles/`. The most common mistakes:

### Temporal terms are proper nouns

Capitalize Temporal core terms. Do not capitalize generic uses.

- Correct: "Register the Activity in the Workflow."
- Incorrect: "Register the activity in the workflow."

Vale enforces many substitutions automatically. See `vale/styles/Temporal/terms.yml`.

### Temporal Service, not Cluster

In body prose, use **Temporal Service**, not **Cluster** or **Temporal Cluster**.

- Correct: "The Worker polls the Temporal Service for tasks."
- Incorrect: "The Worker polls the Cluster for tasks."

Exceptions: **Multi-Cluster Replication**, code/config identifiers, and CLI command names.

### Identifier abbreviation

Outside Temporal core terms, spell out "identifier." For core terms, use `Id` (not `ID` or `id`).

- Correct: "Provide an order identifier as a Workflow Id."
- Incorrect: "Provide an order ID as a Workflow ID."

In code blocks, follow each language's conventions.

### Headings

- Use **sentence case**: "How to get started with Temporal"
- Prefer **infinitive verb forms** or questions: "How to install Temporal", not "Installing Temporal"
- Develop pages: task-oriented headings ("Start a Workflow Execution")

### Writing style

Follow [STYLE.md](./STYLE.md) and the [Google developer documentation style guide](https://developers.google.com/style) for tone (conversational, second person, active voice) and structure (short paragraphs, one idea per sentence). A few additions specific to model output:

- Cut filler that adds no information: "it's worth noting that," "in order to," "simply," "easily," "just." 
- Avoid vague intensifiers doing the work a specific fact should do: "powerful," "robust," "seamless," "cutting-edge," "leverage" (use "use"), "unlock," "elevate," "streamline." Replace with what the thing actually does.
- Don't pad a page to look thorough. 
- Do not add emojis to documentation prose.

### Word choice

Prefer common, concrete verbs and nouns.

| Prefer | Instead of |
|--------|------------|
| use | utilize, leverage |
| help | facilitate |
| to | in order to |
| many | numerous, various (when you can be specific, be specific) |

### Tense and time

Document current behavior. Don't make future promises. Tie claims to a version, release note, or release stage when that matters.

| Prefer | Instead of |
|--------|------------|
| Temporal Server v1.31.0 and later supports Cassandra 5.0.4 and later. | A future release will support Cassandra 5. |

## Frontmatter

Typical fields:

```yaml
---
id: page-id
title: Page title
sidebar_label: Short label
description: One sentence for SEO and previews.
keywords:
  - keyword
tags:
  - Concepts
---
```

- Write `description` as a single clear sentence.
- Do not change `id` or `slug` without a redirect plan.
- Match `tags` and `keywords` to sibling pages in the same section.
- Use existing concepts and keywords. Don't add new ones unless it's a new feature.

## MDX and components

- Pages are `.mdx` with YAML frontmatter (see [Frontmatter](#frontmatter) above).
- Import shared components from `@site/src/components` unless a page uses a one-off import path already established nearby.
- Before adding a component, check [COMPONENTS.md](./COMPONENTS.md) and [COMPONENT_REGISTRY.md](./COMPONENT_REGISTRY.md).
- Reuse existing components (`Tabs`, `SdkTabs`, `CaptionedImage`, `ViewSourceCodeNotice`, etc.) instead of inventing inline HTML patterns.
- Interactive demos live in `src/components/elements/`. Export new public components from `src/components/index.js` when needed.


## URLs and navigation

Adding or moving pages usually requires:

- Updating `sidebars.js` for navigation placement
- Adding redirects in `vercel.json` when the public URL changes
- Fixing internal links across the repo

## Code samples and Snipsync

- Prefer code extracted from CI-enabled sample repos via [Snipsync](https://github.com/temporalio/snipsync).
- Snippets are wrapped in `<!--SNIPSTART id-->` / `<!--SNIPEND-->`. Edit the **source repo** named inside the wrapper, then run `yarn snipsync`.

## Commands

Requires Node.js 24+ and Yarn.

```bash
yarn              # Install dependencies
yarn start        # Dev server at http://localhost:3000
yarn build        # Production build; catches MDX/build errors
yarn check-links  # Broken link check (run after build)
yarn snipsync     # Refresh Snipsync code snippets
```

Vale linting (style):

```bash
yarn lint:py      # Example: lint Python SDK docs
yarn vale         # Full Vale run via assembly script
```
