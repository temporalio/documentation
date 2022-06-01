---
id: how-to-spawn-an-activity-execution-in-python
title: How to spawn an Activity Execution in Python
sidebar_label: Activity Execution
description: Use the `workflow.execute_activity()` operation from within your Workflow Definition.
tags:
  - developer-guide
  - python
---

To spawn an Activity Execution, use the `workflow.execute_activity()` operation from within your Workflow Definition. The operation is available from the `from temporalio import activity, workflow` module.

```python
import asyncio
from datetime import datetime, timedelta
from temporalio import workflow, activity


@workflow.defn
class SayHello:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            say_hello, name, schedule_to_close_timeout=timedelta(seconds=5)
        )
```

An `async workflow.execute_activity()` helper is provided which takes the same arguments as `workflow.start_activity()` and awaits on the result. This should be used in most cases unless advanced task capabilities are needed.

A single argument to the Activity is positional. Multiple arguments are not supported in the type-safe form of `start_activity()` or `execute_activity` and must be supplied by the argument's keyword argument.
