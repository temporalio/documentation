---
id: what-is-an-activity
title: What is an Activity?
sidebar_label: Activity
description: In day-to-day conversations, the term "Activity" frequently denotes either an Activity Type, an Activity Definition, or an Activity Execution.
tags:
  - explanation
---

In day-to-day conversations, the term _Activity_ frequently denotes either an [Activity Definition](/concepts/what-is-an-activity-definition), an [Activity Type](/concepts/what-is-an-activity-type), or an [Activity Execution](/concepts/what-is-an-activity-execution).
Temporal documentation aims to be explicit and differentiate between them.

An Activity is a normal function or object method that executes a single, well-defined action (either short or long running), such as calling another service, transcoding a media file, or sending an email.

Workflow code orchestrates the execution of Activities, persisting the results.
If an Activity Function Execution fails, any future execution starts from initial state (with the exception of Heartbeats).
Therefore an Activity function is allowed to contain any code without restrictions.

Activity Functions are executed by Worker Processes.
When the Activity Function returns, the Worker sends the results back to the Temporal Cluster as part of the ActivityTaskCompleted Event.
The Event is added to the Workflow Execution's Event History.

It is possible to implement an Activity fully asynchronously by completing it from a different process.

- An Activity can be implemented as a synchronous method or fully asynchronously involving multiple processes.
- An Activity can be retried indefinitely according to the provided exponential retry policy.
- If for any reason an Activity is not completed within the specified timeout, an error is reported to the [Workflow](#workflow), which decides how to handle it. The duration of an Activity has no limit.
- Activities support an [Activity Heartbeat](#activity-heartbeat) that helps to identify timeouts faster in case the Activity execution fails.

Temporal does not impose any system limit on Activity duration. It is up to the application to choose the timeouts for its execution.

Activities are dispatched to workers through task queues.
Task queues are queues that workers listen on.
Task queues are highly dynamic and lightweight.
They don't need to be explicitly registered. And it is okay to have one task queue per worker process. It is normal to have more than one Activity type to be invoked through a single task queue. And it is normal in some cases (like host routing) to invoke the same Activity type on multiple task queues.

Here are some use cases for employing multiple Activity task queues in a single Workflow:

- _Flow control_. A worker that consumes from a task queue asks for an Activity task only when it has available capacity. So workers are never overloaded by request spikes. If Activity executions are requested faster than workers can process them, they are backlogged in the task queue.
- _Throttling_. Each Activity worker can specify the maximum rate it is allowed to process Activities on a task queue. It does not exceed this limit even if it has spare capacity. There is also support for global task queue rate limiting. This limit works across all workers for the given task queue. It is frequently used to limit load on a downstream service that an Activity calls into.
- _Deploying a set of Activities independently_. Think about a service that hosts Activities and can be deployed independently from other Activities and Workflows. To send Activity tasks to this service, a separate task queue is needed.
- _Workers with different capabilities_. For example, workers on GPU boxes vs non GPU boxes. Having two separate task queues in this case allows Workflows to pick which one to send Activity an execution request to.
- _Routing Activity to a specific host_. For example, in the media encoding case the transform and upload Activity have to run on the same host as the download one.
- _Routing Activity to a specific process_. For example, some Activities load large data sets and cache them in the process. The Activities that rely on this data set should be routed to the same process.
- _Multiple priorities_. One task queue per priority and having a worker pool per priority.
- _Versioning_. A new backwards incompatible implementation of an Activity might use a different task queue.
