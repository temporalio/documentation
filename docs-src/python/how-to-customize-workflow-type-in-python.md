---
id: how-to-customize-workflow-type-in-python
title: How to customize Workflow types in Python
sidebar_label: Customize Workflow types
description: Customize Workflow types.
---

You can customize the Workflow name with a custom name in the decorator argument. For example, `@workflow.defn(name="your-workflow-name")`. If the name parameter is not specified, the Workflow name defaults to the function name.

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
