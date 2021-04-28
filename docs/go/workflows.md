---
id: workflows
title: Workflows in Go
sidebar_label: Workflows
description: In the Temporal Go SDK programming model, a Workflow is an exportable function that adheres to a set of rules.
image: /img/workflow.png
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

## How to write Workflow code

There is a single requirement for how the code inside of a Workflow is written. Workflow code must be "deterministic".
This requirement stems from how the Temporal Server tracks the state of code execution and its need to be able to replay an execution.

In practical terms, this means the following:

- Workflow code can only read and manipulate local variables or variables received as return values from Temporal Go SDK functions.
- Workflow code can not affect changes in external systems directly.
- Workflow code must use Go SDK APIs to handle things like time, logging, and goroutines.
- Workflow code can not directly iterate over maps using `range` because the order of the map's iteration is randomized.

However the Go SDK provides a number of features to handle these restrictions with ease.

1. To interact with external systems and nondeterministic code, Workflows can execute [Activities](/docs/go/activities).
2. To handle things like time, logging, and goroutines, as mentioned above, there are specific Go SDK APIs available, such as:
    - `workflow.Now()` This is a replacement for `time.Now()`.
    - `workflow.Sleep()` This is a replacement for `time.Sleep()`.
    - `workflow.GetLogger()` This is to ensure that the provided logger does not duplicate logs during a replay.
    - `workflow.Go()` This is a replacement for the the `go` statement.
    - `workflow.Channel` This is a replacement for the native `chan` type.
    Temporal provides support for both buffered and unbuffered channels.
    - `workflow.Selector` This is a replacement for the `select` statement. Learn more on the [Go SDK Selectors](https://docs.temporal.io/docs/go/selectors) page
3. Additionally, for executing very small pieces of nondeterministic logic within the Workflow, you can use the [`workflow.SideEffect` API](/docs/go/side-effect).

## How to start a Workflow

With the Go SDK, there are two ways that you can start a Workflow:

1. Use the Go SDK `client` to [start a Workflow](/docs/go/sync-vs-async-start).
2. Start a Workflow from an already running Workflow, which is known as a [Child Workflow](/docs/go/child-workflows).

:::note

Starting a Workflow is not the same as [executing a Workflow](#how-to-execute-workflow-code).
Starting a Workflow means that you are telling the Server to begin tracking the state of the Workflow execution.

:::

## How to execute Workflow code

In a Temporal application, you do not run Workflow code directly, instead Workflow code is hosted and executed by a [Worker](/docs/go/workers).

## How to get the result of a Workflow

How you get the result of the Workflow depends on whether you [start the Workflow](/docs/go/sync-vs-async-start) synchronously or asynchronously.

## How to get data in or out of a running Workflow

[Signals](/docs/go/signals) are the mechanism by which you can get data into already running Workflow.

[Queries](/docs/go/queries) are the mechanism by which you can get data out of currently running Workflow.
