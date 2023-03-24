---
id: how-to-develop-a-worker-program-in-python
title: How to develop a Worker Program in Python
sidebar_label: Worker Program
description: Create a new instance of a Worker.
---

To develop a Worker, use the Worker() constructor and add your Client, Task Queue, Workflows, and Activities as arguments.

The following code example creates a Worker that polls for tasks from the Task Queue and executes the Workflow.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/dacx-poc/your_app/run_worker_dacx.py">View source code</a>

```py
from temporalio.client import Client
from temporalio.worker import Worker
// ...
// ...
async def main():
    client = await Client.connect("localhost:7233")
    worker = Worker(
        client,
        task_queue="my-task-queue",
        workflows=[YourWorkflow],
        activities=[your_activity],
    )
    await worker.run()
```
