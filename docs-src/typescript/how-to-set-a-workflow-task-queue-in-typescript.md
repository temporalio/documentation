---
id: how-to-set-a-workflow-task-queue-in-typescript
title: How to set a Workflow Task Queue in TypeScript
sidebar_label: Set a Workflow Task Queue
description: Set a Workflow Task Queue
tags:
  - developer-guide
  - sdk
  - typescript
---

A Task Queue is a dynamic queue in Temporal polled by one or more Workers.

Workers bundle Workflow code and node modules using Webpack v5 and execute them inside V8 isolates. Activities are directly required and run by Workers in the Node.js environment.

Workers are flexible. You can host any or all of your Workflows and Activities on a Worker, and you can host multiple Workers on a single machine.

There are three main things the Worker needs:

- `taskQueue`: the Task Queue to poll. This is the only required argument.
- `activities`: Optional. Imported and supplied directly to the Worker.
- Workflow bundle, specify one of the following options:
  - a `workflowsPath` to your `workflows.ts` file to pass to Webpack. For example, `require.resolve('./workflows')`. Workflows will be bundled with their dependencies.
  - Or pass a prebuilt bundle to `workflowBundle`, if you prefer to handle the bundling yourself.

```ts
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  // Step 1: Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'hello-world',
  });
  // Worker connects to localhost by default and uses console.error for logging.
  // Customize the Worker by passing more options to create():
  // https://typescript.temporal.io/api/classes/worker.Worker
  // If you need to configure server connection parameters, see docs:
  // /typescript/security#encryption-in-transit-with-mtls

  // Step 2: Start accepting tasks on the `tutorial` queue
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

`taskQueue` is the only required option; however, use `workflowsPath` and `activities` to register Workflows and Activities with the Worker.

When scheduling a Workflow, a `taskQueue` must be specified.

```ts
import { Connection, WorkflowClient } from '@temporalio/client';
// This is the code that is used to start a workflow.
const connection = await Connection.create();
const client = new WorkflowClient({ connection });
const result = await client.execute(yourWorkflow, {
  // required
  taskQueue: 'your-task-queue',
  // required
  workflowId: 'your-workflow-id',
});
```

When creating a Worker, you must pass the `taskQueue` option to the `Worker.create()` function.

```ts
const worker = await Worker.create({
  // imported elsewhere
  activities,
  taskQueue: 'your-task-queue',
});
```

Optionally, in Workflow code, when calling an Activity, you can specify the Task Queue by passing the `taskQueue` option to `proxyActivities()`, `startChild()`, or `executeChild()`. If you do not specify a `taskQueue`, then the TypeScript SDK places Activity and Child Workflow Tasks in the same Task Queue as the Workflow Task Queue.
