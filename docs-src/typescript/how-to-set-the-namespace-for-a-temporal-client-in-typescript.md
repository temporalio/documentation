---
id: how-to-set-the-namespace-for-a-temporal-client-in-typescript
title: How to set a Namespace for a Temporal Client in TypeScript
sidebar_label: Set Namespace
description: Set the Namespace in Client Options Builder.
tags:
  - how-to
  - typescript
---

Set the [`namespace`](https://typescript.temporal.io/api/namespaces/client/) field on the options object.

```ts
const connection = await Connection.connect();
// https://typescript.temporal.io/api/interfaces/client.ClientOptions
const client = new Client({
  connection,
  namespace: 'your-custom-namespace',
});
```
