---
id: how-to-customize-workflow-type-in-go
title: How to customize Workflow Type in Go
sidebar_label: Customize Workflow Type
description: To customize the Workflow Type set the `Name` parameter with `RegisterOptions` when registering your Workflow with a Worker.
tags:
  - developer-guide
  - go
---

To customize the Workflow Type, set the `Name` parameter with `RegisterOptions` when registering your Workflow with a Worker.

- Type: `string`
- Default: function name

<!--SNIPSTART go-samples-yourapp-your-worker { "selectedLines": ["23","27-31"] } -->

[yourapp/worker/main.go](https://github.com/temporalio/samples-go/blob/yourapp/yourapp/worker/main.go)

```go
// ...
	yourWorker := worker.New(temporalClient, "your-custom-task-queue-name", worker.Options{})
// ...
	// Use RegisterOptions to set the name of the Workflow Type for example.
	registerWFOptions := workflow.RegisterOptions{
		Name: "JustAnotherWorkflow",
	}
	yourWorker.RegisterWorkflowWithOptions(yourapp.YourSimpleWorkflowDefinition, registerWFOptions)
```

<!--SNIPEND-->
