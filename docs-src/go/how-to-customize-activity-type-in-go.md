---
id: how-to-customize-activity-type-in-go
title: How to customize Activity Type in Go
sidebar_label: Customize Activity Type
description: To customize the Workflow Type set the `Name` parameter with `RegisterOptions` when registering your Workflow with a Worker.
tags:
  - developer-guide
  - go
---

To customize the Activity Type, set the `Name` parameter with `RegisterOptions` when registering your Activity with a Worker.

- Type: `string`
- Default: function name

<!--SNIPSTART go-samples-yourapp-your-worker { "selectedLines": ["23","42-46"] } -->

[yourapp/worker/main.go](https://github.com/temporalio/samples-go/blob/yourapp/yourapp/worker/main.go)

```go
// ...
	yourWorker := worker.New(temporalClient, "your-custom-task-queue-name", worker.Options{})
// ...
	// Use RegisterOptions to change the name of the Activity Type for example.
	registerAOptions := activity.RegisterOptions{
		Name: "JustAnotherActivity",
	}
	yourWorker.RegisterActivityWithOptions(yourapp.YourSimpleActivityDefinition, registerAOptions)
```

<!--SNIPEND-->
