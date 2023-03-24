---
id: how-to-set-workeroptions-in-go
title: How to set WorkerOptions in Go
sidebar_label: WorkerOptions
description: Create an instance of `Options` from the `go.temporal.io/sdk/worker` package, set any of the optional fields, and pass the instance to the `New` call.
tags:
  - developer-guide
  - options
  - go
---

Create an instance of [`Options`](https://pkg.go.dev/go.temporal.io/sdk/worker#Options) from the `go.temporal.io/sdk/worker` package, set any of the optional fields, and pass the instance to the [`New`](https://pkg.go.dev/go.temporal.io/sdk/worker#New) call.

| Field                                                                                 | Required | Type                                                                                          |
| ------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| [`MaxConcurrentActivityExecutionSize`](#maxconcurrentactivityexecutionsize)           | No       | `int`                                                                                         |
| [`WorkerActivitiesPerSecond`](#workeractivitiespersecond)                             | No       | `float64`                                                                                     |
| [`MaxConcurrentLocalActivityExecutionSize`](#maxconcurrentlocalactivityexecutionsize) | No       | `int`                                                                                         |
| [`WorkerLocalActivitiesPerSecond`](#workerlocalactivitiespersecond)                   | No       | `float64`                                                                                     |
| [`TaskQueueActivitiesPerSecond`](#taskqueueactivitiespersecond)                       | No       | `float64`                                                                                     |
| [`MaxConcurrentActivityTaskPollers`](#maxconcurrentactivitytaskpollers)               | No       | `int`                                                                                         |
| [`MaxConcurrentWorkflowTaskExecutionSize`](#maxconcurrentworkflowtaskexecutionsize)   | No       | `int`                                                                                         |
| [`MaxConcurrentWorkflowTaskPollers`](#maxconcurrentworkflowtaskpollers)               | No       | `int`                                                                                         |
| [`EnableLoggingInReplay`](#enablelogginginreplay)                                     | No       | `bool`                                                                                        |
| [`DisableStickyExecution`](#disablestickyexecution)                                   | No       | `bool`                                                                                        |
| [`StickyScheduleToStartTimeout`](#stickyscheduletostarttimeout)                       | No       | [`time.Duration`](https://pkg.go.dev/time#Duration)                                           |
| [`BackgroundActivityContext`](#backgroundactivitycontext)                             | No       | [`context.Context`](https://pkg.go.dev/context#Context)                                       |
| [`WorkflowPanicPolicy`](#workflowopanicpolicy)                                        | No       | [`WorkflowPanicPolicy`](https://pkg.go.dev/go.temporal.io/sdk/internal#WorkflowPanicPolicy)   |
| [`WorkerStopTimeout`](#workerstoptimeout)                                             | No       | [`time.Duration`](https://pkg.go.dev/time#Duration)                                           |
| [`EnableSessionWorker`](#enablesessionworker)                                         | No       | `bool`                                                                                        |
| [`MaxConcurrentSessionExecutionSize`](#maxconcurrentsessionexecutionsize)             | No       | `int`                                                                                         |
| [`WorkflowInterceptorChainFactories`](#workflowinterceptorchainfactories)             | No       | [`[]WorkflowInterceptor`](https://pkg.go.dev/go.temporal.io/sdk/internal#WorkflowInterceptor) |
| [`LocalActivityWorkerOnly`](#localactivityworkeronly)                                 | No       | `bool`                                                                                        |
| [`Identity`](#identity)                                                               | No       | `string`                                                                                      |
| [`DeadlockDetectionTimeout`](#deadlockdetectiontimeout)                               | No       | [`time.Duration`](https://pkg.go.dev/time#Duration)                                           |

### `MaxConcurrentActivityExecutionSize`

Sets the maximum concurrent Activity Executions for the Worker.

- Type: `int`
- Default: `1000`

A value of `0` sets to the default.

```go
// ...
workerOptions := worker.Options{
  MaxConcurrentActivityExecutionSize: 1000,
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `WorkerActivitiesPerSecond`

Rate limits the number of Activity Task Executions started per second for the Worker.

- Type: `float64`
- Default: `100000`

A value of `0` sets to the default.

Intended use case is to limit resources used by the Worker.

Notice that the value type is a float so that the value can be less than 1 if needed.
For example, if set to 0.1, Activity Task Executions will happen once every ten seconds.
This can be used to protect down stream services from flooding with requests.

```go
// ...
workerOptions := worker.Options{
	WorkerActivitiesPerSecond: 100000,
  // ..
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `MaxConcurrentLocalActivityExecutionSize`

Set the maximum concurrent [Local Activity Executions](/concepts/what-is-a-local-activity) for the Worker.

- Type: `int`
- Default: `1000`

A value of `0` sets to the default value.

```go
// ...
workerOptions := worker.Options{
	MaxConcurrentLocalActivityExecutionSize: 1000,
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `WorkerLocalActivitiesPerSecond`

Rate limits the number of Local Activity Executions per second executed for the Worker.

- Type: `float64`
- Default: `100000`

A value of `0` sets to the default value.

Intended use case is to limit resources used by the Worker.

Notice that the value type is a float so that the value can be less than 1 if needed.
For example, if set to 0.1, Local Activity Task Executions will happen once every ten seconds.
This can be used to protect down stream services from flooding with requests.

```go
// ...
workerOptions := worker.Options{
	WorkerLocalActivitiesPerSecond: 100000,
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `TaskQueueActivitiesPerSecond`

Rate limits the number of Activity Executions that can be started per second.

- Type: `float64`
- Default: `100000`

A value of `0` sets to the default value.

This rate is managed by the Temporal Cluster and limits the Activity Tasks per second for the entire Task Queue. This is in contrast to [`WorkerActivityTasksPerSecond`](#workeractivitytaskspersecond) controls activities only per Worker.

Notice that the number is represented in float, so that you can set it to less than 1 if needed.
For example, set the number to 0.1 means you want your Activity to be executed once for every 10 seconds.
This can be used to protect down stream services from flooding.

```go
// ...
workerOptions := worker.Options{
	TaskQueueActivitiesPerSecond: 100000,
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `MaxConcurrentActivityTaskPollers`

Sets the maximum number of goroutines to concurrently poll the Task Queue for Activity Tasks.

- Type: `int`
- Default: `2`

Changing this value will affect the rate at which the Worker is able to consume Activity Tasks from the Task Queue.

```go
// ...
workerOptions := worker.Options{
	MaxConcurrentActivityTaskPollers: 2,
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `MaxConcurrentWorkflowTaskExecutionSize`

Sets the maximum number of concurrent Workflow Task Executions the Worker can have.

- Type: `int`
- Default: `1000`

A value of `0` sets to the default value.

```go
// ...
workerOptions := worker.Options{
	MaxConcurrentWorkflowTaskExecutionSize: 1000,
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `MaxConcurrentWorkflowTaskPollers`

Sets the maximum number of goroutines that will concurrently poll the Task Queue for Workflow Tasks.

- Type: `int`
- Default: `2`

Changing this value will affect the rate at which the Worker is able to consume Workflow Tasks from the Task Queue.

```go
// ...
workerOptions := worker.Options{
	MaxConcurrentWorkflowTaskPollers: 2,
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `EnableLoggingInReplay`

Set to enable logging in Workflow Execution replays.

- type: `bool`
- Default: `false`

In Workflow Definitions you can use [`workflow.GetLogger(ctx)`](https://pkg.go.dev/go.temporal.io/sdk/workflow#GetLogger) to write logs.
By default, the logger will skip logging during replays, so you do not see duplicate logs.

This is only really useful for debugging purpose.

```go
// ...
workerOptions := worker.Options{
	EnableLoggingInReplay: false,
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `DisableStickyExecution`

:::caution Deprecated

When DisableStickyExecution is `true` it can harm performance.
It will be removed soon.
See [`SetStickyWorkflowCacheSize`](https://pkg.go.dev/go.temporal.io/sdk/worker#SetStickyWorkflowCacheSize) instead.

:::

Set to disable Sticky Executions

- Type: `bool`
- Default: `false`

Sticky Execution runs Workflow Tasks of a Workflow Execution on same host (could be a different Worker, as long as it is on the same host).
This is an optimization for Workflow Executions.
When sticky execution is enabled, Worker keeps the Workflow state in memory.
New Workflow Task contains the new history events will be dispatched to the same Worker.
If this Worker crashes, the sticky Workflow Task will timeout after `StickyScheduleToStartTimeout`, and Temporal Cluster will clear the stickiness for that Workflow Execution and automatically reschedule a new Workflow Task that is available for any Worker to pick up and resume the progress.

```go
// ...
workerOptions := worker.Options{
	StickyScheduleToStartTimeout: time.Second(5),
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `StickyScheduleToStartTimeout`

Sets the Sticky Execution Schedule-To-Start Timeout for Workflow Tasks.

- Type: [`time.Duration`](https://pkg.go.dev/time#Duration)
- Default value is `5`

The resolution is in seconds.

```go
// ...
workerOptions := worker.Options{
	StickyScheduleToStartTimeout: time.Second(5),
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `BackgroundActivityContext`

:::caution Not recommended

This method of passing dependencies between Activity Task Executions is not recommended anymore.

Instead, we recommend using a struct with fields that contain dependencies and [develop Activity Definitions](/application-development/foundations#develop-activities) as struct methods and then pass all the dependencies on the structure initialization.

:::

- Type: [`context.Context`](https://pkg.go.dev/context#Context)

Sets the background `context.Context` for all Activity Types registered with the Worker.

The context can be used to pass external dependencies such as database connections to Activity Task Executions.

```go
// ...
ctx := context.WithValue(context.Background(), "your-key", "your-value")
workerOptions := worker.Options{
	BackgroundActivityContext: ctx,
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `WorkflowPanicPolicy`

Sets how the Workflow Worker handles a non-deterministic Workflow Execution History Event and other panics from Workflow Definition code.

- Type: [`WorkflowPanicPolicy`](https://pkg.go.dev/go.temporal.io/sdk/internal#WorkflowPanicPolicy)
- Default: `BlockWorkflow`

```go
// ...
workerOptions := worker.Options{
	DisableStickyExecution: internal.BlockWorkflow,
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `WorkerStopTimeout`

Sets the Worker's graceful stop timeout

- Type: [`time.Duration`](https://pkg.go.dev/time#Duration)
- Default: `0`

Value resolution is in seconds.

```go
// ...
workerOptions := worker.Options{
	WorkerStopTimeout: time.Second(0),
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `EnableSessionWorker`

Enables Sessions for Activity Workers.

- Type: `bool`
- Default: `false`

When `true` the Activity Worker creates a Session to sequentially process Activity Tasks for the given Task Queue.

```go
// ...
workerOptions := worker.Options{
	EnableSessionWorker: true,
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `MaxConcurrentSessionExecutionSize`

Sets the maximum number of concurrent Sessions that the Worker can support.

- Type: `int`
- Default: 1000

```go
// ...
workerOptions := worker.Options{
	MaxConcurrentSessionExecutionSize: 1000,
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `WorkflowInterceptorChainFactories`

Specifies the factories used to instantiate the Workflow interceptor chain.

- Type: [`[]WorkflowInterceptor`](https://pkg.go.dev/go.temporal.io/sdk/internal#WorkflowInterceptor)

The chain is instantiated for each replay of a Workflow Execution.

### `LocalActivityWorkerOnly`

Sets the Worker to only handle Workflow Tasks and local Activity Tasks.

- Type: `bool`
- Default: `false`

```go
// ...
workerOptions := worker.Options{
	LocalActivityWorkerOnly: 1000,
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `Identity`

Sets the Temporal Client-level Identity value, overwriting the existing one.

- Type: string
- Default: client identity

```go
// ...
workerOptions := worker.Options{
	Identity: "your_custom_identity",
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```

### `DeadlockDetectionTimeout`

Sets the maximum time that a Workflow Task can execute for.

- Type: [`time.Duration`](https://pkg.go.dev/time#Duration)
- Default: 1

Resolution is in seconds.

```go
// ...
workerOptions := worker.Options{
	DeadlockDetectionTimeout: time.Second(1),
  // ...
}
w := worker.New(c, "your_task_queue_name", workerOptions)
// ...
```
