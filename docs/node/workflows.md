---
id: workflows
title: Workflows in Node.js
sidebar_label: Workflows
description: In the Temporal Node SDK programming model, a Workflow is an exportable function that adheres to a set of rules.
image: /img/workflow.png
---

import RelatedReadList from '../components/RelatedReadList.js'

[API reference](https://nodejs.temporal.io/api/namespaces/workflow)

In the Node.js SDK, each Workflow runs in a separate V8 isolate context to provide a [deterministic runtime](/docs/node/determinism).

## How to write Workflow code

### Workflow Implementation

Workflow are implemented using a factory function that returns a handlers object for `execute` and optionally [signals](signals) and [queries](queries).

The snippet below uses `createActivityHandle` to create functions that, when called, schedule Activities in the system.

`src/workflows/index.ts`

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

### Workflow Interface

#### Type definitions

Workflow type definitions are optional, they provide type safety in situations where the implementation cannot directly be referenced by a client such as cross service or cross language calls.

`src/interfaces.ts`

<!--SNIPSTART nodejs-hello-workflow-interface {"enable_source_link": false}-->
<!--SNIPEND-->

### Workflow Client and Handles

The [`WorkflowClient`](https://nodejs.temporal.io/api/classes/client.workflowclient) class is used to interact with Workflows.
It can be used in any Node.js process (for example, an [Express](https://expressjs.com/) web server) and is separate from the Worker.

Once you have a client, you then create a "Handle" with [`client.createWorkflowHandle`](https://nodejs.temporal.io/api/classes/client.workflowclient/#createworkflowhandle).
This is an overloaded function that can be used in two ways:

```ts
const client = new WorkflowClient(connection.service);

// Method 1: create a handle for a NEW Workflow, given a reference to Workflow definition
const workflow = client.createWorkflowHandle(exampleWorkflow, {
  taskQueue: 'tutorial',
});

// Method 2: retrieve a handle for an EXISTING Workflow, given it's workflowId
const workflow = client.createWorkflowHandle(workflowId);
```

The Workflow Handle [exposes a number of important APIs](https://nodejs.temporal.io/api/interfaces/client.WorkflowHandle) that you will use to externally control your Workflow:

| Handle API          | Description                                                                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client`            | Readonly accessor to the underlying WorkflowClient.                                                                                                                                |
| `query`             | A mapping of all queries exposed by a Workflow. Call to query a Workflow after it's been started even if it has already completed. `ts const value = await workflow.query.get(); ` |
| `signal`            | A mapping of all Signals exposed by a Workflow. Call to signal a running Workflow. `ts await workflow.signal.increment(3); `                                                       |
| `signalWithStart()` | Sends a signal to a running Workflow or starts a new one if not already running and immediately signals it. Useful when you're unsure of the run state.                            |
| `workflowId`        | The workflowId of the current Workflow. The vast majority of the time, you can use this without the runId.                                                                         |
| `cancel()`          | Cancel a running Workflow.                                                                                                                                                         |
| `terminate()`       | Terminate a running Workflow                                                                                                                                                       |
| `describe()`        | Describe the current workflow execution                                                                                                                                            |
| `execute()`         | Start the Workflow with arguments, returns a Promise that resolves when the Workflow execution completes                                                                           |
| `start()`           | Start the Workflow with arguments, returns a Promise that resolves with the execution runId                                                                                        |
| `result()`          | Promise that resolves when Workflow execution completes                                                                                                                            |

### Workflow Options

Workflow Options are set before a Workflow Execution is created, passed to `createWorkflowHandle`.
There are a range of [`WorkflowOptions`](https://nodejs.temporal.io/api/interfaces/client.workflowoptions/), notable ones listed here:

- `taskQueue` (required): Task queue to use for workflow tasks. It should match a task queue specified when creating a Worker that hosts the workflow code.
- `workflowId`: Unique Workflow id to use when starting. If not specified, a UUID is generated, which you can access with `workflow.workflowId`
- `workflowIdReusePolicy`: Specifies server behavior if a completed workflow with the same id exists. [More details on Workflow ID Reuse Policy](/docs/content/what-is-a-workflow-id-reuse-policy/).
- `cronSchedule`: see ["Scheduling Cron Workflows"](#scheduling-cron-workflows)
- `retryPolicy`: the overall [RetryPolicy](https://nodejs.temporal.io/api/interfaces/proto.temporal.api.common.v1.iretrypolicy/) at the Workflow level
- `searchAttributes`: Specifies additional indexed information in result of list workflow.

## How to start a Workflow

A new Workflow Execution can be created in a few main ways

### Execute a Workflow (Blocking)

Start a workflow and await completion: `const result = await workflow.execute(args)`

<!--SNIPSTART nodejs-hello-client {"enable_source_link": false}-->
<!--SNIPEND-->

### Start a Workflow (Non-Blocking)

Start a workflow and return the `runId` of the Workflow Execution for future use: `workflow.start(args)`

Once you have the `workflowId` of a Workflow Execution you can retrieve it later in a different process:

```ts
// In initial processs...
const originalWF = client.createWorkflowHandle(workflowFn, runId);
await originalWF.start(args);
const workflowId = originalWF.workflowId;

// save runId and workflowId somewhere...

// In a different process...
const workflow = client.createWorkflowHandle(workflowId);

// do stuff with the retrieved handle
workflow.signal.foo(123);
```

### Misc ways to start Workflows

- If your workflow uses [Signals](/docs/node/signals), you can also send a Signal that might start a workflow using the `signalWithStart` API. See the [Signals docs](/docs/node/signals) for details.
- (For advanced usecases) You can also start or execute a Workflow directly from a [WorkflowClient](https://nodejs.temporal.io/api/classes/client.workflowclient/), without creating a Handle first.

## How to cancel a Workflow

To cancel a Workflow execution, call the [`cancel()`](https://nodejs.temporal.io/api/interfaces/client.WorkflowHandle#cancel) method on a WorkflowHandle.

```ts
// Create a typed client based on the example Workflow's type
const example = client.createWorkflowHandle(example, { taskQueue: 'tutorial' });
// Start the Workflow without waiting its completion
await example.start('Temporal');
// ... Later on, cancel the workflow
await example.cancel();
// Optionally wait for the Workflow's result
// (should throw WorkflowExecutionCancelledError)
await example.result();
```

Temporal gives you fine grained control over what happens when you cancel a workflow. See our docs on [Cancellation Scopes](/docs/node/cancellation-scopes) for detailes and examples.

## How to wait for and retrieve the result an existing Workflow Execution

You can retrieve the result of a completed Workflow Execution with `client.result(workflowId, runId?)`, or `await` it:

```ts
// In initial processs...
const originalWF = client.createWorkflowHandle(workflowFn, options);
await originalWF.start(args);
const workflowId = originalWF.workflowId;

// save workflowId somewhere...

// In a different process...
const result = await client.result(workflowId);
```

You will rarely ever need to specify the `runId`.

## Scheduling Cron Workflows

import DistributedCron from '../shared/distributed-cron.md'

<DistributedCron docUrl="https://nodejs.temporal.io/api/interfaces/client.workflowoptions/#cronschedule" typeName="WorkflowOptions">

You can set each workflow to repeat on a schedule with the `cronSchedule` option:

```ts
const workflow = client.createWorkflowHandle(scheduledWorkflow, {
  taskQueue: 'test',
  cronSchedule: '* * * * *', // start every minute
});
```

</DistributedCron>

## External Workflows

From Workflow code you may signal or cancel an external Workflow.

```ts
const workflow = createExternalWorkflowHandle<WFInterface>(
  workflowId,
  optionalRunId
);
await workflow.signal.someSignal(arg1, arg2);
await workflow.cancel();
```

[`createExternalWorkflowHandle`](https://nodejs.temporal.io/api/api/namespaces/workflow#newexternalworkflowhandle) returns an [`ExternalWorkflowHandle`](https://nodejs.temporal.io/api/interfaces/workflow.ExternalWorkflowHandle) that can be used to interact with existing Workflows.

## Child Workflows

Besides Activities, a Workflow can also start other Workflows.

Execute a child workflow and await its completion:

<!--SNIPSTART nodejs-child-workflow-->
<!--SNIPEND-->

[`createChildWorkflowHandle`](https://nodejs.temporal.io/api/api/namespaces/workflow#newchildworkflowhandle) returns a [`ChildWorkflowHandle`](https://nodejs.temporal.io/api/interfaces/workflow.ChildWorkflowHandle) that can be used to start a new child Workflow, signal it and await its completion.

Child Workflow executions are [`CancellationScope`](/docs/node/cancellation-scopes) aware and will automatically be cancelled when their containing scope is cancelled.

<RelatedReadList
readlist={[
["What is a Child Workflow Execution?","/docs/content/what-is-a-child-workflow-execution","explanation"],  
]}
/>

## Large Event Histories

### Why `ContinueAsNew` is needed

import SharedContinueAsNew from '../shared/continue-as-new.md'

<SharedContinueAsNew />

### The `ContinueAsNew` API

Use the [`continueAsNew`](https://nodejs.temporal.io/api/namespaces/workflow#continueasnew) API to instruct the Node SDK to restart `loopingWorkflow` with a new starting value and a new event history.

```ts
import { continueAsNew, sleep } from '@temporalio/workflow';

export async function loopingWorkflow(iteration = 0) {
  return {
    async execute() {
      if (iteration === 10) {
        return;
      }
      console.log('Running Workflow iteration:', iteration);
      await sleep(1000);
      // Must match the arguments expected by `loopingWorkflow`
      await continueAsNew<typeof loopingWorkflow>(iteration + 1);
      // Unreachable code, continueAsNew is like `process.exit` and will stop execution once called.
    },
  };
}
```

You can also call `continueAsNew` from a signal handler or `continueAsNew` to a different Workflow using [`makeContinueAsNewFunc`](https://nodejs.temporal.io/api/classes/workflow.contextimpl#makecontinueasnewfunc).
