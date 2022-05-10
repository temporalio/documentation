---
id: workers
title: Workers and Task Queues in TypeScript
sidebar_label: Workers
description: A Worker is a process that connects to the Temporal Server, polls Task Queues for Commands sent from Clients, and executes Workflows and Activities in response to those Commands.
---

**`@temporalio/worker`** [![NPM](https://img.shields.io/npm/v/@temporalio/worker)](https://www.npmjs.com/package/@temporalio/worker) [API reference](https://typescript.temporal.io/api/namespaces/worker) | [GitHub](https://github.com/temporalio/sdk-typescript/tree/main/packages/worker)

> _Background reading: [Workers in Temporal](/temporal-explained/task-queues-and-workers)_

## What is a Worker?

A Worker is a process that connects to the Temporal Server, polls **Task Queues** for Tasks sent from Clients, and executes [Workflows](/typescript/workflows) and [Activities](/typescript/activities) in response.

- **Workers host Workflows and Activities.**
  - TypeScript SDK Workers bundle Workflows based on `workflowsPath` and their dependencies from `nodeModulesPaths` with [Webpack](https://webpack.js.org/) and run them inside v8 isolates.
  - TypeScript SDK Workers directly run `activities` inside the normal Node.js environment.
- **Workers are extremely scalable.**
  - Workers connect to the Temporal Server, poll their configured **Task Queue** for Tasks, execute chunks of code in response to those Tasks, and then communicate the results back.
  - Workers are distinct from Clients and scaled independently of Temporal Server, which has its own internal services to scale.
  - Workers are stateless, and can be brought up and down at any time with no Temporal data loss impact.
    To migrate to new versions of your Workflows and Activities, you restart your Workers with the new versions (and optionally use [the `patch` API to migrate](/typescript/patching) still-running Workflows of the older version).
  - Use the `@temporalio/worker` package's [`Worker`](https://typescript.temporal.io/api/classes/worker.Worker) class to create and run as many Workers as your use case demands, across any number of hosts.
- **Workers are run on user-controlled hosts.** This is an important security feature which means Temporal Server (or Temporal Cloud) never executes your Workflow or Activity code, and that Workers can have different hardware (e.g. custom GPUs for Machine Learning) than the rest of the system.

<details>
<summary>
Your Workflows will only progress if there are Workers polling the right Task Queues, and they must have the right Workflows and Activities registered to execute those Tasks.
</summary>

The TypeScript SDK uses TypeScript, but cannot completely protect you from typos.
If you are experiencing issues, you can check the status of Workers and the Task Queues they poll with [`tctl` or the Temporal Web UI](/devtools/introduction).

![Temporal Web Task Queues view](https://user-images.githubusercontent.com/6764957/126413160-18663430-bb7a-4d3a-874e-80598e1fa07d.png)

</details>

### How to develop a Worker

import Content from '../typescript/how-to-develop-a-worker-program-in-typescript.md'

<Content />

<details>
<summary>
The Worker package embeds the <a href="https://github.com/temporalio/sdk-core">Temporal Rust Core SDK</a>.
It comes pre-compiled for most installations.
</summary>

We've provided pre-compiled binaries for:

- Mac with an Intel chip: `x86_64-apple-darwin`
- Mac with an Apple chip: `aarch64-apple-darwin`
- Linux with x86_64 architecture: `x86_64-unknown-linux-gnu`
- Windows with x86_64 architecture: `x86_64-pc-windows-gnu` (Windows is not yet supported but it is a [priority for us](https://github.com/temporalio/sdk-typescript/issues/12)).

If you need to compile the Worker yourself, set up the Rust toolchain by following the instructions [here](https://rustup.rs/).

</details>

### Prebuilt Workflow Bundles

Advanced users can pass a prebuilt bundle instead of `workflowsPath`, or you can use Temporal's `bundleWorkflowCode` helper:

```ts
import { bundleWorkflowCode, Worker } from '@temporalio/worker';

// Option 1: passing path to prebuilt bundle
const worker = await Worker.create({
  taskQueue,
  workflowBundle: { path: './path-to-bundle.js' },
});

// Option 2: bundling code using Temporal's bundler settings
const workflowBundle = await bundleWorkflowCode({
  workflowsPath: require.resolve('./path-to-your-workflows'),
});
const worker = await Worker.create({
  taskQueue,
  workflowBundle,
});
```

### How to shut down a Worker and track its state

Workers shut down if they receive any of these [`shutdownSignals`](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#shutdownsignals): `['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGUSR2']`. In development, we shut down Workers with `Ctrl-C` (`SIGINT`) or [`nodemon`](https://github.com/temporalio/samples-typescript/blob/c37bae3ea235d1b6956fcbe805478aa46af973ce/hello-world/package.json#L10) (`SIGUSR2`). In production, we usually want to give Workers a [`shutdownGraceTime`](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#shutdowngracetime) long enough for them to finish any in-progress Activities. As soon as they receive a shutdown signal or request, the Worker stops polling for new Tasks and allows in-flight Tasks to complete until `shutdownGraceTime` is reached. Any Activities that are still running at that time will stop running, and will be rescheduled by Temporal Server when an [Activity timeout](https://docs.temporal.io/typescript/activities#activity-timeouts) occurs.

We may want to programmatically shut down Workers (with `worker.shutdown()`) in integration tests or when automating a fleet of Workers.

#### Worker states

At any point in time, we can Query Worker state with `worker.getState()`.
A Worker is in one of 7 states at any given point:

- `INITIALIZED` - The initial state of the Worker after calling Worker.create and successful connection to the server
- `RUNNING` - `worker.run()` was called, polling Task Queues
- `FAILED` - Worker encountered an unrecoverable error, `worker.run()` should reject with the error
- The last 4 states are related to the Worker shutdown process:
  - `STOPPING` - `worker.shutdown()` was called or received shutdown Signal, Worker will forcefully shutdown after `shutdownGraceTime`
  - `DRAINING` - Core has indicated that shutdown is complete and all Workflow tasks have been drained, waiting for activities and cached Workflows eviction
  - `DRAINED` - All activities and Workflows have completed, ready to shutdown
  - `STOPPED` - Shutdown complete, `worker.run()` resolves

If you need even more visibility into internal Worker state, [see the API reference for more](https://typescript.temporal.io/api/classes/worker.Worker).

## Rust Core and Worker Networking

In development, the TypeScript SDK usually handles all of the communication between the Worker and the Temporal Server behind the scenes.

In production settings, you can configure the `address` and `namespace` the Worker speaks to via [the Rust Core SDK](https://github.com/temporalio/sdk-core) [`NativeConnection`](https://typescript.temporal.io/api/classes/worker.nativeconnection/), and configure the Core [`Runtime`](https://typescript.temporal.io/api/classes/worker.runtime/#install) with [RuntimeOptions](https://typescript.temporal.io/api/interfaces/worker.RuntimeOptions):

```js
import {
  Worker,
  DefaultLogger,
  Runtime,
  NativeConnection,
} from '@temporalio/worker';

const logger = new DefaultLogger('DEBUG');
Runtime.install({
  logger,
  telemetryOptions: { logForwardingLevel: 'INFO' },
});
const connection = await NativeConnection.create({
  address: 'temporal.myorg.io',
});
const worker = await Worker.create({
  connection /* standard Worker options from here */,
});
```

Temporal also supports mTLS encryption (required by Temporal Cloud) this way - please read our [Security docs](/typescript/security#encryption-in-transit-with-mtls) for more information.

## Task Queues

import WhatIsATaskQueue from '../concepts/what-is-a-task-queue.md'

<details>
<summary>
A Task Queue is a dynamic queue in Temporal Server polled by one or more Workers.
</summary>

<WhatIsATaskQueue />

</details>

### Where Task Queues are used

In Temporal, a Task Queue is represented in code by its name as a `string`.

There are two main places where the name of the Task Queue is supplied by the developer.

<details>
<summary>

When scheduling a Workflow, a `taskQueue` must be specified.

</summary>

```ts
import { Connection, WorkflowClient } from '@temporalio/client';
const connection = new Connection();
const client = new WorkflowClient();
const result = await client.execute(myWorkflow, {
  taskQueue: 'testhttp', // required
  workflowId: 'business-meaningful-id', // also required but not the point
});
```

</details>
<details>
<summary>

When creating a Worker, you **must** pass the `taskQueue` option to the [`Worker.create()` function](https://typescript.temporal.io/api/classes/worker.worker#create).

</summary>

```ts
const worker = await Worker.create({
  activities, // imported elsewhere
  taskQueue: 'my-task-queue',
});
```

</details>

Optionally, in Workflow code, when calling an Activity, you can specify the Task Queue by passing the `taskQueue` option to [`proxyActivities()`](https://typescript.temporal.io/api/namespaces/workflow/#proxyActivities) or [`startChild/executeChild`](https://typescript.temporal.io/api/namespaces/workflow/#startchild).
If you do not specify a `taskQueue`, then the TypeScript SDK places Activity and Child Workflow Tasks in the same Task Queue as the Workflow Task Queue.

### Example: Sticky Activities

Any Worker that polls a Task Queue is allowed to pick up the next task; sometimes this is undesirable because you want tasks to execute sequentially on the same machine.

Fortunately, there is a design pattern for this we call _Sticky Activities_.
Because Task Queues are dynamically created and very lightweight, you can use them for task routing by creating a new Task Queue per machine.

The main strategy is:

1. Create a `getUniqueTaskQueue` Activity that generates a unique Task Queue name, (for example, `uniqueWorkerTaskQueue`).
   It doesn't matter where this Activity is run so this can be "non sticky" as per Temporal default behavior
2. For Activities intended to be _sticky_, register them in one Worker, and have that be the only Worker listening on that `uniqueWorkerTaskQueue`.
   - Multiple Workers can be created inside the same process.
3. Execute Workflows from the Client like normal.
   - Activities will execute in sequence on the same machine because they are all routed by the `uniqueWorkerTaskQueue`.

Workflow Code:

<!--SNIPSTART typescript-sticky-queues-workflow-->
[activities-sticky-queues/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/activities-sticky-queues/src/workflows.ts)
```ts
const { getUniqueTaskQueue } = proxyActivities<ReturnType<typeof createNonStickyActivities>>({
  startToCloseTimeout: '1 minute',
});

export async function fileProcessingWorkflow(maxAttempts = 5): Promise<void> {
  for (let attempt = 1; attempt <= maxAttempts; ++attempt) {
    try {
      const uniqueWorkerTaskQueue = await getUniqueTaskQueue();
      const activities = proxyActivities<ReturnType<typeof createStickyActivities>>({
        taskQueue: uniqueWorkerTaskQueue,
        // Note the use of scheduleToCloseTimeout.
        // The reason this timeout type is used is because this task queue is unique
        // to a single worker. When that worker goes away, there won't be a way for these
        // activities to progress.
        scheduleToCloseTimeout: '1 minute',
      });

      const downloadPath = `/tmp/${uuid4()}`;
      await activities.downloadFileToWorkerFileSystem('https://temporal.io', downloadPath);
      try {
        await activities.workOnFileInWorkerFileSystem(downloadPath);
      } finally {
        await activities.cleanupFileFromWorkerFileSystem(downloadPath);
      }
      return;
    } catch (err) {
      if (attempt === maxAttempts) {
        console.log(`Final attempt (${attempt}) failed, giving up`);
        throw err;
      }

      console.log(`Attempt ${attempt} failed, retrying on a new Worker`);
    }
  }
}
```
<!--SNIPEND-->

Worker Code:

<!--SNIPSTART typescript-sticky-queues-worker-->
[activities-sticky-queues/src/worker.ts](https://github.com/temporalio/samples-typescript/blob/master/activities-sticky-queues/src/worker.ts)
```ts
async function run() {
  const uniqueWorkerTaskQueue = uuid();

  const workers = await Promise.all([
    Worker.create({
      workflowsPath: require.resolve('./workflows'),
      activities: createNonStickyActivities(uniqueWorkerTaskQueue),
      taskQueue: 'sticky-activity-tutorial',
    }),
    Worker.create({
      // No workflows for this queue
      activities: createStickyActivities(),
      taskQueue: uniqueWorkerTaskQueue,
    }),
  ]);
  await Promise.all(workers.map((w) => w.run()));
}
```
<!--SNIPEND-->

This pattern is [in use at Netflix](https://www.youtube.com/watch?v=LliBP7YMGyA&t=24s).
Note that this is unrelated to [Sticky Queues](/concepts/what-is-a-sticky-execution), which are an internal implementation detail.
