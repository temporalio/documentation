---
id: activityoptions-reference
title: Go ActivityOptions reference
sidebar_label: Activity Options reference
description: Create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package and use `WithActivityOptions()` to apply it to the instance of `workflow.Context`.
tags:
  - developer-guide-doc-type
  - go sdk
  - activity options
  - activity
  - reference-doc-type
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

#### ActivityID

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

#### TaskQueueName

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

#### ScheduleToCloseTimeout

To set a [Schedule-To-Close Timeout](/concepts/what-is-a-schedule-to-close-timeout), create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the `ScheduleToCloseTimeout` field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.

This or `StartToCloseTimeout` must be set.

- Type: `time.Duration`
- Default: ∞ (infinity - no limit)

```go
activityoptions := workflow.ActivityOptions{
  ScheduleToCloseTimeout: 10 * time.Second,
}
ctx = workflow.WithActivityOptions(ctx, activityoptions)
var yourActivityResult YourActivityResult
err = workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
if err != nil {
  // ...
}
```

#### ScheduleToStartTimeout

To set a [Schedule-To-Start Timeout](/concepts/what-is-a-schedule-to-start-timeout), create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the `ScheduleToStartTimeout` field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.

- Type: `time.Duration`
- Default: ∞ (infinity - no limit)

```go
activityoptions := workflow.ActivityOptions{
  ScheduleToStartTimeout: 10 * time.Second,
}
ctx = workflow.WithActivityOptions(ctx, activityoptions)
var yourActivityResult YourActivityResult
err = workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
if err != nil {
  // ...
}
```

#### StartToCloseTimeout

To set a [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout), create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the `StartToCloseTimeout` field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.

This or `ScheduleToCloseTimeout` must be set.

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

#### HeartbeatTimeout

To set a [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout), create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the `RetryPolicy` field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.

```go
activityoptions := workflow.ActivityOptions{
  HeartbeatTimeout: 10 * time.Second,
}
ctx = workflow.WithActivityOptions(ctx, activityoptions)
var yourActivityResult YourActivityResult
err = workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
if err != nil {
  // ...
}
```

#### WaitForCancellation

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

#### OriginalTaskQueueName

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

#### RetryPolicy

To set a [RetryPolicy](/concepts/what-is-a-retry-policy), create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the `RetryPolicy` field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.

- Type: [`RetryPolicy`](https://pkg.go.dev/go.temporal.io/sdk/temporal#RetryPolicy)
- Default:

```go
retrypolicy := &temporal.RetryPolicy{
  InitialInterval:    time.Second,
  BackoffCoefficient: 2.0,
  MaximumInterval:    time.Second * 100, // 100 * InitialInterval
  MaximumAttempts:    0, // Unlimited
  NonRetryableErrorTypes: []string, // empty
}
```

Providing a Retry Policy here is a customization that overwrites individual Field defaults.

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
