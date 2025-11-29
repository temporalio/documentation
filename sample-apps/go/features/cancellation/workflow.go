// @@@SNIPSTART go-features-cancellation-workflow
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

// @@@SNIPEND
