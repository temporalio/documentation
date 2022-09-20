---
id: how-to-spawn-a-workflow-execution-in-typescript
title: How to spawn a Workflow Execution in TypeScript
sidebar_label: Spawn a Workflow Execution
description: Spawn a Workflow Execution
tags:
  - developer-guide
  - sdk
  - typescript
---

When you have a Workflow Client, you can schedule the start of a Workflow with `client.start()`, specifying `workflowId`, `taskQueue`, and `args` and returning a Workflow handle immediately after the Server acknowledges the receipt.

```typescript
const handle = await client.start(example, {
  workflowId: "your-workflow-id",
  taskQueue: "your-task-queue",
  args: ["argument01", "argument02", "argument03"], // this is typechecked against workflowFn's args
});
const handle = client.getHandle(workflowId);
const result = await handle.result();
```

Calling `client.start()` and `client.execute()` send a command to Temporal Server to schedule a new Workflow Execution on the specified Task Queue. It does not actually start until a Worker that has a matching Workflow Type, polling that Task Queue, picks it up.

You can test this by executing a Workflow Client command without a matching Worker. Temporal Server records the command in Event History, but does not make progress with the Workflow Execution until a Worker starts polling with a matching Task Queue and Workflow Definition.

Workflow Execution run in a separate V8 isolate context in order to provide a [deterministic runtime](/typescript/determinism).
