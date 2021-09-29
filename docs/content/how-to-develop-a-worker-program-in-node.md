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

`taskQueue` is the only required option, and you can offer one of `workDir` or `activities`, `nodeModulesPath`, and `workflowsPath`.

### Workflow and Activity registration

Workers bundle Workflow code and `node_modules` using Webpack v5 and execute them inside V8 isolates.
Activities are directly required and run by Workers in the Node.js environment.

When a `workDir` is specified (usually `__dirname`, which is [the system global in Node.js for the path to the directory of the currently executing file](https://www.digitalocean.com/community/tutorials/nodejs-how-to-use__dirname)), the Node SDK will automatically infer:

- `activities`: Activities exported from `workDir + '/activities.ts'` or `workDir + '/activities/index.ts'` (or `.js` when using JavaScript).
- `nodeModulesPath`: Path for webpack to look up modules in for bundling the Workflow code. Automatically discovered if `workDir` is provided. Defaults to `${workDir}/../node_modules`
- `workflowsPath`: Workflows exported from `workDir + '/workflows/index.js'`

If you have an unusual folder structure setup, you can override `activities`, `nodeModulesPath`, and `workflowsPath`.
If you specify all three, then `workDir` is not needed.

### Additional Worker Options

This is a selected subset of options you are likely to use. More advanced options, particularly for performance tuning, are available in [the API reference](https://nodejs.temporal.io/api/classes/worker.Worker).

| Options           | Description                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `activities`      | Mapping of activity name to implementation. Automatically discovered from ${workDir}/activities if workDir is provided.                                            |
| `nodeModulesPath` | Path for webpack to look up modules in for bundling the Workflow code. Automatically discovered if `workDir` is provided. Defaults to `${workDir}/../node_modules` |
| `workflowsPath`   | Path to look up workflows in. Automatically discovered if `workDir` is provided. Defaults to `${workDir}/workflows`                                                |
| `dataConverter`   | placeholder for future DataConverter feature (pending feature)                                                                                                     |
| `dependencies`    | Allows injection of external dependencies (Advanced feature: see [External Dependencies](/docs/node/external-dependencies))                                        |
| `interceptors`    | A mapping of interceptor type to a list of factories or module paths (Advanced feature: see [Interceptors](/docs/node/interceptors))                               |

For example, if you are working in monorepo style and want `node_modules` at your project root, with all Temporal code inside a `/temporal/src` folder, you can force `nodeModulesPath`:

```ts
// this file is /temporal/src/worker.ts but node modules are at /node_modules
// activities are at /temporal/src/activities.ts - as expected by workDir, no override needed
// workflows are at /temporal/src/workflow/index.ts - as expected by workDir, no override needed

const worker = await Worker.create({
  workDir: __dirname,
  nodeModulesPath: path.join(__dirname, "/../../node_modules"),
  taskQueue: "tutorial",
});
```
