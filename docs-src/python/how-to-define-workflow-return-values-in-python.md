---
id: how-to-define-workflow-return-values-in-python
title: How to define Workflow return values
sidebar_label: Define Workflow return values
description: Define Workflow return values
tags:
  - developer-guide
  - sdk
  - python
---

To return a value of the Workflow, use `return` to return an object.

To return the results of a Workflow Execution, use either [`start_workflow()`](https://python.temporal.io/temporalio.client.Client.html#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.Client.html#execute_workflow) asynchronous methods.

```python
@dataclass
class YourResult:
    your_int_param: int
    your_str_param: str


@workflow.defn
class YourWorkflow:
    @workflow.run
    async def run(self, params: YourResult) -> None:
      return YourResult
```
