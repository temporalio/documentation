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
	yourWorker := worker.New(temporalClient, "backgroundcheck-replay-task-queue-self-hosted", worker.Options{})
	// Register Workflows
	yourWorker.RegisterWorkflow(workflows.BackgroundCheck)
	yourWorker.RegisterWorkflow(workflows.BackgroundCheckNonDeterministic)
	// Register Acivities
	yourWorker.RegisterActivity(activities.SSNTraceActivity)
	// Start the the Worker Process
	err = yourWorker.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("Unable to start the Worker Process", err)
	}
}
