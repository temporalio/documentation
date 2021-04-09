---
id: go-workers
title: Workers in Go
---

A worker or _worker service_ is a service that hosts the Workflow and Activity implementations. The worker polls the _Temporal service_ for tasks, performs those tasks, and communicates task execution results back to the _Temporal service_. Worker services are developed, deployed, and operated by Temporal customers.

You can run a Temporal worker in a new or an existing service. Use the framework APIs to start the Temporal worker and link in all Activity and Workflow implementations that you require the service to execute.

```go
package main

import (
	"os"
	"os/signal"

	"github.com/uber-go/tally"
	"go.uber.org/zap"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
	"go.temporal.io/sdk/workflow"
)

var (
	Taskqueue  = "samples_tq"
)

func main() {
	logger, err := zap.NewDevelopment()
	if err != nil {
		panic(err)
	}

	// The client and worker are heavyweight objects that should be created once per process.
	serviceClient, err := client.NewClient(client.Options{
		HostPort: client.DefaultHostPort,
		Logger: logger,
	})
	if err != nil {
		logger.Fatal("Unable to create client", zap.Error(err))
	}
	defer serviceClient.Close()

	worker := worker.New(serviceClient, TaskQueue, worker.Options{})

	worker.RegisterWorkflow(MyWorkflow)
	worker.RegisterActivity(MyActivity)

	err = worker.Start()
	if err != nil {
		logger.Fatal("Unable to start worker", zap.Error(err))
	}
}

func MyWorkflow(context workflow.Context) error {
	return nil
}

func MyActivity() error {
	return nil
}
```
