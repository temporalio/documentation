import asyncio

from temporalio.client import Client
from wf_signal_dacx import GreetingWorkflow

"""dacx
To send a Signal-With-Start in Python, use the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) method and pass the `start_signal` argument with the name of your Signal.
dacx"""


async def main():
    client = await Client.connect("localhost:7233")
    await client.start_workflow(
        GreetingWorkflow.run,
        id="your-signal-with-start-workflow",
        task_queue="signal-tq",
        start_signal="submit_greeting",
        start_signal_args=["User Signal with Start"],
    )
    handle = client.get_workflow_handle_for(
        GreetingWorkflow, "your-signal-with-start-workflow"
    )
    await handle.signal(GreetingWorkflow.exit)
    result = await handle.result()
    print(result)


if __name__ == "__main__":
    asyncio.run(main())

""" @dacx
id: how-to-send-a-signal-with-start-in-python
title: How to send a Signal-With-Start in Python
label: Signal-With-Start
description: To Signal-With-Start use the `start_workflow()` method and pass the `start_signal` argument with the name of your Signal.
tags:
 - signal
 - signal with start
 - python sdk
 - code sample
lines: 3, 6-8, 11-19
@dacx """
