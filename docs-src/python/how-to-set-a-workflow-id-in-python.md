---
id: how-to-set-a-workflow-id-in-python
title: How to set a Workflow Id in Python
sidebar_label: Set a Workflow Id
description: Set a Workflow Id
---

To set a Workflow Id in Python, specify the `id` argument when executing a Workflow with either [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) methods.

The `id` argument should be a unique identifier for the Workflow Execution.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_app/run_workflow_dacx.py">View source code</a>

```python
# ...
async def main():
    client = await Client.connect("localhost:7233")

    result = await client.execute_workflow(
        YourWorkflow.run,
        "your name",
        id="your-workflow-id",
        task_queue="your-task-queue",
    )

    print(f"Result: {result}")


if __name__ == "__main__":
    asyncio.run(main())
```
