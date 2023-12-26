// dacx
package workflows

import (
	"time"

	"go.temporal.io/sdk/workflow"

	"documentation-samples-go/dev-guide/chapters/setup/activities"
)

/*
In the Temporal Go SDK programming model, a [Workflow Definition](/concepts/what-is-a-workflow-definition) is an exportable function.
The `BackgroundCheck` function below is an example of a basic Workflow Definition.
*/

// BackgroundCheck is your custom Workflow Definition.
func BackgroundCheck(ctx workflow.Context, param string) (string, error) {
	// Define the Activity Execution options
	// StartToCloseTimeout or ScheduleToCloseTimeout must be set
	activityOptions := workflow.ActivityOptions{
		StartToCloseTimeout: 10 * time.Second,
	}
	ctx = workflow.WithActivityOptions(ctx, activityOptions)
	// Execute the Activity synchronously (wait for the result before proceeding)
	var ssnTraceResult string
	err := workflow.ExecuteActivity(ctx, activities.SSNTraceActivity, param).Get(ctx, &ssnTraceResult)
	if err != nil {
		return "", err
	}
	// Make the results of the Workflow available
	return ssnTraceResult, nil
}

/*
The first parameter of a Go-based Workflow Definition must be of the [`workflow.Context`](https://pkg.go.dev/go.temporal.io/sdk/workflow#Context) type.
It is used by the Temporal Go SDK to pass around Workflow Execution context, and virtually all the Go SDK APIs that are callable from the Workflow require it.
It is acquired from the [`go.temporal.io/sdk/workflow`](https://pkg.go.dev/go.temporal.io/sdk/workflow) package.

The `workflow.Context` entity operates similarly to the standard `context.Context` entity provided by Go.
The only difference between `workflow.Context` and `context.Context` is that the `Done()` function, provided by `workflow.Context`, returns `workflow.Channel` instead of the standard Go `chan`.

Additional parameters can be passed to the Workflow when it is invoked.
A Workflow Definition may support multiple custom parameters, or none.
All Workflow Definition parameters must be serializable and can't be channels, functions, variadic, or unsafe pointers.

To spawn an [Activity Execution](/concepts/what-is-an-activity-execution), call [`ExecuteActivity()`](https://pkg.go.dev/go.temporal.io/workflow#ExecuteActivity) inside your Workflow Definition.
The API is available from the [`go.temporal.io/sdk/workflow`](https://pkg.go.dev/go.temporal.io/workflow) package.
The `ExecuteActivity()` API call requires an instance of `workflow.Context`, the Activity function name, and any variables to be passed to the Activity Execution.

A Go-based Workflow Definition can return either just an `error` or a `customValue, error` combination.
We get into the best practices around Workflow params and returns in the one of the next sections.

In regards to code organization, we recommend organizing Workflow code together with other Workflow code.
For example, in a small project like this, it is still a best practice to have a dedicated file for each Workflow.
*/

/* @dacx
id: backgroundcheck-boilerplate-backgroundcheck-workflow
title: Boilerplate Workflow code
label: Workflow code
description: In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a `struct` method.
tags:
- go sdk
- developer guide
- workflow
- code sample
lines: 2-33
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-workflow-details
title: Boilerplate Workflow code
label: Workflow code
description: In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a `struct` method.
tags:
- go sdk
- workflow
- developer guide
lines: 35-56
@dacx */
