# Docs architecture guidance

This document describes the purpose, audience, and content type for each top-level section of the Temporal documentation. Use it when deciding where new content belongs, what form it should take, and who it should address.

## Quickstarts

- **Audience:** Developers trying Temporal for the first time.
- **Content type:** Tutorial.
- **Description:** Each quickstart gets the reader to a working "Hello World" in their language of choice, using the development server.

## Evaluate

- **Audience:** Technical decision-makers, architects, and developers deciding whether Temporal fits their problem.
- **Content type:** Explanations and interactive demos.
- **Description:** This section answers "What is Temporal and why would I use it?" It covers:
    - Temporal's value proposition, feature inventory, use cases
    - Temporal Cloud's operational characteristics (pricing, SLA, regions, limits).

    Content here should help the reader make a decision, not build something. Avoid code examples beyond brief illustrations. Link to Develop for implementation details and to Encyclopedia for conceptual details.

## Develop

- **Audience:** Software developers actively building Temporal applications.
- **Content type:** How-to
- **Description:** Each SDK section follows a consistent structure: installation, Workflows, Activities, Workers, Clients, message passing, testing, observability, and Nexus. Pages should show how to accomplish specific tasks with working code.

    Cross-link to Encyclopedia for conceptual depth, but keep each page focused on "how do I do X in language Y."

    Use canonical verb as headings. If you find yourself having to group headings together using topics/nouns, consider breaking up the page.

## Temporal Cloud

- **Audience:** Teams operating on Temporal Cloud.
- **Content type:** A mix of how-tos, explanation, and reference.
- **Description:** Covers getting started with Cloud, namespace and user management, certificates, API keys, billing, metrics, Nexus, SAML, and audit logging.

    Some pages are procedural (set up a namespace), others are reference-like (service limits, pricing).

## Deploy to production

- **Audience:** DevOps engineers, platform engineers, and architects responsible for running Temporal in production.
- **Content type:** A mix of how-tos and explanations.
- **Description:** Covers two concerns:
    - Deploying application Workers
    - Running a self-hosted Temporal Service.

    This section is infrastructure-focused. Application-level concerns (how to write a Workflow) belong in Develop. Cloud-specific operations belong in Temporal Cloud.

## CLI (temporal)

- **Audience:** Developers and operators who interact with Temporal through the command line.
- **Content type:** Mostly reference, and a few how-tos
- **Description:** Covers installation, configuration, use with Temporal Cloud and the full command tree. Each command page lists subcommands, flags, and representative examples.

## References

- **Audience:** Developers, operators, and architects looking up specific technical details.
- **Content type:** References
- **Description:** Houses SDK API doc links, metric definitions, event type listings, error and failure catalogs, configuration references for the Temporal Service and Web UI, and command references.

    Prioritize these pages being exhaustive, precise and up-to-date. Automate whenever possible.

## Troubleshooting

- **Audience:** Developers and operators who have hit a specific error or unexpected behavior.
- **Content type:** How-to documents with reference-structure navigation.
- **Description:** Each page targets a specific error or operational problem (missed schedule actions, performance bottlenecks).

    Pages should lead with the symptom the reader is experiencing, explain the root cause, and walk through the resolution. Keep scope tight: one problem per page.

## Best practices

- **Audience:** Platform teams, architects, and developers establishing organizational standards for Temporal.
- **Content type:** Mostly explanation with some how-to content.
- **Description:** Prescriptive guidance and validated patterns. They recommend specific approaches based on real-world deployments.

## Encyclopedia

- **Audience:** Architects, advanced developers, and anyone who needs deep understanding of Temporal's internals and design.
- **Content type:** Explanations.
- **Description:** These pages explain how and why things work the way they do, without being tied to a specific SDK. They support design decisions and mental model building.

    Link here from Develop when a concept needs more explanation than a how-to page should carry. These pages should be heavy on text and diagrams, and light on code.

    Nouns as headings are not discouraged in this section.

## Glossary

- **Audience:** Anyone using Temporal documentation who needs a quick definition.
- **Content type:** Reference
- **Description:** Alphabetical listing of Temporal-specific terms. Each entry should be a concise definition with a link to the page that covers the concept in depth.

## Develop with AI

- **Audience:** Developers using AI coding assistants who want Temporal-aware tooling.
- **Content type:** How-to
- **Description:** Covers how to leverage AI to develop Temporal applications and deploy Temporal workloads.

---

# Section details

