import asyncio

from temporalio.client import Client

"""dacx
To describe a Scheduled Workflow Execution in Python, use the [describe()](https://python.temporal.io/temporalio.client.ScheduleHandle.html#delete) asynchronous method on the Schedule Handle.
You can get a complete list of the attributes of the Scheduled Workflow Execution from the [ScheduleDescription](https://python.temporal.io/temporalio.client.ScheduleDescription.html) class.
dacx"""


async def main():
    client = await Client.connect("localhost:7233")
    handle = client.get_schedule_handle(
        "workflow-schedule-id",
    )

    desc = await handle.describe()

    print(f"Returns the note: {desc.schedule.state.note}")


if __name__ == "__main__":
    asyncio.run(main())

""" @dacx
id: how-to-describe-a-scheduled-workflow-execution-in-python
title: How to describe a Scheduled Workflow Execution in Python
label: Describe a Scheduled Workflow Execution
description: Use the `describe()` asynchronous method on the Schedule Handler.
tags:
 - scheduled workflow execution
 - schedules
 - python sdk
 - code sample
lines: 5-8, 11-19
@dacx """
