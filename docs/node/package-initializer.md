---
id: package-initializer
title: Node SDK Package Initializer
sidebar_label: Package Initializer
---

# @temporalio/create

[![NPM](https://img.shields.io/npm/v/@temporalio/create)](https://www.npmjs.com/package/@temporalio/create)

An optional utility to set up a new Temporal project with a preset skeleton.

> Make sure to follow the [getting started instructions](/docs/node/introduction/#getting-started).

### Usage

```
npx @temporalio/create@latest /path/to/project [--use-yarn] [--temporal-version TEMPORAL_VERSION] [--sample hello-world|hello-world-mtls]
```

#### Flags

- `--use-yarn` - configure the project with `yarn` (defaults to `npm`).
- `--temporal-version` - use specified SDK version or `@latest` if not provided.
- `--sample` - install specified sample (defaults to `hello-world`).

### Project Structure

The generated project consists of 4 main components

- Worker code
- Workflow interfaces
- Workflow implementations
- Activity implementations

Since Workflows run in an [isolated environment](/docs/node/determinism) they must not import from the Worker or Activity implementations as those contain non-deterministic code. It **is** safe to import types from the Worker and Activity implementations as the TypeScript compiler omits them from the generated JavaScript files.

### Working with the created project

The created project comes with some helper package scripts.

- `npm start` - Run the Worker (does not require compilation)
- `npm run start.watch` - Watch files and re-run Worker on change
- `npm run build` - Compile TypeScript
- `npm run build.watch` - Watch files and compile on change
- `npm run workflow` - Execute a Workflow using the provided client

#### Running the example

- Download, install, and run the [Temporal server][local-server] via docker-compose
- Start the worker using `npm run start.watch`
- In a new terminal, use the provided client to start a Workflow `npm run workflow`, or equivalently, `ts-node src/exec-workflow.ts`

[local-server]: /docs/server/quick-install
