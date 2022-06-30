---
id: how-to-set-a-workflow-id-in-go
title: How to set a custom Workflow Id in Go
sidebar_label: Workflow Id
description: Create an instance of `StartWorkflowOptions` from the `go.temporal.io/sdk/client` package, set the `ID` field, and pass the instance to the `ExecuteWorkflow` call.
tags:
  - go
  - how-to
---

Create an instance of [`StartWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk@v1.10.0/client#StartWorkflowOptions) from the `go.temporal.io/sdk/client` package, set the `ID` field, and pass the instance to the `ExecuteWorkflow` call.

- Type: `string`
- Default: System generated UUID

```go
workflowOptions := client.StartWorkflowOptions{
  // ...
  ID: "Your-Custom-Workflow-Id",
  // ...
}
workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition)
if err != nil {
  // ...
}
```
