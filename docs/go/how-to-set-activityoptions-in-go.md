---
id: how-to-set-activityoptions-in-go
title: How to set ActivityOptions in Go
sidebar_label: ActivityOptions
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

- [What is an Activity Id](/docs/concepts/what-is-an-activity-id)

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

- [What is a Task Queue](/docs/concepts/what-is-a-task-queue)

### `ScheduleToCloseTimeout`

import ScheduleToCloseTimeout from './activityoptions/schedule-to-close-timeout.md'

<ScheduleToCloseTimeout/>

- [What is a Schedule-To-Close Timeout](/docs/concepts/what-is-a-schedule-to-close-timeout)

### `ScheduleToStartTimeout`

import StartToCloseTimeout from './activityoptions/start-to-close-timeout.md'

<StartToCloseTimeout/>

- [What is a Schedule-To-Start Timeout](/docs/concepts/what-is-a-schedule-to-start-timeout)

### `StartToCloseTimeout`

- Type: `time.Duration`
- Default: Same as the `ScheduleToCloseTimeout`

```go
activityoptions := workflow.ActivityOptions{
  StartToCloseTimeout: 10 * time.Second,
}
ctx = workflow.WithActivityOptions(ctx, activityoptions)
var yourActivityResult YourActivityResult
err = workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
if err != nil {
  // ...
}
```

- [What is an Start-To-Close Timeout](/docs/concepts/what-is-a-start-to-close-timeout)

### `HeartbeatTimeout`

import HeartbeatTimeoutGo from './activityoptions/heartbeat-timeout.md'

<HeartbeatTimeoutGo/>

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

- Type: [`RetryPolicy`](https://pkg.go.dev/go.temporal.io/sdk/temporal#RetryPolicy)
- Default:

```go
retrypolicy := &temporal.RetryPolicy{
  InitialInterval:    time.Second,
  BackoffCoefficient: 2.0,
  MaximumInterval:    time.Second * 100, // 100 * InitialInterval
  MaximumAttempts: 0, // Unlimited
  NonRetryableErrorTypes: []string, // empty
}
```

Providing a Retry Policy here is a customization, and overwrites individual Field defaults.

```go
retrypolicy := &temporal.RetryPolicy{
  InitialInterval:    time.Second,
  BackoffCoefficient: 2.0,
  MaximumInterval:    time.Second * 100,
}

activityoptions := workflow.ActivityOptions{
  RetryPolicy: retrypolicy,
}
ctx = workflow.WithActivityOptions(ctx, activityoptions)
var yourActivityResult YourActivityResult
err = workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
if err != nil {
  // ...
}
```

- [What is a Retry Policy](/docs/concepts/what-is-a-retry-policy)
