import asyncio

from temporalio.client import Client

from workflow_dacx import GreetingWorkflow

"""dacx
To set custom Search Attributes, use the `search_attributes` parameter of the ['start_workflow()'](https://python.temporal.io/temporalio.client.Client.html#start_workflow) method.
dacx"""

"""dacx
Use the [list_workflows()](https://python.temporal.io/temporalio.client.Client.html#list_workflows) method on the Client handle and pass a [List Filter](/concepts/what-is-a-list-filter) as an argument to filter the listed Workflows.
dacx"""


async def main():
    client = await Client.connect("localhost:7233")
    handle = await client.start_workflow(
        GreetingWorkflow.run,
        id="search-attributes-workflow-id",
        task_queue="search-attributes-task-queue",
        search_attributes={"CustomKeywordField": ["old-value"]},
    )

    print(
        "First search attribute values: ",
        (await handle.describe()).search_attributes.get("CustomKeywordField"),
    )
    await asyncio.sleep(3)
    print(
        "Second search attribute values: ",
        (await handle.describe()).search_attributes.get("CustomKeywordField"),
    )
    await asyncio.sleep(3)
    print(
        "Empty search attribute values: ",
        (await handle.describe()).search_attributes.get("CustomKeywordField"),
    )

    async for workflow in client.list_workflows('WorkflowType="GreetingWorkflow"'):
        print(f"Workflow: {workflow.id}")


if __name__ == "__main__":
    asyncio.run(main())

""" @dacx
id: how-to-list-workflow-executions-using-the-client-in-python
title: How to list Workflows in Python
label: List Workflows
description: To list Workflows from the Client, use the [list_workflows()](https://python.temporal.io/temporalio.client.Client.html#list_workflows) method on the Client handle and pass a [List Filter](/concepts/what-is-a-list-filter) as an argument to filter the listed Workflows.
tags:
 - workflow
 - client
 - python sdk
 - code sample
lines: 11-13, 40-41
@dacx """


""" @dacx
id: how-to-add-custom-search-attributes-to-workflow-executions-at-start-time-in-python
title: How to set custom Search Attributes in Python
label: Set custom Search Attributes
description: To set custom Search Attributes, use the `search_attributes` parameter of 'start_workflow()'.
tags:
 - search attribute
 - python sdk
 - code sample
lines: 7-9, 18-23
@dacx """
