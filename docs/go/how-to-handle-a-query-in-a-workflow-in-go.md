---
id: how-to-handle-a-query-in-a-workflow-in-go
title: How to handle a Query in a Workflow in Go
sidebar_label: Handling Queries
description: Use the `SetQueryHandler` API to set a Query Handler that listens for a Query by name.
tags:
  - go
  - how-to
---

Use the `SetQueryHandler` API from the `go.temporal.io/sdk/workflow` package to set a Query Handler that listens for a Query by name.

The handler must be a function that returns two values:

1. A serializable result
2. An error

The handler function can receive any number of input parameters, but all input parameters must be serializable.
The following sample code sets up a Query Handler that handles the `current_state` Query type:

```go
func MyWorkflow(ctx workflow.Context, input string) error {
  currentState := "started" // This could be any serializable struct.
  queryType := "current_state"
  err := workflow.SetQueryHandler(ctx, queryType, func() (string, error) {
    return currentState, nil
  })
  if err != nil {
    currentState = "failed to register query handler"
    return err
  }
  // Your normal Workflow code begins here, and you update the currentState as the code makes progress.
  currentState = "waiting timer"
  err = NewTimer(ctx, time.Hour).Get(ctx, nil)
  if err != nil {
    currentState = "timer failed"
    return err
  }
  currentState = "waiting activity"
  ctx = WithActivityOptions(ctx, myActivityOptions)
  err = ExecuteActivity(ctx, MyActivity, "my_input").Get(ctx, nil)
  if err != nil {
    currentState = "activity failed"
    return err
  }
  currentState = "done"
  return nil
}
```

For example, suppose your query handler function takes two parameters:

```go
err := workflow.SetQueryHandler(ctx, "current_state", func(prefix string, suffix string) (string, error) {
    return prefix + currentState + suffix, nil
})
```
