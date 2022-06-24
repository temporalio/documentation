---
id: package-initializer
title: '@temporalio/create Package Initializer'
sidebar_label: '@temporalio/create'
description: temporalio/create is an optional tool to set up a new Temporal project starting from our samples repo. `npx @temporalio/create@latest ./example`
---

> **@temporalio/create** [![NPM](https://img.shields.io/npm/v/@temporalio/create)](https://www.npmjs.com/package/@temporalio/create) | [GitHub](https://github.com/temporalio/sdk-typescript/tree/main/packages/create-project)

`@temporalio/create` is an optional tool to set up a new Temporal project starting from [our samples repo](https://github.com/temporalio/samples-typescript).

### Usage

> See the [Getting started](/typescript/introduction/#getting-started) guide for basic usage and environment set up before running this tool.

```bash
npx @temporalio/create@latest ./example
```

#### Optional flags

- `--sample` — Which sample to bootstrap the app with. You can use the name of a sample
  from [github.com/temporalio/samples-typescript](https://github.com/temporalio/samples-typescript) or use a GitHub URL. The URL can have a branch and/or subdirectory: for example, `https://github.com/your-org/your-app/tree/main/foo/bar`.
- `--list-samples` — List available projects from [our samples repo](https://github.com/temporalio/samples-typescript).
- `--use-yarn` — Use Yarn instead of npm.
- `--[no-]git-init` - Initialize an empty git repository.
- `--temporalio-version <version>` - Specify which version of the Temporal npm package to use.

### Project structure

Typically, the generated project consists of 4 main components:

- Workflows
- Activities
- Worker that executes Workflows and Activities
- A script to execute a Workflow (using a Temporal Client)

### Working with the created project

Most sample projects come with these scripts:

- `npm start` — Run the Worker with `ts-node` (does not require a compilation step)
- `npm run start.watch` — Watch files with `nodemon` and re-run Worker on change
- `npm run build` — Compile TypeScript
- `npm run build.watch` — Watch files and compile on change
- `npm run workflow` — Execute a Workflow

If you aren't familiar with the tradeoffs between these choices, we recommend primarily running `npm run start.watch` to have a live-reloading Worker good enough for most situations, and then `npm run workflow` to start individual Workflow executions.
