---
id: how-to-create-a-worker-in-go
title: How to create a Worker in Go
sidebar_label: Create Worker
description: Create an instance of a Worker by calling `worker.New()`, available via the `go.temporal.io/sdk/worker` package.
tags:
  - developer-guide
  - go
  - workers
---

Create an instance of [`Worker`](https://pkg.go.dev/go.temporal.io/sdk/worker#Worker) by calling [`worker.New()`](https://pkg.go.dev/go.temporal.io/sdk/worker#New), available via the `go.temporal.io/sdk/worker` package, and pass it the following parameters:

1. An instance of the Temporal Go SDK `Client`.
2. The name of the Task Queue that it will poll.
3. An instance of [`worker.Options`](/go/how-to-set-workeroptions-in-go), which can be empty.

Then, register the Workflow Types and the Activity Types that the Worker will be capable of executing.

Lastly, call either the `Start()` or the `Run()` method on the instance of the Worker.
Run accepts an interrupt channel as a parameter, so that the Worker can be stopped in the terminal.
Otherwise, the `Stop()` method must be called to stop the Worker.

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
