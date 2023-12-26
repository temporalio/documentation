package main

import (
	"context"
	"log"

	"go.temporal.io/sdk/client"

	"documentation-samples-go/features/sessions"
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
		ID:        "fileprocessing_workflow",
		TaskQueue: "fileprocessing",
	}
	param := sessions.FileProcessingWFParam{
		CloudFileLocation: "https://example.com/some/path/to/download/file",
	}
	we, err := temporalClient.ExecuteWorkflow(context.Background(), workflowOptions, sessions.SomeFileProcessingWorkflow, param)
	if err != nil {
		log.Fatalln("Unable to execute workflow", err)
	}
	log.Println("Started workflow", "WorkflowID", we.GetID(), "RunID", we.GetRunID())
}
