---
id: index
slug: /dev-guide/java
title: Temporal Java SDK developer's guide
description: The Temporal Developer's guide provides a comprehensive overview of the structures, primitives, and features used in Temporal Application development.
sidebar_label: Java
sidebar_position: 2
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

1. [**Foundations**](/dev-guide/java/foundations): The minimum things required to build and run a simple Workflow with a single Activity.

   - [Run a development Cluster](/dev-guide/java/foundations#run-a-dev-cluster)
   - [Add an SDK to your project](/dev-guide/java/foundations#add-your-sdk)
   - [Create a Temporal Client](/dev-guide/java/foundations#connect-to-a-cluster)
   - [Develop a basic Workflow Definition](/dev-guide/java/foundations#develop-workflows)
   - [Develop a basic Activity Definition](/dev-guide/java/foundations#develop-activities)
   - [Call to execute an Activity](/dev-guide/java/foundations#activity-execution)
   - [Run a Worker Process](/dev-guide/java/foundations#run-worker-processes)
   - [Start a Workflow Execution](/dev-guide/java/foundations#start-workflow-execution)

2. [**Features**](/dev-guide/java/features): All the general features available to a Temporal Application.

   - [Signals](/dev-guide/java/features#signals)
   - [Queries](/dev-guide/java/features#queries)
   - [Workflow timeouts and retries](/dev-guide/java/features#workflow-timeouts)
   - [Activity timeouts and retries](/dev-guide/java/features#activity-timeouts)
   - [Activity Heartbeats](/dev-guide/java/features#activity-heartbeats)
   - [Async Activity Completion](/dev-guide/java/features#asynchronous-activity-completion)
   - [Child Workflows](/dev-guide/java/features#child-workflows)
   - [Continue-As-New](/dev-guide/java/features#continue-as-new)
   - [Cron Jobs](/dev-guide/java/features#temporal-cron-jobs)

3. [**Observability**](/dev-guide/java/observability): Methods for observing a Temporal Application.

   - [Metrics](/dev-guide/java/observability#metrics)
   - [Tracing](/dev-guide/java/observability#tracing)
   - [Logging](/dev-guide/java/observability#logging)
   - [Visibility](/dev-guide/java/observability#visibility)

4. [**Worker performance**](/dev-guide/worker-performance)

   - [Metrics](/dev-guide/worker-performance#metrics)
   - [Configuration](/dev-guide/worker-performance#configuration)
   - [Task Queue processing tuning](/dev-guide/worker-performance#task-queues-processing-tuning)
   - [Workflow cache tuning](/dev-guide/worker-performance#workflow-cache-tuning)
   - [Invariants](/dev-guide/worker-performance#invariants)
   - [Large value drawbacks](/dev-guide/worker-performance#drawbacks-of-putting-just-large-values-everywhere)
