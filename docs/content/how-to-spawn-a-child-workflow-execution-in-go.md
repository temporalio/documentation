---
id: how-to-spawn-a-child-workflow-execution-in-go
title: How to spawn a Child Workflow Execution in Go
description: Use the `ExecuteChildWorkflow`, available from the `go.temporal.io/sdk/workflow` package, to spawn a Child Workflow Execution in Go.
tags:
  - developer-guide
  - go
---

import RelatedReadList from '../components/RelatedReadList.js'

Use the [`ExecuteChildWorkflow`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ExecuteChildWorkflow) API, available from the `go.temporal.io/sdk/workflow` package, to spawn a Child Workflow Execution in Go.

The `ExecuteChildWorkflow` call requires an instance of [`workflow.Context`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/workflow#Context), with an instance of [`workflow.ChildWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ChildWorkflowOptions) applied to it, the Workflow Type, and any parameters that should be passed to the Child Workflow Execution.

`workflow.ChildWorkflowOptions` contain the same fields as `client.StartWorkflowOptions`.
Workflow Option fields automatically inherit their values from the Parent Workflow Options if they are not explicitly set.
If a custom `WorkflowID` is not set then one will be generated when the Child Workflow Execution is spawned.

The `ExecuteChildWorkflow` call returns an instance of a [`ChildWorkflowFuture`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ChildWorkflowFuture).
Call the `GetChildWorkflowExecution` method on the instance of the `ChildWorkflowFuture` which blocks until the Child Workflow Execution has spawned and returns a Future that can be used to get the result of the Child Workflow Execution.
If the Parent makes the `ExecuteChildWorkflow` call and then immediately completes, the Child Workflow Execution will not spawn.

```go
func YourWorkflowDefinition(ctx workflow.Context, params ParentParams) (ParentResp, error) {

  childWorkflowOptions := workflow.ChildWorkflowOptions{}
  ctx = workflow.WithChildOptions(ctx, childWorkflowOptions)

  childWorkflowFuture := workflow.ExecuteChildWorkflow(ctx, YourOtherWorkflowDefinition, ChildParams{})
  future = childWorkflowFuture.GetChildWorkflowExecution().Get(ctx, nil)
  // ...
  return resp, nil
}

func YourOtherWorkflowDefinition(ctx workflow.Context, params ChildParams) (ChildResp, error) {
  // ...
  return resp, nil
}
```

<RelatedReadList
readliststring="What is a Child Workflow Execution?/docs/content/how-to-spawn-a-child-workflow-execution-in-go?e"
/>
