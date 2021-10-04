---
id: package-initializer
title: Node SDK Package Initializer
sidebar_label: Package Initializer
---

# @temporalio/create

[![NPM](https://img.shields.io/npm/v/@temporalio/create)](https://www.npmjs.com/package/@temporalio/create)

An optional utility to set up a new Temporal project with a preset skeleton.

### Usage

First, follow [Getting started](/docs/node/introduction/#getting-started) to set up your environment. Then run:

```
npx @temporalio/create@latest my-project-name
```

#### Optional flags

- `--sample` — Which sample to bootstrap the app with. You can use the name of a sample
  from [github.com/temporalio/samples-node](https://github.com/temporalio/samples-node) or use a GitHub URL. The URL can have a branch and/or subdirectory: for example, `https://github.com/temporalio/samples-node/tree/next/ecommerce-one-click/nextjs`.
- `--list-samples` — List available sample projects.
- `--use-yarn` — Use Yarn instead of npm.

### Project structure

The generated project consists of 4 main components:

- Worker code
- Workflow interfaces
- Workflow implementations
- Activity implementations

Since Workflows run in an [isolated environment](/docs/node/determinism), they must not import from the Worker or Activity implementations as those contain non-deterministic code. It **is** safe to import types from the Worker and Activity implementations as the TypeScript compiler omits them from the generated JavaScript files.

### Working with the project

Most sample projects come with these scripts:

- `npm start` — Run the Worker (does not require compilation)
- `npm run start.watch` — Watch files and re-run Worker on change
- `npm run build` — Compile TypeScript
- `npm run build.watch` — Watch files and compile on change
- `npm run workflow` — Execute the Workflow

#### Running the project

- Download, install, and run [Temporal Server](/docs/server/quick-install) via `docker-compose`
- Start the Worker using `npm run start.watch`
- In a new terminal, start a Workflow with `npm run workflow`
