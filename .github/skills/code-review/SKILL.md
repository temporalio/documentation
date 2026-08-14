---
name: code-review
description: >-
  Review pull requests in the Temporal documentation repository against AGENTS.md
  and docs style conventions. Use when reviewing docs, MDX, sidebar, redirect, or
  Docusaurus changes in temporalio/documentation.
---

# Temporal documentation code review

Review this PR as a Temporal docs change. Prefer concrete, actionable comments.
Cite paths when asking for a fix. Do not nitpick optional style that Vale does not
enforce in CI unless it hurts clarity or correctness.

## Read these first (when relevant to the diff)

| Topic | File |
| ----- | ---- |
| Agent / repo guidance | [AGENTS.md](../../../AGENTS.md) |
| Where content belongs | [readme/INFORMATION-ARCHITECTURE.md](../../../readme/INFORMATION-ARCHITECTURE.md) |
| Style | [readme/STYLE.md](../../../readme/STYLE.md) |
| React components in MDX | [readme/COMPONENTS.md](../../../readme/COMPONENTS.md) |
| Component → Markdown mapping | [COMPONENT_REGISTRY.md](../../../COMPONENT_REGISTRY.md) |
| Mermaid | [readme/MERMAID.md](../../../readme/MERMAID.md) |
| LLM Markdown pipeline | [MARKDOWN_PIPELINE.md](../../../MARKDOWN_PIPELINE.md) |
| CI / automations | [readme/AUTOMATIONS.md](../../../readme/AUTOMATIONS.md) |

## Must-check for every docs PR

### Correctness and scope

- Claims match current product behavior (no future promises unless tied to a version or release stage).
- New or moved pages land in the right IA section.
- Changing `id` or `slug` includes a `vercel.json` redirect plan.
- Adding or moving pages updates `sidebars.js` and fixes inbound links when needed.
- Draft PRs are appropriate when blocked on upstream/SDK/other-team work (see AGENTS.md Pull requests).

### Temporal terminology (flag these)

- Capitalize Temporal core terms as proper nouns (Workflow, Activity, Worker, Namespace, etc.).
- Prefer **Temporal Service** over **Cluster** / **Temporal Cluster** in body prose (exceptions: Multi-Cluster Replication, code/config identifiers, CLI names).
- Outside core terms, spell out "identifier." For core terms use `Id` (not `ID` / `id`), e.g. Workflow Id.
- Prefer **use** over utilize/leverage; avoid filler and vague intensifiers (powerful, robust, seamless, unlock, streamline).

### Headings and frontmatter

- Headings: sentence case; prefer infinitive or questions; Develop pages use task-oriented headings.
- Frontmatter: clear one-sentence `description`; match `tags` to siblings; do **not** add unused `keywords`.
- Do not invent new tags/keywords unless this is a genuinely new feature area.

### MDX and components

- Prefer shared imports from `@site/src/components`.
- Reuse existing components (`Tabs`, `SdkTabs`, `CaptionedImage`, etc.) instead of one-off HTML.
- New public components should be exported from `src/components/index.js` when needed.
- Check COMPONENTS.md / COMPONENT_REGISTRY.md before blessing a new pattern.

### Code samples

- Prefer Snipsync from CI-enabled sample repos when a matching snippet exists.
- Snip edits belong in the **source** sample repo, then `yarn snipsync`.

### Style / CI bar

- CI-scoped Vale is the merge bar: `vale --config .vale-ci.ini` on touched files (Headings + RelativeLinks).
- Do not require fixing the full Vale suggestion set unless the author opted into it.
- Relative internal links preferred where Vale RelativeLinks applies.

## Diff-type checklists

### New or heavily rewritten MDX page

- [ ] IA placement and sidebar entry
- [ ] Redirects if URL changed
- [ ] Terminology + headings + description
- [ ] Components reused appropriately
- [ ] Samples: Snipsync or justified docs-owned code

### `sidebars.js` / navigation only

- [ ] IDs resolve to real pages
- [ ] Nesting and labels match section conventions

### `vercel.json` redirects

- [ ] Old public paths covered
- [ ] Destinations are current canonical URLs

### UI / React (`src/components`, theme, CSS)

- [ ] Fits existing design system; no one-off layout inventions without need
- [ ] Accessibility basics (labels, contrast) when relevant
- [ ] Public exports updated if a new shared component is introduced

### Config / build (`docusaurus.config.js`, plugins)

- [ ] Internal footer/`to:` links are real routes (plugin-generated files like `/llms.txt` need absolute URLs or they break `onBrokenLinks: 'throw'`)

## How to leave comments

- Group related nits; lead with blockers (wrong term, broken URL, missing redirect/sidebar).
- Separate **blocking** vs **suggestion**.
- If unsure about product behavior, ask rather than inventing.

## Out of scope for this skill

- Rewriting the entire PR in review comments
- Enforcing full Vale / Google style beyond AGENTS.md and CI-scoped rules
