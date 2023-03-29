---
id: how-to-delete-a-scheduled-workflow-execution-in-python
title: How to delete a Scheduled Workflow Execution in Python
sidebar_label: Delete a Scheduled Workflow Execution
description: Use the `delete()` asynchronous method on the Schedule Handler.
---

To delete a Scheduled Workflow Execution in Python, use the [delete()](https://python.temporal.io/temporalio.client.ScheduleHandle.html#delete) asynchronous method on the Schedule Handle.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/schedule_your_workflow/delete_schedule_dacx.py">View source code</a>

```py
async def main():
    client = await Client.connect("localhost:7233")
    handle = client.get_schedule_handle(
        "workflow-schedule-id",
    )

    await handle.delete()
```
