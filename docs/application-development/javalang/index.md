---
id: index
slug: /application-development/java
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

1. [**Foundations**](/application-development/java/foundations): The minimum things required to build and run a simple Workflow with a single Activity.

   - [Run a development Cluster](/application-development/java/foundations#run-a-dev-cluster)
   - [Add an SDK to your project](/application-development/java/foundations#add-your-sdk)
   - [Create a Temporal Client](/application-development/java/foundations#connect-to-a-cluster)
   - [Develop a basic Workflow Definition](/application-development/java/foundations#develop-workflows)
   - [Develop a basic Activity Definition](/application-development/java/foundations#develop-activities)
   - [Call to execute an Activity](/application-development/java/foundations#activity-execution)
   - [Run a Worker Process](/application-development/java/foundations#run-worker-processes)
   - [Start a Workflow Execution](/application-development/java/foundations#start-workflow-execution)

2. [**Features**](/application-development/java/features): All the general features available to a Temporal Application.

   - [Signals](/application-development/java/features#signals)
   - [Queries](/application-development/java/features#queries)
   - [Workflow timeouts and retries](/application-development/java/features#workflow-timeouts)
   - [Activity timeouts and retries](/application-development/java/features#activity-timeouts)
   - [Activity Heartbeats](/application-development/java/features#activity-heartbeats)
   - [Async Activity Completion](/application-development/java/features#asynchronous-activity-completion)
   - [Child Workflows](/application-development/java/features#child-workflows)
   - [Continue-As-New](/application-development/java/features#continue-as-new)
   - [Cron Jobs](/application-development/java/features#temporal-cron-jobs)

3. [**Observability**](/application-development/java/observability): Methods for observing a Temporal Application.

   - [Metrics](/application-development/java/observability#metrics)
   - [Tracing](/application-development/java/observability#tracing)
   - [Logging](/application-development/java/observability#logging)
   - [Visibility](/application-development/java/observability#visibility)

4. [**Worker performance**](/application-development/worker-performance)

   - [Metrics](/application-development/worker-performance#metrics)
   - [Configuration](/application-development/worker-performance#configuration)
   - [Task Queue processing tuning](/application-development/worker-performance#task-queues-processing-tuning)
   - [Workflow cache tuning](/application-development/worker-performance#workflow-cache-tuning)
   - [Invariants](/application-development/worker-performance#invariants)
   - [Large value drawbacks](/application-development/worker-performance#drawbacks-of-putting-just-large-values-everywhere)
