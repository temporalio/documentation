---
id: how-to-send-a-signal-with-start-in-typescript
title: How to send a Signal with Start in Typescript
sidebar_label: Send a Signal with Start
description: Send a Signal with Start
tags:
  - developer-guide
  - sdk
  - typescript
---

To a send a Signal to a Workflow, use the `signalWithStart()` to start a Workflow if it isn't already running.

```typescript
const client = new WorkflowClient();
await client.signalWithStart(YourWorkflow, {
  workflowId,
  args: [arg1, arg2],
  signal: YourSignal,
  signalArgs: [arg3, arg4],
});
```
