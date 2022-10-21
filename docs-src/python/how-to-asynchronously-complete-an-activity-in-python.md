---
id: how-to-asynchronously-complete-an-activity-in-python
title: How to asynchronously complete an Activity in Python
sidebar_label: Asynchronous Activity Completion
description: Enables the Activity Function to return without the Activity Execution completing.
tags:
  - how-to
  - python
---

To cancel an asynchronous Activity, call the [`cancel`](https://docs.python.org/3/library/asyncio-task.html#asyncio.Task.cancel) task object.

```python
async def main():
    # Create a "cancel_me" Task
    task = asyncio.create_task(cancel_me())

    # Wait for 1 second
    await asyncio.sleep(1)

    task.cancel()
```

:::note

An Activity must Heartbeat to receive cancellation.
`asyncio.CancelledError` will be raised.

:::
