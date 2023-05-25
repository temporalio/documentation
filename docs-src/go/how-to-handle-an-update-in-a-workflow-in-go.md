---
id: how-to-handle-an-update-in-go
title: How to handle an Update in Go
sidebar_label: Handle Update
description: Use the `SetUpateHandler` API from the `go.temporal.io/sdk/workflow` package to register an Update Handler for a given name.
tags:
  - go
  - how-to
---

Use the [SetUpdateHandler](https://pkg.go.dev/go.temporal.io/sdk/workflow#SetUpdateHandler) API from the `go.temporal.io/sdk/workflow` package to register an Update handler for a given name.

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

In the preceding example, the Workflow code uses `workflow.SetUpdateHandler` to register a function to handle Workflow Updates.
The function can take multiple serializable input parameters, although we recommend that you use only a single parameter to allow for fields to be added in future versions while retaining backward compatibility.
The function can optionally take a `workflow.Context` parameter in the first position.
The function returns either a serializable value and an error or just an error.

Unlike Query handlers, Update handlers can safely observe and mutate Workflow state.
