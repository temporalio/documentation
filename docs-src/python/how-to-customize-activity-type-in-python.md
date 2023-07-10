---
id: how-to-customize-activity-type-in-python
title: How to customize Activity Type in Python
sidebar_label: Customize Activity Type
description: Customize your Activity Type.
---

You can customize the Activity name with a custom name in the decorator argument. For example, `@activity.defn(name="your-activity")`.
If the name parameter is not specified, the Activity name defaults to the function name.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_app/your_activities_dacx.py">View source code</a>

```python

# ...
@activity.defn(name="your_activity")
async def your_activity(input: YourParams) -> str:
    return f"{input.greeting}, {input.name}!"
```

