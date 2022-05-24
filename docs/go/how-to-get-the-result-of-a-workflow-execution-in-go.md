---
id: how-to-get-the-result-of-a-workflow-execution-in-go
title: How to get the result of a Workflow Execution in Go
sidebar_label: Workflow Execution result
description: Use the Future returned by `ExecuteWorkflow` API call to retrieve the result.
tags:
  - developer-guide
  - go
---

The `ExecuteWorkflow` call returns an instance of [`WorkflowRun`](https://pkg.go.dev/go.temporal.io/sdk/client#WorkflowRun), which is the `workflowRun` variable in the following line.

```go
  workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, app.YourWorkflowDefinition, param)
  if err != nil {
    // ...
  }
  // ...
}
```

The instance of `WorkflowRun` has the following three methods:

- `GetWorkflowID()`: Returns the Workflow Id of the invoked Workflow Execution.
- `GetRunID()`: Always returns the Run Id of the initial Run (See [Continue As New](#)) in the series of Runs that make up the full Workflow Execution.
- `Get`: Takes a pointer as a parameter and populates the associated variable with the Workflow Execution result.

To wait on the result of Workflow Execution in the same process that invoked it, call `Get()` on the instance of `WorkflowRun` that is returned by the `ExecuteWorkflow()` call.

```go
  workflowRun, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition, param)
  if err != nil {
    // ...
  }
  var result YourWorkflowResponse
  err = workflowRun.Get(context.Background(), &result)
  if err != nil {
      // ...
  }
  // ...
}
```

However, the result of a Workflow Execution can be obtained from a completely different process.
All that is needed is the [Workflow Id](#).
(A [Run Id](#) is optional if more than one closed Workflow Execution has the same Workflow Id.)
The result of the Workflow Execution is available for as long as the Workflow Execution Event History remains in the system.

<!-- TODO (See [How long do Workflow Execution Histories persist](#)). -->

Call the `GetWorkflow()` method on the an instance of the Go SDK Client and pass it the Workflow Id used to spawn the Workflow Execution.
Then call the `Get()` method on the instance of `WorkflowRun` that is returned, passing it a pointer to populate the result.

```go
  // ...
  workflowID := "Your-Custom-Workflow-Id"
  workflowRun := c.GetWorkflow(context.Background, workflowID)

  var result YourWorkflowResponse
  err = workflowRun.Get(context.Background(), &result)
  if err != nil {
      // ...
  }
  // ...
```

#### Get last completion result

In the case of a [Temporal Cron Job](/concepts/what-is-a-temporal-cron-job), you might need to get the result of the previous Workflow Run and use it in the current Workflow Run.

To do this, use the [`HasLastCompletionResult`](https://pkg.go.dev/go.temporal.io/sdk/workflow#HasLastCompletionResult) and [`GetLastCompletionResult`](https://pkg.go.dev/go.temporal.io/sdk/workflow#GetLastCompletionResult) APIs, available from the [`go.temporal.io/sdk/workflow`](https://pkg.go.dev/go.temporal.io/sdk/workflow) package, directly in your Workflow code.

```go
type CronResult struct {
  Count int
}

func YourCronWorkflowDefinition(ctx workflow.Context) (CronResult, error) {
  count := 1

  if workflow.HasLastCompletionResult(ctx) {
    var lastResult CronResult
    if err := workflow.GetLastCompletionResult(ctx, &lastResult); err == nil {
      count = count + lastResult.Count
    }
  }

  newResult := CronResult {
    Count: count,
  }
  return newResult, nil
}
```

This will work even if one of the cron Workflow Runs fails.
The next Workflow Run gets the result of the last successfully Completed Workflow Run.
