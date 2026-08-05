package main

import (
	"log"

	"go.temporal.io/sdk/activity"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
	"go.temporal.io/sdk/workflow"

	"documentation-samples-go/yourapp"
)

func main() {
	// Create a Temporal Client
	// A Temporal Client is a heavyweight object that should be created just once per process.
	temporalClient, err := client.Dial(client.Options{})
	if err != nil {
		log.Fatalln("Unable to create client", err)
	}
	defer temporalClient.Close()
	// Create a new Worker.
	yourWorker := worker.New(temporalClient, "your-custom-task-queue-name", worker.Options{})
	// Register your Workflow Definitions with the Worker.
	// Use the ReisterWorkflow or RegisterWorkflowWithOptions method for each Workflow registration.
	yourWorker.RegisterWorkflow(yourapp.YourWorkflowDefinition)
	// Use RegisterOptions to set the name of the Workflow Type for example.
	registerWFOptions := workflow.RegisterOptions{
		Name: "JustAnotherWorkflow",
	}
	yourWorker.RegisterWorkflowWithOptions(yourapp.YourSimpleWorkflowDefinition, registerWFOptions)
	// Register your Activity Definitions with the Worker.
	// Use this technique for registering all Activities that are part of a struct and set the shared variable values.
	message := "This could be a connection string or endpoint details"
	number := 100
	activities := &yourapp.YourActivityObject{
		Message: &message,
		Number:  &number,
	}
	// Use the RegisterActivity or RegisterActivityWithOptions method for each Activity.
	yourWorker.RegisterActivity(activities)
	// Use RegisterOptions to change the name of the Activity Type for example.
	registerAOptions := activity.RegisterOptions{
		Name: "JustAnotherActivity",
	}
	yourWorker.RegisterActivityWithOptions(yourapp.YourSimpleActivityDefinition, registerAOptions)
	// Run the Worker
	err = yourWorker.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("Unable to start Worker", err)
	}
}