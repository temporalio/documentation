import asyncio

from temporalio.client import Client

"""dacx
To trigger a Scheduled Workflow Execution in Python, use the [trigger()](https://python.temporal.io/temporalio.client.ScheduleHandle.html#trigger) asynchronous method on the Schedule Handle.
dacx"""


async def main():
    client = await Client.connect("localhost:7233")
    handle = client.get_schedule_handle(
        "workflow-schedule-id",
    )

    await handle.trigger()


if __name__ == "__main__":
    asyncio.run(main())

""" @dacx
id: how-to-trigger-a-scheduled-workflow-execution-in-python
title: How to Trigger a Scheduled Workflow Execution in Python
label: Trigger a Scheduled Workflow Execution
description: Trigger a Scheduled Workflow Execution in the Python SDK.
tags:
 - scheduled workflow execution
 - schedules
 - python sdk
 - code sample
lines: 5-7, 10-16
@dacx """
