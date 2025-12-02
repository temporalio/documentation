

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

# Verify CLI commands and flags before documenting

When documenting CLI commands, options, or flags, always verify they actually exist before including them in documentation. Do not infer or assume that flags exist based on typical CLI patterns.

**How to verify:**
- Check the CLI reference documentation in the docs repo (e.g., `docs/cli/*.mdx` files)
- Run `temporal [command] --help` if you have access to the CLI
- Search the temporal/cli repository for the flag name
- If you can't verify a flag exists, leave it out rather than documenting something incorrect

**Common mistake:** Inferring that a flag like `--reapply-type` exists because the opposite pattern `--reapply-exclude` exists. These are not equivalent and the inverse may not exist.

**When in doubt:** Document only what you can verify. It's better to have incomplete documentation that's accurate than complete documentation that includes non-existent options.

# Avoid incorrectly claiming features are platform-specific

Don't claim that CLI flags, commands, or features are specific to Temporal Cloud or Temporal Server when they work across both platforms. Many CLI flags and features work identically regardless of whether you're connecting to a local Temporal Server or Temporal Cloud.

**Common mistake:** Stating "For Temporal Cloud, specify the namespace with `--namespace`" when the `--namespace` flag works for both Temporal Server and Temporal Cloud (and defaults to `default` if not specified).

**Do:**
- ✅ "Use `--namespace` to specify a different Namespace (defaults to `default`):"
- ✅ "The `--namespace` flag lets you target a specific Namespace."

**Don't:**
- ❌ "For Temporal Cloud, specify the namespace with `--namespace`"
- ❌ "Temporal Cloud users should use `--namespace`"

**When to distinguish:** Only explicitly call out Cloud vs. Server differences when features are genuinely exclusive to one platform (e.g., Cloud-specific authentication requirements with certificates, or Server-specific local database options).
