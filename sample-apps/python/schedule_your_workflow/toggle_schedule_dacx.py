import asyncio

from temporalio.client import (
    Client,
    ScheduleUpdateInput,
)

"""dacx
Create a function that toggles a schedule's paused state.
This function checks if the schedule is paused and either pauses or unpauses it accordingly.
"""

async def main():
    client = await Client.connect("localhost:7233")
    handle = client.get_schedule_handle(
        "workflow-schedule-id",
    )
    schedule_description = await handle.describe()
    is_paused = schedule_description.schedule.state.paused
    if is_paused:
        await handle.unpause(note="Unpausing the schedule")
    else:
        await handle.pause(note="Pausing the schedule")

if __name__ == "__main__":
    asyncio.run(main())

""" @dacx
id: how-to-toggle-scheduled-workflow-execution-in-python
title: How to Toggle a Scheduled Workflow Execution in Python
label: Toggle a Scheduled Workflow Execution
description: Create a function that toggles a schedule's paused state.
             This function checks if the schedule is paused and either pauses or unpauses it accordingly.
tags:
 - scheduled workflow execution
 - schedules
 - python sdk
 - code sample
lines: 10-14, 23-28
@dacx """
