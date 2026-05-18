package main

import (
	"log"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"

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
	w := worker.New(temporalClient, updates.TaskQueueName, worker.Options{})
	w.RegisterWorkflow(updates.YourUpdatableWorkflow)
	w.RegisterWorkflow(updates.UpdatableWorkflowWithValidator)
	err = w.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("Unable to start worker", err)
	}
}
