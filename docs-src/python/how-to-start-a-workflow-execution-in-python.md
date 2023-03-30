---
id: how-to-start-a-workflow-execution-in-python
title: How to start a Workflow Execution in Python
sidebar_label: Start a Workflow Execution
description: Start a Workflow Execution in the Python SDK.
---

To start a Workflow Execution in Python, use either the start_workflow() or execute_workflow() asynchronous methods in the Client.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_app/run_workflow_dacx.py">View source code</a>

```python

// ...
async def main():
    client = await Client.connect("localhost:7233")

    result = await client.execute_workflow(
        YourWorkflow.run,
        "your name",
        id="your-workflow-id",
```

