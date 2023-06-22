---
id: how-to-spawn-a-child-workflow-execution-in-typescript
title: How to spawn a Child Workflow Execution in Typescript
sidebar_label: Child Workflow Execution
tags:
  - developer-guide
  - typescript
---

To start a Child Workflow Execution and return a [handle](https://typescript.temporal.io/api/interfaces/workflow.ChildWorkflowHandle/) to it, use [startChild](https://typescript.temporal.io/api/namespaces/workflow/#startchild).

```ts
import { startChild } from '@temporalio/workflow';

export async function parentWorkflow(names: string[]) {
  const childHandle = await startChild(childWorkflow, {
    args: [name],
    // workflowId, // add business-meaningful workflow id here
    // // regular workflow options apply here, with two additions (defaults shown):
    // cancellationType: ChildWorkflowCancellationType.WAIT_CANCELLATION_COMPLETED,
    // parentClosePolicy: ParentClosePolicy.PARENT_CLOSE_POLICY_TERMINATE
  });
  // you can use childHandle to signal or get result here
  await childHandle.signal('anySignal');
  const result = childHandle.result();
  // you can use childHandle to signal, query, cancel, terminate, or get result here
}
```

To start a Child Workflow Execution and await its completion, use [executeChild](https://typescript.temporal.io/api/namespaces/workflow/#executechild).

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
    ),
  );
  return responseArray.join('\n');
}
```

<!--SNIPEND-->

To control any running Workflow from inside a Workflow, use [getExternalWorkflowHandle(workflowId)](https://typescript.temporal.io/api/namespaces/workflow/#getexternalworkflowhandle).

```ts
import { getExternalWorkflowHandle, workflowInfo } from '@temporalio/workflow';

export async function terminateWorkflow() {
  const { workflowId } = workflowInfo(); // no await needed
  const handle = getExternalWorkflowHandle(workflowId); // sync function, not async
  await handle.cancel();
}
```

If the Child Workflow options aren't explicitly set, they inherit their values from the Parent Workflow options.
Two advanced options are unique to Child Workflows:

- [cancellationType](https://typescript.temporal.io/api/enums/proto.coresdk.child_workflow.ChildWorkflowCancellationType): Controls when to throw the `CanceledFailure` exception when a Child Workflow is canceled.
- `parentClosePolicy`: Explained in the next section.

If you need to cancel a Child Workflow Execution, use [cancellation scopes](/dev-guide/typescript/foundations#cancellation-scopes).
A Child Workflow Execution is automatically canceled when its containing scope is cancelled.
