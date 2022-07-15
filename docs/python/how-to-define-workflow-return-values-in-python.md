---
id: how-to-define-workflow-return-values-in-python
title: How to define Workflow return values
sidebar_label: Define Workflow return values
description: Define Workflow return values
tags:
  - developer-guide
  - sdk
  - python
---

A Workflow Definition can return the results of a Workflow.

To return the results of a Workflow Definition, use either [`start_workflow()`](https://python.temporal.io/temporalio.client.client#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.client#execute_workflow) asynchronous methods.

```python
handle = await client.start_workflow(
    "your-workflow-name",
    id="your-workflow-id",
    task_queue="your-task-queue",
)

result = await handle.result()
```

`execute_workflow()` is a helper function for `start_workflow()` and `handle.result()`.

```python
handle = await client.execute_workflow(
    "your-workflow-name",
    id="your-workflow-id",
    task_queue="your-task-queue",
)
```
