---
description: Turn source material the user pasted, attached, or linked — a draft doc, an SME write-up, notes — into a new page on docs.temporal.io, matching the site's structure and style without changing its substance. Use for requests like "turn this into a page under /docs/best-practices", "add this as a new page", "create a doc from this content", when the content does not yet exist as a page and is not yet wired into sidebars.js. If the target is already a live page in sidebars.js, use docs-section-review instead — that's an audit of existing content, not authoring new content.
argument-hint: "<source content> into <target section>"
---

# Docs page from source

Adapts user-provided content into a new page that fits the site: right section, right frontmatter, right structure,
matching sibling pages — while preserving the source's substance. The source author (often a subject-matter expert)
owns the technical content; this skill owns the fit and style, not the facts.

## Escape hatch

Before starting: if the target already exists as a page and is wired into `sidebars.js`, this is an audit of
existing content, not new authoring — use `docs-section-review` instead.

## 1. Determine the target section

Use `readme/INFORMATION-ARCHITECTURE.md` to choose the section. If the user's target name is ambiguous, say so and
ask rather than guessing. One known ambiguity: `/docs/best-practices` (a top-level, platform-wide section) is a
different thing from a per-SDK `develop/<lang>/best-practices/` subfolder (e.g. `develop/python/best-practices/`,
`develop/go/best-practices/`) — both exist in `sidebars.js`. Confirm which one before writing anything.

## 2. Check for collateral overlap

Search `docs/` for existing pages already covering the same ground as the new content. This mirrors AGENTS.md's
Code Review Rules "collateral changes" dimension, applied before adding content instead of after. If an existing
page covers the same or adjacent territory, note it — and where it makes sense, plan a cross-link — rather than
silently duplicating or leaving the two disconnected. Don't rewrite the existing page without asking.

## 3. Match the section's conventions

Read 2-3 sibling pages already in the target section for:

- Frontmatter shape (which fields, `tags` used by siblings).
- Heading style and structure.
- Components already in use — check `readme/COMPONENTS.md` before inventing an inline HTML pattern.

## 4. Read the section's index page structure before touching it

Section index pages are not all the same shape. `docs/troubleshooting/index.mdx` and `docs/references/index.mdx` are
flat bullet lists (`[Title](/path): description`). `docs/best-practices/index.mdx` is organized into themed `##`
groups, each with an intro paragraph, bold-linked bullets (`**[Title](./file.mdx)** — description`), and a closing
`:::note Scope`. Match whatever the actual target index page does:

- Flat list → append a bullet in the existing format.
- Themed groups → place the new bullet in the group it best fits. If no existing group fits, say so and ask before
  inventing a new one.

## 5. Rewrite for site conventions, not substance

Apply AGENTS.md's [Style guide](../../../AGENTS.md#style-guide) and [Frontmatter](../../../AGENTS.md#frontmatter)
sections (terminology, heading case/verb form, meta-description rules) to the provided content. Do not change what
it claims technically. If a specific technical claim reads as unclear, outdated, or something you can't verify from
this repo, flag it in your summary for the source author/an SME to confirm — don't quietly reword it into something
different.

## 6. Create the page, then wire it in

1. Create the new `.mdx` file with frontmatter matching step 3's conventions.
2. Update the section's index page per step 4.
3. Add the new doc id to the category's `items` array in `sidebars.js` (a flat insert, regardless of what shape the
   index page itself uses).
4. Add a `vercel.json` redirect only if this page replaces or moves an existing URL — not needed for a genuinely new
   page.

## 7. Verify before finishing

Run `vale --config .vale-ci.ini docs/` against the new/changed files and resolve every result, per AGENTS.md's
[Commands](../../../AGENTS.md#commands) section.

## 8. Summarize

State what was created and changed (new page, index update, sidebar update), and list anything flagged in step 5 for
the source author or an SME to confirm.
