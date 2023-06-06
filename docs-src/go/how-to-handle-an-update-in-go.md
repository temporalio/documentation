---
id: how-to-handle-an-update-in-go
title: How to handle an Update in Go
sidebar_label: Handle Update
description: Use the SetUpateHandler API from the go.temporal.io/sdk/workflow package to register an Update Handler for a given name.
---

Register an Update handler for a given name using the [SetUpdateHandler](https://pkg.go.dev/go.temporal.io/sdk/workflow#SetUpdateHandler) API from the `go.temporal.io/sdk/workflow` package.
The handler function can accept multiple serializable input parameters, but we recommend using only a single parameter.
This practice enables you to add fields in future versions while maintaining backward compatibility.
You can optionally include a `workflow.Context` parameter in the first position of the function.
The function can return either a serializable value with an error or just an error.

Update handlers, unlike Query handlers, can observe and mutate Workflow state.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/sync_update/sync_update/your_updatable_workflow_dacx.go">View source code</a>

```go
// YourUpdatableWorkflow is a Workflow Definition.
// This Workflow sets an Update handler and then sleeps for a minute.
// After setting the Update hanlder it sleeps for 1 minutue.
// Updates can be sent to the Workflow during this time.
func YourUpdatableWorkflow(ctx workflow.Context, param WFParam) (WFResult, error) {
	counter := param.StartCount
	workflow.SetUpdateHandler(ctx, YourUpdateName, func(arg YourUpdateArg) (YourUpdateResult, error) {
		counter += arg.Add
		result := YourUpdateResult{
			Total: counter,
		}
		return result, nil
	})
// ...
}
```
