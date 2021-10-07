---
id: activities
title: Activities
sidebar_label: Activities
---

Fault-oblivious stateful Workflow code is the core abstraction of Temporal. But, due to deterministic execution requirements, they are not allowed to call any external API directly.
Instead they orchestrate execution of Activities. In its simplest form, a Temporal Activity is a function or an object method in one of the supported languages.
Temporal does not recover Activity state in case of failures. Therefore an Activity function is allowed to contain any code without restrictions.

Activities are invoked asynchronously through task queues. A task queue is essentially a queue used to store an Activity task until it is picked up by an available worker. The worker processes an Activity by invoking its implementation function. When the function returns, the worker reports the result back to the Temporal service which in turn notifies the Workflow about completion. It is possible to implement an Activity fully asynchronously by completing it from a different process.

## Timeouts

### Schedule To Start

import WhatIsAScheduleToStartTimeout from "../content/what-is-a-schedule-to-start-timeout.md"

<WhatIsAScheduleToStartTimeout/>

### Start To Close

import WhatIsAStartToCloseTimeout from "../content/what-is-a-start-to-close-timeout.md"

<WhatIsAStartToCloseTimeout/>

### Schedule To Close

import WhatIsAScheduleToCloseTimeout from "../content/what-is-a-schedule-to-close-timeout.md"

<WhatIsAScheduleToCloseTimeout/>

### Heartbeat

import WhatIsAHeartbeatTimeout from "../content/what-is-a-heartbeat-timeout.md"

<WhatIsAHeartbeatTimeout/>

## Retries

import WhatIsARetryPolicy from "../content/what-is-a-retry-policy.md"

<WhatIsARetryPolicy/>

## Long Running Activities

For long running Activities, we recommended that you specify a relatively short heartbeat timeout and constantly heartbeat. This way worker failures for even very long running Activities can be handled in a timely manner. An Activity that specifies the heartbeat timeout is expected to call the heartbeat method _periodically_ from its implementation.

A heartbeat request can include application specific payload. This is useful to save Activity execution progress. If an Activity times out due to a missed heartbeat, the next attempt to execute it can access that progress and continue its execution from that point.

Long running Activities can be used as a special case of leader election. Temporal timeouts use second resolution. So it is not a solution for realtime applications. But if it is okay to react to the process failure within a few seconds, then a Temporal heartbeat Activity is a good fit.

One common use case for such leader election is monitoring. An Activity executes an internal loop that periodically polls some API and checks for some condition. It also heartbeats on every iteration. If the condition is satisfied, the Activity completes which lets its Workflow to handle it. If the Activity worker dies, the Activity times out after the heartbeat interval is exceeded and is retried on a different worker. The same pattern works for polling for new files in Amazon S3 buckets or responses in REST or other synchronous APIs.

## Activity Cancellation

import WhatIsActivityCancellation from '../content/what-is-activity-cancellation.md'

<WhatIsActivityCancellation />

:::note Cancellations are not immediate

`ctx.Done()` is only signaled when a heartbeat is sent to the service.
Temporal's SDK throttles this so a heartbeat may not be sent to the service until 80% of the heartbeat timeout has elapsed.

For example, if your heartbeat timeout is 20 seconds, `ctx.Done()` will not be signaled until 80% of 20 seconds (~16 seconds) has elapsed.
To increase or decrease the delay of cancelation, modify the heartbeat timeout defined for the activity context.

:::

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

import WhatIsAsynchronousActivityCompletion from "../content/what-is-asynchronous-activity-completion.md"

<WhatIsAsynchronousActivityCompletion/>

## Local Activities

import WhatIsALocalActivity from "../content/what-is-a-local-activity.md"

<WhatIsALocalActivity/>
