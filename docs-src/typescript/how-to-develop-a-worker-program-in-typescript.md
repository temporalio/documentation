---
id: how-to-develop-a-worker-program-in-typescript
title: How to develop a Worker program in TypeScript
sidebar_label: Develop a Worker program
description: Develop a Worker program
tags:
  - developer-guide
  - sdk
  - typescript
---

Create a Worker with `Worker.create()` (which establishes the initial gRPC connection), then call `worker.run()` on it (to start polling the Task Queue).

Below is an example of starting a Worker that polls the Task Queue named `tutorial`.

<!--SNIPSTART typescript-hello-worker {"enable_source_link": false}-->

```ts
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  // Step 1: Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'hello-world',
  });
  // Worker connects to localhost by default and uses console.error for logging.
  // Customize the Worker by passing more options to create():
  // https://typescript.temporal.io/api/classes/worker.Worker
  // If you need to configure server connection parameters, see docs:
  // https://docs.temporal.io/typescript/security#encryption-in-transit-with-mtls

  // Step 2: Start accepting tasks on the `hello-world` queue
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

| Options         | Description                                                                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dataConverter` | Encodes and decodes data entering and exiting a Temporal Server. Supports `undefined`, `UintBArray`, and JSON.                                                                     |
| `sinks`         | Allows injection of Workflow Sinks (Advanced feature: see [Logging docs](https://legacy-documentation-sdks.temporal.io/typescript/logging))                                        |
| `interceptors`  | A mapping of interceptor type to a list of factories or module paths (Advanced feature: see [Interceptors](https://legacy-documentation-sdks.temporal.io/typescript/interceptors)) |

**Operation guides:**

- [How to tune Workers](/application-development/worker-performance)
