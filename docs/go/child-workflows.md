---
id: child-workflows
title: Child Workflows
---

## Overview

If a Workflow Execution is started by another Workflow Execution, then it is considered a Child Workflow Execution.
The completion or failure of a Child Workflow Execution is reported to the Workflow Execution that started it (the Parent Workflow Execution).
The Parent Workflow Execution has the ability to monitor and impact the lifecycle of the Child Workflow Execution, similar to the way it does for Activities.

**When to use Child Workflows**

The following is a list of some of the more common reasons why you might want to do this:

- Execute code using different Workers.
- Enable execution from multiple Workflow Executions.
- Workaround Event History size limits.
- Create one-to-one mappings between a Workflow Id and some other resource.
- Execute some periodic logic.

**When not to use Child Workflows**

One of the main reasons you would not want to execute a Child Workflow is the lack of a shared state with the Parent Workflow Execution.
Parent Workflow Executions and Child Workflow Executions can communicate only through asynchronous [Signals](/docs/go/signals).
If the executing logic is tightly coupled between Workflow Executions, it may simply be easier to use a single Workflow Definition that can rely on a shared object's state.

## Example app

### Instructions

Clone the [Temporal Go samples repo](https://github.com/temporalio/samples-go).

<!--SNIPSTART samples-go-child-workflow-example-readme {"enable_source_link": false, "enable_code_block": false}-->
<!--SNIPEND-->

### Code

Use the `workflow.ExecuteChildWorkflow` to schedule Workflow Executions from within a currently executing Workflow.

<!--SNIPSTART samples-go-child-workflow-example-parent-workflow-definition-->
```go
package child_workflow

import (
	"go.temporal.io/sdk/workflow"
)

// SampleParentWorkflow is a Workflow Definition
// This Workflow Type demonstrates how to start a Child Workflow Execution from a Parent Workflow Execution.
// Each Child Workflow Execution starts a new Run.
// The Parent Workflow Execution is notified only after the completion of last Run of the Child Workflow Execution.
func SampleParentWorkflow(ctx workflow.Context) (string, error) {
	logger := workflow.GetLogger(ctx)

	cwo := workflow.ChildWorkflowOptions{}
	ctx = workflow.WithChildOptions(ctx, cwo)

	var result string
	err := workflow.ExecuteChildWorkflow(ctx, SampleChildWorkflow, "World").Get(ctx, &result)
	if err != nil {
		logger.Error("Parent execution received child execution failure.", "Error", err)
		return "", err
	}
	logger.Info("Parent execution completed.", "Result", result)
	return result, nil
}
```
<!--SNIPEND-->

```go
cwo := workflow.ChildWorkflowOptions{
        // Do not specify WorkflowID if you want Temporal to generate a unique Id for the child execution.
        WorkflowID:                   "BID-SIMPLE-CHILD-WORKFLOW",
        ExecutionStartToCloseTimeout: time.Minute * 30,
}
ctx = workflow.WithChildOptions(ctx, cwo)

var result string
future := workflow.ExecuteChildWorkflow(ctx, SimpleChildWorkflow, value)
if err := future.Get(ctx, &result); err != nil {
        workflow.GetLogger(ctx).Error("SimpleChildWorkflow failed.", zap.Error(err))
        return err
}
```

Let's take a look at each component of this call.

Before calling `workflow.ExecuteChildworkflow()`, you must configure `ChildWorkflowOptions` for the invocation.
These options customize various execution timeouts, and are passed in by creating a child context from the initial context and overwriting the desired values.
The child context is then passed into the `workflow.ExecuteChildWorkflow()` call.
If multiple Activities are sharing the same option values, then the same context instance can be used when calling `workflow.ExecuteChildworkflow()`.

The first parameter in the call is the required `workflow.Context` object.
This type is a copy of `context.Context` with the `Done()` method returning `workflow.Channel` instead of the native Go `chan`.

The second parameter is the function that we registered as a Workflow function.
This parameter can also be a string representing the fully qualified name of the Workflow function.
The benefit of this is that when you pass in the actual function object, the framework can validate Workflow parameters.

The remaining parameters are passed to the Workflow as part of the call.
In our example, we have a single parameter: `value`.
This list of parameters must match the list of parameters declared by the Workflow function.

The method call returns immediately and returns a `workflow.Future`.
This allows you to execute more code without having to wait for the scheduled Workflow to complete.

When you are ready to process the results of the Workflow, call the `Get()` method on the returned future object.
The parameters to this method is the `ctx` object we passed to the `workflow.ExecuteChildWorkflow()` call and an output parameter that will receive the output of the Workflow.
The type of the output parameter must match the type of the return value declared by the Workflow function.
The `Get()` method will block until the Workflow completes and results are available.

The `workflow.ExecuteChildWorkflow()` function is similar to `workflow.ExecuteActivity()`.
All of the patterns described for using `workflow.ExecuteActivity()` apply to the `workflow.ExecuteChildWorkflow()` function as well.

When a parent Workflow is cancelled by the user, the child Workflow can be cancelled or abandoned
based on a configurable child policy.
