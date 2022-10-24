---
id: how-to-send-a-signal-with-start-in-python
title: How to send a Signal-With-Start in Python
sidebar_label: Signal-With-Start
description: Signal-With-Start
tags:
  - developer-guide
  - sdk
  - python
---

To send a Signal-With-Start in Python, use the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) method and pass the `start_signal` argument with the name of your Signal, instead of using a traditional Workflow start.

```python
async def main():
    client = await Client.connect("localhost:7233", namespace="your-namespace")

    handle = await client.start_workflow(
        "your-workflow-name",
        "some arg",
        id="your-workflow-id",
        task_queue="your-task-queue",
        start_signal="your-signal-name",
    )
```
