---
id: production-deploy
title: Production Deploy Checklist for TypeScript SDK
sidebar_label: Deploy Checklist
description: Recommended steps to take before deploying your Temporal app to production.
---

The following are recommended steps to take before deploying your Temporal application to production.

## Production Temporal Cluster

Either use Temporal Cloud ([join the waitlist](https://pages.temporal.io/cloud-early-access)) or deploy a self-hosted Temporal Cluster:

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
      // NOT web.foo.bar.tmprl.cloud
      address: 'foo.bar.tmprl.cloud',
      namespace: 'foo.bar',
      // in project root
      clientCertPath: 'foobar.pem',
      clientKeyPath: 'foobar.key',
      // just to ensure task queue is same on client and worker, totally optional
      taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'hello-world-mtls',
      // not usually needed:
      // serverNameOverride: process.env.TEMPORAL_SERVER_NAME_OVERRIDE,
      // serverRootCACertificatePath: process.env.TEMPORAL_SERVER_ROOT_CA_CERT_PATH,
    };
  }
  ```

For more information, see [Connecting to Temporal Cloud (with mTLS)](/typescript/security#local-mtls-sample-tutorial).

## Pre-build code

This information has been moved to [Register Types](/application-development/foundations/#register-types) section in the application developer guide.

## Logging

Send logs and errors to a logging service, so that when things go wrong, you can see what happened.

For more information about sending logs, see [Logging](/typescript/logging).

## Metrics and tracing

### Options

Workers can emit metrics and traces. There are a few [telemetry options](https://typescript.temporal.io/api/interfaces/worker.TelemetryOptions) that can be provided to [`Runtime.install`](https://typescript.temporal.io/api/classes/worker.Runtime/#install). The common options are:

- `metrics: { otel: { url } }`: The URL of a gRPC [OpenTelemetry collector](https://opentelemetry.io/docs/collector/).
- `metrics: { prometheus: { bindAddress } }`: Address on the Worker host that will have metrics for [Prometheus](https://prometheus.io/) to scrape.

To set up tracing of Workflows and Activities, use our [opentelemetry-interceptors](/typescript/logging#opentelemetry-tracing) package.

### Monitoring

Here is the [full list of SDK metrics](/references/sdk-metrics/). Some of them are used in the [Worker Tuning Guide](/application-development/worker-performance) to determine how to change your deployment configuration. The guide also assumes you track the host-level metrics that are important for measuring your application's load (for many applications, this is just CPU, but some applications may run into other bottlenecks—like with Activities that use a lot of memory, or open a lot of sockets). How you track host-level metrics depends on where you deploy your Workers.

## Performance tuning

If you are experiencing system performance issues, make sure that you have checked that the bottleneck is not with your Temporal Cluster before turning to the performance of your Workers.

We endeavor to give you good defaults, so you don't have to worry about them, but there are a few key settings you may want to explore if you are pushing system limits:

- [Worker Options](https://typescript.temporal.io/api/interfaces/worker.WorkerOptions/#maxcachedworkflows), for example:
  - `maxCachedWorkflows` to limit Workflow cache size and trade memory for CPU (biggest lever for Worker performance)
  - `maxConcurrentActivityTaskExecutions` and other options for tuning concurrency
  - `stickyQueueScheduleToStartTimeout` to determine how quickly Temporal stops trying to send work to Workers that are no longer present, via [Sticky Queues](/concepts/what-is-a-sticky-execution)
  - See [Worker Tuning Guide](/application-development/worker-performance)
- [Activity Timeouts and Retries](/typescript/activities#activity-timeouts) as you gain an understanding of Temporal and the services you rely on, you will likely want to adjust the timeouts and Retry Policy to reflect your desired behavior.
  - Note that there are separate [Timeouts and Retry Policy](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions/#workflowruntimeout) at the Workflow level, but we do not encourage their usage unless you know what you are doing.
- _to be completed as we get more user feedback_

## Running in Docker

Workers based on TypeScript SDK can be deployed and run as Docker containers.

At this moment, we recommend usage of NodeJS 16 (note that there are known issues with NodeJS 18). Both `amd64` and `arm64` platforms are supported. A glibc-based image is required; musl-based images are _not_ supported (see below).

The easiest way to deploy a TypeScript SDK Worker on Docker is to start with the `node:16-bullseye` image. For example:

```dockerfile
FROM node:16-bullseye

