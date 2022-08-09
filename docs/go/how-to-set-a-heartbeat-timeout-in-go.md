---
id: how-to-set-a-heartbeat-timeout-in-go
title: How to set a Heartbeat Timeout in Go
sidebar_label: Retry Policy
description: Create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the `HeartbeatTimeout` field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.
tags:
  - go
  - how-to
---

To set a [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout), Create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the `RetryPolicy` field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.

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
