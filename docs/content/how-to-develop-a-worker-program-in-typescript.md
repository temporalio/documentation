---
id: how-to-develop-a-worker-program-in-typescript
title: How to develop a Worker Program in TypeScript
description: Import a Worker from the `@temporalio/worker` module and call `Worker.create()` to create a new Worker in TypeScript.
tags:
  - developer-guide
  - workers
  - typescript
---

First create a Worker with `Worker.create()`, then call `worker.run()` on it.

Below is an example of starting a Worker that polls the Task Queue named `tutorial`.

<!--SNIPSTART nodejs-hello-worker {"enable_source_link": false}-->
<!--SNIPEND-->

`taskQueue` is the only required option, but you will also use `workflowsPath` and `activities` to register Workflows and Activities with the Worker.
See below for more Worker options.

### Workflow and Activity registration

Workers bundle Workflow code and `node_modules` using Webpack v5 and execute them inside V8 isolates.
Activities are directly required and run by Workers in the Node.js environment.

Workers are very flexible - you can host any or all of your Workflows and Activities on a Worker, and you can host multiple Workers in a single machine.

There are three things the Worker needs:

- `activities`: You import and supply these directly to the Worker.
- `workflowsPath`: A path to your workflows file to pass to Webpack, e.g. `require.resolve('./workflows')`. Workflows will be bundled with their dependencies, which you can finetune with `nodeModulesPaths`.
- `taskQueue`: the Task Queue to listen to.

### Additional Worker Options

This is a selected subset of options you are likely to use. Even more advanced options, particularly for performance tuning, are available in [the API reference](https://nodejs.temporal.io/api/interfaces/worker.WorkerOptions).

| Options            | Description                                                                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nodeModulesPaths` | Array of paths of Workflow dependencies to pass to Webpack. Defaults to the first encountered `node_modules` directory when scanning the filesystem starting with `workflowsPath`. |
| `dataConverter`    | placeholder for future DataConverter feature (pending feature)                                                                                                                     |
| `dependencies`     | Allows injection of external dependencies (Advanced feature: see [External Dependencies](/docs/typescript/external-dependencies))                                                        |
| `interceptors`     | A mapping of interceptor type to a list of factories or module paths (Advanced feature: see [Interceptors](/docs/typescript/interceptors))                                               |
