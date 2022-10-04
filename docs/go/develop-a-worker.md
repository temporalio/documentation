---
id: develop-a-worker
title: How to develop a Worker in Go
sidebar_label: Develop Worker
description: Develop an instance of a Worker by calling `worker.New()`, available via the `go.temporal.io/sdk/worker` package.
tags:
  - developer-guide
  - go
  - workers
---

Create an instance of [`Worker`](https://pkg.go.dev/go.temporal.io/sdk/worker#Worker) by calling [`worker.New()`](https://pkg.go.dev/go.temporal.io/sdk/worker#New), available through the `go.temporal.io/sdk/worker` package, and pass it the following parameters:

1. An instance of the Temporal Go SDK `Client`.
1. The name of the Task Queue that it will poll.
1. An instance of [`worker.Options`](/go/how-to-set-workeroptions-in-go), which can be empty.

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
   c, err := client.Dial(client.Options{})
   if err != nil {
       // ...
   }
   defer c.Close()
   w := worker.New(c, "your-task-queue", worker.Options{})
   w.RegisterWorkflow(YourWorkflowDefinition)
   w.RegisterActivity(YourActivityDefinition)
   err = w.Run(worker.InterruptCh())
   if err != nil {
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

:::tip

If you have [`gow`](https://github.com/mitranim/gow) installed, the Worker Process automatically "reloads" when you update the Worker file:

```bash
go install github.com/mitranim/gow@latest
gow run worker/main.go # automatically reload when file changed
```

:::
