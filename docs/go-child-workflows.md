---
id: go-child-workflows
title: Child Workflows
---

`workflow.ExecuteChildWorkflow` enables the scheduling of other Workflows from within a Workflow's
implementation. The parent Workflow has the ability to monitor and impact the lifecycle of the child
Workflow, similar to the way it does for an activity that it invoked.

```go
cwo := workflow.ChildWorkflowOptions{
        // Do not specify WorkflowId if you want Temporal to generate a unique Id for the child execution.
        WorkflowId:                   "BID-SIMPLE-CHILD-WORKFLOW",
        ExecutionStartToCloseTimeout: time.Minute * 30,
}
ctx = workflow.WithChildWorkflowOptions(ctx, cwo)

var result string
future := workflow.ExecuteChildWorkflow(ctx, SimpleChildWorkflow, value)
if err := future.Get(ctx, &result); err != nil {
        workflow.GetLogger(ctx).Error("SimpleChildWorkflow failed.", zap.Error(err))
        return err
}
```
Let's take a look at each component of this call.

Before calling `workflow.ExecuteChildworkflow()`, you must configure `ChildWorkflowOptions` for the
invocation. These options customize various execution timeouts, and are passed in by creating a child
context from the initial context and overwriting the desired values. The child context is then passed
into the `workflow.ExecuteChildWorkflow()` call. If multiple activities are sharing the same option
values, then the same context instance can be used when calling `workflow.ExecuteChildworkflow()`.

The first parameter in the call is the required `workflow.Context` object. This type is a copy of
`context.Context` with the `Done()` method returning `workflow.Channel` instead of the native Go `chan`.

The second parameter is the function that we registered as a Workflow function. This parameter can
also be a string representing the fully qualified name of the Workflow function. The benefit of this
is that when you pass in the actual function object, the framework can validate Workflow parameters.

The remaining parameters are passed to the Workflow as part of the call. In our example, we have a
single parameter: `value`. This list of parameters must match the list of parameters declared by
the Workflow function.

The method call returns immediately and returns a `workflow.Future`. This allows you to execute more
code without having to wait for the scheduled Workflow to complete.

When you are ready to process the results of the Workflow, call the `Get()` method on the returned future
object. The parameters to this method is the `ctx` object we passed to the
`workflow.ExecuteChildWorkflow()` call and an output parameter that will receive the output of the
Workflow. The type of the output parameter must match the type of the return value declared by the
Workflow function. The `Get()` method will block until the Workflow completes and results are
available.

The `workflow.ExecuteChildWorkflow()` function is similar to `workflow.ExecuteActivity()`. All of the
patterns described for using `workflow.ExecuteActivity()` apply to the `workflow.ExecuteChildWorkflow()`
function as well.

When a parent Workflow is cancelled by the user, the child Workflow can be cancelled or abandoned
based on a configurable child policy.
