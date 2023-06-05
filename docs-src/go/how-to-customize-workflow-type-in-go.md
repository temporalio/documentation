---
id: how-to-customize-workflow-type-in-go
title: How to customize Workflow Type in Go
sidebar_label: Customize Workflow Type
description: To customize the Workflow Type set the Name parameter with RegisterOptions when registering your Workflow with a Worker.
---

In Go, by default, the Workflow Type name is the same as the function name.

To customize the Workflow Type, set the `Name` parameter with `RegisterOptions` when registering your Workflow with a [Worker](/go/how-to-develop-a-worker-in-go).

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
// ...
func main() {
// ...
	yourWorker := worker.New(temporalClient, "your-custom-task-queue-name", worker.Options{})
// ...
	// Use RegisterOptions to set the name of the Workflow Type for example.
	registerWFOptions := workflow.RegisterOptions{
		Name: "JustAnotherWorkflow",
	}
	yourWorker.RegisterWorkflowWithOptions(yourapp.YourSimpleWorkflowDefinition, registerWFOptions)
// ...
}
```
