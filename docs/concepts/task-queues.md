---
id: task-queues
title: Task Queues
sidebar_label: Task Queues
---

## What is a Task Queue?

There are a few different perspectives from which we can talk about Task Queues.

import SharedTaskQueuesBasic from '../shared/task-queues-basic.md'

<SharedTaskQueuesBasic
workflowLink="/docs/concepts/workflows"
workerLink="/docs/concepts/workers"
/>

From the perspective of a developer using the SDK, Task Queues are one of the means by which you associate a Worker with a Workflow and/or Activity.
In this case, you can learn about how to implement Task Queues within the context of the language you are writing your application in:

- [Go](/docs/go/task-queues)
- [Java](/docs/java/task-queues)
- [PHP](/docs/php/task-queues)
- [Node.js](/docs/node/task-queues)

From the perspective of the system's design and how everything works under the hood, things get a little bit more complex.

We intend to explain this in more detail in future system design and architecture docs.

## Why Task Queues?

Temporal Task Queues are a little bit different from commonly used queuing technologies, the main difference being that they **do not require explicit registration and are created on demand**.
Task Queues are very lightweight and there is no limit to the total number of Task Queues that the system can handle.

There are multiple advantages of using a Task Queue to deliver Tasks to a Worker, instead of invoking actions via a synchronous RPC.

- Workers do not need to have any open ports, which is more secure.
- Workers do not need to advertise themselves through DNS or any other network discovery mechanism.
- When all Workers are down, messages simply persist in a Task Queue, waiting for the Workers to recover.
- A Worker polls for a message only when it has spare capacity, avoiding overloading itself.
- Task Queues enable a sort of automatic load balancing across a large number of Workers.
- Task Queues support server side throttling, which enables you to limit the Task dispatching rate to the pool of Workers while still supporting Task dispatching at higher rates when spikes happen.
- Task Queues enable what we call "Task routing", which is the routing of specific Tasks to specific Workers or even a specific process.

:::note

All Workers listening to a given Task Queue must have identical registration of Activities/Workflows.
The one exception to this is during a Server upgrade, where it is okay to have registration temporarily misaligned while the binary rolls out.

:::

## Task routing

File processing tends to be one of the best examples of why you might need to route a Task to a specific process.

Let's say you have a Workflow with the following three Activities:

- Activity to download a file.
- Activity to process the file in some way.
- Activity to upload a file to another location.

In a real life scenario, you would want to have many Workers involved in order to scale the processing of many files simultaneously.

The first Activity, to download the file, could occur on any Worker.
However, the second and third Activities **must be executed by a Worker on the same host** where the first Activity downloaded the file.

You can use Task Queues and dedicated Workers to handle this scenario in an elegant way.

You can find implementation examples that illustrate this technique for the following languages:

- [Java file processing example](https://github.com/temporalio/samples-java/tree/master/src/main/java/io/temporal/samples/fileprocessing)
- [PHP file processing example](https://github.com/temporalio/samples-php/tree/master/app/src/FileProcessing)

The Go SDK comes with a [Session](/docs/go/sessions) feature that abstracts the need to explicitly route tasks for this use case.
The [Go file processing example](https://github.com/temporalio/samples-go/tree/master/fileprocessing) showcases that as well.

## Traffic Routing

[Advanced users can route production traffic](https://community.temporal.io/t/using-dynamic-task-queues-for-traffic-routing/3045) for a number of reasons:

- For **development / debugging**, it can be helpful to send a slice of production traffic to your laptop to dig into end-to-end behaviors.
- For **operations**, traffic routing rules can be used to dynamically shard workers by whatever rules you like. Let’s say you are writing a multi-cloud control plane. The task queue may be cloud-operations initially, but eventually you want to run each cloud provider on different worker infrastructure. With traffic routing, you could dynamically shard this traffic without making any code changes.

:::caution

It’s worth noting that having powerful functionality like this is also inherently dangerous: With a bad configuration, you can cause downtime.

:::
