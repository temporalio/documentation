---
id: how-to-set-a-workflow-id-in-typescript
title: How to set a Workflow Id in TypeScript
sidebar_label: Set a Workflow Id
description: Set a Workflow Id
tags:
  - developer-guide
  - sdk
  - typescript
---

Connect to a Client with `client.start()` and any arguments. Then specify your `taskQueue` and set your `workflowId` to a meaningful business identifier.

```typescript
const handle = await client.start(example, {
  workflowId: "yourWorkflowId",
  taskQueue: "yourTaskQueue",
  args: ["your", "arg", "uments"],
});
```

This starts a new Client with the given Workflow Id, Task Queue name, and an argument.
