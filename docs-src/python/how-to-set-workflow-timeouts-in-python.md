---
id: how-to-set-workflow-timeouts-in-python
title: How to set Workflow Timeouts in Python
sidebar_label: Workflow Timeouts
description: Set the timeout from either start_workflow() or execute_workflow().
tags:
  - python
  - how-to
---

Set the timeout from either the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) asynchronous methods.

Available timeouts are:

- `execution_timeout`
- `run_timeout`
- `task_timeout`

```python
handle = await client.start_workflow(
    "your-workflow-name",
    "some arg",
    id="your-workflow-id",
    task_queue="your-task-queue",
    start_signal="your-signal-name",
    # Set Workflow Timeout duration
    execution_timeout="timedelta(seconds=2)",
    # run_timeout="timedelta(seconds=2)",
    # task_timeout="timedelta(seconds=2)",
)
```

```python
handle = await client.execute_workflow(
    "your-workflow-name",
    "some arg",
    id="your-workflow-id",
    task_queue="your-task-queue",
    start_signal="your-signal-name",
    # Set Workflow Timeout duration
    execution_timeout="timedelta(seconds=2)",
    # run_timeout="timedelta(seconds=2)",
    # task_timeout="timedelta(seconds=2)",
)
```
