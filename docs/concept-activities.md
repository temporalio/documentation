---
id: concept-activities
title: Activities
sidebar_label: Activities
---

Fault-oblivious stateful Workflow code is the core abstraction of Temporal. But, due to deterministic execution requirements, they are not allowed to call any external API directly.
Instead they orchestrate execution of Activities. In its simplest form, a Temporal Activity is a function or an object method in one of the supported languages.
Temporal does not recover Activity state in case of failures. Therefore an Activity function is allowed to contain any code without restrictions.

Activities are invoked asynchronously though task queues. A task queue is essentially a queue used to store an Activity task until it is picked up by an available worker. The worker processes an Activity by invoking its implementation function. When the function returns, the worker reports the result back to the Temporal service which in turn notifies the Workflow about completion. It is possible to implement an Activity fully asynchronously by completing it from a different process.

## Timeouts

Temporal does not impose any system limit on Activity duration. It is up to the application to choose the timeouts for its execution. These are the configurable Activity timeouts:

- `ScheduleToStart` is the maximum time from a Workflow requesting Activity execution to a worker starting its execution. The usual reason for this timeout to fire is all workers being down or not being able to keep up with the request rate. We recommend setting this timeout to the maximum time a Workflow is willing to wait for an Activity execution in the presence of all possible worker outages.
- `StartToClose` is the maximum time an Activity can execute after it was picked by a worker.
- `ScheduleToClose` is the maximum time from the Workflow requesting an Activity execution to its completion.
- `Heartbeat` is the maximum time between heartbeat requests. See [Long Running Activities](#long-running-activities).

Either `ScheduleToClose` or both `ScheduleToStart` and `StartToClose` timeouts are required.

## Retries

As Temporal doesn't recover an Activity's state and they can communicate to any external system, failures are expected. Therefore, Temporal supports automatic Activity retries. Any Activity when invoked can have an associated retry policy. Here are the retry policy parameters:

- `InitialInterval` is a delay before the first retry.
- `BackoffCoefficient`. Retry policies are exponential. The coefficient specifies how fast the retry interval is growing. The coefficient of 1 means that the retry interval is always equal to the `InitialInterval`.
- `MaximumInterval` specifies the maximum interval between retries. Useful for coefficients more than 1.
- `MaximumAttempts` specifies how many times to attempt to execute an Activity in the presence of failures. If this limit is exceeded, the error is returned back to the Workflow that invoked the Activity.
- `NonRetryableErrorReasons` allows you to specify errors that shouldn't be retried. For example retrying invalid arguments error doesn't make sense in some scenarios.

There are scenarios when not a single Activity but rather the whole part of a Workflow should be retried on failure. For example, a media encoding Workflow that downloads a file to a host, processes it, and then uploads the result back to storage. In this Workflow, if the host that hosts the worker dies, all three Activities should be retried on a different host. Such retries should be handled by the Workflow code as they are very use case specific.

## Long Running Activities

For long running Activities, we recommended that you specify a relatively short heartbeat timeout and constantly heartbeat. This way worker failures for even very long running Activities can be handled in a timely manner. An Activity that specifies the heartbeat timeout is expected to call the heartbeat method _periodically_ from its implementation.

A heartbeat request can include application specific payload. This is useful to save Activity execution progress. If an Activity times out due to a missed heartbeat, the next attempt to execute it can access that progress and continue its execution from that point.

Long running Activities can be used as a special case of leader election. Temporal timeouts use second resolution. So it is not a solution for realtime applications. But if it is okay to react to the process failure within a few seconds, then a Temporal heartbeat Activity is a good fit.

One common use case for such leader election is monitoring. An Activity executes an internal loop that periodically polls some API and checks for some condition. It also heartbeats on every iteration. If the condition is satisfied, the Activity completes which lets its Workflow to handle it. If the Activity worker dies, the Activity times out after the heartbeat interval is exceeded and is retried on a different worker. The same pattern works for polling for new files in Amazon S3 buckets or responses in REST or other synchronous APIs.

## Cancellation

A Workflow can request an Activity cancellation. Currently the only way for an Activity to learn that it was cancelled is through heart beating. The heartbeat request fails with a special error indicating that the Activity was cancelled. Then it is up to the Activity implementation to perform all the necessary cleanup and report that it is done with it. It is up to the Workflow implementation to decide if it wants to wait for the Activity cancellation confirmation or just proceed without waiting.

Another common case for Activity heartbeat failure is that the Workflow that invoked it is in a completed state. In this case an Activity is expected to perform cleanup as well.

## Activity Task Routing through Task Queues

Activities are dispatched to workers through task queues. Task queues are queues that workers listen on. Task queues are highly dynamic and lightweight. They don't need to be explicitly registered. And it is okay to have one task queue per worker process. It is normal to have more than one Activity type to be invoked through a single task queue. And it is normal in some cases (like host routing) to invoke the same Activity type on multiple task queues.

Here are some use cases for employing multiple Activity task queues in a single Workflow:

- _Flow control_. A worker that consumes from a task queue asks for an Activity task only when it has available capacity. So workers are never overloaded by request spikes. If Activity executions are requested faster than workers can process them, they are backlogged in the task queue.
- _Throttling_. Each Activity worker can specify the maximum rate it is allowed to process Activities on a task queue. It does not exceed this limit even if it has spare capacity. There is also support for global task queue rate limiting. This limit works across all workers for the given task queue. It is frequently used to limit load on a downstream service that an Activity calls into.
- _Deploying a set of Activities independently_. Think about a service that hosts Activities and can be deployed independently from other Activities and Workflows. To send Activity tasks to this service, a separate task queue is needed.
- _Workers with different capabilities_. For example, workers on GPU boxes vs non GPU boxes. Having two separate task queues in this case allows Workflows to pick which one to send Activity an execution request to.
- _Routing Activity to a specific host_. For example, in the media encoding case the transform and upload Activity have to run on the same host as the download one.
- _Routing Activity to a specific process_. For example, some Activities load large data sets and caches it in the process. The Activities that rely on this data set should be routed to the same process.
- _Multiple priorities_. One task queue per priority and having a worker pool per priority.
- _Versioning_. A new backwards incompatible implementation of an Activity might use a different task queue.

## Asynchronous Activity Completion

By default an Activity is a function or a method depending on a client side library language. As soon as the function returns, an Activity completes. But in some cases an Activity implementation is asynchronous. For example it is forwarded to an external system through a message queue. And the reply comes through a different queue.

To support such use cases, Temporal allows Activity implementations that do not complete upon Activity function completions. A separate API should be used in this case to complete the Activity. This API can be called from any process, even in a different programming language, that the original Activity worker used.

## Local Activities

Some of the Activities are very short lived and do not need the queing semantic, flow control, rate limiting and routing capabilities. For these Temporal supports so called _local Activity_ feature. Local Activities are executed in the same worker process as the Workflow that invoked them. Consider using local Activities for functions that are:

- no longer than a few seconds
- do not require global rate limiting
- do not require routing to specific workers or pools of workers
- can be implemented in the same binary as the Workflow that invokes them

The main benefit of local Activities is that they are much more efficient in utilizing Temporal service resources and have much lower latency overhead comparing to the usual Activity invocation.
