---
id: how-to-set-a-start-to-close-timeout-in-python
title: How to set a start to close timeout in Python
sidebar_label: Set a start to close timeout
description: Set a start to close timeout
tags:
  - developer-guide
  - sdk
  - python
---

Activity options are set as keyword arguments after the Activity arguments. At least one of `start_to_close_timeout` or `schedule_to_close_timeout` must be provided.

```python
start_to_close_timeout = timedelta(seconds=5)
```

The following code example executes an Activity with a `start_to_close_timeout` of 5 seconds.

```python
@workflow.defn
class YourWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            your_activity, name, start_to_close_timeout=timedelta(seconds=5)
        )
```
