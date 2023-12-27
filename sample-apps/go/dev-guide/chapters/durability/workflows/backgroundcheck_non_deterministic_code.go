// dacx
// CAUTION! Do not use this code!
package workflows

import (
	"math/rand"
	"time"

	"go.temporal.io/sdk/workflow"

	"documentation-samples-go/dev-guide/chapters/durability/activities"
)

/*
Referred to as "intrinsic non-determinism" this kind of "bad" Workflow code can prevent the Workflow code from completing because the Workflow can take a different code path than the one expected from the Event History.

The following are some common operations that **can't** be done inside of a Workflow Definition:

- Generate and rely on random numbers (Use Activites instead).
- Accessing / mutating external systems or state.
  This includes calling an external API, conducting a file I/O operation, talking to another service, etc. (use Activities instead).
- Relying on system time.
  - Use `workflow.Now()` as a replacement for `time.Now()`.
  - Use `workflow.Sleep()` as a replacement for `time.Sleep()`.
- Working directly with threads or goroutines.
	- Use `workflow.Go()` as a replacement for the `go` statement.
    - Use `workflow.Channel()` as a replacement for the native `chan` type.
	Temporal provides support for both buffered and unbuffered channels.
	- Use `workflow.Selector()` as a replacement for the `select` statement.
- Iterating over data structures with unknown ordering.
  This includes iterating over maps using `range`, because with `range` the order of the map's iteration is randomized.
  Instead you can collect the keys of the map, sort them, and then iterate over the sorted keys to access the map.
  This technique provides deterministic results.
  You can also use a Side Effect or an Activity to process the map instead.
- Storing or evaluating the run Id.

One way to produce a non-deterministic error is to use a random number to determine whether to sleep inside the Workflow.
*/

// BackgroundCheckNonDeterministic is an anti-pattern Workflow Definition
func BackgroundCheckNonDeterministic(ctx workflow.Context, param string) (string, error) {
	activityOptions := workflow.ActivityOptions{
		StartToCloseTimeout: 10 * time.Second,
	}
	ctx = workflow.WithActivityOptions(ctx, activityOptions)
	var ssnTraceResult string
	// highlight-start
	// CAUTION, the following code is an anti-pattern showing what NOT to do
	num := rand.Intn(100)
	if num > 50 {
		err := workflow.Sleep(ctx, 10*time.Second)
		if err != nil {
			return "", err
		}
	}
	// highlight-end
	err := workflow.ExecuteActivity(ctx, activities.SSNTraceActivity, param).Get(ctx, &ssnTraceResult)
	if err != nil {
		return "", err
	}
	return ssnTraceResult, nil
}

