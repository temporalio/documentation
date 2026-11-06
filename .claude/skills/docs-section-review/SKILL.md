---
description: Review an already-published documentation section on docs.temporal.io — a section landing page (e.g. docs/references/index.mdx, docs/troubleshooting/index.mdx) and every child page already linked from it and wired into sidebars.js. Use for requests like "review the references section", "audit the troubleshooting docs", "does this section need an update", or "review docs/best-practices" when that section already exists and is live. Checks structural fit, meta-description/title quality, frontmatter consistency, index/sidebar drift, and technical accuracy via the Temporal docs MCP server and Temporal's published skill repos. If the target content is NOT yet a live page wired into sidebars.js — e.g. turning provided source material into a brand-new page — use docs-page-from-source instead.
argument-hint: "<section name, path, or URL>"
---

# Docs section review

Reviews one section of docs.temporal.io end to end: the section's landing page, every page it links, and how that
section fits the rest of the site. Produces a findings report; only edits files once the user says which findings to
act on.

## Escape hatch

Before starting: if the request is actually about content that doesn't exist on the site yet (a doc pasted or
attached by the user, a draft not yet in `sidebars.js`), stop and use `docs-page-from-source` instead. This skill is
for auditing what's already live, not for drafting something new.

## 1. Resolve the section

Find the section's index page (`docs/<section>/index.mdx`) and its `sidebars.js` category. A category looks like:

```js
{
  type: 'category',
  label: '...',
  link: { type: 'doc', id: '<section>/index' },
  items: ['<section>/page-a', '<section>/page-b', ...],
}
```

Include nested sub-categories (e.g. `troubleshooting/serverless-workers` is its own nested category with its own
`index`). Read every page the `items` array names — that's the full scope of the review.

## 2. Run the cheap automated checks first

```bash
yarn check:orphans
```

Run `yarn check:metrics` too, but only if `docs/references/sdk-metrics.mdx` is in scope for this review. Don't
hand-derive what these already check.

## 3. Check index/sidebar drift

The index page's body (a bullet list, or themed `##` groups — check which) and the category's `sidebars.js` `items`
array are two independently maintained lists. The correct drift check is:

- Every doc id in this category's `items` array should appear somewhere in the index page's links (in whatever
  structure it uses), or be a deliberate, defensible omission.
- Every link in the index page should resolve to a doc id that exists **somewhere** in `sidebars.js` — not
  necessarily in this category. Cross-section links are legitimate: `troubleshooting/index.mdx` correctly links to
  `/production-deployment/worker-deployments/recover-pinned-workflows`, which lives in a different category. Don't
  flag a cross-section link as drift.

## 4. Read the guidance you need

Always read `readme/INFORMATION-ARCHITECTURE.md` for this section's stated purpose and any known structural debt
already noted there — but don't treat it as complete. It's missing at least one real top-level section
(`docs/guides`) as of this writing. If something about the section's fit looks off and the IA doc is silent, check
the actual top-level categories in `sidebars.js` instead of assuming the IA doc is exhaustive.

Read `readme/STYLE.md` and `readme/COMPONENTS.md` only if a specific page's wording or component usage looks
questionable — most terminology/capitalization is already Vale's job (see step 7).

## 5. Per-page frontmatter and meta-description check

For every page in scope, check against AGENTS.md's [Frontmatter](../../../AGENTS.md#frontmatter) and
[Meta descriptions](../../../AGENTS.md#meta-descriptions) sections explicitly — this step is easy to skip because it
requires reading each page's frontmatter individually, not skimming prose:

- `tags` match sibling pages in the section.
- `description` is roughly 120-155 characters, leads with the page's most important term, doesn't restate the title,
  and doesn't open with a throat-clearing verb ("Learn," "Discover," "Explore," ...).

## 6. Apply the existing review lens to the whole section

AGENTS.md's [Code Review Rules](../../../AGENTS.md#code-review-rules) define three dimensions for reviewing a PR
diff. Apply the same three dimensions here, to the section's current state instead of a diff:

1. **Collateral changes** — does content in this section restate a fact that's stated (or now outdated) elsewhere in
   `docs/`? Name the other files.
2. **Structural fit** — per step 4. Is any page long enough to split (10+ top-level headings, 15+ total)? Do a large
   part of a page's content actually belong elsewhere?
3. **Text tone** — generated register (junk-drawer lists, "quietly," jargon-as-casual-speech) and marketing register
   (leading questions, vague intensifiers). Reference pages and this section, unless it's `docs/evaluate/`, get the
   strict line from AGENTS.md, not the relaxed one.

Don't flag anything CI already reports (redirects, orphaned pages, broken links, Vale's `.vale-ci.ini` rules,
Mermaid syntax) — see `readme/AUTOMATIONS.md` for the full list of what already runs on every PR.

## 7. Research technical accuracy

Read `readme/AI-KNOWLEDGE-SOURCES.md` for the full instructions. In short:

- Try the Temporal docs MCP server (`temporal-docs`) first. If it's not connected, tell the user to run `/mcp` and
  continue without it.
- Fetch the reference files from whichever `skill-temporal-*` repo best matches this section's topic (the table in
  `readme/AI-KNOWLEDGE-SOURCES.md` maps section topics to the right repo).
- Use web search for anything time-sensitive (recent SDK/CLI changes, new features) that neither source covers.

Every finding from this step is a judgment call (Tier B below) — never silently rewrite a technical claim based on
this research; state the discrepancy and let the user confirm it before it's treated as ground truth.

## 8. Report findings, tiered

Group findings into two tiers, don't mix them:

- **Tier A — mechanical, unambiguous fixes.** Meta-description length/opener violations, a missing `tags` entry that
  should obviously match siblings, index/sidebar drift with one clear resolution. Propose these as a single batch;
  ask once whether to apply all of them.
- **Tier B — judgment calls.** Structural moves, tone rewrites, anything from step 7's research, any collateral
  change spanning multiple files. Present each with the fact, the file(s), and the suggested fix. Hold these for
  discussion — don't bundle them into the Tier A batch and don't apply any of them without the user picking which to
  act on.

## 9. If applying changes

- Only touch `vercel.json` when an approved Tier B recommendation moves, renames, or deletes a page. Don't audit
  redirects wholesale — CI's Check Redirects job already gates that on every PR.
- After edits, run `vale --config .vale-ci.ini docs/` against every file you touched and resolve every result unless
  it's a genuine false positive (see AGENTS.md's [Commands](../../../AGENTS.md#commands) section for what counts).
