---
id: go-activities
title: Activities in Go
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


An Activity is the implementation of a particular task in the business logic.
You should have a conceptual understanding of Temporal Activities before proceeding.

## Overview

The following example demonstrates a simple Activity that accepts a string parameter, appends a word
to it, and then returns a result.

```go
package sample

import (
	"context"

	"go.uber.org/zap"

	"go.temporal.io/sdk/activity"
)

// SimpleActivity is a sample Temporal Activity function that takes one parameter and
// returns a string containing the parameter value.
func SimpleActivity(ctx context.Context, value string) (string, error) {
	activity.GetLogger(ctx).Info("SimpleActivity called.", zap.String("Value", value))
	return "Processed: " + value, nil
}
```
Let's take a look at each component of this Activity.

### Declaration

In the Temporal programing model, an Activity is implemented with a function. The function declaration specifies the parameters the Activity accepts as well as any values it might return. An Activity function can take zero or many Activity specific parameters and can return one or two values. It must always at least return an error value. The Activity function can accept as parameters and return as results any serializable type.

`func SimpleActivity(ctx context.Context, value string) (string, error)`

The first parameter to the function is context.Context. This is an optional parameter and can be omitted. This parameter is the standard Go context.
The second string parameter is a custom Activity specific parameter that can be used to pass data into the Activity on start. An Activity can have one or more such parameters. All parameters to an Activity function must be serializable, which essentially means that params can’t be channels, functions, variadic, or unsafe pointers.
The Activity declares two return values: string and error. The string return value is used to return the result of the Activity. The error return value is used to indicate that an error was encountered during execution.

### Implementation

Activities are implemented as regular Go functions:

- Parameters:
    - Data can be passed directly to an Activity via function
parameters. The parameters can be either basic types or structs (must be serializable).
    - Though it is not required, we recommend that the first parameter of an Activity function is of type `context.Context`, in order to allow the Activity to interact with other framework methods.
- Return values:
    - The function must return an `error` value. To mark an Activity as failed, return an error here, instead of `nil`.
    - The result value is optional, and can be either a basic type or a struct (must be serializable).

There's no hard limit on what you can pass into or return from an Activity function, but keep in mind that all parameters and return values are recorded in the execution history.
A large execution history can adversely impact the performance of your Workflows as the entire history is transferred to your workers with every event processed.
No other limitations on Activity functions exist; you are free to use idiomatic loggers and metrics controllers, and the standard Go concurrency constructs.

#### Heart Beating

For long-running Activities, Temporal provides an API for the Activity code to report both liveness and
progress back to the Temporal managed service.

```go
progress := 0
for hasWork {
    // Send heartbeat message to the server.
    activity.RecordHeartbeat(ctx, progress)
    // Do some work.
    ...
    progress++
}
```
When an Activity times out due to a missed heartbeat, the last value of the details (`progress` in the
above sample) is returned from the `workflow.ExecuteActivity` function as the details field of `TimeoutError`
with `TimeoutType` set to `Heartbeat`.

You can also heartbeat an Activity from an external source:

```go
// The client is a heavyweight object that should be created once per process.
serviceClient, err := client.NewClient(client.Options{
    HostPort:     HostPort,
    Namespace:   Namespace,
    MetricsScope: scope,
})

// Record heartbeat.
err := serviceClient.RecordActivityHeartbeat(ctx, taskToken, details)
```
The parameters of the `RecordActivityHeartbeat` function are:

* `taskToken`: The value of the binary `TaskToken` field of the `ActivityInfo` struct retrieved inside
the Activity.
* `details`: The serializable payload containing progress information.

#### Cancellation

When an Activity is cancelled, or its Workflow execution has completed or failed, the context passed
into its function is cancelled, which sets its channel’s closed state to `Done`. An Activity can use that
to perform any necessary cleanup and abort its execution. Cancellation is only delivered to Activities
that call `RecordActivityHeartbeat`.

### Registration

To make the Activity visible to the Worker process hosting it, the Activity must be registered with the Worker.

```go
w := worker.New(temporalClient, "your_task_queue", worker.Options{})
w.RegisterActivity(YourActivity)
```

This call creates an in-memory mapping inside the Worker process between the function name and the function itself.
If a Worker receives a request to start an Activity execution for an Activity function it does not know, it will fail that request.

To register multiple Activities with the Worker, just make multiple Activity registration calls, but make sure each Activity function name is unique:

```
w.registerActivity(ActivityA)
w.registerActivity(ActivityB)
w.registerActivity(ActivityC)
```


## Synchronous Activity Execution

The primary responsibility of a Workflow implementation is to schedule Activities for execution. The
most straightforward way to do this is via the library method `workflow.ExecuteActivity`. The following
sample code demonstrates making this call:

```go
ao := workflow.ActivityOptions{
        TaskQueue:               "sampleTaskQueue",
        ScheduleToCloseTimeout: time.Second * 60,
        ScheduleToStartTimeout: time.Second * 60,
        StartToCloseTimeout:    time.Second * 60,
        HeartbeatTimeout:       time.Second * 10,
        WaitForCancellation:    false,
}
ctx = workflow.WithActivityOptions(ctx, ao)

var result string
err := workflow.ExecuteActivity(ctx, SimpleActivity, value).Get(ctx, &result)
if err != nil {
        return err
}
```

Let's take a look at each component of this call.

### Activity options

