---
id: how-to-set-workflow-timeouts-in-python
title: How to set Workflow Timeouts in Python
sidebar_label: Workflow Timeouts
description: Set the timeout to either start_workflow() or execute_workflow().
---

Set the timeout to either the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) asynchronous methods.

Available timeouts are:

- `execution_timeout`
- `run_timeout`
- `task_timeout`

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/workflow_timeouts_retries/workflows_dacx.py">View source code</a>

```python
# ...
    result = await client.execute_workflow(
        YourWorkflow.run,
        "your timeout argument",
        id="your-workflow-id",
        task_queue="your-task-queue",
        # Set Workflow Timeout duration
        execution_timeout=timedelta(seconds=2),
        # run_timeout=timedelta(seconds=2),
        # task_timeout=timedelta(seconds=2),
    )
```
