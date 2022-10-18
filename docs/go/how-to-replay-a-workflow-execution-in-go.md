---
id: how-to-replay-a-workflow-execution-in-go
title: How to replay a Workflow Execution in Go
sidebar_label: WorkflowReplayer
description: Use the `WorkflowReplayer` API to replay an existing Workflow Execution from an Event History to replicate errors.
tags:
  - go
  - how-to
---

Use the [worker.WorkflowReplayer](https://pkg.go.dev/go.temporal.io/sdk/worker#WorkflowReplayer) to replay an existing Workflow Execution from its Event History to replicate errors.

For example, the following code retrieves the Event History of a Workflow:

```go
import (
	"context"

	"go.temporal.io/api/enums/v1"
	"go.temporal.io/api/history/v1"
	"go.temporal.io/sdk/client"
)

func GetWorkflowHistory(ctx context.Context, client client.Client, id, runID string) (*history.History, error) {
	var hist history.History
	iter := client.GetWorkflowHistory(ctx, id, runID, false, enums.HISTORY_EVENT_FILTER_TYPE_ALL_EVENT)
	for iter.HasNext() {
		event, err := iter.Next()
		if err != nil {
			return nil, err
		}
		hist.Events = append(hist.Events, event)
	}
	return &hist, nil
}
```

This history can then be used to _replay_.
For example, the following code creates a `WorkflowReplayer` and register the `YourWorkflow` Workflow function.
Then it calls the `ReplayWorkflowHistory` to _replay_ the Event History and return an error code.

```go
import (
	"context"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
)

func ReplayWorkflow(ctx context.Context, client client.Client, id, runID string) error {
	hist, err := GetWorkflowHistory(ctx, client, id, runID)
	if err != nil {
		return err
	}
	replayer := worker.NewWorkflowReplayer()
	replayer.RegisterWorkflow(YourWorkflow)
	return replayer.ReplayWorkflowHistory(nil, hist)
}
```

The code above will cause the Worker to re-execute the Workflow's Workflow Function using the original Event History.
If a noticeably different code path was followed or some code caused a deadlock, it will be returned in the error code.
Replaying a Workflow Execution locally is a good way to see exactly what code path was taken for given input and events.
