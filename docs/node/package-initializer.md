---
id: package-initializer
sidebar_label: Package Initializer
---

> **@temporalio/create** [![NPM](https://img.shields.io/npm/v/@temporalio/create)](https://www.npmjs.com/package/@temporalio/create)
>
> [GitHub source](https://github.com/temporalio/sdk-node/tree/main/packages/create-project)

`@temporalio/create` is an optional tool to set up a new Temporal project starting from [our samples repo](https://github.com/temporalio/samples-node).

### Usage

> See the [Getting started](/docs/node/introduction/#getting-started) guide for basic usage and environment set up before running this tool.

```bash
npx @temporalio/create@latest ./example
```

#### Optional flags

- `--sample` — Which sample to bootstrap the app with. You can use the name of a sample
  from [github.com/temporalio/samples-node](https://github.com/temporalio/samples-node) or use a GitHub URL. The URL can have a branch and/or subdirectory: for example, `https://github.com/temporalio/samples-node/tree/next/ecommerce-one-click/nextjs`.
- `--list-samples` — List available projects from [our samples repo](https://github.com/temporalio/samples-node).
- `--use-yarn` — Use Yarn instead of npm.
- `--[no-]git-init` - Initalize an empty git repository
- `--temporalio-version <version>` - Specify which version of the temporalio npm package to use

### Project structure

Typically the generated project consists of 4 main components:

- Worker
- Workflows
- Activities
- A script to execute a Workflow

### Working with the created project

Most sample projects come with these scripts:

- `npm start` — Run the Worker with `ts-node` (does not require a compilation step)
- `npm run start.watch` — Watch files with `nodemon` and re-run Worker on change
- `npm run build` — Compile TypeScript
- `npm run build.watch` — Watch files and compile on change
- `npm run workflow` — Execute a Workflow
