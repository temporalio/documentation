---
id: troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Troubleshooting

This section contains information to help you identify and resolve errors you may encounter.

### Nondeterministic

If a Workflow follows a different code path during a replay than it did during its original execution, it may return a nondeterministic error.
To check for nondeterministic code in the function or in a function called by the Workflow, run the [Temporal Workflow check](https://github.com/temporalio/sdk-go/tree/master/contrib/tools/workflowcheck) tool.

#### lookup failed for scheduledEventID to activityID:

The code path is nondeterministic. For more information, see the following.

- [Workflow logic requirements in Go](https://www.notion.so/docs/go/how-to-develop-a-workflow-definition-in-go#workflow-logic-requirements-in-go)
- [Deterministic constraints](https://www.notion.so/docs/temporal-explained/workflows#deterministic-constraints)

#### unable to find activityID for the scheduledEventID

The code path is nondeterministic. For more information, see the following.

- [Workflow logic requirements in Go](https://www.notion.so/docs/go/how-to-develop-a-workflow-definition-in-go#workflow-logic-requirements-in-go)
- [Deterministic constraints](https://www.notion.so/docs/temporal-explained/workflows#deterministic-constraints)

#### nondeterministic Workflow

The code path is nondeterministic. For more information, see the following.

- [Workflow logic requirements in Go](https://www.notion.so/docs/go/how-to-develop-a-workflow-definition-in-go#workflow-logic-requirements-in-go)
- [Deterministic constraints](https://www.notion.so/docs/temporal-explained/workflows#deterministic-constraints)

### Deadlock

Workflow code should initiate within in a few milliseconds until all coroutines reach a yield point of waiting on the Temporal server, or the primary Workflow returns. Then the server may return more information and the coroutines are unsuspended again and expected to run in a few milliseconds again.

Temporal requires that the code run within 1 second, or it is considered _deadlocked_.

Use the [worker.WorflowReplayer](https://pkg.go.dev/go.temporal.io/sdk/worker#WorkflowReplayer) as a method to replay existing history and replicate errors. For example:

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

This history can then be used to _replay_, for example:

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
	replayer.RegisterWorkflow(MyWorkflow)
	return replayer.ReplayWorkflowHistory(nil, hist)
}
```

This will run the exact same history that was generated in the original run. If a noticeably different code path was followed or some code caused a deadlock, it will be reported.
Replaying a Workflow locally is a good way to see exactly what code path was taken for given input and events.

#### Potential deadlock: workflow goroutine "value" didn't yield for over a second

In the context of a Workflow, the running code took longer than 1 second to execute.
Use the _replay_ feature to what code path was taken for given inputs and events.

### Registration errors

Registration errors can occur from not specifying the correct Workflow or Activity.

#### ApplicationFailure: 'MyFunction' is not a function

Verify that your Workers are registering the correct Workflow and Activity Definitions on the correct Task Queues.

#### Workflow did not register a handler for MyQuery

Verify that your Workers are registering the correct Workflow and Activity Definitions on the correct Task Queues.

#### [ERROR] Module not found: Error: Can't resolve

If you are running Temporal in a monorepo, then your `node_modules` may be in a different location than where Temporal expects to find it by default.
For more information, see the [Next.js tutorial](/docs/typescript/nextjs-tutorial) for setting up Temporal **within an existing monorepo**.

#### [ERROR] Failed to activate workflow

Temporal Workflow Bundles need to [export a set of methods that fit the compiled `worker-interface.ts` from `@temporalio/workflow`](https://github.com/temporalio/sdk-typescript/blob/eaa2d205c9bc5ff4a3b17c0b34f2dcf6b1e0264a/packages/worker/src/workflow/bundler.ts#L81) as an entry point.

The [bundleWorkflowCode](/docs/typescript/workers/#prebuilt-workflow-bundles) method may be of assistance if you're using the Webpack setting.

## How to work with support

If you are unable to solve your bug with any of the techniques in this document, and you believe it is the result of a bug in Temporal itself, Temporal support can be contacted via the [Community Forum](https://community.temporal.io/) or [Community Slack](https://temporal.io/slack).

If it's a Temporal bug, an issue or pull request can be opened on the appropriate Temporal GitHub project.

To help Temporal diagnose an issue, provide the following when communicating with support:

- Version
  - Provide the SDK version.
  - Provide the Server version.
  - When working in the Temporal Cloud, provide the URL.
- Workflow history
  - Provide the JSON history from the tctl.
- Full stack traces
  - Provide full stack traces.
- Clear description of the issue
  - Provide a clear description of the issue and steps you took to produce the error.
