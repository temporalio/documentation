---
id: workers
title: Workers and Task Queues in TypeScript
sidebar_label: Workers
description: A Worker is a process that connects to the Temporal Server, polls Task Queues for Commands sent from Clients, and executes Workflows and Activities in response to those Commands.
---

> **@temporalio/worker** [![NPM](https://img.shields.io/npm/v/@temporalio/worker)](https://www.npmjs.com/package/@temporalio/worker) [API reference](https://typescript.temporal.io/api/namespaces/worker) | [GitHub](https://github.com/temporalio/sdk-typescript/tree/main/packages/worker)

## What is a Worker?

A Worker is a process that connects to the Temporal Server, polls **Task Queues** for Tasks sent from Clients, and executes [Workflows](/docs/typescript/workflows) and [Activities](/docs/typescript/activities) in response.

- **Workers host Workflows and Activities.**
  - TypeScript SDK Workers bundle Workflows based on `workflowsPath` and their dependencies from `nodeModulesPaths` with [Webpack](https://webpack.js.org/) and run them inside v8 isolates.
  - TypeScript SDK Workers directly run `activities` inside the normal Node.js environment.
- **Workers are extremely scalable.**
  - Workers connect to the Temporal Server, poll their configured **Task Queue** for Tasks, execute chunks of code in response to those Tasks, and then communicate the results back.
  - Workers are distinct from Clients and scaled independently of Temporal Server, which has its own internal services to scale.
  - Workers are stateless, and can be brought up and down at any time with no Temporal data loss impact.
    To migrate to new versions of your Workflows and Activities, you restart your Workers with the new versions (and optionally use [the `patch` API to migrate](/docs/typescript/patching) still-running workflows of the older version).
  - Use the `@temporalio/worker` package's [`Worker`](https://typescript.temporal.io/api/classes/worker.Worker) class to create and run as many Workers as your use case demands, across any number of hosts.
- **Workers are run on user-controlled hosts.** This is an important security feature which means Temporal Server (or Temporal Cloud) never executes your Workflow or Activity code, and that Workers can have different hardware (e.g. custom GPUs for Machine Learning) than the rest of the system.

<details>
<summary>
Your Workflows will only progress if there are Workers polling the right Task Queues, and they must have the right Workflows and Activities registered to execute those Tasks.
</summary>

The TypeScript SDK uses TypeScript, but cannot completely protect you from typos.
If you are experiencing issues, you can check the status of Workers and the Task Queues they poll with [`tctl` or the Temporal Web UI](/docs/devtools/introduction).

![Temporal Web Task Queues view](https://user-images.githubusercontent.com/6764957/126413160-18663430-bb7a-4d3a-874e-80598e1fa07d.png)

</details>

### How to develop a Worker

import Content from '../content/how-to-develop-a-worker-program-in-typescript.md'

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

You can programmatically shut down a worker with `worker.shutdown()`.
Shut downs should be rare and often done manually in development (by default, Workers shutdown if they receive any of these [`shutdownSignals`](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#shutdownsignals): `['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGUSR2']`. You can customize these signals, or the [`shutdownGraceTime`](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#shutdowngracetime) if needed).

However, you may want to programmatically shut down in integration tests or in automating a fleet of workers.

#### Worker states

At any point in time, you can query Worker state with `worker.getState()`.
A Worker is in one of 7 states at any given point:

- `INITIALIZED` - The initial state of the Worker after calling Worker.create and successful connection to the server
- `RUNNING` - `worker.run` was called, polling task queues
- `FAILED` - Worker encountered an unrecoverable error, `worker.run` should reject with the error
- The last 4 states are related to the Worker shutdown process:
  - `STOPPING` - Worker.shutdown was called or received shutdown signal, worker will forcefully shutdown in shutdownGraceTime
  - `DRAINING` - Core has indicated that shutdown is complete and all Workflow tasks have been drained, waiting for activities and cached workflows eviction
  - `DRAINED` - All activities and workflows have completed, ready to shutdown
  - `STOPPED` - Shutdown complete, `worker.run` resolves

If you need even more visibility into internal worker state, [see the API reference for more](https://typescript.temporal.io/api/classes/worker.Worker).

### Worker Networking and Security

In development, the TypeScript SDK usually handles all of the communication between the Worker and the Temporal Server behind the scenes - no port configuration is required.

In production settings, you can configure the `address` and `namespace` the Worker speaks to via [the Rust Core SDK](https://github.com/temporalio/sdk-core) as `Core`.
Temporal also supports mTLS encryption (required by Temporal Cloud) this way - please read our [Security docs](/docs/server/security) for more information.

## What is a Task Queue?

import SharedTaskQueuesBasic from '../shared/task-queues-basic.md'

<SharedTaskQueuesBasic
workflowLink="/docs/typescript/workflows"
workerLink="/docs/typescript/workers"
/>

### Where Task Queues are used

In Temporal, a Task Queue is uniquely identified by its name, as a `string`.
There are 2 main places where the name of the Task Queue is supplied by the developer.

<details>
<summary>

When scheduling a Workflow, a `taskQueue` must be specified either at client creation (with `workflowDefault`) or at the call site's `WorkflowOptions`.

</summary>

```ts
// Option 1
import { Connection, WorkflowClient } from '@temporalio/client';
const connection = new Connection();
const client = new WorkflowClient(connection.service, {
  workflowDefaults: { taskQueue: 'tutorial' },
});
const result = await client.execute(myWorkflow); // taskQueue will resolve to 'tutorial'

// Option 2
const result = await client.execute(myWorkflow, {
  taskQueue: 'tutorial', // overrides whatever was set as default
});
```

</details>
<details>
<summary>

When creating a Worker, you **must** pass the `taskQueue` option to the [`Worker.create()` function](https://typescript.temporal.io/api/classes/worker.worker-1#create).

</summary>

```ts
const worker = await Worker.create({
  activities, // imported elsewhere
  taskQueue: 'my-task-queue',
});
```

</details>

Optionally, in Workflow code, when calling an Activity, you can specify the task queue by passing the `taskQueue` option to [`proxyActivities()`](https://typescript.temporal.io/api/namespaces/workflow/#proxyActivities) or [`startChild/executeChild`](https://typescript.temporal.io/api/namespaces/workflow/#startchild).
If you do not specify a `taskQueue`, then the TypeScript SDK places Activity and Child Workflow Tasks in the same Task Queue as the Workflow Task Queue.

### Example: Sticky Activities

Any Worker that polls a Task Queue is allowed to pick up the next task; sometimes this is undesirable because you want tasks to execute sequentially on the same machine.

Fortunately, there is a design pattern for this we call "Sticky Activities".
Because Task Queues are dynamically created and very lightweight, you can use them for task routing by creating a new task queue per machine.

The main strategy is:

1. Create a `getUniqueTaskQueue` activity that generates a unique task queue name, (for example, `uniqueWorkerTaskQueue`).
   It doesn't matter where this activity is run so this can be "non sticky" as per Temporal default behavior
2. For Activities intended to be "sticky", register them in one Worker, and have that be the only Worker listening on that `uniqueWorkerTaskQueue`.
   - Multiple Workers can be created inside the same process.
3. Execute Workflows from the Client like normal.
   - Activities will execute in sequence on the same machine because they are all routed by the `uniqueWorkerTaskQueue`.

Workflow Code:

<!--SNIPSTART typescript-sticky-queues-workflow-->
<!--SNIPEND-->

Worker Code:

<!--SNIPSTART typescript-sticky-queues-worker-->
<!--SNIPEND-->

This pattern is [in use at Netflix](https://www.youtube.com/watch?v=LliBP7YMGyA&t=24s).
Note that this is unrelated to [Sticky Queues](/docs/concepts/task-queues/#sticky-queues), which are an internal implementation detail.
