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

Workflow parameters are the method parameters of the singular method decorated
with `@workflow.run`. These can be any data type Temporal can convert including
`dataclass`es. Technically this can be multiple parameters, but Temporal
strongly encourages a single `dataclass` parameter containing all input fields.
For example:

```python
@dataclass
class MyParams:
    my_int_param: int
    my_str_param: str


@workflow.defn
class MyWorkflow:
    @workflow.run
    async def run(self, params: MyParams) -> None:
        # Do stuff
        ...
```
