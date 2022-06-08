---
id: what-is-a-task-queue
title: What is a Task Queue?
sidebar_label: Task Queue
description: A Task Queue is a first-in, first-out queue that a Worker Process polls for Tasks.
tags:
  - explanation
---

A Task Queue is a lightweight, dynamically allocated queue that one or more [Worker Entities](/concepts/what-is-a-worker-entity) poll for [Tasks](/concepts/what-is-a-task).

Task Queues do not have any ordering guarantees.
It is possible to have a Task that stays in a Task Queue for a period of time, if there is a backlog that wasn't drained for that time.

There are two types of Task Queues, Activity Task Queues and Workflow Task Queues.

![Task Queue component](/diagrams/task-queue.svg)

Task Queues are very lightweight components.

Task Queues do not require explicit registration but instead are created on demand when a Workflow Execution or Activity spawns or when a Worker Process subscribes to it.
When a Task Queue is created, both a Workflow Task Queue and an Activity Task Queue are created under the same name.
There is no limit to the number of Task Queues a Temporal Application can use or a Temporal Cluster can maintain.

Workers poll for Tasks in Task Queues via synchronous RPC.
This implementation offers several benefits:

- Worker Processes do not need to have any open ports, which is more secure.
- Worker Processes do not need to advertise themselves through DNS or any other network discovery mechanism.
- When all Worker Processes are down, messages simply persist in a Task Queue, waiting for the Worker Processes to recover.
- A Worker Process polls for a message only when it has spare capacity, avoiding overloading itself.
- In effect, Task Queues enable load balancing across a large number of Worker Processes.
- Task Queues support server-side throttling, which enables you to limit the Task dispatching rate to the pool of Worker Processes while still supporting Task dispatching at higher rates when spikes happen.
- Task Queues enable what we call [Task Routing](/concepts/what-is-task-routing), which is the routing of specific Tasks to specific Worker Processes or even a specific process.

All Workers listening to a given Task Queue must have identical registrations of Activities and/or Workflows.
The one exception is during a Server upgrade, where it is okay to have registration temporarily misaligned while the binary rolls out.

#### Where to set Task Queues

There are four places where the name of the Task Queue can be set by the developer.

1. A Task Queue must be set when spawning a Workflow Execution:

- [How to start a Workflow Execution using an SDK](/application-development-guide#set-task-queue)
- [How to start a Workflow Execution using tctl](/tctl/workflow/start#--taskqueue)

2. A Task Queue name must be set when creating a Worker Entity and when running a Worker Process:

- [How to develop a Worker Program](/application-development-guide#run-worker-processes)

Note that all Worker Entities listening to the same Task Queue name must be registered to handle the exact same Workflows Types and Activity Types.

If a Worker Entity polls a Task for a Workflow Type or Activity Type it does not know about, it will fail that Task.
However, the failure of the Task will not cause the associated Workflow Execution to fail.

3. A Task Queue name can be provided when spawning an Activity Execution:

This is optional.
An Activity Execution inherits the Task Queue name from its Workflow Execution if one is not provided.

- [How to start an Activity Execution](/application-development-guide#start-activity-execution)

4. A Task Queue name can be provided when spawning a Child Workflow Execution:

This is optional.
A Child Workflow Execution inherits the Task Queue name from its Parent Workflow Execution if one is not provided.

- [How to start a Child Workflow Execution](/application-development-guide#child-workflows)