## Evaluate: internal structure and issues

### Internal structure

- **Why Temporal / Understanding Temporal:** Top-of-funnel pages that introduce the platform's value proposition and
  core concepts (Durable Execution, Workflows, Activities, Workers). These target readers with no prior Temporal
  knowledge.
- **Features:** A catalog of 17+ feature pages (core application, failure detection, Nexus, message passing, schedules,
  serverless, etc.) that each describe what a feature does and why it matters. Each page links out to Develop for
  implementation and Encyclopedia for conceptual depth.
- **Temporal Cloud (evaluation):** Positioning content for the managed offering: pricing, SLA, regions, limits, security
  model, and support tiers. Helps readers decide between Cloud and self-hosted.
- **Use cases and design patterns:** Real-world examples (Stripe, Coinbase, Netflix, etc.) and architectural patterns
  (saga, state machine). This page bridges "why Temporal" and "how do I apply it."

### Issues

- Large swaths of the content in here are links out to other docs, mostly pages in SDK guides.
- The Temporal Cloud evaluation subsection overlaps with the top-level Temporal Cloud section. The evaluation pages
  cover pricing, SLA, regions, limits, and security, while the Cloud section covers the same topics in operational
  detail. The boundary between "evaluating Cloud" and "using Cloud" is unclear to the reader.
- The security page (`security.mdx`) is a top-level doc pulled into the Evaluate sidebar, not nested under `evaluate/`.
  Its scope (platform-wide security) is broader than evaluation.

## Develop: internal structure and issues

### Per-SDK structure

The canonical SDK section follows this template, though coverage varies by language:

- **Setup/Installation** — Getting the SDK installed and connected.
- **Workflows** — Basics, child workflows, continue-as-new, message passing, cancellation, timeouts, schedules, timers,
  versioning, side effects. (11-13 sub-topics per SDK.)
- **Activities** — Basics, execution, standalone activities, timeouts, async completion, heartbeats. (5-7 sub-topics.)
- **Workers** — Running a worker process. Some SDKs add interceptors, serverless workers.
- **Client** — Creating and using the Temporal Client, namespace operations.
- **Nexus** — Quickstart and feature guide. (Present in Go, Java, Python, TypeScript, .NET, Rust. Missing from PHP,
  Ruby.)
- **Platform** — Observability and enriching the UI. (Present in all SDKs except Rust.)
- **Best Practices** — Testing, debugging, error handling, data handling (converters, encryption, external storage).
  Coverage varies significantly.
- **Integrations** — Framework-specific guides. (Java: Spring Boot/AI. Python: LangGraph, LangSmith, Strands, etc.
  TypeScript: AI SDK. Ruby: Rails. Others: none.)

### Non-SDK content at the Develop root

These cross-cutting pages live outside any SDK folder:

- `environment-configuration.mdx` — TOML config and env vars for Temporal Client setup.
- `plugins-guide.mdx` — How to build plugins; architecture guidance.
- `integrations.mdx` — Hub page linking to SDK-specific integration guides.
- `safe-deployments.mdx` — Workflow code deployment strategies, replay testing.
- `worker-performance.mdx` — Performance tuning, slot suppliers, metrics.
- `worker-tuning-reference.mdx` — Reference tables for worker config.
- `task-queue-priority-fairness.mdx` — Task queue priority and fairness features.
- `activity-retry-simulator.mdx` — Interactive tool for visualizing retry behavior.
- `run-a-development-server.mdx` — Installing and running the Temporal CLI dev server.

### Issues

- **"Platform" subfolder is nebulous.** It houses observability and enriching-ui, which are legitimate SDK how-tos, but
  the name "Platform" does not communicate what's inside. These could fold into the main SDK structure or get a clearer
  label.
- **"Best Practices" per SDK is inconsistent.** Some SDKs (Go, Python) have deep data-handling sub-sections (data
  conversion, encryption, external storage). Others (Java, TypeScript, .NET, Ruby) have a flat converters-and-encryption
  page. Rust has no best practices section at all. The scope of what counts as "best practice" vs. "how-to" is unclear.
- **SDK coverage gaps.** Nexus is missing from PHP and Ruby. Interceptors docs exist only for Python and TypeScript.
  Serverless worker guides exist only for Go, Python, and TypeScript. These gaps may reflect SDK support status, but
  that is not documented anywhere in the section.
