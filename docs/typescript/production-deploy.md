---
id: production-deploy
title: Production Deploy Checklist for TypeScript SDK
sidebar_label: Deploy Checklist
---

Here is a non-exhaustive list of things we recommend doing before you deploy your Temporal app to production. 

Note that this is separate from maintaining a production self-hosted Temporal Cluster, which has [its own checklist](https://docs.temporal.io/docs/server/production-deployment#checklist-for-scaling-temporal).

## Configure Connections and Namespaces

Temporal Clients and Workers connect with Temporal Clusters via gRPC.
While you were developing locally, all these connections were defaulted to localhost.
In production, you will need to configure address, namespace, and encryption settings.

Please read more in the [Security docs](/docs/typescript/security).
You should be able to test these new connections locally before proceeding on to the rest of the instructions here.

## Logging and Metrics

*This section is yet to be written.* You will want to set up standard monitoring for all your Workers, and make sure that common Temporal exceptions (like `client.result` throwing on terminated workflows) are caught and handled as you prefer.

Please read more in the [Logging docs](/docs/typescript/logging).

## Prebuild the Worker

In our samples we use `ts-node` which compiles TypeScript on the fly.
Workers also bundle Workflow and `node_modules` code from scratch every time.
This can be optimized to improve startup time.

```ts
// src/worker.ts
import { readFile } from 'fs/promises';

async function run() {
  const worker = await Worker.create({
    ...(process.env.NODE_ENV === 'production'
      ? { workflowBundle: await readFile('../worker-bundle') }
      : { workflowsPath: require.resolve('./workflows') }),
    activities,
    taskQueue: 'tutorial',
  });
```

In most samples, we have set up `npm run build` and npm run build-worker which runs a script that calls [`bundleWorkflowCode`](/docs/typescript/workers#prebuilt-workflow-bundles) and saves to a file.

