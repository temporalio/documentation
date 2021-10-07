---
id: workers
title: Workers in Go
sidebar_label: Workers
---

## What is a Worker?

A Worker is a service that executes [Workflows](/docs/go/workflows) and [Activities](/docs/go/activities).
Workers are run on user controlled hosts.
You can use the `worker` package to create and run as many Workers as your use case demands, across any number of hosts.

Workers poll Task Queues for Tasks, execute chunks of code in response to those Tasks, and then communicate the results back to the Temporal Server.

As a developer, running Workers is a fairly simple procedure, because the Go SDK handles all of the communication between the Worker and the Temporal Server behind the scenes.

## How to start a Worker

To start a Worker you need to pass it the following three things:

1. The Temporal Go SDK client.
2. The name of the Task Queue that it will poll.
3. The Worker's options, which can be empty by default.

To run the Worker, you need to first register which Workflows and/or Activities it can execute and then pass it an interrupt channel.

As a simple example, let's say we want our Worker to be able to execute the following Go functions:

```go
func MyWorkflowFunction(context workflow.Context) error {
	return nil
}

func MyActivityFunction() error {
	return nil
}
```

This is how you would create and run the Worker for those functions:

```go
package main

import (
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
)

func main() {
	// Create the client
	c, err := client.NewClient(client.Options{})
	if err != nil {
		// log failure
	}
	defer c.Close()

	// Create the Worker
	w := worker.New(c, "your-simple-task-queue", worker.Options{})

	// Register your functions
	w.RegisterWorkflow(MyWorkflowFunction)
	w.RegisterActivity(MyActivityFunction)

	// Run the Worker
	err = w.Run(worker.InterruptCh())
	if err != nil {
		// log failure
	}
}
```

The `RegisterWorkflow()` and `RegisterActivity` calls essentially create an in-memory mapping between the fully qualified function names and their implementations, inside the Worker process.

:::note

If the Worker polls a Task for a Workflow or Activity function it does not know about, it will fail that Task.
However, the failure of the Task will not cause the associated Workflow to fail.

:::

When you start a Workflow by calling `ExecuteWorkflow()`, the Temporal Server adds a new Task to the Workflow's Task Queue, and any Worker polling that Task Queue could execute that Task. You can learn more in the [Workflows docs](https://docs.temporal.io/docs/go/workflows#how-to-start-a-workflow).
