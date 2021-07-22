---
id: how-to-start-a-worker-in-go
title: How to start a Worker in Go?
sidebar_label: Workers
---

First, create a new instance of a [`Worker`](https://pkg.go.dev/go.temporal.io/sdk@v1.8.0/worker#Worker) by calling `worker.New()`, available via the `go.temporal.io/sdk/worker` package and pass it the following parameters:

1. An instance of the The Temporal Go SDK `Client`.
2. The name of the Task Queue that it will poll.
3. An instance of `worker.Options`, which can be empty.

Then, register the Workflow Types and the Activity Types that the Worker will be capable of executing.

Lastly, call either the `Start()` or the `Run()` method on the instance of the Worker.
Run accepts an interrupt channel as a parameter, so that the Worker can be stopped in the terminal.
Otherwise the `Stop()` method must be called to stop the Worker.

```go
package main

import (
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
)

func main() {
	c, err := client.NewClient(client.Options{})
	if err != nil {
		// ...
	}
	defer c.Close()
	w := worker.New(c, "your-task-queue", worker.Options{})
	w.RegisterWorkflow(YourWorkflowDefinition)
	w.RegisterActivity(YourActivityDefinition)
	err = w.Run(worker.InterruptCh())
	if err != nil
		// ...
	}
  // ...
}

func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (YourWorkflowResponse, error) {
  // ...
}

func YourActivityDefinition(ctx context.Context, param YourActivityParam) (YourActivityResponse, error) {
  // ...
}
```

The `RegisterWorkflow()` and `RegisterActivity` calls essentially create an in-memory mapping between the Workflow Types and their implementations, inside the Worker process.

Notice that that the Task Queue name is the same as the name provided [when the Workflow Execution is invoked](#).

The name of the Task Queue that is provided to the Worker must be the same Task Queue name that is provided with the invocation of Workflow Execution

:::note

If the Worker polls a Task for a Workflow or Activity function it does not know about, it will fail that Task.
However, the failure of the Task will not cause the associated Workflow to fail.

:::
