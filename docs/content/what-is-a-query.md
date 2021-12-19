---
id: what-is-a-query
title: What is a Query?
description: A Query is a synchronous operation that is used to report the state of a Workflow.
---

From the caller's point of view, a Query is a synchronous operation that is used to report the state of a [Workflow](#workflow).

- Query logic is implemented as code within a [Workflow](#workflow).
- A Query is inherently read-only and cannot affect a [Workflow](#workflow) state.

### Query Type

#### `__stack_trace`

`__stack_trace` is a built in Query Type that provides the current call stack for the Workflow Execution.

It is useful to gain visibility into the state of the Workflow Execution, if the Workflow Execution has not shown progression in some time.

- [How to Query a Workflow Execution using `tctl`](/docs/reference/tctl/workflow/query)

### Consistent Query

Query has two consistency levels, eventual and strong. Consider if you were to signal a Workflow and then
immediately query the Workflow:

`tctl --namespace samples-namespace workflow signal -w my_workflow_id -r my_run_id -n signal_name -if ./input.json`

`tctl --namespace samples-namespace workflow query -w my_workflow_id -r my_run_id -qt current_state`

In this example if signal were to change Workflow state, query may or may not see that state update reflected
in the query result. This is what it means for query to be eventually consistent.

Query has another consistency level called strong consistency. A strongly consistent query is guaranteed
to be based on Workflow state which includes all events that came before the query was issued. An event
is considered to have come before a query if the call creating the external event returned success before
the query was issued. External events which are created while the query is outstanding may or may not
be reflected in the Workflow state the query result is based on.

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
