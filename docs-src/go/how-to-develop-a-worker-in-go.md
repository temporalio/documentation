---
id: how-to-develop-a-worker-in-go
title: How to develop a Worker in Go
sidebar_label: Develop Worker
description: Develop an instance of a Worker by calling worker.New(), available via the go.temporal.io/sdk/worker package.
---

Create an instance of [`Worker`](https://pkg.go.dev/go.temporal.io/sdk/worker#Worker) by calling [`worker.New()`](https://pkg.go.dev/go.temporal.io/sdk/worker#New), available through the `go.temporal.io/sdk/worker` package, and pass it the following parameters:

1. An instance of the Temporal Go SDK `Client`.
1. The name of the Task Queue that it will poll.
1. An instance of `worker.Options`, which can be empty.

Then, register the Workflow Types and the Activity Types that the Worker will be capable of executing.

Lastly, call either the `Start()` or the `Run()` method on the instance of the Worker.
Run accepts an interrupt channel as a parameter, so that the Worker can be stopped in the terminal.
Otherwise, the `Stop()` method must be called to stop the Worker.

:::tip

If you have [`gow`](https://github.com/mitranim/gow) installed, the Worker Process automatically "reloads" when you update the Worker file:

```bash
go install github.com/mitranim/gow@latest
gow run worker/main.go # automatically reloads when file changes
```

:::

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/add-go-schedule-sample/yourapp/worker/main_dacx.go">View source code</a>

```go
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
// ...
	// Register your Activity Definitons with the Worker.
	// Use this technique for registering all Activities that are part of a struct and set the shared variable values.
	message := "This could be a connection string or endpoint details"
	number := 100
	activities := &yourapp.YourActivityObject{
		Message: &message,
		Number: &number,
	}
	// Use the RegisterActivity or RegisterActivityWithOptions method for each Activity.
	yourWorker.RegisterActivity(activities)
// ...
	// Run the Worker
	err = yourWorker.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("Unable to start Worker", err)
	}
}
// ...
```
