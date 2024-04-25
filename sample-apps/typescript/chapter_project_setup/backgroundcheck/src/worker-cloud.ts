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
 To run a Temporal Cloud Worker, you'll change some parameters in your Client connection code, such as updating the namespace and gRPC endpoint.
 You'll use:
 
 - The [Temporal Cloud Namespace Id](https://docs.temporal.io/cloud/namespaces#temporal-cloud-namespace-id).
 - The [Namespace's gRPC endpoint](https://docs.temporal.io/cloud/namespaces#temporal-cloud-grpc-endpoint).
 The endpoint uses this format `(namespace.unique_id.tmprl.cloud:port)`.
 - [Paths to the SSL certificate (.pem) and private key (.key)](https://docs.temporal.io/cloud/saml#integrate-saml-with-your-temporal-cloud-account) registered to your Namespace and stored on your Worker's file system.
 
 Copy the Namespace Id and the gRPC endpoint from the Namespace detail Web page on [Temporal Cloud Namespaces](https://cloud.temporal.io/namespaces). Click on a Namespace name to open the Namespace details.
 
 For information about managing and generating client certificates for Temporal Cloud, see [How to manage certificates in Temporal Cloud](https://docs.temporal.io/cloud/certificates#issue-certificates).
 
 For information about configuring TLS to secure inter- and intra-network communication for a Temporal Service, see [Temporal Customization Samples](https://github.com/temporalio/samples-server).
 
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
