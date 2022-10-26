---
id: how-to-spawn-a-workflow-execution-in-python
title: How to spawn a Workflow Execution in Python
sidebar_label: Spawn a Workflow Execution
description: Spawn a Workflow Execution
tags:
  - developer-guide
  - sdk
  - python
---

To start a Workflow Execution in python, use either the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) asynchronous methods in the Client.

The following code example starts a Workflow and returns its handle.

```python
async def main():
    client = await Client.connect("127.0.0.1:7233", namespace="your-custom-namespace")

    handle = await client.start_workflow(
        "your-workflow-name",
        "some arg",
        id="your-workflow-id",
        task_queue="your-task-queue",
    )
```

The following code example starts a Workflow and waits for completion.

```python
async def main():
    client = await Client.connect("127.0.0.1:7233", namespace="your-custom-namespace")

    handle = await client.execute_workflow(
        "your-workflow-name",
        "some arg",
        id="your-workflow-id",
        task_queue="your-task-queue",
    )
```
