---
id: how-to-set-a-parent-close-policy-in-typescript
title: How to set Parent Close Policy in Typescript
sidebar_label: Parent Close Policy
description: Use the `parentClosePolicy` property.
tags:
  - typescript
  - developer-guide
  - how-to
---

To specify how a Child Workflow reacts to a Parent Workflow reaching a Closed state, use the [`parentClosePolicy`](https://typescript.temporal.io/api/interfaces/workflow.ChildWorkflowOptions#parentclosepolicy) option.

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
