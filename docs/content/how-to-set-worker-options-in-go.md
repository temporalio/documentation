---
id: how-to-set-worker-options-in-go
title: How to set WorkerOptions in go
description: todo
tags:
  - developer-guide
  - options
---

| Field | Required |  Type | Example |
| ----- | -------- | ----- | ------- |
| `MaxConcurrentActivityExecutionSize` | No | `int` | [👀](#maxconcurrentactivityexecutionsize) |
| `WorkerActivitiesPerSecond` | No | `float64` | |
| MaxConcurrentLocalActivityExecutionSize | Set the maximum concurrent local activity executions this worker can have | int |
| WorkerLocalActivitiesPerSecond | Set the the rate limiting on number of local activities that can be executed per second per worker | float64 |
| TaskQueueActivitiesPerSecond | Set the rate limiting on number of activities that can be executed per second | float64 |
| MaxConcurrentActivityTaskPollers | Set the maximum number of goroutines that will concurrently poll | int |
| MaxConcurrentWorkflowTaskExecutionSize | Set the maximum concurrent workflow task executions this worker can have | int |
| MaxConcurrentWorkflowTaskPollers | Set the maximum number of goroutines that will concurrently poll | int |
| EnableLoggingInReplay | Set to enable logging in replay | bool |
| DisableStickyExecution | Set to disable sticky execution | bool |
| StickyScheduleToStartTimeout | Set the sticky schedule to start timeout | time.Duration |
| BackgroundActivityContext | Set the context for activity | context.Context |
| WorkflowPanicPolicy | Set  how workflow worker deals with non-deterministic history event | WorkflowPanicPolicy |
| WorkerStopTimeout | Set how worker graceful stop timeout | time.Duration |
| EnableSessionWorker | Set to enable running session workers | bool |
| MaxConcurrentSessionExecutionSize | Set the maximum number of concurrently running sessions the resource support | int |
| WorkflowInterceptorChainFactories | Set factories used to instantiate workflow interceptor chain | []WorkflowInterceptor |
| LocalActivityWorkerOnly | Set if worker would only handle workflow tasks and local activities | bool |
| Identity | Set to overwrite the client level Identify value | string |

### `MaxConcurrentActivityExecutionSize`

Set the the maximum concurrent activity executions this worker can have

### `WorkerActivitiesPerSecond`

Set the rate limiting on number of activities that can be executed per second per worker
