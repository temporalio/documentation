---
id: how-to-connect-to-a-development-cluster-in-typescript
title: How to connect to a Temporal Cluster in TypeScript
sidebar_label: Connect a Temporal Client
description: Connect a Temporal Client to a Cluster in the TypeScript SDK.
tags:
  - developer-guide
  - sdk
  - typescript
---

Creating a [Connection](https://typescript.temporal.io/api/classes/client.Connection) connects to the Temporal Cluster, and you can pass the `Connection` instance when creating the [Client](https://typescript.temporal.io/api/classes/client.Client#connection).

If you omit the `Connection` and just create a `new Client()`, it will connect to `localhost:7233`.

```ts
import { Client } from '@temporalio/client';

async function run() {
  const client = new Client();

  // . . .

  await client.connection.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
