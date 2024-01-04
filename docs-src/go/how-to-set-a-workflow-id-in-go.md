---
id: how-to-set-a-workflow-id-in-go
title: How to set a custom Workflow Id in Go
sidebar_label: Workflow Id
description: Create an instance of `StartWorkflowOptions` from the `go.temporal.io/sdk/client` package, set the `ID` field, and pass the instance to the `ExecuteWorkflow` call.
tags:
  - go sdk
  - how-to-doc-type
  - developer-guide-doc-type
  - workflow id
  - workflow options
  - workflows
---

Although it is not required, we recommend providing your own [Workflow Id](/concepts/what-is-a-workflow-id) that maps to a business process or business entity identifier, such as an order identifier or customer identifier.

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
