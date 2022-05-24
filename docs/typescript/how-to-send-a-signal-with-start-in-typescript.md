---
id: how-to-send-a-signal-with-start-in-typescript
title: How to send a Signal with Start in TypeScript
sidebar_label: Send a Signal with Start
description: Send a Signal with Start
tags:
  - developer-guide
  - sdk
  - typescript
---

To send a Signal to a Workflow and start the Workflow if it isn't already running, use `signalWithStart()`.

```typescript
const client = new WorkflowClient();
await client.signalWithStart(YourWorkflow, {
  workflowId,
  args: [arg1, arg2],
  signal: YourSignal,
  signalArgs: [arg3, arg4],
});
```
