---
id: client
title: Workflow Clients in TypeScript
sidebar_label: Clients
description: In the Temporal TypeScript SDK programming model, a Workflow is an exportable function that adheres to a set of rules.
image: /img/workflow.png
---

import RelatedReadList from '../components/RelatedReadList.js'

> **@temporalio/client** [![NPM](https://img.shields.io/npm/v/@temporalio/client)](https://www.npmjs.com/package/@temporalio/client) [API reference](https://typescript.temporal.io/api/namespaces/client) | [GitHub source](https://github.com/temporalio/sdk-typescript/tree/main/packages/client)

**Workflow Clients connect to Temporal Server via gRPC and create Workflow Handles, which are the main way to start, signal, query, or cancel Workflows**.

- Workflow Clients are not bound to Workers and can be run in any Node.js application, for example, in a serverless function, Express.js API route handler or CLI/script run.
- This doc assumes that you have already written your Workflow code. See the dedicated [Workflow docs](/docs/typescript/workflows) if you need that.

## Full Example

Here is example WorkflowClient code from our Hello World sample:

<!--SNIPSTART typescript-hello-client {"enable_source_link": false}-->
<!--SNIPEND-->

The rest of this doc explains each step in detail with practical usage tips.

## How to create Workflow Clients and Handles

- **Workflow Clients** are generic, capable of starting, executing, and retrieving the results of any Workflow given its `workflowId`.
- **Workflow Handles** are created from Workflow Clients and are bound to a single Workflow instance. They can do everything Clients can do, plus signal, query, describe, cancel, or terminate their instance.

We nudge you toward using Workflow Handles where possible as they are more specific and have access to more APIs.

### Create a new Workflow Client

First, create a [`WorkflowClient`](https://typescript.temporal.io/api/classes/client.workflowclient) with the requisite [`Connection`](https://typescript.temporal.io/api/classes/client.Connection):

```ts
import { Connection, WorkflowClient } from '@temporalio/client';
const connection = new Connection();
const client = new WorkflowClient(connection.service);
```

### Create a Handle for a new Workflow

Once you have a WorkflowClient, you then create a Handle with [`client.createWorkflowHandle`](https://typescript.temporal.io/api/classes/client.workflowclient/#createworkflowhandle).
This is an overloaded function that can be used in two ways:

```ts
const handle = client.createWorkflowHandle(exampleWorkflow, {
  taskQueue: 'tutorial',
  // workflowId: 'your-unique-id-123' // recommended for production
  // other workflow options
});
```

#### Workflow Handle Options

Workflow Options are set before a Workflow Execution is created, passed to `createWorkflowHandle`.
There are a range of [`WorkflowOptions`](https://typescript.temporal.io/api/interfaces/client.workflowoptions/), notable ones listed here:

- `taskQueue` (required): Task queue to use for workflow tasks. It should match a task queue specified when creating a Worker that hosts the workflow code.
- `workflowId` (recommended): Specify unique [Workflow ID](/docs/concepts/workflows#workflow-id) to assign to the Workflow Execution.
  - We recommend assigning business-meaningful customer or order IDs here to prevent duplicate transactions.
  - Workflow ID is "unique" in that Temporal will guarantee only one Workflow Execution with this ID is run at any point in time (within a given namespace).
    Advanced users can finetune this behavior with the [workflowIdReusePolicy](https://typescript.temporal.io/api/interfaces/client.workflowoptions/#workflowidreusepolicy).
  - If not specified, a UUID is generated, which you can access with `handle.workflowId`.
- `cronSchedule`: see ["Scheduling Cron Workflows"](#scheduling-cron-workflows)
- `searchAttributes`: Specifies additional indexed information for visibility/metadata (see [What is a Search Attribute](/docs/content/what-is-a-search-attribute)).

Workflow-level Timeouts and Retries exist, but we do not recommend setting them (do them at the Activity level instead) unless you know what you are doing.

#### Workflow Handle APIs

The Workflow Handle [exposes a number of important APIs](https://typescript.temporal.io/api/interfaces/client.WorkflowHandle) that you will use to externally control your Workflow:

| Handle API          | Description                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client`            | Readonly accessor to the underlying WorkflowClient.                                                                                                     |
| `workflowId`        | The workflowId of the current Workflow.                                                                                                                 |
| `query()`           | Call to query a Workflow after it's been started even if it has already completed. `const value = await workflow.query(getValue);`                      |
| `signal()`          | Call to signal a _running_ Workflow. `await workflow.signal(increment, 1);`                                                                             |
| `signalWithStart()` | Sends a signal to a running Workflow or starts a new one if not already running and immediately signals it. Useful when you're unsure of the run state. |
| `cancel()`          | Cancel a running Workflow.                                                                                                                              |
| `terminate()`       | Terminate a running Workflow                                                                                                                            |
| `describe()`        | Describe the current workflow execution                                                                                                                 |
| `execute()`         | Start the Workflow with arguments, returns a Promise that resolves when the Workflow execution completes                                                |
| `start()`           | Start the Workflow with arguments, returns immediately with a Promise that resolves with a `runId` (usually not needed)                                 |
| `result()`          | Promise that resolves when Workflow execution completes                                                                                                 |

The next section covers how to use many of these APIs, you will want to be fluent with them as they cover the basics of Workflow manipulation.

### Create a Handle for an existing Workflow

You can also use [`client.createWorkflowHandle`](https://typescript.temporal.io/api/classes/client.workflowclient/#createworkflowhandle) to create a handle for an EXISTING Workflow, given it's `workflowId`:

```ts
const handle = client.createWorkflowHandle({ workflowId: id }); // no options needed
```

No options are needed because the Workflow Handle will have the same options set at original creation.

## How to start a Workflow

Once you have a Workflow Definition and a Workflow Client, you can create a new Workflow Execution in two main ways (with other advanced options available).

### Execute a Workflow (Blocking)

Start a workflow and await completion: `const result = await workflow.execute(args)`

```ts
// In initial processs...
const handle = client.createWorkflowHandle(workflowFn, options);
const result = await handle.execute(args);
```

This is useful for short lived workflows that you don't need to interact with after they start, beyond just waiting for a return value.

### Start a Workflow (Non-Blocking)

Start a workflow without blocking until completion: `await workflow.start(args)`

Once you have the `workflowId` of a Workflow Execution you can retrieve it later in a different process:

```ts
// In initial processs...
const handle = client.createWorkflowHandle(workflowFn, options);
await handle.start(args); // no point assigning result, `start` doesnt return any
return handle.workflowId; // send this to frontend, or store this somewhere

// In a different process...
const handle = client.createWorkflowHandle({ workflowId /* ,  runId */ });
await handle.signal(resumeSignal); // do stuff with the retrieved handle
const result = await handle.result(); // block until the workflow completes, if you wish
```

This is useful for starting long lived workflows that you can interact with using Signals and Queries, while keeping things stateless on the API server.

#### Getting a Workflow's result

- If you started a Workflow with `handle.start`, you can choose to wait for the result anytime with `handle.result`.
- However you can also retrieve the result of a completed Workflow Execution even without a handle, if you only have the workflow Id, with `client.result({ workflowId })`.
- You can also specify a `runId`, but you will almost never need it, because most people only want the results of the latest run (a Workflow may run multiple times if failed or continued as new).
- Don't forget to handle errors here - if you call `result()` on a Workflow that prematurely ended for some reason, it will [throw an Error](https://typescript.temporal.io/api/classes/client.WorkflowExecutionFailedError) reflecting that reason.

### Misc ways to start Workflows

- If your workflow uses [Signals](/docs/content/what-is-a-signal), you can also send a Signal that might start a workflow using the `signalWithStart` API. See the [Signals docs](/docs/typescript/workflows) for details.
- (For advanced usecases) You can also start or execute a Workflow directly from a [WorkflowClient](https://typescript.temporal.io/api/classes/client.workflowclient/), without creating a Handle first.

## How to cancel a Workflow

To cancel a Workflow execution, call the [`cancel()`](https://typescript.temporal.io/api/interfaces/client.WorkflowHandle#cancel) method on a WorkflowHandle.

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

Temporal gives you fine grained control over what happens when you cancel a workflow. See our docs on [Cancellation Scopes](/docs/typescript/cancellation-scopes) for details and examples.

## Scheduling Cron Workflows

import DistributedCron from '../shared/distributed-cron.md'

<DistributedCron docUrl="https://typescript.temporal.io/api/interfaces/client.workflowoptions/#cronschedule" typeName="WorkflowOptions">

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

[`createExternalWorkflowHandle`](https://typescript.temporal.io/api/api/namespaces/workflow#newexternalworkflowhandle) returns an [`ExternalWorkflowHandle`](https://typescript.temporal.io/api/interfaces/workflow.ExternalWorkflowHandle) that can be used to interact with existing Workflows.
