// dacx
package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"

	"go.temporal.io/sdk/client"

	"documentation-samples-go/features/updates"
)

/*
Invoke the UpdateWorkflow() method on an instance of the [Go SDK Temporal Client](https://pkg.go.dev/go.temporal.io/sdk/client#Client) to dispatch an [Update](/concepts/what-is-an-update) to a Workflow Execution.

You must provide the Workflow Id, but specifying a Run Id is optional.
If you supply only the Workflow Id (and provide an empty string as the Run Id param), the currently running Workflow Execution receives the Update.
*/

func main() {
	// Exit if an argument is not provided.
	if len(os.Args) != 2 {
		log.Fatalln("Expected a single integer argument")
	}
	// Get the argument from the command line.
	arg := os.Args[1]
	// Ensure the argument is an integer and exit if it is not.
	n, err := strconv.Atoi(arg)
	if err != nil {
		fmt.Println("The argument must be an integer")
		os.Exit(1)
	}
	// Create a Temporal Client.
	temporalClient, err := client.Dial(client.Options{
		HostPort: client.DefaultHostPort,
	})
	if err != nil {
		log.Fatalln("Unable to create client", err)
	}
	defer temporalClient.Close()

	// Set the Update argument values.
	updateArg := updates.YourUpdateArg{
		Add: n,
	}
	// Call the UpdateWorkflow API.
	// A blank RunID means that the Update is routed to the most recent Workflow Run of the specified Workflow ID.
	updateHandle, err := temporalClient.UpdateWorkflow(context.Background(), client.UpdateWorkflowOptions{
		WorkflowID:   updates.YourUpdateWFID,
		UpdateName:   updates.YourUpdateName,
		WaitForStage: client.WorkflowUpdateStageCompleted,
		Args: 		  []interface{}{updateArg},
	})
	if err != nil {
		log.Fatalln("Error issuing Update request", err)
	}
	// Get the result of the Update.
	var updateResult updates.YourUpdateResult
	err = updateHandle.Get(context.Background(), &updateResult)
	if err != nil {
		log.Fatalln("Update encountered an error", err)
	}
	log.Println("Update succeeded, new total: ", updateResult.Total)
}

/* @dacx
id: how-to-send-an-update-from-a-client-in-go
title: How to send an Update from a Temporal Client in Go
label: Send Update from Client
description: Use the UpdateWorkflow method on an instance of the Go SDK Temporal Client to send an Update to a Workflow Execution.
tags:
- go sdk
- code sample
- update
- client
lines: 16-23, 45-62
@dacx */
