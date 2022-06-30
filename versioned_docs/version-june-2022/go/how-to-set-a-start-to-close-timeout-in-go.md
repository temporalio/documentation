---
id: how-to-set-a-start-to-close-timeout-in-go
title: How to set a Start-To-Close Timeout in Go
sidebar_label: Start-To-Close Timeout
description: Create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the `StartToCloseTimeout` field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.
tags:
  - go
  - how-to
---

To set a [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout), create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the `StartToCloseTimeout` field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.

This or `ScheduleToClose` must be set.

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
