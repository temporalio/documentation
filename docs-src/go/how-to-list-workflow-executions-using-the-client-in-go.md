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

The [`ListWorkflow()`](https://pkg.go.dev/go.temporal.io/sdk/client#Client.ListWorkflow) function retrieves a list of [Workflow Executions](/concepts/what-is-a-workflow-execution) that match the [Search Attributes](/concepts/what-is-a-search-attribute) of a given [List Filter](/concepts/what-is-a-list-filter).
The metadata returned from the [Visibility store](/concepts/what-is-visibility) can be used to get a Workflow Execution's history and details from the [Persistence store](/concepts/what-is-a-temporal-cluster#persistence).

Use a List Filter to define a `request` to pass into `ListWorkflow()`.

```go
request := &workflowservice.ListWorkflowExecutionsRequest{ Query: "CloseTime = missing" }
```

This `request` value returns only open Workflows.
For more List Filter examples, see the [examples provided for List Filters in the Temporal Visibility guide.](/concepts/what-is-a-list-filter#list-filter-examples)

```go
resp, err := temporalClient.ListWorkflow(ctx.Background(), request)
if err != nil {
  return err
}

fmt.Println("First page of results:")
for _, exec := range resp.Executions {
  fmt.Printf("Workflow ID %v\n", exec.Execution.WorkflowId)
}
```
