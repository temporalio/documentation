---
id: how-to-set-workeroptions-in-go
title: How to set WorkerOptions in Go
description: Create an instance of `Options` from the `go.temporal.io/sdk/worker` package, set any of the optional fields, and pass the instance to the `New` call.
tags:
  - developer-guide
  - options
  - go
---

Create an instance of [`Options`](https://pkg.go.dev/go.temporal.io/sdk/worker#Options) from the `go.temporal.io/sdk/worker` package, set any of the optional fields, and pass the instance to the [`New`](https://pkg.go.dev/go.temporal.io/sdk/worker#New) call.

| Field | Required |  Type | Example |
| ----- | -------- | ----- | ------- |
| `MaxConcurrentActivityExecutionSize` | No | `int` | [👀](#maxconcurrentactivityexecutionsize) |
| `WorkerActivitiesPerSecond` | No | `float64` | [👀](#workeractivitiespersecond) |
| `MaxConcurrentLocalActivityExecutionSize` | No | `int` | [👀](#maxconcurrentlocalactivityexecutionsize) |
| `WorkerLocalActivitiesPerSecond` | No | `float64` | [👀](#workerlocalactivitiespersecond) |
| `TaskQueueActivitiesPerSecond` | No | `float64` | [👀](#taskqueueactivitiespersecond) |
| `MaxConcurrentActivityTaskPollers` | No | `int` | [👀](#maxconcurrentactivitytaskpollers) |
| `MaxConcurrentWorkflowTaskExecutionSize` | No | `int` | [👀](#maxconcurrentworkflowtaskexecutionsize) |
| `MaxConcurrentWorkflowTaskPollers` | No | `int` | [👀](#maxconcurrentworkflowtaskpollers) |
| `EnableLoggingInReplay` | No | `bool` | [👀](#enablelogginginreplay) |
| `DisableStickyExecution` | No | `bool` | [👀](#disablestickyexecution) |
| `StickyScheduleToStartTimeout` | No | [time.Duration](https://pkg.go.dev/time#Duration) | [👀](#stickyscheduletostarttimeout) |
| `BackgroundActivityContext` | No | [context.Context](https://pkg.go.dev/context#Context) | [👀](#backgroundactivitycontext) |
| `WorkflowPanicPolicy` | No | [WorkflowPanicPolicy](https://pkg.go.dev/go.temporal.io/sdk@v1.10.0/internal#WorkflowPanicPolicy) | [👀](#workflowpanicpolicy) |
| `WorkerStopTimeout` | No | [time.Duration](https://pkg.go.dev/time#Duration) | [👀](#workerstoptimeout) |
| `EnableSessionWorker` | No | `bool` | [👀](#enablesessionworker) |
| `MaxConcurrentSessionExecutionSize` | No | `int` | [👀](#maxconcurrentsessionexecutionsize) |
| `WorkflowInterceptorChainFactories` | No |  [`[]WorkflowInterceptor`](https://pkg.go.dev/go.temporal.io/sdk@v1.10.0/internal#WorkflowInterceptor) | [👀](#workflowinterceptorchainfactories) |
| `LocalActivityWorkerOnly` | No | `bool` | [👀](#localactivityworkeronly) |
| `Identity` | No | `string` | [👀](#identity) |

### `MaxConcurrentActivityExecutionSize`

Sets the the maximum concurrent Activity Executions for the Worker.

**Default is 1000**

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

Rate limits the number of Activity Task Executions per second for the Worker.

**Default is 100,000**

A value of `0` sets to the default.

Intended use case is to limit resources used by the Worker.

Notice that the value type is a float so that the value can be less than 1 if needed.
For example, if set to 0.1, Activity Task Executions will happen once every ten seconds.
This can be used to protect down stream services from flooding with requests.

```go
workerOptions := worker.Options{
	WorkerActivitiesPerSecond: 100000, // Important for a worker to participate in the session
}
	w := worker.New(c, "your_task_queue_name", workerOptions)
```

### `MaxConcurrentLocalActivityExecutionSize`

Set the maximum concurrent [Local Activity Executions](/docs/content/what-is-a-local-activity) for the Worker.

**Default is 1000**

A value of `0` sets to the default value.

```go
workerOptions := worker.Options{
	MaxConcurrentLocalActivityExecutionSize: 1000, // Important for a worker to participate in the session
}
	w := worker.New(c, "your_task_queue_name", workerOptions)
```

### `WorkerLocalActivitiesPerSecond`

Rate limits the number of Local Activity Executions per second executed for the Worker.

Intended use case is to limit resources used by the Worker.

Notice that the value type is a float so that the value can be less than 1 if needed.
For example, if set to 0.1, Local Activity Task Executions will happen once every ten seconds.
This can be used to protect down stream services from flooding with requests.

 // The zero value of this uses the default value
 // default: 100k

```go
workerOptions := worker.Options{
	WorkerLocalActivitiesPerSecond: 1000, // Important for a worker to participate in the session
}
	w := worker.New(c, "your_task_queue_name", workerOptions)
```

### `TaskQueueActivitiesPerSecond`

Set the rate limiting on number of activities that can be executed per second

### `MaxConcurrentActivityTaskPollers`

Set the maximum number of goroutines that will concurrently poll

### `MaxConcurrentWorkflowTaskExecutionSize`

Set the maximum concurrent workflow task executions this worker can have

### `MaxConcurrentWorkflowTaskPollers`

Set the maximum number of goroutines that will concurrently poll

### `EnableLoggingInReplay`

Set to enable logging in replay

### `DisableStickyExecution`

Set to disable sticky execution

### `StickyScheduleToStartTimeout`

Set the sticky schedule to start timeout

### `BackgroundActivityContext`

Set the context for activity

### `WorkflowPanicPolicy`

Set how workflow worker deals with non-deterministic history event

### `WorkerStopTimeout`

Set how worker graceful stop timeout

### `EnableSessionWorker`

Set to enable running session workers

### `MaxConcurrentSessionExecutionSize`

Set the maximum number of concurrently running sessions the resource support

### `WorkflowInterceptorChainFactories`

Set factories used to instantiate workflow interceptor chain

### `LocalActivityWorkerOnly`

Set if worker would only handle workflow tasks and local activities

### `Identity`

Set to overwrite the client level Identify value
