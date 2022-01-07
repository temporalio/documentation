---
id: how-to-develop-a-worker-program-in-go
title: How to develop a Worker Program in Go
sidebar_label: Worker Program
description: Create a new instance of a Worker by calling `worker.New()`, available via the `go.temporal.io/sdk/worker` package.
tags:
  - developer-guide
  - go
  - workers
---

import {RelatedReadContainer, RelatedReadItem} from '../components/RelatedReadList.js'

<!-- prettier-ignore -->
import * as HowToSetWorkerOptionsInGO from './how-to-set-workeroptions-in-go.md'
import * as HowToSetRegisterWorkflowOptionsInGo from './how-to-set-registerworkflowoptions-in-go.md'
import * as HowToSetRegisterActivityOptionsInGo from './how-to-set-registeractivityoptions-in-go.md'
import * as HowToSpawnAWorkflowExecutionInGo from './how-to-spawn-a-workflow-execution-in-go.md'
import * as HowToDevelopAnActivityDefinitionInGo from './how-to-develop-an-activity-definition-in-go.md'
import * as HowToDevelopAWorkflowDefinitionInGo from './how-to-develop-a-workflow-definition-in-go.md'

Create an instance of [`Worker`](https://pkg.go.dev/go.temporal.io/sdk/worker#Worker) by calling [`worker.New()`](https://pkg.go.dev/go.temporal.io/sdk/worker#New), available via the `go.temporal.io/sdk/worker` package, and pass it the following parameters:

1. An instance of the Temporal Go SDK `Client`.
2. The name of the Task Queue that it will poll.
3. An instance of <preview page={HowToSetWorkerOptionsInGO}>`worker.Options`</preview>, which can be empty.

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

Start the Worker Process by running `go run <filename>.go`.

:::tip

If you have [`gow`](https://github.com/mitranim/gow) installed, the Worker Process automatically "reloads" when you update the file:

```bash
go install github.com/mitranim/gow@latest
gow run worker/main.go # automatically reload when file changed
```

:::

The `RegisterWorkflow()` and `RegisterActivity()` calls essentially create an in-memory mapping between the Workflow Types and their implementations, inside the Worker process.

Notice that the Task Queue name is the same as the name provided when the <preview page={HowToSpawnAWorkflowExecutionInGo}>Workflow Execution is spawned</preview>.

The name of the Task Queue that is provided to the Worker must be the same Task Queue name that is provided with the invocation of the Workflow Execution.

import SharedWorkersTaskQueueRegistrationNote from '../reminders/note-workers-task-queue-registration-match.md'

<SharedWorkersTaskQueueRegistrationNote />

### Registering Actiity `structs`

Per [Activity Definition](/docs/go/how-to-develop-an-activity-definition-in-go) best practices, you may have an Activity struct that has multiple methods and fields. When you use `RegisterActivity()` for an Activity struct, that Worker has access to all exported methods.

### Registering multiple Types

To register multiple Activity Types and/or Workflow Types with the Worker Entity, just make multiple Activity registration calls, but make sure each Activity Type name is unique:

```go
w.registerActivity(ActivityA)
w.registerActivity(ActivityB)
w.registerActivity(ActivityC)
w.registerWorkflow(WorkflowA)
w.registerWorkflow(WorkflowB)
w.registerWorkflow(WorkflowC)
```

An Activity Type name can be customized to something other than the function name using the <preview page={HowToSetRegisterActivityOptionsInGo}>`RegisterActivityWithOptions`</preview> call.

A Workflow Type name can be customized to something other than the function name using the <preview page={HowToSetRegisterWorkflowOptionsInGo}>`RegisterWorkflowWithOptions`</preview> call.

<RelatedReadContainer>
  <RelatedReadItem page={HowToDevelopAnActivityDefinitionInGo} />
  <RelatedReadItem page={HowToDevelopAWorkflowDefinitionInGo} />
</RelatedReadContainer>
