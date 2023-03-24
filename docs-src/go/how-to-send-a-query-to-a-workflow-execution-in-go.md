---
id: how-to-send-a-query-to-a-workflow-execution-in-go
title: How to send a Query to a Workflow Execution in Go
sidebar_label: Sending Queries
description: Use the `QueryWorkflow()` API to send a Query to a Workflow in Go.
tags:
  - go
  - how-to
---

Use the `QueryWorkflow()` API or the `QueryWorkflowWithOptions` API on the Temporal Client to send a Query to a Workflow Execution.

```go
// ...
response, err := temporalClient.QueryWorkflow(context.Background(), workflowID, runID, queryType)
if err != nil {
  // ...
}
// ...
```

You can pass an arbitrary number of arguments to the `QueryWorkflow()` function.

```go
// ...
response, err := temporalClient.QueryWorkflow(context.Background(), workflowID, runID, queryType, "foo", "baz")
if err != nil {
  // ...
}
// ...
```

The `QueryWorkflowWithOptions()` API provides similar functionality, but with the ability to set additional configurations through [QueryWorkflowWithOptionsRequest](https://pkg.go.dev/go.temporal.io/sdk/client#QueryWorkflowWithOptionsRequest).
When using this API, you will also receive a structured response of type [QueryWorkflowWithOptionsResponse](https://pkg.go.dev/go.temporal.io/sdk/client#QueryWorkflowWithOptionsResponse).

```go
// ...
response, err := temporalClient.QueryWorkflowWithOptions(context.Background(), &client.QueryWorkflowWithOptionsRequest{
    WorkflowID: workflowID,
    RunID: runID,
    QueryType: queryType,
    Args: args,
})
if err != nil {
  // ...
}
```
