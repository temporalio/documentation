---
id: how-to-schedule-a-workflow-execution-in-python
title: How to Schedule a Workflow Execution in Python
sidebar_label: Schedule a Workflow Execution
description: Schedule a Workflow Execution in the Python SDK.
---

To create a Scheduled Workflow Execution in Python, use the [create_schedule()](https://python.temporal.io/temporalio.client.Client.html#create_schedule)
asynchronous method on the Client.
Then pass the Schedule ID and the Schedule object to the method to create a Scheduled Workflow Execution.
Set the `action` parameter to `ScheduleActionStartWorkflow` to start a Workflow Execution.
Optionally, you can set the `spec` parameter to `ScheduleSpec` to specify the schedule or set the `intervals` parameter to `ScheduleIntervalSpec` to specify the interval.
Other options include: `cron_expressions`, `skip`, `start_at`, and `jitter`.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/schedule_your_workflow/start_schedule_dacx.py">View source code</a>

```python
# . . .
async def main():
    client = await Client.connect("localhost:7233")

    await client.create_schedule(
        "workflow-schedule-id",
        Schedule(
            action=ScheduleActionStartWorkflow(
                YourSchedulesWorkflow.run,
                "my schedule arg",
                id="schedules-workflow-id",
                task_queue="schedules-task-queue",
            ),
            spec=ScheduleSpec(
                intervals=[ScheduleIntervalSpec(every=timedelta(minutes=2))]
            ),
            state=ScheduleState(note="Here's a note on my Schedule."),
        ),
    )
```
