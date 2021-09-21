---
id: workers
title: Workers in Node
sidebar_label: Workers
---

## What is a Worker?

A Worker is an object that connects to the Temporal Server and executes [Workflows](/docs/node/workflows) and [Activities](/docs/node/activities).

- Workers are run on user-controlled hosts and automatically registers Workflows and Activities for bundling using Webpack v5.
- You can use the `@temporalio/worker` package's [`Worker`](https://nodejs.temporal.io/api/classes/worker.Worker) class to create and run as many Workers as your use case demands, across any number of hosts.
- Workers poll [Task Queues](/docs/node/task-queues) for Tasks, execute chunks of code in response to those Tasks, and then communicate the results back to the Temporal Server.
- The Node SDK handles all of the communication between the Worker and the Temporal Server behind the scenes - no port configuration is required.

## How to start a Worker

First you create a Worker with `Worker.create()`, then call `worker.run()` on it.

Below is an example of starting a Worker that polls the Task Queue named `tutorial`.

<!--SNIPSTART nodejs-hello-worker {"enable_source_link": false}-->
<!--SNIPEND-->

### Required Worker Options

There are two required options to the `Worker.create()` function:

1. The `workDir`. The Node SDK will automatically register:

- Activities exported from `workDir + '/activities.ts'` or `workDir + '/activities/index.ts'` (or `.js` when using JavaScript).
- Workflows exported from `workDir + '/workflows/index.ts'` (Or `.js`)
- If you have an unusual folder structure setup, you can customize `activities`, `nodeModulesPath`, and `workflowsPath` in the options below to override the `workDir` derived defaults.

2. The `taskQueue` the Worker should poll.

### Additional Worker Options

| Options           | Description                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `activities`      | Mapping of activity name to implementation. Automatically discovered from ${workDir}/activities if workDir is provided.                                            |
| `dataConverter`   | placeholder for future DataConverter feature                                                                                                                       |
| `dependencies`    | Allows injection of external dependencies                                                                                                                          |
| `interceptors`    | A mapping of interceptor type to a list of factories or module paths                                                                                               |
| `nodeModulesPath` | Path for webpack to look up modules in for bundling the Workflow code. Automatically discovered if `workDir` is provided. Defaults to `${workDir}/../node_modules` |
| `workflowsPath`   | Path to look up workflows in. Automatically discovered if `workDir` is provided. Defaults to `${workDir}/workflows`                                                |

For example, if you are working in monorepo style and want `node_modules` at your project root, with all Temporal code inside a `/temporal/src` folder, you can force `nodeModulesPath`:

```js
// this file is /temporal/src/worker.ts but node modules are at /node_modules
// activities are at /temporal/src/activities.ts - as expected by workDir, no override needed
// workflows are at /temporal/src/workflow/index.ts - as expected by workDir, no override needed

const worker = await Worker.create({
  workDir: __dirname,
  nodeModulesPath: path.join(__dirname, '/../../node_modules'),
  taskQueue: 'tutorial',
});
```

More advanced options are available in [the API reference](https://nodejs.temporal.io/api/classes/worker.Worker).

## Programmatic access to Worker state

You can query Worker state with `worker.getState()`. A Worker is in one of 7 states at any given point:

- `INITIALIZED` - The initial state of the Worker after calling Worker.create and successful connection to the server
- `RUNNING` - `worker.run` was called, polling task queues
- `FAILED` - Worker encountered an unrecoverable error, `worker.run` should reject with the error
- The last 4 states are related to the Worker shutdown process; often done manually in dev (with `SIGINT` aka `Ctrl + C`), but can be programmatically called with `worker.shutdown()`:
  - `STOPPING` - Worker.shutdown was called or received shutdown signal, worker will forcefully shutdown in shutdownGraceTime
  - `DRAINING` - Core has indicated that shutdown is complete and all Workflow tasks have been drained, waiting for activities and cached workflows eviction
  - `DRAINED` - All activities and workflows have completed, ready to shutdown
  - `STOPPED` - Shutdown complete, `worker.run` resolves

If you need advanced visibility into internal worker state, [see the API reference for more](https://nodejs.temporal.io/api/classes/worker.Worker).
