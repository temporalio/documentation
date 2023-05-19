---
id: how-to-define-workflow-parameters-in-python
title: How to define Workflow parameters
sidebar_label: Define Workflow parameters
description: Define Workflow parameters.
---

Workflow parameters are the method parameters of the singular method decorated with `@workflow.run`.
These can be any data type Temporal can convert, including [`dataclasses`](https://docs.python.org/3/library/dataclasses.html) when properly type-annotated.
Technically this can be multiple parameters, but Temporal strongly encourages a single `dataclass` parameter containing all input fields.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_app/your_dataobject_dacx.py">View source code</a>

```python
from dataclasses import dataclass
# . . .
# . . .
@dataclass
class YourParams:
    greeting: str
    name: str
```
