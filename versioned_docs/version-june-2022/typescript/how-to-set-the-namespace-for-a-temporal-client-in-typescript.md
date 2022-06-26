---
id: how-to-set-the-namespace-for-a-temporal-client-in-typescript
title: How to set a Namespace for a Temporal Client in TypeScript
sidebar_label: Set Namespace
description: Use the setNamespace method on Workflow Client Options Builder.
tags:
  - how-to
  - typescript
---

Set the `namespace` field on the options object.

```ts
const connection = await Connection.connect();
// https://typescript.temporal.io/api/interfaces/client.WorkflowClientOptions
const client = new WorkflowClient({
  connection,
  namespace: "my-namespace-name",
});
```
