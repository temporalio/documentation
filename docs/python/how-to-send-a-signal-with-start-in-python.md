---
id: how-to-send-a-signal-with-start-in-python
title: How to send a Signal with start in Python
sidebar_label: Send a Signal with start
description: Send a Signal with start
tags:
  - developer-guide
  - sdk
  - python
---

Use the `start_signal` and `start_signal_args` arguments from either the [`start_workflow()`](https://python.temporal.io/temporalio.client.client#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.client#execute_workflow) asynchronous methods.

```python
async def start_with_signal(client: Client):
    handle = await client.start_workflow(
        "your-workflow-name",
        id="your-workflow-id",
        task_queue="your-task-queue",
        start_signal="your-signal",
        start_signal_args=[
            YourAction(result=YourResultAction(value="some signal arg"))
        ],
    )
```
