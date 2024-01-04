// dacx
package main

import (
	"log"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"

	"documentation-samples-go/dev-guide/chapters/setup/activities"
	"documentation-samples-go/dev-guide/chapters/setup/workflows"
)

/*
To run a Worker Process with a local development server, define the following steps in code:

- Initialize a Temporal Client.
- Create a new Worker by passing the Client to creation call.
- Register the application's Workflow and Activity functions.
- Call run on the Worker.

In regards to organization, we recommend keeping Worker code separate from Workflow and Activity code.
*/

func main() {
	// Initialize a Temporal Client
	// Specify the Namespace in the Client options
	clientOptions := client.Options{
		Namespace: "backgroundcheck_namespace",
	}
	temporalClient, err := client.Dial(clientOptions)
	if err != nil {
		log.Fatalln("Unable to create a Temporal Client", err)
	}
	defer temporalClient.Close()
	// Create a new Worker
	yourWorker := worker.New(temporalClient, "backgroundcheck-boilerplate-task-queue-local", worker.Options{})
	// Register Workflows
	yourWorker.RegisterWorkflow(workflows.BackgroundCheck)
	// Register Activities
	yourWorker.RegisterActivity(activities.SSNTraceActivity)
	// Start the the Worker Process
	err = yourWorker.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("Unable to start the Worker Process", err)
	}
}

/* @dacx
id: backgroundcheck-boilerplate-run-a-dev-server-worker
title: Run a dev server Worker
description: Define the code needed to run a Worker Process in Go.
label: Dev server Worker
lines: 2-47
tags:
- worker
- developer guide
- temporal client
@dacx */