Before calling `workflow.ExecuteActivity()`, you must configure `ActivityOptions` for the
invocation. These options customize various execution timeouts, and are passed in by creating a child
context from the initial context and overwriting the desired values. The child context is then passed
into the `workflow.ExecuteActivity()` call. If multiple Activities are sharing the same option
values, then the same context instance can be used when calling `workflow.ExecuteActivity()`.

By default, Temporal retries failing Activities with these default values (exponential backoff starting from 1 second going up to 100 seconds):

- `InitialInterval` of 1 second
- `BackoffCoefficient` of 2.0
- `MaximumInterval` of 100 seconds (100x multiple of `InitialInterval`)
- `MaximumAttempts` of 0 (in other words, unlimited retries)

You can refer to [our Retry Policy documentation](https://docs.temporal.io/docs/go-retries) for guidance on customizing your retry behavior.

### Activity timeouts

There can be various kinds of timeouts associated with an Activity. Temporal guarantees that Activities
are executed _at most once_, so an Activity either succeeds or fails with one of the following timeouts:

| Timeout                  | Description                                                                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `StartToCloseTimeout`    | Maximum time that a worker can take to process a task after it has received the task.                                                                                                                |
| `ScheduleToStartTimeout` | Time a task can wait to be picked up by an Activity worker after a Workflow schedules it. If there are no workers available to process this task for the specified duration, the task will time out. |
| `ScheduleToCloseTimeout` | Time a task can take to complete after it is scheduled by a Workflow. This is usually greater than the sum of `StartToClose` and `ScheduleToStart` timeouts.                                         |
| `HeartbeatTimeout`       | If a task doesn't heartbeat to the Temporal service for this duration, it will be considered to have failed. This is useful for long-running tasks.                                                  |

### ExecuteActivity call

The first parameter in the call is the required `workflow.Context` object. This type is a copy of
`context.Context` with the `Done()` method returning `workflow.Channel` instead of the native Go `chan`.

The second parameter is the function that we registered as an Activity function. This parameter can
also be a string representing the fully qualified name of the Activity function. The benefit of passing
in the actual function object is that the framework can validate Activity parameters.

The remaining parameters are passed to the Activity as part of the call. In our example, we have a
single parameter: `value`. This list of parameters must match the list of parameters declared by
the Activity function. The Temporal Go SDK will validate this.

The method call returns immediately and returns a `workflow.Future`. This allows you to execute more
code without having to wait for the scheduled Activity to complete.

When you are ready to process the results of the Activity, call the `Get()` method on the future
object returned. The parameters to this method are the `ctx` object we passed to the
`workflow.ExecuteActivity()` call and an output parameter that will receive the output of the
Activity. The type of the output parameter must match the type of the return value declared by the
Activity function. The `Get()` method will block until the Activity completes and results are
available.

You can retrieve the result value returned by `workflow.ExecuteActivity()` from the future and use
it like any normal result from a synchronous function call. The following sample code demonstrates how
you can use the result if it is a string value:

```go
var result string
if err := future.Get(ctx, &result); err != nil {
        return err
}

switch result {
case "apple":
        // Do something.
case "banana":
        // Do something.
default:
        return err
}
```

In this example, we called the `Get()` method on the returned future immediately after `workflow.ExecuteActivity()`.
However, this is not necessary. If you want to execute multiple Activities in parallel, you can
repeatedly call `workflow.ExecuteActivity()`, store the returned futures, and then wait for all
Activities to complete by calling the `Get()` methods of the future at a later time.

To implement more complex wait conditions on returned future objects, use the `workflow.Selector` class. Learn more on the [Go SDK Selectors](https://docs.temporal.io/docs/go-selectors) page.

## Asynchronous Activity Completion

There are certain scenarios when you want to defer completing an Activity until much later.
For example, you might have an application that requires user input in order to complete
the Activity.
You could do this with a polling mechanism, but a simpler and less
resource-intensive implementation is to *asynchronously* complete a Temporal Activity.

There are two parts to implementing an asynchronously completed Activity:

1. The Activity provides the information necessary for completion from an external system and notifies
the Temporal service that it is waiting for that outside callback (with `activity.ErrResultPending`).
2. The external service calls the Temporal service to complete the Activity (with `client.CompleteActivity`).

The following example demonstrates the first part:

```go
// Retrieve the Activity information needed to asynchronously complete the Activity.
activityInfo := activity.GetInfo(ctx)
taskToken := activityInfo.TaskToken

// Send the taskToken to the external service that will complete the Activity.
...

// Return from the Activity a function indicating that Temporal should wait for an async completion
// message.
return "", activity.ErrResultPending
```

The following code demonstrates how to complete the Activity successfully:

```go
// Instantiate a Temporal service client.
// The same client can be used to complete or fail any number of Activities.
// The client is a heavyweight object that should be created once per process.
serviceClient, err := client.NewClient(client.Options{})

// Complete the Activity.
client.CompleteActivity(context.Background(), taskToken, result, nil)
```

To fail the Activity, you would do the following:

```go
// Fail the Activity.
client.CompleteActivity(context.Background(), taskToken, nil, err)
```

Following are the parameters of the `CompleteActivity` function:

* `taskToken`: The value of the binary `TaskToken` field of the `ActivityInfo` struct retrieved inside
the Activity.
* `result`: The return value to record for the Activity. The type of this value must match the type
of the return value declared by the Activity function.
* `err`: The error code to return if the Activity terminates with an error.

If `error` is not null, the value of the `result` field is ignored.
