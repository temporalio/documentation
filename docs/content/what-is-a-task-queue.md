---
id: what-is-a-task-queue
title: What is a Task Queue?
description: todo
tags:
  - explanation
---

<!-- prettier-ignore -->
import * as WhatIsATask from './what-is-a-task.md'
import * as WhatIsAWorker from './what-is-a-worker.md'

A Task Queue is a first-in, first-out queue that a <preview page={WhatIsAWorker}>Worker</preview> polls for <preview page={WhatIsATask}>Tasks</preview>.

Task Queues are very lightweight components.
There is no limit to the number of Task Queues a Temporal Application can use or a Temporal Cluster can maintain.
Task Queues do not require explicit registration but instead are created on demand when an Execution spawns or a Worker Process subscribes to it.

Each Task Queue is capable of queuing both [Activity Tasks](#activity-task) and [Workflow Tasks](#workflow-task).

Task Queues offer many advantages over a synchronous RPC:

- Workers do not need to have any open ports, which is more secure.
- Workers do not need to advertise themselves through DNS or any other network discovery mechanism.
- When all Workers are down, messages simply persist in a Task Queue, waiting for the Workers to recover.
- A Worker polls for a message only when it has spare capacity, avoiding overloading itself.
- Task Queues enable a sort of automatic load balancing across a large number of Workers.
- Task Queues support server side throttling, which enables you to limit the Task dispatching rate to the pool of Workers while still supporting Task dispatching at higher rates when spikes happen.
- Task Queues enable what we call "Task routing", which is the routing of specific Tasks to specific Workers or even a specific process.

All Workers listening to a given Task Queue must have identical registrations of Activities and/or Workflows.
The one exception to this is during a Server upgrade, where it is okay to have registration temporarily misaligned while the binary rolls out.

## Task routing

File processing tends to be one of the best examples of why you might need to route a Task to a specific process.

Let's say you have a Workflow with the following three Activities:

- Activity to download a file.
- Activity to process the file in some way.
- Activity to upload a file to another location.

In a real life scenario, you would want to have many Workers involved in order to scale the processing of many files simultaneously.

The first Activity, to download the file, could occur on any Worker.
However, the second and third Activities must be executed by a Worker on the same host where the first Activity downloaded the file.

You can use Task Queues and dedicated Workers to handle this scenario in an elegant way.

You can find implementation examples that illustrate this technique for the following languages:

- [Java file processing example](https://github.com/temporalio/samples-java/tree/master/src/main/java/io/temporal/samples/fileprocessing)
- [PHP file processing example](https://github.com/temporalio/samples-php/tree/master/app/src/FileProcessing)

The Go SDK comes with a [Session](/docs/go/sessions) feature that abstracts the need to explicitly route tasks for this use case.
The [Go file processing example](https://github.com/temporalio/samples-go/tree/master/fileprocessing) showcases that as well.

:::note

If you need to process work sequentially on the same machine, the Go SDK also offers a [Sessions API](https://docs.temporal.io/docs/go/sessions/).

:::
