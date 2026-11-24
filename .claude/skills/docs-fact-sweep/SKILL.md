---
description: Propagate one changed fact across all of docs/ — a corrected claim, a terminology decision, an SDK/CLI release, a breaking code change, a pricing or feature-stage change — to every page that states the old version, regardless of which section it's in. Use for requests like "sweep the docs for X", "update every page that says Y", "SDK vN broke Z, find what needs updating", "we changed pricing/plan Z, what else needs updating", or after fixing one page and asking "where else does this need to change." Different from docs-section-review (one directory, reviewed end to end) and docs-pr-review (one open PR's diff) — this is one fact, scattered anywhere in docs/, usually triggered by something outside this repo rather than a docs-side review.
argument-hint: "<old claim> -> <new claim>, or a release/PR/issue describing the change"
---

# Docs fact sweep

Takes one specific change — not a section, not a diff — and finds every page in `docs/` still stating the old
version of it. Produces a punch list for the user to triage; only edits files once they say which items to act on.

## Escape hatch

If the target is a single open PR's diff, use `docs-pr-review` instead. If it's one already-published section
reviewed end to end regardless of any specific change, use `docs-section-review` instead. This skill is for a change
that cuts across sections.

## 1. Pin down the exact change

State precisely: what was true before, what's true now, and where the new truth comes from — a PR/commit in this
repo, an SDK/CLI release or CHANGELOG, a product decision the user is relaying, or a `docs-drift-watcher`-filed
issue. If the request is vague ("check pricing is consistent"), ask for the specific before/after claim first —
searching without one produces noise, not a punch list.

If the source is an SDK/CLI release or a breaking code change (not a docs-internal correction), don't trust the
request's framing at face value. Confirm exactly what changed via step 4 *before* searching for stale docs — chasing
the wrong "new fact" wastes the whole sweep.

## 2. Search from multiple angles, not one phrase

`grep -rn` for the exact old phrasing, then again for the underlying terms individually — the same fact is worded
differently page to page (a table cell, a bullet, a sentence, a frontmatter description). Check:

- Prose pages in the obvious section.
- Reference/API tables describing the same mechanism from a different angle (a permissions matrix vs. prose, a
  metrics table vs. a guide) — these lag behind a prose fix more often than not.
- Parent/index/summary pages for the feature.
- Frontmatter `description` fields — easy to miss, restate facts for SEO.

Skip content inside `<!--SNIPSTART-->`/`<!--SNIPEND-->` blocks. That's generated from a source repo and can't be
fixed here — flag it as a source-repo issue instead if it's actually wrong (see AGENTS.md's
[Code samples and Snipsync](../../../AGENTS.md#code-samples-and-snipsync)).

## 3. Check history before assuming which version is right

Before reversing a claim, check whether it was written deliberately:

```bash
git log --all --oneline -S "<exact phrase>" -- .
gh pr view <pr-number-that-added-it>
```

A claim added on purpose (not a typo) with no cited source for reversing it is a signal to flag for confirmation,
not to silently overwrite. This is the same "needs verification" pattern as `docs-pr-review` step 4 — apply it here
too, especially when the trigger itself is a claim someone made in chat rather than a merged PR.

## 4. For an SDK/CLI release or breaking code change, verify against the code

Read [AI-KNOWLEDGE-SOURCES.md](../../../readme/AI-KNOWLEDGE-SOURCES.md) for the skill-repo table and the Temporal
knowledge MCP server. Fetch the relevant `skill-temporal-*` repo's reference files, and the SDK's own
CHANGELOG/release notes, before trusting either the old or new docs wording as ground truth.

`yarn check:metrics:sdks` already checks one narrow case (SDK metrics reference vs. SDK source) — don't re-derive
that by hand if the change is metrics-related. Run it instead.

## 5. Classify and report as a punch list

One list, not per-file findings scattered through chat:

- **Already consistent** — no change needed. Say so briefly; don't itemize each page.
- **Tier A — mechanical.** Exact phrase swap, unambiguous, same fix pattern everywhere.
- **Tier B — judgment calls.** Phrasing varies enough that each needs its own rewrite, or the fact itself couldn't
  be confirmed in step 3/4 and needs a human to confirm before editing.

Give file:line for every item in both tiers.

## 6. If applying changes

Apply Tier A in one batch once approved. Hold Tier B for the user to pick through individually — don't bundle a
judgment call into the same pass as the mechanical fixes. After edits, run `vale --config .vale-ci.ini` against
every changed file per AGENTS.md's [Commands](../../../AGENTS.md#commands) section.

Ask how the user wants the fixes grouped into PRs before opening any — a sweep like this has shipped as several
PRs split by risk tier before (Tier A separate from Tier B), not always one PR per sweep. Don't assume.

## 7. Don't let a large list die in chat

If the punch list is big enough that it won't all get fixed this session, say so and offer to write it up as a
GitHub issue instead of leaving it only in the transcript. If the sweep started from a `docs-drift-watcher` issue,
reference that issue number rather than opening a duplicate.
