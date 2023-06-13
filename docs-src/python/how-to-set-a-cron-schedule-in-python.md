---
id: how-to-set-a-cron-schedule-in-python
title: How to set a Cron Schedule in Python
sidebar_label: Cron Schedule
description: Set a Cron Scheduler in Python
tags:
  - python
  - how-to
---

You can set each Workflow to repeat on a schedule with the `cron_schedule` option from either the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) asynchronous methods:

```python
await client.start_workflow(
    "your_workflow_name",
    id="your-workflow-id",
    task_queue="your-task-queue",
    cron_schedule="* * * * *",
)
```
