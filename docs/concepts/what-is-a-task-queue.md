---
id: what-is-a-task-queue
title: What is a Task Queue?
sidebar_label: Task Queue
description: A Task Queue is a first-in, first-out queue that a Worker Process polls for Tasks.
tags:
  - explanation
---

A Task Queue is lightweight, dynamically allocated queue that one or more [Worker Entities](/docs/concepts/what-is-a-worker-entity) poll for [Tasks](/docs/concepts/what-is-a-task).

Task Queues do not have any ordering guarantees.
It is possible to have a Task that stays in a Task Queue for a period of time, if there is a backlog that wasn't drained for that time.

There are two types of Task Queues, Activity Task Queues and Workflow Task Queues.
But one of each can exist with the same Task Queue name.

![Task Queue component](/diagrams/task-queue.svg)

Task Queues are very lightweight components.

- Task Queues do not require explicit registration but instead are created on demand when a Workflow Execution or Activity spawns or when a Worker Process subscribes to it.
- There is no limit to the number of Task Queues a Temporal Application can use or a Temporal Cluster can maintain.

Workers poll for Tasks in Task Queues via synchronous RPC.
This implementation offers several benefits:

- Worker Processes do not need to have any open ports, which is more secure.
- Worker Processes do not need to advertise themselves through DNS or any other network discovery mechanism.
- When all Worker Processes are down, messages simply persist in a Task Queue, waiting for the Worker Processes to recover.
- A Worker Processes polls for a message only when it has spare capacity, avoiding overloading itself.
- In effect, Task Queues enable load balancing across a large number of Worker Processes.
- Task Queues support server-side throttling, which enables you to limit the Task dispatching rate to the pool of Worker Processes while still supporting Task dispatching at higher rates when spikes happen.
- Task Queues enable what we call [Task Routing](/docs/concepts/what-is-task-routing), which is the routing of specific Tasks to specific Worker Processes or even a specific process.

All Workers listening to a given Task Queue must have identical registrations of Activities and/or Workflows.
The one exception is during a Server upgrade, where it is okay to have registration temporarily misaligned while the binary rolls out.
