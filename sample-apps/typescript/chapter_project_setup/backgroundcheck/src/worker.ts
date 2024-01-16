/* dacx */
/*
To run a Worker Process with a local development server, define the following steps in code:

- Initialize a connection with the Temporal server.
- Create a new Worker by passing the Client to creation call.
- Register the application's Workflow and Activity functions.
- Call `run()` on the Worker.

In regards to organization, we recommend keeping Worker code separate from Workflow and Activity code.

Add the following code to `src/worker.ts` to define a worker process that communicates with a local development server:
*/
import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  // Step 1: Establish a connection with Temporal server.
  //
  // Worker code uses `@temporalio/worker.NativeConnection`.
  // (But in your application code it's `@temporalio/client.Connection`.)
  const connection = await NativeConnection.connect({
    address: 'localhost:7233',
    // TLS and gRPC metadata configuration goes here.
  });
  // Step 2: Register Workflows and Activities with the Worker and specify your
  // namespace and Task Queue.
  const worker = await Worker.create({
    connection,
    namespace: 'default',
    taskQueue: 'background-check',
    // Workflows are registered using a path as they run in a separate JS context.
    workflowsPath: require.resolve('./workflows'),
    activities,
  });

  // Step 3: Start accepting tasks on the `background-check` queue
  //
  // The worker runs until it encounters an unexepected error or the process receives a shutdown signal registered on
  // the SDK Runtime object.
  //
  // By default, worker logs are written via the Runtime logger to STDERR at INFO level.
  //
  // See https://typescript.temporal.io/api/classes/worker.Runtime#install to customize these defaults.
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

/* @dacx
id: backgroundcheck-boilerplate-run-a-dev-server-worker
title: Run a dev server Worker
description: Define the code needed to run a Worker Process in TypeScript that talks to your local dev cluster.
label: Dev server Worker
lines: 2-51
tags:
- typescript sdk
- worker
- developer guide
- temporal client
@dacx */
