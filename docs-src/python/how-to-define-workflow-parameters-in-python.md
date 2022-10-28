---
id: how-to-define-workflow-parameters-in-python
title: How to define Workflow parameters
sidebar_label: Define Workflow parameters
description: Define Workflow parameters
tags:
  - developer-guide
  - sdk
  - python
---

Workflow parameters are the method parameters of the singular method decorated with `@workflow.run`.
These can be any data type Temporal can convert, including [`dataclasses`](https://docs.python.org/3/library/dataclasses.html) when properly type-annotated.
Technically this can be multiple parameters, but Temporal strongly encourages a single `dataclass` parameter containing all input fields.

```python
@dataclass
class YourParams:
    your_int_param: int
    your_str_param: str


@workflow.defn
class YourWorkflow:
    @workflow.run
    async def run(self, params: YourParams) -> None:
        ...
```
