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

Schedule a Workflow to run at a specific time from the Client.

```python
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
```
