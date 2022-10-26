---
id: security
title: Connection and Encryption in the TypeScript SDK
sidebar_label: Connection and Security
description: A summary of the security features you should know as a TypeScript SDK user.
---

Temporal Workers and Clients connect with your Temporal Cluster via gRPC, and must be configured securely for production.
There are three main features to know:

- **Namespaces** help isolate code from each other
- **TLS Encryption** helps encrypt code in transit
- **Data Converter** helps encrypt code at rest (available soon)

Temporal Server internally has [other Security features](/server/security), particularly Authorization.

An important part of Temporal's security model is that Temporal Server only manages state and time - it never actually sees or runs your Workflow/Activity code.
Code is hosted by Temporal Workers that you run, and Temporal Server only sees inbound/outbound gRPC messages.
This eliminates a whole class of problems particularly when providing Temporal to multiple teams in your company, or when working with Temporal Cloud as a customer.

## Namespaces

import Content from '../concepts/what-is-a-namespace.md'

<Content />

All SDK connections (whether Workers or Clients) are to a specific namespace.
If not specified in [WorkflowClientOptions](https://typescript.temporal.io/api/interfaces/client.WorkflowClientOptions), this defaults to the `default` namespace.

```ts
const connection = await Connection.connect();

const client = new WorkflowClient({
  connection,
  namespace: 'your-custom-namespace', // defaults to 'default'
});
```

## Encryption in transit with mTLS

There are two classes in the SDK that connect to the Temporal server, the [Worker](https://typescript.temporal.io/api/classes/worker.Worker) and the client [Connection](https://typescript.temporal.io/api/classes/client.Connection/).
When instantiating either of them, you may choose whether to connect securely or not.

- In order to connect to the server using TLS, set a _truthy_ value (`true` or [TLSConfig](https://typescript.temporal.io/api/interfaces/client.TLSConfig) for custom options) in the `tls` configuration option.
- Use [`ServerOptions.tls`](https://typescript.temporal.io/api/interfaces/worker.ServerOptions#tls) when [creating](https://typescript.temporal.io/api/classes/worker.Worker/#create) a new Worker and
  [`ConnectionOptions.tls`](https://typescript.temporal.io/api/interfaces/client.ConnectionOptions#tls) for the [`Connection`](https://typescript.temporal.io/api/classes/client.Connection) constructor.
- The client connection also accepts [gRPC credentials](https://grpc.github.io/grpc/node/grpc.credentials.html) at [`ConnectionOptions.credentials`](https://typescript.temporal.io/api/interfaces/client.ConnectionOptions#tls) as long as `tls` is not also specified.

A full example for Clients looks like this:

```js
import { Connection, WorkflowClient } from '@temporalio/client';

const connection = await Connection.connect({
  // defaults port to 7233 if not specified
  address: 'foo.bar.tmprl.cloud',
  tls: {
    // set to true if TLS without mTLS
    // See docs for other TLS options
    clientCertPair: {
      crt: clientCert,
      key: clientKey,
    },
  },
});
const client = new WorkflowClient({
  connection,
  namespace: 'foo.bar', // as explained in Namespaces section
});
```

A full example for Workers looks like this:

```js
import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
  const connection = await NativeConnection.connect({
    address: 'foo.bar.tmprl.cloud', // defaults port to 7233 if not specified
    tls: {
      // set to true if TLS without mTLS
      // See docs for other TLS options
      clientCertPair: {
        crt: clientCert,
        key: clientKey,
      },
    },
  });

  const worker = await Worker.create({
    connection,
    namespace: 'foo.bar', // as explained in Namespaces section
    // ...
  });
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

If you are using mTLS, is completely up to you how to get the `clientCert` and `clientKey` pair into your code, whether it is reading from filesystem, secrets manager, or both.
Just keep in mind that they are whitespace sensitive and some environment variable systems have been known to cause frustration because they modify whitespace.

<details>
<summary>
  Example code that works for local dev and for certs hosted on AWS S3
</summary>

```ts
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

_Thanks to our Design Partner [Mina Abadir](https://twitter.com/abadir_) for sharing this.\_

</details>

<span id="mtls-tutorial"></span>

### Connecting to Temporal Cloud (with mTLS)

[The Hello World mTLS sample](https://github.com/temporalio/samples-typescript/tree/main/hello-world-mtls/) shows how to connect to a Temporal Cloud account.
After signing up for Temporal Cloud, you should have a namespace, a server address, and a client certificate and key. Use the following environment variables to set up the sample:

- **TEMPORAL_ADDRESS**: looks like `foo.bar.tmprl.cloud` (NOT web.foo.bar.tmprl.cloud)
- **TEMPORAL_NAMESPACE**: looks like `foo.bar`
- **TEMPORAL_CLIENT_CERT_PATH**: e.g. `/tls/ca.pem` (file contents start with -----BEGIN CERTIFICATE-----)
- **TEMPORAL_CLIENT_KEY_PATH**: e.g. `/tls/ca.key` (file contents start with -----BEGIN PRIVATE KEY-----)

You can leave the remaining vars, like `TEMPORAL_SERVER_NAME_OVERRIDE` and `TEMPORAL_SERVER_ROOT_CA_CERT_PATH` blank.
There is another var, `TEMPORAL_TASK_QUEUE`, which the example defaults to `'hello-world-mtls'` but you can customize as needed.

<details>
<summary>Example environment settings</summary>

```ts
export function getEnv(): Env {
  return {
    // NOT web.foo.bar.tmprl.cloud
    address: 'foo.bar.tmprl.cloud',
    namespace: 'foo.bar',
    // in project root
    clientCertPath: 'foobar.pem',
    clientKeyPath: 'foobar.key',
    // just to ensure task queue is same on client and worker, totally optional
    taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'hello-world-mtls',
    // // not usually needed
    // serverNameOverride: process.env.TEMPORAL_SERVER_NAME_OVERRIDE,
    // serverRootCACertificatePath: process.env.TEMPORAL_SERVER_ROOT_CA_CERT_PATH,
  };
}
```

</details>

If you have misconfigured your connection somehow, you will get an opaque `[TransportError: transport error]` error. Read through your settings carefully and contact us if you are sure you have checked everything.

Note the difference between the gRPC and Temporal Web endpoints:

- The gRPC endpoint has a DNS address of `<Namespace_ID>.tmprl.cloud`, for example: `accounting-production.f45a2.tmprl.cloud`.
- The Temporal Web endpoint is `web.<Namespace_ID>.tmprl.cloud`, for example: `https://web.accounting-production.f45a2.tmprl.cloud`.

### Local mTLS sample tutorial

Follow this tutorial for setting up mTLS (Mutual TLS authentication) with Temporal Server, Client, and Worker locally.
**For Temporal Cloud customers, there is a separate tutorial above.**

1. Set up Temporal Server with mTLS encryption locally
   - Clone the [server samples repo](https://github.com/temporalio/samples-server/) and change to the `tls/tls-simple` directory
   - Follow [these instructions](https://github.com/temporalio/samples-server/tree/master/tls/tls-simple#readme) to set up a local server with mTLS
   - The sample does not register the default Namespace on startup, register it with: `docker exec -it tls-simple_temporal-admin-tools_1 tctl n re --retention 1 default`
1. Configure your Temporal Client and Worker to connect with mTLS
   - Scaffold a new Temporal project with `npx @temporalio/create@latest` using the `hello-world-mtls` template, or copy the relevant configuration from the snippets below into an existing project.
   - Export the required environment variables:
     ```bash
     export TEMPORAL_ADDRESS=localhost
     export TEMPORAL_NAMESPACE=default
     export TEMPORAL_CLIENT_CERT_PATH=/path/to/samples-server/tls/tls-simple/certs/client.pem
     export TEMPORAL_CLIENT_KEY_PATH=/path/to/samples-server/tls/tls-simple/certs/client.key
     # just for the local mTLS sample
     export TEMPORAL_SERVER_ROOT_CA_CERT_PATH=/path/to/samples-server/tls/tls-simple/certs/ca.cert
     export TEMPORAL_SERVER_NAME_OVERRIDE=tls-sample
     ```
1. Test the connection with `npm run start.watch` and `npm run workflow`.
   You should see everything working as per the regular Hello World tutorial.

Temporal has no opinions on production deployment strategy other than the connections and architecture displayed here.

## Encryption at rest with Payload Codec

- [Data Converter ➡️ Encryption](/concepts/what-is-a-data-converter#encryption)
- [Data Converters in TypeScript ➡️ Encryption](/typescript/data-converters#encryption)
