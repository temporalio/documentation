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

To start a Child Workflow, use the following function.

```python
workflow.start_child_workflow()
```

You can also use the helper function `execute_child_workflow()`, which takes the same arguments as `start_child_workflow()` and awaits on the results.

```python
async workflow.execute_child_workflow()
```

This should be used in most cases unless advanced task
capabilities are needed.

Child Workflow functions accepts either a Workflow Run Id method or a string name. The arguments to the Workflow are positional.

Child Workflow options are set as keyword arguments _after_ the positional argument. `id` is required.

The `await` of the start does not complete until the Workflow has confirmed to be started.
The result is a Child Workflow handle which is an `asyncio.Task` and supports basic Task features.
The handle also has some child info and supports Signalling the Child Workflow.
