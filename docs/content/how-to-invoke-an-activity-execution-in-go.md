---
id: how-to-invoke-an-activity-execution-in-go
title: How to invoke an Activity Execution in Go
tags:
  - guide
---

import RelatedRead from '../shared/RelatedRead.js'
import DetermineHeader from '../components/DetermineHeader.js'

export const headingText = 'How to invoke an Activity Execution in Go'

<DetermineHeader
hLevel={props.heading}
hText={headingText}
/>

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

The `ExecuteActivity` call returns a Future, which can be used to get the result of the Activity Execution.
