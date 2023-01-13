---
id: how-to-test-cancel-an-activity-in-python
title: How to test Cancel in an Activity in Python
sidebar_label: test Cancel in an Activity
description: Use the `cancel()` method to the running Workflow.
tags:
  - developer-guide
  - python
  - cancel
  - testing
---

To cancel an Activity in Temporal, you can use the [`WorkflowHandle.cancel()`](https://python.temporal.io/temporalio.client.WorkflowHandle.html#cancel) method, which will send a cancellation request to the running Workflow.

```python
import asyncio
import uuid
from temporalio.client import Client
from temporalio.worker import Worker

# Import your Workflow definition
from hello.hello_cancellation import CancellationWorkflow

async def test_cancel_workflow(client: Client):
    task_queue_name = str(uuid.uuid4())
    async with Worker(
        client,
        task_queue=task_queue_name,
        workflows=[CancellationWorkflow],
    ):
        # Start your Workflow 
        handle = await client.start_workflow(
            CancellationWorkflow.run,
            id=(str(uuid.uuid4())),
            task_queue=task_queue_name,
        )

        # Wait for the Activity to start
        await asyncio.sleep(5)

        # Cancel the workflow
        await handle.cancel()

        # Assert that the workflow has been canceled
        assert "CANCELED" == (await handle.describe()).status
```

The async `cancel()` method sends a cancellation request to the running Workflow. If the Workflow is running an Activity that listens to cancellation, it will terminate the Activity.
