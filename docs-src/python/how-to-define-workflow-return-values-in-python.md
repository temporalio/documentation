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

The following example returns an `int` and `str` parameter.

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
