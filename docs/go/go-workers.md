---
id: workers
title: Workers in Go
sidebar_label: Workers
---

A _worker service_ is a service that hosts Workflow and Activity implementations.
A worker service starts one or more Workers.
A Worker polls a Task Queue for Tasks, and executes Workflows in response to Tasks.
When you call `ExecuteWorkflow()`, Temporal adds a new task to the Task Queue, and a Worker executes the task.

Just like workflows and activities, the workers and worker service are hosted on user applications, and not the Temporal server.
Use the Temporal SDK to start the Worker and register all Activity and Workflow implementations that you require the service to execute.

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
	TaskQueue  = "samples_tq"
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
