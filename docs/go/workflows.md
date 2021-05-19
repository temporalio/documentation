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

The first parameter, `workflow.Context` is a requirement for all Workflow functions as it is used by the Temporal Go SDK to pass around an execution context, and virtually all the Go SDK APIs that are callable from the Workflow require it.

:::note

This `workflow.Context` entity operates similarly to the standard `context.Context` entity provided by Go.
The only difference is that the `Done()` function provided by `workflow.Context` returns `workflow.Channel` instead of the standard Go `chan`.

:::

The second parameter, `string`, is a custom parameter that can be used to pass data into the Workflow when it starts.
A Workflow can have one or more such parameters.

:::note

All Workflow function parameters must be serializable, which essentially means that params can’t be channels, functions, variadic, or unsafe pointers.
:::

Returning an error from a Workflow is used to indicate that an error was encountered during its execution and the Workflow should be terminated.

## How to write Workflow code

There is a single requirement for how the code inside a Workflow is written. Workflow code must be "deterministic".
This requirement stems from how the Temporal Server tracks the state of code execution and its need to be able to replay an execution.

In practical terms, this means the following:

- Workflow code can only read and manipulate local variables or variables received as return values from Temporal Go SDK APIs.
- Workflow code can not affect changes in external systems directly.
- Workflow code must use Go SDK APIs to handle things like time, logging, and goroutines.
- Workflow code can not directly iterate over maps using `range` because the order of the map's iteration is randomized.

However, the Go SDK provides a number of features to handle these restrictions with ease.

1. To interact with external systems and nondeterministic code, Workflows can execute [Activities](/docs/go/activities).
2. To handle things like time, logging, and goroutines, as mentioned above, there are specific Go SDK APIs available, such as:
   - `workflow.Now()` This is a replacement for `time.Now()`.
   - `workflow.Sleep()` This is a replacement for `time.Sleep()`.
   - `workflow.GetLogger()` This is to ensure that the provided logger does not duplicate logs during a replay.
   - `workflow.Go()` This is a replacement for the the `go` statement.
   - `workflow.Channel` This is a replacement for the native `chan` type.
     Temporal provides support for both buffered and unbuffered channels.
   - `workflow.Selector` This is a replacement for the `select` statement. Learn more on the [Go SDK Selectors](https://docs.temporal.io/docs/go/selectors) page
   - `workflow.Context` This is a replacement for `context.Context`. Learn more on the [Go SDK Context Propagation](https://docs.temporal.io/docs/go/tracing) page.
3. Additionally, for executing very small pieces of nondeterministic logic within the Workflow, you can use the [`workflow.SideEffect` API](/docs/go/side-effect).

Below is a sample Workflow that is treated as a cron job by the Temporal Server.
It executes a single Activity and uses `workflow.Now()`.

<!--SNIPSTART samples-go-cron-workflow-->
<!--SNIPEND-->

## How to start a Workflow

With the Go SDK, there are two ways that you can start a Workflow:

1. Use the Go SDK `client` to start a Workflow from a Go process, as described below.
2. Start a Workflow from an already running Workflow, which is known as a [Child Workflow](/docs/go/child-workflows).

:::note

Starting a Workflow is not the same as executing a Workflow.
Starting a Workflow means that you are telling the Server to begin tracking the state of the Workflow execution.
In a Temporal application, you do not run Workflow code directly, instead Workflow code is hosted and executed by a [Worker](/docs/go/workers).

:::

To start a Workflow you need to create the Temporal Go SDK client, call `ExecuteWorkflow()`, and pass it the following:

1. `context.Context`, which is a normal [Go `Context` type](https://golang.org/pkg/context/).
2. `client.StartWorkflowOptions` Which can include [timeout settings and a `RetryPolicy`](/docs/go/retries).
3. The name of the Workflow function.
4. Variables that should be passed to the Workflow when it begins execution.

```go
package main

import (
    "context"

    "go.temporal.io/sdk/client"
)

func main() {
    // Create the client object just once per process
    c, err := client.NewClient(client.Options{})
    if err != nil {
        // Handle failure
    }
    defer c.Close()

    // TaskQueue is the only required option to start a Workflow
    options := client.StartWorkflowOptions{
        TaskQueue: "your_task_queue",
    }

    we, err := c.ExecuteWorkflow(context.Background(), options, YourWorkflow, workflowParm1, workflowParam2)
    if err != nil {
        // Handle failure
    }

    // Use the WorkflowExecution to get the result
    // Get is blocking call and will wait for the Workflow to complete
    var workflowResult string
    err = we.Get(context.Background(), &workflowResult)
    if err != nil {
        // Handle failure
    }

    // Do something with the result
    printResults(workflowResult, we.GetID(), we.GetRunID())
}
```

You can start Workflows **asynchronously** or **synchronously**.
In Go, the only difference is whether the code waits for the result of the Workflow in the same process in which you started it.
Workflows do not rely on the process that invoked it, and will continue executing even if the waiting process crashes or stops.

When you start a Workflow with `ExecuteWorkflow`, a `WorkflowExecution` is returned (which is the `we` variable above).
The `WorkflowExecution` can be used to get the result or capture the WorkflowId.
You can retrieve the result of the Workflow **from a completely different process**, as long as you have the WorkflowId, by using `client.GetWorkflow`.

```go
we = client.GetWorkflow(workflowID)
var result string
we.Get(ctx, &result)
```

:::note

In most use cases it is better to execute the Workflow asynchronously.
You can also start a Workflow Execution on a regular schedule with [the CronSchedule option](distributed-cron).

:::

## How to get data in or out of a running Workflow

[Signals](/docs/go/signals) are the mechanism by which you can get data into already running Workflow.

[Queries](/docs/go/queries) are the mechanism by which you can get data out of currently running Workflow.

## Custom Serialization and Workflow Security

import DataConverter from '../shared/dataconverter.md'

<DataConverter href="https://pkg.go.dev/go.temporal.io/sdk@v1.6.0/converter#DataConverter" continueAsNewURL="#large-event-histories"/>

## Large Event Histories

import SharedContinueAsNew from '../shared/continue-as-new.md'

<SharedContinueAsNew />

To trigger this behavior, the Workflow function should
terminate by returning the special **ContinueAsNewError** error:

```go
func SimpleWorkflow(workflow.Context ctx, value string) error {
    ...
    return workflow.NewContinueAsNewError(ctx, SimpleWorkflow, value)
}
```
