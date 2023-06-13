---
id: how-to-set-workflow-retry-options-in-python
title: How to set Workflow Retry Options in Python
sidebar_label: Workflow Retry Options
description: Set the Retry Policy from either start_workflow() or execute_workflow().
tags:
  - python
  - how-to
---

Set the Retry Policy from either the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) asynchronous methods.

```python
handle = await client.start_workflow(
    "your-workflow-name",
    "some arg",
    id="your-workflow-id",
    task_queue="your-task-queue",
    start_signal="your-signal-name",
    retry_policy=RetryPolicy(maximum_interval=timedelta(seconds=2)),
)
```

```python
handle = await client.execute_workflow(
    "your-workflow-name",
    "some arg",
    id="your-workflow-id",
    task_queue="your-task-queue",
    start_signal="your-signal-name",
    retry_policy=RetryPolicy(maximum_interval=timedelta(seconds=2)),
)
```
