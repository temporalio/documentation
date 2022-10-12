---
id: how-to-connect-to-a-cluster-in-typescript
title: How to connect to a Temporal Cluster in TypeScript
sidebar_label: Connect a Temporal Client
description: Connect a Temporal Client to a Cluster in the TypeScript SDK.
tags:
  - developer-guide
  - sdk
  - typescript
---

Declaring the `WorkflowClient()` creates a new connection to the Temporal service.

If you omit the connection and just call the `new WorkflowClient()`, you create a default connection that works locally.
However, always configure your connection and Namespace when [deploying to production](/typescript/security/#encryption-in-transit-with-mtls).

Use the [`connectionOptions`](https://typescript.temporal.io/api/interfaces/client.ConnectionOptions) API available in the [`WorkflowClient`](https://typescript.temporal.io/api/classes/client.WorkflowClient) package to create a new [`client`](https://typescript.temporal.io/api/namespaces/client/) to communicate with a Temporal Cluster.

Use a new `WorkflowClient()` with the requisite gRPC [`Connection`](https://typescript.temporal.io/api/classes/client.Connection#service) to connect to a Client and set your Namespace name.

Use the [`connectionOptions`](https://typescript.temporal.io/api/interfaces/client.TLSConfig) API to connect a Client with mTLS.

```typescript
import fs from "fs-extra";
import {Connection, WorkflowClient} from "@temporalio/client";
import path = from "path";

async function run() {
  const cert = await fs.readFile("./path-to/your.pem");
  const key = await fs.readFile("./path-to/your.key");

  const connectionOptions = {
    address: "your-custom-namespace.tmprl.cloud:7233",
    tls: {
      clientCertPair: {
        crt: cert,
        key: key,
      },
    // serverRootCACertificatePath: "ca.cert",
    },
  };
  const connection = await Connection.connect(connectionOptions);

  const client = new WorkflowClient({
    connection,
    // connects to 'default' namespace if not specified
    namespace: "your-custom-namespace",
  });

    // . . .
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
