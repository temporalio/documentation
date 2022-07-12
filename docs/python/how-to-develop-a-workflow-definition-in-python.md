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

Workflows in Python are defined as classes.

Specify the [`@workflow.defn`](https://python.temporal.io/temporalio.workflow.html#defn) decorator on the Workflow class to register a Workflow class.

Use the [`@workflow.run`](https://python.temporal.io/temporalio.workflow.html#run) to mark the entry point method to be invoked. This must be set on one asynchronous method defined on the same class as `@workflow.defn`. Run methods have positional parameters.

```python
@workflow.defn
class YourWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            say_hello_activity, name, schedule_to_close_timeout=timedelta(seconds=5)
        )
```
