---
id: how-to-set-activity-timeouts-in-go
title: How to set Activity Timeouts in Go
sidebar_label: Activity Timeouts
description: Create an instance of StartWorkflowOptions.
tags:
  - go
  - how-to
---

To set an Activity Timeout in Go, create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the Activity Timeout field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.

Available timeouts are:

- `StartToCloseTimeout`
- `ScheduleToClose`
- `ScheduleToStartTimeout`

```go
activityoptions := workflow.ActivityOptions{
  // Set Activity Timeout duration
  ScheduleToCloseTimeout: 10 * time.Second,
  // StartToCloseTimeout: 10 * time.Second,
  // ScheduleToStartTimeout: 10 * time.Second,
}
ctx = workflow.WithActivityOptions(ctx, activityoptions)
var yourActivityResult YourActivityResult
err = workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam).Get(ctx, &yourActivityResult)
if err != nil {
  // ...
}
```
