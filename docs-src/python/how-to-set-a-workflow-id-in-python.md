---
id: how-to-set-a-workflow-id-in-python
title: How to set a Workflow Id in Python
sidebar_label: Set a Workflow Id
description: Set a Workflow Id
tags:
  - developer-guide
  - sdk
  - python
---

To set a Workflow Id in Python, specify the `id` argument when executing a Workflow with either [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) methods.

The `id` argument should be a unique identifier for the Workflow Execution.

```python
result = await client.execute_workflow(
    "your-workflow-name",
    "some arg",
    id="your-workflow-id",
    task_queue="your-task-queue",
)
```
