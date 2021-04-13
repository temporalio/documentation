---
id: go-workflows
title: Workflows in Go
sidebar_label: Workflows
description: The core abstraction of the Temporal solution is a fault-oblivious stateful Workflow.
---

## What is a Workflow?

In the Temporal Go SDK programming model, a Workflow is an exportable function.

```go
package app

import (
    "go.temporal.io/sdk/workflow"
)

func SimpleWorkflow(ctx workflow.Context, value string) (string, error) {
  // Do something
  if err != nil {
    return "", err
  }
  return "success", nil
}
```

The first parameter, `workflow.Context` is a requirement for all Workflow functions as it is used by the Temporal Go SDK to pass around an execution context, and virtually all the Go SDK functions that are callable from the Workflow require it.

:::note

This `workflow.Context` entity operates similarly to the standard `context.Context` entity provided by Go.
The only difference is that the `Done()` function provided by `workflow.Context` returns `workflow.Channel` instead of the standard Go `chan`.

:::

The second parameter, `string`, is a custom parameter that can be used to pass data into the Workflow when it starts.
A Workflow can have one or more such parameters.

:::note

All Workflow function parameters must be serializable, which essentially means that params can’t be channels, functions, variadic, or unsafe pointers.
:::

Returning an error from a Workflow is used indicate that an error was encountered during its execution and the Workflow should be terminated.
