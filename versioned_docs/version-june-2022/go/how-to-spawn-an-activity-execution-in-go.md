---
id: how-to-spawn-an-activity-execution-in-go
title: How to spawn an Activity Execution in Go
sidebar_label: Activity Execution
description: Use the `ExecuteActivity()` API call available from the `go.temporal.io/sdk/workflow` package.
tags:
  - developer-guide
  - go
---

To spawn an [Activity Execution](/concepts/what-is-an-activity-execution), use the [`ExecuteActivity()`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/workflow#ExecuteActivity) API call inside your Workflow Definition.
The API is available from the [`go.temporal.io/sdk/workflow`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/workflow) package.

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
  var activities *YourActivityStruct
  future := workflow.ExecuteActivity(ctx, activities.YourActivityDefinition, yourActivityParam)
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

The `ExecuteActivity` call returns a Future, which can be used to get the result of the Activity Execution.
