---
id: production-deploy
title: Production Deploy Checklist for TypeScript SDK
sidebar_label: Deploy Checklist
---

Here is a non-exhaustive list of things we recommend doing before you deploy your Temporal app to production.

Note that this is separate from maintaining a production self-hosted Temporal **Cluster**, which has [its own checklist](https://docs.temporal.io/docs/server/production-deployment#checklist-for-scaling-temporal).

## Configure Connections and Namespaces

Temporal Clients and Workers connect with Temporal Clusters via gRPC.
While you were developing locally, all these connections were defaulted to localhost.
In production, you will need to configure address, namespace, and encryption settings.

Please read more in the [Security docs](/docs/typescript/security).
You should be able to test these new connections locally before proceeding on to the rest of the instructions here.

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

We endeavor to give you good defaults so you don't have to worry about them, but there are a few key settings you may want to explore if you are pushing system limits:

- [Worker Options](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#maxcachedworkflows), for example:
  - `maxCachedWorkflows` to limit Workflow cache size and trade memory for CPU (biggest lever for Worker performance)
  - `maxConcurrentActivityTaskExecutions` and other options for tuning concurrency
  - `stickyQueueScheduleToStartTimeout` to determine how quickly workflow tasks can be moved to other workers
- _to be completed as we get more user feedback_
