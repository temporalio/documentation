---
id: how-to-develop-an-activity-definition-in-python
title: How to develop an Activity Definition in Python
sidebar_label: Activity Definition
description: In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a struct method.
---

You can develop an Activity Definition by using the `@activity.defn` decorator.
Register the function as an Activity with a custom name through a decorator argument, for example `@activity.defn(name="your_activity")`.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/dacx-poc/your_app/your_activities_dacx.py">View source code</a>

```py
from temporalio import activity
// ...
// ...
@activity.defn
async def your_activity(input: YourParams) -> str:
    return f"{input.greeting}, {input.name}!"
```
