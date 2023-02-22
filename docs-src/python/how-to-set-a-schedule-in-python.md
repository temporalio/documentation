---
id: how-to-set-a-schedule-in-python
title: How to set a Schedule in Python
sidebar_label: Schedule
description: Set a Schedule in Python for scheduling Workflows to be run at specific times in the future.
tags:
  - python
  - developer-guide
  - how-to
---

Use the [create_schedule()](https://python.temporal.io/temporalio.client.Client.html#create_schedule) method available in the [Client](https://python.temporal.io/temporalio.client.Client.html) class to create a new Schedule for a Workflow Execution

Define the parameters of the Schedule, then call the `create_schedule()` method on the Client object and pass in the Workflow Id for the Workflow you want to schedule, as well as the Schedule object you created.

```python
# define the schedule parameters
spec=ScheduleSpec(
            calendars=[
                ScheduleCalendarSpec(
                    second=(ScheduleRange(1, step=1),),
                    minute=(ScheduleRange(2, 3),),
                    hour=(ScheduleRange(4, 5, 6),),
                    day_of_month=(ScheduleRange(7),),
                    month=(ScheduleRange(9),),
                    year=(ScheduleRange(2080),),
                )
            ],
            intervals=[
                ScheduleIntervalSpec(
                    every=timedelta(days=10),
                    offset=timedelta(days=2),
                )
            ],
            cron_expressions=["0 12 * * MON"],
            skip=[ScheduleCalendarSpec(year=(ScheduleRange(2050),))],
schedule_handle = await client.create_schedule(
    "workflow-schedule-id",
    spec,
    memo={"memo_key": "memo_value"},
    )
```
