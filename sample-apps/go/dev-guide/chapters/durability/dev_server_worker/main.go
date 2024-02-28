package main

import (
	"log"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"

	"documentation-samples-go/dev-guide/chapters/durability/activities"
	"documentation-samples-go/dev-guide/chapters/durability/workflows"
)

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
	yourWorker := worker.New(temporalClient, "backgroundcheck-replay-task-queue-local", worker.Options{})
	// Register Workflows
	yourWorker.RegisterWorkflow(workflows.BackgroundCheck)
	yourWorker.RegisterWorkflow(workflows.BackgroundCheckNonDeterministic)
	// Register Activities
	yourWorker.RegisterActivity(activities.SSNTraceActivity)
	// Start the Worker Process
	err = yourWorker.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("Unable to start the Worker Process", err)
	}
}
