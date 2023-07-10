---
id: how-to-spawn-a-child-workflow-execution-in-python
title: How to spawn a Child Workflow Execution in Python
sidebar_label: Child Workflow Execution
description: To spawn a Child Workflow Execution in Python use the execute_child_workflow() function which starts the Child Workflow and waits for completion or use the start_child_workflow() function to start a Child Workflow and return its handle.
---

To spawn a Child Workflow Execution in Python, use the [`execute_child_workflow()`](https://python.temporal.io/temporalio.workflow.html#execute_child_workflow) function which starts the Child Workflow and waits for completion or
use the [`start_child_workflow()`](https://python.temporal.io/temporalio.workflow.html#start_child_workflow) function to start a Child Workflow and return its handle.
This is useful if you want to do something after it has only started, or to get the Workflow/Run ID, or to be able to signal it while running.

:::note

`execute_child_workflow()` is a helper function for `start_child_workflow()` plus `await handle`.

:::

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_child_workflow/your_child_workflow_dacx.py">View source code</a>

```python
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
# ...
        )
```
