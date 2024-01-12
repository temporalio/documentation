package workflows

// dacx
import (
	"time"

	"go.temporal.io/sdk/workflow"

	"documentation-samples-go/dev-guide/chapters/activity_errors/activities"
	"documentation-samples-go/dev-guide/chapters/activity_errors/common"
)

var a *activities.Activities

// BackgroundCheck is your custom Workflow Definition.
func BackgroundCheck(ctx workflow.Context, param common.PII) (string, error) {

	logger := workflow.GetLogger(ctx)
	logger.Info("BackgroundCheck workflow started.", "Name", param.FirstName, param.LastName)

	// Set the minimum required option & rely on a default Retry Policy
	// Always set a Start-To-Close Timeout
	standardActivityOptions := workflow.ActivityOptions{
		StartToCloseTimeout: 30 * time.Second,
	}
	standardCtx := workflow.WithActivityOptions(ctx, standardActivityOptions)

	// Charge the credit card
	var chargeResult string
	err := workflow.ExecuteActivity(standardCtx, a.ChargeCreditCardActivity, param).Get(ctx, &chargeResult)
	if err != nil {
		return "", err
	}

	// Define different Activity Options for the SSN Trace and Federal Criminal Search Activities
	maxTimeActivityOptions := workflow.ActivityOptions{
		StartToCloseTimeout:    30 * time.Second,
		ScheduleToCloseTimeout: 5 * time.Minute,
	}
	maxTimeCtx := workflow.WithActivityOptions(ctx, maxTimeActivityOptions)

	// Run the SSN Trace
	var ssnTraceResult string
	err = workflow.ExecuteActivity(maxTimeCtx, a.SSNTraceActivity, param).Get(ctx, &ssnTraceResult)
	if err != nil {
		refund(standardCtx, param)
		// Return the error and fail the Workflow
		return "", err
	}

	// Run the Federal Criminal Search
	var federalSearchResult string
	err = workflow.ExecuteActivity(standardCtx, a.FederalCriminalSearchActivity, param).Get(ctx, &federalSearchResult)
	if err != nil {
		refund(standardCtx, param)
		// Return the error and fail the Workflow
		return "", err
	}

	return "pass", nil
}

func refund(ctx workflow.Context, param common.PII) error {
	// Refund the credit card
	var refundResult string
	err := workflow.ExecuteActivity(ctx, a.RefundCreditCardActivity, param).Get(ctx, &refundResult)
	if err != nil {
		return err
	}
	return nil
}

/*
For each credit card related Activity (Charge, Refund), we want Temporal to make sure this Activity is retried until it succeeds, no matter how much time is needed.
In a real-world scenario, the payment provider would likely provide an idempotency key to use inside your Activity to prevent duplicate charge requests.
For this situation, since a default Schedule-To-Close Timeout is unlimited, we only need to specify a Start-To-Close Timeout.

- A Start-To-Close is recommended as it constrains the time of each attempt to execute the Activity code.
- A Schedule-To-Close Timeout restricts the total time that the Activity code has to run successfully, regardless of how many times it takes to execute it.

![Schedule-To-Close Timeout vs Start-To-Close Timeout](/diagrams/schedule-vs-start-to-close.svg)

We can use the Start-To-Close Timeout to ensure that if the credit card charge attempt, or refund, takes longer than 30 seconds, the [Activity Task](/concepts/what-is-an-activity-task) times out and the code execution is eventually tried again.
And, there is no limit to how long the Activity code can retry for, as long as the Workflow Execution is still open.
*/

/*
For the SSN Trace and Federal Criminal Search Activities, we will impose some arbitray business requirements and require that each one completes within 1 minute.
In other words, if either Activity takes longer than 1 minute to complete, we will consider the whole background check to be a failure.

We can use the Schedule-To-Close Timeout to ensure that if the SSN Trace or Federal Criminal Search Activity takes longer than 1 minute, the [Activity Execution](/concepts/what-is-an-activity-execution) times out and an error is returned to the Workflow.
To fail the Workflow Execution (have a Failed status), all we need to do is return that error from the Workflow code.
*/
