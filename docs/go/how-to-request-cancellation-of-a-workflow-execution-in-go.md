---
id: how-to-request-cancellation-of-a-workflow-execution-in-go
title: How to request Cancellation of a Workflow Execution in Go
description: Use the `CancelWorkflow` API to cancel a Workflow Execution using its Id.
tags:
  - developer-guide
  - go
---

Use the `CancelWorkflow` API to cancel a Workflow Execution using its Id.

<!--SNIPSTART samples-go-cancellation-cancel-workflow-execution-trigger-->
[cancellation/cancel/main.go](https://github.com/temporalio/samples-go/blob/master/cancellation/cancel/main.go)
```go
func main() {
	var workflowID string
	flag.StringVar(&workflowID, "wid", "workflowID-to-cancel", "workflowID of the Workflow Execution to be canceled.")
	flag.Parse()

	if workflowID == "" {
		flag.PrintDefaults()
		return
	}

	// The client is a heavyweight object that should be created once per process.
	c, err := client.NewClient(client.Options{
		HostPort: client.DefaultHostPort,
	})
	if err != nil {
		log.Fatalln("Unable to create client", err)
	}
	defer c.Close()

	err = c.CancelWorkflow(context.Background(), workflowID, "")
	if err != nil {
		log.Fatalln("Unable to cancel Workflow Execution", err)
	}
	log.Println("Workflow Execution cancelled", "WorkflowID", workflowID)
}

```
<!--SNIPEND-->

#### How to clean up after a Workflow is cancelled

Workflow Definitions can be written to handle execution cancellation requests with Go's `defer` and the `workflow.NewDisconnectedContext` API.
In the Workflow Definition below, there is a special Activity that handles clean up should the execution be cancelled.

<!--SNIPSTART samples-go-cancellation-workflow-definition-->
[cancellation/workflow.go](https://github.com/temporalio/samples-go/blob/master/cancellation/workflow.go)
```go
// YourWorkflow is a Workflow Definition that shows how it can be canceled.
func YourWorkflow(ctx workflow.Context) error {
	ao := workflow.ActivityOptions{
		StartToCloseTimeout: 30 * time.Minute,
		HeartbeatTimeout:    5 * time.Second,
		WaitForCancellation: true,
	}
	ctx = workflow.WithActivityOptions(ctx, ao)
	logger := workflow.GetLogger(ctx)
	logger.Info("cancel workflow started")
	var a *Activities // Used to call Activities by function pointer
	defer func() {
		
		if !errors.Is(ctx.Err(), workflow.ErrCanceled) {
			return
		}
		
		// When the Workflow is canceled, it has to get a new disconnected context to execute any Activities
		newCtx, _ := workflow.NewDisconnectedContext(ctx)
		err := workflow.ExecuteActivity(newCtx, a.CleanupActivity).Get(ctx, nil)
		if err != nil {
			logger.Error("CleanupActivity failed", "Error", err)
		}
	}()

	var result string
	err := workflow.ExecuteActivity(ctx, a.ActivityToBeCanceled).Get(ctx, &result)
	logger.Info(fmt.Sprintf("ActivityToBeCanceled returns %v, %v", result, err))

	err = workflow.ExecuteActivity(ctx, a.ActivityToBeSkipped).Get(ctx, nil)
	logger.Error("Error from ActivityToBeSkipped", "Error", err)

	logger.Info("Workflow Execution complete.")

	return nil
}
```
<!--SNIPEND-->
