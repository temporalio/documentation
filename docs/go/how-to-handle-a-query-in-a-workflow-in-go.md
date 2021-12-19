---
id: how-to-handle-a-query-in-a-workflow-in-go
title: How to handle a Query in a Workflow in Go
sidebar_label: Handling Queries
---

You can add custom query types to handle queries such as querying the current state of a Workflow, or querying how many Activities the Workflow has completed. To do this, you need to set
up a query handler using `workflow.SetQueryHandler`.

The handler must be a function that returns two values:

1. A serializable result
2. An error

The handler function can receive any number of input parameters, but all input parameters must be
serializable. The following sample code sets up a query handler that handles the query type of
`current_state`:

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

You can now query `current_state` by using the CLI:

`tctl --namespace samples-namespace workflow query -w my_workflow_id -r my_run_id -qt current_state`
