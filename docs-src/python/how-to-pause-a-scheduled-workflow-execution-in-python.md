---
id: how-to-pause-a-scheduled-workflow-execution-in-python
title: How to Pause Scheduled Workflow Execution in Python
sidebar_label: Pause a Scheduled Workflow Execution
description: Use the `pause()` asynchronous method on the Schedule Handle.
---

To pause a Scheduled Workflow Execution in Python, use the [pause()](https://python.temporal.io/temporalio.client.ScheduleHandle.html#pause) asynchronous method on the Schedule Handle.
You can pass a `note` to the `pause()` method to provide a reason for pausing the schedule.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/schedule_your_workflow/pause_schedule_dacx.py">View source code</a>

```python
// ...
async def main():
    client = await Client.connect("localhost:7233")
    handle = client.get_schedule_handle(
        "workflow-schedule-id",
    )

    await handle.pause(note="Pausing the schedule for now")
```
