---
id: how-to-set-a-workflow-task-timeout-in-go
title: How to set a Workflow Task Timeout in Go
sidebar_label: Workflow Task Timeout
description: Create an instance of `StartWorkflowOptions` from the `go.temporal.io/sdk/client` package, set the `WorkflowTaskTimeout` field, and pass the instance to the `ExecuteWorkflow` call.
tags:
  - go
  - how-to
---

Create an instance of [`StartWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk/client#StartWorkflowOptions) from the `go.temporal.io/sdk/client` package, set the `WorkflowTaskTimeout` field, and pass the instance to the `ExecuteWorkflow` call.

- Type: `time.Duration`
- Default: `time.Seconds * 10`

```go
workflowOptions := client.StartWorkflowOptions{
  WorkflowTaskTimeout: time.Second * 10,
  //...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```
