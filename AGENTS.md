# AGENTS.md

Guidance for AI coding agents working in the [Temporal documentation](https://github.com/temporalio/documentation)
repository.

## Read these first

| Topic                        | File                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| Where content belongs        | [INFORMATION-ARCHITECTURE.md](./readme/INFORMATION-ARCHITECTURE.md) |
| React components in MDX      | [COMPONENTS.md](./readme/COMPONENTS.md)                             |
| Mermaid diagrams             | [MERMAID.md](./readme/MERMAID.md)                                   |
| LLM Markdown pipeline        | [MARKDOWN_PIPELINE.md](./readme/MARKDOWN_PIPELINE.md)               |
| Component → Markdown mapping | [COMPONENT_REGISTRY.md](./readme/COMPONENT_REGISTRY.md)             |
| CI jobs and scheduled jobs   | [AUTOMATIONS.md](./readme/AUTOMATIONS.md)                                  |

## Repository overview

- **Site:** Docusaurus static site for [docs.temporal.io](https://docs.temporal.io).
- **Content:** MDX files under `docs/`. URLs are served at the site root (`/workflows`), not under `/docs/`.
- **UI code:** React components in `src/components/`. Sidebar navigation is in `sidebars.js`.
- **Redirects:** Legacy URL changes go in `vercel.json` before or alongside file moves.

## Where to put content

Use [INFORMATION-ARCHITECTURE.md](./readme/INFORMATION-ARCHITECTURE.md) to choose the section.

## Style guide

Follow [STYLE.md](./readme/STYLE.md) and Vale rules in `vale/styles/`. The most common mistakes:

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

Follow [STYLE.md](./readme/STYLE.md) and the [Google developer documentation style guide](https://developers.google.com/style)
for tone (conversational, second person, active voice) and structure (short paragraphs, one idea per sentence). A few
additions specific to model output:

- Cut filler that adds no information: "it's worth noting that," "in order to," "simply," "easily," "just."
- Avoid vague intensifiers doing the work a specific fact should do: "powerful," "robust," "seamless," "cutting-edge,"
  "leverage" (use "use"), "unlock," "elevate," "streamline." Replace with what the thing actually does.
- Don't pad a page to look thorough. Prefer brevity over overly-verbose paragraphs.
- Do not add emojis to documentation prose and use em-dashes sparingly.

### Word choice

Prefer common, concrete verbs and nouns.

| Prefer | Instead of                                                |
| ------ | --------------------------------------------------------- |
| use    | utilize, leverage                                         |
| help   | facilitate                                                |
| to     | in order to                                               |
| many   | numerous, various (when you can be specific, be specific) |

### Tense and time

Document current behavior. Don't make future promises. Tie claims to a version, release note, or release stage when that
matters.

| Prefer                                                                | Instead of                                 |
| --------------------------------------------------------------------- | ------------------------------------------ |
| Temporal Server v1.31.0 and later supports Cassandra 5.0.4 and later. | A future release will support Cassandra 5. |

## Frontmatter

Typical fields:

```yaml
---
id: page-id
title: Page title
sidebar_label: Short label
description: One sentence for SEO and previews.
tags:
  - Concepts
---
```

- Write `description` as a single clear sentence.
- Do not change `id` or `slug` without a redirect plan.
- Match `tags` to sibling pages in the same section. Use existing tags; don't add new ones unless it's a new feature.
- Do not add a `keywords` field. It isn't used by the site.

## MDX and components

- Pages are `.mdx` with YAML frontmatter (see [Frontmatter](#frontmatter) above).
- Import shared components from `@site/src/components` unless a page uses a one-off import path already established
  nearby.
- Before adding a component, check [COMPONENTS.md](./readme/COMPONENTS.md) and
  [COMPONENT_REGISTRY.md](./readme/COMPONENT_REGISTRY.md).
- Reuse existing components (`Tabs`, `SdkTabs`, `CaptionedImage`, `ViewSourceCodeNotice`, etc.) instead of inventing
  inline HTML patterns.
- Interactive demos live in `src/components/elements/`. Export new public components from `src/components/index.js` when
  needed.

## URLs and navigation

Adding or moving pages usually requires:

- Updating `sidebars.js` for navigation placement
- Adding redirects in `vercel.json` when the public URL changes
- Fixing internal links across the repo

## Code samples and Snipsync

- Prefer code extracted from CI-enabled sample repos via [Snipsync](https://github.com/temporalio/snipsync).
- Snippets are wrapped in `<!--SNIPSTART id-->` / `<!--SNIPEND-->`. Edit the **source repo** named inside the wrapper,
  then run `yarn snipsync`.

## Pull requests

- If the change is blocked on something outside the docs team's control (for example, an upstream PR in another repo, an
  unreleased SDK feature, or a decision pending from another team), open the PR as a **draft**, not a regular PR. Only
  mark it ready for review once the blocker clears and the docs team can actually merge it.

## Commands

Requires Node.js 24+ and Yarn.

```bash
yarn              # Install dependencies
yarn start        # Dev server at http://localhost:3000
yarn build        # Production build; catches MDX/build errors
yarn check-links  # Broken link check (run after build)
yarn snipsync     # Refresh Snipsync code snippets
```

Reference page checks:

```bash
yarn check:metrics       # SDK metrics reference against itself; runs in CI on PRs
yarn check:metrics:sdks  # SDK metrics reference against the SDK sources; advisory, clones the SDK repos
yarn check:orphans       # docs pages Docusaurus renders but no sidebar entry links to; not yet wired into CI
```

`yarn check:metrics:sdks` reports metrics an SDK defines but the page omits. When one is deliberately left undocumented,
record it in `bin/metrics-baseline.json` rather than suppressing the check.

`yarn check:orphans` reports pages that will build and get a real URL but aren't reachable from `sidebars.js`. A page
that should stay linkable without navigation belongs in frontmatter as `unlisted: true`, not `draft: true` (draft pages
don't build in production at all, which 404s any inbound links). A page that's a known, accepted exception for now
belongs in `bin/orphan-pages-baseline.json` with a note, rather than being silently ignored. See
[UTILITIES.md](./readme/UTILITIES.md) for details.

Vale linting (style):

```bash
yarn lint:py                          # Example: lint Python SDK docs
vale --config .vale-ci.ini docs/      # CI-scoped rules only (what PR checks run)
vale docs/                            # Full Vale style set
```

Before finishing any docs change, run the CI-scoped command (`vale --config .vale-ci.ini docs/`) against the files you
touched and resolve every result it reports, unless it's a genuine false positive (for example, a heading that's a literal
command/metric name, or a bare URL that must stay absolute for autolinking). `.vale-ci.ini` enables only the small set
of high-confidence rules (`Temporal.Headings`, `Temporal.RelativeLinks`) that gate PRs in
`.github/workflows/vale-ci.yml` — treat that as the bar to hit.

Do not use the full Vale style set (plain `vale docs/`, no `--config`) to judge whether a change is done. It runs many
noisier suggestion-level rules that are not enforced in CI and are not a requirement for this repo.

`.vale-ci.ini` enables only the small set of high-confidence rules (`Temporal.Headings`, `Temporal.RelativeLinks`) used
as a CI gate in `.github/workflows/vale-ci.yml`. `.vale.ini` (the default config) runs the full style set, which
includes noisier suggestion-level rules not enforced in CI.

## Code Review Rules

Guidance for automated reviewers on pull requests. Review a pull request when it changes files under
`docs/`. Skip Dependabot pull requests, lockfiles, and changes outside `docs/`.

Check the three things below. Each one needs judgment that a lint rule cannot supply, which is why
they are the whole scope of the review. Findings are advisory: the human reviewer decides what to act
on and owns the merge.

### 1. Collateral changes

The same fact usually appears on several pages, and a pull request that changes it in one place often
misses the others.

- Search the rest of `docs/` for pages that state the same fact, and name the ones that should
  probably change too. Give paths.
- When a page documents something belonging to a larger feature, check whether the parent, summary,
  and index pages for that feature need the same addition.

Name specific files. A general reminder to check other pages is not a finding.

### 2. Structural fit

- Does a new or moved page belong in the section it was put in? Use
  [INFORMATION-ARCHITECTURE.md](./readme/INFORMATION-ARCHITECTURE.md).
- Does a large part of the page cover content that belongs on another page or in another section?
- Is the page long enough to split? Aim for fewer than 10 top-level headings and fewer than 15
  headings in total.
- Do the frontmatter `tags` match the sibling pages in the same section?

### 3. Text tone

Flag the writing, never the author. Say nothing about who wrote the text or how it was produced.

Generated register:

- Long sentences carrying little information, such as "That distinction matters because ...".
- Software jargon used as casual speech: "cross-cutting", "load-bearing".
- "Quietly" or similar words added to a sentence that does not need them.
- Junk drawer lists, meaning bullets collected under one heading with no shared idea holding them
  together.

Marketing register:

- Opening a page with a leading question.
- Repeated, eager mentions of paid features where they are not the subject.
- Vague intensifiers standing in for a fact. See [Writing style](#writing-style) above.

Pages under `docs/evaluate/` are allowed some marketing register. Hold reference, develop, and
production-deployment pages to a stricter line.

### What not to flag

- Anything CI already reports. Redirects, orphaned pages, broken links, build failures, Mermaid
  syntax, and the Vale rules in `.vale-ci.ini` all run on every pull request. See
  [AUTOMATIONS.md](./readme/AUTOMATIONS.md).
- Terminology, capitalization, and word choice. Vale owns these. Rules that Vale does not enforce
  today get added to Vale, not to this review.
- Content inside `<!--SNIPSTART-->` and `<!--SNIPEND-->` blocks. That code comes from a sample
  repository and cannot be fixed here. A snippet that disappeared, or prose that no longer matches
  the snippet it describes, is still worth flagging.
- Product behavior you cannot confirm from this repository. Ask instead of guessing.

### How to leave comments

- Anchor a finding to a line when it has one. Put the rest, such as a page in the wrong section, in
  the review body.
- One finding per comment, with the path and the fix you are suggesting.
- Group nits rather than posting each one separately, and keep them few.
