import asyncio

from temporalio.client import Client
from wf_query_dacx import GreetingWorkflow

"""dacx
To send a Query to the Workflow, use the [`query`](https://python.temporal.io/temporalio.client.WorkflowHandle.html#query) method from the [`WorkflowHandle`](https://python.temporal.io/temporalio.client.WorkflowHandle.html) class.
dacx"""

"""dacx
To send a Query to a Workflow Execution from Client code, use the `query()` method on the Workflow handle.
dacx"""


async def main():
    client = await Client.connect("localhost:7233")
    handle = await client.start_workflow(
        GreetingWorkflow.run,
        "World",
        id="hello-query-workflow-id",
        task_queue="query-tq",
    )

    result = await handle.query(GreetingWorkflow.greeting)

    print(f"First greeting result: {result}")
    result = await handle.query("Custom Query Name")
    print(f"Custom query result: {result}")

    await asyncio.sleep(3)
    result = await handle.query(GreetingWorkflow.greeting)
    print(f"Second greeting result: {result}")


if __name__ == "__main__":
    asyncio.run(main())


""" @dacx
id: how-to-handle-a-query-in-a-workflow-in-python
title: How to handle a Query in a Workflow
label: Handle a Query in a Workflow
description: To send a Query to a Workflow, use the `query` method from the `WorkflowHandle` class.
tags:
 - query
 - workflow
 - python sdk
 - code sample
lines: 6-9, 24
@dacx """

""" @dacx
id: how-to-send-a-query-to-a-workflow-execution-in-python
title: How to send a Query to a Workflow Execution in Python
label: Sending Queries
description: Use the `query` method to send a Query.
lines: 10-12, 24
@dacx """
