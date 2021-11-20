---
id: production-deploy
title: Production Deploy Checklist for TypeScript SDK
sidebar_label: Deploy Checklist
description: Here is a non-exhaustive list of things we recommend doing before you deploy your Temporal app to production. Note that this is separate from maintaining a production self-hosted Temporal Cluster, which has its own checklist.
---

Here is a non-exhaustive list of things we recommend doing before you deploy your Temporal app to production.

Note that this is separate from maintaining a production self-hosted Temporal **Cluster**, which has [its own checklist](https://docs.temporal.io/docs/server/production-deployment#checklist-for-scaling-temporal).

## Configure Connections and Namespaces

Temporal Clients and Workers connect with Temporal Clusters via gRPC.

- While you were developing locally, all these connections were set to [their default gRPC ports](http://localhost:3000/docs/content/what-is-a-temporal-cluster) on localhost.
- In production, you will need to configure address, namespace, and encryption settings.

```ts
export function getEnv(): Env {
  return {
    address: 'foo.bar.tmprl.cloud', // NOT web.foo.bar.tmprl.cloud
    namespace: 'foo.bar', // as assigned
    clientCertPath: 'foobar.pem', // in project root
    clientKeyPath: 'foobar.key', // in project root
    taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'hello-world-mtls', // just to ensure task queue is same on client and worker, totally optional
    // // not usually needed
    // serverNameOverride: process.env.TEMPORAL_SERVER_NAME_OVERRIDE,
    // serverRootCACertificatePath: process.env.TEMPORAL_SERVER_ROOT_CA_CERT_PATH,
  };
}
```

Please read more in the [Security docs](/docs/typescript/security#connecting-to-temporal-cloud-with-mtls).

## Logging and Metrics

_This section is yet to be written._ You will want to set up standard monitoring for all your Workers, and make sure that common Temporal exceptions (like `client.result` throwing on terminated workflows) are caught and handled as you prefer.

Please read more in the [Logging docs](/docs/typescript/logging).

## Pre-build code

In most of our samples:

- We use `ts-node`, which compiles TypeScript on the fly.
- Our Workers bundle Workflow code at runtime.

We can improve our Worker's startup time by building code in advance.
The Worker code can be built and run with:

```sh
npm run build
node lib/worker.js
```

You can programmatically bundle Workflow code on your own with [`bundleWorkflowCode`](/docs/typescript/workers#prebuilt-workflow-bundles):

```ts
const { code } = await bundleWorkflowCode({
  workflowsPath: require.resolve('src/workflows'),
});

await writeFile(path.join(__dirname, 'workflow-bundle.js'), code);
```

And then the bundle can be passed to the Worker:

```ts
const worker = await Worker.create({
  workflowBundle: { path: require.resolve('workflow-bundle.js') },
  activities,
  taskQueue,
});
```

You can also bundle code on your own and pass it to the `workflowBundle`.

We can see this process working in the [production sample](https://github.com/temporalio/samples-typescript/tree/main/production):

<!--SNIPSTART typescript-production-worker-->
<!--SNIPEND-->

## Performance Tuning

If you are experiencing system performance issues, make sure that you have checked that the bottleneck is not with your Temporal Cluster before turning to the performance of your Workers.

We endeavor to give you good defaults so you don't have to worry about them, but there are a few key settings you may want to explore if you are pushing system limits:

- [Worker Options](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#maxcachedworkflows), for example:
  - `maxCachedWorkflows` to limit Workflow cache size and trade memory for CPU (biggest lever for Worker performance)
  - `maxConcurrentActivityTaskExecutions` and other options for tuning concurrency
  - `stickyQueueScheduleToStartTimeout` to determine how quickly Temporal stops trying to send work to Workers that are no longer present, via [Sticky Queues](/docs/concepts/task-queues#sticky-queues)
- [Activity Timeouts and Retries](/docs/typescript/activities#activity-timeouts) as you gain an understanding of Temporal and the services you rely on, you will likely want to adjust the timeouts and retry policy to reflect your desired behavior.
  - Note that there are separate [timeouts and retry policy](https://typescript.temporal.io/api/interfaces/client.workflowoptions/#workflowruntimeout) at the Workflow level, but we do not encourage their usage unless you know what you are doing.
- _to be completed as we get more user feedback_
