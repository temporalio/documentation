import asyncio

from temporalio.client import (
    Client,
    ScheduleActionStartWorkflow,
    ScheduleUpdate,
    ScheduleUpdateInput,
)

"""dacx
Create a function that takes `ScheduleUpdateInput` and returns `ScheduleUpdate`.
To update a Schedule, use a callback to build the update from the description.
The following example updates the Schedule to use a new argument.
dacx"""


async def main():
    client = await Client.connect("localhost:7233")
    handle = client.get_schedule_handle(
        "workflow-schedule-id",
    )

    async def update_schedule_simple(input: ScheduleUpdateInput) -> ScheduleUpdate:
        schedule_action = input.description.schedule.action

        if isinstance(schedule_action, ScheduleActionStartWorkflow):
            schedule_action.args = ["my new schedule arg"]
        return ScheduleUpdate(schedule=input.description.schedule)

    await handle.update(update_schedule_simple)


if __name__ == "__main__":
    asyncio.run(main())


""" @dacx
id: how-to-update-scheduled-workflow-execution-in-python
title: How to update a Scheduled Workflow Execution in Python
label: Update a Scheduled Workflow Execution
description: Create a function that takes `ScheduleUpdateInput` and returns `ScheduleUpdate`.
tags:
 - scheduled workflow execution
 - schedules
 - python sdk
 - code sample
lines: 10-14, 23-28
@dacx """
