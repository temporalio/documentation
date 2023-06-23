---
id: how-to-set-an-update-validator-function-in-go
title: How to set an Update validator function in go
sidebar_label: Validator function
description: Use the SetUpdateHandlerWithOptions API and pass it a validator function to validate inputs.
---

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/main/yourupdate/your_updatable_workflow_dacx.go">View source code</a>

```go
Validate certain aspects of the data sent to the Workflow using an Update validator function.
For instance, a counter Workflow might never want to accept a non-positive number.
Invoke the `SetUpdateHandlerWithOptions` API and define a validator function as one of the options.

When you use a Validator function, the Worker receives the Update first, before any Events are written to the Event History.
If the Update is rejected, it's not recorded in the Event History.
If it's accepted, the `WorkflowExecutionUpdateAccepted` Event occurs.
Afterwards, the Worker executes the accepted Update and, upon completion, a `WorkflowExecutionUpdateCompleted` Event gets written into the Event History.
The Validator function, unlike the Update Handler, can not change the state of the Workflow.

The platform treats a panic in the Validator function as a rejection of the Update."

// UpdatableWorkflowWithValidator is a Workflow Definition.
// This Workflow Definition has an Update handler that uses the isPositive() validator function.
// After setting the Update hanlder it sleeps for 1 minutue.
// Updates can be sent to the Workflow during this time.
func UpdatableWorkflowWithValidator(ctx workflow.Context, param WFParam) (WFResult, error) {
	counter := param.StartCount
	err := workflow.SetUpdateHandlerWithOptions(
		ctx, YourValidatedUpdateName,
		func(ctx workflow.Context, arg YourUpdateArg) (YourUpdateResult, error) {
// ...
		},
		// Set the isPositive validator.
		workflow.UpdateHandlerOptions{Validator: isPositive},
	)
	if err != nil {
		return WFResult{}, err
	}
// ...
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
```
