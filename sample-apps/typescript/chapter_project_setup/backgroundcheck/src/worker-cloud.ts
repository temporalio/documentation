/* dacx */
/*
A Temporal Cloud Worker requires that you specify the following in the Client connection options:

- Temporal Cloud Namespace
- Temporal Cloud Address
- Certificate and private key associated with the Namespace


Add the following code to `src/worker.ts` to define a worker process that communicates with Temporal Cloud using an mTLS connection, using
configuration provided via environment variables:
*/
import fs from 'fs/promises';

import { Worker, NativeConnection } from '@temporalio/worker';
import * as activities from './activities';

// Note that serverNameOverride and serverRootCACertificate are optional.
async function run({
  address,
  namespace,
  clientCertPath,
  clientKeyPath,
  serverNameOverride,
  serverRootCACertificatePath,
  taskQueue,
}: Env) {
  let serverRootCACertificate: Buffer | undefined = undefined;
  if (serverRootCACertificatePath) {
    serverRootCACertificate = await fs.readFile(serverRootCACertificatePath);
  }

  const connection = await NativeConnection.connect({
    address,
    tls: {
      serverNameOverride,
      serverRootCACertificate,
      clientCertPair: {
        crt: await fs.readFile(clientCertPath),
        key: await fs.readFile(clientKeyPath),
      },
    },
  });

  const worker = await Worker.create({
    connection,
    namespace,
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue,
  });
  console.log('Worker connection successfully established');

  await worker.run();
  await connection.close();
}

run(getEnv()).catch((err) => {
  console.error(err);
  process.exit(1);
});

// Helpers for configuring the mTLS client and worker samples
function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new ReferenceError(`${name} environment variable is not defined`);
  }
  return value;
}

export interface Env {
  address: string;
  namespace: string;
  clientCertPath: string;
  clientKeyPath: string;
  serverNameOverride?: string;
  serverRootCACertificatePath?: string;
  taskQueue: string;
}

export function getEnv(): Env {
  return {
    address: requiredEnv('TEMPORAL_ADDRESS'),
    namespace: requiredEnv('TEMPORAL_NAMESPACE'),
    clientCertPath: requiredEnv('TEMPORAL_CLIENT_CERT_PATH'),
    clientKeyPath: requiredEnv('TEMPORAL_CLIENT_KEY_PATH'),
    serverNameOverride: process.env.TEMPORAL_SERVER_NAME_OVERRIDE,
    serverRootCACertificatePath: process.env.TEMPORAL_SERVER_ROOT_CA_CERT_PATH,
    taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'hello-world-mtls',
  };
}

/*
When specifying the Temporal Cloud Namespace, make sure to append the Account Id as it appears in the url of the Cloud UI.
Consider the following Namespace url: https://cloud.temporal.io/namespaces/backgroundcheck-app.1a23b/workflows, if your Namespace is "backgroundcheck-app" and your Account Id is "1a23b", then you would specify your Namespace as "backgroundcheck-app.1a23b".

The Temporal Cloud gRPC connection address includes your [Namesapce](/concepts/what-is-a-namespace) and a port number: `<Namespace>.<AccountId>.tmprl.cloud:<port>`.
For example: `https://backgroundcheck-app.1a23b.tmprl.cloud:1234`.
There is an option to copy the grPC endpoint address from the Temporal Cloud UI.

![Copy your gRPC endpoint from the UI](/img/copy-grpc-endpoint.png)
*/

/* @dacx
id: backgroundcheck-boilerplate-cloud-worker
title: Run a Temporal Cloud Worker
description: Provide your Namespace, Address, and certificate key pair to connect to Temporal Cloud.
label: Cloud Worker
lines: 2-92
tags:
- typescript sdk
- worker
- temporal cloud
- developer guide
- temporal client
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-cloud-worker-details
title: Cloud Worker details
description: When specifying the Temporal Cloud Namespace, make sure to append the Account Id as it appears in the url of the Cloud UI.
label: Cloud Worker details
lines: 94-103
tags:
- typescript sdk
- worker
- cloud certificate
@dacx */
