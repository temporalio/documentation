---
id: how-to-set-mtls-configuration-in-typescript
title: How to set mTLS configuration in TypeScript
sidebar_label: Set mTLS configuration
description: To set the mTLS configuration in TypeScript, use the `tls` connection option from the `Client` class to connect to a Temporal Client with mTLS.
tags:
  - developer-guide
  - sdk
  - typescript
---

To set the mTLS configuration in TypeScript, use the [`tls`](https://typescript.temporal.io/api/interfaces/client.ConnectionOptions/#tls) connection option from the [`Client`](https://typescript.temporal.io/api/namespaces/client) class to connect to a Temporal Client with mTLS.

```typescript
const connection = await Connection.connect({
  address: 'foo.bar.tmprl.cloud',
  tls: {
    clientCertPair: {
      crt: clientCertPath,
      key: clientKeyPath,
    },
  },
});
const client = new WorkflowClient({ connection, namespace: 'foo.bar' });
```

[The Hello World mTLS sample](https://github.com/temporalio/samples-typescript/tree/main/hello-world-mtls/) demonstrates sample code used to connect to a Temporal Cloud account.
When signing up to Temporal Cloud, you should receive a Namespace, a Server address, and a Client certificate and key. Use the following environment variables to set up the sample:

- **TEMPORAL_ADDRESS**: looks like `foo.bar.tmprl.cloud` (NOT web.foo.bar.tmprl.cloud)
- **TEMPORAL_NAMESPACE**: looks like `foo.bar`
- **TEMPORAL_CLIENT_CERT_PATH**: `/tls/ca.pem` (file contents start with -----BEGIN CERTIFICATE-----)
- **TEMPORAL_CLIENT_KEY_PATH**: `/tls/ca.key` (file contents start with -----BEGIN PRIVATE KEY-----)

You can leave the remaining variables, like `TEMPORAL_SERVER_NAME_OVERRIDE` and `TEMPORAL_SERVER_ROOT_CA_CERT_PATH`, blank.
If needed, you can customize `TEMPORAL_TASK_QUEUE`; the following example defaults to `hello-world-mtls`.

```typescript
export function getEnv(): Env {
  return {
    // NOT web.foo.bar.tmprl.cloud
    address: 'web.<Namespace_ID>.tmprl.cloud',
    // as assigned
    namespace: 'your.namespace',
    // in project root
    clientCertPath: 'foobar.pem',
    clientKeyPath: 'foobar.key',
    // just to ensure task queue is same on client and worker, totally optional
    taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'hello-world-mtls',
    // not usually needed:
    // serverNameOverride: process.env.TEMPORAL_SERVER_NAME_OVERRIDE,
    // serverRootCACertificatePath: process.env.TEMPORAL_SERVER_ROOT_CA_CERT_PATH,
  };
}
```

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
