---
id: how-to-list-workflow-executions-using-the-client-in-typescript
title: How to list Workflow Executions using the Client in TypeScript
sidebar_label: List Workflow Executions using the Client
description: List Workflow Executions using the Client
tags:
  - developer-guide
  - typescript
  - client
---

Use [`WorkflowService.listWorkflowExecutions`](https://typescript.temporal.io/api/classes/proto.temporal.api.workflowservice.v1.workflowservice-1/#listworkflowexecutions):

```typescript
import { Connection } from '@temporalio/client';

const connection = await Connection.connect();
const response = await connection.workflowService.listWorkflowExecutions({
  query: `ExecutionStatus = "Running"`,
});
```

where `query` is a [List Filter](/concepts/what-is-a-list-filter/).
