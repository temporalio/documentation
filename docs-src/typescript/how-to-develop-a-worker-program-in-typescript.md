---
id: how-to-develop-a-worker-program-in-typescript
title: How to develop a Worker program in TypeScript
sidebar_label: Run a dev Worker
description: Develop a Worker program
tags:
  - dev-guide
  - workers
  - typescript
---

Create a Worker with `Worker.create()` (which establishes the initial gRPC connection), then call `worker.run()` on it (to start polling the Task Queue).

Below is an example of starting a Worker that polls the Task Queue named `tutorial`.

<!--SNIPSTART typescript-hello-worker {"enable_source_link": false}-->
```ts
import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  // Step 1: Establish a connection with Temporal server.
  //
  // Worker code uses `@temporalio/worker.NativeConnection`.
  // (But in your application code it's `@temporalio/client.Connection`.)
  const connection = await NativeConnection.connect({
    address: 'localhost:7233',
    // TLS and gRPC metadata configuration goes here.
  });
  // Step 2: Register Workflows and Activities with the Worker.
  const worker = await Worker.create({
    connection,
    namespace: 'default',
    taskQueue: 'hello-world',
    // Workflows are registered using a path as they run in a separate JS context.
    workflowsPath: require.resolve('./workflows'),
    activities,
  });

  // Step 3: Start accepting tasks on the `hello-world` queue
  //
  // The worker runs until it encounters an unexepected error or the process receives a shutdown signal registered on
  // the SDK Runtime object.
  //
  // By default, worker logs are written via the Runtime logger to STDERR at INFO level.
  //
  // See https://typescript.temporal.io/api/classes/worker.Runtime#install to customize these defaults.
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
<!--SNIPEND-->

`taskQueue` is the only required option, but you will also use `workflowsPath` and `activities` to register Workflows and Activities with the Worker.

A full example for Workers looks like this:

```typescript
import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  const connection = await NativeConnection.connect({
    // defaults port to 7233 if not specified
    address: 'foo.bar.tmprl.cloud',
    tls: {
      // set to true if TLS without mTLS
      // See docs for other TLS options
      clientCertPair: {
        crt: clientCert,
        key: clientKey,
      },
    },
  });

  const worker = await Worker.create({
    connection,
    namespace: 'foo.bar', // as explained in Namespaces section
    // ...
  });
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

See below for more Worker options.

**Workflow and Activity registration**

Workers bundle Workflow code and `node_modules` using Webpack v5 and execute them inside V8 isolates.
Activities are directly required and run by Workers in the Node.js environment.

Workers are very flexible – you can host any or all of your Workflows and Activities on a Worker, and you can host multiple Workers in a single machine.

There are three main things the Worker needs:

- `taskQueue`: the Task Queue to poll. This is the only required argument.
- `activities`: Optional. Imported and supplied directly to the Worker. Not the path.
- Workflow bundle:
- Either specify a `workflowsPath` to your `workflows.ts` file to pass to Webpack, e.g., `require.resolve('./workflows')`. Workflows will be bundled with their dependencies.
- Or pass a prebuilt bundle to `workflowBundle` instead if you prefer to handle the bundling yourself.

**Additional Worker Options**

This is a selected subset of options you are likely to use. Even more advanced options, particularly for performance tuning, are available in [the API reference](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions).

| Options         | Description                                                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dataConverter` | Encodes and decodes data entering and exiting a Temporal Server. Supports `undefined`, `UintBArray`, and JSON.                                                       |
| `sinks`         | Allows injection of Workflow Sinks. See [Logging](/typescript/how-to-log-from-a-workflow-in-typescript)                                                              |
| `interceptors`  | A mapping of interceptor type to a list of factories or module paths (Advanced feature: see [Interceptors](/typescript/how-to-implement-interceptors-in-typescript)) |

**Operation guides:**

- [How to tune Workers](/dev-guide/worker-performance)
