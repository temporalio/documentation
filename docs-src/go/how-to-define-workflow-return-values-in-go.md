---
id: how-to-define-workflow-return-values-in-go
title: How to define Workflow return values in Go
sidebar_label: Workflow return values
description: A Go-based Workflow Definition can return either just an `error` or a `customValue, error` combination.
tags:
  - go
  - how-to
---

A Go-based Workflow Definition can return either just an `error` or a `customValue, error` combination.
Again, the best practice here is to use a `struct` type to hold all custom values.

<!--SNIPSTART go-samples-yourapp-your-workflow-definition { "selectedLines":["1-7","15-19","22","51-57"] } -->

[yourapp/your_workflow_definition.go](https://github.com/temporalio/samples-go/blob/yourapp/yourapp/your_workflow_definition.go)

```go
package yourapp

import (
	"time"

	"go.temporal.io/sdk/workflow"
)
// ...
// YourWorkflowResultObject is the object returned by the Workflow.
type YourWorkflowResultObject struct {
	WFResultFieldX string
	WFResultFieldY int
}
// ...
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (*YourWorkflowResultObject, error) {
// ...
	// Make the results of the Workflow Execution available.
	workflowResult := &YourWorkflowResultObject{
		WFResultFieldX: activityResult.ResultFieldX,
		WFResultFieldY: activityResult.ResultFieldY,
	}
	return workflowResult, nil
}
```

<!--SNIPEND-->

A Workflow Definition written in Go can return both a custom value and an error.
However, it's not possible to receive both a custom value and an error in the calling process, as is normal in Go.
The caller will receive either one or the other.
Returning a non-nil `error` from a Workflow indicates that an error was encountered during its execution and the Workflow Execution should be terminated, and any custom return values will be ignored by the system.
