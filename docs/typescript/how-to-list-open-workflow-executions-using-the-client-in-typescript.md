---
id: how-to-list-open-workflow-executions-using-the-client-in-typescript
title: How to list open Workflow Executions using the Client in TypeScript
sidebar_label: List open Workflow Executions using the Client
description: List open Workflow Executions using the Client
tags:
  - developer-guide
  - typescript
  - client
---

Use [`workflowService.listOpenWorkflowExecutions`](https://typescript.temporal.io/api/classes/proto.temporal.api.workflowservice.v1.WorkflowService-1#listopenworkflowexecutions):

```typescript
import { Connection } from '@temporalio/client';

const connection = await Connection.connect();
await connection.workflowService.listOpenWorkflowExecutions();
```

To search with a [List Filter](/concepts/what-is-a-list-filter/), use [`workflowService.scanWorkflowExecutions`](https://typescript.temporal.io/api/classes/proto.temporal.api.workflowservice.v1.WorkflowService-1#scanworkflowexecutions).

```typescript
import { Connection } from '@temporalio/client';

const connection = await Connection.connect();
await connection.workflowService.scanWorkflowExecutions();
```
