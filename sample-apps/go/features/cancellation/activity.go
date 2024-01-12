// dacx
package cancellation

import (
	"context"
	"time"

	"go.temporal.io/sdk/activity"
)

type Activities struct{}

// ActivityToBeCanceled is the Activity that will respond to the Cancellation Request
func (a *Activities) ActivityToBeCanceled(ctx context.Context) (string, error) {
	logger := activity.GetLogger(ctx)
	logger.Info("Activity started, to cancel the Workflow Execution and this Activity, use 'go run cancel/cancel/main.go " +
		"-w <WorkflowID>' or use the CLI: 'temporal workflow cancel --workflow-id <WorkflowID>'")
	// A for select statement is a common approach to listening for a Cancellation is an Activity
	for {
		select {
		case <-time.After(1 * time.Second):
			logger.Info("Heartbeating...")
			activity.RecordHeartbeat(ctx, "")
		// Listen for ctx.Done() to know if a Cancellation Request has propagated to the Activity.
		case <-ctx.Done():
			logger.Info("This Activity is canceled!")
			return "I am canceled by Done", nil
		}
	}
}

func (a *Activities) CleanupActivity(ctx context.Context) error {
	logger := activity.GetLogger(ctx)
	logger.Info("Cleanup Activity running.")
	return nil
}

func (a *Activities) ActivityToBeSkipped(ctx context.Context) error {
	logger := activity.GetLogger(ctx)
	logger.Info("This Activity is skipped due to cancellation.")
	return nil
}

/* @dacx
id: handle-cancellation-request-in-activity
title: How to handle a Cancellation in an Activity in Go
label: Handle Cancellation in an Activity
description: Listen for ctx.Done() to react to a Cancellation Request in an Activity
lines: 13-14, 18-30
@dacx */
