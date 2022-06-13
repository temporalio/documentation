---
id: how-to-set-a-workflow-task-queue-in-python
title: How to set the Task Queue for Workflow Execution in Python
sidebar_label: Task Queue
description: Task Queue
tags:
  - python
  - how-to
---

Set the Workflow Task Queue with the [`start_workflow()`](https://python.temporal.io/temporalio.client.client#start_workflow) or [`execute_workflow`](https://python.temporal.io/temporalio.client.client#execute_workflow) async method in the Client code.

In Python, the Workflow `id` and `task_queue` are required arguments in the Workflow Options.

The following example, starts a Workflow with the `GreetingWorkflow` class, passing in the argument `my name`, and sets the Workflow `id` and `task_queue` options.

```python
await client.start_workflow(
    GreetingWorkflow.run, "my name", id="my-workflow-id", task_queue="my-task-queue"
)
```
