---
id: what-is-a-parent-close-policy
title: What is a Parent Close Policy
description: todo
tags:
  - explanation
---

If a Workflow Execution is a Child Workflow Execution, a Parent Close Policy determines what happens to the Workflow Execution should its Parent Workflow Execution change to a Closed status (stop execution).

If the Workflow Execution is not a Child Workflow Execution, a Parent Close Policy has no effect on the execution.

A Parent Close Policy has three possible values:

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
