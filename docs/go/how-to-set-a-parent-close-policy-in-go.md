---
id: how-to-set-a-parent-close-policy-in-go
title: How to set a Parent Close Policy in Go
sidebar_label: Parent Close Policy
description: Create an instance of `ChildWorkflowOptions` from the `go.temporal.io/sdk/workflow` package, set the `ParentClosePolicy` field, apply the options to the instance of `workflow.Context`, and pass the context to the `ExecuteChildWorkflow` call.
tags:
  - go
  - how-to
---

In Go, a Parent Close Policy is set on the `ParentClosePolicy` field of an instance of [`workflow.ChildWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ChildWorkflowOptions).
The possible values can be obtained from the [`go.temporal.io/api/enums/v1`](https://pkg.go.dev/go.temporal.io/api/enums/v1#ParentClosePolicy) package.

- `PARENT_CLOSE_POLICY_ABANDON`
- `PARENT_CLOSE_POLICY_TERMINATE`
- `PARENT_CLOSE_POLICY_REQUEST_CANCEL`

The Child Workflow Options are then applied to the the instance of `workflow.Context` by using the `WithChildOptions` API, which is then passed to the `ExecuteChildWorkflow()` call.

- Type: [`ParentClosePolicy`](https://pkg.go.dev/go.temporal.io/api/enums/v1#ParentClosePolicy)
- Default: `PARENT_CLOSE_POLICY_ABANDON`

```go
import (
  // ...
  "go.temporal.io/api/enums/v1"
)

func YourWorkflowDefinition(ctx workflow.Context, params ParentParams) (ParentResp, error) {
  // ...
  childWorkflowOptions := workflow.ChildWorkflowOptions{
    // ...
    ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
  }
  ctx = workflow.WithChildOptions(ctx, childWorkflowOptions)
  childWorkflowFuture := workflow.ExecuteChildWorkflow(ctx, YourOtherWorkflowDefinition, ChildParams{})
  // ...
}

func YourOtherWorkflowDefinition(ctx workflow.Context, params ChildParams) (ChildResp, error) {
  // ...
  return resp, nil
}
```
