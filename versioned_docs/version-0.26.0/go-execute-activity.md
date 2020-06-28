---
id: go-execute-activity
title: Executing Activities
---

The primary responsibility of a workflow implementation is to schedule activities for execution. The
most straightforward way to do this is via the library method `workflow.ExecuteActivity`. The following
sample code demonstrates making this call:

```go
ao := workflow.ActivityOptions{
        TaskList:               "sampleTaskList",
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

## Activity options

Before calling `workflow.ExecuteActivity()`, you must configure `ActivityOptions` for the
invocation. These options customize various execution timeouts, and are passed in by creating a child
context from the initial context and overwriting the desired values. The child context is then passed
into the `workflow.ExecuteActivity()` call. If multiple activities are sharing the same option
values, then the same context instance can be used when calling `workflow.ExecuteActivity()`.

## Activity timeouts

There can be various kinds of timeouts associated with an activity. Temporal guarantees that activities
are executed *at most once*, so an activity either succeeds or fails with one of the following timeouts:

Timeout | Description
--- | ---
`StartToCloseTimeout` | Maximum time that a worker can take to process a task after it has received the task.
`ScheduleToStartTimeout` | Time a task can wait to be picked up by an activity worker after a workflow schedules it. If there are no workers available to process this task for the specified duration, the task will time out.
`ScheduleToCloseTimeout` | Time a task can take to complete after it is scheduled by a workflow. This is usually greater than the sum of `StartToClose` and `ScheduleToStart` timeouts.
`HeartbeatTimeout` | If a task doesn't heartbeat to the Temporal service for this duration, it will be considered to have failed. This is useful for long-running tasks.

## ExecuteActivity call

The first parameter in the call is the required `workflow.Context` object. This type is a copy of
`context.Context` with the `Done()` method returning `workflow.Channel` instead of the native Go `chan`.

The second parameter is the function that we registered as an activity function. This parameter can
also be a string representing the fully qualified name of the activity function. The benefit of passing
in the actual function object is that the framework can validate activity parameters.

The remaining parameters are passed to the activity as part of the call. In our example, we have a
single parameter: `value`. This list of parameters must match the list of parameters declared by
the activity function. The Temporal client library will validate this.

The method call returns immediately and returns a `workflow.Future`. This allows you to execute more
code without having to wait for the scheduled activity to complete.

When you are ready to process the results of the activity, call the `Get()` method on the future
object returned. The parameters to this method are the `ctx` object we passed to the
`workflow.ExecuteActivity()` call and an output parameter that will receive the output of the
activity. The type of the output parameter must match the type of the return value declared by the
activity function. The `Get()` method will block until the activity completes and results are
available.

You can retrieve the result value returned by `workflow.ExecuteActivity()` from the future and use
it like any normal result from a synchronous function call. The following sample code demonstrates how
you can use the result if it is a string value:

```go
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
However, this is not necessary. If you want to execute multiple activities in parallel, you can
repeatedly call `workflow.ExecuteActivity()`, store the returned futures, and then wait for all
activities to complete by calling the `Get()` methods of the future at a later time.

To implement more complex wait conditions on returned future objects, use the `workflow.Selector` class.
