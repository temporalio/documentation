---
id: how-to-spawn-a-child-workflow-execution-in-typescript
title: How to spawn a Child Workflow Execution in Typescript
sidebar_label: Child Workflow Execution
tags:
  - developer-guide
  - typescript
---

To start a Child Workflow and return a [handle](https://typescript.temporal.io/api/interfaces/workflow.ChildWorkflowHandle/) to it, use [`startChild`](https://typescript.temporal.io/api/namespaces/workflow/#startchild).

To start a Child Workflow Execution and await its completion, use [`executeChild`](https://typescript.temporal.io/api/namespaces/workflow/#executechild).

By default, a child is scheduled on the same Task Queue as the parent.

<!--SNIPSTART typescript-child-workflow -->
[child-workflows/src/workflows.ts](https://github.com/temporalio/samples-typescript/blob/master/child-workflows/src/workflows.ts)
```ts
import { executeChild } from '@temporalio/workflow';

export async function parentWorkflow(...names: string[]): Promise<string> {
  const responseArray = await Promise.all(
    names.map((name) =>
      executeChild(childWorkflow, {
        args: [name],
        // workflowId, // add business-meaningful workflow id here
        // // regular workflow options apply here, with two additions (defaults shown):
        // cancellationType: ChildWorkflowCancellationType.WAIT_CANCELLATION_COMPLETED,
        // parentClosePolicy: ParentClosePolicy.PARENT_CLOSE_POLICY_TERMINATE
      })
    )
  );
  return responseArray.join('\n');
}
```
<!--SNIPEND-->
