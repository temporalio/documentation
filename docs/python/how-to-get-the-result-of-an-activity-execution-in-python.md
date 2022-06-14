---
id: how-to-get-the-result-of-an-activity-execution-in-python
title: How to get the result of an Activity Execution in Python
sidebar_label: Get the result of an Activity Execution
description: Get the result of an Activity Execution
tags:
  - developer-guide
  - sdk
  - python
---

Use [`start_activity()`](https://python.temporal.io/temporalio.workflow.html#start_activity) or [`execute_activity`](https://python.temporal.io/temporalio.workflow.html#execute_activity) to start an Activity and return its handle, [`ActivityHandle`](https://python.temporal.io/temporalio.workflow.activityhandle).

You must provide either `schedule_to_close_timeout` or `start_to_close_timeout`.

`execute_activity` is a shortcut for `await start_activity()`. An async `workflow.execute_activity()` helper is provided which takes the same arguments as `workflow.start_activity()` and `await`s on the result. This should be used in most cases unless advanced task capabilities are needed.

```python
@workflow.defn
class SimpleActivityWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            say_hello, name, schedule_to_close_timeout=timedelta(seconds=5)
        )
```
