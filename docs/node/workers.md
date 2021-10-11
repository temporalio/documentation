---
id: workers
title: Workers and Task Queues in Node
sidebar_label: Workers and Task Queues
---

**Workers and Task Queues are a critical part of your overall Temporal system.**
Your Workflows will only progress if there are Workers polling the right Task Queues, and they must have the right Workflows and Activities registered to execute those Tasks.
You can check the status of Workers and the Task Queues they poll, with [`tctl` or the Temporal Web UI](/docs/system-tools/introduction).

## What is a Worker?

A Worker is an object that connects to the Temporal Server, polls **Task Queues** for Commands, and executes [Workflows](/docs/node/workflows) and [Activities](/docs/node/activities) in response to those Commands.

- **Workers are run on user-controlled hosts.**
  - This is an important security feature which means Temporal Server (or Temporal Cloud) never executes your Workflow or Activity code, and that Workers can have different hardware (e.g. custom GPUs for Machine Learning) than the rest of the system.
  - You can use the `@temporalio/worker` package's [`Worker`](https://nodejs.temporal.io/api/classes/worker.Worker) class to create and run as many Workers as your use case demands, across any number of hosts.
- Node SDK Workers bundle Workflows based on `workflowsPath` and their dependencies from `nodeModulesPaths` with Webpack and run them inside v8 isolates.
- Node SDK Workers directly run `activities` inside the normal Node.js environment.
- Workers connect to the Temporal Server, poll their configured **Task Queue** for Tasks, execute chunks of code in response to those Tasks, and then communicate the results back.
- Workers are stateless, and can be brought up and down with no data loss impact to your overall system.
  To migrate to new versions of your Workflows and Activities, you restart your Workers with the new versions (and optionally use [the `patch` API to migrate](/docs/node/versioning) still-running workflows of the older version).

### How to develop a Worker

import Content from '../content/how-to-develop-a-worker-program-in-node.md'

<Content />

<details>
<summary>
The Worker package embeds the <a href="https://github.com/temporalio/sdk-core">Temporal Rust Core SDK</a>, it comes pre-compiled for most installations.
</summary>

We've provided pre-compiled binaries for:

- Mac with an Intel chip: `x86_64-apple-darwin`
- Mac with an Apple chip: `aarch64-apple-darwin`
- Linux with x86_64 architecture: `x86_64-unknown-linux-gnu`
- Windows with x86_64 architecture: `x86_64-pc-windows-gnu` (Windows is not yet supported but it is a [priority for us](https://github.com/temporalio/sdk-node/issues/12)).

If you need to compile the Worker yourself, set up the Rust toolchain by following the instructions [here](https://rustup.rs/).

</details>

### How to shut down a Worker and track its state

You can programmatically shut down a worker with `worker.shutdown()`.
Shut downs should be rare and often done manually in development (with `SIGINT` aka `^C`) but you may do it in integration tests or in automating a fleet of workers.

At any point in time you can query Worker state with `worker.getState()`.
A Worker is in one of 7 states at any given point:

- `INITIALIZED` - The initial state of the Worker after calling Worker.create and successful connection to the server
- `RUNNING` - `worker.run` was called, polling task queues
- `FAILED` - Worker encountered an unrecoverable error, `worker.run` should reject with the error
- The last 4 states are related to the Worker shutdown process:
  - `STOPPING` - Worker.shutdown was called or received shutdown signal, worker will forcefully shutdown in shutdownGraceTime
  - `DRAINING` - Core has indicated that shutdown is complete and all Workflow tasks have been drained, waiting for activities and cached workflows eviction
  - `DRAINED` - All activities and workflows have completed, ready to shutdown
  - `STOPPED` - Shutdown complete, `worker.run` resolves

If you need even more visibility into internal worker state, [see the API reference for more](https://nodejs.temporal.io/api/classes/worker.Worker).

### Worker Security and Networking

The Node SDK usually handles all of the communication between the Worker and the Temporal Server behind the scenes - no port configuration is required for development usecases.

### Encryption at Rest

In production settings, [Temporal supports mTLS encryption](/docs/server/security), required by Temporal Cloud.
To configure this, this SDK exposes [the Rust Core SDK](https://github.com/temporalio/sdk-core) as `Core`, which you can configure before you run `workflow.create`:

<!--SNIPSTART nodejs-mtls-worker-->
<!--SNIPEND-->

### Encryption in Transit

You can use the advanced [Interceptor and Data Converter](/docs/node/interceptors) features to encrypt your inbound and outbound Workflow and Activity calls.

## What is a Task Queue?

import SharedTaskQueuesBasic from '../shared/task-queues-basic.md'

<SharedTaskQueuesBasic
workflowLink="/docs/node/workflows"
workerLink="/docs/node/workers"
/>

### Where Task Queues are used

In Node, a Task Queue is represented in code by name, as a `string`.
There are 3 places where the name of the Task Queue is supplied by the developer.

<details>
<summary>

1. When starting a Workflow, you must pass the `taskQueue` option to the [WorkflowClient's `createWorkflowHandle()` method](https://nodejs.temporal.io/api/classes/client.workflowclient#newworkflowhandle).

</summary>

```ts
const workflow = workflowClient.createWorkflowHandle(myWorkflow, {
  taskQueue: 'my-task-queue',
});

const result = await workflow.execute();
```

</details>
<details>
<summary>

2. When creating a Worker, you must pass the `taskQueue` option to the [`Worker.create()` function](https://nodejs.temporal.io/api/classes/worker.worker-1#create).

</summary>

```ts
const worker = await Worker.create({
  workflowsPath: require.resolve('./workflows'),
  taskQueue: 'my-task-queue',
});
```

</details>
<details>
<summary>

3. Optionally, in Workflow code, when calling an Activity, you can specify the task queue by passing the `taskQueue` option to [`createActivityHandle()`](https://nodejs.temporal.io/api/namespaces/workflow#configureactivities). If you do not specify a `taskQueue`, then the Node SDK places Activity Tasks in the same Task Queue as the Workflow Task Queue.

</summary>

```ts
const { greet } = createActivityHandle<typeof activities>({
  taskQueue: 'my-other-task-queue',
  startToCloseTimeout: '1s',
});
```

</details>
