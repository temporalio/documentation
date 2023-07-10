---
id: how-to-spawn-an-activity-execution-in-python
title: How to spawn an Activity Execution in Python
sidebar_label: Activity Execution
description: Use the `execute_activity()` operation from within your Workflow Definition.
---

To spawn an Activity Execution, use the [`execute_activity()`](https://python.temporal.io/temporalio.workflow.html#execute_activity) operation from within your Workflow Definition.

`execute_activity()` is a shortcut for [`start_activity()`](https://python.temporal.io/temporalio.workflow.html#start_activity) that waits on its result.

To get just the handle to wait and cancel separately, use `start_activity()`.
In most cases, use `execute_activity()` unless advanced task capabilities are needed.

A single argument to the Activity is positional. Multiple arguments are not supported in the type-safe form of `start_activity()` or `execute_activity()` and must be supplied by the `args` keyword argument.

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
