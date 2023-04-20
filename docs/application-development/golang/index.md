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

1. [**Foundations**](/application-development/golang/foundations): The minimum things required to build and run a simple Workflow with a single Activity.

   - [Run a development Cluster](/application-development/golang/foundations#run-a-dev-cluster)
   - [Add an SDK to your project](/application-development/golang/foundations#add-your-sdk)
   - [Create a Temporal Client](/application-development/golang/foundations#connect-to-a-cluster)
   - [Develop a basic Workflow Definition](/application-development/golang/foundations#develop-workflows)
   - [Develop a basic Activity Definition](/application-development/golang/foundations#develop-activities)
   - [Call to execute an Activity](/application-development/golang/foundations#activity-execution)
   - [Run a Worker Process](/application-development/golang/foundations#run-worker-processes)
   - [Start a Workflow Execution](/application-development/golang/foundations#start-workflow-execution)

2. [**Features**](/application-development/golang/features): All the general features available to a Temporal Application.

   - [Signals](/application-development/golang/features#signals)
   - [Queries](/application-development/golang/features#queries)
   - [Workflow timeouts and retries](/application-development/golang/features#workflow-timeouts)
   - [Activity timeouts and retries](/application-development/golang/features#activity-timeouts)
   - [Activity Heartbeats](/application-development/golang/features#activity-heartbeats)
   - [Async Activity Completion](/application-development/golang/features#asynchronous-activity-completion)
   - [Child Workflows](/application-development/golang/features#child-workflows)
   - [Continue-As-New](/application-development/golang/features#continue-as-new)
   - [Cron Jobs](/application-development/golang/features#temporal-cron-jobs)

3. [**Observability**](/application-development/golang/observability): Methods for observing a Temporal Application.

   - [Metrics](/application-development/golang/observability#metrics)
   - [Tracing](/application-development/golang/observability#tracing)
   - [Logging](/application-development/golang/observability#logging)
   - [Visibility](/application-development/golang/observability#visibility)

4. [**Worker performance**](/application-development/worker-performance)

   - [Metrics](/application-development/worker-performance#metrics)
   - [Configuration](/application-development/worker-performance#configuration)
   - [Task Queue processing tuning](/application-development/worker-performance#task-queues-processing-tuning)
   - [Workflow cache tuning](/application-development/worker-performance#workflow-cache-tuning)
   - [Invariants](/application-development/worker-performance#invariants)
   - [Large value drawbacks](/application-development/worker-performance#drawbacks-of-putting-just-large-values-everywhere)
