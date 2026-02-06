# Temporal Documentation

This is the source repository for Temporal's documentation site, built with Docusaurus and hosted on Vercel.

## Development

```bash
yarn install    # Install dependencies
yarn start      # Start dev server
yarn build      # Production build (also runs link checker)
```

## Project Structure

```
docs/           # Documentation content (MDX files)
src/            # React components, custom styling, theme customizations
  components/   # Custom MDX components
  css/          # Custom styles (custom.css)
vale/           # Vale linting rules and styles
```

## Content Guidelines

### Style

- Follow the [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)
- Use second person ("you"). Don't say "XXX allows customers to meet XXX business needs". Say "XXX allows you to do
  XXX".
- Use active voice
- Be concise and avoid ambiguity
- Write goal-oriented instead of feature-focused documentation and avoid business-speak. Don't say "XXX is a feature
  that XXX"; instead say "XXX allows you to perform XXX tasks"
- Fix inconsistencies in existing docs when you encounter them

### Editorial preferences

- Prefer complete sentences over clipped phrasing (for example, "decide the following" instead of "decide").
  Prefer: "To set up Archival, decide the following:"
  Avoid: "To set up Archival, decide:"
- Do not optimize for brevity at the expense of clarity or context. Keep useful framing text when it helps users
  understand purpose and outcomes.
  Prefer: "The following table shows the available configuration options and their accepted values:"
  Avoid: "Use these options:"
- When behavior involves multiple data types or systems, name each one explicitly instead of using umbrella wording.
  Prefer: "Temporal schedules close-processing tasks for both Visibility records and Event History archival."
  Avoid: "Temporal schedules tasks to process close visibility data and archival."
- Keep terminology and product naming consistent with existing docs (for example, "Namespace with Archival enabled").
  Prefer: "create a Namespace with Archival enabled"
  Avoid: "create an Archiving Namespace"
- Keep section anchors/action headings task-oriented (verb-based), but keep surrounding prose natural and readable.
  Prefer heading/anchor: "Configure Archival options"
  Avoid heading/anchor: "Configuration"

### Terminology

Temporal terms are capitalized. Key terms include:

- Workflow, Activity, Worker, Signal, Query, Update, Timer
- Workflow Execution, Activity Execution, Workflow Definition
- Task Queue, Retry Policy, Event History
- Temporal Client, Temporal SDK, Temporal Cloud, Temporal Service
- Namespace, Search Attribute, Data Converter
- Continue-As-New, Signal-With-Start, Update-With-Start
- Heartbeat, Heartbeat Timeout

Full list: `vale/styles/Temporal/terms.yml`

### Frontmatter

All pages use this frontmatter structure:

```yaml
---
id: page-id
title: Page Title
sidebar_label: Sidebar Label
description: Brief description for SEO and previews.
toc_max_heading_level: 4
keywords:
  - keyword1
  - keyword2
tags:
  - Tag1
---
```

## Custom Components

Import from `@site/src/components`:

```jsx
import { DocsTable, RelatedReadList, CaptionedImage } from '@site/src/components';
```

Available components:

- `DocsTable`, `DocsTableRow`, `NewDocsCell` - Formatted tables
- `JsonTable` - Render JSON as tables
- `CaptionedImage`, `ZoomingImage` - Image display
- `DiscoverableDisclosure` - Expandable sections
- `ToolTipTerm` - Hover tooltips for terms
- `RelatedReadContainer`, `RelatedReadItem`, `RelatedReadList` - Related content links
- `SdkTabs` - Language-specific tabbed content
- `RetrySimulator` - Interactive retry policy demo

See `src/components/` for implementation details and inline documentation.

## Do Not Modify

- Pinned resolutions in `package.json` (`caniuse-lite`, `qs`)
- Pricing pages (`docs/evaluate/temporal-cloud/pricing.mdx`)

## URL Structure

SDK-specific content uses language names in URLs for Algolia filtering. SDK docs live under language-specific
directories (e.g., `docs/develop/go/`, `docs/develop/python/`).

## CI/CD

PRs must pass:

- Vercel build (`yarn build`)
- Semgrep security checks
- Link validation (runs during build)

## Linting

Vale rules exist but are not strictly enforced:

```bash
yarn lint           # Run vale on all docs
yarn lint:go        # Lint Go SDK docs only
yarn lint:python    # Lint Python SDK docs only
```

## Documentation Sections

- **Evaluate** - Introduction to Temporal, why to use it, Cloud overview
- **Develop** - SDK guides organized by language
- **Production Deployment** - Self-hosted and operational guides
- **Encyclopedia** - Conceptual deep-dives on Temporal primitives

There is some duplication across sections. When updating a topic, check for consistency across related pages.
