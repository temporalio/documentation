---
id: how-to-get-the-result-of-an-activity-execution-in-python
title: How to get the result of an Activity Execution in Python
sidebar_label: Get the result of an Activity Execution
description: Get the result of an Activity Execution.
---

Use [`start_activity()`](https://python.temporal.io/temporalio.workflow.html#start_activity) to start an Activity and return its handle, [`ActivityHandle`](https://python.temporal.io/temporalio.workflow.ActivityHandle.html). Use [`execute_activity()`](https://python.temporal.io/temporalio.workflow.html#execute_activity) to return the results.

You must provide either `schedule_to_close_timeout` or `start_to_close_timeout`.

`execute_activity()` is a shortcut for `await start_activity()`. An asynchronous `execute_activity()` helper is provided which takes the same arguments as `start_activity()` and `await`s on the result. `execute_activity()` should be used in most cases unless advanced task capabilities are needed.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_app/your_workflows_dacx.py">View source code</a>

```python

from temporalio import workflow
# ...
# ...
@workflow.defn(name="YourWorkflow")
class YourWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            your_activity,
            YourParams("Hello", name),
            start_to_close_timeout=timedelta(seconds=10),
        )
```

