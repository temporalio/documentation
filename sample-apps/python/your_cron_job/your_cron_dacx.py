import asyncio

from temporalio.client import Client

from your_workflow import CronWorkflow

"""dacx
You can set each Workflow to repeat on a schedule with the `cron_schedule` option from either the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) asynchronous methods.
dacx"""


async def main():
    client = await Client.connect("localhost:7233")

    result = await client.execute_workflow(
        CronWorkflow.run,
        id="your-workflow-id",
        task_queue="your-task-queue",
        cron_schedule="* * * * *",
    )
    print(f"Results: {result}")


if __name__ == "__main__":
    asyncio.run(main())


""" @dacx
id: how-to-set-a-cron-schedule-in-python
title: How to set a Cron Schedule in Python
label: Cron Schedule
description: You can set each Workflow to repeat on a schedule with the cron_schedule option from either the start_workflow() or execute_workflow() asynchronous methods.
tags:
 - schedule
 - cron
 - python sdk
 - code sample
lines: 7-9, 15-21
@dacx """
