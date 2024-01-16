/* dacx */
/*
To use a Worker with a self-hosted Temporal Cluster, set the IP address, port, and Namespace in the Temporal Client options.

Add the following code to `src/worker.ts` to define a worker process that communicates with a self-hosted Temporal cluster using a specific namespace and IP address:
*/
import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  // Step 1: Establish a connection with Temporal server.
  //
  // Worker code uses `@temporalio/worker.NativeConnection`.
  // (But in your application code it's `@temporalio/client.Connection`.)
  const connection = await NativeConnection.connect({
    address: '172.18.0.4:7233',
    // TLS and gRPC metadata configuration goes here.
  });
  // Step 2: Register Workflows and Activities with the Worker and specify your
  // namespace and Task Queue.
  const worker = await Worker.create({
    connection,
    namespace: 'backgroundcheck_namespace',
    taskQueue: 'hello-world',
    // Workflows are registered using a path as they run in a separate JS context.
    workflowsPath: require.resolve('./workflows'),
    activities,
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

/* @dacx
id: backgroundcheck-boilerplate-self-hosted-worker
title: Customize Client options
description: Configure the Temporal Client with the specific IP Address and namespace of the Temporal Server on your network.
label: Self-hosted Client options
lines: 2-36
tags:
- typescript sdk
- worker
- self-hosted
- developer guide
@dacx */
