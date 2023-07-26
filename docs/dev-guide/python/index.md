---
id: index
title: Temporal Python SDK developer's guide
description: The Temporal Developer's guide provides a comprehensive overview of the structures, primitives, and features used in Temporal Application development.
sidebar_label: Python
sidebar_position: 3
---

This guide is meant to provide a comprehensive overview of the structures, primitives, and features used in [Temporal Application](/temporal#temporal-application) development.

## Guide structure

The Developer's guide is divided into the following sections:

1. [**Foundations**](/dev-guide/python/foundations): The minimum things required to build and run a simple Workflow with a single Activity.

   - [Run a development Cluster](/dev-guide/python/foundations#run-a-dev-cluster)
   - [Add an SDK to your project](/dev-guide/python/foundations#add-your-sdk)
   - [Create a Temporal Client](/dev-guide/python/foundations#connect-to-a-cluster)
   - [Develop a basic Workflow Definition](/dev-guide/python/foundations#develop-workflows)
   - [Develop a basic Activity Definition](/dev-guide/python/foundations#develop-activities)
   - [Call to execute an Activity](/dev-guide/python/foundations#activity-execution)
   - [Run a Worker Process](/dev-guide/python/foundations#run-worker-processes)
   - [Start a Workflow Execution](/dev-guide/python/foundations#start-workflow-execution)

2. [**Features**](/dev-guide/python/features): All the general features available to a Temporal Application.

   - [Signals](/dev-guide/python/features#signals)
   - [Queries](/dev-guide/python/features#queries)
   - [Workflow timeouts and retries](/dev-guide/python/features#workflow-timeouts)
   - [Activity timeouts and retries](/dev-guide/python/features#activity-timeouts)
   - [Activity Heartbeats](/dev-guide/python/features#activity-heartbeats)
   - [Async Activity Completion](/dev-guide/python/features#asynchronous-activity-completion)
   - [Child Workflows](/dev-guide/python/features#child-workflows)
   - [Continue-As-New](/dev-guide/python/features#continue-as-new)
   - [Schedules](/dev-guide/python/features#schedule-a-workflow)
   - [Cron Jobs](/dev-guide/python/features#temporal-cron-jobs)

3. [**Observability**](/dev-guide/python/observability): Methods for observing a Temporal Application.

   - [Metrics](/dev-guide/python/observability#metrics)
   - [Tracing](/dev-guide/python/observability#tracing)
   - [Logging](/dev-guide/python/observability#logging)
   - [Visibility](/dev-guide/python/observability#visibility)

4. [**Worker performance**](/dev-guide/worker-performance)

   - [Metrics](/dev-guide/worker-performance#metrics)
   - [Configuration](/dev-guide/worker-performance#configuration)
   - [Task Queue processing tuning](/dev-guide/worker-performance#task-queues-processing-tuning)
   - [Workflow cache tuning](/dev-guide/worker-performance#workflow-cache-tuning)
   - [Invariants](/dev-guide/worker-performance#invariants)
   - [Large value drawbacks](/dev-guide/worker-performance#drawbacks-of-putting-just-large-values-everywhere)
