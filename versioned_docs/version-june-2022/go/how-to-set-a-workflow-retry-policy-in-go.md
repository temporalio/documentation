---
id: how-to-set-a-workflow-retry-policy-in-go
title: How to set a Workflow Retry Policy in Go
sidebar_label: Workflow Retry Policy
description: Create an instance of `StartWorkflowOptions` from the `go.temporal.io/sdk/client` package, set the `RetryPolicy` field, and pass the instance to the `ExecuteWorkflow` call.
tags:
  - go
  - how-to
---

Create an instance of a [`RetryPolicy`](https://pkg.go.dev/go.temporal.io/sdk/temporal#RetryPolicy) from the `go.temporal.io/sdk/temporal` package and provide it as the value to the `RetryPolicy` field of the instance of `StartWorkflowOptions`.

- Type: [`RetryPolicy`](https://pkg.go.dev/go.temporal.io/sdk/temporal#RetryPolicy)
- Default: None

```go
retrypolicy := &temporal.RetryPolicy{
  InitialInterval:    time.Second,
  BackoffCoefficient: 2.0,
  MaximumInterval:    time.Second * 100,
}
workflowOptions := client.StartWorkflowOptions{
  RetryPolicy: retrypolicy,
  // ...
}
workflowRun, err := temporalClient.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```
