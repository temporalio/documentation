---
id: something
title: Temporal Go SDK developer guide - something
sidebar_label: something
---



### How to set Worker Options

```go
rwo := workflow.RegisterOptions {
   Name: "MyWorkflow", // Set "MyWorkflow" as the Workflow type
}
w.RegisterWorkflowWithOptions(dynamic.SampleGreetingsWorkflow, rwo)
```




## How to cancel a Workflow Execution

There are many scenarios where it is necessary and even ideal to be able to cancel a Workflow Execution.
Use the `CancelWorkflow` API to cancel a Workflow Execution using its Id.

<!--SNIPSTART samples-go-cancellation-cancel-workflow-execution-trigger-->
<!--SNIPEND-->

Workflow Definitions can be written to handle execution cancellation requests.
In the Workflow Definition below, there is a special Activity that handles clean up should the execution be cancelled.

<!--SNIPSTART samples-go-cancellation-workflow-definition-->
<!--SNIPEND-->

## How to get data in or out of a running Workflow

[Signals](/docs/go/signals) are the mechanism by which you can get data into already running Workflow.

[Queries](/docs/go/queries) are the mechanism by which you can get data out of currently running Workflow.

## Custom Serialization and Workflow Security

import DataConverter from '../shared/dataconverter.md'

<DataConverter href="https://pkg.go.dev/go.temporal.io/sdk@v1.6.0/converter#DataConverter" continueAsNewURL="#large-event-histories"/>

## Large Event Histories

import SharedContinueAsNew from '../shared/continue-as-new.md'

<SharedContinueAsNew />

To trigger this behavior, the Workflow function should
terminate by returning the special **ContinueAsNewError** error:

```go
func SimpleWorkflow(workflow.Context ctx, value string) error {
    ...
    return workflow.NewContinueAsNewError(ctx, SimpleWorkflow, value)
}
```

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

- `taskToken`: The value of the binary `TaskToken` field of the `ActivityInfo` struct retrieved inside
  the Activity.
- `details`: The serializable payload containing progress information.

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

The primary responsibility of a Workflow implementation is to schedule Activities for execution.
The most straightforward way to do this is via the `workflow.ExecuteActivity` API.
The following sample code demonstrates making this call:

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

                                                 |




















## How to call Timer APIs

- `workflow.Now()` This is a replacement for `time.Now()`.
- `workflow.Sleep()` This is a replacement for `time.Sleep()`.

## How to use a Data Converter

## How to wrap errors

## How to write tests

## How to use debugging tools



### What features are available to Go-based Workflows?

The following Temporal Go SDK features a

## How to use loggers?


- `workflow.GetLogger()` This is to ensure that the provided logger does not duplicate logs during a replay.


## How to create a Session


## How to use a Side Effect in a Workflow?



## SDK wrapped Go Channels



## How to Signal a Workflow Execution

Inside Workflow code you can also signal other workflows using their workflow type using `SignalExternalWorkflow`:

```go
// Send 10 signals to PHP workflow
for i := 0; i < 10; i++ {
    err :=  workflow.SignalExternalWorkflow(ctx, "simple-workflow-php", "", "goMessage", "Hello from Go workflow: "+strconv.Itoa(i)).Get(ctx, nil)
}
```

Here we are sending a signal to a Workflow with type "simple-workflow-php" and signal name "goMessage".