/*
If you run the BackgroundCheckNonDeterministic Workflow enough times, eventually you will see a Workflow Task failure.

The Worker logs will show something similar to the following:

```shell
2023/11/08 08:33:03 ERROR Workflow panic Namespace backgroundcheck_namespace TaskQueue backgroundcheck-replay-task-queue-local WorkerID 89476@flossypurse-macbook-pro.local@ WorkflowType BackgroundCheckNonDeterministic WorkflowID backgroundcheck_workflow RunID 02f36de4-ca96-4468-a883-91c098996354 Attempt 1 Error unknown command CommandType: Timer, ID: 5, possible causes are nondeterministic workflow definition code or incompatible change in the workflow definition StackTrace process event for backgroundcheck-replay-task-queue-local [panic]:
go.temporal.io/sdk/internal.panicIllegalState(...)
```

And you will see information about the failure in the Web UI as well.

![Web UI view of a non-determinism error](/img/non-deterministic-workflow-task-failure.png)

To inspect the Workflow Task failure using the Temporal CLI, you can use the `long` value for the `--fields` command option with the `temporal workflow show` command.

```shell
temporal workflow show \
 --workflow-id backgroundcheck_workflow_break \
 --namespace backgroundcheck_namespace \
 --fields long
```

This will display output similar to the following:

```shell
Progress:
  ID          Time                     Type                                                        Details
   1  2023-11-08T15:32:03Z  WorkflowExecutionStarted    {WorkflowType:{Name:BackgroundCheckNonDeterministic},
                                                        ParentInitiatedEventId:0,
                                                        TaskQueue:{Name:backgroundcheck-replay-task-queue-local,
                                                        Kind:Normal}, Input:["555-55-5555"],
                                                        WorkflowExecutionTimeout:0s, WorkflowRunTimeout:0s,
                                                        WorkflowTaskTimeout:10s, Initiator:Unspecified,
                                                        OriginalExecutionRunId:02f36de4-ca96-4468-a883-91c098996354,
                                                        Identity:temporal-cli:flossypurse@flossypurse-macbook-pro.local,
                                                        FirstExecutionRunId:02f36de4-ca96-4468-a883-91c098996354,
                                                        Attempt:1, FirstWorkflowTaskBackoff:0s,
                                                        ParentInitiatedEventVersion:0}
   2  2023-11-08T15:32:03Z  WorkflowTaskScheduled       {TaskQueue:{Name:backgroundcheck-replay-task-queue-local,
                                                        Kind:Normal}, StartToCloseTimeout:10s, Attempt:1}
   3  2023-11-08T15:32:03Z  WorkflowTaskStarted         {ScheduledEventId:2, Identity:89425@flossypurse-macbook-pro.local@,
                                                        RequestId:7a2515a0-885b-46a5-997f-4d41fe86a290,
                                                        SuggestContinueAsNew:false, HistorySizeBytes:762}
   4  2023-11-08T15:32:03Z  WorkflowTaskCompleted       {ScheduledEventId:2, StartedEventId:3, Identity:89425@flossypurse-macbook-pro.local@,
                                                        BinaryChecksum:2d9bc9784e1f18c4906cf95289a8bbcb,SdkMetadata:{CoreUsedFlags:[],
                                                        LangUsedFlags:[3]}, MeteringMetadata:{NonfirstLocalActivityExecutionAttempts:0}}
   5  2023-11-08T15:32:03Z  TimerStarted                {TimerId:5, StartToFireTimeout:1m0s, WorkflowTaskCompletedEventId:4}
   6  2023-11-08T15:33:03Z  TimerFired                  {TimerId:5, StartedEventId:5}
   7  2023-11-08T15:33:03Z  WorkflowTaskScheduled       {TaskQueue:{Name:flossypurse-macbook-pro.local:26d90960-cd3f-4229-8312-3716e916ac77,
                                                        Kind:Sticky}, StartToCloseTimeout:10, Attempt:1}
   8  2023-11-08T15:33:03Z  WorkflowTaskStarted         {ScheduledEventId:7, Identity:89476@flossypurse-macbook-pro.local@,
                                                        RequestId:ed6a7561-e9b8-4949-94b7-42d7b66640c5,
                                                        SuggestContinueAsNew:false, HistorySizeBytes:1150}
   9  2023-11-08T15:33:03Z  WorkflowTaskFailed          {ScheduledEventId:7, StartedEventId:8, Cause:NonDeterministicError,
                                                        Failure:{Message:unknown command CommandType: Timer, ID: 5, possible causes are
                                                        nondeterministic workflow definition code or incompatible change in the workflow definition,
                                                        Source:GoSDK, StackTrace:process event for backgroundcheck-replay-task-queue-local
                                                        [panic]: go.temporal.io/sdk/internal.panicIllegalState(...)
                                                        /Users/flossypurse/go/pkg/mod/go.temporal.io/sdk@v1.25.1/in
                                                        ternal/internal_command_state_machine.go:440 go.temporal.io/sdk/internal ...
                                                        poral.io/sdk@v1.25.1/internal/internal_worker_base.go:356 +0x48 created by
                                                        go.temporal.io/sdk/internal.(*baseWorker).processTaskAsync in goroutine 50
                                                        /Users/flossypurse/go/pkg/mod/go.temporal.io/sdk@v1.25.1/internal/internal_worker_base.go:352
                                                        +0xbc, FailureInfo:{ApplicationFailureInfo:{Type:PanicError, NonRetryable:true}}},
                                                        Identity:89476@flossypurse-macbook-pro.local@, ForkEventVersion:0,
                                                        BinaryChecksum:da7cae1f96abf543ca8b6e7c3f3ab072}
```
*/

/* @dacx
id: backgroundcheck-replay-intrinsic-non-determinism
title: Intrinsic non-deterministic logic
description: This kind of logic prevents the Workflow code from executing to completion because the Workflow can take a different code path than the one expected from the Event History.
label: intrinsic-non-deterministic-logic
lines: 3-62
tags:
- tests
- replay
- event history
@dacx */

/* @dacx
id: backgroundcheck-replay-inspecting-the-non-deterministic-error
title: Intrinsic non-deterministic logic
description: This kind of logic prevents the Workflow code from executing to completion because the Workflow can take a different code path than the one expected from the Event History.
label: intrinsic-non-deterministic-logic
lines: 64-132
tags:
- tests
- replay
- event history
@dacx */
