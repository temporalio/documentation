---
id: how-to-set-activityoptions-in-go
title: How to set ActivityOptions in Go
description: Create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package and use `WithActivityOptions()` to apply it to the instance of `workflow.Context`.
tags:
  - developer-guide
  - go
---

import RelatedReadList from '../components/RelatedReadList.js'

Create an instance of [`ActivityOptions`](https://pkg.go.dev/go.temporal.io/sdk@v1.10.0/workflow#ActivityOptions) from the `go.temporal.io/sdk/workflow` package and use [`WithActivityOptions()`](https://pkg.go.dev/go.temporal.io/sdk@v1.10.0/workflow#WithActivityOptions) to apply it to the instance of `workflow.Context`.

The instance of `workflow.Context` is then passed to the `ExecuteActivity()` call.

| Field | Required | Type | Example |
| ----- | -------- | ---- | ------- |
| [`ActivityID`](/docs/content/what-is-an-activity-id) | No | `string` | [👀](#activityid) |
| [`TaskQueueName`](/docs/content/what-is-a-task-queue) | Yes | `string` | [👀](#taskqueuename) |
| [`ScheduleToCloseTimeout`](/docs/content/what-is-a-schedule-to-close-timeout) | Yes (or `StartToCloseTimeout`) | `time.Duration` | [👀](#scheduletoclosetimeout) |
| [`ScheduleToStartTimeout`](/docs/content/what-is-a-schedule-to-start-timeout) | No | `time.Duration` | [👀](#scheduletostarttimeout) |
| [`StartToCloseTimeout`](/docs/content/what-is-a-start-to-close-timeout) | Yes (or `ScheduleToCloseTimeout`) | `time.Duration` | [👀](#scheduletoclosetimeout) |
| [`HeartbeatTimeout`](/docs/content/what-is-a-heartbeat-timeout) | No | `time.Duration` | [👀](#heartbeattimeout) |
| `WaitForCancellation` | No | `bool` | [👀](#waitforcancellation) |
| `OriginalTaskQueueName` | No | `string` | [👀](#originaltaskqueuename) |
| [`RetryPolicy`](/docs/content/what-is-a-retry-policy) | No | [`RetryPolicy`](https://pkg.go.dev/go.temporal.io/sdk@v1.10.0/temporal#RetryPolicy) | [👀](#retrypolicy) |

### `ActivityID`

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

<RelatedReadList
readlist={[
["What is an Activity Id?", "/docs/content/what-is-an-activity-id", "explanation"],
]}
/>

### `TaskQueueName`

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

<RelatedReadList
readlist={[
["What is a Task Queue?", "/docs/content/what-is-a-task-queue", "explanation"],
]}
/>

### `ScheduleToCloseTimeout`

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

<RelatedReadList
readlist={[
["What is a Schedule-To-Close Timeout?", "/docs/content/what-is-a-schedule-to-close-timeout", "explanation"],
]}
/>

### `ScheduleToStartTimeout`

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

<RelatedReadList
readlist={[
["What is a Schedule-To-Start Timeout?", "/docs/content/what-is-a-schedule-to-start-timeout", "explanation"],
]}
/>

### `StartToCloseTimeout`

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

<RelatedReadList
readlist={[
["What is a Start-To-Close Timeout?", "/docs/content/what-is-a-start-to-close-timeout", "explanation"],
]}
/>

### `HeartbeatTimeout`

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

<RelatedReadList
readlist={[
["What is a Heartbeat Timeout?", "/docs/content/what-is-a-heartbeat-timeout", "explanation"],
]}
/>

### `WaitForCancellation`

If `true` the Activity Execution will finish executing should there be a Cancellation request.

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

Activity Executions have a default Retry Policy.
Providing one here is a customization, and overwrites the default.

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

<RelatedReadList
readlist={[
["What is a Retry Policy?", "/docs/content/what-is-a-retry-policy", "explanation"],
]}
/>
