---
id: how-to-run-a-worker-on-docker
title: How to run a Worker on Docker in TypeScript
sidebar_label: Run a Worker on Docker
description: Workers based on the TypeScript SDK can be deployed and run as Docker containers.
tags:
  - developer-guide
  - sdk
  - typescript
---

Workers based on the TypeScript SDK can be deployed and run as Docker containers.

At this moment, we recommend using Node.js 18.
(Node.js 20 has known issues.)
Both `amd64` and `arm64` platforms are supported.
A glibc-based image is required; musl-based images are _not_ supported (see below).

The easiest way to deploy a TypeScript SDK Worker on Docker is to start with the `node:18-bullseye` image.
For example:

```dockerfile
FROM node:18-bullseye

COPY . /app
WORKDIR /app

RUN npm install --only=production \
    && npm run build

CMD ["build/worker.js"]
```

For smaller images and/or more secure deployments, it is also possible to use `-slim` Docker image variants (like `node:18-bullseye-slim`) or `distroless/nodejs` Docker images (like `gcr.io/distroless/nodejs:18`) with the following caveats.

### Using `node:slim` images

`node:slim` images do not contain some of the common packages found in regular images. This results in significantly smaller images.

However, TypeScript SDK requires the presence of root TLS certificates (the `ca-certificates` package), which are not included in `slim` images.
The `ca-certificates` package is required even when connecting to a local Temporal Server or when using a server connection config that doesn't explicitly use TLS.

For this reason, the `ca-certificates` package must be installed during the construction of the Docker image.
For example:

```dockerfile
FROM node:18-bulleyes-slim

RUN apt-get update \
    && apt-get install -y ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# ... same as with regular image
```

Failure to install this dependency results in a `[TransportError: transport error]` runtime error, because the certificates cannot be verified.

### Using `distroless/nodejs` images

`distroless/nodejs` images include only the files that are strictly required to execute `node`.
This results in even smaller images (approximately half the size of `node:slim` images).
It also significantly reduces the surface of potential security issues that could be exploited by a hacker in the resulting Docker images.

It is generally possible and safe to execute TypeScript SDK Workers using `distroless/nodejs` images (unless your code itself requires dependencies that are not included in `distroless/nodejs`).

However, some tools required for the build process (notably the `npm` command) are _not_ included in the `distroless/nodejs` image.
This might result in various error messages during the Docker build.

The recommanded solution is to use a multi-step Dockerfile.
For example:

```dockerfile
# -- BUILD STEP --

FROM node:18-bulleyes AS builder

COPY . /app
WORKDIR /app

RUN npm install --only=production \
    && npm run build

# -- RESULTING IMAGE --

FROM gcr.io/distroless/nodejs:18

COPY --from=builder /app /app
WORKDIR /app

CMD ["build/worker.js"]
```

### Properly configure Node.js memory in Docker

By default, `node` configures its maximum old-gen memory to 25% of the _physical memory_ of the machine on which it is executing, with a maximum of 4 GB.
This is likely inappropriate when running Node.js in a Docker environment and can result in either underusage of available memory (`node` only uses a fraction of the memory allocated to the container) or overusage (`node` tries to use more memory than what is allocated to the container, which will eventually lead to the process being killed by the operating system).

Therefore we recommended that you always explicitly set the `--max-old-space-size` `node` argument to approximately 80% of the maximum size (in megabytes) that you want to allocate the `node` process.
You might need some experimentation and adjustment to find the most appropriate value based on your specific application.

In practice, it is generally easier to provide this argument through the [`NODE_OPTIONS` environment variable](https://nodejs.org/api/cli.html#node_optionsoptions).

### Do not use Alpine

Alpine replaces glibc with musl, which is incompatible with the Rust core of the TypeScript SDK.
If you receive errors like the following, it's probably because you are using Alpine.

```sh
Error: Error loading shared library ld-linux-x86-64.so.2: No such file or directory (needed by /opt/app/node_modules/@temporalio/core-bridge/index.node)
```

Or like this:

```sh
Error: Error relocating /opt/app/node_modules/@temporalio/core-bridge/index.node: __register_atfork: symbol not found
```
