---
id: go-dev-guide-structure
title: Go SDK developer's guide structure
description: Explore the Temporal Go SDK's developer's guide structure.
sidebar_label: Go SDK guide
tags:
  - dev guide
  - go
---

:::info Temporal Go SDK API reference

https://pkg.go.dev/go.temporal.io/sdk

:::

The follow structure applies to the Temporal Go SDK developer's guide:

- [**Introduction to the Temporal Go SDK**](/go/chapter-introduction/introduction-to-go-sdk)

  - [Supported runtimes](/go/chapter-introduction/introduction-to-go-sdk#supported-runtimes)
  - [Add to project](/go/chapter-introduction/introduction-to-go-sdk#add-to-project)
  - [Expected skills and experiences](/go/chapter-introduction/introduction-to-go-sdk#expected-skills-and-experiences)
  - [Additional resources for learning the Go SDK](/go/chapter-introduction/introduction-to-go-sdk#additional-resources)
  - [Contribution](/go/chapter-introduction/introduction-to-go-sdk#contribution)

- [**Chapter - Project setup**](/go/landing-page/go-dev-guide-structure)

  - [Download and install the Temporal CLI](/go/landing-page/go-dev-guide-structure)
  - [Choose a development Cluster and create a Namespace](/go/chapter-project-setup/choose-dev-cluster)
  - [Add boilerplate application code](/go/chapter-project-setup/project-structure)
  - [Run a Worker](/go/generated/backgroundcheck-boilerplate-run-a-dev-server-worker)
  - [Start your Workflow using the CLI](/go/chapter-project-setup/backgroundcheck-boilerplate-start-workflow)
  - [Add a testing framework and tests to your application](/go/generated/backgroundcheck-boilerplate-add-test-framework)

- [**Chapter - Develop for durability**](/go/chapter-durable-execution/durable-execution-intro)

3. [**Feature guides**](/dev-guide/go/features): All the general features available to a Temporal Application.

   - [Core application](/go/features/core-app/core-app-intro)
   - [Signals](/dev-guide/go/features#signals)
   - [Queries](/dev-guide/go/features#queries)
   - [Updates](/dev-guide/go/features#updates)
   - [Workflow timeouts and retries](/dev-guide/go/features#workflow-timeouts)
   - [Activity timeouts and retries](/dev-guide/go/features#activity-timeouts)
   - [Activity Heartbeats](/dev-guide/go/features#activity-heartbeats)
   - [Async Activity Completion](/dev-guide/go/features#asynchronous-activity-completion)
   - [Child Workflows](/dev-guide/go/features#child-workflows)
   - [Continue-As-New](/dev-guide/go/features#continue-as-new)
   - [Schedules](/dev-guide/go/features#schedule-a-workflow)
   - [Cron Jobs](/dev-guide/go/features#temporal-cron-jobs)
   - [Metrics](/dev-guide/go/observability#metrics)
   - [Tracing](/dev-guide/go/observability#tracing)
   - [Logging](/dev-guide/go/observability#logging)
   - [Visibility](/dev-guide/go/observability#visibility)

4. [**Worker performance**](/dev-guide/worker-performance)

   - [Metrics](/dev-guide/worker-performance#metrics)
   - [Configuration](/dev-guide/worker-performance#configuration)
   - [Task Queue processing tuning](/dev-guide/worker-performance#task-queues-processing-tuning)
   - [Workflow cache tuning](/dev-guide/worker-performance#workflow-cache-tuning)
   - [Invariants](/dev-guide/worker-performance#invariants)
   - [Large value drawbacks](/dev-guide/worker-performance#drawbacks-of-putting-just-large-values-everywhere)
