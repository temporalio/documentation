---
id: how-to-set-a-parent-close-policy-in-go
title: How to set a Parent Close Policy in Go
description: todo
---

In Go, a Parent Close Policy is set on the `ParentClosePolicy` field of an instance of [`workflow.ChildWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ChildWorkflowOptions).

The possible values can be obtained from the [`go.temporal.io/api/enums/v1`](https://pkg.go.dev/go.temporal.io/api/enums/v1#ParentClosePolicy) package.

- `PARENT_CLOSE_POLICY_ABANDON`
- `PARENT_CLOSE_POLICY_TERMINATE`
- `PARENT_CLOSE_POLICY_REQUEST_CANCEL`

The Child Workflow Options are then applied to the the instance of `workflow.Context`, using the `WithChildOptions` API, which is then passed to the `ExecuteChildWorkflow()` call.

```go
import (
  // ...
  "go.temporal.io/api/enums/v1"
)

func YourWorkflowDefinition(ctx workflow.Context, params ParentParams) (ParentResp, error) {
  // ...
  childWorkflowOptions := workflow.ChildWorkflowOptions{
    ParentClosePolicy: enums.PARENT_CLOSE_POLICY_REQUEST_CANCEL,
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

<RelatedReadList
readlist={[
["What is a Parent Close Policy", "/docs/content/what-is-a-parent-close-policy", "explanation"],
["How to spawn a Child Workflow Execution in Go", "/docs/content/how-to-spawn-a-child-workflow-execution-in-go", "developer guide"],
]}
/>
