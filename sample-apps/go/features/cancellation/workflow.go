// dacx
package cancellation

import (
	"errors"
	"fmt"
	"time"

	"go.temporal.io/sdk/workflow"
)

const WorkflowId = "example-cancellation-workflow"
const TaskQueueName = "cancellation"

// YourWorkflow is a Workflow Definition that shows how it can be canceled.
func YourWorkflow(ctx workflow.Context) error {
	logger := workflow.GetLogger(ctx)
	var a *Activities
	activityOptions := workflow.ActivityOptions{
		StartToCloseTimeout: 30 * time.Minute,
		HeartbeatTimeout:    5 * time.Second,
		// Set WaitForCancellation to true to have the Workflow wait to return
		// until all in progress Activities have completed, failed, or accepted the Cancellation.
		WaitForCancellation: true,
	}
	defer func() {
		// This logic ensures cleanup only happens if there is a Cancelation error
		if !errors.Is(ctx.Err(), workflow.ErrCanceled) {
			return
		}
		// For the Workflow to execute an Activity after it receives a Cancellation Request
		// It has to get a new disconnected context
		newCtx, _ := workflow.NewDisconnectedContext(ctx)
		// This Activity is only executed if
		err := workflow.ExecuteActivity(newCtx, a.CleanupActivity).Get(ctx, nil)
		if err != nil {
			logger.Error("CleanupActivity failed", "Error", err)
		}
	}()
	ctx = workflow.WithActivityOptions(ctx, activityOptions)
	var result string
	err := workflow.ExecuteActivity(ctx, a.ActivityToBeCanceled).Get(ctx, &result)
	logger.Info(fmt.Sprintf("ActivityToBeCanceled returns %v, %v", result, err))
	// This call to execute the Activity is expected to return an error "canceled".
	// And the Activity Execution is skipped.
	err = workflow.ExecuteActivity(ctx, a.ActivityToBeSkipped).Get(ctx, nil)
	logger.Error("Error from ActivityToBeSkipped", "Error", err)
	// Return any errors.
	// If a CanceledError is returned, the Workflow changes to a Canceled state.
	return err
}

/*
**How to handle a Cancellation in a Workflow in Go.**

Workflow Definitions can be written to handle execution cancellation requests with Go's `defer` and the `workflow.NewDisconnectedContext` API.
In the Workflow Definition, there is a special Activity that handles clean up should the execution be cancelled.

If the Workflow receives a Cancellation Request, but all Activities gracefully handle the Cancellation, and/or no Activities are skipped then the Workflow status will be Complete.
It is completely up to the needs of the business process and your use case which determines whether you want to return the Cancellation error to show a Canceled status or Complete status regardless of whether a Cancellation has propagated to and/or skipped Activities.
*/

/* @dacx
id: handle-cancellation-request-workflow
title: Handle Cancellation in Workflow
label: Handle Cancellation in Workflow
description: You can design your Workflow to run clean up Activities, and change to a Canceled status when a Cancellation Request is received.
lines: 15-16, 19, 21-39, 42, 44-46, 48-61
@dacx */
