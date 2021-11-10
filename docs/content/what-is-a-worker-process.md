---
id: what-is-a-worker-process
title: What is a Worker Process
description: A Worker Process is responsible for listening on a Task Queue, dequeueing a Task, executing your code in response to a Task, and responding to the Temporal Server with the results.
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"

<CenteredImage
imagePath="/diagrams/worker-and-server-component.svg"
title="Component diagram of a Worker Process and the Temporal Server"
/>

A Worker Process is responsible for polling a [Task Queue](/docs/content/what-is-a-task-queue), dequeueing a [Task](/docs/content/what-is-a-task), executing your code in response to a Task, and responding to the [Temporal Cluster](#) with the results.

<details>
<summary>
More formally, a Worker Process is any process that implements the Task Queue Protocol and the Task Execution Protocol
</summary>

- A Worker Process is a Workflow Worker Process if that process implements the [Workflow Task Queue Protocol](#) and executes the [Workflow Task Execution Protocol](#) to make progress on a [Workflow Execution](#).
  A Workflow Worker Process can listen on an arbitrary number of Workflow Task Queues and can execute an arbitrary number of Workflow Tasks.
- A Worker Process is an Activity Worker Process if that process implements the [Activity Task Queue Protocol](#) and executes the [Activity Task Processing Protocol](#) to make progress on an [Activity Execution](#).
  An Activity Worker Process can listen on an arbitrary number of Activity Task Queues and can execute an arbitrary number of Activity Tasks.

</details>

Temporal Application developers are responsible for developing Worker Programs and operating Worker Processes.
Worker Processes are external to a Temporal Cluster.
In many of our tutorials we show you how to run both a Temporal Cluster and one Worker on the same machine for local development.
However, a production grade Temporal Application will typically have a **fleet** of Worker Processes all running on hosts external to the Temporal Cluster.
A Temporal Application can have as many Worker Processes as needed.

A Worker Process can be both a Workflow Worker Process and an Activity Worker Process.
Many SDKs support the ability to have multiple Worker entities in a single Worker Process (Worker entity creation and management differ between SDKs).
A single Worker entity can only listen to a single Task Queue.
But if there are multiple Worker entities in a Worker Process, then a Worker Process could be listening to multiple Task Queues.

<CenteredImage
imagePath="/diagrams/worker-and-server-entity-relationship.svg"
imageSize="100"
title="Entity relationship diagram (meta model) of Worker Processes, Task Queues, and Tasks"
/>

Worker Processes executing Activity Tasks must have access to any resources needed to execute the actions defined in Activity Definitions such as the following:

- Network access for external API calls.
- Credentials for infrastructure provisioning.
- Specialized GPUs for machine learning utilities.
