---
id: how-to-set-a-parent-close-policy-in-python
title: How to set a Parent Close Policy in Python
sidebar_label: Parent Close Policy
description: Create an instance of the `ParentClosePolicy` class.
tags:
  - python
  - developer-guide
  - how-to
---

Set the `parent_close_policy` parameter inside the [`start_child_workflow`](https://python.temporal.io/temporalio.workflow.html#start_child_workflow) function or the [`execute_child_workflow()`](https://python.temporal.io/temporalio.workflow.html#execute_child_workflow) function to specify the behavior of the Child Workflow when the Parent Workflow closes.



```python
async def run(self, name: str) -> str:
    return await workflow.execute_child_workflow(
        ComposeGreeting.run,
        ComposeGreetingInput("Hello", name),
        id="hello-child-workflow-workflow-child-id",
        parent_close_policy=TERMINATE,
    )
```

:::note

`execute_child_workflow()` is a shortcut function for `temporalio.workflow.start_child_workflow()` plus `handle.result()`.

:::
