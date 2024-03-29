---
id: how-to-connect-to-a-cluster-in-python
title: How to connect to a Temporal Cluster in Python
sidebar_label: Connect a Temporal Client
description: Connect a Temporal Client to a Cluster in the Python SDK.
tags:
- temporal client
- cluster
- python sdk
- code sample
---

<!-- DO NOT EDIT THIS FILE DIRECTLY.
THIS FILE IS GENERATED from https://github.com/temporalio/documentation/blob/main/sample-apps/python/your_app/run_workflow_dacx.py. -->

Use the `connect()` method on the Client class to create and connect to a Temporal Client to the Temporal Cluster.

<div class="copycode-notice-container"><a href="https://github.com/temporalio/documentation/blob/main/sample-apps/python/your_app/run_workflow_dacx.py">View the source code</a> in the context of the rest of the application code.</div>

```python
# ...
async def main():
    client = await Client.connect("localhost:7233")

    result = await client.execute_workflow(
        YourWorkflow.run,
        "your name",
        id="your-workflow-id",
        task_queue="your-task-queue",
    )

    print(f"Result: {result}")


if __name__ == "__main__":
    asyncio.run(main())
```
