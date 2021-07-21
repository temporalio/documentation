---
id: activity-executions
title: How to invoke an Activity Execution in Go?
sidebar_label: Activity Executions
---

import RelatedRead from '../shared/RelatedRead.js'

To invoke an Activity Execution, use the [`ExecuteActivity()`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/workflow#ExecuteActivity) API call available from the [`go.temporal.io/sdk/workflow`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/workflow) package.

The `ExecuteActivity()` API call requires an instance of `workflow.Context`, the Activity function name, and any variables to be passed to the Activity Execution.

```go
import (
  // ...

  "go.temporal.io/sdk/workflow"
)

func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
  // ...
  yourActivityParam := YourActivityParam{
    // ...
  }
  future := workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam)
  // ...
}

func (a *YourActivityStruct) YourActivityDefinition(ctx context.Context, param YourActivityParam) error {
  // ...
}
```

The Activity function name can be provided as a variable object (no quotations) or as a string.

```go
// ...
  future := workflow.ExecuteActivity(ctx, "YourActivityDefinition", yourActivityParam)
// ...
```

The benefit of passing the actual function object is that the framework can validate the parameters against the Activity Definition.

### How to get the result of an Activity Execution in Go

The `ExecuteActivity` API call returns an instance of [`workflow.Future`](https://pkg.go.dev/go.temporal.io/sdk/workflow#Futures) which has the following two methods:

- `Get()`: Takes an instance of the `workflow.Context`, that was passed to the Activity Execution, and a pointer as parameters.
  The variable associated with the pointer is populated with the Activity Execution result.
  This call blocks until the result is available.
- `IsReady()`: Returns `true` when the result of the Activity Execution is ready.

Call the `Get()` method on the instance of `workflow.Future` to get the result of the Activity Execution.
  The type of the result parameter must match the type of the return value declared by the Activity function.

```go
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
  // ...
  future := workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam)
  var yourActivityResult YourActivityResult
  if err := future.Get(ctx, &yourActivityResult); err != nil {
    // ...
  }
  // ...
}
```

Use the `IsReady()` method to determine if result is ready prior to calling `Get()`.

```go
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
  // ...
  future := workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam)
  // ...
  if(future.IsReady()) {
    var yourActivityResult YourActivityResult
    if err := future.Get(ctx, &yourActivityResult); err != nil {
      // ...
    }
  }
  // ...
}
```

It is idiomatic to invoke multiple Activity Executions from within a Workflow.
  Therefore it is also idiomatic to either block on the results of any of the Activity Executions or continue on to execute additional logic, checking for the Activity Execution results at a later time.

<RelatedRead
text="How to implement Selectors for complex wait conditions"
goTo="#"
tagChar="g"
/>
