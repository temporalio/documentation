---
id: how-to-trigger-a-scheduled-workflow-execution-in-python
title: How to Trigger a Scheduled Workflow Execution in Python
sidebar_label: Trigger a Scheduled Workflow Execution
description: Trigger a Scheduled Workflow Execution in the Python SDK.
---

To trigger a Scheduled Workflow Execution in Python, use the [trigger()](https://python.temporal.io/temporalio.client.ScheduleHandle.html#trigger) asynchronous method on the Schedule Handle.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/schedule_your_workflow/trigger_schedule_dacx.py">View source code</a>

```py
// ...
async def main():
    client = await Client.connect("localhost:7233")
    handle = client.get_schedule_handle(
        "workflow-schedule-id",
    )

    await handle.trigger()
```
