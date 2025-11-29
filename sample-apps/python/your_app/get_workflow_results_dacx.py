import asyncio

from temporalio.client import Client

"""dacx
Use [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`get_workflow_handle()`](https://python.temporal.io/temporalio.client.Client.html#get_workflow_handle) to return a Workflow handle.
Then use the [`result`](https://python.temporal.io/temporalio.client.WorkflowHandle.html#result) method to await on the result of the Workflow.

To get a handle for an existing Workflow by its Id, you can use [`get_workflow_handle()`](https://python.temporal.io/temporalio.client.Client.html#get_workflow_handle), or use [`get_workflow_handle_for()`](https://python.temporal.io/temporalio.client.Client.html#get_workflow_handle_for) for type safety.

Then use [`describe()`](https://python.temporal.io/temporalio.client.workflowhandle#describe) to get the current status of the Workflow.
If the Workflow does not exist, this call fails.
dacx"""


async def main():
    client = await Client.connect("localhost:7233")

    handle = client.get_workflow_handle(
        workflow_id="your-workflow-id",
    )
    results = await handle.result()
    print(f"Result: {results}")


if __name__ == "__main__":
    asyncio.run(main())


""" @dacx
id: how-to-get-the-result-of-a-workflow-execution-in-python
title: How to get the result of a Workflow Execution in Python
label: Workflow Execution result
description: Workflow Execution result.
tags:
 - workflow execution
 - python sdk
 - code sample
lines: 5-13, 16-27
@dacx """
