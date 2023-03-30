---
id: how-to-backfill-a-scheduled-workflow-execution-in-python
title: How to backfill a Scheduled Workflow Execution in Python
sidebar_label: Backfill a Scheduled Workflow Execution
description: Use the `backfill()` asynchronous method on the Schedule Handler.
---

To Backfill a Scheduled Workflow Execution in Python, use the [backfill()](https://python.temporal.io/temporalio.client.ScheduleHandle.html#backfill) asynchronous
method on the Schedule Handle.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/schedule_your_workflow/backfill_schedule_dacx.py">View source code</a>

```python

// ...
async def main():
    client = await Client.connect("localhost:7233")
    handle = client.get_schedule_handle(
        "workflow-schedule-id",
    )
    now = datetime.utcnow()
    await handle.backfill(
        ScheduleBackfill(
            start_at=now - timedelta(minutes=10),
            end_at=now - timedelta(minutes=9),
            overlap=ScheduleOverlapPolicy.ALLOW_ALL,
        ),
    ),
```

