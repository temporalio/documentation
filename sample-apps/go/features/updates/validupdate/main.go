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

func main() {
	if len(os.Args) != 2 {
		log.Fatalln("Expected a single integer argument")
	}
	arg := os.Args[1]
	n, err := strconv.Atoi(arg)
	if err != nil {
		fmt.Println("The argument must be an integer")
		os.Exit(1)
	}
	temporalClient, err := client.Dial(client.Options{
		HostPort: client.DefaultHostPort,
	})
	if err != nil {
		log.Fatalln("Unable to create client", err)
	}
	defer temporalClient.Close()
	updateArg := updates.YourUpdateArg{
		Add: n,
	}
	updateHandle, err := temporalClient.UpdateWorkflow(context.Background(), client.UpdateWorkflowOptions{
		WorkflowID:   updates.YourValidUpdateWFID,
		UpdateName:   updates.YourValidatedUpdateName,
		WaitForStage: client.WorkflowUpdateStageCompleted,
		Args: 		  []interface{}{updateArg},
	})
	if err != nil {
		log.Fatalln("Error issuing Update request", err)
	}
	var updateResult updates.YourUpdateResult
	err = updateHandle.Get(context.Background(), &updateResult)
	if err != nil {
		log.Fatalln("Update encountered an error", err)
	}
	log.Println("Update succeeded, new total: ", updateResult.Total)
}
