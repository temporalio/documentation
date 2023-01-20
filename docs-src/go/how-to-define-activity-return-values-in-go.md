---
id: how-to-define-activity-return-values-in-go
title: How to define Activity return values in Go
sidebar_label: Activity return values
description: A Go-based Activity Definition can return either just an `error` or a `customValue, error` combination.
tags:
  - developer-guide
  - go
---

A Go-based Activity Definition can return either just an `error` or a `customValue, error` combination (same as a Workflow Definition).
You may wish to use a `struct` type to hold all custom values, just keep in mind they must all be serializable.

<!--SNIPSTART go-samples-yourapp-your-activity-definition { "selectedLines": ["16-22","33","40-47"] } -->

[yourapp/your_activity_definition.go](https://github.com/temporalio/samples-go/blob/yourapp/yourapp/your_activity_definition.go)

```go
// ...
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

<!--SNIPEND-->
