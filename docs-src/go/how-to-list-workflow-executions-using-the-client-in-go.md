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

The `ListWorkflow()` function retrieves [Workflow Executions](/concepts/what-is-a-workflow-execution) based on a [Query](/concepts/what-is-a-query) or [List Filter](/concepts/what-is-a-list-filter).

Use a Query to retrieve Workflow Executions based on state characteristics.
Queries include one or more conditions to return Workflow Executions with relevant [Workflow Ids](/concepts/what-is-a-workflow-id), [Workflow Types](/concepts/what-is-a-workflow-type), or start and end times.

Use a List Filter to retrieve Workflow Executions that contain certain [Search Attribute](/concepts/what-is-a-search-attribute) characteristics, such as name, values, and operators.
List Filters return a list of valid Workflow Executions from the Visibility store.

To list all Workflow Executions, use [`ListWorkflow`](https://pkg.go.dev/go.temporal.io/sdk/client#Client.ListWorkflow) on the [Temporal Client](/concepts/what-is-a-temporal-client).

```go
resp, err := temporalClient.ListWorkflow(ctx.Background(), req)
if err != nil {
  return err
}

fmt.Println("First page of results:")
for _, exec := range resp.Executions {
  fmt.Println("Workflow ID %v\n", exec.Execution.WorkflowId)
  fmt.Println("Next page of results:")
}
```
