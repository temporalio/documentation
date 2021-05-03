---
id: activities
title: Activities in Go
sidebar_label: Activities
---

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
  - Data can be passed directly to an Activity via function parameters. The parameters can be either basic types or structs (must be serializable).
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

You can refer to [our Retry Policy documentation](https://docs.temporal.io/docs/go/retries) for guidance on customizing your retry behavior.

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

To implement more complex wait conditions on returned future objects, use the `workflow.Selector` class. Learn more on the [Go SDK Selectors](https://docs.temporal.io/docs/go/selectors) page.

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
