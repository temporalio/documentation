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

Several functions for listing [Workflow Executions](/concepts/what-is-a-workflow-execution) are available on the [Temporal Go SDK](https://pkg.go.dev/go.temporal.io/sdk).
Each function retrieves Workflow Executions according to a specified [Query](/concepts/what-is-a-query) or request filters.

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

To return a list of archived Workflow Executions, use `ListArchivedWorkflow()` on the Client.
Make sure that the Temporal Cluster or target [Namespace](/concepts/what-is-a-namespace) is configured for [Archival](/concepts/what-is-archival) before using this function.

```go
ctxWithTimeout, cancel := context.WithTimeout(context.Background(), time.Minute)

resp, err := temporalClient.ListArchivedWorkflow(ctxWithTimeout, sampleListRequest)
if err != nil {
  return err
}

fmt.Println("First page of results:")
for _, exec := range resp.Executions {
  fmt.Println("Workflow ID %v\n", exec.Execution.WorkflowId)
  fmt.Println("Next page of results:")
}
```

To view a list of currently open Workflows, use `ListOpenWorkflows()` on the Temporal Client.
Retrieved Workflow Executions are sorted by `StartTime` in descending order.

```go
resp, err := temporalClient.ListOpenWorkflows(context.Background(), sampleListRequest)
if err != nil {
  return err
}

fmt.Println("First page of results:")
for _, exec := range resp.Executions {
  fmt.Println("Workflow ID %v\n", exec.Execution.WorkflowId)
  fmt.Println("Next page of results:")
}
```

To return a list of closed Workflows, use `ListClosedWorkflow()` on the Temporal Client.
Retrieved Workflow Executions are sorted by `CloseTime` in descending order.

```go
resp, err := temporalClient.ListClosedWorkflow(context.Background(), sampleListRequest)
if err != nil {
  return err
}

fmt.Println("First page of results:")
for _, exec := range resp.Executions {
  fmt.Println("Workflow ID %v\n", exec.Execution.WorkflowId)
  fmt.Println("Next page of results:")
}
```
