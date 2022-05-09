---
title: TypeScript SDK introduction
sidebar_label: Introduction
description: The TypeScript SDK lets developers write highly scalable, reliable, annd long-running workflows without being a distributed systems expert.
---

The Temporal TypeScript SDK ([now in Beta](/blog/typescript-beta)) lets you write highly scalable and reliable long-running Workflows without being a distributed systems expert.
It is designed with TypeScript-first developer experience in mind, but works equally well with JavaScript.

import { ResponsivePlayer } from '../../src/components'

<ResponsivePlayer url='https://youtu.be/2HjnQlnA5eY' />

You can view:

- [Code samples on GitHub](https://github.com/temporalio/samples-typescript)
  - Fastest way to try these out is in the browser [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-908a85?logo=gitpod)](https://gitpod.io/#https://github.com/temporalio/samples-typescript/) ([90 second demo](https://youtu.be/FdEQQC9EdfU))
- [Searchable full API reference](https://typescript.temporal.io)
- [SDK source on GitHub](https://github.com/temporalio/sdk-typescript) [![GitHub stars](https://img.shields.io/github/stars/temporalio/sdk-typescript)](https://github.com/temporalio/sdk-typescript/stargazers) (give us a star!)
- [See version diffs on our Changelog](https://github.com/temporalio/sdk-typescript/blob/HEAD/CHANGELOG.md)

## Getting started

Choose your own adventure:

<details>
<summary>
Run "Hello Temporal" in the cloud (~2 minutes)
</summary>

[Open our Samples repo in Gitpod](https://gitpod.io/#https://github.com/temporalio/samples-typescript/) and login to try out our Hello World example with no need for local Docker setup.

When you click on that link above and log in (there is a generous free tier), Gitpod will launch 4 terminals:

- Pane 1: Temporal Cluster
  - Left: [Temporal Server](https://github.com/temporalio/docker-compose) - always running
  - Right: [Temporal Web](https://docs.temporal.io/docs/devtools/web-ui) and [Temporal `tctl` CLI](https://docs.temporal.io/docs/devtools/tctl)
- Pane 2: Hello World
  - Left: [Temporal Worker](https://github.com/temporalio/samples-typescript/blob/main/hello-world/src/worker.ts) - running and hot reloading
  - Right: [Temporal Client](https://github.com/temporalio/samples-typescript/blob/main/hello-world/src/client.ts) - run `npm run workflow`

It takes ~3 minutes for the Docker Compose setup to start up.
Once you have it up and running (Temporal Web should show the first Workflow Execution), you can use our [Hello World Walkthrough](/docs/typescript/hello-world) tutorial to orient you to the sample file structure.

</details>

<details>
<summary>
Run "Hello Temporal" locally (~10 minutes)
</summary>

:::note Prerequisites

<strong>Node.js 14+</strong>: this project requires Node.js version 14 or later.

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

Use the [package initializer](/docs/typescript/package-initializer) to create a new project:

```bash
npx @temporalio/create@latest ./example
cd example
```

This will set up with [the basic Hello World sample](https://github.com/temporalio/samples-typescript/tree/main/hello-world) using our [Package Initializer](/docs/typescript/package-initializer) (think of it like `create-temporal-app`!)

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
2021-10-14T00:31:41.360Z [INFO]   asset ./lib/client.d.ts.map 126 bytes [emitted]
2021-10-14T00:31:41.360Z [INFO]   asset ./lib/worker.d.ts.map 106 bytes [emitted]
2021-10-14T00:31:41.360Z [INFO] assets by path ./lib/*.ts 357 bytes
2021-10-14T00:31:41.360Z [INFO]   asset ./lib/workflows.d.ts 151 bytes [emitted]
2021-10-14T00:31:41.360Z [INFO]   asset ./lib/activities.d.ts 102 bytes [emitted]
2021-10-14T00:31:41.360Z [INFO]   asset ./lib/client.d.ts 57 bytes [emitted]
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
$ npm run workflow # runs ts-node src/client.ts
Hello, Temporal! # success!
```

This "Hello, Temporal!" message comes from the combination of:

- [`client.ts`](https://github.com/temporalio/samples-typescript/blob/main/hello-world/src/client.ts) passing `'Temporal'` as an argument to the Workflow.
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
- [Clients](/docs/typescript/clients): How to start, signal, query, cancel, or otherwise handle Workflows.

</details>

## Getting Help

For quick questions, we are always available on [the Temporal Slack](https://temporal.io/slack).

For long form/FAQs, please search and ask on [the Temporal community forum](https://community.temporal.io/) instead.

## TS SDK Intro Workshop

We held a 2-hour introduction workshop explaining every core concept from scratch:

<ResponsivePlayer url='https://www.youtube.com/watch?v=CeHSmv8oF_4&feature=youtu.be' />

Timestamps:

- [00:00:00](https://www.youtube.com/watch?v=CeHSmv8oF_4&t=0s) Part 1: TS SDK Intro
- [00:12:15](https://www.youtube.com/watch?v=CeHSmv8oF_4&t=735s) Part 2: Your First Workflow
- [00:16:42](https://www.youtube.com/watch?v=CeHSmv8oF_4&t=1002s) Part 3: Workflows vs Activities
- [00:23:52](https://www.youtube.com/watch?v=CeHSmv8oF_4&t=1432s) Live Code Demo
- [00:36:00](https://www.youtube.com/watch?v=CeHSmv8oF_4&t=2160s) Part 4: Timeouts and Retries
- [00:57:00](https://www.youtube.com/watch?v=CeHSmv8oF_4&t=3420s) Part 5: Workflow APIs
- [01:24:00](https://www.youtube.com/watch?v=CeHSmv8oF_4&t=5040s) Signals and Queries
- [01:29:40](https://www.youtube.com/watch?v=CeHSmv8oF_4&t=5380s) Fullstack Next.js App
- [01:41:50](https://www.youtube.com/watch?v=CeHSmv8oF_4&t=6110s) Part 6: Workers and Task Queues
- [01:45:19](https://www.youtube.com/watch?v=CeHSmv8oF_4&t=6319s) Recap and Q&A

And of course you can [join the #typescript-sdk channel](https://temporal.io/slack) to ask any questions as you get set up.
Design partners are already [putting us in production](https://youtu.be/GpbOkDjpeYU), and we are eager to hear your feedback.
