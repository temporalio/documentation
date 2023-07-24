---
id: how-to-set-workflow-retry-options-in-python
title: How to set Workflow Retry Options in Python
sidebar_label: Workflow Retry Options
description: Set the Retry Policy to either start_workflow() or execute_workflow().
---

Set the Retry Policy to either the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) asynchronous methods.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/workflow_timeouts_retries/workflows_dacx.py">View source code</a>

```python
# ...
    handle = await client.execute_workflow(
        YourWorkflow.run,
        "your retry policy argument",
        id="your-workflow-id",
        task_queue="your-task-queue",
        retry_policy=RetryPolicy(maximum_interval=timedelta(seconds=2)),
    )
```
