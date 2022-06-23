---
id: how-to-log-from-a-workflow-in-go
title: How to log from a Workflow in TypeScript
sidebar_label: Log from a Workflow
description: Log from a Workflow
tags:
  - developer-guide
  - sdk
  - go
  - log
---

In Workflow Definitions you can use `workflow.GetLogger(ctx)` to write logs.

```go
import (
	"context"
	"time"

	"go.temporal.io/sdk/activity"
	"go.temporal.io/sdk/workflow"
)

// Workflow is a standard workflow definition.
// Note that the Workflow and Activity don't need to care that
// their inputs/results are being compressed.
func Workflow(ctx workflow.Context, name string) (string, error) {
// ...

workflow.WithActivityOptions(ctx, ao)

// Getting the logger from the context.
	logger := workflow.GetLogger(ctx)
// Logging a message with the key value pair `name` and `name`
	logger.Info("Compressed Payloads workflow started", "name", name)

	info := map[string]string{
		"name": name,
	}


	logger.Info("Compressed Payloads workflow completed.", "result", result)

	return result, nil
}
```
