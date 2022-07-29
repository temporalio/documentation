---
id: how-to-set-tls-configuration-in-typescript
title: How to set TLS configuration in TypeScript
sidebar_label: Set TLS configuration
description: Set TLS configuration
tags:
  - developer-guide
  - sdk
  - typescript
---

Use the [`tls`](https://typescript.temporal.io/api/interfaces/client.connectionoptions/#tls) connection option from the [`Client`](https://typescript.temporal.io/api/namespaces/client) class to connect to a Temporal Client with TLS.

, and the[`clientCertPair`](https://typescript.temporal.io/api/interfaces/client.TLSConfig#clientcertpair): `crt` and `key` for the Client.

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
When signing up to Temporal Cloud you should receive a Namespace, a Server address and a Client certificate and key. Use the following environment variables to set up the sample:

- **TEMPORAL_ADDRESS**: looks like `foo.bar.tmprl.cloud` (NOT web.foo.bar.tmprl.cloud)
- **TEMPORAL_NAMESPACE**: looks like `foo.bar`
- **TEMPORAL_CLIENT_CERT_PATH**: `/tls/ca.pem` (file contents start with -----BEGIN CERTIFICATE-----)
- **TEMPORAL_CLIENT_KEY_PATH**: `/tls/ca.key` (file contents start with -----BEGIN PRIVATE KEY-----)

You can leave the remaining vars, like `TEMPORAL_SERVER_NAME_OVERRIDE` and `TEMPORAL_SERVER_ROOT_CA_CERT_PATH` blank.
There is another var, `TEMPORAL_TASK_QUEUE`, which the example defaults to `hello-world-mtls`, but you can customize as needed.
Example environment settings

```typescript
export function getEnv(): Env {
  return {
    address: 'web.<Namespace_ID>.tmprl.cloud', // NOT web.foo.bar.tmprl.cloud
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
