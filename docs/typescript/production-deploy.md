---
id: production-deploy
title: Production Deploy Checklist for TypeScript SDK
sidebar_label: Deploy Checklist
description: Recommended steps to take before deploying your Temporal app to production.
---

The following are recommended steps to take before deploying your Temporal application to production.

## Production Temporal Cluster

Either use Temporal Cloud ([join the waitlist](https://us17.list-manage.com/survey?u=2334a0f23e55fd1840613755d&id=f1895b6f4a)) or deploy a self-hosted Temporal Cluster:

- [Deployment guide](/server/production-deployment/)
- [Scaling checklist](/server/production-deployment#checklist-for-scaling-temporal)

## Linting and types

If you started your project with [`@temporalio/create`](/typescript/package-initializer), you already have our recommended TypeScript and ESLint configurations.

If you incrementally added Temporal to an existing app, we do recommend setting up linting and types as they will help catch bugs well before you ship them to production, and improve your development feedback loop.
Take a look at [our recommended .eslintrc file](https://github.com/temporalio/samples-typescript/blob/main/.shared/.eslintrc.js) and tweak to taste.

## Configure Connections and Namespaces

Temporal Clients and Workers connect with Temporal Clusters through gRPC.

- While you were developing locally, all these connections were set to their [default gRPC ports](/concepts/what-is-a-temporal-cluster) on localhost.
- In production, you will need to configure address, Namespace, and encryption settings:

  ```ts
  export function getEnv(): Env {
    return {
      address: 'foo.bar.tmprl.cloud', // NOT web.foo.bar.tmprl.cloud
      namespace: 'foo.bar', // as assigned
      clientCertPath: 'foobar.pem', // in project root
      clientKeyPath: 'foobar.key', // in project root
      taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'hello-world-mtls', // just to ensure task queue is same on client and worker, totally optional
      // not usually needed:
      // serverNameOverride: process.env.TEMPORAL_SERVER_NAME_OVERRIDE,
      // serverRootCACertificatePath: process.env.TEMPORAL_SERVER_ROOT_CA_CERT_PATH,
    };
  }
  ```

  For more information, see [Connecting to Temporal Cloud (with mTLS)](/typescript/security#local-mtls-sample-tutorial).

## Pre-build code

In most of our samples:

- We use `ts-node`, which compiles TypeScript on the fly.
- Our Workers bundle Workflow code at runtime.

We can improve our Worker's startup time by building code in advance.

### Worker code

The Worker code can be built and run with:

```sh
npm run build
node lib/worker.js
```

### Workflow code

You can programmatically bundle Workflow code on your own with [`bundleWorkflowCode`](/typescript/workers#prebuilt-workflow-bundles):

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
[production/src/worker.ts](https://github.com/temporalio/samples-typescript/blob/master/production/src/worker.ts)
```ts
const workflowOption = () =>
  process.env.NODE_ENV === 'production'
    ? { workflowBundle: { path: require.resolve('../workflow-bundle.js') } }
    : { workflowsPath: require.resolve('./workflows') };

async function run() {
  const worker = await Worker.create({
    ...workflowOption(),
    activities,
    taskQueue: 'production-sample',
  });

  await worker.run();
}
```
<!--SNIPEND-->

## Logging

Send logs and errors to a logging service, so that when things go wrong, you can see what happened.

For more information about sending logs, see [Logging](/typescript/logging).

## Metrics

### Options

Workers can emit metrics and traces. There are two [output options](https://github.com/temporalio/sdk-typescript/blob/9dd17554f3fa514f501d906da26cf710020bf34d/packages/core-bridge/index.d.ts#L74-L98) that can be provided to [`Runtime.install`](https://typescript.temporal.io/api/classes/worker.runtime/#install):

- `oTelCollectorUrl`: The URL of a gRPC [OpenTelemetry collector](https://opentelemetry.io/docs/collector/).
- `prometheusMetricsBindAddress`: Address on the Worker host that will have metrics for [Prometheus](https://prometheus.io/) to scrape.

There are three combinations of these options:

- Only `oTelCollectorUrl` is specified: Metrics and traces are sent to the OpenTelemetry collector.
- Both `oTelCollectorUrl` and `prometheusMetricsBindAddress` are specified: Traces are sent to the collector, and metrics are published for Prometheus.
- Only `prometheusMetricsBindAddress` is specified: Only metrics are published for Prometheus.

In addition to core tracing via `oTelCollectorUrl`, you can set up tracing of Workflows and Activities [with interceptors](/typescript/logging#opentelemetry-tracing).

### Monitoring

Here is the [full list of SDK metrics](/references/sdk-metrics/). Some of them are used in the [Worker Tuning Guide](/operation/how-to-tune-workers) to determine how to change your deployment configuration. The guide also assumes you track the host-level metrics that are important for measuring your application's load (for many applications, this is just CPU, but some applications may run into other bottlenecks—like with Activities that use a lot of memory, or open a lot of sockets). How you track host-level metrics depends on where you deploy your Workers.

## Performance tuning

If you are experiencing system performance issues, make sure that you have checked that the bottleneck is not with your Temporal Cluster before turning to the performance of your Workers.

We endeavor to give you good defaults, so you don't have to worry about them, but there are a few key settings you may want to explore if you are pushing system limits:

- [Worker Options](https://typescript.temporal.io/api/interfaces/worker.workeroptions/#maxcachedworkflows), for example:
  - `maxCachedWorkflows` to limit Workflow cache size and trade memory for CPU (biggest lever for Worker performance)
  - `maxConcurrentActivityTaskExecutions` and other options for tuning concurrency
  - `stickyQueueScheduleToStartTimeout` to determine how quickly Temporal stops trying to send work to Workers that are no longer present, via [Sticky Queues](/concepts/what-is-a-sticky-execution)
  - See [Worker Tuning Guide](/operation/how-to-tune-workers)
- [Activity Timeouts and Retries](/typescript/activities#activity-timeouts) as you gain an understanding of Temporal and the services you rely on, you will likely want to adjust the timeouts and Retry Policy to reflect your desired behavior.
  - Note that there are separate [Timeouts and Retry Policy](https://typescript.temporal.io/api/interfaces/client.workflowoptions/#workflowruntimeout) at the Workflow level, but we do not encourage their usage unless you know what you are doing.
- _to be completed as we get more user feedback_

## Do not use Alpine

Alpine replaces glibc with musl, which is incompatible with the Rust core of the TypeScript SDK.
If you receive errors like below, it's probably because you are using Alpine.
You can use the `slim` tag for the Docker image, if you are looking for a lightweight alternative.

```sh
Error: Error loading shared library ld-linux-x86-64.so.2: No such file or directory (needed by /opt/app/node_modules/@temporalio/core-bridge/index.node)
```

Or like this:

```sh
Error: Error relocating /opt/app/node_modules/@temporalio/core-bridge/index.node: __register_atfork: symbol not found
```

## Install ca-certificates for TLS transport

By default, the `slim` Docker images do not come with `ca-certificates` installed.
This might lead to a `[TransportError: transport error]` runtime error because the certificates cannot be verified.
The `ca-certificates` package installs the common certificate authorities and fixes this issue.
This package is required even when connecting to a local Temporal Server, and when using a server connection config that doesn't explicitly use TLS.

Add the following line to your Dockerfile if you use Debian-based images:

```sh
RUN apt update && apt install -y ca-certificates
```
