---
id: how-to-set-a-workflow-task-queue-in-go
title: How to set the Task Queue for Workflow Execution in Go
sidebar_label: Task Queue
description: Create an instance of `StartWorkflowOptions` from the `go.temporal.io/sdk/client` package, set the `TaskQueue` field, and pass the instance to the `ExecuteWorkflow` call.
tags:
  - go
  - how-to
---

Create an instance of [`StartWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk@v1.10.0/client#StartWorkflowOptions) from the `go.temporal.io/sdk/client` package, set the `TaskQueue` field, and pass the instance to the `ExecuteWorkflow` call.

- Type: `string`
- Default: None, this is a required field to be set by the developer

```go
workflowOptions := client.StartWorkflowOptions{
  // ...
  TaskQueue: "your-task-queue",
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```
