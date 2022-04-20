---
id: how-to-send-a-query-to-a-workflow-execution-in-go
title: How to send a Query to a Workflow Execution in Go
sidebar_label: Sending Queries
description: Use the `QueryWorkflow()` API to send a Query to a Workflow in Go.
tags:
  - go
  - developer-guide
---

You can send a Query from your Go code using the `QueryWorkflow()` API as shown below.

```go
queryType := "current_state"
response, err := temporalClient.QueryWorkflow(context.Background(), workflowID, runID, queryType)
if err != nil {
    fmt.Println("Error querying workflow: " + err.Error())
    return
}
fmt.Printf("Response: %v\n", response)
```

You can pass an arbitrary number of arguments to the `QueryWorkflow()` function.
For example, suppose your query handler function takes 2 parameters:

```go
err := workflow.SetQueryHandler(ctx, "current_state", func(prefix string, suffix string) (string, error) {
    return prefix + currentState + suffix, nil
})
```

You can pass `prefix` and `suffix` arguments to the `QueryWorkflow()` as shown below:

```go
response, err := temporalClient.QueryWorkflow(context.Background(), workflowID, runID, queryType, "foo", "baz")
if err != nil {
    fmt.Println("Error querying workflow: " + err.Error())
    return
}
fmt.Printf("Response: %v\n", response) // "foo" + currentState + "baz"
```

#### `QueryWorkflowWithOptions()` API

The `QueryWorkflowWithOptions()` function is an alternative way to send a Query to a Workflow that has a few extra configuration options.

```go
import (
    "context"
    "fmt"
    enumspb "go.temporal.io/api/enums/v1"
    "go.temporal.io/sdk/client"
)
// ...
// https://golang.org/doc/faq#convert_slice_of_interface
_args := [...]string{"foo"}
args := make([]interface{}, len(_args))
for i, v := range _args {
    args[i] = v
}
response, err := temporalClient.QueryWorkflowWithOptions(context.Background(), &client.QueryWorkflowWithOptionsRequest{
    WorkflowID: workflowID,
    RunID: runID,
    QueryType: queryType,
    // Positional arguments as a []interface{}
    Args: args,
    // QueryRejectCondition is an optional field used to reject queries based on workflow state.
    // QUERY_REJECT_CONDITION_NONE indicates that query should not be rejected.
    // QUERY_REJECT_CONDITION_NOT_OPEN indicates that query should be rejected if workflow is not open.
    // QUERY_REJECT_CONDITION_NOT_COMPLETED_CLEANLY indicates that query should be rejected if workflow did not complete cleanly (e.g. terminated, canceled timeout etc...).
    QueryRejectCondition: enumspb.QUERY_REJECT_CONDITION_NONE,
})
if err != nil {
    fmt.Println("Error querying workflow: " + err.Error())
    return err
}
```

Consistency level example:

```go
resp, err := temporalClient.QueryWorkflowWithOptions(ctx, &client.QueryWorkflowWithOptionsRequest{
    WorkflowID:            workflowID,
    RunID:                 runID,
    QueryType:             queryType,
    QueryConsistencyLevel: shared.QueryConsistencyLevelStrong.Ptr(),
})
```
