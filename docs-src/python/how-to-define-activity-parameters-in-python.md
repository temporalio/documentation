---
id: how-to-define-activity-parameters-in-python
title: How to do define Activity parameters in Python
sidebar_label: Activity parameters
description: The only required parameter is `context.Context`, but Activities can support many custom parameters.
---

Activity parameters are the function parameters of the function decorated with `@activity.defn`.
These can be any data type Temporal can convert, including dataclasses when properly type-annotated.
Technically this can be multiple parameters, but Temporal strongly encourages a single dataclass parameter containing all input fields.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_app/your_activities_dacx.py">View source code</a>

```python
from temporalio import activity

from your_dataobject_dacx import YourParams
// ...
// ...
@activity.defn
async def your_activity(input: YourParams) -> str:
    return f"{input.greeting}, {input.name}!"
```
