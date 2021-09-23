---
id: workers
title: Workers in Node
sidebar_label: Workers
---

## What is a Worker?

A Worker is an object that connects to the Temporal Server, polls **Task Queues** for Commands, and executes [Workflows](/docs/node/workflows) and [Activities](/docs/node/activities) in response to those Commands.

- Workers are run on user-controlled hosts, an important security feature which means Temporal Server (or Temporal Cloud) never executes your Workflow or Activity code, and that Workers can have different hardware (e.g. custom GPUs for Machine Learning) than the rest of the system.
- Workers automatically discover Workflows and Activities based on `workDir` or specified paths.
- You can use the `@temporalio/worker` package's [`Worker`](https://nodejs.temporal.io/api/classes/worker.Worker) class to create and run as many Workers as your use case demands, across any number of hosts.
- Workers poll [Task Queues](/docs/node/task-queues) for Tasks, execute chunks of code in response to those Tasks, and then communicate the results back to the Temporal Server.
- You can check the status of Workers and the Task Queues they poll with Temporal Web.

## How to develop a Worker

import Content from '../content/how-to-develop-a-worker-program-in-node.md'

<Content />

## How to shut down a Worker and track its state

You can programmatically shut down a worker with `worker.shutdown()`.
Shut downs should be rare and often done manually in development (with `SIGINT` aka `^C`) but you may have a usecase for it when automating a fleet of workers.

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

## Worker Security and Networking

The Node SDK usually handles all of the communication between the Worker and the Temporal Server behind the scenes - no port configuration is required for development usecases.

In production settings, [Temporal supports mTLS encryption](/docs/server/security), required by Temporal Cloud.
To configure this, this SDK exposes [the Rust Core SDK](https://github.com/temporalio/sdk-core) as `Core`, which you can configure before you run `workflow.create`:

<!--SNIPSTART nodejs-hello-mtls-->
<!--SNIPEND-->
