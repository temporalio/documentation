---
id: how-to-define-activity-return-values-in-python
title: How to define Activity return values in Python
sidebar_label: Activity return values
description: todo
---

An Activity Execution can return inputs and other Activity values.

The following example defines an Activity that takes a string as input and returns a string.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_app/your_activities_dacx.py">View source code</a>

```python
// ...
@activity.defn
async def your_activity(input: YourParams) -> str:
    return f"{input.greeting}, {input.name}!"
```
