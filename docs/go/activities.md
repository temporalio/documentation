---
id: activities
title: Activities in Go
sidebar_label: Activities
---

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

To implement more complex wait conditions on returned future objects, use `workflow.Selector`. Learn more on the [Go SDK Selectors](https://docs.temporal.io/go/selectors) page.

## Asynchronous Activity Completion

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
