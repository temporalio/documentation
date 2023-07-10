---
id: how-to-send-a-signal-with-start-in-python
title: How to send a Signal-With-Start in Python
sidebar_label: Signal-With-Start
description: To Signal-With-Start use the `start_workflow()` method and pass the `start_signal` argument with the name of your Signal.
---

To send a Signal-With-Start in Python, use the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) method and pass the `start_signal` argument with the name of your Signal.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/signal_your_workflow/signal_with_start_dacx.py">View source code</a>

```python
from temporalio.client import Client
# ...
# ...
async def main():
    client = await Client.connect("localhost:7233")
    await client.start_workflow(
        GreetingWorkflow.run,
        id="your-signal-with-start-workflow",
        task_queue="signal-tq",
        start_signal="submit_greeting",
        start_signal_args=["User Signal with Start"],
    )
```
