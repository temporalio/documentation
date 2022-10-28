---
id: how-to-define-activity-parameters-in-python
title: How to define Activity Parameters in Python
sidebar_label: Activity Parameters
description: Activities can support many custom parameters.
tags:
  - developer-guide
  - python
---

Activity parameters are the function parameters of the function decorated with `@activity.defn`.
These can be any data type Temporal can convert, including [`dataclasses`](https://docs.python.org/3/library/dataclasses.html) when properly type-annotated.
Technically this can be multiple parameters, but Temporal strongly encourages a single `dataclass` parameter containing all input fields.

```python
@dataclass
class YourParams:
    your_int_param: int
    your_str_param: str


@activity.defn
async def your_activity(params: YourParams) -> None:
    ...
```
