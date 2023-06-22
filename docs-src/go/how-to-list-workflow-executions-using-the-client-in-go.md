---
id: how-to-list-workflow-executions-using-the-client-in-go
title: How to list Workflow Executions using the Client in Go
sidebar_label: List Workflow Executions using the Client
description: List Workflow Executions using the Client
tags:
  - developer-guide
  - go
  - client
---

The `ListWorkflow()` function retrieves [Workflow Executions](/concepts/what-is-a-workflow-execution) that match the properties specified in a [List Filter](/concepts/what-is-a-list-filter).
These properties are defined by [Search Attributes](/concepts/what-is-a-search-attribute), which are used to retrieve Workflow Executions from the [Visibility store](/concepts/what-is-visibility).

Use a List Filter to define a `request` to pass into `ListWorkflow()`.

```go
// ...
request := "CloseTime = missing"
```

This `request` value will only return open Workflows.
To list all Workflow Executions that satisfy this List Filter, use [`ListWorkflow()`](https://pkg.go.dev/go.temporal.io/sdk/client#Client.ListWorkflow) on the [Temporal Client](/concepts/what-is-a-temporal-client).

```go
// ...

resp, err := temporalClient.ListWorkflow(ctx.Background(), request)
if err != nil {
  return err
}

fmt.Println("List of results:")
for _, exec := range resp.Executions {
  fmt.Println("Workflow ID %v\n", exec.Execution.WorkflowId)
}

//...
```
