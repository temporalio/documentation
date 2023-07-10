---
id: how-to-set-a-parent-close-policy-in-python
title: How to set a Parent Close Policy in Python
sidebar_label: Parent Close Policy
description: Create an instance of the `ParentClosePolicy` class.
---

Set the `parent_close_policy` parameter inside the [`start_child_workflow`](https://python.temporal.io/temporalio.workflow.html#start_child_workflow) function or the [`execute_child_workflow()`](https://python.temporal.io/temporalio.workflow.html#execute_child_workflow) function to specify the behavior of the Child Workflow when the Parent Workflow closes.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_child_workflow/your_child_workflow_dacx.py">View source code</a>

```python
from temporalio.workflow import ParentClosePolicy
# ...
# ...
@workflow.defn
class ComposeGreetingWorkflow:
    @workflow.run
    async def run(self, input: ComposeGreetingInput) -> str:
        return f"{input.greeting}, {input.name}!"


@workflow.defn
class GreetingWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_child_workflow(
            ComposeGreetingWorkflow.run,
            ComposeGreetingInput("Hello", name),
            id="hello-child-workflow-workflow-child-id",
            parent_close_policy=ParentClosePolicy.ABANDON,
        )
```
