---
id: how-to-set-an-activity-retry-policy-in-go
title: How to set an Activity Retry Policy in Go
sidebar_label: Retry Policy
description: Create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the `RetryPolicy` field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.
tags:
  - go
  - how-to
---

To set a [RetryPolicy](/concepts/what-is-a-retry-policy), Create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the `RetryPolicy` field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.

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
