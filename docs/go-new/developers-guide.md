---
id: developers-guide
title: Guide to developing Workflows using the Temporal Go SDK
sidebar_label: Go SDK developers guide
---

This guide is for anyone building Temporal Applications in Go.

## How to use the Temporal Go SDK

Add the [Temporal Go SDK](https://github.com/temporalio/sdk-go) to your project:

```
go get go.temporal.io/sdk@latest
```

:::note How to run your application locally

[Install and run the Temporal Server](/docs/server/quick-install) using `docker compose`.
The Server needs to be running for your Temporal Application to execute.

:::

:::note Where is the technical reference?

The [Temporal Go SDK API reference](https://pkg.go.dev/go.temporal.io/sdk) is published on [pkg.go.dev](https://pkg.go.dev/go.temporal.io/sdk)

:::

:::note Are there executable code samples?

You can find a complete list of executable code samples in the [samples library](/docs/samples-library/#go).
Many of the code samples in this guide are synced from code sample repositories.
And each of the Go SDK Tutorials is backed by a fully executable template application.

:::

## How to write a Workflow Definition

In the Temporal Go SDK programming model, a [Workflow Definition](/docs/concepts-new/introduction#workflow-definition) is an exportable function.

```go
func YourWorkflowDefinition(ctx workflow.Context) error {
  // ...
  return nil
}
```

### What parameters can a Workflow Definition have?

The first parameter of a Go-based Workflow Defintion must be of the, `workflow.Context` type, as it is used by the Temporal Go SDK to pass around an execution context, and virtually all the Go SDK APIs that are callable from the Workflow require it.
It is acquired from the `go.temporal.io/sdk/workflow` package.

```go
import (
    "go.temporal.io/sdk/workflow"
)

func YourWorkflowDefinition(ctx workflow.Context, yourVar string) error {
  // ...
}
```

The `workflow.Context` entity operates similarly to the standard `context.Context` entity provided by Go.
The only difference is that the `Done()` function provided by `workflow.Context` returns `workflow.Channel` instead of the standard Go `chan`.

The second parameter, `string`, is a custom parameter that is passed to the Workflow when it is invoked.
A Workflow Definition may support multiple custom parameters, or none.
However, the best practice is to pass a single parameter that is of a `struct` type so there can be some backward compatibility if new parameters are added.

```go
type YourParam struct {
  Param1 string
  Param2 int
}

func YourWorkflowDefinition(ctx workflow.Context, yourVar YourParam) (string, error) {
  // ...
}
```

All Workflow Definition parameters must be serializable, which means that parameters can’t be channels, functions, variadic, or unsafe pointers.

### What can a Workflow Definition return?

A Go-based Workflow Definition can return either just an `err` or a `value, err` combination.
Again, the best practice here is to use a `struct` type to hold the values.

```go
type YourResponse {
  Value1 string
  Value2 int
}

func YourWorkflowDefinition(ctx workflow.Context, yourVar YourParam) (YourResponse, error) {
  // ...
  if err != nil {
    return "", err
  }
  responseVar := YourResponse {
    Value1: "super",
    Value2: 1,
  }
  return responseVar, nil
}
```

Returning a non-nil `error` from a Workflow indicates that an error was encountered during its execution and the Workflow Execution should be [Terminated](#).
The [Application operations guide](/docs/application-operations/#when-to-return-an-error-from-a-Workflow) covers best practices for returning errors from Workflows.

### What are the logical requirements for a Workflow Definitions?

The [Application operations guide](/docs/application-operations/#what-are-general-requirements-for-writing-workflow-defintions) covers general patterns for writing "deterministic" Workflow Defintions.

:::note What are some specific patterns for Go?

In Go specifically, Workflow Definition code can not directly do the following:

- Iterate over maps using `range`, because with `range` the order of the map's iteration is randomized.
- Use the native `go` statement, `select` statement, or `chan` type.

:::

### What features are available to Go-based Workflows?

The following Temporal Go SDK features a

- [Activities](#)
- [Loggers](#)\
- [Timers](#)
- [Sessions](#)
- [SDK wrapped Go Channels](#)
- [Side Effects](#)
-
- [Selectors](#)


- [Signals](#)
- [Queries](#)

  Use a [SideEffect](#side-effect), MutableSideEffect, or an Activity to load configuration values.


- Workflow Definition code can not affect changes in external systems directly.
- Workflow Definition code must use Go SDK APIs to handle things like time, logging, and goroutines.
- Workflow Definition code can not directly iterate over maps using `range` because the order of the map's iteration is randomized.

However, the Go SDK provides a number of features to handle these restrictions with ease.

1. To interact with external systems and nondeterministic code, Workflows can execute [Activities](/docs/go/activities).
2. To handle things like time, logging, and goroutines, as mentioned above, there are specific Go SDK APIs available, such as:

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

## How to invoke a Workflow Execution in Go

With the Go SDK, there are two ways that you can start a Workflow:

1. Use the Go SDK `client` to start a Workflow from a Go process, as described below.
2. Start a Workflow from an already running Workflow, which is known as a [Child Workflow](#child-workflow-executions).

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
In most use cases it is better to execute the Workflow asynchronously.
In Go, the only difference is whether the code waits for the result of the Workflow in the same process in which you started it, so you should not synchronously block the process if you don't have a good reason to.
Workflows do not rely on the process that invoked it, and will continue executing even if the waiting process crashes or stops.

:::note

In most use cases it is better to execute the Workflow asynchronously.
You can also start a Workflow Execution on a regular schedule with [the CronSchedule option](distributed-cron).

:::

### External Workflows

You can execute Workflows (including those from other language SDKs) by their type name:

```go
workflowID := "myworkflow_" + uuid.New()
workflowOptions := client.StartWorkflowOptions{
  ID:        workflowID,
  TaskQueue: "mytaskqueue",
}

we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, "MySimpleWorkflow")
if err != nil {
  log.Fatalln("Unable to execute workflow", err)
}
log.Println("Started workflow", "WorkflowID", we.GetID(), "RunID", we.GetRunID())
```

Here we execute a workflow by its type name, namely `MySimpleWorkflow`. By default, the
Workflow type is the name of the Workflow function, for example:

```go
func MySimpleWorkflow(ctx workflow.Context) error {
 // Workflow code here...
}
```

Note that you can also set the Workflow type via `RegisterWorkflowOptions` when registering your Workflow
with the Worker, for example:

```go
rwo := workflow.RegisterOptions {
   Name: "MyWorkflow", // Set "MyWorkflow" as the Workflow type
}
w.RegisterWorkflowWithOptions(dynamic.SampleGreetingsWorkflow, rwo)
```

Inside Workflow code you can also signal other workflows using their workflow type using `SignalExternalWorkflow`:

```go
// Send 10 signals to PHP workflow
for i := 0; i < 10; i++ {
    err :=  workflow.SignalExternalWorkflow(ctx, "simple-workflow-php", "", "goMessage", "Hello from Go workflow: "+strconv.Itoa(i)).Get(ctx, nil)
}
```

Here we are sending a signal to a Workflow with type "simple-workflow-php" and signal name "goMessage".

See our [Signals docs](https://docs.temporal.io/docs/go/signals) and [Temporal Polyglot example](https://github.com/tsurdilo/temporal-polyglot) for more.

### Scheduling Cron Workflows

You can also start a Workflow Execution on a regular schedule with the `CronSchedule` option.

```go
workflowOptions := client.StartWorkflowOptions{
    ID:           workflowID,
    TaskQueue:    "cron",
    CronSchedule: "* * * * *",
}

we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, cron.SampleCronWorkflow)
```

More info in the [Distributed Cron](distributed-cron) docs.

## How to invoke a Child Workflow Execution in Go

Any Workflow Execution that is invoked from within a Workflow is considered a Child Workflow.
The [Application operations guide](#) goes into more detail on when and why to use a Child Workflow.

In Go, you must use the `workflow.ExecuteChildWorkflow` API and pass it `workflow.Context`, `workflow.ChildWorkflowOptions`, the Workflow Type, and any parameters that should be passed to the Child Workflow Execution.

`workflow.ChildWorkflowOptions` contain the same fields as "normal" [Workflow Options](#what-are-workflow-execution-options).
These fields will automatically inherit their values from the Parent Workflow Options if not explicitly set.
If a custom `WorkflowID` is not set then one will be generated when it is invoked.

```go
func YourWorkflowDefinition(ctx workflow.Context, params ParentParams) (ParentResp, error) {

  childWorkflowOptions := workflow.ChildWorkflowOptions{}
  ctx = workflow.WithChildOptions(ctx, childWorkflowOptions)

  future := workflow.ExecuteChildWorkflow(ctx, YourOtherWorkflowDefinition, ChildParams{})
  // ...
  return resp, nil
}

func YourOtherWorkflowDefinition(ctx workflow.Context, params ChildParams) (ChildResp, error) {
  // ...
  return resp, nil
}
```

### Querying Workflow State

When you start a Workflow with `ExecuteWorkflow`, a `WorkflowExecution` is returned (which is the `we` variable above).
The `WorkflowExecution` can be used to get the result or capture the WorkflowId.
You can retrieve the result of the Workflow **from a completely different process**, as long as you have the WorkflowId, by using `client.GetWorkflow`.

```go
we = client.GetWorkflow(workflowID)
var result string
we.Get(ctx, &result)
```

### ParentClosePolicy

When creating a Child Workflow, you can define a `ParentClosePolicy` that terminates, cancels, or abandons the Workflow Execution if the child's parent stops execution.

- `ABANDON`: When the parent stops, don't do anything with the Child Workflow.
- `TERMINATE`: When the parent stops, terminate the Child Workflow
- `REQUEST_CANCEL`: When the parent stops, terminate the Child Workflow

You can set policies per child, which means you can opt out of propagating terminates / cancels on a per-child basis.
This is useful for starting Child Workflows asynchronously:

1. Set `ChildWorkflowOptions.ParentClosePolicy` to `ABANDON` when creating a Child Workflow.
2. Start the Child Workflow Execution asynchronously using `ExecuteChildWorkflow`.
3. Call `GetChildWorkflowExecution` on the `ChildWorkflowFuture` returned by the `ChildWorkflowFuture`
4. Wait for the `ChildWorkflowFuture`.
   This indicates that the child successfully started (or start failed).
5. Complete Parent Workflow Execution asynchronously.

Steps 3 and 4 are needed to ensure that a Child Workflow Execution starts before the parent closes.
If the parent initiates a Child Workflow Execution and then immediately completes, the child would never execute.

```go
func ParentWorkflow(ctx workflow.Context) error {
    childWorkflow := workflow.ExecuteChildWorkflow(ctx, MyChildWorkflow)
    // Wait for child to start
    _ = childWorkflow.GetChildWorkflowExecution().Get(ctx, nil)
    return nil
}
```

## How to cancel a Workflow Execution

There are many scenarios where it is necessary and even ideal to be able to cancel a Workflow Execution.
Use the `CancelWorkflow` API to cancel a Workflow Execution using its Id.

<!--SNIPSTART samples-go-cancellation-cancel-workflow-execution-trigger-->
<!--SNIPEND-->

Workflow Definitions can be written to handle execution cancellation requests.
In the Workflow Definition below, there is a special Activity that handles clean up should the execution be cancelled.

<!--SNIPSTART samples-go-cancellation-workflow-definition-->
<!--SNIPEND-->

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

## How to use Timers

- `workflow.Now()` This is a replacement for `time.Now()`.
- `workflow.Sleep()` This is a replacement for `time.Sleep()`.
