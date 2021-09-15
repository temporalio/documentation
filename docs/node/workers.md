---
id: workers
title: Workers in Node
sidebar_label: Workers
---

## What is a Worker?

A Worker is an object that connects to the Temporal Server and executes [Workflows](/docs/node/workflows) and [Activities](/docs/node/activities).
Workers are run on user-controlled hosts.
You can use the `@temporalio/worker` package's [`Worker`](https://nodejs.temporal.io/api/classes/worker.Worker) class to create and run as many Workers as your use case demands, across any number of hosts.

Workers poll [Task Queues](/docs/node/task-queues) for Tasks, execute chunks of code in response to those Tasks, and then communicate the results back to the Temporal Server.

As a developer, running Workers is a fairly simple procedure because the Node SDK handles all of the communication between the Worker and the Temporal Server behind the scenes.

## How to start a Worker

To start a Worker, you need to pass the following two required options to the `Worker.create()` function:

1. The `workDir`. The Node SDK will automatically register:

- Activities exported from `workDir + '/activities.ts'` or `workDir + '/activities/index.ts'` (or `.js` when using JavaScript).
- Workflows exported from `workDir + '/workflows/index.ts'` (Or `.js`)

2. The `taskQueue` the Worker should poll.

Below is an example of starting a Worker that polls the Task Queue named `tutorial`.

<!--SNIPSTART nodejs-hello-worker {"enable_source_link": false}-->
<!--SNIPEND-->
