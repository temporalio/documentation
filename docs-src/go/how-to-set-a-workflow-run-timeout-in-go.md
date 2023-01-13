---
id: how-to-set-a-workflow-run-timeout-in-go
title: How to set a Workflow Run Timeout in Go
sidebar_label: Workflow Run Timeout
description: Create an instance of `StartWorkflowOptions` from the `go.temporal.io/sdk/client` package, set the `WorkflowRunTimeout` field, and pass the instance to the `ExecuteWorkflow` call.
tags:
  - go
  - how-to
---

Create an instance of [`StartWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk/client#StartWorkflowOptions) from the `go.temporal.io/sdk/client` package, set the `WorkflowRunTimeout` field, and pass the instance to the `ExecuteWorkflow` call.

- Type: `time.Duration`
- Default: Same as [`WorkflowExecutionTimeout`](#workflowexecutiontimeout)

```go
workflowOptions := client.StartWorkflowOptions{
  WorkflowRunTimeout: time.Hours * 24 * 365 * 10,
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```
