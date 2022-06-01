---
id: how-to-spawn-a-workflow-execution-in-python
title: How to spawn a workflow execution in Python
sidebar_label: Spawn a Workflow Execution
description: Spawn a Workflow Execution
tags:
  - developer-guide
  - sdk
  - python
---

The following code example, connects to a server, starts a Workflow and waits for the Workflow to finish, and returns the Workflow handler of the existing Workflow.

```python
from temporalio.client import Client


async def main():
    # Create Client connected to server at the given address and namespace
    client = await Client.connect("http://localhost:7233", namespace="my-namespace")

    # Start a Workflow
    handle = await client.start_workflow(
        "my workflow name", "some arg", id="my-workflow-id", task_queue="my-task-queue"
    )

    # Wait for Result
    result = await handle.result()
    print(f"Result: {result}")
```
