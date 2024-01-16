import asyncio

from temporalio.client import Client
from temporalio.worker import Worker
from your_activities_dacx import your_activity
from your_workflows_dacx import YourWorkflow

"""dacx
To develop a Worker, use the `Worker()` constructor and add your Client, Task Queue, Workflows, and Activities as arguments.
The following code example creates a Worker that polls for tasks from the Task Queue and executes the Workflow.
When a Worker is created, it accepts a list of Workflows in the workflows parameter, a list of Activities in the activities parameter, or both.
dacx"""

"""dacx
When a `Worker` is created, it accepts a list of Workflows in the `workflows` parameter, a list of Activities in the `activities` parameter, or both.
dacx"""


async def main():
    client = await Client.connect("localhost:7233")
    worker = Worker(
        client,
        task_queue="your-task-queue",
        workflows=[YourWorkflow],
        activities=[your_activity],
    )
    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())


""" @dacx
id: how-to-develop-a-worker-program-in-python
title: How to develop a Worker Program in Python
label: Worker Program
description: Create a new instance of a Worker.
tags:
 - worker
 - python sdk
 - code sample
lines: 3-4, 8-12, 19-31
@dacx """

""" @dacx
id: how-to-register-types-with-a-worker-in-python
title: How to register types with a Worker in Python
label: Register types with a Worker
description: Register types with a Worker.
tags:
 - worker
 - python sdk
 - code sample
lines: 14-16, 19-31
@dacx """
