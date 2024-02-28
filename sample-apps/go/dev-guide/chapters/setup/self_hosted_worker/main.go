// dacx
package main

import (
	"log"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"

	"documentation-samples-go/dev-guide/chapters/setup/activities"
	"documentation-samples-go/dev-guide/chapters/setup/workflows"
)

/**
Set IP address, port, and Namespace in the Temporal Client options.
**/

func main() {
	// Initialize a Temporal Client
	// Specify the IP, port, and Namespace in the Client options
	clientOptions := client.Options{
		HostPort:  "172.18.0.4:7233",
		Namespace: "backgroundcheck_namespace",
	}
	temporalClient, err := client.Dial(clientOptions)
	if err != nil {
		log.Fatalln("Unable to create a Temporal Client", err)
	}
	defer temporalClient.Close()
	// Create a new Worker
	yourWorker := worker.New(temporalClient, "backgroundcheck-boilerplate-task-queue-self-hosted", worker.Options{})
	// Register Workflows
	yourWorker.RegisterWorkflow(workflows.BackgroundCheck)
	// Register Activities
	yourWorker.RegisterActivity(activities.SSNTraceActivity)
	// Start the Worker Process
	err = yourWorker.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("Unable to start the Worker Process", err)
	}
}

/* @dacx
id: backgroundcheck-boilerplate-self-hosted-worker
title: Customize Client options
description: Configure the Temporal Client with the specific IP Address of the Temporal Server on your network.
label: Self-hosted Client options
lines: 2-41
tags:
- worker
- self-hosted
- developer guide
@dacx */
