---
id: activityoptions-reference
title: Go ActivityOptions reference
sidebar_label: Activity Options reference
description: Create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package and use `WithActivityOptions()` to apply it to the instance of `workflow.Context`.
tags:
  - developer-guide
  - go
---

Create an instance of [`ActivityOptions`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ActivityOptions) from the `go.temporal.io/sdk/workflow` package and use [`WithActivityOptions()`](https://pkg.go.dev/go.temporal.io/sdk/workflow#WithActivityOptions) to apply it to the instance of `workflow.Context`.

The instance of `workflow.Context` is then passed to the `ExecuteActivity()` call.

| Field                                               | Required                          | Type                                                                        |
| --------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------- |
| [`ActivityID`](#activityid)                         | No                                | `string`                                                                    |
| [`TaskQueueName`](#taskqueuename)                   | No                                | `string`                                                                    |
| [`ScheduleToCloseTimeout`](#scheduletoclosetimeout) | Yes (or `StartToCloseTimeout`)    | `time.Duration`                                                             |
| [`ScheduleToStartTimeout`](#scheduletostarttimeout) | No                                | `time.Duration`                                                             |
| [`StartToCloseTimeout`](#scheduletoclosetimeout)    | Yes (or `ScheduleToCloseTimeout`) | `time.Duration`                                                             |
| [`HeartbeatTimeout`](#heartbeattimeout)             | No                                | `time.Duration`                                                             |
| [`WaitForCancellation`](#waitforcancellation)       | No                                | `bool`                                                                      |
| [`OriginalTaskQueueName`](#originaltaskqueuename)   | No                                | `string`                                                                    |
| [`RetryPolicy`](#retrypolicy)                       | No                                | [`RetryPolicy`](https://pkg.go.dev/go.temporal.io/sdk/temporal#RetryPolicy) |

### `ActivityID`

- Type: `string`
- Default: None

```go
activityoptions := workflow.ActivityOptions{
  ActivityID: "your-activity-id",
}
ctx = workflow.WithActivityOptions(ctx, activityoptions)
var yourActivityResult YourActivityResult
err = workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
if err != nil {
  // ...
}
```

- [What is an Activity Id](/concepts/what-is-an-activity-id)

### `TaskQueueName`

- Type: `string`
- Default: Inherits the TaskQueue name from the Workflow.

```go
activityoptions := workflow.ActivityOptions{
  TaskQueueName: "your-task-queue-name",
}
ctx = workflow.WithActivityOptions(ctx, activityoptions)
var yourActivityResult YourActivityResult
err = workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
if err != nil {
  // ...
}
```

- [What is a Task Queue](/concepts/what-is-a-task-queue)

### `ScheduleToCloseTimeout`

import ScheduleToCloseTimeout from './how-to-set-a-schedule-to-close-timeout-in-go.md'

<ScheduleToCloseTimeout/>

### `ScheduleToStartTimeout`

import ScheduleToStartTimeout from './how-to-set-a-schedule-to-start-timeout-in-go.md'

<ScheduleToStartTimeout/>

### `StartToCloseTimeout`

import StartToCloseTimeout from './how-to-set-a-start-to-close-timeout-in-go.md'

<StartToCloseTimeout/>

### `HeartbeatTimeout`

import HeartbeatTimeout from './how-to-set-a-heartbeat-timeout-in-go.md'

<HeartbeatTimeout/>

### `WaitForCancellation`

If `true` the Activity Execution will finish executing should there be a Cancellation request.

- Type: `bool`
- Default: `false`

```go
activityoptions := workflow.ActivityOptions{
  WaitForCancellation: false,
}
ctx = workflow.WithActivityOptions(ctx, activityoptions)
var yourActivityResult YourActivityResult
err = workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
if err != nil {
  // ...
}
```

### `OriginalTaskQueueName`

```go
activityoptions := workflow.ActivityOptions{
  OriginalTaskQueueName: "your-original-task-queue-name",
}
ctx = workflow.WithActivityOptions(ctx, activityoptions)
var yourActivityResult YourActivityResult
err = workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
if err != nil {
  // ...
}
```

### `RetryPolicy`

import RetryPolicy from './how-to-set-an-activity-retry-policy-in-go.md'

<RetryPolicy/>
