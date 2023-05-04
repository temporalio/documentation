---
id: index
title: Temporal Go SDK developer's guide
description: The Temporal Developer's guide provides a comprehensive overview of the structures, primitives, and features used in Temporal Application development.
sidebar_label: Golang
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

1. [**Foundations**](/dev-guide/golang/foundations): The minimum things required to build and run a simple Workflow with a single Activity.

   - [Run a development Cluster](/dev-guide/golang/foundations#run-a-dev-cluster)
   - [Add an SDK to your project](/dev-guide/golang/foundations#add-your-sdk)
   - [Create a Temporal Client](/dev-guide/golang/foundations#connect-to-a-cluster)
   - [Develop a basic Workflow Definition](/dev-guide/golang/foundations#develop-workflows)
   - [Develop a basic Activity Definition](/dev-guide/golang/foundations#develop-activities)
   - [Call to execute an Activity](/dev-guide/golang/foundations#activity-execution)
   - [Run a Worker Process](/dev-guide/golang/foundations#run-worker-processes)
   - [Start a Workflow Execution](/dev-guide/golang/foundations#start-workflow-execution)

2. [**Features**](/dev-guide/golang/features): All the general features available to a Temporal Application.

   - [Signals](/dev-guide/golang/features#signals)
   - [Queries](/dev-guide/golang/features#queries)
   - [Workflow timeouts and retries](/dev-guide/golang/features#workflow-timeouts)
   - [Activity timeouts and retries](/dev-guide/golang/features#activity-timeouts)
   - [Activity Heartbeats](/dev-guide/golang/features#activity-heartbeats)
   - [Async Activity Completion](/dev-guide/golang/features#asynchronous-activity-completion)
   - [Child Workflows](/dev-guide/golang/features#child-workflows)
   - [Continue-As-New](/dev-guide/golang/features#continue-as-new)
   - [Cron Jobs](/dev-guide/golang/features#temporal-cron-jobs)

3. [**Observability**](/dev-guide/golang/observability): Methods for observing a Temporal Application.

   - [Metrics](/dev-guide/golang/observability#metrics)
   - [Tracing](/dev-guide/golang/observability#tracing)
   - [Logging](/dev-guide/golang/observability#logging)
   - [Visibility](/dev-guide/golang/observability#visibility)

4. [**Worker performance**](/dev-guide/worker-performance)

   - [Metrics](/dev-guide/worker-performance#metrics)
   - [Configuration](/dev-guide/worker-performance#configuration)
   - [Task Queue processing tuning](/dev-guide/worker-performance#task-queues-processing-tuning)
   - [Workflow cache tuning](/dev-guide/worker-performance#workflow-cache-tuning)
   - [Invariants](/dev-guide/worker-performance#invariants)
   - [Large value drawbacks](/dev-guide/worker-performance#drawbacks-of-putting-just-large-values-everywhere)
