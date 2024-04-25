package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"documentation-samples-go/yourapp"

	"go.temporal.io/sdk/client"
)

/*
Use the [`Dial()`](https://pkg.go.dev/go.temporal.io/sdk/client#Dial) API available in the [`go.temporal.io/sdk/client`](https://pkg.go.dev/go.temporal.io/sdk/client) package to create a [`Client`](https://pkg.go.dev/go.temporal.io/sdk/client#Client).

If you don't provide [`HostPort`](https://pkg.go.dev/go.temporal.io/sdk/internal#ClientOptions), the Client defaults the address and port number to `127.0.0.1:7233`, which is the port of the development Temporal Service.

If you don't set a custom Namespace name in the Namespace field, the client connects to the default Namespace.
*/

func main() {
	// Create a Temporal Client to communicate with the Temporal Service.
	// A Temporal Client is a heavyweight object that should be created just once per process.
	temporalClient, err := client.Dial(client.Options{
		HostPort: client.DefaultHostPort,
	})
	if err != nil {
		log.Fatalln("Unable to create Temporal Client", err)
	}
	defer temporalClient.Close()
	// Start an HTTP server and listen on /start
	http.HandleFunc("/start", func(w http.ResponseWriter, r *http.Request) {
		startWorkflowHandler(w, r, temporalClient)
	})
	err = http.ListenAndServe(":8091", nil)
	if err != nil {
		log.Fatalln("Unable to run http server", err)
	}
}

func startWorkflowHandler(w http.ResponseWriter, r *http.Request, temporalClient client.Client) {
	// Set the options for the Workflow Execution.
	// A Task Queue must be specified.
	// A custom Workflow Id is highly recommended.
	workflowOptions := client.StartWorkflowOptions{
		ID:        "your-workflow-id",
		TaskQueue: "your-custom-task-queue-name",
	}
	// Use an object as your Workflow Function parameter.
	// Objects enable your Function signature to remain compatible if fields change.
	workflowParams := yourapp.YourWorkflowParam{
		WorkflowParamX: "Hello World!",
		WorkflowParamY: 999,
	}
	// Make the call to the Temporal Service to start the Workflow Execution.
	workflowExecution, err := temporalClient.ExecuteWorkflow(
		context.Background(),
		workflowOptions,
		yourapp.YourWorkflowDefinition,
		workflowParams,
	)
	if err != nil {
		log.Fatalln("Unable to execute the Workflow", err)
	}
	log.Println("Started Workflow!")
	log.Println("WorkflowID:", workflowExecution.GetID())
	log.Println("RunID:", workflowExecution.GetRunID())
	var result yourapp.YourWorkflowResultObject
	workflowExecution.Get(context.Background(), &result)
	if err != nil {
		log.Fatalln("Unable to get Workflow result:", err)
	}
	b, err := json.Marshal(result)
	if err != nil {
		log.Fatalln(err)
		return
	}
	log.Println(string(b))
}

/* @dacx
id: how-to-connect-to-a-development-cluster-in-go
title: How to connect to a Temporal dev Temporal Service in Go
label: Connect to a dev Temporal Service
description: Use the Dial() method on the Temporal Client and omit setting any client options. If there is a local dev Temporal Service running, the Client will connect to it.
tags:
- go sdk
- code sample
- cluster
lines: 1-31, 40
@dacx */
