---
id: how-to-send-a-signal-from-a-client-in-typescript
title: How to send a Signal from a Client in TypeScript
sidebar_label: Send a Signal from Client
description: Send a Signal from Client
tags:
  - developer-guide
  - sdk
  - typescript
---

[`WorkflowHandle.signal`](https://typescript.temporal.io/api/interfaces/client.WorkflowHandle#signal)

```typescript
import { WorkflowClient } from '@temporalio/client';
import { joinSignal } from './workflows';

const client = new WorkflowClient();

const handle = client.getHandle('workflow-id-123');

await handle.signal(joinSignal, { userId: 'user-1', groupId: 'group-1' });
```
