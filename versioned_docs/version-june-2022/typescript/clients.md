---
id: clients
title: Workflow Clients in TypeScript
sidebar_label: Clients
description: Workflow Clients are embedded in your application code, and connect to Temporal Server via gRPC. They are the only way to schedule new Workflow Executions with Temporal Server.
---

<!-- prettier-ignore -->
import * as WhatIsATemporalCronJob from '../concepts/what-is-a-temporal-cron-job.md'

**`@temporalio/client`** [![NPM](https://img.shields.io/npm/v/@temporalio/client)](https://www.npmjs.com/package/@temporalio/client) [API reference](https://typescript.temporal.io/api/namespaces/client) | [GitHub](https://github.com/temporalio/sdk-typescript/tree/main/packages/client)

**Workflow Clients are embedded in your application code and connect to Temporal Server via gRPC**.
They are the only way to schedule new Workflow Executions with Temporal Server.

- Workflow Clients can run in any Node.js application, for example, in a serverless function, Express.js API route handler or CLI/script run.
- The primary use of Workflow Clients is to start new Workflow Executions (including [Cron Workflows](#scheduling-cron-workflows)).
  Given a `workflowId`, a Workflow Client can also get a Handle to a running Workflow Execution or retrieve/wait for its result.
- **Workflow Handles** are bindings to specific Workflow Executions that expose more APIs for control.

  **We strongly recommend familiarizing yourself with Workflow Handle APIs** because they are the main way you will signal, query, describe, cancel, terminate, and await the result of running Workflow Executions.

- Advanced users can also use the `WorkflowService` exposed by a Workflow Client to make **raw gRPC calls** (usually for introspection).

Workflow Clients are separate from Workers, but communicate with them through Task Queues to start Workflow Executions.
For more information, see [Workers and Task Queues in TypeScript](/typescript/workers) and [Workflows in TypeScript](/typescript/workflows).

## Full Example

The following code is a `WorkflowClient` example, from our Hello World sample:

<!--SNIPSTART typescript-hello-client -->
<!--SNIPEND-->

The rest of this document explains each step in detail with practical usage tips.

## Create a new Workflow Client

Create a [`WorkflowClient`](https://typescript.temporal.io/api/classes/client.workflowclient) with the requisite gRPC [`Connection`](https://typescript.temporal.io/api/classes/client.Connection):

```ts
import {Connection, WorkflowClient} from "@temporalio/client";
const connection = await Connection.connect({
  address: "temporal.prod.my.org",
}); // to configure for production
const client = new WorkflowClient({connection});
```

If you omit the connection and just call `new WorkflowClient()`, it creates a default connection that will work locally. Just remember you will need to configure your Connection and Namespace when [deploying to production](/typescript/security#encryption-in-transit-with-mtls).

## Start a Workflow Execution

When you have a Workflow Client, you can schedule the start of a Workflow with `client.start`, specifying `workflowId`, `taskQueue`, and `args` and returning a Workflow Handle (see below) immediately after the Server acknowledges receipt.

```ts
// // STEP ONE: client.start
// Option 1: Specifying args and workflowId
const handle = await client.start(example, {
  workflowId: "business-meaningful-id",
  taskQueue: "tutorial",
  args: ["foo", "bar", "baz"], // this is typechecked against workflowFn's args
});

// Option 2: Just using string name; no need to import Workflow, but no type inference
import {WorkflowStartOptions} from "@temporalio/client";
type WFType = (key: number) => Promise<string>; // arg types intentionally wrong to prove a point
const handle = await client.start<string>("example", {
  workflowId: "business-meaningful-id",
  taskQueue: "tutorial",
  args: [123], // typechecked, but actually wrong at runtime because wrong type signature
} as WorkflowStartOptions<WFType>);

// // STEP TWO: client.getHandle
// Continue in a different process (such as a serverless function)
const handle = client.getHandle(workflowId);
const result = await handle.result(); // wait for Workflow to complete and get result. See below for other Handle APIs

// alternative combination of STEP ONE + TWO
const result = await client.execute(example /*...*/); // start and immediately wait for Workflow to complete and get result
```

<details>
<summary>Note: Scheduling is not the same as Starting Workflows
</summary>

Calling `client.start` (or `client.execute`) merely sends a Command to Temporal Server to schedule a new Workflow Execution on the specified Task Queue; it does not actually start until a Worker (that has a matching Workflow Type) polling that Task Queue picks it up.

You can test this by executing a Workflow Client command without a matching Worker.
Temporal Server records the command in Event History but does not make progress with the Workflow Execution until a Worker starts polling with a matching Task Queue and Workflow Definition.

This queuing mechanic makes your application tolerant to outages and horizontally scalable, but can be confusing to newcomers if they expect that calling `client.execute(MyWorkflow)` directly executes the Workflow code on the same machine as the Client.

</details>

### Workflow Options

A brief guide to the [WorkflowOptions](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions) available to you:

- `workflowId`, `taskQueue`, and `args` (if required) are the main ones you will regularly use
- Optional features:
  - `memo` (simple annotation of Workflows)
  - `searchAttributes` (see [Search Attributes](/typescript/search-attributes))
  - `cronSchedule` (see important notes in [Cron Workflows](#scheduling-cron-workflows) section below)
- Advanced features you probably won't need: `followRuns` and `workflowIdReusePolicy`.

:::caution

Workflow-level Retries and Timeouts are not recommended.

You will see that there are `workflowRunTimeout`, `workflowExecutionTimeout`, `workflowTaskTimeout`, and `retryPolicy` options in [WorkflowOptions](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions).
We discourage using them unless you know what you are doing.
Do not rely on Workflows to timeout or fail - you probably want to push this logic down to an Activity instead.

:::

## Workflow Handle APIs

**Workflow Handles** are returned after you start a Workflow (or retrieve an existing one with `client.getHandle`) and are bound to a single Workflow instance. They represent already-started Workflow Executions, and let you `signal`, `query`, `describe`, `cancel`, or `terminate` their instance:

```ts
// Get a handle if you don't already have it
const handle = client.getHandle(workflowId);

// Handle API quick examples
await handle.cancel(); // cancel with cleanup
await handle.terminate(); // kill immediately
const WFdescription = await handle.describe(); // get Workflow Execution internal info
await handle.signal<Args>(mySignal, ...args); // see Signal docs
const queryResult = await handle.query<ReturnType, Args>(myQuery, ...args); // see Query docs
const result = await handle.result(); // block until the workflow completes and/or get return value
const result = await client.execute(example /*...*/); // Alternative API for starting and immediately waiting for Workflow completion
```

The [Workflow Handle APIs](https://typescript.temporal.io/api/interfaces/client.WorkflowHandle) let you externally control your Workflow:

| Handle API            | Description                                                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `client`              | Readonly accessor to the underlying Workflow Client.                                                                                      |
| `workflowId`          | The `workflowId` of the current Workflow.                                                                                                 |
| `firstExecutionRunId` | The `runId` of the initial run of the bound Workflow (available on handles created with `start`).                                         |
| `signaledRunId`       | The `runId` of the signalled run of the bound Workflow (available on handles created with `startWithStart`).                              |
| `query()`             | Call to query a Workflow after it's been started even if it has already completed. `const value = await handle.query(getValue, ...args);` |
| `signal()`            | Call to signal a _running_ Workflow. `await handle.signal(increment, ...args);`                                                           |
| `cancel()`            | Cancels a running Workflow.                                                                                                               |
| `terminate()`         | Terminates a running Workflow.                                                                                                            |
| `describe()`          | Describes the current Workflow Execution.                                                                                                 |
| `result()`            | Promise that resolves when Workflow Execution completes.                                                                                  |

The following covers how to use many of these APIs, you will want to be fluent with them as they cover the basics of Workflow manipulation.

### Get a Workflow's result

Workflow functions may or may not return a result when they complete.

If you started a Workflow with `handle.start`, you can choose to wait for the result anytime with `handle.result()`.

```ts
const handle = client.getHandle(workflowId);
const result = await handle.result(); // block until the workflow completes, if you wish
```

Using a Workflow Handle isn't necessary with `client.execute` by definition.

- **Don't forget to handle errors here.**
  If you call `result()` on a Workflow that prematurely ended for some reason, it throws a [WorkflowFailedError](https://typescript.temporal.io/api/classes/client.WorkflowFailedError) error that reflects that reason.

  ```ts
  const handle = client.getHandle(workflowId);
  try {
    const result = await handle.result(); // block until the workflow completes, if you wish
  } catch (err) {
    if (err instanceof WorkflowFailedError) {
      throw new Error("Temporal workflow failed: " + workflowId, {
        cause: err,
      });
    } else {
      throw new Error("error from Temporal workflow " + workflowId, {
        cause: err,
      });
    }
  }
  ```

- You can also specify a `runId`, but you will almost never need it, because most people only want the results of the latest run (a Workflow may run multiple times if failed or continued as new).

### Cancel a Workflow

To cancel a Workflow Execution, call the [`handle.cancel()`](https://typescript.temporal.io/api/interfaces/client.WorkflowHandle#cancel) method on a Workflow Handle.

```ts
// Start the Workflow without waiting its completion
await handle.start(args);
// ... Later on, cancel the workflow
await handle.cancel();
```

With `handle.cancel()`, Timers and Child Workflows have the opportunity to execute cleanup code.
If you wish to skip that, you can also [`handle.terminate()`](https://typescript.temporal.io/api/interfaces/client.WorkflowHandle#terminate) forcefully.

Temporal gives you fine grained control over what happens when you cancel a workflow. See our docs on [Cancellation Scopes](/typescript/cancellation-scopes) for details and examples.

## Scheduling Cron Workflows

You can set each workflow to repeat on a schedule with the `cronSchedule` option:

```ts
const handle = await client.start(scheduledWorkflow, {
  workflowId: "business-meaningful-id",
  taskQueue: "tutorial",
  cronSchedule: "* * * * *", // start every minute
});
```

:::info Should I use Cron Workflows or Timers?

This section is specifically about <preview page={WhatIsATemporalCronJob}>Temporal Cron Jobs</preview>, which are Workflows that have the `cronSchedule` option set in Temporal.
Because Temporal Workflows have [Timers](/typescript/workflows#timers), can loop indefinitely, and can spawn [Child Workflows](/typescript/workflows#child-workflows), it is natural to ask when to use which.

Cron Workflows are rigid and come with a lot of caveats.
They are a great choice if you have Workflows that need to run as rigidly as the native Linux `cron` utility (except distributed and fault tolerant).
However, if you have any advanced needs (including needing overlaps, or canceling individual executions without affecting the overall schedule), use Timers.

:::

You can set each Workflow to repeat on a schedule with the `cronSchedule` option:

```ts
const handle = await client.start(scheduledWorkflow, {
  taskQueue: "test",
  cronSchedule: "* * * * *", // start every minute
});
```

For more information, see the Typescript SDK [`workflowOptions` source code](https://typescript.temporal.io/api/interfaces/client.workflowoptions/#cronschedule).

## Note: Child Workflows and External Workflows

You can start Child Workflows only from within another Workflow, and not from a Client.

**Hence the main Child Workflows documentation is on the [Workflow APIs](/typescript/workflows#child-workflows) page.**

A lot of the same concepts about starting, executing, and signaling Workflow Executions apply:

```ts
// inside Workflow code
import {startChild} from "@temporalio/workflow";

export async function example(WFname: string, args: string[]): Promise<string> {
  const childHandle = await startChild(WFname, {
    // workflowId is optional only for child workflows
    // task queue and other options inherited from parent, can override
    args,
  });
  const result = await childHandle.result();
  // // equivalent to
  // const result = await executeChild(WFname, /* ... */)
  return result;
}
```

You should use [cancellationScopes](/typescript/cancellation-scopes) if you need to cancel Child Workflows.

The same concept of "Workflow Handles" applies to retrieving handles for Child and External Workflows—as long as you have the Workflow Id:

```ts
// inside Workflow code
import {getExternalWorkflowHandle} from "@temporalio/workflow";

export async function CancelExternalWorkflow(wfId: string): void {
  const extHandle = getExternalWorkflowHandle(wfId);
  // ...
}
```

Again, see [Workflows in TypeScript](/typescript/workflows#external-workflows) for full details.

## Advanced: Making raw gRPC calls

Under the hood of a `WorkflowClient`, the `Connection` is actually powered by a `WorkflowService` driver that makes the raw gRPC calls to Temporal Server.
This Service is capable of making a wider range of introspection calls.

<!--SNIPSTART typescript-grpc-call-basic-->
<!--SNIPEND-->

Using gRPC calls is often the only way to access some of the more advanced queries you can make from Temporal Server.
We highlight some queries of interest here:

<details>
<summary><a class="font-mono" href="https://typescript.temporal.io/api/classes/proto.temporal.api.workflowservice.v1.WorkflowService-1#getworkflowexecutionhistory">getWorkflowExecutionHistory</a>
</summary>

<!--SNIPSTART typescript-grpc-call-getWorkflowExecutionHistory-->
<!--SNIPEND-->

Outputs something like:

```
{
  events: [
    HistoryEvent {
      eventId: [Long],
      eventTime: [Timestamp],
      eventType: 1,
      taskId: [Long],
      workflowExecutionStartedEventAttributes: [WorkflowExecutionStartedEventAttributes]
    },
    HistoryEvent {
      eventId: [Long],
      eventTime: [Timestamp],
      eventType: 5,
      taskId: [Long],
      workflowTaskScheduledEventAttributes: [WorkflowTaskScheduledEventAttributes]
    },
    HistoryEvent {
      eventId: [Long],
      eventTime: [Timestamp],
      eventType: 6,
      taskId: [Long],
      workflowTaskStartedEventAttributes: [WorkflowTaskStartedEventAttributes]
    }
  ]
}
```

</details>

<details>
<summary><a class="font-mono" href="https://typescript.temporal.io/api/classes/proto.temporal.api.workflowservice.v1.WorkflowService-1#listworkflowexecutions) (requires ElasticSearch)">listWorkflowExecutions</a>
</summary>

<!--SNIPSTART typescript-grpc-call-listWorkflowExecutions-->
<!--SNIPEND-->

Outputs something like:

```
┌─────────┬───────────────────────────────────────────────────────────────────────────────────────────────────┬──────────────────────────────────┬─────────────────────────────────────────────────┬─────────────────────────────────────────────────┬────────┬───────────────┬─────────────────────────────────────────────────┬─────────────────────┬──────────────────────────────────────────────┬────────────┬──────────────────────┐
│ (index) │                                             execution                                             │               type               │                    startTime                    │                    closeTime                    │ status │ historyLength │                  executionTime                  │        memo         │               searchAttributes               │ taskQueue  │ stateTransitionCount │
├─────────┼───────────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────────────────┼─────────────────────────────────────────────────┼─────────────────────────────────────────────────┼────────┼───────────────┼─────────────────────────────────────────────────┼─────────────────────┼──────────────────────────────────────────────┼────────────┼──────────────────────┤
│    0    │ WorkflowExecution { workflowId: 'my-business-id', runId: '2798482a-46d8-4f1e-ab87-1ba3f7ddda1c' } │ WorkflowType { name: 'example' } │ Timestamp { seconds: [Long], nanos: 125158275 } │ Timestamp { seconds: [Long], nanos: 263021256 } │   2    │    [Long]     │ Timestamp { seconds: [Long], nanos: 125158275 } │ Memo { fields: {} } │ SearchAttributes { indexedFields: [Object] } │ 'tutorial' │        [Long]        │
│    1    │ WorkflowExecution { workflowId: 'my-business-id', runId: '76f1171b-7a73-46a3-ba66-b77bab0b73f8' } │ WorkflowType { name: 'example' } │ Timestamp { seconds: [Long], nanos: 841243925 } │ Timestamp { seconds: [Long], nanos: 935283589 } │   2    │    [Long]     │ Timestamp { seconds: [Long], nanos: 841243925 } │ Memo { fields: {} } │ SearchAttributes { indexedFields: [Object] } │ 'tutorial' │        [Long]        │
│    2    │ WorkflowExecution { workflowId: 'my-business-id', runId: '6d1197b7-41b8-47be-89b4-f1ef3446de1a' } │ WorkflowType { name: 'example' } │ Timestamp { seconds: [Long], nanos: 425778697 } │ Timestamp { seconds: [Long], nanos: 523022091 } │   2    │    [Long]     │ Timestamp { seconds: [Long], nanos: 425778697 } │ Memo { fields: {} } │ SearchAttributes { indexedFields: [Object] } │ 'tutorial' │        [Long]        │
└─────────┴───────────────────────────────────────────────────────────────────────────────────────────────────┴──────────────────────────────────┴─────────────────────────────────────────────────┴─────────────────────────────────────────────────┴────────┴───────────────┴─────────────────────────────────────────────────┴─────────────────────┴──────────────────────────────────────────────┴────────────┴──────────────────────┘
```

</details>

**For the full list of gRPC calls, see the Methods section of the [WorkflowService](https://typescript.temporal.io/api/classes/proto.temporal.api.workflowservice.v1.WorkflowService-1#methods) API reference.**

Note that if you are trying to do a lot of list-then-filter operations (e.g. `listClosedWorkflowExecutions`), the [Visibility APIs](/typescript/search-attributes) are a better choice for Temporal deployments with [ElasticSearch enabled](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster/) (this is enabled by default for all Temporal Cloud customers).
