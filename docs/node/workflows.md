---
id: workflows
title: Workflows and Clients in Node.js
sidebar_label: Workflows and Clients
description: In the Temporal Node SDK programming model, a Workflow is an exportable function that adheres to a set of rules.
image: /img/workflow.png
---

import RelatedReadList from '../components/RelatedReadList.js'

> **@temporalio/client** [![NPM](https://img.shields.io/npm/v/@temporalio/client)](https://www.npmjs.com/package/@temporalio/client)
> [API reference](https://nodejs.temporal.io/api/namespaces/client) | [GitHub source](https://github.com/temporalio/sdk-node/tree/main/packages/client)

**Workflows are the fundamental unit of business logic in Temporal**.

- In the Node.js SDK, each **Workflow Definition** (code) is bundled with dependencies and run in a [Worker](/docs/node/workers).
- However, the Workflow Definition only becomes a **Workflow Execution** when started by a **Workflow Client**. Clients are not bound to Workers and can be run in any Node.js application, for example, in a serverless function, Express.js API route handler or CLI/script run.

## How to write Workflow code

Workflow Definitions are "just functions", which can store state, orchestrate [Activity functions](/docs/node/activities) with special [Workflow APIs](/docs/node/workflow-apis) including Timers, Signals, Queries, and Child Workflows (imported from [`@temporalio/workflow`](https://www.npmjs.com/package/@temporalio/workflow)).

`src/workflows/index.ts`

<!--SNIPSTART nodejs-hello-workflow {"enable_source_link": false}-->
<!--SNIPEND-->

The snippet above uses `createActivityHandle` to create functions that, when called, schedule a `greet` Activity in the system to say "Hello World".

### Workflow Limitations

Workflow code must be [deterministic](/docs/node/determinism), and the Node SDK replaces common sources of nondeterminism for you, like `Date.now()`, `Math.random`, and `setTimeout`. However, there are other less obvious limitations:

- Node built-ins like `process` or the `path` and `fs` modules are unavailable
- "Pure" ESM Node modules like `node-fetch@3` are unsupported (use `node-fetch@2` instead for now) - see [#279](https://github.com/temporalio/sdk-node/issues/279)

These constraints don't apply inside activities and you should be able to write idiomatic Node.js otherwise.

## How to start and interact with Workflows

The [`WorkflowClient`](https://nodejs.temporal.io/api/classes/client.workflowclient) class is used to interact with Workflows.

Once you have a client, you then create a "Handle" with [`client.createWorkflowHandle`](https://nodejs.temporal.io/api/classes/client.workflowclient/#createworkflowhandle).
This is an overloaded function that can be used in two ways:

```ts
import { Connection, WorkflowClient } from '@temporalio/client';
const connection = new Connection();
const client = new WorkflowClient(connection.service);

// Method 1: create a handle for a NEW Workflow, given a reference to Workflow definition
const handle = client.createWorkflowHandle(exampleWorkflow, {
  taskQueue: 'tutorial',
});

// Method 2: retrieve a handle for an EXISTING Workflow, given it's workflowId
const handle = client.createWorkflowHandle({ workflowId: id });
```

The Workflow Handle [exposes a number of important APIs](https://nodejs.temporal.io/api/interfaces/client.WorkflowHandle) that you will use to externally control your Workflow:

| Handle API          | Description                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client`            | Readonly accessor to the underlying WorkflowClient.                                                                                                     |
| `query`             | Call to query a Workflow after it's been started even if it has already completed. `const value = await workflow.query(getValue);`                      |
| `signal`            | Call to signal a _running_ Workflow. `await workflow.signal(increment, 1);`                                                                             |
| `signalWithStart()` | Sends a signal to a running Workflow or starts a new one if not already running and immediately signals it. Useful when you're unsure of the run state. |
| `workflowId`        | The workflowId of the current Workflow. The vast majority of the time, you can use this without the runId.                                              |
| `cancel()`          | Cancel a running Workflow.                                                                                                                              |
| `terminate()`       | Terminate a running Workflow                                                                                                                            |
| `describe()`        | Describe the current workflow execution                                                                                                                 |
| `execute()`         | Start the Workflow with arguments, returns a Promise that resolves when the Workflow execution completes                                                |
| `start()`           | Start the Workflow with arguments, returns a Promise that resolves with the execution runId                                                             |
| `result()`          | Promise that resolves when Workflow execution completes                                                                                                 |

### Workflow Handle Options

Workflow Options are set before a Workflow Execution is created, passed to `createWorkflowHandle`.
There are a range of [`WorkflowOptions`](https://nodejs.temporal.io/api/interfaces/client.workflowoptions/), notable ones listed here:

- `taskQueue` (required): Task queue to use for workflow tasks. It should match a task queue specified when creating a Worker that hosts the workflow code.
- `workflowId`: Unique Workflow id to use when starting. If not specified, a UUID is generated, which you can access with `handle.workflowId`
- `cronSchedule`: see ["Scheduling Cron Workflows"](#scheduling-cron-workflows)
- `searchAttributes`: Specifies additional indexed information in result of list workflow.

We do not recommend setting Workflow-level Timeouts and Retries (do them at the Activity level instead), but they exist as options for power users.

## How to start a Workflow

Once you have a Workflow Definition and a Workflow Client, you can create a new Workflow Execution in two main ways (with other advanced options available).

### Execute a Workflow (Blocking)

Start a workflow and await completion: `const result = await workflow.execute(args)`

<!--SNIPSTART nodejs-hello-client {"enable_source_link": false}-->
<!--SNIPEND-->

This is useful for short lived workflows that you don't need to interact with after they start, beyond just waiting for a return value.

### Start a Workflow (Non-Blocking)

Start a workflow without blocking until completion: `await workflow.start(args)`

Once you have the `workflowId` of a Workflow Execution you can retrieve it later in a different process:

```ts
// In initial processs...
const handle = client.createWorkflowHandle(workflowFn, options);
const runId = await handle.start(args);
await handle.signal(pauseSignal);
const { workflowId } = handle;

// In a different process...
const handle = client.createWorkflowHandle({ workflowId /* ,  runId */ });
await handle.signal(resumeSignal); // do stuff with the retrieved handle
const result = await handle.result(); // block until the workflow completes, if you wish
```

This is useful for starting long lived workflows that you can interact with using Signals and Queries, while keeping things stateless on the API server.

#### Getting a Workflow's result

- If you started a Workflow with `handle.start`, you can choose to wait for the result anytime with `handle.result`.
- However you can also retrieve the result of a completed Workflow Execution even without a handle, if you only have the workflow Id.
- You can also specify a `runId`, but you will almost never need it, because most people only want the results of the latest run (a Workflow may run multiple times if failed or continued as new).
- Don't forget to handle errors here - if you call `result()` on a Workflow that prematurely ended for some reason, it will [throw an Error](https://nodejs.temporal.io/api/classes/client.WorkflowExecutionFailedError) reflecting that reason.

### Misc ways to start Workflows

- If your workflow uses [Signals](/docs/concepts/signals), you can also send a Signal that might start a workflow using the `signalWithStart` API. See the [Signals docs](/docs/node/workflow-apis) for details.
- (For advanced usecases) You can also start or execute a Workflow directly from a [WorkflowClient](https://nodejs.temporal.io/api/classes/client.workflowclient/), without creating a Handle first.

## How to cancel a Workflow

To cancel a Workflow execution, call the [`cancel()`](https://nodejs.temporal.io/api/interfaces/client.WorkflowHandle#cancel) method on a WorkflowHandle.

```ts
// Create a typed client based on the example Workflow's type
const handle = client.createWorkflowHandle(example, { taskQueue: 'tutorial' });
// Start the Workflow without waiting its completion
await handle.start(args);
// ... Later on, cancel the workflow
await handle.cancel();
```

With `cancel`, Timers and Child Workflows have the opportunity to execute cleanup code.
If you wish to skip that, you can also `terminate` forcefully.

Temporal gives you fine grained control over what happens when you cancel a workflow. See our docs on [Cancellation Scopes](/docs/node/cancellation-scopes) for details and examples.

## Scheduling Cron Workflows

import DistributedCron from '../shared/distributed-cron.md'

<DistributedCron docUrl="https://nodejs.temporal.io/api/interfaces/client.workflowoptions/#cronschedule" typeName="WorkflowOptions">

You can set each workflow to repeat on a schedule with the `cronSchedule` option:

```ts
const handle = client.createWorkflowHandle(scheduledWorkflow, {
  taskQueue: 'test',
  cronSchedule: '* * * * *', // start every minute
});
```

</DistributedCron>

## External Workflow Handles

Workflows can execute (and signal to) other workflows purely by name.
This helps particularly for executing workflows from other language SDKs.
See our [Temporal Polyglot example](https://github.com/tsurdilo/temporal-polyglot) for more.

```ts
const handle = createExternalWorkflowHandle<WFInterface>(
  workflowId,
  optionalRunId
);
// the standard handle APIs apply
```

[`createExternalWorkflowHandle`](https://nodejs.temporal.io/api/api/namespaces/workflow#newexternalworkflowhandle) returns an [`ExternalWorkflowHandle`](https://nodejs.temporal.io/api/interfaces/workflow.ExternalWorkflowHandle) that can be used to interact with existing Workflows.
