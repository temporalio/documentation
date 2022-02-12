---
id: how-to-spawn-a-child-workflow-execution-in-go
title: How to spawn a Child Workflow Execution in Go
sidebar_label: Child Workflow Execution
description: Use the `ExecuteChildWorkflow`, available from the `go.temporal.io/sdk/workflow` package, to spawn a Child Workflow Execution in Go.
tags:
  - developer-guide
  - go
---

import RelatedReadList from '../components/RelatedReadList.js'

To spawn a Child Workflow Execution in Go, use the [`ExecuteChildWorkflow`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ExecuteChildWorkflow) API, which is available from the `go.temporal.io/sdk/workflow` package.

The `ExecuteChildWorkflow` call requires an instance of [`workflow.Context`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/workflow#Context), with an instance of [`workflow.ChildWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ChildWorkflowOptions) applied to it, the Workflow Type, and any parameters that should be passed to the Child Workflow Execution.

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

### Parent Close Policy

In Go, a Parent Close Policy is set on the `ParentClosePolicy` field of an instance of [`workflow.ChildWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ChildWorkflowOptions).
The possible values can be obtained from the [`go.temporal.io/api/enums/v1`](https://pkg.go.dev/go.temporal.io/api/enums/v1#ParentClosePolicy) package.

- `PARENT_CLOSE_POLICY_ABANDON`
- `PARENT_CLOSE_POLICY_TERMINATE`
- `PARENT_CLOSE_POLICY_REQUEST_CANCEL`

The Child Workflow Options are then applied to the the instance of `workflow.Context` by using the `WithChildOptions` API, which is then passed to the `ExecuteChildWorkflow()` call.

See the **Asynchronous execution** section below for an example.

<RelatedReadList
readlist={[
["What is a Parent Close Policy?","/docs/concepts/what-is-a-parent-close-policy","explanation"],  
]}
/>

### Asynchronous execution

To asynchronously spawn a Child Workflow Execution, the Child Workflow must have an "Abandon" Parent Close Policy set in the Child Workflow Options.
Additionally, the Parent Workflow Execution must wait for the "ChildWorkflowExecutionStarted" event to appear in its event history before it completes.

If the Parent makes the `ExecuteChildWorkflow` call and then immediately completes, the Child Workflow Execution will not spawn.

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
  var childWE WorkflowExecution
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

<RelatedReadList
readlist={[
["What is a Child Workflow Execution?","/docs/concepts/what-is-a-child-workflow-execution","explanation"],  
]}
/>
