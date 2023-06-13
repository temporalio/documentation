---
id: how-to-set-activity-timeouts-in-python
title: How to set Activity Timeouts in Python
sidebar_label: Set Activity Timeouts
description: Set Activity Timeouts
tags:
  - developer-guide
  - sdk
  - python
---

Activity options are set as keyword arguments after the Activity arguments.

Available timeouts are:

- schedule_to_close_timeout
- schedule_to_start_timeout
- start_to_close_timeout

```python
@workflow.defn
class YourWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            your_activity,
            name,
            schedule_to_close_timeout=timedelta(seconds=5),
            # schedule_to_start_timeout=timedelta(seconds=5),
            # start_to_close_timeout=timedelta(seconds=5),
        )
```
