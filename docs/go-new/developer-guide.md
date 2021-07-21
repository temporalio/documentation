---
id: developer-guide
title: A guide to developing Temporal applications using the Temporal Go SDK
sidebar_label: Developer guide
---

import RelatedRead from '../shared/RelatedRead.js'

:::caution

This page is a work in progress!

:::

This guide is for anyone building Temporal applications in Go.

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
And each of the Go SDK Tutorials is backed by a fully executable template application.

:::

## How to write a Workflow Definition in Go

In the Temporal Go SDK programming model, a [Workflow Definition](/docs/concepts-new/introduction#workflow-definition) is an exportable function.

```go
func YourWorkflowDefinition(ctx workflow.Context) error {
  // ...
  return nil
}
```

### Workflow parameters in Go

The first parameter of a Go-based Workflow Definition must be of the [`workflow.Context`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/workflow#Context) type, as it is used by the Temporal Go SDK to pass around Workflow Execution context, and virtually all the Go SDK APIs that are callable from the Workflow require it.
It is acquired from the [`go.temporal.io/sdk/workflow`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/workflow) package.

```go
import (
    "go.temporal.io/sdk/workflow"
)

func YourWorkflowDefinition(ctx workflow.Context, param string) error {
  // ...
}
```

The `workflow.Context` entity operates similarly to the standard `context.Context` entity provided by Go.
The only difference between `workflow.Context` and `context.Context` is that the `Done()` function, provided by `workflow.Context`, returns `workflow.Channel` instead of the standard Go `chan`.

The second parameter, `string`, is a custom parameter that is passed to the Workflow when it is invoked.
A Workflow Definition may support multiple custom parameters, or none.
However, the best practice is to pass a single parameter that is of a `struct` type so there can be some backward compatibility if new parameters are added.

```go
type YourWorkflowParam struct {
  WorkflowParamFieldOne string
  WorkflowParamFieldTwo int
}

func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) error {
  // ...
}
```

All Workflow Definition parameters must be serializable, which means that parameters can’t be channels, functions, variadic, or unsafe pointers.

### Workflow return values in Go

A Go-based Workflow Definition can return either just an `error` or a `customValue, error` combination.
Again, the best practice here is to use a `struct` type to hold all custom values.

```go
type YourWorkflowResponse {
  WorkflowResultFieldOne string
  WorkflowResultFieldTwo int
}

func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
  // ...
  if err != nil {
    return "", err
  }
  responseVar := YourWorkflowResponse {
    FieldOne: "super",
    FieldTwo: 1,
  }
  return responseVar, nil
}
```

Returning a non-nil `error` from a Workflow indicates that an error was encountered during its execution and the Workflow Execution should be [Terminated](#).

<RelatedRead
text="When to return an error from a Workflow"
goTo="#"
tagChar="g"
/>

### Workflow logic requirements in Go

In Go specifically, Workflow Definition code can not directly do the following:

- Iterate over maps using `range`, because with `range` the order of the map's iteration is randomized (Use a Side Effect or an Activity.
- Use the native `go` statement, `select` statement, or `chan` type (Use the [SDK Go API](#), [SDK Select API](#), and [SDK Channel API](#))

<RelatedRead
text="General requirements for writing Workflow Definitions"
goTo="/docs/application-operations/#what-are-general-requirements-for-writing-workflow-defintions"
tagChar="g"
/>

<RelatedRead
text="How to implement a Side Effect in Go"
goTo="#"
tagChar="g"
/>

<RelatedRead
text="How to write an Activity Definition"
goTo="#how-to-write-an-activity-definition"
tagChar="g"
/>

## How to invoke a Workflow Execution in Go

A Workflow Execution can be invoked using the `ExecuteWorkflow()` method on the Go SDK [`Client`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/client#Client), which is available via [`NewClient()`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/client#NewClient) in the [`go.temporal.io/sdk/client`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/client) package.

<RelatedRead
text="How to invoke a Child Workflow Execution"
goTo="#"
tagChar="g"
/>

The `ExecuteWorkflow()` API call requires an instance of [`context.Context`](https://pkg.go.dev/context#Context), an instance of [`StartWorkflowOptions`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/client#StartWorkflowOptions), a Workflow Type name, and all variables to be passed to the Workflow Execution.

```go
package main

import (
  // ...

  "go.temporal.io/sdk/client"
)

func main() {
  c, err := client.NewClient(client.Options{})
  if err != nil {
    // ...
  }
  defer c.Close()
  // ...
  workflowOptions := client.StartWorkflowOptions{
    TaskQueue: "your-task-queue",
  }
  we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition, param)
  if err != nil {
    // ...
  }
  // ...
}

func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
  // ...
}
```

Notice that that the Task Queue name is the same as the name provided [when a new Worker is created](#).

<RelatedRead
text="What is a Workflow Execution"
goTo="#"
tagChar="g"
/>

<RelatedRead
text="How to customize the name of the Workflow Type"
goTo="#"
tagChar="g"
/>

### Required Workflow Options in Go

The only field, of the `StartWorkflowOptions` instance, that requires a value is the `TaskQueue`.
  A Task Queue name is also provided to the Worker that is registered to execute that particular Workflow Type.
  The Task Queue name must be the same for both.

<RelatedRead
text="What are Workflow Execution Options"
goTo="#"
tagChar="e"
/>

<RelatedRead
text="How to start a Worker"
goTo="#"
tagChar="g"
/>

<RelatedRead
text="When to care about Task Queues"
goTo="#"
tagChar="g"
/>

### Workflow Type name in Go

By default, the Workflow Type name is the same as the function name.
If the invocation process has access to the function directly, then the Workflow Type name parameter can be passed as if the function name were a variable, without quotations.

If the invocation process does not have direct access to the statically defined Workflow Definition, for example, if the Workflow Definition is in an un-importable package, or it is written in a completely different language, then the Workflow Type can be provided as a `string`.

```go
we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, "YourWorkflowDefinition", param)
```

In Go, the name of the Workflow Type can be customized when the Workflow Definition is registered with a Worker.

<RelatedRead
text="How to start a Worker"
goTo="#"
tagChar="g"
/>

<RelatedRead
text="What is a Workflow Type"
goTo="#"
tagChar="e"
/>

<RelatedRead
text="How to build a polyglot application"
goTo="#"
tagChar="t"
/>

### How to get the result of a Workflow Execution in Go

The `ExecuteWorkflow` call returns an instance of [`WorkflowRun`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/client#WorkflowRun), which is the `we` variable below.

```go
  we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, app.YourWorkflowDefinition, param)
  if err != nil {
    // ...
  }
  // ...
}
```

The instance of `WorkflowRun` has the following three methods:

- `GetWorkflowID()`: Returns the Workflow Id of the invoked Workflow Execution.
- `GetRunID()`: Always returns the Run Id of the initial Run (See [Continue As New](#)) in the series of Runs that make up the full Workflow Execution.
- `Get`: Takes a pointer as a parameter and populates the associated variable with the Workflow Execution result.

To wait on the result of Workflow Execution in the same process that invoked it, call `Get()` on the instance of `WorkflowRun` that is returned by the `ExecuteWorkflow()` call.

```go
  we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition, param)
  if err != nil {
    // ...
  }
  var result YourWorkflowResponse
  err = we.Get(context.Background(), &result)
  if err != nil {
      // ...
  }
  // ...
}
```

However, the result of a Workflow Execution can be obtained from a completely different process, all that is needed is the [Workflow Id](#) and [Run Id](#).
The result of the Workflow Execution is available for as long as it's Execution History remains in the system (See [How long do Workflow Execution Histories persist](#)).

To get the Workflow Id and Run Id, call the `GetWorkflowID` and `GetRunId` on the instance of `WorkflowRun` that is returned by the `ExecuteWorkflow()` call and store the results.
These values can then be used to get an instance of `WorkflowRun` again by calling `GetWorkflow()` on an instance of the Go SDK Client.

```go
  we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, YourWorkflowDefinition, param)
  if err != nil {
    // ...
  }
  workflowID := we.GetID()
  WorkflowRunID := we.GetRunID()
  // ...
  we := c.GetWorkflow(context.Background, workflowID, workflowRunID)

  var result YourWorkflowResponse
  err = we.Get(context.Background(), &result)
  if err != nil {
      // ...
  }
  // ...
}
```

## How to write an Activity Definition in Go

In the Temporal Go SDK programming model, an Activity Definition is an exportable function or `stuct` method.

**Function**:

```go
func YourActivityDefinition(ctx workflow.Context) error {
  // ...
  return nil
}
```

**Struct method**:

```go
type YourActivityStruct struct {
  ActivityFieldOne string
  ActivityFieldTwo int
}

func(a *YourActivityStruct) YourActivityDefinition(ctx workflow.Context) error {

}
```

Activities written as struct methods can make use of shared struct variables.
  The rest of this guide will show Activities written as struct methods.

<RelatedRead
text="What are Activities"
goTo="/docs/concepts-new/introduction#workflow-definition"
tagChar="e"
/>

### Activity parameters in Go

The first parameter of an Activity Definition is `context.Context`.
  This parameter is optional for an Activity Definition, though it is recommended especially if the Activity is expected to use other Go SDK APIs.

An Activity Definition can support as many other custom parameters as needed.
  However, all parameters must be serializable (parameters can’t be channels, functions, variadic, or unsafe pointers), and it is recommended to pass a single struct that can be updated later.

```go
type YourActivityParam {
  ActivityParamFieldOne string
  ActivityParamFieldTwo int
}

type YourActivityStruct struct {
  // ...
}

func (a *YourActivityStruct) YourActivityDefinition(ctx context.Context, param YourActivityParam) error {
  // ...
}
```

There is no explicit limit to the amount of parameter data that can be passed to an Activity, however all parameters are recorded in the Workflow Execution History and a large Workflow Execution History can adversely impact the performance of your Workflow Execution.

<RelatedRead
text="What is a Workflow Execution History"
goTo="#"
tagChar="e"
/>

<RelatedRead
text="When to care about the size of your Workflow Execution History"
goTo="#"
tagChar="g"
/>

### Activity return values in Go

A Go-based Activity Definition can return either just an `error` or a `customValue, error` combination (same as a Workflow Definition).
Again, the best practice here is to use a `struct` type to hold all custom values.
  Custom return values must be serializable.

```go
type YourActivityResult {
  ActivityResultFieldOne string
  ActivityResultFieldTwo int
}

func (a *YourActivityStruct) YourActivityDefinition(ctx context.Context, param YourActivityParam) (YourActivityResult, error) {
  // ...
  result := YourActivityResult {
    ActivityResultFieldOne: a.ActivityFieldOne,
    ActivityResultFieldTwo: a.ActivityFieldTwo,
  }
  return result, nil
}
```

<RelatedRead
text="When to return an error from an Activity"
goTo="#"
tagChar="g"
/>

### Activity logic requirements in Go

There are no other limitations to Activity Definition logic.
All native features of the Go programming language can be used within an Activity, and it is idiomatic to use an Activity to make calls to other services across a network.

<RelatedRead
text="What are some Activity implementation design patterns"
goTo="#"
tagChar="g"
/>

## How to invoke an Activity Execution in Go

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

## How to start a Worker

First, create a new instance of a [`Worker`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/worker#Worker) by calling `worker.New()`, available via the `go.temporal.io/sdk/worker` package and pass it the following parameters:

1. An instance of the The Temporal Go SDK `Client`.
2. The name of the Task Queue that it will poll.
3. An instance of `worker.Options`, which can be empty.

Then, register the Workflow Types and the Activity Types that the Worker will be capable of executing.

Lastly, call either the `Start()` or the `Run()` method on the instance of the Worker.
Run accepts an interrupt channel as a parameter, so that the Worker can be stopped in the terminal.
Otherwise the `Stop()` method must be called to stop the Worker.

```go
package main

import (
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
)

func main() {
	c, err := client.NewClient(client.Options{})
	if err != nil {
		// ...
	}
	defer c.Close()
	w := worker.New(c, "your-task-queue", worker.Options{})
	w.RegisterWorkflow(YourWorkflowDefinition)
	w.RegisterActivity(YourActivityDefinition)
	err = w.Run(worker.InterruptCh())
	if err != nil
		// ...
	}
  // ...
}

func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
  // ...
}

func YourActivityDefinition(ctx context.Context, param YourActivityParam) (YourActivityResponse, error) {
  // ...
}
```

The `RegisterWorkflow()` and `RegisterActivity` calls essentially create an in-memory mapping between the Workflow Types and their implementations, inside the Worker process.

Notice that that the Task Queue name is the same as the name provided [when the Workflow Execution is invoked](#).

The name of the Task Queue that is provided to the Worker must be the same Task Queue name that is provided with the invocation of Workflow Execution

:::note

If the Worker polls a Task for a Workflow or Activity function it does not know about, it will fail that Task.
However, the failure of the Task will not cause the associated Workflow to fail.

:::

When you start a Workflow by calling `ExecuteWorkflow()`, the Temporal Server adds a new Task to the Workflow's Task Queue, and any Worker polling that Task Queue could execute that Task. You can learn more in the [Workflows docs](https://docs.temporal.io/docs/go/workflows#how-to-start-a-workflow).


Note that you can also set the Workflow type via `RegisterWorkflowOptions` when registering your Workflow
with the Worker, for example:

### How to set Worker Options

```go
rwo := workflow.RegisterOptions {
   Name: "MyWorkflow", // Set "MyWorkflow" as the Workflow type
}
w.RegisterWorkflowWithOptions(dynamic.SampleGreetingsWorkflow, rwo)
```



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

### How to set a Parent Close Policy

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

#### Heart Beating

For long-running Activities, Temporal provides an API for the Activity code to report both liveness and
progress back to the Temporal managed service.

```go
progress := 0
for hasWork {
    // Send heartbeat message to the server.
    activity.RecordHeartbeat(ctx, progress)
    // Do some work.
    ...
    progress++
}
```

When an Activity times out due to a missed heartbeat, the last value of the details (`progress` in the
above sample) is returned from the `workflow.ExecuteActivity` function as the details field of `TimeoutError`
with `TimeoutType` set to `Heartbeat`.

You can also heartbeat an Activity from an external source:

```go
// The client is a heavyweight object that should be created once per process.
serviceClient, err := client.NewClient(client.Options{
    HostPort:     HostPort,
    Namespace:   Namespace,
    MetricsScope: scope,
})

// Record heartbeat.
err := serviceClient.RecordActivityHeartbeat(ctx, taskToken, details)
```

The parameters of the `RecordActivityHeartbeat` function are:

- `taskToken`: The value of the binary `TaskToken` field of the `ActivityInfo` struct retrieved inside
  the Activity.
- `details`: The serializable payload containing progress information.

#### Cancellation

When an Activity is cancelled, or its Workflow execution has completed or failed, the context passed
into its function is cancelled, which sets its channel’s closed state to `Done`. An Activity can use that
to perform any necessary cleanup and abort its execution. Cancellation is only delivered to Activities
that call `RecordActivityHeartbeat`.


















### Registration

To make the Activity visible to the Worker process hosting it, the Activity must be registered with the Worker.

```go
w := worker.New(temporalClient, "your_task_queue", worker.Options{})
w.RegisterActivity(YourActivity)
```

This call creates an in-memory mapping inside the Worker process between the function name and the function itself.
If a Worker receives a request to start an Activity execution for an Activity function it does not know, it will fail that request.

To register multiple Activities with the Worker, just make multiple Activity registration calls, but make sure each Activity function name is unique:

```
w.registerActivity(ActivityA)
w.registerActivity(ActivityB)
w.registerActivity(ActivityC)
```

## Synchronous Activity Execution

The primary responsibility of a Workflow implementation is to schedule Activities for execution.
The most straightforward way to do this is via the `workflow.ExecuteActivity` API.
The following sample code demonstrates making this call:

```go
ao := workflow.ActivityOptions{
        TaskQueue:               "sampleTaskQueue",
        ScheduleToCloseTimeout: time.Second * 60,
        ScheduleToStartTimeout: time.Second * 60,
        StartToCloseTimeout:    time.Second * 60,
        HeartbeatTimeout:       time.Second * 10,
        WaitForCancellation:    false,
}
ctx = workflow.WithActivityOptions(ctx, ao)

var result string
err := workflow.ExecuteActivity(ctx, SimpleActivity, value).Get(ctx, &result)
if err != nil {
        return err
}
```

Let's take a look at each component of this call.

                                                 |




















## How to call Timer APIs

- `workflow.Now()` This is a replacement for `time.Now()`.
- `workflow.Sleep()` This is a replacement for `time.Sleep()`.

## How to use a Data Converter

## How to wrap errors

## How to write tests

## How to use debugging tools



### What features are available to Go-based Workflows?

The following Temporal Go SDK features a

## How to use loggers?


- `workflow.GetLogger()` This is to ensure that the provided logger does not duplicate logs during a replay.


## How to create a Session


## How to use a Side Effect in a Workflow?



## SDK wrapped Go Channels



## How to Signal a Workflow Execution

Inside Workflow code you can also signal other workflows using their workflow type using `SignalExternalWorkflow`:

```go
// Send 10 signals to PHP workflow
for i := 0; i < 10; i++ {
    err :=  workflow.SignalExternalWorkflow(ctx, "simple-workflow-php", "", "goMessage", "Hello from Go workflow: "+strconv.Itoa(i)).Get(ctx, nil)
}
```

Here we are sending a signal to a Workflow with type "simple-workflow-php" and signal name "goMessage".

See our [Signals docs](https://docs.temporal.io/docs/go/signals) and [Temporal Polyglot example](https://github.com/tsurdilo/temporal-polyglot) for more.






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



## How to complete an Activity asynchronously


This is like a callback.
There are certain scenarios when you want to defer completing an Activity until much later.
For example, you might have an application that requires user input in order to complete
the Activity.

You could do this with a polling mechanism, but a simpler and less
resource-intensive implementation is to _asynchronously_ complete a Temporal Activity.

There are two parts to implementing an asynchronously completed Activity:

1. The Activity provides the information necessary for completion from an external system and notifies
   the Temporal service that it is waiting for that outside callback (with `activity.ErrResultPending`).
2. The external service calls the Temporal service to complete the Activity (with `client.CompleteActivity`).

The following example demonstrates the first part:

```go
// Retrieve the Activity information needed to asynchronously complete the Activity.
activityInfo := activity.GetInfo(ctx)
taskToken := activityInfo.TaskToken

// Send the taskToken to the external service that will complete the Activity.
...

// Return from the Activity a function indicating that Temporal should wait for an async completion
// message.
return "", activity.ErrResultPending
```

The following code demonstrates how to complete the Activity successfully:

```go
// Instantiate a Temporal service client.
// The same client can be used to complete or fail any number of Activities.
// The client is a heavyweight object that should be created once per process.
serviceClient, err := client.NewClient(client.Options{})

// Complete the Activity.
client.CompleteActivity(context.Background(), taskToken, result, nil)
```

To fail the Activity, you would do the following:

```go
// Fail the Activity.
client.CompleteActivity(context.Background(), taskToken, nil, err)
```

Following are the parameters of the `CompleteActivity` function:

- `taskToken`: The value of the binary `TaskToken` field of the `ActivityInfo` struct retrieved inside
  the Activity.
- `result`: The return value to record for the Activity. The type of this value must match the type
  of the return value declared by the Activity function.
- `err`: The error code to return if the Activity terminates with an error.

If `error` is not null, the value of the `result` field is ignored.


### How to provide custom Activity Options

An instance of `ActivityOptions` can be obtained from the `go.temporal.io/sdk/workflow` package.
  The `ActivityOptions ` instance should then be added to the instance of `workflow.Context`, using `workflow.WithActivityOptions()`.
  The instance of `workflow.Context` is then passed to the `ExecuteActivity()` call.

```go
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
  // ...
  activityOptions := workflow.ActivityOptions{}
  ctx = workflow.WithActivityOptions(ctx, activityOptions)
  future := workflow.ExecuteActivity(ctx, YourActivityDefinition, yourActivityParam)
  // ...
}
```

Any fields of the custom instance that do not have values specified, will inherit their values from default settings or Workflow Execution.


Before calling `workflow.ExecuteActivity()`, you must configure `ActivityOptions` for the
invocation. These options customize various execution timeouts, and are passed in by creating a child
context from the initial context and overwriting the desired values. The child context is then passed
into the `workflow.ExecuteActivity()` call. If multiple Activities are sharing the same option
values, then the same context instance can be used when calling `workflow.ExecuteActivity()`.

By default, Temporal retries failing Activities with these default values (exponential backoff starting from 1 second going up to 100 seconds):

- `InitialInterval` of 1 second
- `BackoffCoefficient` of 2.0
- `MaximumInterval` of 100 seconds (100x multiple of `InitialInterval`)
- `MaximumAttempts` of 0 (in other words, unlimited retries)

You can refer to [our Retry Policy documentation](https://docs.temporal.io/docs/go/retries) for guidance on customizing your retry behavior.

### Activity timeouts

There can be various kinds of timeouts associated with an Activity. Temporal guarantees that Activities
are executed _at least once_, so an Activity either succeeds or fails with one of the following timeouts:

| Timeout                  | Description                                                                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `StartToCloseTimeout`    | Maximum time that a worker can take to process a task after it has received the task.                                                                                                                |
| `ScheduleToStartTimeout` | Time a task can wait to be picked up by an Activity worker after a Workflow schedules it. If there are no workers available to process this task for the specified duration, the task will time out. |
| `ScheduleToCloseTimeout` | Time a task can take to complete after it is scheduled by a Workflow. This is usually greater than the sum of `StartToClose` and `ScheduleToStart` timeouts.                                         |
| `HeartbeatTimeout`       | If a task doesn't heartbeat to the Temporal service for this duration, it will be considered to have failed. This is useful for long-running tasks.

## How to provide custom Workflow Options



## How to invoke cron-based Workflow Executions

import DistributedCron from '../shared/distributed-cron.md'

<DistributedCron docUrl="https://pkg.go.dev/go.temporal.io/sdk/internal#StartWorkflowOptions">

```go
	workflowOptions := client.StartWorkflowOptions{
		ID:           workflowID,
		TaskQueue:    "cron",
		CronSchedule: "* * * * *",
	}

	we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, cron.SampleCronWorkflow)
```

You can [check our Go Samples](https://github.com/temporalio/samples-go/tree/master/cron) for example code.

</DistributedCron>

## Retrieve last successful result

Sometimes it is useful to obtain the progress of previous successful runs.
This is supported by two new APIs in the Go SDK:
`HasLastCompletionResult` and `GetLastCompletionResult`. Below is an example of how
to use this in Go:

```go
func CronWorkflow(ctx workflow.Context) (CronResult, error) {
    startTimestamp := time.Time{} // By default start from 0 time.
    if workflow.HasLastCompletionResult(ctx) {
        var progress CronResult
        if err := workflow.GetLastCompletionResult(ctx, &progress); err == nil {
            startTimestamp = progress.LastSyncTimestamp
        }
    }
    endTimestamp := workflow.Now(ctx)

    // Process work between startTimestamp (exclusive), endTimestamp (inclusive).
    // Business logic implementation goes here.

    result := CronResult{LastSyncTimestamp: endTimestamp}
    return result, nil
}
```

Note that this works even if one of the cron schedule runs failed. The
next schedule will still get the last successful result if it ever successfully
completed at least once. For example, for a daily cron Workflow, if the first day
run succeeds and the second day fails, then the third day run will still get
the result from first day's run using these APIs.
