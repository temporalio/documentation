---
id: how-to-customize-workflow-type-in-python
title: How to customize Workflow types in Python
sidebar_label: Customize Workflow types
description: Customize Workflow types.
tags:
  - developer-guide
  - sdk
  - python
---

You can customize the Workflow name with a custom name in the decorator argument. For example, `@workflow.defn(name="your-workflow-name")`. If the name parameter is not specified, the Workflow name defaults to the function name.

```python
@workflow.defn(name="your-workflow-name")
class YourWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            your_activity, name, schedule_to_close_timeout=timedelta(seconds=5)
        )
```