- **Cross-cutting content placement.** Pages like `safe-deployments.mdx`, `worker-performance.mdx`, and
  `worker-tuning-reference.mdx` straddle Develop and Deploy to production. `safe-deployments` in particular is about
  deployment strategy (versioning vs. patching), which reads more like production deployment guidance.
- **Setup page naming is inconsistent.** Most SDKs use `set-up-your-local-<language>`, TypeScript uses
  `install-typescript-sdk`, Rust uses `quickstart`.
- **Legacy versioning files** (`worker-versioning-legacy.mdx`) live in some SDK roots (Go, Java, TypeScript) for a
  deprecated pattern. These should either be consolidated or moved to a single deprecation notice.
- **Integrations hub page** (`develop/integrations.mdx`) only links to Java, Python, and TypeScript, even though Ruby
  also has integrations.

## Deploy to production: internal structure and issues

### Internal structure

- **Worker deployments:** Worker Versioning (the recommended default), Kubernetes controller, AWS EKS guide,
  unversioned-to-versioned migration, and serverless workers (Lambda). This content applies whether you use Cloud or
  self-host.
- **Self-hosted guide:** The full operational guide for running your own Temporal Service: deployment options (Docker,
  Kubernetes, manual), embedded server, production checklist, namespace management, security (TLS/mTLS), monitoring,
  visibility storage, server upgrades, archival, multi-cluster replication, Nexus setup, and the frontend API reference.
- **Data encryption:** Cross-cutting page on Payload Codecs and Codec Servers, applicable to both Cloud and self-hosted.

### Issues

- **Self-hosted guide scope.** Some pages here (namespaces, security, visibility) parallel Cloud section pages. The
  content is distinct (self-hosted configuration vs. Cloud configuration), but the structural echo can confuse readers
  looking for "how do I set up namespaces."

## Encyclopedia: internal structure and issues

### Internal structure

The Encyclopedia contains roughly 75 pages organized into these concept groups:

- **Temporal / Temporal SDKs** — Top-level overviews of the platform and SDK architecture.
- **Workflows** (8 pages) — Definitions, execution model, WorkflowID/RunID, continue-as-new, limits, timers, dynamic
  handlers, schedules, cron jobs, patching/versioning.
- **Activities** (6 pages) — Definitions, execution, operations, local activities, standalone activities.
- **Detecting failures** (3 pages) — Failure detection for activities and workflows, retry policies.
- **Workers** (9 pages) — Worker concepts, tasks, task queues, naming, sessions/routing, sticky execution, graceful
  shutdown, worker versioning, serverless workers.
- **Event History** (6 pages) — Core concept page plus SDK-specific walkthroughs for Go, Java, .NET, Python, TypeScript.
- **Workflow Message Passing** (3 pages) — Overview, sending messages, handling messages (Signals, Queries, Updates).
- **Child Workflows** (2 pages) — Concepts and Parent Close Policy.
- **Visibility** (4 pages) — Overview, dual visibility, list filters, search attributes.
- **Temporal Service** (7 pages) — Architecture, server components, persistence, visibility storage, archival,
  configuration, multi-cluster replication.
- **Namespaces** (2 pages) — Namespace concepts and global namespaces.
- **Temporal Nexus** (9 pages) — Architecture, services, operations, endpoints, registry, patterns, security, debugging,
  error handling, metrics.
- **Extensibility** (8+ pages) — Data conversion (payload converters, codecs, failure converters, remote encoding, codec
  servers, external storage, key management), context propagation, interceptors, plugins.
- **Web UI** — Web UI documentation.

### Issues

- **Event History has SDK-specific pages.** The Go, Java, .NET, Python, and TypeScript Event History pages are
  walkthroughs tied to specific SDKs. This is the only place in Encyclopedia where content is language-specific. These
  pages could belong in Develop instead, or they could link from Develop into Encyclopedia. Currently they sit alongside
  the language-agnostic concept page.
- **Overlap with Evaluate.** Both sections explain what Workflows, Activities, and Workers are. Evaluate does it at a
  high level for decision-makers. Encyclopedia does it in depth for builders. The separation is reasonable, but some
  Encyclopedia pages (like `temporal.mdx`) cover similar ground to `evaluate/understanding-temporal.mdx`. A reader
  arriving from search could land on either without context about which one they want.
- **"Encyclopedia" as a name** does not follow common documentation conventions. Readers unfamiliar with the site would
  not know to look here for conceptual documentation. "Concepts" or "Architecture" might be more discoverable.
