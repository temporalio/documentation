---
id: how-to-create-a-temporal-client-in-typescript
title: How to create a Temporal Client in TypeScript
sidebar_label: Create a Temporal Client
description: Create a Temporal Client
tags:
  - developer-guide
  - sdk
  - typescript
---

Use a new `WorkflowClient()` with the requisite gRPC [`Connection`](https://typescript.temporal.io/api/classes/client.Connection#service) to create a new Client.

```typescript
import { Connection, WorkflowClient } from '@temporalio/client';
const connection = await Connection.connect(); // to configure for production
const client = new WorkflowClient({ connection });
```

Declaring the `WorkflowClient()` creates a new connection to the Temporal service.

If you omit the connection and just call the `new WorkflowClient()`, you create a default connection that works locally.
However, always configure your connection and Namespace when [deploying to production](/typescript/security/#encryption-in-transit-with-mtls).

The following example, creates a Client, connects to an account, and declares your Namespace.

```typescript
import { Connection, WorkflowClient } from '@temporalio/client';

const connection = await Connection.connect({
  address: '<Namespace_ID>.tmprl.cloud',
});
const client = new WorkflowClient({
  connection,
  namespace: 'your.namespace',
});
```
