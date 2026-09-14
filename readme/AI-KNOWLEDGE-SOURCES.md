# AI knowledge sources for content review

Ground-truth and research sources for an AI agent that's reviewing existing documentation or drafting new
pages — checking whether prose is technically accurate, current, and not missing a fact covered elsewhere. This file
is for the sources; the [Style guide](../AGENTS.md#style-guide) and
[INFORMATION-ARCHITECTURE.md](./INFORMATION-ARCHITECTURE.md) still own wording and placement.

## Temporal knowledge base MCP server

The authoritative setup, auth, and connection instructions live on the
[Develop with AI](../docs/with-ai.mdx#temporal-knowledge-base-mcp-server) page — don't duplicate them here, since
that page is what site readers see and this file would drift out of sync with it.

In short: it's a Kapa-powered server (`https://temporal.mcp.kapa.ai`) that answers questions against current Temporal
best practices, not training data. It requires a one-time OAuth login (Google or GitHub).

- Try it first for "is this still accurate / is there newer guidance" questions.
- If it's not connected in the current session, tell the user to run `/mcp` to authenticate (or
  `claude mcp add --transport http temporal-docs https://temporal.mcp.kapa.ai` if it isn't registered at all) and
  continue the review without it — don't block on it.

## Temporal's published skill repos

[Develop with AI](../docs/with-ai.mdx#skills) documents four Temporal-maintained skill repos. Each is a curated,
versioned knowledge source for a coding agent, and each fits a different part of the docs site best:

| Repo | Covers | Best cross-check for |
| --- | --- | --- |
| [skill-temporal-developer](https://github.com/temporalio/skill-temporal-developer) | Workflow determinism, Activity patterns, Retry Policies, error handling, testing, Worker configuration, versioning | Develop, Encyclopedia, and the SDK-specific `develop/<lang>/best-practices/` pages |
| [skill-temporal-ops](https://github.com/temporalio/skill-temporal-ops) | Namespace/API-key/mTLS/capacity administration via the `temporal` and `tcld` CLIs; symptom → root-cause diagnosis (stuck Workflow, non-determinism error, unhealthy Workers, Task Queue backlog, missed Schedule) | Troubleshooting, Temporal Cloud operations content |
| [skill-temporal-serverless](https://github.com/temporalio/skill-temporal-serverless) | Configuring, deploying, and troubleshooting Serverless Workers | Troubleshooting > Serverless Workers, Deploy to production/serverless content |
| [skill-temporal-cloud](https://github.com/temporalio/skill-temporal-cloud) | Temporal Cloud connectivity, authentication, and configuration issues | Temporal Cloud connectivity/auth pages |

Don't default to `skill-temporal-developer` for every section — pick the row that matches the section under review.
More than one row can apply; check each that's relevant.

### Fetching without installing

None of these are installed in this repo. Fetch specific files live instead of cloning:

```
https://raw.githubusercontent.com/temporalio/<repo>/main/<path>
```

`skill-temporal-developer`'s file layout (current as of this writing — re-fetch its `SKILL.md` if a path here 404s):

- `SKILL.md` — overview and routing to the files below
- `references/core/*.md` — language-agnostic concepts: `determinism.md`, `gotchas.md`, `error-reference.md`,
  `patterns.md`, `troubleshooting.md`, `versioning.md`, `priority-fairness.md`, `standalone-activities.md`,
  `ai-patterns.md`, `cli-workflow-commands.md`, `dev-management.md`, `install_cli.md`, `interactive-workflows.md`
- `references/{dotnet,go,java,python,ruby,rust,typescript}/*.md` — per-language mechanics (determinism protection,
  error handling, gotchas, patterns, testing, versioning, advanced features)
- `references/integrations.md` — framework integrations catalog (Spring Boot/AI, OpenAI Agents SDK, LangGraph,
  LangSmith, Google ADK, Pydantic AI, OpenTelemetry, Braintrust, Mastra, Vercel AI SDK)

For `skill-temporal-ops`, `skill-temporal-serverless`, and `skill-temporal-cloud`, fetch that repo's own
`SKILL.md`/`README.md` first to get its file map — it isn't cataloged here.

Treat any of this as "current per that skill's own `main` branch," not versioned against a specific docs release.
Use it to catch a claim that's stale or flatly wrong; don't rewrite prose to match its phrasing.
