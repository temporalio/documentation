---
id: how-to-set-a-workflow-id-in-python
title: How to set a Workflow Id in Python
sidebar_label: Set a Workflow Id
description: Set a Workflow Id
tags:
  - developer-guide
  - sdk
  - python
---

To set a Workflow Id in Python, specify the `id` argument when executing a Workflow with the [`execute_workflow`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow).

The `id` argument should be a unique identifier for the Workflow Execution.
The `execute_workflow` function starts a Workflow and wait for completion.

```python
result = await client.execute_workflow(
    SayHello.run, "Temporal", id="your-workflow-id", task_queue="your-task-queue"
)
```
