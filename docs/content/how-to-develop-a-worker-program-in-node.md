---
id: how-to-develop-a-worker-program-in-node
title: How to develop a Worker Program in Node.js
description: Import a Worker from the `@temporalio/worker` module and call `Worker.create()` to create a new Worker in Node.js.
tags:
  - developer-guide
  - workers
  - nodejs
---

First you create a Worker with `Worker.create()`, then call `worker.run()` on it.

Below is an example of starting a Worker that polls the Task Queue named `tutorial`.

<!--SNIPSTART nodejs-hello-worker {"enable_source_link": false}-->
<!--SNIPEND-->

`taskQueue` is the only required option, use `workflowsPath` and `activities` to register Workflows and Activities with the Worker. See below for more Worker options.

### Workflow and Activity registration

Workers bundle Workflow code and `node_modules` using Webpack v5 and execute them inside V8 isolates.
Activities are directly required and run by Workers in the Node.js environment.

There are three things the Worker needs:

- `activities`: You import and supply these directly to the Worker
- `workflowsPath`: A path to your workflows file to pass to Webpack, e.g. `require.resolve('./workflows')`
- `nodeModulesPaths`: Array of paths of Workflow dependencies to pass to Webpack. Defaults to the first encountered `node_modules` directory when scanning the filesystem starting with `workflowsPath`.
- you may also register `interceptors` in the same way (see the Interceptors docs)

### Additional Worker Options

This is a selected subset of options you are likely to use. More advanced options, particularly for performance tuning, are available in [the API reference](https://nodejs.temporal.io/api/classes/worker.Worker).

| Options            | Description                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `activities`       | Mapping of Activity name to implementation.                                                                                          |
| `nodeModulesPaths` | Paths for webpack to look up modules in for bundling the Workflow code.                                                              |
| `workflowsPath`    | Path to look up Workflows in.                                                                                                        |
| `dataConverter`    | placeholder for future DataConverter feature (pending feature)                                                                       |
| `dependencies`     | Allows injection of external dependencies (Advanced feature: see [External Dependencies](/docs/node/external-dependencies))          |
| `interceptors`     | A mapping of interceptor type to a list of factories or module paths (Advanced feature: see [Interceptors](/docs/node/interceptors)) |

For example, if you are working in monorepo style and want `node_modules` at your project root, with all Temporal code inside a `/temporal/src` folder, you can force `nodeModulesPath`:

```ts
// this file is /temporal/src/worker.ts
// but node modules are at /node_modules (project root, not at /temporal)
// activities are at /temporal/src/activities.ts
// workflows are at /temporal/src/workflows.ts
import activities from "./activities";

const worker = await Worker.create({
  workflowsPath: require.resolve("./workflows"),
  activities,
  taskQueue: "tutorial",
});
```
