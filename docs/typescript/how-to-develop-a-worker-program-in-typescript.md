---
id: how-to-develop-a-worker-program-in-typescript
title: How to develop a Worker program in Typescript
sidebar_label: Develop a Worker program
description: Develop a Worker program
tags:
  - developer-guide
  - sdk
  - typescript
---

First create a Worker with `Worker.create()` (which establishes the initial gRPC connection), then call `worker.run()` on it (to start polling the Task Queue).

Below is an example of starting a Worker that polls the Task Queue named `tutorial`.

<!--SNIPSTART typescript-hello-worker {"enable_source_link": false}-->
<!--SNIPEND-->

`taskQueue` is the only required option, but you will also use `workflowsPath` and `activities` to register Workflows and Activities with the Worker.

A full example for Workers looks like this:

```typescript
import { Worker, NativeConnection } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  const connection = await NativeConnection.create({
    address: 'foo.bar.tmprl.cloud', // defaults port to 7233 if not specified
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

#### Workflow and Activity registration

Workers bundle Workflow code and `node_modules` using Webpack v5 and execute them inside V8 isolates.
Activities are directly required and run by Workers in the Node.js environment.

Workers are very flexible – you can host any or all of your Workflows and Activities on a Worker, and you can host multiple Workers in a single machine.

There are three main things the Worker needs:

- `taskQueue`: the Task Queue to poll. This is the only required argument.
- `activities`: Optional. Imported and supplied directly to the Worker. Not the path.
- Workflow bundle:
- Either specify a `workflowsPath` to your `workflows.ts` file to pass to Webpack, e.g., `require.resolve('./workflows')`. Workflows will be bundled with their dependencies, which you can fine-tune with `nodeModulesPaths`.
- Or pass a prebuilt bundle to `workflowBundle` instead if you prefer to handle the bundling yourself.

#### Additional Worker Options

This is a selected subset of options you are likely to use. Even more advanced options, particularly for performance tuning, are available in [the API reference](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions).

| Options            | Description                                                                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nodeModulesPaths` | Array of paths of Workflow dependencies to pass to Webpack. Defaults to the first encountered `node_modules` directory when scanning the filesystem starting with `workflowsPath`. |
| `dataConverter`    | Encodes and decodes data entering and exiting a Temporal Server. Supports `undefined`, `UintBArray`, and JSON.                                                                     |
| `sinks`            | Allows injection of Workflow Sinks (Advanced feature: see [Logging docs](/docs/typescript/logging))                                                                                |
| `interceptors`     | A mapping of interceptor type to a list of factories or module paths (Advanced feature: see [Interceptors](/docs/typescript/interceptors))                                         |

**Operation guides:**

- [How to tune Workers](/docs/operation/how-to-tune-workers)
