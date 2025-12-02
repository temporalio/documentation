

# Documentation updates regarding SDKs

When making updates to documentation about an SDK, you should generally see if similar documentation exists for another SDK, so you can generally follow the patterns in that documentation. Note: this does not mean that if you don't see documenation for that feature for another SDK, you should avoid creating it for this one. 

**Platform-wide features:** When documenting features that are server-side or platform-wide (such as workflow reset, Web UI functionality, CLI commands, or other operations that work identically across SDKs), consider whether the documentation should be added to all SDK pages rather than just one. These features often don't require SDK-specific code examples and should be consistently documented across all SDKs for discoverability. 

# Key Terms and Proper Nouns

Only introduce new proper nouns when really necessary. If you do ever have to introduce a proper noun, you should also include an entry in the glossary at docs/glossary.md to explain that proper noun. 

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

When making documentation updates, be very focused and minimal in your changes. 

**Don't:**
- Rewrite surrounding prose when it's not necessary
- Make stylistic improvements to adjacent content
- Add explanatory text that wasn't part of the original request
- Restructure sections just because you're already editing nearby

**Do:**
- Make the specific change requested (e.g., update the value in a code example)
- Fix any directly related references to that value in the immediate context
- Ensure technical accuracy of the specific change
