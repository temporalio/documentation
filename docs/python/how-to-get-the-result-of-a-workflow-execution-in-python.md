---
id: how-to-get-the-result-of-a-workflow-execution-in-python
title: How to get the result of a Workflow Execution in python
sidebar_label: Workflow Execution result
description: Workflow Execution result
tags:
  - developer-guide
  - python
---

To return the result of a Workflow Execution, you can print the results from a `start_workflow` or `execute_workflow` method from the Client.

The following is a working example of returning the results of `execute_workflow` async method.

**Implementing a Workflow**
Create the following script at `run_worker.py`.

```python
import asyncio
from datetime import datetime, timedelta
from temporalio import workflow, activity
from temporalio.client import Client
from temporalio.worker import Worker


@activity.defn
async def say_hello(name: str) -> str:
    return f"Hello, {name}!"


@workflow.defn
class SayHello:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            say_hello, name, schedule_to_close_timeout=timedelta(seconds=5)
        )


async def main():
    # Create client connected to server at the given address
    client = await Client.connect("http://localhost:7233")

    # Run the worker
    worker = Worker(
        client,
        task_queue="your-task-queue",
        workflows=[SayHello],
        activities=[say_hello],
    )
    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
```

**Running a Workflow**
Create the following script at `run_workflow.py`.

This will create a Client connected to the server at the given address, executes the Workflow `SayHello.run` with the input `my name`, the Workflow Id as `my-workflow-id`, and the Task Queue set to `my-task-queue`.

```python
async def main():
    # Create client connected to server at the given address
    client = await Client.connect("http://localhost:7233")

    # Execute a workflow

    result = await client.execute_workflow(
        SayHello.run, "my name", id="your-workflow-id", task_queue="your-task-queue"
    )

    # It's printing the result of the workflow.
    print(f"Result: {result}")
```

The `execute_workflow()` registers a Workflow. The Workflow exists until the Workflow is explicitly terminated.
Assuming you have a Temporal server running on 7233, this will run the Worker:

```bash
python run_worker.py
```

The output will return the result of the Workflow:

```text
Result: Hello, my-name!
```

You can use [`Client.get_workflow_handle()`](https://python.temporal.io/temporalio.client.client#get_workflow_handle), or [`Client.get_workflow_handle_for()`](https://python.temporal.io/temporalio.client.client#get_workflow_handle_for) for type safety, to get a handle for an existing Workflow by its Id.

Then use [`WorkflowHandle.describe()`](https://python.temporal.io/temporalio.client.workflowhandle#describe) to get the current status of the Workflow. This will fail if the Workflow does not exist.
