---
id: how-to-develop-a-workflow-definition-in-python
title: How to develop a workflow definition in Python
sidebar_label: Develop a workflow definition
description: Develop a workflow definition
tags:
  - developer-guide
  - sdk
  - python
---

Workflows in Python are classes.

Specify the `@workflow.defn` decorator on the Workflow class. To invoke the method, use the `workflow.run` decorator.

```python
import asyncio
from temporalio import workflow


@workflow.defn
class YourWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(your_activity, name)
```
