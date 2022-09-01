---
id: how-to-set-a-workflow-execution-timeout-in-go
title: How to set a Workflow Execution Timeout in Go
sidebar_label: Workflow Execution Timeout
description: Create an instance of `StartWorkflowOptions` from the `go.temporal.io/sdk/client` package, set the `WorkflowExecutionTimeout` field, and pass the instance to the `ExecuteWorkflow` call.
tags:
  - go
  - how-to
---

Create an instance of [`StartWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk/client#StartWorkflowOptions) from the `go.temporal.io/sdk/client` package, set the timeout and pass the instance to the `ExecuteWorkflow` call.

Available timeouts are:

- `WorkflowExecutionTimeout`
- `WorkflowRunTimeout`
- `WorkflowTaskTimeout`

```go
workflowOptions := client.StartWorkflowOptions{
  // ...
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
