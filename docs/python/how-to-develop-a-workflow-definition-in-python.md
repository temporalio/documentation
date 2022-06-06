---
id: how-to-develop-a-workflow-definition-in-python
title: How to develop a Workflow definition in Python
sidebar_label: Develop a Workflow definition
description: Develop a Workflow definition
tags:
  - developer-guide
  - sdk
  - python
---

Workflows in Python are classes.

Specify the `@workflow.defn` decorator on the Workflow class. To mark the entry point method to be invoked, use the `workflow.run` decorator.

```python
@workflow.defn
class YourActivityWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            say_hello, name, schedule_to_close_timeout=timedelta(seconds=5)
        )
```
