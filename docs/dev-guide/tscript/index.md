---
id: index
slug: /dev-guide/typescript
title: Temporal TypeScript SDK developer's guide
description: The Temporal Developer's guide provides a comprehensive overview of the structures, primitives, and features used in Temporal Application development.
sidebar_label: TypeScript
sidebar_position: 4
---

This guide is meant to provide a comprehensive overview of the structures, primitives, and features used in [Temporal Application](/temporal#temporal-application) development.

## Guide structure

The Developer's guide is divided into the following sections:

1. [**Foundations**](/dev-guide/typescript/foundations): The minimum things required to build and run a simple Workflow with a single Activity.

   - [Run a development Cluster](/dev-guide/typescript/foundations#run-a-dev-cluster)
   - [Add an SDK to your project](/dev-guide/typescript/foundations#add-your-sdk)
   - [Create a Temporal Client](/dev-guide/typescript/foundations#connect-to-a-cluster)
   - [Develop a basic Workflow Definition](/dev-guide/typescript/foundations#develop-workflows)
   - [Develop a basic Activity Definition](/dev-guide/typescript/foundations#develop-activities)
   - [Call to execute an Activity](/dev-guide/typescript/foundations#activity-execution)
   - [Run a Worker Process](/dev-guide/typescript/foundations#run-worker-processes)
   - [Start a Workflow Execution](/dev-guide/typescript/foundations#start-workflow-execution)

2. [**Features**](/dev-guide/typescript/features): All the general features available to a Temporal Application.

   - [Signals](/dev-guide/typescript/features#signals)
   - [Queries](/dev-guide/typescript/features#queries)
   - [Workflow timeouts and retries](/dev-guide/typescript/features#workflow-timeouts)
   - [Activity timeouts and retries](/dev-guide/typescript/features#activity-timeouts)
   - [Activity Heartbeats](/dev-guide/typescript/features#activity-heartbeats)
   - [Async Activity Completion](/dev-guide/typescript/features#asynchronous-activity-completion)
   - [Child Workflows](/dev-guide/typescript/features#child-workflows)
   - [Continue-As-New](/dev-guide/typescript/features#continue-as-new)
   - [Schedules](/dev-guide/typescript/features#schedule-a-workflow)
   - [Cron Jobs](/dev-guide/typescript/features#temporal-cron-jobs)

3. [**Observability**](/dev-guide/typescript/observability): Methods for observing a Temporal Application.

   - [Metrics](/dev-guide/typescript/observability#metrics)
   - [Tracing](/dev-guide/typescript/observability#tracing)
   - [Logging](/dev-guide/typescript/observability#logging)
   - [Visibility](/dev-guide/typescript/observability#visibility)

4. [**Worker performance**](/dev-guide/worker-performance)

   - [Metrics](/dev-guide/worker-performance#metrics)
   - [Configuration](/dev-guide/worker-performance#configuration)
   - [Task Queue processing tuning](/dev-guide/worker-performance#task-queues-processing-tuning)
   - [Workflow cache tuning](/dev-guide/worker-performance#workflow-cache-tuning)
   - [Invariants](/dev-guide/worker-performance#invariants)
   - [Large value drawbacks](/dev-guide/worker-performance#drawbacks-of-putting-just-large-values-everywhere)
