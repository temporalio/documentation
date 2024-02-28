---
id: how-to-start-delay
title: How to use Start Delay
sidebar_label: Start Delay
description: Set the `start_delay` option in your Workflow Options.
---

Use the `start_delay` to schedule a Workflow Execution at a specific one-time future point rather than on a recurring schedule.

Use the `start_delay` option in either the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) asynchronous methods in the Client.

```python
async def main():
    client = await Client.connect("localhost:7233")

    result = await client.execute_workflow(
        YourWorkflow.run,
        "your name",
        id="your-workflow-id",
        task_queue="your-task-queue",
        start_delay=timedelta(hours=1, minutes=20, seconds=30)
    )

    print(f"Result: {result}")


if __name__ == "__main__":
    asyncio.run(main())
```
