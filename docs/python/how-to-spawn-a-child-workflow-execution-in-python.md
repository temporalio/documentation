---
id: how-to-spawn-a-child-workflow-execution-in-python
title: How to spawn a Child Workflow Execution in Python
sidebar_label: Spawn a Child Workflow Execution
description: Spawn a Child Workflow Execution
tags:
  - developer-guide
  - sdk
  - python
---

To start a Child Workflow, use [`start_child_workflow()`](https://python.temporal.io/temporalio.workflow.html#start_child_workflow).

The following starts a Child Workflow function in a Workflow.

```python
@workflow.defn
class ChildAlreadyStartedWorkflow:
    @workflow.run
    async def run(self) -> None:
        id = f"{workflow.info().workflow_id}_child"
        await workflow.start_child_workflow(LongSleepWorkflow.run, id=id)
```

You can also use the helper function [`execute_child_workflow()`](https://python.temporal.io/temporalio.workflow.html#execute_child_workflow), which takes the same arguments as `start_child_workflow()` and awaits on the results.

```python
await workflow.execute_child_workflow(
    "your-arguments",
    "your-params",
    id="your-workflow-id",
)
```

The following executes a Child Workflow function in a Workflow.

```python
@workflow.defn
class SimpleChildWorkflow:
    @workflow.run
    async def run(self, params: SimpleChildWorkflowParams) -> str:
        return await workflow.execute_child_workflow(
            HelloWorkflow.run, params.name, id=params.child_id
        )
```

`execute_child_workflow()` should be used in most cases unless advanced task capabilities are needed.

Child Workflow functions accept either a Workflow Run method or a string name. Workflow arguments are positional.

Child Workflow options are set as keyword arguments _after_ the positional argument. `id` is required.

The `await` of the start does not complete until the Workflow start is confirmed.
The result is a Child Workflow handle, which is an `asyncio.Task` and supports basic Task features.
The handle also has some child info and supports Signalling the Child Workflow.
