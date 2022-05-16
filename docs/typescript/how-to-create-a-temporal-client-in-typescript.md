---
id: how-to-create-a-temporal-client-in-typescript
title: How to create a Temporal Client in Typescript
sidebar_label: Create a Temporal Client
description: Create a Temporal Client
tags:
  - developer-guide
  - sdk
  - typescript
---

Use a new `WorflowClient()` with the requisite gRPC [`Connection`](https://typescript.temporal.io/api/classes/client.Connection#service) to create a new Client.

```typescript
import { Connection, WorkflowClient } from '@temporalio/client';
const connection = new Connection(); // to configure for production
const client = new WorkflowClient(connection.service);
```

Declaring the `WorflowClient()` creates a new connection to the Temporal service.

If you ommit the connection and just call the `new WorkflowClient()`, you will create a default connection that works locally. However, configure your connection and Namespace when [deploying to production](/typescript/security/#encryption-in-transit-with-mtls).

The following example, creates a Client, connects to an account, and declares your Namespace.

```typescript
import { Connection, WorkflowClient } from '@temporalio/client';

const connection = new Connection({
  address: '<Namespace ID>.tmprl.cloud', // defaults port to 7233 if not specified
  tls: {
    // set to true if TLS without mTLS
    // See docs for other TLS options
    clientCertPair: {
      crt: clientCert,
      key: clientKey,
    },
  },
});
await connection.untilReady();
const client = new WorkflowClient(connection.service, {
  namespace: 'your.namespace',
});
```

[The Hello World mTLS sample](https://github.com/temporalio/samples-node/tree/main/hello-world-mtls/) demonstrates sample code used to connect to a Temporal Cloud account.
When signing up to Temporal Cloud you should receive a Namespace, a Server address and a Client certificate and key. Use the following environment variables to set up the sample:

- **TEMPORAL_ADDRESS**: looks like `foo.bar.tmprl.cloud` (NOT web.foo.bar.tmprl.cloud)
- **TEMPORAL_NAMESPACE**: looks like `foo.bar`
- **TEMPORAL_CLIENT_CERT_PATH**: `/tls/ca.pem` (file contents start with -----BEGIN CERTIFICATE-----)
- **TEMPORAL_CLIENT_KEY_PATH**: `/tls/ca.key` (file contents start with -----BEGIN PRIVATE KEY-----)

You can leave the remaining vars, like `TEMPORAL_SERVER_NAME_OVERRIDE` and `TEMPORAL_SERVER_ROOT_CA_CERT_PATH` blank.
There is another var, `TEMPORAL_TASK_QUEUE`, which the example defaults to `'hello-world-mtls'` but you can customize as needed.
Example environment settings

```typescript
export function getEnv(): Env {
  return {
    address: 'web.<Namespace ID>.tmprl.cloud', // NOT web.foo.bar.tmprl.cloud
    namespace: 'your.namespace', // as assigned
    clientCertPath: 'foobar.pem', // in project root
    clientKeyPath: 'foobar.key', // in project root
    taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'hello-world-mtls', // just to ensure task queue is same on client and worker, totally optional
    // // not usually needed
    // serverNameOverride: process.env.TEMPORAL_SERVER_NAME_OVERRIDE,
    // serverRootCACertificatePath: process.env.TEMPORAL_SERVER_ROOT_CA_CERT_PATH,
  };
}
```

If you have misconfigured your connection somehow, you will get an opaque `[TransportError: transport error]` error. Read through your settings carefully and contact Temporal if you are sure you have checked everything.

Note the difference between the gRPC and Temporal Web endpoints:

- The gRPC endpoint has a DNS address of `<Namespace ID>.tmprl.cloud`, for example: `accounting-production.f45a2.tmprl.cloud`.
- The Temporal Web endpoint is `web.<Namespace ID>.tmprl.cloud`, for example: `https://web.accounting-production.f45a2.tmprl.cloud`.

If you are using mTLS, it is completely up to you how to get the `clientCert` and `clientKey` pair into your code, whether it is reading from file system, secrets manager, or both. Just keep in mind that they are whitespace sensitive, and some environment variable systems have been known to cause frustration because they modify whitespace.

The following code example works for local development and for certifications hosted in an Amazon S3 bucket.

```typescript
let serverRootCACertificate: Buffer | undefined;
let clientCertificate: Buffer | undefined;
let clientKey: Buffer | undefined;
if (certificateS3Bucket) {
  const s3 = new S3client({ region: certificateS3BucketRegion });
  serverRootCACertificate = await s3.getObject({
    bucket: certificateS3Bucket,
    key: serverRootCACertificatePath,
  });
  clientCertificate = await s3.getObject({
    bucket: certificateS3Bucket,
    key: clientCertPath,
  });
  clientKey = await s3.getObject({
    bucket: certificateS3Bucket,
    key: clientKeyPath,
  });
} else {
  serverRootCACertificate = fs.readFileSync(serverRootCACertificatePath);
  clientCertificate = fs.readFileSync(clientCertPath);
  clientKey = fs.readFileSync(clientKeyPath);
}
```
