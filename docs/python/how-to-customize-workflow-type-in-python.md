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

In Python, you can define the Workflow type name, with `@workflow.defn(name="your-workflow-name")`. `@workflow.defn` marks a class as a Workflow, and defaults the Workflow name to the class's name, which can be overridden.

You can customize the Workflow name with the name parameter, if the name parameter is not specified, the Workflow name defaults to the function name.

```python
@workflow.defn(name="your-workflow-name")
class YourWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            say_hello, name, schedule_to_close_timeout=timedelta(seconds=5)
        )
```
