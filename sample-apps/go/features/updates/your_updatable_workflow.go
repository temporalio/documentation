// dacx
package updates

import (
	"fmt"
	"time"

	"go.temporal.io/sdk/workflow"
)

/*
In Go, you define an Update type, also known as an Update name, as a `string` value.
You must ensure the arguments and result are [serializable](/concepts/what-is-a-data-converter).
When sending and receiving the Update, use the Update name as an identifier.
The name does not link to the data type(s) sent with the Update.
Ensure that every Workflow listening to the same Update name can handle the same Update arguments.
*/

// YourUpdateName holds a string value used to correlate Updates.
const YourUpdateName = "your_update_name"

// YourValidatedUpdateName is the name of an Update.
const YourValidatedUpdateName = "your_validated_update_name"

// TaskQueueName is the name of the Task Queue.
const TaskQueueName = "your_updatable_workflow"

// YourUpdateWFID is the Id used for the YourUpdatableWorkflow execution.
const YourUpdateWFID = "updatable_workflow"

// YourValidUpdateWFID is the Id used for the UpdatableWorkflowWithValidator execution.
const YourValidUpdateWFID = "validating_updatable_workflow"

// YourUpdateArg defines the structure of the Update argument.
type YourUpdateArg struct {
	Add int
}

// YourUpdateResult defines the structure of the Update result.
type YourUpdateResult struct {
	Total int
}

// WFParam defines the structure of thw Workflow argument.
type WFParam struct {
	StartCount int
}

// WFResult defines the structure of the Worfklow result.
type WFResult struct {
	EndTotal int
}

/*
Register an Update handler for a given name using the [SetUpdateHandler](https://pkg.go.dev/go.temporal.io/sdk/workflow#SetUpdateHandler) API from the `go.temporal.io/sdk/workflow` package.
The handler function can accept multiple serializable input parameters, but we recommend using only a single parameter.
This practice enables you to add fields in future versions while maintaining backward compatibility.
You can optionally include a `workflow.Context` parameter in the first position of the function.
The function can return either a serializable value with an error or just an error.
The Workflow's WorkflowPanicPolicy configuration determines how panics are handled inside the Handler function.
WorkflowPanicPolicy is set in the Worker Options.

Update handlers, unlike Query handlers, can change Workflow state.
*/

// YourUpdatableWorkflow is a Workflow Definition.
// This Workflow sets an Update handler and then sleeps for a minute.
// After setting the Update hanlder it sleeps for 1 minutue.
// Updates can be sent to the Workflow during this time.
func YourUpdatableWorkflow(ctx workflow.Context, param WFParam) (WFResult, error) {
	counter := param.StartCount
	err := workflow.SetUpdateHandler(ctx, YourUpdateName, func(ctx workflow.Context, arg YourUpdateArg) (YourUpdateResult, error) {
		counter += arg.Add
		result := YourUpdateResult{
			Total: counter,
		}
		return result, nil
	})
	if err != nil {
		return WFResult{}, err
	}
	// Sleep for 60 seconds to have time to send Updates.
	workflow.Sleep(ctx, 60*time.Second)
	endTotal := WFResult{
		EndTotal: counter,
	}
	return endTotal, nil
}

/*
Validate certain aspects of the data sent to the Workflow using an Update validator function.
For instance, a counter Workflow might never want to accept a non-positive number.
Invoke the `SetUpdateHandlerWithOptions` API and define a validator function as one of the options.

When you use a Validator function, the Worker receives the Update first, before any Events are written to the Event History.
If the Update is rejected, it's not recorded in the Event History.
If it's accepted, the `WorkflowExecutionUpdateAccepted` Event occurs.
Afterwards, the Worker executes the accepted Update and, upon completion, a `WorkflowExecutionUpdateCompleted` Event gets written into the Event History.
The Validator function, unlike the Update Handler, can not change the state of the Workflow.

The platform treats a panic in the Validator function as a rejection of the Update."
*/

// UpdatableWorkflowWithValidator is a Workflow Definition.
// This Workflow Definition has an Update handler that uses the isPositive() validator function.
// After setting the Update hanlder it sleeps for 1 minutue.
// Updates can be sent to the Workflow during this time.
func UpdatableWorkflowWithValidator(ctx workflow.Context, param WFParam) (WFResult, error) {
	counter := param.StartCount
	err := workflow.SetUpdateHandlerWithOptions(
		ctx, YourValidatedUpdateName,
		func(ctx workflow.Context, arg YourUpdateArg) (YourUpdateResult, error) {
			counter += arg.Add
			result := YourUpdateResult{
				Total: counter,
			}
			return result, nil
		},
		// Set the isPositive validator.
		workflow.UpdateHandlerOptions{Validator: isPositive},
	)
	if err != nil {
		return WFResult{}, err
	}
	// Sleep for 60 seconds to have time to send Updates.
	workflow.Sleep(ctx, 60*time.Second)
	endTotal := WFResult{
		EndTotal: counter,
	}
	return endTotal, nil
}

// isPositive is a validator function.
// It returns an error if the int value is below 1.
// This function can not change the state of the Workflow.
// workflow.Context can be used to log
func isPositive(ctx workflow.Context, u YourUpdateArg) error {
	log := workflow.GetLogger(ctx)
	if u.Add < 1 {
		log.Debug("Rejecting non-positive number, positive integers only", "UpdateValue", u.Add)
		return fmt.Errorf("addend must be a positive integer (%v)", u.Add)
	}
	log.Debug("Accepting Update", "UpdateValue", u.Add)
	return nil
}

/* @dacx
id: how-to-define-an-update-in-go
title: How to define an Update in Go
label: Define Update
description: Define an Update by giving it a name to identify it.
tags:
- go sdk
- code sample
- workflow
- update
lines: 11-20, 70,72,81,88
@dacx */

/* @dacx
id: how-to-handle-an-update-in-go
title: How to handle an Update in Go
label: Handle Update
description: Use the SetUpateHandler API from the go.temporal.io/sdk/workflow package to register an Update Handler for a given name.
tags:
- go sdk
- code sample
- workflow
- update
lines: 54-65, 70-78, 88
@dacx */

/* @dacx
id: how-to-set-an-update-validator-function-in-go
title: How to set an Update validator function in go
label: Validator function
description: Use the SetUpdateHandlerWithOptions API and pass it a validator function to validate inputs.
tags:
- go sdk
- code sample
- workflow
- update
lines: 90-112, 118-124, 131-145
@dacx */
