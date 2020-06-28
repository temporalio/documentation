---
id: go-queries
title: Queries
---

If a workflow execution has been stuck at a state for longer than an expected period of time, you
might want to query the current call stack. You can use the Temporal CLI to perform this query. For
example:

`tctl --namespace samples-namespace workflow query -w my_workflow_id -r my_run_id -qt __stack_trace`

This command uses `__stack_trace`, which is a built-in query type supported by the Temporal client
library. You can add custom query types to handle queries such as querying the current state of a
workflow, or querying how many activities the workflow has completed. To do this, you need to set
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
  err := workflow.SetQueryHandler(ctx, "current_state", func() (string, error) {
    return currentState, nil
  })
  if err != nil {
    currentState = "failed to register query handler"
    return err
  }
  // Your normal workflow code begins here, and you update the currentState as the code makes progress.
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

You can also issue a query from code using the `QueryWorkflow()` API on a Temporal client object.

## Consistent Query

Query has two consistency levels, eventual and strong. Consider if you were to signal a workflow and then
immediately query the workflow:

`tctl --namespace samples-namespace workflow signal -w my_workflow_id -r my_run_id -n signal_name -if ./input.json`

`tctl --namespace samples-namespace workflow query -w my_workflow_id -r my_run_id -qt current_state`

In this example if signal were to change workflow state, query may or may not see that state update reflected
in the query result. This is what it means for query to be eventually consistent.

Query has another consistency level called strong consistency. A strongly consistent query is guaranteed
to be based on workflow state which includes all events that came before the query was issued. An event
is considered to have come before a query if the call creating the external event returned success before
the query was issued. External events which are created while the query is outstanding may or may not 
be reflected in the workflow state the query result is based on.

In order to run consistent query through the cli do the following:

`tctl --namespace samples-namespace workflow query -w my_workflow_id -r my_run_id -qt current_state --qcl strong`

In order to run a query using the go client do the following:

```go
resp, err := client.QueryWorkflowWithOptions(ctx, &client.QueryWorkflowWithOptionsRequest{
        WorkflowId:            workflowId,
        RunId:                 runId,
        QueryType:             queryType,
        QueryConsistencyLevel: shared.QueryConsistencyLevelStrong.Ptr(),
})
```

When using strongly consistent query you should expect higher latency than eventually consistent query.
