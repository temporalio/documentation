// dacx
package main

import (
	"context"
	"log"

	"go.temporal.io/sdk/client"

	"documentation-samples-go/features/cancellation"
)

func main() {
	temporalClient, err := client.Dial(client.Options{
		HostPort: client.DefaultHostPort,
	})
	if err != nil {
		log.Fatalln("Unable to create client", err)
	}
	defer temporalClient.Close()
	// Call the CancelWorkflow API to cancel a Workflow
	// In this call we are relying on the Workflow Id only.
	// But a Run Id can also be supplied to ensure the correct Workflow is Canceled.
	err = temporalClient.CancelWorkflow(context.Background(), cancellation.WorkflowId, "")
	if err != nil {
		log.Fatalln("Unable to cancel Workflow Execution", err)
	}
	log.Println("Workflow Execution cancelled", "WorkflowID", cancellation.WorkflowId)
}

/* @dacx
id: request-cancellation-from-a-client
title: How to request Cancellation of a Workflow and Activities in Go
label: Request Cancellation
description: Use the Temporal Client's CancelWorkflow API to send a Cancellation Request to the Workflow.
lines: 13, 21-27, 29
@dacx */
