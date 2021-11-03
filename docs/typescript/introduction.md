---
title: TypeScript SDK introduction
sidebar_label: Introduction
---

import CustomWarning from "../components/CustomWarning.js"

<CustomWarning>

This SDK and associated documentation is in an Alpha stage and may change at any time.

</CustomWarning>

The TypeScript SDK is Temporal's newest client SDK for developing with Temporal.
It is designed with TypeScript-first developer experience in mind, but should work equally well with JavaScript.

:::tip Commencing Launch Sequence 🚀 

We are planning to move to Beta soon! Join:

- [Our launch meetup](https://temporal.io/meetup) on Nov 23
- [Our live guided workshop](https://lu.ma/temporalintro) on Nov 30

And of course you can [join the #typescript-sdk channel Slack](https://temporal.io/slack) to ask any questions as you get set up!

:::

You can view:

- Full API reference: https://typescript.temporal.io
- Code Samples: https://github.com/temporalio/samples-typescript
- SDK source: https://github.com/temporalio/sdk-typescript [![GitHub stars](https://img.shields.io/github/stars/temporalio/sdk-typescript)](https://github.com/temporalio/sdk-typescript/stargazers) (give us a 🌟!)

## Getting started

Choose your own adventure:

<details>
<summary>
Run "Hello Temporal" locally (~5 minutes)
</summary>

:::note Prerequisites

<details>
<summary>
<strong>Node.js 14+</strong>: This project requires Node.js version 14 or later.
</summary>

macOS users: Brew installation of Node.js versions 15.0 to 16.4 does not work with the SDK; instead install the latest Node.js version (16.4.1+) or use nvm

```bash
brew update
brew upgrade node
```

-- OR --

```bash
nvm use 16
```

If you don’t have `nvm` ([Node Version Manager](https://github.com/nvm-sh/nvm)), you can [install](https://github.com/nvm-sh/nvm#install--update-script) it with:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install 16
nvm use 16
```

</details>
<details>
<summary>
<strong>node-gyp</strong>: `npm install -g node-gyp`
</summary>

Install node-gyp:

```bash
npm install -g node-gyp
```

You may have to install some system dependencies first as documented [here](https://github.com/nodejs/node-gyp#installation).

_`node-gyp` is a requirement of [`isolated-vm`](https://github.com/laverdet/isolated-vm) the V8 Isolate library which powers this SDK's [deterministic runtime](/docs/typescript/determinism)_.

</details>
<details>
<summary>
<strong>Temporal Server</strong>: make sure it is running locally!
</summary>

Run Temporal Server (requires [Docker](https://docs.docker.com/engine/install) and [Docker Compose](https://docs.docker.com/compose/install/)):

```bash
git clone https://github.com/temporalio/docker-compose.git temporal
cd temporal
docker-compose up
```

If you want to run Temporal without Docker, DataDog has created an experimental project called [temporalite](https://github.com/DataDog/temporalite) you can try.

</details>

:::

### Step 1: Create a new project

Use the [package initializer](./package-initializer) to create a new project:

```bash
npx @temporalio/create@latest ./example
cd example
```

This will set up with [the basic Hello World sample](https://github.com/temporalio/samples-typescript/tree/main/hello-world) using our [Package Initializer](/typescript/package-initializer) (think of it like `create-temporal-app`!)

<details>
<summary>Provided you have the `node-gyp` prerequisite, this will take a couple of minutes.
</summary>

`npx` triggers native module compilation which might take a while, and `npm` 7 hides the compilation output so it may appear that the installation is stuck. To see the compilation progress, run `export NPM_CONFIG_FOREGROUND_SCRIPTS=true` first.

</details>

### Step 2: Run your Workflow

Run the Worker:

```bash
# this runs ts-node src/worker.ts with nodemon to auto-reload on changes
$ npm run start.watch
```

<details>
<summary>Expected Terminal Output</summary>

```bash
# this runs ts-node src/worker.ts with nodemon to auto-reload on changes
$ npm run start.watch

> temporal-hello-world@0.1.0 start.watch
> nodemon src/worker.ts

[nodemon] 2.0.13
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: ts
[nodemon] starting `ts-node src/worker.ts`
2021-10-14T00:31:39.875Z [INFO] [temporal_sdk_core] Registering worker task_queue="tutorial"
2021-10-14T00:31:41.360Z [INFO] assets by path ./lib/*.map 605 bytes
2021-10-14T00:31:41.360Z [INFO]   asset ./lib/workflows.d.ts.map 192 bytes [emitted]
2021-10-14T00:31:41.360Z [INFO]   asset ./lib/activities.d.ts.map 181 bytes [emitted]
2021-10-14T00:31:41.360Z [INFO]   asset ./lib/execute-workflow.d.ts.map 126 bytes [emitted]
2021-10-14T00:31:41.360Z [INFO]   asset ./lib/worker.d.ts.map 106 bytes [emitted]
2021-10-14T00:31:41.360Z [INFO] assets by path ./lib/*.ts 357 bytes
2021-10-14T00:31:41.360Z [INFO]   asset ./lib/workflows.d.ts 151 bytes [emitted]
2021-10-14T00:31:41.360Z [INFO]   asset ./lib/activities.d.ts 102 bytes [emitted]
2021-10-14T00:31:41.360Z [INFO]   asset ./lib/execute-workflow.d.ts 57 bytes [emitted]
2021-10-14T00:31:41.360Z [INFO]   asset ./lib/worker.d.ts 47 bytes [emitted]
2021-10-14T00:31:41.360Z [INFO] asset main.js 7.47 MiB [emitted] (name: main)
2021-10-14T00:31:41.360Z [INFO] runtime modules 891 bytes 4 modules
2021-10-14T00:31:41.360Z [INFO] modules by path ./node_modules/ 2.92 MiB
2021-10-14T00:31:41.360Z [INFO]   modules by path ./node_modules/@opentelemetry/api/build/esm/ 73.4 KiB 48 modules
2021-10-14T00:31:41.360Z [INFO]   modules by path ./node_modules/@temporalio/ 2.74 MiB 31 modules
2021-10-14T00:31:41.360Z [INFO]   modules by path ./node_modules/protobufjs/ 51.2 KiB
2021-10-14T00:31:41.360Z [INFO]     modules by path ./node_modules/protobufjs/src/*.js 28.8 KiB 7 modules
2021-10-14T00:31:41.360Z [INFO]     modules by path ./node_modules/protobufjs/src/util/*.js 17.7 KiB 2 modules
2021-10-14T00:31:41.360Z [INFO]     2 modules
2021-10-14T00:31:41.360Z [INFO]   modules by path ./node_modules/@protobufjs/ 23.7 KiB 7 modules
2021-10-14T00:31:41.360Z [INFO]   ./node_modules/long/src/long.js 39.2 KiB [built] [code generated]
2021-10-14T00:31:41.360Z [INFO]   ./node_modules/ms/index.js 2.95 KiB [built] [code generated]
2021-10-14T00:31:41.360Z [INFO] ../../../../../src/main.js 462 bytes [built] [code generated]
2021-10-14T00:31:41.360Z [INFO] ./src/workflows.ts 443 bytes [built] [code generated]
2021-10-14T00:31:41.360Z [INFO] webpack 5.58.2 compiled successfully in 1293 ms
2021-10-14T00:31:41.563Z [INFO] Worker state changed { state: 'RUNNING' }

```

</details>


> If this step fails, make sure you have the correct version of Node and other prerequisites listed above.

Then start your Workflow:

```bash
$ npm run workflow # runs ts-node src/exec-workflow.ts
Hello, Temporal! # success!
```

This "Hello, Temporal!" message comes from the combination of:

- [`execute-workflow.ts`](https://github.com/temporalio/samples-typescript/blob/main/hello-world/src/execute-workflow.ts) passing `'Temporal'` as an argument to the Workflow.
- The [Workflow](https://github.com/temporalio/samples-typescript/blob/main/hello-world/src/workflows.ts) passing the argument to the Activity.
- The [Activity](https://github.com/temporalio/samples-typescript/blob/main/hello-world/src/activities.ts) taking the argument as `name` and returning `Hello, ${name}!`.

<details>
<summary>Viewing your Workflow Execution in Temporal Web
</summary>

You can verify execution in Temporal Web (available at [`localhost:8088`](http://localhost:8088/) on the default [`docker-compose`](https://github.com/temporalio/docker-compose)):

![image](https://user-images.githubusercontent.com/6764957/118865735-d7255f80-b913-11eb-8ace-a7dbdc351f8e.png)

</details>

## Next Steps

For a full code walkthrough of our Hello World example, see our [Hello World documentation](/docs/typescript/hello-world).

If you want an example of what it's like to integrate Temporal into an existing full-stack app, check our [Next.js One-Click Buy Tutorial](/docs/typescript/nextjs-tutorial).

</details>

<details>
<summary>Read through the core API docs (~20 minutes)
</summary>

These are the essential pages to have a passing knowledge of our Core APIs:

- [Workflows](/docs/typescript/workflows): How to write Temporal's core orchestration code
  - Workflows use [Activities](/docs/typescript/activities) to act on the outside world (e.g. call an API with retries and timeouts, or access the filesystem)
  - see [Workflow APIs](/docs/typescript/workflows) for Signals, Queries, Timers, Child Workflows, Infinite Workflows, and more!
- [Workers and Task Queues](/docs/typescript/workers): How Workflows and Activities are routed to and executed on machines you control
- [Clients](/docs/typescript/client): How to start, signal, query, cancel, or otherwise handle Workflows.

</details>
