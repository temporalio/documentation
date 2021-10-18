---
id: workers
title: Workers and Task Queues in Node.js
sidebar_label: Workers
---

> **@temporalio/worker** [![NPM](https://img.shields.io/npm/v/@temporalio/worker)](https://www.npmjs.com/package/@temporalio/worker) [API reference](https://nodejs.temporal.io/api/namespaces/worker) | [GitHub source](https://github.com/temporalio/sdk-node/tree/main/packages/worker)

## What is a Worker?

A Worker is a process that connects to the Temporal Server, polls **Task Queues** for Commands sent from Clients, and executes [Workflows](/docs/node/workflows) and [Activities](/docs/node/activities) in response to those Commands.

- **Workers host Workflows and Activities.**
  - Node SDK Workers bundle Workflows based on `workflowsPath` and their dependencies from `nodeModulesPaths` with [Webpack](https://webpack.js.org/) and run them inside v8 isolates.
  - Node SDK Workers directly run `activities` inside the normal Node.js environment.
- **Workers are extremely scalable.**
  - Workers connect to the Temporal Server, poll their configured **Task Queue** for Tasks, execute chunks of code in response to those Tasks, and then communicate the results back.
  - Workers are distinct from Clients and scaled independently of Temporal Server, which has its own internal services to scale.
  - Workers are stateless, and can be brought up and down with no data loss impact to your overall system.
    To migrate to new versions of your Workflows and Activities, you restart your Workers with the new versions (and optionally use [the `patch` API to migrate](/docs/node/patching) still-running workflows of the older version).
- **Workers are run on user-controlled hosts.**
  - This is an important security feature which means Temporal Server (or Temporal Cloud) never executes your Workflow or Activity code, and that Workers can have different hardware (e.g. custom GPUs for Machine Learning) than the rest of the system.
  - You can use the `@temporalio/worker` package's [`Worker`](https://nodejs.temporal.io/api/classes/worker.Worker) class to create and run as many Workers as your use case demands, across any number of hosts.

<details>
<summary>
Your Workflows will only progress if there are Workers polling the right Task Queues, and they must have the right Workflows and Activities registered to execute those Tasks.
</summary>

The Node SDK uses TypeScript, but cannot completely protect you from typos.
If you are experiencing issues, you can check the status of Workers and the Task Queues they poll with [`tctl` or the Temporal Web UI](/docs/system-tools/introduction).

![Temporal Web Task Queues view](https://user-images.githubusercontent.com/6764957/126413160-18663430-bb7a-4d3a-874e-80598e1fa07d.png)

</details>

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

### Worker Networking and Security

In development, the Node SDK usually handles all of the communication between the Worker and the Temporal Server behind the scenes - no port configuration is required.

In production settings, you can configure the `address` and `namespace` the Worker speaks to via [the Rust Core SDK](https://github.com/temporalio/sdk-core) as `Core`.
Temporal also supports mTLS encryption (required by Temporal Cloud) this way - please read our [Security docs](/docs/server/security) for more information.

## What is a Task Queue?

import SharedTaskQueuesBasic from '../shared/task-queues-basic.md'

<SharedTaskQueuesBasic
workflowLink="/docs/node/workflows"
workerLink="/docs/node/workers"
/>

### Where Task Queues are used

In Node, a Task Queue is represented in code by name, as a `string`.
There are 2 main places where the name of the Task Queue is supplied by the developer.

<details>
<summary>

When starting a Workflow, you **must** pass the `taskQueue` option to the [WorkflowClient's `createWorkflowHandle()` method](https://nodejs.temporal.io/api/classes/client.workflowclient#newworkflowhandle).

</summary>

```ts
const handle = workflowClient.createWorkflowHandle(myWorkflow, {
  taskQueue: 'my-task-queue',
});

const result = await handle.execute();
```

</details>
<details>
<summary>

When creating a Worker, you **must** pass the `taskQueue` option to the [`Worker.create()` function](https://nodejs.temporal.io/api/classes/worker.worker-1#create).

</summary>

```ts
const worker = await Worker.create({
  activities, // imported elsewhere
  taskQueue: 'my-task-queue',
});
```

</details>

Optionally, in Workflow code, when calling an Activity, you can specify the task queue by passing the `taskQueue` option to [`createActivityHandle()`](https://nodejs.temporal.io/api/namespaces/workflow/#createactivityhandle) or [`createChildWorkflowHandle()`](https://nodejs.temporal.io/api/namespaces/workflow/#createchildworkflowhandle).
If you do not specify a `taskQueue`, then the Node SDK places Activity and Child Workflow Tasks in the same Task Queue as the Workflow Task Queue.
