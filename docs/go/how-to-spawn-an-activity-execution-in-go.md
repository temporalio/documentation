---
id: how-to-spawn-an-activity-execution-in-go
title: How to spawn an Activity Execution in Go
sidebar_label: Activity Execution
description: Use the `ExecuteActivity()` API call available from the `go.temporal.io/sdk/workflow` package.
tags:
  - developer-guide
  - go
---

<!--TODO
import RelatedReadList from '../components/RelatedReadList.js'
-->

To spawn an Activity Execution, use the [`ExecuteActivity()`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/workflow#ExecuteActivity) API call inside your Workflow Definition.
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

### ExecuteActivity call

The first parameter in the call is the required `workflow.Context` object. This type is a copy of
`context.Context` with the `Done()` method returning `workflow.Channel` instead of the native Go `chan`.

The second parameter is the function that we registered as an Activity function. This parameter can
also be a string representing the name of the Activity function. The benefit of passing
in the actual function object is that the framework can validate Activity parameters.

The remaining parameters are passed to the Activity as part of the call. In our example, we have a
single parameter: `value`. This list of parameters must match the list of parameters declared by
the Activity function. The Temporal Go SDK will validate this.

The method call returns immediately and returns a `workflow.Future`. This allows you to execute more
code without having to wait for the scheduled Activity to complete.

When you are ready to process the results of the Activity, call the `Get()` method on the future
object returned. The parameters to this method are the `ctx` object we passed to the
`workflow.ExecuteActivity()` call and an output parameter that will receive the output of the
Activity. The type of the output parameter must match the type of the return value declared by the
Activity function. The `Get()` method will block until the Activity completes and results are
available.

You can retrieve the result value returned by `workflow.ExecuteActivity()` from the future and use
it like any normal result from a synchronous function call. The following sample code demonstrates how
you can use the result if it is a string value:

```go
future := workflow.ExecuteActivity(ctx, ActivityName, param1)

var result string
if err := future.Get(ctx, &result); err != nil {
        return err
}

switch result {
case "apple":
        // Do something.
case "banana":
        // Do something.
default:
        return err
}
```

In this example, we called the `Get()` method on the returned future immediately after `workflow.ExecuteActivity()`.
However, this is not necessary. If you want to execute multiple Activities in parallel, you can
repeatedly call `workflow.ExecuteActivity()`, store the returned futures, and then wait for all
Activities to complete by calling the `Get()` methods of the future at a later time.

To implement more complex wait conditions on returned future objects, use `workflow.Selector`. Learn more on the [Go SDK Selectors](https://docs.temporal.io/docs/go/selectors) page.