COPY . /app
WORKDIR /app

RUN npm install --only=production \
    && npm run build

CMD ["build/worker.js"]
```

For smaller images and/or more secure deployments, it is also possible to use `-slim` Docker image variants (like `node:16-bullseye-slim`) or `distroless/nodejs` Docker images (like `gcr.io/distroless/nodejs:16`) with the below caveats.

### Using `node:slim` images

`node:slim` images do not contain some of the common packages found in regular images. This results in significantly smaller images.

However, TypeScript SDK requires the presence of root TLS certificates (the `ca-certificates` package), which are not included in `slim` images. `ca-certificates` package is required even when connecting to a local Temporal Server or when using a server connection config that doesn't explicitly use TLS.

For this reason, the `ca-certificates` package must be installed during the construction of the Docker image. For example:

```dockerfile
FROM node:16-bulleyes-slim

RUN apt-get update \
    && apt-get install -y ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# ... same as with regular image
```

Failure to install this dependency results in a `[TransportError: transport error]` runtime error, because the certificates cannot be verified.

### Using `distroless/nodejs` images

`distroless/nodejs` images include only the files that are strictly required to execute `node`. This results in even smaller images (approximately half the size of `node:slim` images). It also significantly reduces the surface of potential security issues that could be exploited by a hacker in the resulting Docker images.

It is generally possible and safe to execute TypeScript SDK Workers using `distroless/nodejs` images (unless your code itself requires dependencies that are not included in `distroless/nodejs`).

Note however that some tools required for the build process (notably the `npm` command) are _not_ included in the `distroless/nodejs` image. This might result in various error messages during the Docker build.

The recommanded solution is to use a multi-step Dockerfile. For example:

```dockerfile
# -- BUILD STEP --

FROM node:16-bulleyes AS builder

COPY . /app
WORKDIR /app

RUN npm install --only=production \
    && npm run build

# -- RESULTING IMAGE --

FROM gcr.io/distroless/nodejs:16

COPY --from=builder /app /app
WORKDIR /app

CMD ["build/worker.js"]
```

### Properly configure Node's memory in Docker

By default, `node` configures its maximum old-gen memory to 25% of the _physical memory_ of the machine on which it is executing, with a maximum of 4 GB. This is very likely inappropriate when running node in a Docker environment and can result in either under usage of available memory (`node` only uses a fraction of the memory allocated to the container) or overusage (`node` tries to use more memory than what is allocated to the container, which will eventually lead to the process being killed by the operating system).

It is therefore recommended that you always explicitly set the `--max-old-space-size` `node` argument to approximately 80% of the maximum size (in megabytes) that you want to allocate the `node` process. You might need some experimentation and adjustment to find the most appropriate value based on your specific application.

In practice, it is generally easier to provide this argument through the [`NODE_OPTIONS` environment variable](https://nodejs.org/api/cli.html#node_optionsoptions).

### Do not use Alpine

Alpine replaces glibc with musl, which is incompatible with the Rust core of the TypeScript SDK.
If you receive errors like below, it's probably because you are using Alpine.

```sh
Error: Error loading shared library ld-linux-x86-64.so.2: No such file or directory (needed by /opt/app/node_modules/@temporalio/core-bridge/index.node)
```

Or like this:

```sh
Error: Error relocating /opt/app/node_modules/@temporalio/core-bridge/index.node: __register_atfork: symbol not found
```
