---
id: how-to-set-a-workflow-task-queue-in-python
title: How to set the Task Queue for Workflow Execution in Python
sidebar_label: Set the Task Queue for Workflow Execution
description: Task Queue
---

To set a Task Queue in Python, specify the `task_queue` argument when executing a Workflow with either [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) methods.

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
