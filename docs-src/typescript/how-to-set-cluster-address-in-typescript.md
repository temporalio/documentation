---
id: how-to-set-cluster-address-in-typescript
title: How to set a Cluster address in TypeScript
sidebar_label: Set Cluster address
description: Set Cluster address
tags:
  - TypeScript
  - how-to
---

Use the [`address`](https://typescript.temporal.io/api/interfaces/client.ConnectionOptions/#address) connection option from the [`Client`](https://typescript.temporal.io/api/namespaces/client).

```typescript
const connection = await Connection.connect({
  address: 'foo.bar.tmprl.cloud',
  // ...
});
```
