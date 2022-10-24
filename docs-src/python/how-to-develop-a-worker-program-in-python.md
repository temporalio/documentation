---
id: how-to-develop-a-worker-program-in-python
title: How to develop a Worker Program in Python
sidebar_label: Worker Program
description: Create a new instance of a Worker.
tags:
  - developer-guide
  - python
  - workers
---

To develop a Worker, use the [`Worker()`](https://python.temporal.io/temporalio.worker.Worker.html#__init__) constructor and add your Client, Task Queue, Workflows, and Activities as arguments.

The following code example creates a Worker that polls for tasks from the Task Queue and executes the Workflow.

```python
worker = Worker(
    client,
    task_queue="your-task-queue",
    workflows=[YourWorkflow],
    activities=[your_activity],
)
```

The following code example shows a Worker hosting Workflows and Activities.

```python
async def run_worker(stop_event: asyncio.Event):
    # Create Client connected to server at the given address
    client = await Client.connect("127.0.0.1:7233", namespace="your-custom-namespace")

    # Run the worker until the event is set
    worker = Worker(
        client,
        task_queue="your-task-queue",
        workflows=[YourWorkflow],
        activities=[your_activity],
    )
    async with worker:
        await stop_event.wait()
```

The `asyncio.Event` that will be set when the Worker should stop.
Although this example accepts a stop event and uses `async with`, you can also use [`run()`](https://python.temporal.io/temporalio.worker.Worker.html#run) and [`shutdown()`](https://python.temporal.io/temporalio.worker.Worker.html#shutdown).
The `shutdown()` operation waits on all Activities to complete, so if a long-running Activity does not at least respect cancellation, the shutdown might never complete.
