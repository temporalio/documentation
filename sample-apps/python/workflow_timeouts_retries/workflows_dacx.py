import asyncio
from datetime import timedelta
from temporalio.client import Client
from your_workflows import YourWorkflow
from temporalio.common import RetryPolicy

"""dacx
Set the timeout to either the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) asynchronous methods.

Available timeouts are:

- `execution_timeout`
- `run_timeout`
- `task_timeout`
dacx"""

"""dacx
Set the Retry Policy to either the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) asynchronous methods.
dacx"""


async def main():
    client = await Client.connect("localhost:7233")

    result = await client.execute_workflow(
        YourWorkflow.run,
        "your timeout argument",
        id="your-workflow-id",
        task_queue="your-task-queue",
        # Set Workflow Timeout duration
        execution_timeout=timedelta(seconds=2),
        # run_timeout=timedelta(seconds=2),
        # task_timeout=timedelta(seconds=2),
    )
    handle = await client.execute_workflow(
        YourWorkflow.run,
        "your retry policy argument",
        id="your-workflow-id",
        task_queue="your-task-queue",
        retry_policy=RetryPolicy(maximum_interval=timedelta(seconds=2)),
    )

    print(f"Result: {result}")
    print(f"Handle: {handle}")


if __name__ == "__main__":
    asyncio.run(main())


""" @dacx
id: how-to-set-workflow-timeouts-in-python
title: How to set Workflow Timeouts in Python
label: Workflow Timeouts
description: Set the timeout to either start_workflow() or execute_workflow().
tags:
 - timeout
 - python sdk
 - code sample
lines: 7-15, 25-34
@dacx """

""" @dacx
id: how-to-set-workflow-retry-options-in-python
title: How to set Workflow Retry Options in Python
label: Workflow Retry Options
description: Set the Retry Policy to either start_workflow() or execute_workflow().
tags:
 - retry policy
 - python sdk
 - code sample
lines: 17-19, 35-41
@dacx """
