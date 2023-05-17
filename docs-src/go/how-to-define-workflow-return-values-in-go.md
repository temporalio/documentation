---
id: how-to-define-workflow-return-values-in-go
title: How to define Workflow return values in Go
sidebar_label: Workflow return values
description: A Go-based Workflow Definition can return either just an error or a customValue, error combination.
---

A Go-based Workflow Definition can return either just an `error` or a `customValue, error` combination.
Again, the best practice here is to use a `struct` type to hold all custom values.
A Workflow Definition written in Go can return both a custom value and an error.
However, it's not possible to receive both a custom value and an error in the calling process, as is normal in Go.
The caller will receive either one or the other.
Returning a non-nil `error` from a Workflow indicates that an error was encountered during its execution and the Workflow Execution should be terminated, and any custom return values will be ignored by the system.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-go/blob/add-go-schedule-sample/yourapp/your_workflow_definition_dacx.go">View source code</a>

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
// YourWorkflowDefinition is your custom Workflow Definition.
func YourWorkflowDefinition(ctx workflow.Context, param YourWorkflowParam) (*YourWorkflowResultObject, error) {	
// ...
	if err != nil {
		return nil, err
	}
	// Make the results of the Workflow Execution available.
	workflowResult := &YourWorkflowResultObject{
		WFResultFieldX: activityResult.ResultFieldX,
		WFResultFieldY: activityResult.ResultFieldY,
	}
	return workflowResult, nil
}

```

