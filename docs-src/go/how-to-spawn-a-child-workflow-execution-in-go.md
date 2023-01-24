---
id: how-to-spawn-a-child-workflow-execution-in-go
title: How to spawn a Child Workflow Execution in Go
sidebar_label: Child Workflow Execution
description: Use the `ExecuteChildWorkflow`, available from the `go.temporal.io/sdk/workflow` package, to spawn a Child Workflow Execution in Go.
tags:
  - developer-guide
  - go
---

To spawn a [Child Workflow Execution](/concepts/what-is-a-child-workflow-execution) in Go, use the [`ExecuteChildWorkflow`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ExecuteChildWorkflow) API, which is available from the `go.temporal.io/sdk/workflow` package.

The `ExecuteChildWorkflow` call requires an instance of [`workflow.Context`](https://pkg.go.dev/go.temporal.io/sdk/workflow#Context), with an instance of [`workflow.ChildWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ChildWorkflowOptions) applied to it, the Workflow Type, and any parameters that should be passed to the Child Workflow Execution.

`workflow.ChildWorkflowOptions` contain the same fields as `client.StartWorkflowOptions`.
Workflow Option fields automatically inherit their values from the Parent Workflow Options if they are not explicitly set.
If a custom `WorkflowID` is not set, one is generated when the Child Workflow Execution is spawned.
Use the [`WithChildOptions`](https://pkg.go.dev/go.temporal.io/sdk/workflow#WithChildOptions) API to apply Child Workflow Options to the instance of `workflow.Context`.

The `ExecuteChildWorkflow` call returns an instance of a [`ChildWorkflowFuture`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ChildWorkflowFuture).

Call the `.Get()` method on the instance of `ChildWorkflowFuture` to wait for the result.

```go
func YourWorkflowDefinition(ctx workflow.Context, params ParentParams) (ParentResp, error) {

  childWorkflowOptions := workflow.ChildWorkflowOptions{}
  ctx = workflow.WithChildOptions(ctx, childWorkflowOptions)

  var result ChildResp
  err := workflow.ExecuteChildWorkflow(ctx, YourOtherWorkflowDefinition, ChildParams{}).Get(ctx, &result)
  if err != nil {
    // ...
  }
  // ...
  return resp, nil
}

func YourOtherWorkflowDefinition(ctx workflow.Context, params ChildParams) (ChildResp, error) {
  // ...
  return resp, nil
}
```

To asynchronously spawn a Child Workflow Execution, the Child Workflow must have an "Abandon" Parent Close Policy set in the Child Workflow Options.
Additionally, the Parent Workflow Execution must wait for the `ChildWorkflowExecutionStarted` Event to appear in its Event History before it completes.

If the Parent makes the `ExecuteChildWorkflow` call and then immediately completes, the Child Workflow Execution does not spawn.

To be sure that the Child Workflow Execution has started, first call the `GetChildWorkflowExecution` method on the instance of the `ChildWorkflowFuture`, which will return a different Future.
Then call the `Get()` method on that Future, which is what will wait until the Child Workflow Execution has spawned.

```go
import (
  // ...
  "go.temporal.io/api/enums/v1"
)

func YourWorkflowDefinition(ctx workflow.Context, params ParentParams) (ParentResp, error) {

  childWorkflowOptions := workflow.ChildWorkflowOptions{
    ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
  }
  ctx = workflow.WithChildOptions(ctx, childWorkflowOptions)

  childWorkflowFuture := workflow.ExecuteChildWorkflow(ctx, YourOtherWorkflowDefinition, ChildParams{})
  // Wait for the Child Workflow Execution to spawn
  var childWE workflow.Execution
  if err := childWorkflowFuture.GetChildWorkflowExecution().Get(ctx, &childWE); err != nil {
     return err
  }
  // ...
  return resp, nil
}

func YourOtherWorkflowDefinition(ctx workflow.Context, params ChildParams) (ChildResp, error) {
  // ...
  return resp, nil
}
```
