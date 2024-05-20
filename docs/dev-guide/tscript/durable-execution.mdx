---
id: durable-execution
title: Develop code that durably executes - TypeScript SDK dev guide
sidebar_label: Develop for durability
sidebar_position: 3
description: The Durable Execution section of the Temporal Developer's guide covers advanced beginner concepts for working with Temporal, including testing your code, reviewing workflow event history, adding timers, and understanding determinism. Developing for durable execution is a core aspect of Temporal.
slug: /dev-guide/typescript/durable-execution
toc_max_heading_level: 4
keywords:
  - determinism
  - developer-guide
  - developer-guide-doc-type
  - durable execution
  - event history
  - introduction-doc-type
  - replay
  - sdk
  - static analysis
  - tests
  - typescript
  - typescript sdk
  - vscode debugger extension
tags:
  - determinism
  - developer-guide
  - developer-guide-doc-type
  - durable-execution
  - event-history
  - introduction-doc-type
  - replay
  - sdk
  - static-analysis
  - tests
  - typescript
  - typescript-sdk
  - vscode-debugger-extension
---

When it comes to the Temporal Platform's ability to durably execute code, the SDK's ability to [Replay](/encyclopedia/temporal-sdks#replays) a Workflow Execution is a major aspect of that.
This chapter introduces the development patterns which enable that.

:::competency Develop for a Durable Execution

This chapter of the Temporal TypeScript SDK developer's guide introduces best practices to developing deterministic Workflows that can be Replayed, enabling a [Durable Execution](/temporal#durable-execution).

By the end of this section you will know basic best practices for Workflow Definition development.

Learning objectives:

- Identify SDK API calls that map to Events
- Recognize non-deterministic Workflow code
- Explain how Workflow code execution progresses

The information in this chapter is also available in the [Temporal 102 course](https://learn.temporal.io/courses/temporal_102/).

:::

<!--
This chapter builds on the [Construct a new Temporal Application project](/dev-guide/typescript/project-setup) chapter and relies on the Background Check use case and sample applications as a means to contextualize the information.
-->

This chapter walks through the following sequence:

- Retrieve a Workflow Execution's Event History
- Add a Replay test to your application
- Intrinsic non-deterministic logic
- Non-deterministic code changes

## Retrieve a Workflow Execution's Event History {#retrieve-event-history}

There are a few ways to view and download a Workflow Execution's [Event History](/workflows#event-history).
We recommend starting off by using either the Temporal CLI or the Web UI to access it.

### Using the Temporal CLI

Use the Temporal CLI's `temporal workflow show` command to save your Workflow Execution's Event History to a local file.
Run the command from the `/test` directory so that the file saves alongside the other testing files.

```text
/backgroundcheck
    /src
        /clients
        /test
            workflows.test.ts
```

**Local dev server**

If you have been following along with the earlier chapters of this guide, your Workflow Id might be something like `backgroundcheck_workflow`.

```shell
temporal workflow show \
 --workflow-id backgroundcheck_workflow \
 --namespace backgroundcheck_namespace \
 --output json > backgroundcheck_workflow_history.json
```

:::info Workflow Id returns the most recent Workflow Execution

The most recent Event History for that Workflow Id is returned when you only use the Workflow Id to identify the Workflow Execution.
Use the `--run-id` option as well to get the Event History of an earlier Workflow Execution by the same Workflow Id.

:::

**Temporal Cloud**

For Temporal Cloud, remember to either provide the paths to your certificate and private keys as command options, or set those paths as environment variables:

```shell
temporal workflow show \
 --workflow-id backgroundcheck_workflow \
 --namespace backgroundcheck_namespace \
 --tls-cert-path /path/to/ca.pem \
 --tls-key-path /path/to/ca.key \
 --output json  > backgroundcheck_workflow_history.json
```

**Self-hosted Temporal Cluster**

For self-hosted environments, you might be using the Temporal CLI command alias:

```shell
temporal_docker workflow show \
 --workflow-id backgroundcheck_workflow \
 --namespace backgroundcheck_namespace \
 --output json  > backgroundcheck_workflow_history.json
```

### Via the UI

A Workflow Execution's Event History is also available in the Web UI.

Navigate to the Workflows page in the UI and select the Workflow Execution.

<div className="tdiw"><div className="tditw"><p className="tdit">Select a Workflow Execution from the Workflows page</p></div><div className="tdiiw" height="870"><img className="img_ev3q" src="/img/select-workflow-execution-in-ui.png" alt="Select a Workflow Execution from the Workflows page" /></div></div>

From the Workflow details page you can copy the Event History from the JSON tab and paste it into the `backgroundcheck_workflow_history.json` file.

<div className="tdiw"><div className="tditw"><p className="tdit">Copy Event History JSON object from the Web UI</p></div><div className="tdiiw" height="768"><img className="img_ev3q" src="/img/copy-events-from-workflow-details-page.png" alt="Copy Event History JSON object from the Web UI" /></div></div>

## How to replay a Workflow Execution in TypeScript {#replay-a-workflow-execution}

To replay a single Event History, use [worker.runReplayHistory](https://typescript.temporal.io/api/classes/worker.Worker#runreplayhistory).

When an Event History is replayed and non-determinism is detected (that is, the Workflow code is incompatible with the History), [DeterminismViolationError](https://typescript.temporal.io/api/classes/workflow.DeterminismViolationError) is thrown.
If replay fails for any other reason, [ReplayError](https://typescript.temporal.io/api/classes/worker.ReplayError) is thrown.

In the following example, a single Event History is loaded from a JSON file on disk (as obtained from the [Web UI](/web-ui) or the [Temporal CLI](/cli/workflow#show)):

```ts
const filePath = "./history_file.json";
const history = await JSON.parse(fs.promises.readFile(filePath, "utf8"));
await Worker.runReplayHistory(
  {
    workflowsPath: require.resolve("./your/workflows"),
  },
  history
);
```

Alternatively, we can download the Event History programmatically using a Client:

```ts
const connection = await Connection.connect({ address });
const client = new Client({ connection, namespace: "your-namespace" });
const handle = client.workflow.getHandle("your-workflow-id");
const history = await handle.fetchHistory();
await Worker.runReplayHistory(
  {
    workflowsPath: require.resolve("./your/workflows"),
  },
  history
);
```

To gain confidence that changes to a Workflow are safe to deploy, we recommend that you obtain Event Histories from the relevant Task Queue and replay them in bulk.
You can do so by combining the [client.workflow.list()](https://typescript.temporal.io/api/classes/client.WorkflowClient#list) and [worker.runReplayHistories()](https://typescript.temporal.io/api/classes/worker.Worker#runreplayhistories) APIs.

In the following example (which, as of server 1.18, requires [Advanced Visibility](/visibility#advanced-visibility) to be enabled), Event Histories are downloaded from the server and then replayed by passing in a client and a set of Workflows Executions.
The [results](https://typescript.temporal.io/api/interfaces/worker.ReplayResult) returned by the async iterator contain information about the Workflow Execution and whether an error occurred during replay.

```ts
const executions = client.workflow.list({
  query: 'TaskQueue=foo and StartTime > "2022-01-01T12:00:00"',
});
const histories = executions.intoHistories();
const results = Worker.runReplayHistories(
  {
    workflowsPath: require.resolve("./your/workflows"),
  },
  histories
);
for await (const result of results) {
  if (result.error) {
    console.error("Replay failed", result);
  }
}
```

### Why add a Replay test? {#why-replay-test}

The Replay test is important because it verifies whether the current Workflow code (Workflow Definition) remains compatible with the Event Histories of earlier Workflow Executions.

A failed Replay test typically indicates that the Workflow code exhibits non-deterministic behavior.
In other words, for a specific input, the Workflow code can follow different code paths during each execution, resulting in distinct sequences of Events.
The Temporal Platform's ability to ensure durable execution depends on the SDK's capability to re-execute code and return to the most recent state of the Workflow Function execution.

The Replay test executes the same steps as the SDK and verifies compatibility.

Workflow code becomes non-deterministic primarily through two main avenues:

1. **[Intrinsic non-deterministic logic](/dev-guide/go/durable-execution#intrinsic-non-deterministic-logic):** This occurs when Workflow state or branching logic within the Workflow gets determined by factors beyond the SDK's control.
2. **[Non-deterministic code changes](/dev-guide/go/durable-execution#durability-through-replays):** When you change your Workflow code and deploy those changes while there are still active Workflow Executions relying on older code versions.

## Intrinsic non-deterministic logic {#intrinsic-non-deterministic-logic}

Referred to as "intrinsic non-determinism", this kind of "bad" Workflow code will generally prevent the Workflow code from completing because the Workflow can take a different code path than the one expected from the Event History.

Due to the Temporal TypeScript Sandbox, many common sources of non-determinism will not cause non-deterministic errors, because the Sandbox replaces non-deterministic methods with deterministic methods. However, in case you are working with other SDKs, it is still a good idea to be familiar with what some common sources of non-determinism are. This is because, as mentioned earlier, some other Temporal SDKs, such as Go and Java, do not have the sandbox feature where they can safely use non-deterministic methods and rely on the sandbox to replace non-deterministic code with deterministic versions.

Here are some common sources of non-determinism:

- **Random Number Generation**:

  - Since random numbers, by definition, are non-deterministic, you should
    avoid working with them in your Workflow if using a different SDK.
  - With the TypeScript SDK, `Math.random()` is overridden by a deterministic version. It uses a pseudo-random number generator seeded with a value specific to the Workflow Execution.
  - For truly random numbers not tied to the Workflow's deterministic nature, use Activities.

- **Interacting with External Systems or State**:

  - Directly accessing or mutating external systems or state, such as making API calls, performing file I/O operations, or communicating with other services, should be avoided within the Workflow.
  - With the TypeScript SDK, this is not the case, again due to the sandbox. The Workflow sandbox cannot import code that makes network requests or nondeterministic modules. As a result, use Activities for such operations. Activities run outside the Workflow's deterministic context and can safely interact with external systems.

- **Working with System Time**:

  - `Date.now()` is overridden with a deterministic version.
    This version is set to reflect the current system time in milliseconds, as recorded at the first invocation of a Workflow Task.
    It remains constant for the entire duration of that Task and is consistent during any replays of the Workflow.
    This ensures that `Date.now()` always returns the same value within a single Workflow Task execution, providing deterministic behavior essential for reliable workflow management.
  - Use [sleep()](https://typescript.temporal.io/api/namespaces/workflow/#sleep). This ensures deterministic behavior during Workflow replays.
  - `setTimeout` is also safe due to the TypeScript sandbox.

- **Handling Data Structures with Non-Deterministic Ordering**:
  - You must be careful when iterating over data structures. In some cases,
    such as iterating over the properties of an object using a `for in` loop,
    the order of property enumeration may not be guaranteed, potentially
    leading to inconsistentices in the execution order between different runs.

Adhering to these practices ensures that Workflows in the Temporal TypeScript SDK maintain deterministic behavior, crucial for predictable and reliable execution across multiple runs.

One way to produce a non-deterministic error is to use a random number to determine whether to sleep inside the Workflow.

Eventually, the way that sleep has been implemented here will produce a non-determinism error.

<div className="copycode-notice-container"><a href="https://github.com/temporalio/documentation/blob/main/sample-apps/typescript/chapter_durable_execution/backgroundcheck_nondeterministic/src/workflow_dacx.ts">View the source code</a> in the context of the rest of the application code.</div>

```typescript
import { proxyActivities, log, sleep } from "@temporalio/workflow";
import type * as activities from "./activities";

const { ssnTraceActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: "10 seconds",
});

// backgroundCheckNonDeterministic is an anti-pattern Workflow Definition
export async function backgroundCheckNonDeterministic(ssn: string): Promise<string> {
  // CAUTION, the following code is an anti-pattern showing what NOT to do
  if (getRandomNumber(1, 100) > 50) {
    await sleep("10 seconds");
  }

  log.info("Preparing to run daily report", {});

  try {
    const ssnTraceResult = await ssnTraceActivity(ssn);
    return ssnTraceResult;
  } catch (err) {
    throw err;
  }
}

function getRandomNumber(min: number, max: number) {
  let seed = 1234;
  seed = Math.floor(((seed * seed) % 10000) / 100);
  return min + (seed % (max - min + 1));
}
```

The Worker logs will show something similar to the following:

```shell
2023/11/08 08:33:03 ERROR Workflow panic Namespace backgroundcheck_namespace TaskQueue backgroundcheck-replay-task-queue-local WorkerID 89476@flossypurse-macbook-pro.local@ WorkflowType BackgroundCheckNonDeterministic WorkflowID backgroundcheck_workflow RunID 02f36de4-ca96-4468-a883-91c098996354 Attempt 1 Error unknown command CommandType: Timer, ID: 5, possible causes are nondeterministic workflow definition code or incompatible change in the workflow definition StackTrace process event for backgroundcheck-replay-task-queue-local [panic]:
go.temporal.io/sdk/internal.panicIllegalState(...)
```

And you will see information about the failure in the Web UI as well.

<div className="tdiw"><div className="tditw"><p className="tdit">Web UI view of a non-determinism error</p></div><div className="tdiiw" height="317"><img className="img_ev3q" src="/img/non-deterministic-workflow-task-failure.png" alt="Web UI view of a non-determinism error" /></div></div>

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

The Worker logs will show something similar to the following:

```shell
2023/11/08 08:33:03 ERROR Workflow panic Namespace backgroundcheck_namespace TaskQueue backgroundcheck-replay-task-queue-local WorkerID 89476@flossypurse-macbook-pro.local@ WorkflowType BackgroundCheckNonDeterministic WorkflowID backgroundcheck_workflow RunID 02f36de4-ca96-4468-a883-91c098996354 Attempt 1 Error unknown command CommandType: Timer, ID: 5, possible causes are nondeterministic workflow definition code or incompatible change in the workflow definition StackTrace process event for backgroundcheck-replay-task-queue-local [panic]:
go.temporal.io/sdk/internal.panicIllegalState(...)
```

And you will see information about the failure in the Web UI as well.

<div className="tdiw"><div className="tditw"><p className="tdit">Web UI view of a non-determinism error</p></div><div className="tdiiw" height="317"><img className="img_ev3q" src="/img/non-deterministic-workflow-task-failure.png" alt="Web UI view of a non-determinism error" /></div></div>

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

### VSCode Debugger extension {#static-analysis}

Non-deterministic code can be hard to catch while developing Workflows.
You can leverage the Temporal TypeScript VSCode extenstion to debug your Workflows by their ID or Workflow Event History file.
Use the [Temporal Debugger for VS Code](https://marketplace.visualstudio.com/items?itemName=temporal-technologies.temporalio).

See the [vscode-debugger-extension README](https://github.com/temporalio/vscode-debugger-extension/blob/main/README.md) for details on how to use it.

## Non-deterministic code changes {#durability-through-replays}

The most important thing to take away from the section is to make sure you have an application versioning plan whenever you are developing and maintaining a Temporal Application that will eventually deploy to a production environment.

Versioning APIs and versioning strategies are covered in other parts of the developer's guide, this chapter sets the stage to understand why and how to approach those strategies.

<!--TODO ^ update with links to those places -->

### The Event History

Inspect the Event History of a recent Background Check Workflow using the `temporal workflow show` command:

```shell
temporal workflow show \
 --workflow-id backgroundcheck_workflow \
 --namespace backgroundcheck_namespace
```

You should see output similar to this:

```shell
Progress:
  ID          Time                     Type
   1  2023-10-25T20:28:03Z  WorkflowExecutionStarted
   2  2023-10-25T20:28:03Z  WorkflowTaskScheduled
   3  2023-10-25T20:28:03Z  WorkflowTaskStarted
   4  2023-10-25T20:28:03Z  WorkflowTaskCompleted
   5  2023-10-25T20:28:03Z  ActivityTaskScheduled
   6  2023-10-25T20:28:03Z  ActivityTaskStarted
   7  2023-10-25T20:28:03Z  ActivityTaskCompleted
   8  2023-10-25T20:28:03Z  WorkflowTaskScheduled
   9  2023-10-25T20:28:03Z  WorkflowTaskStarted
  10  2023-10-25T20:28:03Z  WorkflowTaskCompleted
  11  2023-10-25T20:28:03Z  WorkflowExecutionCompleted

Result:
  Status: COMPLETED
  Output: ["pass"]
```

The preceding output shows eleven Events in the Event History ordered in a particular sequence.
All Events are created by the Temporal Server in response to either a request coming from a Temporal Client, or a [Command](/workflows#command) coming from the Worker.

Let's take a closer look:

- `WorkflowExecutionStarted`: This Event is created in response to the request to start the Workflow Execution.
- `WorkflowTaskScheduled`: This Event indicates a Workflow Task is in the Task Queue.
- `WorkflowTaskStarted`: This Event indicates that a Worker successfully polled the Task and started evaluating Workflow code.
- `WorkflowTaskCompleted`: This Event indicates that the Worker suspended execution and made as much progress that it could.
- `ActivityTaskScheduled`: This Event indicates that the ExecuteActivity API was called and the Worker sent the [`ScheduleActivityTask`](/references/commands#scheduleactivitytask) Command to the Server.
- `ActivityTaskStarted`: This Event indicates that the Worker successfully polled the Activity Task and started evaluating Activity code.
- `ActivityTaskCompleted`: This Event indicates that the Worker completed evaluation of the Activity code and returned any results to the Server.
  In response, the Server schedules another Workflow Task to finish evaluating the Workflow code resulting in the remaining Events, `WorkflowTaskScheduled`.`WorkflowTaskStarted`, `WorkflowTaskCompleted`, `WorkflowExecutionCompleted`.

:::info Event reference

The [Event reference](/references/events) serves as a source of truth for all possible Events in the Workflow Execution's Event History and the data that is stored in them.

:::

### Workflow Sleep Sample {#info-node-label-(often-becomes-the-anchor-if-node-is-used-as-a-header)}

In the following sample, we add a couple of logging statements and a Timer to the Workflow code to see how this affects the Event History.

Use the `sleep()` API to cause the Workflow to sleep for a minute before the call to execute the Activity.

By using Temporal's logging API, the Worker is able to suppress these log messages during replay so that log statements from the original execution aren't duplicated by the re-execution.

```typescript
import { log } from "@temporalio/workflow";
import { proxyActivities, sleep } from "@temporalio/workflow";
import type * as activities from "./activities"; // Assuming 'activities' is the file containing your activity definitions

const { ssnTraceActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: "10 seconds",
});

export async function backgroundCheckWorkflow(param: string): Promise<string> {
  // Sleep for 1 minute
  log.info("Sleeping for 1 minute...");
  await sleep(60 * 1000); // sleep for 60 seconds
  log.info("Finished sleeping");

  // Execute the SSNTraceActivity synchronously
  try {
    const ssnTraceResult = await ssnTraceActivity(param);
    // Return the result of the Workflow
    return ssnTraceResult;
  } catch (err) {
    throw err;
  }
}
```

### Inspect the new Event History {#inspect-new-event-history}

After updating your Workflow code to include the logging and Timer, run your tests again.
You should expect to see the `TestReplayWorkflowHistoryFromFile` test fail.
This is because the code we added creates new Events and alters the Event History sequence.

To get this test to pass, we must get an updated Event History JSON file.

<!--
[Start a new Workflow](/dev-guide/go/project-setup#start-workflow) and after it is complete [download the Event History as a JSON object](/dev-guide/go/durable-execution#retrieve-event-history).
-->

:::info Double check Task Queue names

Reminder that this guide jumps between several sample applications using multiple Task Queues.
Make sure you are starting Workflows on the same Task Queue that the Worker is listening to.
And, always make sure that all Workers listening to the same Task Queue are registered with the same Workflows and Activities.

:::

If you inspect the new Event History, you will see two new Events in response to the `sleep()` API call which send the [StartTimer Command](/references/commands#starttimer) to the Server:

- `TimerStarted`
- `TimerFired`

However, it is also important to note that you don't see any Events related to logging.
And if you were to remove the Sleep call from the code, there wouldn't be a compatibility issue with the previous code.
This is to highlight that only certain code changes within Workflow code is non-deterministic.
The basic thing to remember is that if the API call causes a [Command](/references/commands) to create Events in the Workflow History that takes a new path from the existing Event History then it is a non-deterministic change.

This becomes a critical aspect of Workflow development when there are running Workflows that have not yet completed and rely on earlier versions of the code.

Practically, that means non-deterministic changes include but are not limited to the following:

- Adding or removing an Activity
- Switching the Activity Type used in a call to `ExecuteActivity`
- Adding or removing a Timer
- Altering the execution order of Activities or Timers relative to one another

The following are a few examples of changes that do not lead to non-deterministic errors:

- Modifying non-Command generating statements in a Workflow Definition, such as logging statements
- Changing attributes in the `ActivityOptions`
- Modifying code inside of an Activity Definition
