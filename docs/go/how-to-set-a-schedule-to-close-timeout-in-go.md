---
id: how-to-set-a-schedule-to-close-timeout-in-go
title: How to set a Schedule-To-Close Timeout in Go
sidebar_label: Schedule-To-Close Timeout
description: Create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the `ScheduleToCloseTimeout` field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.
tags:
  - go
  - how-to
---

To set a [Schedule-To-Close Timeout](/concepts/what-is-a-schedule-to-close-timeout), create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the `ScheduleToCloseTimeout` field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.

This or `ScheduleToStart` must be set.

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
