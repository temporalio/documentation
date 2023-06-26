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

The `response` returned by the Query needs to be decoded into a `result` string.
Since this is a future, use `Get()` on the `response` to get a readable string.

```go
var result string
if err != response.Get(&result); err != nil {
  // ...
}
log.Println("Received Query result. Result: " + result)
```
