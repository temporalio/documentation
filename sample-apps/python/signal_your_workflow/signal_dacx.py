import asyncio

from temporalio.client import Client
from wf_signal_dacx import GreetingWorkflow

"""dacx
Workflows listen for Signals by the Signal's name.

To send a Signal to the Workflow, use the [signal](https://python.temporal.io/temporalio.client.WorkflowHandle.html#signal) method from the [WorkflowHandle](https://python.temporal.io/temporalio.client.WorkflowHandle.html) class.
dacx"""

"""dacx
To send a Signal from the Client, use the [signal()](https://python.temporal.io/temporalio.client.WorkflowHandle.html#signal) function on the Workflow handle.

To get the Workflow handle, you can use any of the following options.

- Use the [get_workflow_handle()](https://python.temporal.io/temporalio.client.Client.html#get_workflow_handle) method.
- Use the [get_workflow_handle_for()](https://python.temporal.io/temporalio.client.Client.html#get_workflow_handle_for) method to get a type-safe Workflow handle by its Workflow Id.
- Use the [start_workflow()](https://python.temporal.io/temporalio.client.Client.html#start_workflow) to start a Workflow and return its handle.
dacx"""


async def main():
    client = await Client.connect("localhost:7233")
    handle = await client.start_workflow(
        GreetingWorkflow.run,
        id="your-greeting-workflow",
        task_queue="signal-tq",
    )
    await handle.signal(GreetingWorkflow.submit_greeting, "User 1")
    await handle.signal(GreetingWorkflow.submit_greeting, "User 2")
    await handle.signal(GreetingWorkflow.submit_greeting, "User 3")
    await handle.signal("Custom Signal Name", "User 4")
    await handle.signal(GreetingWorkflow.exit)
    result = await handle.result()
    print(result)


if __name__ == "__main__":
    asyncio.run(main())


""" @dacx
id: how-to-handle-a-signal-in-a-workflow-in-python
title: How to handle a Signal in Python
label: Handle a Signal
description: Set the Signal on the Workflow Handle.
tags:
 - signal
 - workflow
lines: 3, 6-10, 30
@dacx """


""" @dacx
id: how-to-send-a-signal-from-a-client-in-python
title: How to send a Signal from a Client in Python
label: Send a Signal from a Client
description: To send a Signal to a Workflow Execution from Client code, use the signal() method on the Workflow handle.
tags:
 - signal
 - workflow
 - client
 - python sdk
 - code sample
lines: 3, 12-20, 24-30
@dacx """
