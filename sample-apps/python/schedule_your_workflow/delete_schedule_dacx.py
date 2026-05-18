import asyncio

from temporalio.client import Client

"""dacx
To delete a Scheduled Workflow Execution in Python, use the [delete()](https://python.temporal.io/temporalio.client.ScheduleHandle.html#delete) asynchronous method on the Schedule Handle.
dacx"""


async def main():
    client = await Client.connect("localhost:7233")
    handle = client.get_schedule_handle(
        "workflow-schedule-id",
    )

    await handle.delete()


if __name__ == "__main__":
    asyncio.run(main())

""" @dacx
id: how-to-delete-a-scheduled-workflow-execution-in-python
title: How to delete a Scheduled Workflow Execution in Python
label: Delete a Scheduled Workflow Execution
description: Use the `delete()` asynchronous method on the Schedule Handler.
tags:
 - scheduled workflow execution
 - schedules
 - python sdk
 - code sample
lines: 5-16
@dacx """
