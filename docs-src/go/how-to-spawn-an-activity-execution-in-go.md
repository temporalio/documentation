---
id: how-to-spawn-an-activity-execution-in-go
title: How to spawn an Activity Execution in Go
sidebar_label: Activity Execution
description: Use the ExecuteActivity() API call available from the go.temporal.io/sdk/workflow package.
---

To spawn an [Activity Execution](/concepts/what-is-an-activity-execution), call [`ExecuteActivity()`](https://pkg.go.dev/go.temporal.io/workflow#ExecuteActivity) inside your Workflow Definition.
The API is available from the [`go.temporal.io/sdk/workflow`](https://pkg.go.dev/go.temporal.io/workflow) package.
The `ExecuteActivity()` API call requires an instance of `workflow.Context`, the Activity function name, and any variables to be passed to the Activity Execution.
The Activity function name can be provided as a variable object (no quotations) or as a string.
The benefit of passing the actual function object is that the framework can validate the parameters against the Activity Definition.
The `ExecuteActivity` call returns a Future, which can be used to get the result of the Activity Execution.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/add-go-schedule-sample/yourapp/your_workflow_definition_dacx.go">View source code</a>

```go
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (*YourWorkflowResultObject, error) {	
	// Set the options for the Activity Execution.
	// Either StartToClose Timeout OR ScheduleToClose is required.
	// Not specifying a Task Queue will default to the parent Workflow Task Queue.
	activityOptions := workflow.ActivityOptions{
		StartToCloseTimeout: 10 * time.Second,
	}
	ctx = workflow.WithActivityOptions(ctx, activityOptions)
	activityParam := YourActivityParam{
		ActivityParamX: param.WorkflowParamX,
		ActivityParamY: param.WorkflowParamY,
	}
	// Use a nil struct pointer to call Activities that are part of a struct.
	var a *YourActivityObject
	// Execute the Activity and wait for the result.
	var activityResult *YourActivityResultObject
	err := workflow.ExecuteActivity(ctx, a.YourActivityDefinition, activityParam).Get(ctx, &activityResult)
	if err != nil {
		return nil, err
	}
// ...
}
```
