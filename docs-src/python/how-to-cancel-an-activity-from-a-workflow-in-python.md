---
id: how-to-cancel-an-activity-from-a-workflow-in-python
title: How to Cancel an Activity from a Workflow in Python
sidebar_label: Cancel an Activity from a Workflow
description: To cancel an Activity from a Workflow in Python, use the `cancel()` on the Task.
tags:
  - developer-guide
  - sdk
  - python
---

To cancel an Activity from a Workflow Execution, call the [cancel()](https://docs.python.org/3/library/asyncio-task.html#asyncio.Task.cancel) method on the Activity handle that is returned from [start_activity()](https://python.temporal.io/temporalio.workflow.html#start_activity).

```python
@activity.defn
async def cancel_activity(input: ComposeArgsInput) -> NoReturn:
    try:
        while True:
            print("Heartbeating cancel activity")
            await asyncio.sleep(10)
            activity.heartbeat("some details")
    except asyncio.CancelledError:
        print("Activity cancelled")
        raise


@activity.defn
async def run_activity(input: ComposeArgsInput):
    print("Executing activity")
    return input.arg1 + input.arg2

@workflow.defn
 class GreetingWorkflow:
     @workflow.run
     async def run(self, input: ComposeArgsInput):
         try:
             activity_handle = workflow.execute_activity(
                 cancel_activity,
                 ComposeArgsInput(input.arg1, input.arg2),
                 start_to_close_timeout=timedelta(seconds=10),
                 heartbeat_timeout=timedelta(seconds=1),
             )

             task = asyncio.create_task(activity_handle)
             await asyncio.sleep(3)
             return task.cancel()
         finally:
             await asyncio.sleep(3)
             activity_handle = workflow.execute_activity(
                 run_activity,
                 ComposeArgsInput(input.arg1, input.arg2),
                 start_to_close_timeout=timedelta(seconds=10),
             )
             return await activity_handle
```

:::note

The Activity handle is a Python task, by calling `cancel()`, you're essentially requesting the task to be cancelled.

:::
