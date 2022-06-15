---
id: how-to-set-a-workflow-task-timeout-in-python
title: How to Workflow Task timeout in Python
sidebar_label: Workflow Task timeout
description: Workflow Task timeout
tags:
  - python
  - how-to
---

When setting [`client.start_workflow`](https://python.temporal.io/temporalio.client.client#start_workflow) or [`client.execute_workflow`](https://python.temporal.io/temporalio.client.client#execute_workflow) you can provide `task_timeout` as a parameter to set the timeout of a single Workflow Task.

```python
handle = await client.start_workflow(
    "your workflow name",
    id="your-workflow-id",
    task_queue="your-task-queue",
    task_timeout=timedelta(seconds=1),
)
```
