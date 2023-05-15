---
id: how-to-define-workflow-return-values-in-python
title: How to define Workflow return values
sidebar_label: Define Workflow return values
description: Define Workflow return values.
---

To return a value of the Workflow, use `return` to return an object.

To return the results of a Workflow Execution, use either `start_workflow()` or `execute_workflow()` asynchronous methods.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_app/your_workflows_dacx.py">View source code</a>

```python
from temporalio import workflow
# . . .
# . . .
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
