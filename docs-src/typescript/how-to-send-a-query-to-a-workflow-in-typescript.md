---
id: how-to-send-a-query-to-a-workflow-in-typescript
title: How to send a Query to a Workflow in TypeScript
sidebar_label: Send a Query
description: Use `WorkflowHandle.query` to query a running or completed Workflow.
tags:
  - typescript
  - developer-guide
---

Use [`WorkflowHandle.query`](https://typescript.temporal.io/api/interfaces/client.WorkflowHandle/#query) to query a running or completed Workflow.

<!--SNIPSTART typescript-send-query -->
[state/src/query-workflow.ts](https://github.com/temporalio/samples-typescript/blob/master/state/src/query-workflow.ts)
```ts
import { Client } from '@temporalio/client';
import { getValueQuery } from './workflows';

async function run(): Promise<void> {
  const client = new Client();
  const handle = client.workflow.getHandle('state-id-0');
  const meaning = await handle.query(getValueQuery, 'meaning-of-life');
  console.log({ meaning });
}
```
<!--SNIPEND-->
