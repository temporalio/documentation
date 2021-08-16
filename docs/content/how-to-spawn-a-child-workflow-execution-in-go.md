---
id: how-to-spawn-a-child-workflow-execution-in-go
title: How to spawn a Child Workflow Execution in Go
tags:
  - developer-guide
  - go
---

The [Application operations guide](#) goes into more detail on when and why to use a Child Workflow.

In Go, you must use the `workflow.ExecuteChildWorkflow` API and pass it `workflow.Context`, `workflow.ChildWorkflowOptions`, the Workflow Type, and any parameters that should be passed to the Child Workflow Execution.

`workflow.ChildWorkflowOptions` contain the same fields as "normal" [Workflow Options](#what-are-workflow-execution-options).
These fields will automatically inherit their values from the Parent Workflow Options if not explicitly set.
If a custom `WorkflowID` is not set then one will be generated when it is invoked.

```go
func YourWorkflowDefinition(ctx workflow.Context, params ParentParams) (ParentResp, error) {

  childWorkflowOptions := workflow.ChildWorkflowOptions{}
  ctx = workflow.WithChildOptions(ctx, childWorkflowOptions)

  future := workflow.ExecuteChildWorkflow(ctx, YourOtherWorkflowDefinition, ChildParams{})
  // ...
  return resp, nil
}

func YourOtherWorkflowDefinition(ctx workflow.Context, params ChildParams) (ChildResp, error) {
  // ...
  return resp, nil
}
```

### How to set a Parent Close Policy

When creating a Child Workflow, you can define a `ParentClosePolicy` that terminates, cancels, or abandons the Workflow Execution if the child's parent stops execution.

- `ABANDON`: When the parent stops, don't do anything with the Child Workflow.
- `TERMINATE`: When the parent stops, terminate the Child Workflow
- `REQUEST_CANCEL`: When the parent stops, terminate the Child Workflow

You can set policies per child, which means you can opt out of propagating terminates / cancels on a per-child basis.
This is useful for starting Child Workflows asynchronously:

1. Set `ChildWorkflowOptions.ParentClosePolicy` to `ABANDON` when creating a Child Workflow.
2. Start the Child Workflow Execution asynchronously using `ExecuteChildWorkflow`.
3. Call `GetChildWorkflowExecution` on the `ChildWorkflowFuture` returned by the `ChildWorkflowFuture`
4. Wait for the `ChildWorkflowFuture`.
   This indicates that the child successfully started (or start failed).
5. Complete Parent Workflow Execution asynchronously.

Steps 3 and 4 are needed to ensure that a Child Workflow Execution starts before the parent closes.
If the parent initiates a Child Workflow Execution and then immediately completes, the child would never execute.

```go
func ParentWorkflow(ctx workflow.Context) error {
    childWorkflow := workflow.ExecuteChildWorkflow(ctx, MyChildWorkflow)
    // Wait for child to start
    _ = childWorkflow.GetChildWorkflowExecution().Get(ctx, nil)
    return nil
}
```
