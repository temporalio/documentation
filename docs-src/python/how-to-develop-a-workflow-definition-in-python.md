---
id: how-to-develop-a-workflow-definition-in-python
title: How to develop a Workflow Definition in Python
sidebar_label: Develop a Workflow Definition
description: To develop a Workflow Definition, specify the `@workflow.defn` decorator on the Workflow class and use `@workflow.run` to mark the entry point.
---

In the Temporal Python SDK programming model, Workflows are defined as classes.

Specify the `@workflow.defn` decorator on the Workflow class to identify a Workflow.

Use the `@workflow.run` to mark the entry point method to be invoked. This must be set on one asynchronous method defined on the same class as `@workflow.defn`. Run methods have positional parameters.

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

