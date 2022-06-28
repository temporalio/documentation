---
id: how-to-set-a-workflow-task-queue-in-python
title: How to set the Task Queue for Workflow Execution in Python
sidebar_label: Task Queue
description: Task Queue
tags:
  - python
  - how-to
---

To set the Workflow Task Queue parameter, use either [`start_workflow()`](https://python.temporal.io/temporalio.client.client#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.client#execute_workflow) methods and specify the Workflow `id` and `task_queue` name in the Workflow options.

The following code example, starts a Workflow with the `GreetingWorkflow` class, passing in the argument `your name`, and sets the Workflow `id` and `task_queue` options.

```python
await client.start_workflow(
    "your-workflow-name",
    id="your-workflow-id",
    task_queue="your-task-queue",
)
```
