

# Documentation updates regarding SDKs

When making updates to documentation about an SDK, you should generally see if similar documentation exists for another SDK, so you can generally follow the patterns in that documentation. Note: this does not mean that if you don't see documenation for that feature for another SDK, you should avoid creating it for this one. 

# Cross-repository PR references

When creating suggestion descriptions that reference PRs from other repositories (e.g., sdk-python, sdk-go, temporal server, etc.), always use either GitHub's cross-repo syntax or full URLs instead of shorthand notation like "PR #1222" or "sdk-python PR #1222".

**Why:** GitHub auto-links "#1222" to the current repository's PR #1222, not to the intended repository. This creates confusion and broken/incorrect links.

**Do:**
- ✅ "This reflects the bug fix in temporalio/sdk-python#1222" (preferred - uses GitHub's cross-repo syntax)
- ✅ "Based on changes in temporalio/temporal#5678"
- ✅ "This reflects the bug fix in https://github.com/temporalio/sdk-python/pull/1222" (also acceptable, more verbose)

**Don't:**
- ❌ "This reflects the bug fix in sdk-python PR #1222" (GitHub will link to temporalio/documentation#1222)
- ❌ "Based on PR #5678" (ambiguous which repository)
- ❌ "sdk-python#1222" (missing organization name)

**Format:** `owner/repo#number` (e.g., `temporalio/sdk-python#1222`)

This applies to suggestion titles, descriptions, and any PR comments you make.

# Scope control: Be surgical with edits

When making documentation updates, be very focused and minimal in your changes. If the trigger event is about a simple value change (e.g., a configuration default changing from 5 to 10, a version number update, a parameter name change), limit your edits to only what's necessary to reflect that specific change.

**Don't:**
- Rewrite surrounding prose when it's not necessary
- Make stylistic improvements to adjacent content
- Add explanatory text that wasn't part of the original request
- Restructure sections just because you're already editing nearby

**Do:**
- Make the specific change requested (e.g., update the value in a code example)
- Fix any directly related references to that value in the immediate context
- Ensure technical accuracy of the specific change

Example: If a dynamic config default changes from 5 to 10, update the number in the command example and any direct references to that threshold - but don't rewrite the explanation about what the feature does unless it's technically incorrect. 