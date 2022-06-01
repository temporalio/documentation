---
id: how-to-create-a-worker-session-in-python
title: How to create a worker session in Python
sidebar_label: Create a worker session
description: Create a Worker Session.
tags:
  - developer-guide
  - sdk
  - python
---

Create a Worker to process Workflows and Activities.
To create a Worker session, connect a Client to the Temporal server, then add your Worker. In this example, the Worker runs until the event is set.

```python
import asyncio
from temporalio.client import Client
from temporalio.worker import Worker
from temporalio import activity


@activity.defn
async def say_hello_activity(name: str) -> str:
    return f"Hello, {name}!"


async def main(stop_event: asyncio.Event):
    client = await Client.connect("http://localhost:7233")

    worker = Worker(client, task_queue="my-task-queue", activities=[say_hello_activity])
    async with worker:
        await stop_event.wait()
```

Workers can `run()` or `shutdown()` until the `stop_event` is set.

- The following example runs the Worker and waits on it to shut down.

```python
async with worker:
    await stop_event.run()
```

- The following example shuts down the Worker and waits until all Activities have completed.

```python
async with worker:
    await stop_event.shutdown()
```
