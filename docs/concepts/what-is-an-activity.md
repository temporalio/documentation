---
id: what-is-an-activity
title: What is an Activity?
sidebar_label: Activity
description: In day-to-day conversations, the term "Activity" frequently denotes either an Activity Type, an Activity Definition, or an Activity Execution.
tags:
  - explanation
---

In day-to-day conversations, the term _Activity_ frequently denotes either an [Activity Type](/concepts/what-is-an-activity-type), an [Activity Definition](/concepts/what-is-an-activity-definition), or an [Activity Execution](/concepts/what-is-an-activity-execution).
Temporal documentation aims to be explicit and differentiate between them.

The purpose of an Activity is to execute a single, well-defined action (either short or long running), such as calling another service, transcoding a media file, or sending an email.

#### Activities calling Activities

For some use cases, having an Activity call another Activity might seem convenient.
We generally recommend not doing so. Activities are regular functions, so calling one directly is not seen—and therefore not logged—by the Temporal Server.

Instead, move logic out of the Activities and have the parent Workflow use the result of one Activity to call the other Activity.

Fault-oblivious stateful Workflow code is the core abstraction of Temporal.
But, due to deterministic execution requirements, they are not allowed to call any external API directly.
Instead they orchestrate execution of Activities.
In its simplest form, a Temporal Activity is a function or an object method in one of the supported languages.
Temporal does not recover Activity state in case of failures.
Therefore an Activity function is allowed to contain any code without restrictions.

Activities are invoked asynchronously through task queues.
A task queue is essentially a queue used to store an Activity task until it is picked up by an available worker.
The worker processes an Activity by invoking its implementation function.
When the function returns, the worker reports the result back to the Temporal service which in turn notifies the Workflow about completion.
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

For long running Activities, we recommend that you specify a relatively short heartbeat timeout and constantly heartbeat. This way worker failures for even very long running Activities can be handled in a timely manner. An Activity that specifies the heartbeat timeout is expected to call the heartbeat method _periodically_ from its implementation.

A heartbeat request can include application specific payload. This is useful to save Activity execution progress. If an Activity times out due to a missed heartbeat, the next attempt to execute it can access that progress and continue its execution from that point.

Long running Activities can be used as a special case of leader election. Temporal timeouts use second resolution. So it is not a solution for realtime applications. But if it is okay to react to the process failure within a few seconds, then a Temporal heartbeat Activity is a good fit.

One common use case for such leader election is monitoring. An Activity executes an internal loop that periodically polls some API and checks for some condition. It also heartbeats on every iteration. If the condition is satisfied, the Activity completes which lets its Workflow to handle it. If the Activity worker dies, the Activity times out after the heartbeat interval is exceeded and is retried on a different worker. The same pattern works for polling for new files in Amazon S3 buckets or responses in REST or other synchronous APIs.

note Cancellations are not immediate

`ctx.Done()` is only signaled when a heartbeat is sent to the service.
Temporal's SDK throttles this so a heartbeat may not be sent to the service until 80% of the heartbeat timeout has elapsed.

For example, if your heartbeat timeout is 20 seconds, `ctx.Done()` will not be signaled until 80% of 20 seconds (~16 seconds) has elapsed.
To increase or decrease the delay of cancelation, modify the heartbeat timeout defined for the activity context.

#### Asynchronous Activity Completion

Asynchronous Activity Completion occurs when the final result of a computation, started by an Activity, is provided to the Temporal System from an external system.

By default, an Activity is a function or method (depending on the language) that completes as soon as the function or method returns. But in some cases an Activity implementation is asynchronous. For example, the action could be forwarded to an external system through a message queue, and the result could come through a different queue.

To support such use cases, Temporal allows Activity implementations that do not complete upon Activity function completions. A separate API should be used in this case to complete the Activity. This API can be called from any process, even in a different programming language, that the original Activity worker used.
