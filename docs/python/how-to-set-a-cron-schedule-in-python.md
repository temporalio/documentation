---
id: how-to-set-a-cron-schedule-in-python
title: How to set a Cron Schedule in Python
sidebar_label: Cron Schedule
description: Set a Cron Scheduler in Python
tags:
  - python
  - how-to
---

You can set a Cron Schedule in your Workflows or Workers.

The following example, sets a Cron Schedule in the Workflow.

```python
handle = await client.start_workflow(
    "your_workflow_name",
    id="your-workflow-id",
    task_queue="your-task-queue",
    cron_schedule="* * * * *",
)
```
