---
id: how-to-send-a-signal-from-a-workflow-in-typescript
title: How to send a Signal from Workflow in TypeScript
sidebar_label: Send a Signal from Workflow
description: Send a Signal from Workflow
tags:
  - developer-guide
  - sdk
  - typescript
---

[`getExternalWorkflowHandle`](https://typescript.temporal.io/api/namespaces/workflow#getexternalworkflowhandle)

```typescript
import { getExternalWorkflowHandle } from '@temporalio/workflow';
import { joinSignal } from './other-workflow';

export async function yourWorkflowThatSignals() {
  const handle = getExternalWorkflowHandle('workflow-id-123');
  await handle.signal(joinSignal, { userId: 'user-1', groupId: 'group-1' });
}
```
