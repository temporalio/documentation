package main

import (
	"context"
	"log"

	"go.temporal.io/sdk/client"

	"documentation-samples-go/features/updates"
)

func main() {
	temporalClient, err := client.Dial(client.Options{
		HostPort: client.DefaultHostPort,
	})
	if err != nil {
		log.Fatalln("Unable to create client", err)
	}
	defer temporalClient.Close()
	workflowOptions := client.StartWorkflowOptions{
		ID:        updates.updatesWFID,
		TaskQueue: updates.TaskQueueName,
	}
	startingCount := updates.WFParam{
		StartCount: 0,
	}
	we, err := temporalClient.ExecuteWorkflow(context.Background(), workflowOptions, updates.YourUpdatableWorkflow, startingCount)
	if err != nil {
		log.Fatalln("Unable to execute workflow", err)
	}
	log.Println("Started workflow", "WorkflowID", we.GetID(), "RunID", we.GetRunID())
}
