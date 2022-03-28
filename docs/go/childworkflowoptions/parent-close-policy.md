In Go, a Parent Close Policy is set on the `ParentClosePolicy` field of an instance of [`workflow.ChildWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ChildWorkflowOptions).

- Type: [`ParentClosePolicy`](https://pkg.go.dev/go.temporal.io/api/enums/v1#ParentClosePolicy)
- Default: `PARENT_CLOSE_POLICY_ABANDON`

Possible values:

- `PARENT_CLOSE_POLICY_ABANDON`
- `PARENT_CLOSE_POLICY_TERMINATE`
- `PARENT_CLOSE_POLICY_REQUEST_CANCEL`

```go
import (
  // ...
  "go.temporal.io/api/enums/v1"
)

func YourWorkflowDefinition(ctx workflow.Context, params ParentParams) (ParentResp, error) {
  // ...
  childWorkflowOptions := workflow.ChildWorkflowOptions{
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
