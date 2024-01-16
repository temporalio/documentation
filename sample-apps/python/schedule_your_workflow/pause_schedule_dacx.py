import asyncio

from temporalio.client import Client

"""dacx
To pause a Scheduled Workflow Execution in Python, use the [pause()](https://python.temporal.io/temporalio.client.ScheduleHandle.html#pause) asynchronous method on the Schedule Handle.
You can pass a `note` to the `pause()` method to provide a reason for pausing the schedule.
dacx"""


async def main():
    client = await Client.connect("localhost:7233")
    handle = client.get_schedule_handle(
        "workflow-schedule-id",
    )

    await handle.pause(note="Pausing the schedule for now")


if __name__ == "__main__":
    asyncio.run(main())


""" @dacx
id: how-to-pause-a-scheduled-workflow-execution-in-python
title: How to Pause Scheduled Workflow Execution in Python
label: Pause a Scheduled Workflow Execution
description: Use the `pause()` asynchronous method on the Schedule Handle.
tags:
 - scheduled workflow execution
 - schedules
 - python sdk
 - code sample
lines: 5-8, 11-17
@dacx """
