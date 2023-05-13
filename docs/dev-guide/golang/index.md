---
id: index
slug: /dev-guide/go
title: Temporal Go SDK developer's guide
description: The Temporal Developer's guide provides a comprehensive overview of the structures, primitives, and features used in Temporal Application development.
sidebar_label: Go
sidebar_position: 1
---

:::info WORK IN PROGRESS

This guide is a work in progress.
Some sections may be incomplete or missing for some languages.
Information may change at any time.

If you can't find what you are looking for in the Developer's guide, it could be in [older docs for SDKs](https://legacy-documentation-sdks.temporal.io/).

:::

This guide is meant to provide a comprehensive overview of the structures, primitives, and features used in [Temporal Application](/temporal#temporal-application) development.

## Guide structure

The Developer's guide is divided into the following sections:

1. [**Foundations**](/dev-guide/go/foundations): The minimum things required to build and run a simple Workflow with a single Activity.

   - [Run a development Cluster](/dev-guide/go/foundations#run-a-dev-cluster)
   - [Add an SDK to your project](/dev-guide/go/foundations#add-your-sdk)
   - [Create a Temporal Client](/dev-guide/go/foundations#connect-to-a-cluster)
   - [Develop a basic Workflow Definition](/dev-guide/go/foundations#develop-workflows)
   - [Develop a basic Activity Definition](/dev-guide/go/foundations#develop-activities)
   - [Call to execute an Activity](/dev-guide/go/foundations#activity-execution)
   - [Run a Worker Process](/dev-guide/go/foundations#run-worker-processes)
   - [Start a Workflow Execution](/dev-guide/go/foundations#start-workflow-execution)

2. [**Features**](/dev-guide/go/features): All the general features available to a Temporal Application.

   - [Signals](/dev-guide/go/features#signals)
   - [Queries](/dev-guide/go/features#queries)
   - [Workflow timeouts and retries](/dev-guide/go/features#workflow-timeouts)
   - [Activity timeouts and retries](/dev-guide/go/features#activity-timeouts)
   - [Activity Heartbeats](/dev-guide/go/features#activity-heartbeats)
   - [Async Activity Completion](/dev-guide/go/features#asynchronous-activity-completion)
   - [Child Workflows](/dev-guide/go/features#child-workflows)
   - [Continue-As-New](/dev-guide/go/features#continue-as-new)
   - [Cron Jobs](/dev-guide/go/features#temporal-cron-jobs)

3. [**Observability**](/dev-guide/go/observability): Methods for observing a Temporal Application.

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
