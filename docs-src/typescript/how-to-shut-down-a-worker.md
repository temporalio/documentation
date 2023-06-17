---
id: how-to-shut-down-a-worker
title: How to shut down a Worker and track its state
description: To shut down a Worker, send a shutdown Signal to the Worker or call `Worker.shutdown()`.
sidebar_label: Shut down a worker
tags:
  - guide-context
---

Workers shut down if they receive any of the Signals enumerated in [shutdownSignals](https://typescript.temporal.io/api/interfaces/worker.RuntimeOptions#shutdownsignals): `'SIGINT'`, `'SIGTERM'`, `'SIGQUIT'`, and `'SIGUSR2'`.

In development, we shut down Workers with `Ctrl+C` (`SIGINT`) or [nodemon](https://github.com/temporalio/samples-typescript/blob/c37bae3ea235d1b6956fcbe805478aa46af973ce/hello-world/package.json#L10) (`SIGUSR2`). In production, you usually want to give Workers time to finish any in-progress Activities by setting [shutdownGraceTime](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions#shutdowngracetime).

As soon as a Worker receives a shutdown Signal or request, the Worker stops polling for new Tasks and allows in-flight Tasks to complete until [shutdownGraceTime](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions#shutdowngracetime) is reached.
Any Activities that are still running at that time will stop running and will be rescheduled by Temporal Server when an Activity timeout occurs.

If you must guarantee that the Worker eventually shuts down, you can set [shutdownForceTime](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions#shutdownforcetime).

You might want to programmatically shut down Workers (with [Worker.shutdown()](https://typescript.temporal.io/api/classes/worker.Worker#shutdown)) in integration tests or when automating a fleet of Workers.

### Worker states

At any time, you can Query Worker state with `worker.getState()`.
A Worker is always in one of seven states:

- `INITIALIZED`: The initial state of the Worker after calling [Worker.create](https://typescript.temporal.io/api/classes/worker.Worker#create) and successfully connecting to the server.
- `RUNNING`: [Worker.run()](https://typescript.temporal.io/api/classes/worker.Worker#run) was called and the Worker is polling Task Queues.
- `FAILED`: The Worker encountered an unrecoverable error; `Worker.run()` should reject with the error.
- The last four states are related to the Worker shutdown process:
  - `STOPPING`: The Worker received a shutdown Signal or `Worker.shutdown()` was called.
    The Worker will forcefully shut down after `shutdownGraceTime` expires.
  - `DRAINING`: All Workflow Tasks have been drained; waiting for Activities and cached Workflows eviction.
  - `DRAINED`: All Activities and Workflows have completed; ready to shut down.
  - `STOPPED`: Shutdown complete; `worker.run()` resolves.

If you need more visibility into internal Worker state, see the [Worker class](https://typescript.temporal.io/api/classes/worker.Worker) in the API reference.
