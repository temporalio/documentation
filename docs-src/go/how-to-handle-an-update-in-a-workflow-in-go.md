---
id: how-to-handle-an-update-in-go
title: How to handle an Update in Go
sidebar_label: Handle Update
description: Use the `SetUpateHandler` API from the `go.temporal.io/sdk/workflow` package to register an Update Handler for a given name.
tags:
  - go
  - how-to
---

Use the `SetUpdateHandler` API from the `go.temporal.io/sdk/workflow` package to register an Update handler for a given name.

```go
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) error {
  counter := 0
  workflow.SetUpdateHandler(ctx, "fetchAdd", func(i int) (int, error) {
    tmp := counter
    counter += i
    return tmp, nil
  })
  // ...
}
```

In the example above, the Workflow code uses `workflow.SetUpdateHandler` to register a function to handler workflow updates.
The function can take multiple serializable input parameters though we recommend that only a single parameter is used to allow for fields to be added in future versions while retaining backward compatibility.
The function can optionally take a `workflow.Context` parameter in the first position.
The function returns either a serializable value and an error or just an error.

Unlike with query handlers, it is safe for Update Handlers to observe and mutate workflow state.