See our [Signals docs](https://docs.temporal.io/docs/go/signals) and [Temporal Polyglot example](https://github.com/tsurdilo/temporal-polyglot) for more.






-
- [Selectors](#)


- [Signals](#)
- [Queries](#)

  Use a [SideEffect](#side-effect), MutableSideEffect, or an Activity to load configuration values.


- Workflow Definition code can not affect changes in external systems directly.
- Workflow Definition code must use Go SDK APIs to handle things like time, logging, and goroutines.
- Workflow Definition code can not directly iterate over maps using `range` because the order of the map's iteration is randomized.

However, the Go SDK provides a number of features to handle these restrictions with ease.

1. To interact with external systems and nondeterministic code, Workflows can execute [Activities](/docs/go/activities).
2. To handle things like time, logging, and goroutines, as mentioned above, there are specific Go SDK APIs available, such as:


   - `workflow.Go()` This is a replacement for the the `go` statement.
   - `workflow.Channel` This is a replacement for the native `chan` type.
     Temporal provides support for both buffered and unbuffered channels.
   - `workflow.Selector` This is a replacement for the `select` statement. Learn more on the [Go SDK Selectors](https://docs.temporal.io/docs/go/selectors) page
   - `workflow.Context` This is a replacement for `context.Context`. Learn more on the [Go SDK Context Propagation](https://docs.temporal.io/docs/go/tracing) page.
3. Additionally, for executing very small pieces of nondeterministic logic within the Workflow, you can use the [`workflow.SideEffect` API](/docs/go/side-effect).

Below is a sample Workflow that is treated as a cron job by the Temporal Server.
It executes a single Activity and uses `workflow.Now()`.

<!--SNIPSTART samples-go-cron-workflow-->
<!--SNIPEND-->



## How to complete an Activity asynchronously


This is like a callback.
There are certain scenarios when you want to defer completing an Activity until much later.
For example, you might have an application that requires user input in order to complete
the Activity.

You could do this with a polling mechanism, but a simpler and less
resource-intensive implementation is to _asynchronously_ complete a Temporal Activity.

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

- `taskToken`: The value of the binary `TaskToken` field of the `ActivityInfo` struct retrieved inside
  the Activity.
- `result`: The return value to record for the Activity. The type of this value must match the type
  of the return value declared by the Activity function.
- `err`: The error code to return if the Activity terminates with an error.

If `error` is not null, the value of the `result` field is ignored.


### How to provide custom Activity Options

An instance of `ActivityOptions` can be obtained from the `go.temporal.io/sdk/workflow` package.
  The `ActivityOptions ` instance should then be added to the instance of `workflow.Context`, using `workflow.WithActivityOptions()`.
  The instance of `workflow.Context` is then passed to the `ExecuteActivity()` call.

```go
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
  // ...
  activityOptions := workflow.ActivityOptions{}
  ctx = workflow.WithActivityOptions(ctx, activityOptions)
  future := workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam)
  // ...
}
```

Any fields of the custom instance that do not have values specified, will inherit their values from default settings or Workflow Execution.


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
are executed _at least once_, so an Activity either succeeds or fails with one of the following timeouts:

| Timeout                  | Description                                                                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `StartToCloseTimeout`    | Maximum time that a worker can take to process a task after it has received the task.                                                                                                                |
| `ScheduleToStartTimeout` | Time a task can wait to be picked up by an Activity worker after a Workflow schedules it. If there are no workers available to process this task for the specified duration, the task will time out. |
| `ScheduleToCloseTimeout` | Time a task can take to complete after it is scheduled by a Workflow. This is usually greater than the sum of `StartToClose` and `ScheduleToStart` timeouts.                                         |
| `HeartbeatTimeout`       | If a task doesn't heartbeat to the Temporal service for this duration, it will be considered to have failed. This is useful for long-running tasks.

## How to provide custom Workflow Options



## How to invoke cron-based Workflow Executions

import DistributedCron from '../shared/distributed-cron.md'

<DistributedCron docUrl="https://pkg.go.dev/go.temporal.io/sdk/internal#StartWorkflowOptions">

```go
	workflowOptions := client.StartWorkflowOptions{
		ID:           workflowID,
		TaskQueue:    "cron",
		CronSchedule: "* * * * *",
	}

	we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, cron.SampleCronWorkflow)
```

You can [check our Go Samples](https://github.com/temporalio/samples-go/tree/master/cron) for example code.

</DistributedCron>

## Retrieve last successful result

Sometimes it is useful to obtain the progress of previous successful runs.
This is supported by two new APIs in the Go SDK:
`HasLastCompletionResult` and `GetLastCompletionResult`. Below is an example of how
to use this in Go:

```go
func CronWorkflow(ctx workflow.Context) (CronResult, error) {
    startTimestamp := time.Time{} // By default start from 0 time.
    if workflow.HasLastCompletionResult(ctx) {
        var progress CronResult
        if err := workflow.GetLastCompletionResult(ctx, &progress); err == nil {
            startTimestamp = progress.LastSyncTimestamp
        }
    }
    endTimestamp := workflow.Now(ctx)

    // Process work between startTimestamp (exclusive), endTimestamp (inclusive).
    // Business logic implementation goes here.

    result := CronResult{LastSyncTimestamp: endTimestamp}
    return result, nil
}
```

Note that this works even if one of the cron schedule runs failed. The
next schedule will still get the last successful result if it ever successfully
completed at least once. For example, for a daily cron Workflow, if the first day
run succeeds and the second day fails, then the third day run will still get
the result from first day's run using these APIs.
