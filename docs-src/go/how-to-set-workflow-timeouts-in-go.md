---
id: how-to-set-workflow-timeouts-in-go
title: How to set Workflow Timeouts in Go
sidebar_label: Workflow Timeouts
description: Create an instance of StartWorkflowOptions.
tags:
  - go
  - how-to
---

Create an instance of [`StartWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk/client#StartWorkflowOptions) from the `go.temporal.io/sdk/client` package, set a timeout, and pass the instance to the `ExecuteWorkflow` call.

Available timeouts are:

- `WorkflowExecutionTimeout`
- `WorkflowRunTimeout`
- `WorkflowTaskTimeout`

```go
workflowOptions := client.StartWorkflowOptions{
  // ...
  // Set Workflow Timeout duration
  WorkflowExecutionTimeout: time.Hours * 24 * 365 * 10,
  // WorkflowRunTimeout: time.Hours * 24 * 365 * 10,
  // WorkflowTaskTimeout: time.Second * 10,
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```
