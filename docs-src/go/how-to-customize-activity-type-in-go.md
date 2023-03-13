---
id: how-to-customize-activity-type-in-go
title: How to customize Activity Type in Go
sidebar_label: Customize Activity Type
description: To customize the Workflow Type set the Name parameter with RegisterOptions when registering your Workflow with a Worker.
---

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/main/yourappyourappworker/main_dacx.go">View source code</a>

```go
func main() {
// ...
	yourWorker := worker.New(temporalClient, "your-custom-task-queue-name", worker.Options{})
// ...
	// Use RegisterOptions to change the name of the Activity Type for example.
	registerAOptions := activity.RegisterOptions{
		Name: "JustAnotherActivity",
	}
	yourWorker.RegisterActivityWithOptions(yourapp.YourSimpleActivityDefinition, registerAOptions)
	// Run the Worker
	err = yourWorker.Run(worker.InterruptCh())
// ...
}
```
