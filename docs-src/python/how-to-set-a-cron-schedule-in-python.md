---
id: how-to-set-a-cron-schedule-in-python
title: How to set a Cron Schedule in Python
sidebar_label: Cron Schedule
description: You can set each Workflow to repeat on a schedule with the cron_schedule option from either the start_workflow() or execute_workflow() asynchronous methods.
---

You can set each Workflow to repeat on a schedule with the `cron_schedule` option from either the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) asynchronous methods.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_cron_job/your_cron_dacx.py">View source code</a>

```python
# ...
    result = await client.execute_workflow(
        LoopingWorkflow.run,
        0,
        id="your-workflow-id",
        task_queue="your-task-queue",
        cron_schedule="* * * * *",
    )
```
