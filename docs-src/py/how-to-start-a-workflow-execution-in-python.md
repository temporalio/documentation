---
id: how-to-start-a-workflow-execution-in-python
title: How to start a Workflow Execution in Python
sidebar_label: Start a Workflow Execution
description: Start a Workflow Execution in the Python SDK.
---

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/dacx-poc/your_app/run_workflow_dacx.py">View source code</a>

```py
async def main():
    client = await Client.connect("localhost:7233")

// ...
        YourWorkflow.run, "your name", id="my-workflow-id", task_queue="my-task-queue"
    )
```
