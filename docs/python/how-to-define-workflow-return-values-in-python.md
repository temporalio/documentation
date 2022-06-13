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

To return the results of a Workflow, set your Workflow to a variable, like `handle`, then return the results with [`result()`](https://python.temporal.io/temporalio.client.WorkflowHandle.html#result).

```python
async def main():
    # Create client connected to server at the given address and namespace
    client = await Client.connect("http://localhost:7233", namespace="your-namespace")

    # Start a workflow
    handle = await client.start_workflow(
        MyWorkflow.run,
        "your argument",
        id="your-workflow-id",
        task_queue="your-task-queue",
    )

    # Wait for result
    result = await handle.result()
    print(f"Result: {result}")
```
