---
id: how-to-define-activity-return-values-in-go
title: How to define Activity return values in Go
sidebar_label: Activity return values
description: A Go-based Activity Definition can return either just an `error` or a `customValue, error` combination.
---

A Go-based Activity Definition can return either just an `error` or a `customValue, error` combination (same as a Workflow Definition).
You may wish to use a `struct` type to hold all custom values, just keep in mind they must all be serializable.

<a class="dacx-source-link" href="https:/github.com/temporalio/documentation-samples-go/blob/main/yourapp/your_activity_definition_dacx.go">View source code</a>

```go
// YourActivityResultObject is the struct returned from your Activity.
// Use a struct so that you can return multiple values of different types.
// Additionally, your function signature remains compatible if the fields change.
type YourActivityResultObject struct {
	ResultFieldX string
	ResultFieldY int
}
// ...
func (a *YourActivityObject) YourActivityDefinition(ctx context.Context, param YourActivityParam) (YourActivityResultObject, error) {
// ...
	result := YourActivityResultObject{
		ResultFieldX: *a.SharedMessageState,
		ResultFieldY: *a.SharedCounterState,
	}
	// Return the results back to the Workflow Execution.
	// The results persist within the Event History of the Workflow Execution.
	return result, nil
}
```
