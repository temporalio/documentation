---
applyTo: "docs/encyclopedia/retry-policies.mdx"
excludeAgent: "cloud-agent"
---

# Required Kapa verification for this test review

This branch is an MCP integration test and must not be merged. For this test only, extend the usual AGENTS.md review scope to verify the changed technical claim through the repository-configured `kapa` MCP server.

Before completing the review, invoke the read-only knowledge search tool exposed by `kapa`. Send this exact query, including the marker:

"KAPA-REVIEW-PROBE-20261007-NONRETRYABLE: In a Temporal Retry Policy, are Non-Retryable Errors matched against an Application Failure's type field or its message field?"

An actual MCP tool call is required even if you already know the answer from repository files, model knowledge, memory, or another review. A shell command, browser search, or web fetch does not satisfy this test. Discover the available Kapa tool name rather than guessing it. Do not read or print authentication secrets, and do not invoke feedback or other write tools.

Use the tool response to assess the changed claim, cite a returned source URL in the finding, and suggest the correction if needed.

Include a verification statement in the review summary:

- `KAPA_VERIFICATION: CALLED` only if the tool returned a successful response. Include the tool name, exact query, and a returned source URL.
- `KAPA_VERIFICATION: FAILED` if an attempted call failed. Include the tool name and the non-sensitive error.
- `KAPA_VERIFICATION: UNAVAILABLE` if no Kapa search tool is exposed. Say that no call was made.

Do not claim MCP verification without a successful tool response. Continue the ordinary review if the tool is unavailable or fails.
