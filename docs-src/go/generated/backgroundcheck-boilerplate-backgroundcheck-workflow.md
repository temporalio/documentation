---
id: backgroundcheck-boilerplate-backgroundcheck-workflow
title: Boilerplate Workflow code
sidebar_label: Workflow code
description: In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a `struct` method.
tags:
- go sdk
- developer guide
- workflow
- code sample
---

<!-- DO NOT EDIT THIS FILE DIRECTLY.
THIS FILE IS GENERATED from https://github.com/temporalio/documentation/blob/main/sample-apps/go/dev-guide/chapters/setup/workflows/backgroundcheck.go. -->

In the Temporal Go SDK programming model, a [Workflow Definition](/concepts/what-is-a-workflow-definition) is an exportable function.
The `BackgroundCheck` function below is an example of a basic Workflow Definition.

<div class="copycode-notice-container"><a href="https://github.com/temporalio/documentation/blob/main/sample-apps/go/dev-guide/chapters/setup/workflows/backgroundcheck.go">View the source code</a> in the context of the rest of the application code.</div>

```go
package workflows

import (
	"time"

	"go.temporal.io/sdk/workflow"

	"documentation-samples-go/dev-guide/chapters/setup/activities"
)


// BackgroundCheck is your custom Workflow Definition.
func BackgroundCheck(ctx workflow.Context, param string) (string, error) {
	// Define the Activity Execution options
	// StartToCloseTimeout or ScheduleToCloseTimeout must be set
	activityOptions := workflow.ActivityOptions{
		StartToCloseTimeout: 10 * time.Second,
	}
	ctx = workflow.WithActivityOptions(ctx, activityOptions)
	// Execute the Activity synchronously (wait for the result before proceeding)
	var ssnTraceResult string
	err := workflow.ExecuteActivity(ctx, activities.SSNTraceActivity, param).Get(ctx, &ssnTraceResult)
	if err != nil {
		return "", err
	}
	// Make the results of the Workflow available
	return ssnTraceResult, nil
}
```
