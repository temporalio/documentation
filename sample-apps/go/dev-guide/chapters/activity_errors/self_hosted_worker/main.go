package main

import (
	"log"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"

	"documentation-samples-go/dev-guide/chapters/activity_errors/activities"
	"documentation-samples-go/dev-guide/chapters/activity_errors/workflows"
)

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
	yourWorker := worker.New(temporalClient, "backgroundcheck-activity-errors-task-queue-self-hosted", worker.Options{})
	// Register Workflows
	yourWorker.RegisterWorkflow(workflows.BackgroundCheck)
	// Register Acivities
	yourWorker.RegisterActivity(&activities.Activities{})
	// Start the the Worker Process
	err = yourWorker.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("Unable to start the Worker Process", err)
	}
}
