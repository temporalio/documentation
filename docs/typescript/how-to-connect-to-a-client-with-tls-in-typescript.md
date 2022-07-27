---
id: how-to-connect-to-a-client-with-tls-in-typescript
title: How to connect to a Client with TLS in TypeScript
sidebar_label: Connect to a Client with TLS
description: Connect to a Client with TLS
tags:
  - developer-guide
  - sdk
  - typescript
---

Use the [`tls`](https://typescript.temporal.io/api/interfaces/client.connectionoptions/#tls) connection option from the [`Client`](https://typescript.temporal.io/api/namespaces/client) class to connect to a Temporal Client with TLS.

Specify your Temporal Cluster [`address`](https://typescript.temporal.io/api/interfaces/client.connectionoptions/#address), and the[`clientCertPair`](https://typescript.temporal.io/api/interfaces/client.TLSConfig#clientcertpair): `crt` and `key` for the Client.

```typescript
const connection = await Connection.connect({
  // This is the address of your temporal cluster.
  address: 'foo.bar.tmprl.cloud',
  tls: {
    clientCertPair: {
      // Reading the client certificate and key from the file system.
      crt: fs.readFileSync(clientCertPath),
      key: fs.readFileSync(clientKeyPath),
    },
  },
});
const client = new WorkflowClient({ connection, namespace: 'foo.bar' });
```
