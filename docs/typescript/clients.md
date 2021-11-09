---
id: clients
title: Workflow Clients in TypeScript
sidebar_label: Clients
description: In the Temporal TypeScript SDK programming model, a Workflow is an exportable function that adheres to a set of rules.
image: /img/workflow.png
---

> **@temporalio/client** [![NPM](https://img.shields.io/npm/v/@temporalio/client)](https://www.npmjs.com/package/@temporalio/client) [API reference](https://typescript.temporal.io/api/namespaces/client) | [GitHub](https://github.com/temporalio/sdk-typescript/tree/main/packages/client)

**Workflow Clients are embedded in your application code, and connect to Temporal Server via gRPC**.
They are the only way to schedule new Workflow Executions with Temporal Server.

- Workflow Clients can run in any Node.js application, for example, in a serverless function, Express.js API route handler or CLI/script run.
- The primary use of Workflow Clients is to `start` or `execute` new Workflow Executions (including [Cron Workflows](#scheduling-cron-workflows)).
  Given a `workflowId`, Workflow Clients may also get a Handle to a running Workflow Execution or retrieve/wait for its result.
- **Workflow Handles** are bindings to specific Workflow Executions that expose more APIs for control.
  **We strongly recommend familiarising yourself with Workflow Handle APIs** as they are the main way you will signal, query, describe, cancel, terminate and await the result of running Workflow Executions.

Workflow Clients are separate from Workers, but communicate with them via Task Queues to start Workflow Executions.
See the dedicated [Workers and Task Queues docs](/docs/typescript/workers) and [Workflow docs](/docs/typescript/workflows) for more info.

## Full Example

Here is example WorkflowClient code from our Hello World sample:

<!--SNIPSTART typescript-hello-client {"enable_source_link": false}-->
<!--SNIPEND-->

The rest of this doc explains each step in detail with practical usage tips.

## Create a new Workflow Client

Create a [`WorkflowClient`](https://typescript.temporal.io/api/classes/client.workflowclient) with the requisite gRPC [`Connection`](https://typescript.temporal.io/api/classes/client.Connection):

```ts
import { Connection, WorkflowClient } from '@temporalio/client';
const connection = new Connection();
const client = new WorkflowClient(connection.service, {
  workflowDefaults: { taskQueue: 'tutorial' },
});
```

If you omit the connection and just call `new WorkflowClient()`, it creates a default connection that will work locally. Just remember you will need to configure your Connection and namespace when [deploying to production](/docs/typescript/security#encryption-in-transit-with-mtls).

You can set all default [WorkflowOptions](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions) inside [WorkflowClientOptions](https://typescript.temporal.io/api/interfaces/client.WorkflowClientOptions) with the `workflowDefaults` key; you can choose to set task queue here rather than at the callsite purely as a matter of personal preference.

## Schedule a Workflow Execution

Once you have a Workflow Client, you can schedule a new Workflow Execution in three ways:

- `client.execute` ("Blocking"): returns a promise that only resolves after the Workflow completes
- `client.start` ("Non-Blocking"): returns a handle immediately after Workflow starts
- (Advanced) `client.signalWithStart`: signal a Workflow and optionally start one if there is none running. See the [Signals docs](/docs/typescript/workflows) for details.

You can specify [WorkflowOptions](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions) with any of these, though you will primarily be interested in setting the `workflowId`, `taskQueue`, `searchAttributes`, and perhaps the `cronSchedule` (with important caveats you should read in the [Cron Workflows section below](#scheduling-cron-workflows)).

<details>
<summary>Note: Scheduling is not the same as Starting
</summary>

Calling `execute` or `start` merely sends a Command to Temporal Server to schedule a new Workflow Execution on the specified Task Queue; it does not actually start until a Worker (that has a matching Workflow Type) polling that Task Queue picks it up.

You can test this by executing a Workflow Client command without a matching Worker, and seeing that Temporal Server records the command in Event History but does not make progress with the Workflow Execution until a Worker starts polling with a matching Task Queue and Workflow Definition.

This queuing mechanic makes your application tolerant to outages and horizontally scalable, but can be confusing to newcomers if they expect that calling `client.execute(MyWorkflow)` directly executes the Workflow code on the same machine as the Client.

</details>

### Execute a Workflow (Blocking)

Start a Workflow (and specify [WorkflowOptions](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions)), and only resolve on Workflow completion:

```ts
import { example } from './workflows';

// If no args needed
const result = await client.execute(example);

// With args, and workflowId
const result = await client.execute(example, {
  workflowId, // use business-meaningful ID in production
  args: ['foo', 'bar', 'baz'], // this is typechecked against workflowFn's args
});

// Just using string name; no need to import Workflow, but no type inference
import { WorkflowStartOptions } from '@temporalio/client';
type WFType = (key: number) => Promise<string>; // arg types intentionally wrong to prove a point
const result = await client.execute<string>('example', {
  args: [123], // typechecked, but actually wrong at runtime because wrong type signature
} as WorkflowStartOptions<WFType>);
```

`client.execute` is useful for short lived workflows that you don't need to interact with after they start, beyond just waiting for a return value.

You can specify the Workflow's `args` and all [WorkflowOptions](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions) (including `taskQueue`, `cronSchedule`, and `searchAttributes`), in the second argument object.
Notice that `workflowId` is optional but we recommend it in production as Temporal guarantees that only one Workflow with that `workflowId` will run at any given time, per namespace.

### Start a Workflow (Non-Blocking)

Schedule the start of a workflow (and specify [WorkflowOptions](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions)) and resolve immediately once the Server acknowledges receipt.
Then retrieve it later with `client.getHandle`:

```ts
import { example } from './workflows';

// // STEP ONE: client.start
// Option 1: If no args needed
const handle = await client.start(example);
// return handle.workflowId // if you need to access autogenerated workflowId

// Option 2: Specifying args and workflowId
const handle = await client.start(example, {
  workflowId, // use business-meaningful ID in production
  args: ['foo', 'bar', 'baz'], // this is typechecked against workflowFn's args
});

// Option 3: Just using string name; no need to import Workflow, but no type inference
import { WorkflowStartOptions } from '@temporalio/client';
type WFType = (key: number) => Promise<string>; // arg types intentionally wrong to prove a point
const handle = await client.start<string>('example', {
  args: [123], // typechecked, but actually wrong at runtime because wrong type signature
} as WorkflowStartOptions<WFType>);

// // STEP TWO: client.getHandle
// Continue in a different process (e.g. in a serverless function)
const handle = client.getHandle(workflowId);
await handle.cancel(); // see below for other Handle APIs
```

This is useful for starting long lived workflows that you can interact with using Signals and Queries, while keeping things stateless on your API server.

## Workflow Handle APIs

**Workflow Handles** are returned after you start a Workflow (or retrieve an existing one with `client.getHandle`) and are bound to a single Workflow instance. They represent already-started Workflow Executions, and let you `signal`, `query`, `describe`, `cancel`, or `terminate` their instance:

```ts
// Get a handle if you don't already have it
const handle = client.getHandle(workflowId);

// Handle API quick examples
await handle.cancel(); // gracefully cancel
await handle.terminate(); // kill immediately
const result = await handle.result(); // block until the workflow completes and/or get return value
const WFdescription = await handle.describe(); // get Workflow Execution internal info
await handle.signal<Args>(mySignal, ...args); // see Signal docs
const queryResult = await handle.query<ReturnType, Args>(myQuery, ...args); // see Query docs
```

The [Workflow Handle APIs](https://typescript.temporal.io/api/interfaces/client.WorkflowHandle) let you externally control your Workflow:

| Handle API      | Description                                                                                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `client`        | Readonly accessor to the underlying WorkflowClient.                                                                                       |
| `workflowId`    | The workflowId of the current Workflow.                                                                                                   |
| `originalRunId` | The runId of the initial run of the bound Workflow.                                                                                       |
| `query()`       | Call to query a Workflow after it's been started even if it has already completed. `const value = await handle.query(getValue, ...args);` |
| `signal()`      | Call to signal a _running_ Workflow. `await handle.signal(increment, ...args);`                                                           |
| `cancel()`      | Cancel a running Workflow.                                                                                                                |
| `terminate()`   | Terminate a running Workflow                                                                                                              |
| `describe()`    | Describe the current workflow execution                                                                                                   |
| `result()`      | Promise that resolves when Workflow execution completes                                                                                   |

The following covers how to use many of these APIs, you will want to be fluent with them as they cover the basics of Workflow manipulation.

### Get a Workflow's result

Workflow functions may or may not return a result when they complete.

If you started a Workflow with `handle.start`, you can choose to wait for the result anytime with `handle.result()`. This

```ts
const handle = await client.getHandle(workflowId);
const result = await handle.result(); // block until the workflow completes, if you wish
```

This isn't necessary with `handle.execute` by definition.

- **Don't forget to handle errors here** - if you call `result()` on a Workflow that prematurely ended for some reason, it will [throw an Error](https://typescript.temporal.io/api/classes/client.WorkflowFailedError) reflecting that reason.
- You can also specify a `runId`, but you will almost never need it, because most people only want the results of the latest run (a Workflow may run multiple times if failed or continued as new).

### Cancel a Workflow

To cancel a Workflow execution, call the [`handle.cancel()`](https://typescript.temporal.io/api/interfaces/client.WorkflowHandle#cancel) method on a WorkflowHandle.

```ts
// Start the Workflow without waiting its completion
await handle.start(args);
// ... Later on, cancel the workflow
await handle.cancel();
```

With `handle.cancel()`, Timers and Child Workflows have the opportunity to execute cleanup code.
If you wish to skip that, you can also [`handle.terminate()`](https://typescript.temporal.io/api/interfaces/client.WorkflowHandle#terminate) forcefully.

Temporal gives you fine grained control over what happens when you cancel a workflow. See our docs on [Cancellation Scopes](/docs/typescript/cancellation-scopes) for details and examples.

## Scheduling Cron Workflows

You can set each workflow to repeat on a schedule with the `cronSchedule` option:

```ts
const handle = await client.start(scheduledWorkflow, {
  taskQueue: 'test',
  cronSchedule: '* * * * *', // start every minute
});
```

:::info Should I use Cron Workflows or Timers?

This section is specifically about [Temporal Cron Jobs](/docs/content/what-is-a-temporal-cron-job/), Workflows that have the `cronSchedule` option set in Temporal.
Since Temporal Workflows have [Timers](/docs/typescript/workflows#timers), can loop indefinitely, and can spawn [Child Workflows](/docs/typescript/workflows#child-workflows), it is natural to ask when to use which.

Cron Workflows are rigid and come with a lot of caveats.
They are a great choice if you have Workflows that need to run as rigidly as the native Linux `cron` utility (except distributed and fault tolerant).
However, if you have any advanced needs (including needing overlaps, or canceling individual executions without affecting the overall schedule), use Timers.

:::

import DistributedCron from '../shared/distributed-cron.md'

<DistributedCron docUrl="https://typescript.temporal.io/api/interfaces/client.workflowoptions/#cronschedule" typeName="WorkflowOptions">

You can set each workflow to repeat on a schedule with the `cronSchedule` option:

```ts
const handle = await client.start(scheduledWorkflow, {
  taskQueue: 'test',
  cronSchedule: '* * * * *', // start every minute
});
```

</DistributedCron>

## Note: Child Workflows and External Workflows

You can only start Child Workflows from within another Workflow, not from a Client.
**Hence their main documentation is on the [Workflow APIs documentation](/docs/typescript/workflows#child-workflows)**.

However, a lot of the same concepts about starting, executing and controlling Workflow Executions apply:

```ts
// inside Workflow code
import { executeChild } from '@temporalio/workflow';

export async function StartAllChildrenWorkflow(
  names: string[]
): Promise<string> {
  const responseArray = await Promise.all(
    names.map((name) => {
      return executeChild(childWorkflow, {
        // other ChildWorkflowOptions here
        args: [name],
      });
    })
  );
  return responseArray.join('\n');
}
```

The same concept of "Workflow Handles" applies to retrieving handles for Child and External Workflows - as long as you have the Workflow ID:

```ts
// inside Workflow code
import { getExternalWorkflowHandle } from '@temporalio/workflow';

export async function CancelExternalWorkflow(wfId: string): void {
  const extHandle = getExternalWorkflowHandle(wfId);
  // ...
}
```

Again, see the [Workflow APIs documentation](/docs/typescript/workflows#external-workflows) for full details.
