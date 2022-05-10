---
id: what-is-a-worker-process
title: What is a Worker Process?
sidebar_label: Worker Process
description: A Worker Process is responsible for polling a Task Queue, dequeueing a Task, executing your code in response to a Task, and responding to the Temporal Server with the results.
tags:
  - explanation
---

![Component diagram of a Worker Process and the Temporal Server](/diagrams/worker-and-server-component.svg)

A Worker Process is responsible for polling a [Task Queue](/concepts/what-is-a-task-queue), dequeueing a [Task](/concepts/what-is-a-task), executing your code in response to a Task, and responding to the [Temporal Cluster](/concepts/what-is-a-temporal-cluster) with the results.

More formally, a Worker Process is any process that implements the Task Queue Protocol and the Task Execution Protocol.

- A Worker Process is a Workflow Worker Process if the process implements the Workflow Task Queue Protocol and executes the Workflow Task Execution Protocol to make progress on a Workflow Execution.
  A Workflow Worker Process can listen on an arbitrary number of Workflow Task Queues and can execute an arbitrary number of Workflow Tasks.
- A Worker Process is an Activity Worker Process if the process implements the Activity Task Queue Protocol and executes the Activity Task Processing Protocol to make progress on an Activity Execution.
  An Activity Worker Process can listen on an arbitrary number of Activity Task Queues and can execute an arbitrary number of Activity Tasks.

**Worker Processes are external to a Temporal Cluster.**
Temporal Application developers are responsible for developing [Worker Programs](/concepts/what-is-a-worker-program) and operating Worker Processes.
Said another way, the [Temporal Cluster](/concepts/what-is-a-temporal-cluster) (including the Temporal Cloud) doesn't execute any of your code (Workflow & Activity Definitions) on Temporal Cluster machines. The Cluster is solely responsible for orchestrating state transitions and providing Tasks to the next available Worker Entity.

While data transferred in Event Histories is [secured by mTLS](https://docs.temporal.io/server/security/#encryption-of-network-traffic), by default, it is still readable at rest in the Temporal Cluster.

To solve this, Temporal SDKs offer a [Data Converter API](/concepts/what-is-a-data-converter) that you can use to customize the serialization of data going out of and coming back in to a Worker Entity, with the net effect of guaranteeing that the Temporal Cluster cannot read sensitive business data.

In many of our tutorials, we show you how to run both a Temporal Cluster and one Worker on the same machine for local development.
However, a production-grade Temporal Application typically has a _fleet_ of Worker Processes, all running on hosts external to the Temporal Cluster.
A Temporal Application can have as many Worker Processes as needed.

A Worker Process can be both a Workflow Worker Process and an Activity Worker Process.
Many SDKs support the ability to have multiple Worker Entities in a single Worker Process.
(Worker entity creation and management differ between SDKs.)
A single Worker Entity can listen to only a single Task Queue.
But if a Worker Process has multiple Worker Entities, the Worker Process could be listening to multiple Task Queues.

![Entity relationship diagram (meta model) of Worker Processes, Task Queues, and Tasks](/diagrams/worker-and-server-entity-relationship.svg)

Worker Processes executing Activity Tasks must have access to any resources needed to execute the actions that are defined in Activity Definitions, such as the following:

- Network access for external API calls.
- Credentials for infrastructure provisioning.
- Specialized GPUs for machine learning utilities.

The Temporal Cluster itself has [internal workers](https://docs.temporal.io/blog/workflow-engine-principles/#system-workflows-1910) for system Workflow Executions.
However, these internal workers are not visible to the developer.
