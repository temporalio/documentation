---
id: how-to-set-a-parent-close-policy-in-python
title: How to set a Parent Close Policy in Python
sidebar_label: Parent Close Policy
description: Parent Close Policy
tags:
  - python
  - how-to
---

In Python, a [Parent Close Policy](https://docs.temporal.io/workflows/#parent-close-policy) is register with [`ParentClosePolicy`](https://python.temporal.io/temporalio.workflow.parentclosepolicy).
Parent Close Policies determine how a child Workflow should be handled when the parent closes.
Possible enumerated constants include:

- `ABANDON` - the Child Workflow Execution is not affected.
- `REQUEST_CANCEL` - a Cancellation request is sent to the Child Workflow Execution.
- `TERMINATE` - the Child Workflow Execution is forcefully Terminated.
- `UNSPECIFIED`

To specify a Parent Close policy, set your `parent_close_policy` variable to `workflow.ParentClosePolicy.<ParentCloseValue>`

The following code example starts a Child Workflow with a Parent Close policy of `TERMINATE`.

```python
@workflow.defn
class ChildWorkflow:
    @workflow.run
    async def run(self) -> None:
        id = f"{workflow.info().workflow_id}_child"
        await workflow.start_child_workflow(
            LongSleepWorkflow.run,
            id=id,
            parent_close_policy=workflow.ParentClosePolicy.TERMINATE,
        )
```
