---
id: how-to-start-delay
title: How to use Start Delay
sidebar_label: Start Delay
description: Set the `start_delay` option in your Workflow Options.
---

Use the `start_delay` to schedule a Workflow Execution at a specific one-time future point rather than on a recurring schedule.

Use the `start_delay` option in either the [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) asynchronous methods in the Client.

```python
@workflow.defn
class YourWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            your_activity,
            YourParams("Hello", name),
            start_to_close_timeout=timedelta(seconds=10),
            start_delay=timedelta(hours=1, minutes=20, seconds=30)
        )
```
