---
id: how-to-connect-to-temporal-cloud-in-typescript
title: How to connect to Temporal Cloud in TypeScript
sidebar_label: Connect to Temporal Cloud
description: Connect to Temporal Cloud in TypeScript
tags:
  - developer-guide
  - sdk
  - typescript
---

Create a [`Connection`](https://typescript.temporal.io/api/classes/client.Connection) with a [`connectionOptions`](https://typescript.temporal.io/api/interfaces/client.ConnectionOptions) object that has your Cloud namespace and client certificate.

```ts
import { Client, Connection } from '@temporalio/client';
import fs from 'fs-extra';

const { NODE_ENV = 'development' } = process.env;
const isDeployed = ['production', 'staging'].includes(NODE_ENV);

async function run() {
  const cert = await fs.readFile('./path-to/your.pem');
  const key = await fs.readFile('./path-to/your.key');

  let connectionOptions = {};
  if (isDeployed) {
    connectionOptions = {
      address: 'your-namespace.tmprl.cloud:7233',
      tls: {
        clientCertPair: {
          crt: cert,
          key,
        },
      },
    };

    const connection = await Connection.connect(connectionOptions);

    const client = new Client({
      connection,
      namespace: 'your-namespace',
    });

    // . . .

    await client.connection.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
