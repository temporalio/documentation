---
id: non-deterministic-branching-logic
title: Non-deterministic branching logic
description: History Replay, sometimes also called Workflow Replay, is the mechanism that Temporal uses to reconstruct the state of a Workflow Execution. Temporal provides Durable Execution via this Replay Functionality.
sidebar_label: Durability through Replays
tags:
  - go sdk
  - developer-guide-doc-type
  - event history
  - replay
  - durable execution
---

Also referred to as "intrinsic non-determinism", writing bad branching logic in Workflow code prevents the Workflow code from executing to completion because the Workflow can have a different code path than the one expected from the Event History.

### Common Sources of Non-Determinism

- Using Random numbers
- Accessing / Mutating External Systems or State (do this in Activities, not Workflows)
- Relying on System Time (use [Workflow.now()](https://pkg.go.dev/go.temporal.io/sdk/workflow#Now) instead)
- Working Directly with Threads or Goroutines (use [Workflow.go()](https://pkg.go.dev/go.temporal.io/sdk/workflow#Go) instead)
- Iterating over Data Structures with Unknown Ordering
- Storing or Evaluating the [Run ID](https://docs.temporal.io/workflows#run-id)

### Demonstrating a Non-Deterministic Error

To produce a Non-Deterministic Error following the example in this section, you can add a random number generator and a `time.Sleep` call — two things you should never do in a Temporal Workflow.

Add `"math/rand"` to the list of imported packages at the start of `your_workflow_definition_dacx.go`, and add `time.Sleep(time.Duration(rand.Intn(10)) * time.Second)` to line 68, just after `ctx = workflow.WithActivityOptions(ctx, activityOptions)`:

```go
import (
	"time"
	"math/rand"
	"go.temporal.io/sdk/workflow"
)

...

	ctx = workflow.WithActivityOptions(ctx, activityOptions)
	time.Sleep(time.Duration(rand.Intn(10)) * time.Second)
	activityParam := YourActivityParam{
		ActivityParamX: param.WorkflowParamX,
		ActivityParamY: param.WorkflowParamY,
	}
```

Save the file, then re-run both the Worker Process and the HTTP server as before:

```shell
go run worker/main_dacx.go
go run gateway/main_dacx.go
```

Once both the Worker process and the HTTP server are running, access `http://localhost:8091/start` using either your browser or `curl`. It will not return any output to the browser or cURL command. Reload the page or re-run cURL at least twice to ensure that the Temporal Cluster catches the non-deterministic behavior that you've added.

Next, you can reopen the Temporal [Web UI](http://localhost:8233/) to find a problem with your Workflow:

![Web UI view of a non-determinism error](/img/deterministic-failure.png)

Use the `temporal workflow show` command again to retrieve the Workflow Event History:

```shell
temporal workflow show --workflow-id your-workflow-id --output json  > your_workflow_history.json
```

This Workflow output contains a `WorkflowTaskFailed` event, which will fail the `TestReplayWorkflowHistoryFromFile()` test:

```output
{
  "eventId": "4",
  "eventTime": "2023-10-16T22:02:33.225671800Z",
  "eventType": "WorkflowTaskFailed",
  "taskId": "1048672",
  "workflowTaskFailedEventAttributes": {
    "scheduledEventId": "2",
    "startedEventId": "3",
    "cause": "WorkflowWorkerUnhandledFailure",
```

Testing for Non-Determinism errors can help improve your Temporal Workflows. You can also watch [Using Workflow Reset to Recover from a Bad Deployment](https://www.youtube.com/embed/wKnGbukEppI?rel=0&iv_load_policy=3&modestbranding=1&showsearch=0&showinfo=0&wmode=transparent) from our [Temporal 102](https://learn.temporal.io/courses/temporal_102/go) course.

### Wrapped Language Primitives

The Temporal Go SDK provides wrappers around some Go language primitives — `time.Sleep()` and `time.Now()` — so you can safely use them within Temporal Workflows.

Use [workflow.Sleep()](https://pkg.go.dev/go.temporal.io/sdk/workflow#Sleep) to pause a Workflow. Unlike `time.Sleep()`, `workflow.Sleep()` requires you to pass the Workflow `Context` as an additional argument. It also allows you to programmatically cancel a pending sleep, and to automatically advance past a sleep duration when testing.

Use [workflow.Now()](https://pkg.go.dev/go.temporal.io/sdk/workflow#Now) to returns the current time when the workflow task is started or replayed. Workflows must use this Now() to get the wall clock time.
