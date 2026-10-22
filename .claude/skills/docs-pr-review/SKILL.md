---
description: Review an open pull request on temporalio/documentation — check whether it's in scope per AGENTS.md's Code Review Rules, read existing bot/human comments so findings aren't duplicated, fact-check technical claims against the rest of docs/, git history, and Temporal's knowledge sources/skill repos, then report tiered findings. Use for requests like "review this PR", "check PR #1234", or a pasted github.com/temporalio/documentation/pull/... URL. Also covers the follow-up: applying agreed fixes to the PR branch and posting a non-blocking follow-up comment for deferred items. Not for auditing an already-published site section with no open PR — use docs-section-review for that.
argument-hint: "<PR URL or number>"
---

# Docs PR review

Reviews one open pull request end to end: scope check, existing comments, the three AGENTS.md review dimensions, and
a technical fact-check against sources this repo doesn't contain. Reports findings for the user to triage before
anything is written or posted.

## 1. Check whether the PR is in scope

Apply AGENTS.md's [Code Review Rules](../../../AGENTS.md#code-review-rules) scope filter before doing anything else:

```bash
gh pr view <number> --json title,body,url,headRefName,baseRefName,state,files,additions,deletions,author,isDraft
gh api repos/temporalio/documentation/pulls/<number> --jq '{author_association, mergeable_state}'
```

Skip the review (say why, stop) if the PR: touches no files under `docs/`, is from Dependabot or a lockfile-only
change, was opened by the `temporal-cicd` app, is a revert, or is from an author with `author_association` outside
the org (`NONE`/`FIRST_TIME_CONTRIBUTOR`/etc.) — unless a maintainer is asking for the review directly in this
conversation, which is itself sufficient authorization to proceed.

## 2. Read existing comments first

```bash
gh pr view <number> --comments
gh api repos/temporalio/documentation/pulls/<number>/comments
```

Bots (Codex, CodeRabbit, etc.) often already flag real issues. Verify each one against the current file state instead
of re-deriving it from scratch — don't duplicate a comment that's still valid, and say so if one is stale (already
fixed, or based on a misread of the diff).

## 3. Read the diff and apply the three review dimensions

```bash
gh pr diff <number>
```

Apply AGENTS.md's [Code Review Rules](../../../AGENTS.md#code-review-rules) three dimensions:

1. **Collateral changes** — grep the rest of `docs/` for pages stating the same fact the diff changes. Name specific
   files and line numbers, not a general "check other pages" reminder. Check parent/index/summary pages for a
   feature the diff only updates in one child page.
2. **Structural fit** — does a new/moved page belong in its section per
   [INFORMATION-ARCHITECTURE.md](../../../readme/INFORMATION-ARCHITECTURE.md)? Heading/section count limits (10
   top-level, 15 total). Frontmatter `tags` matching siblings.
3. **Text tone** — generated register (junk-drawer lists, "quietly," jargon-as-casual-speech, long low-information
   sentences) and marketing register (leading questions, vague intensifiers). `docs/evaluate/` gets the relaxed line;
   everything else gets the strict one.

Don't flag anything CI already reports (redirects, orphans, broken links, Mermaid syntax, `.vale-ci.ini` rules) — see
[AUTOMATIONS.md](../../../readme/AUTOMATIONS.md).

## 4. Fact-check technical claims against sources outside this repo

For any claim the diff makes about product behavior (not just wording), check it before trusting it:

- Try the Temporal knowledge MCP server / `search_temporal_knowledge_sources` tool if connected. Note it may just
  echo this repo's own published pages back — that confirms current *documented* state, not actual product
  behavior, so treat a match as weak evidence, not proof.
- Fetch the relevant `skill-temporal-*` repo per [AI-KNOWLEDGE-SOURCES.md](../../../readme/AI-KNOWLEDGE-SOURCES.md).
- Check this repo's own git history for the claim being changed: `git log --all --oneline -S "<exact phrase>" -- .`
  and `gh pr view <number-that-added-it>` for the rationale and author. A claim that was added deliberately (not a
  typo fix) and is now being reversed with no cited source is a signal to flag, not to silently trust either version.
- Check sibling reference tables/pages in this repo that describe the same mechanism from a different angle (e.g. an
  API permissions matrix vs. prose describing the same rule) — a diff can make prose internally consistent while
  leaving it inconsistent with a reference table elsewhere.

If a claim can't be confirmed from any of the above, say so explicitly and recommend the author/reviewer confirm with
whoever owns that product area — don't guess, and don't assert the PR is wrong just because it changes existing text.

## 5. Report findings, tiered

Report in chat (don't post to GitHub yet):

- **Needs verification** — technical claims from step 4 that couldn't be confirmed from repo sources. Lead with
  this if present; it's the one category that can mean the PR is factually backwards.
- **Collateral changes** — specific files/lines from step 3.1, including confirming or correcting any existing bot
  comments from step 2.
- **Structural fit** and **text tone** — from step 3.2/3.3.

Run `vale --config .vale-ci.ini docs/<changed files>` and fold in anything it reports (should normally be clean,
since that's the CI gate).

## 6. If the user directs fixes

Only after the user says which findings to act on:

1. `git fetch origin <headRefName>` and `git checkout -b <headRefName> origin/<headRefName>` — confirm
   `isCrossRepository` is `false` first (`gh pr view <number> --json isCrossRepository`); a fork needs a different
   remote and can't be pushed to directly.
2. Make the edits, re-run `vale --config .vale-ci.ini` on changed files.
3. Commit and push to the same branch — this pushes to a shared PR, so treat it like any other push: it's expected
   here because the user just asked for it, not a standing authorization for future turns.
4. Switch back to whatever branch the user was on before this skill started.

## 7. Deferred items → non-blocking comment

For findings the user wants to ship now and fix later, post one `gh pr comment` with a clear "non-blocking" header
and a bulleted list of file:line references — not one comment per item. State the finding and the fix; don't say
whether it should block the merge (AGENTS.md already settled that by deferring it).
