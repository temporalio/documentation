---
id: how-to-set-a-workflow-task-queue-in-python
title: How to set the Task Queue for Workflow Execution in Python
sidebar_label: Task Queue
description: Task Queue
tags:
  - python
  - how-to
---

To set a Task Queue in Python, specify the `task_queue` argument when executing a Workflow with either [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) methods.

```python
result = await client.execute_workflow(
    "your-workflow-name",
    "some arg",
    id="your-workflow-id",
    task_queue="your-task-queue",
)
```
