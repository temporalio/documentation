---
id: index
slug: /dev-guide/php
title: Temporal Go SDK developer's guide
description: The Temporal Developer's guide provides a comprehensive overview of the structures, primitives, and features used in Temporal Application development.
sidebar_label: PHP
sidebar_position: 3
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

1. [**Foundations**](/dev-guide/php/foundations): The minimum things required to build and run a simple Workflow with a single Activity.

   - [Run a development Cluster](/dev-guide/php/foundations#run-a-dev-cluster)
   - [Add an SDK to your project](/dev-guide/php/foundations#add-your-sdk)
   - [Create a Temporal Client](/dev-guide/php/foundations#connect-to-a-cluster)
   - [Develop a basic Workflow Definition](/dev-guide/php/foundations#develop-workflows)
   - [Develop a basic Activity Definition](/dev-guide/php/foundations#develop-activities)
   - [Call to execute an Activity](/dev-guide/php/foundations#activity-execution)
   - [Run a Worker Process](/dev-guide/php/foundations#run-worker-processes)
   - [Start a Workflow Execution](/dev-guide/php/foundations#start-workflow-execution)

2. [**Features**](/dev-guide/php/features): All the general features available to a Temporal Application.

   - [Signals](/dev-guide/php/features#signals)
   - [Queries](/dev-guide/php/features#queries)
   - [Workflow timeouts and retries](/dev-guide/php/features#workflow-timeouts)
   - [Activity timeouts and retries](/dev-guide/php/features#activity-timeouts)
   - [Activity Heartbeats](/dev-guide/php/features#activity-heartbeats)
   - [Async Activity Completion](/dev-guide/php/features#asynchronous-activity-completion)
   - [Child Workflows](/dev-guide/php/features#child-workflows)
   - [Continue-As-New](/dev-guide/php/features#continue-as-new)
   - [Cron Jobs](/dev-guide/php/features#temporal-cron-jobs)

3. [**Observability**](/dev-guide/php/observability): Methods for observing a Temporal Application.

   - [Metrics](/dev-guide/php/observability#metrics)
   - [Tracing](/dev-guide/php/observability#tracing)
   - [Logging](/dev-guide/php/observability#logging)
   - [Visibility](/dev-guide/php/observability#visibility)

4. [**Worker performance**](/dev-guide/worker-performance)

   - [Metrics](/dev-guide/worker-performance#metrics)
   - [Configuration](/dev-guide/worker-performance#configuration)
   - [Task Queue processing tuning](/dev-guide/worker-performance#task-queues-processing-tuning)
   - [Workflow cache tuning](/dev-guide/worker-performance#workflow-cache-tuning)
   - [Invariants](/dev-guide/worker-performance#invariants)
   - [Large value drawbacks](/dev-guide/worker-performance#drawbacks-of-putting-just-large-values-everywhere)
