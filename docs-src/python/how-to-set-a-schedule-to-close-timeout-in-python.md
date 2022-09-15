---
id: how-to-set-a-schedule-to-close-timeout-in-python
title: How to set a schedule to close timeout in Python
sidebar_label: Set a schedule to close timeout
description: Set a schedule to close timeout
tags:
  - developer-guide
  - sdk
  - python
---

Activity options are set as keyword arguments after the Activity arguments. At least one of `start_to_close_timeout` or `schedule_to_close_timeout` must be provided.

The following code example sets a Schedule-to-Close timeout in Python, by calling the Activity with the argument `name` and setting the `schedule_to_close_timeout` to 5 seconds.

```python
@workflow.defn
class YourWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            your_activity, name, schedule_to_close_timeout=timedelta(seconds=5)
        )
```
