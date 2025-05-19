package yourapp

import (
	"time"

	"go.temporal.io/sdk/workflow"
)

/*
The first parameter of a Go-based Workflow Definition must be of the [`workflow.Context`](https://pkg.go.dev/go.temporal.io/sdk/workflow#Context) type.
It is used by the Temporal Go SDK to pass around Workflow Execution context, and virtually all the Go SDK APIs that are callable from the Workflow require it.
It is acquired from the [`go.temporal.io/sdk/workflow`](https://pkg.go.dev/go.temporal.io/sdk/workflow) package.

The `workflow.Context` entity operates similarly to the standard `context.Context` entity provided by Go.
The only difference between `workflow.Context` and `context.Context` is that the `Done()` function, provided by `workflow.Context`, returns `workflow.Channel` instead of the standard Go `chan`.

Additional parameters can be passed to the Workflow when it is invoked.
A Workflow Definition may support multiple custom parameters, or none.
These parameters can be regular type variables or safe pointers.
However, the best practice is to pass a single parameter that is of a `struct` type, so there can be some backward compatibility if new parameters are added.

All Workflow Definition parameters must be serializable and can't be channels, functions, variadic, or unsafe pointers.
*/

// YourWorkflowParam is the object passed to the Workflow.
type YourWorkflowParam struct {
	WorkflowParamX string
	WorkflowParamY int
}

/*
A Go-based Workflow Definition can return either just an `error` or a `customValue, error` combination.
Again, the best practice here is to use a `struct` type to hold all custom values.
*/

// YourWorkflowResultObject is the object returned by the Workflow.
type YourWorkflowResultObject struct {
	WFResultFieldX string
	WFResultFieldY int
}

/*
In the Temporal Go SDK programming model, a [Workflow Definition](/concepts/what-is-a-workflow-definition) is an exportable function.
Below is an example of a basic Workflow Definition.
*/

// YourSimpleWorkflowDefintiion is the most basic Workflow Defintion.
func YourSimpleWorkflowDefinition(ctx workflow.Context) error {
	// ...
	return nil
}

// YourWorkflowDefinition is your custom Workflow Definition.
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (*YourWorkflowResultObject, error) {
	/*
	   To spawn an [Activity Execution](/concepts/what-is-an-activity-execution), call [`ExecuteActivity()`](https://pkg.go.dev/go.temporal.io/sdk/workflow#ExecuteActivity) inside your Workflow Definition.
	   The API is available from the [`go.temporal.io/sdk/workflow`](https://pkg.go.dev/go.temporal.io/sdk/workflow) package.
	   The `ExecuteActivity()` API call requires an instance of `workflow.Context`, the Activity function name, and any variables to be passed to the Activity Execution.
	*/
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
	var activityResult YourActivityResultObject
	/*
	   	The Activity function name can be provided as a variable object (no quotations) or as a string.
	       The benefit of passing the actual function object is that the framework can validate the parameters against the Activity Definition.
	       The `ExecuteActivity` call returns a Future, which can be used to get the result of the Activity Execution.
	*/
	err := workflow.ExecuteActivity(ctx, a.YourActivityDefinition, activityParam).Get(ctx, &activityResult)
	if err != nil {
		return nil, err
	}
	// Execute another Activity that doesn't take params and wait for the result.
	var infoResult *YourActivityResultObject
	err = workflow.ExecuteActivity(ctx, a.GetInfo).Get(ctx, &infoResult)
	if err != nil {
		return nil, err
	}
	// Execute another Activity that takes params, but doesn't return data.
	infoParam := YourActivityParam{
		ActivityParamX: infoResult.ResultFieldX,
		ActivityParamY: infoResult.ResultFieldY,
	}
	err = workflow.ExecuteActivity(ctx, a.PrintInfo, infoParam).Get(ctx, nil)
	if err != nil {
		return nil, err
	}
	// Make the results of the Workflow Execution available.
	workflowResult := &YourWorkflowResultObject{
		WFResultFieldX: activityResult.ResultFieldX,
		WFResultFieldY: activityResult.ResultFieldY,
	}
	return workflowResult, nil
}

/*
A Workflow Definition written in Go can return both a custom value and an error.
However, it's not possible to receive both a custom value and an error in the calling process, as is normal in Go.
The caller will receive either one or the other.
Returning a non-nil `error` from a Workflow indicates that an error was encountered during its execution and the Workflow Execution should be terminated, and any custom return values will be ignored by the system.
*/

/*
In Go, Workflow Definition code cannot directly do the following:

- Iterate over maps using `range`, because with `range` the order of the map's iteration is randomized.
  Instead you can collect the keys of the map, sort them, and then iterate over the sorted keys to access the map.
  This technique provides deterministic results.
  You can also use a Side Effect or an Activity to process the map instead.
- Call an external API, conduct a file I/O operation, talk to another service, etc. (Use an Activity for these.)

The Temporal Go SDK has APIs to handle equivalent Go constructs:

- `workflow.Now()` This is a replacement for `time.Now()`.
- `workflow.Sleep()` This is a replacement for `time.Sleep()`.
- `workflow.GetLogger()` This ensures that the provided logger does not duplicate logs during a replay.
- `workflow.Go()` This is a replacement for the `go` statement.
- `workflow.Channel` This is a replacement for the native `chan` type.
  Temporal provides support for both buffered and unbuffered channels.
- `workflow.Selector` This is a replacement for the `select` statement.
  Learn more on the [Go SDK Selectors](https://legacy-documentation-sdks.temporal.io/go/selectors) page.
- `workflow.Context` This is a replacement for `context.Context`.
  See [Tracing](/go/tracing) for more information about context propagation.
*/

/* @dacx
id: how-to-develop-a-workflow-definition-in-go
title: How to develop a Workflow Definition in Go
label: Workflow Definition
description: In the Temporal Go SDK programming model, a Workflow Definition is an exportable function.
tags:
- go sdk
- code sample
- workflow
lines: 1-7, 42-51
@dacx */

/* @dacx
id: how-to-define-workflow-parameters-in-go
title: How to define Workflow parameters in Go
label: Workflow parameters
description: A Go-based Workflow Definition must accept workflow.Context and may support multiple custom parameters.
tags:
- go sdk
- code sample
- workflow
lines:  1-29, 53-54, 105
@dacx */

/* @dacx
id: how-to-define-workflow-return-values-in-go
title: How to define Workflow return values in Go
label: Workflow return values
description: A Go-based Workflow Definition can return either just an error or a customValue, error combination.
tags:
- go sdk
- code sample
- workflow
lines: 1-7, 31-40, 53-54, 96-112
@dacx */

/* @dacx
id: how-to-handle-workflow-logic-requirements-in-go
title: How to handle Workflow logic requirements in Go
label: Workflow logic requirements
description: In Go, Workflow Definition code cannot directly do a few things to adhere to deterministic constraints.
tags:
- go sdk
- code sample
- workflow
lines: 114-135
@dacx */

/* @dacx
id: how-to-spawn-an-activity-execution-in-go
title: How to spawn an Activity Execution in Go
label: Activity Execution
description: Use the ExecuteActivity() API call available from the go.temporal.io/sdk/workflow package.
tags:
- go sdk
- code sample
- workflow
lines: 54-83, 105
@dacx */
