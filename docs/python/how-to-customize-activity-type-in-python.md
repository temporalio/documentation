---
id: how-to-customize-activity-type-in-python
title: How to customize Activity Type in Python
sidebar_label: Customize Activity Type
description: Customize your Activity Type.
tags:
  - developer-guide
  - sdk
  - python
---

You can customize the Activity name with a custom name in the decorator argument. For example, `@activity.defn(name="your-activity")`. If the name parameter is not specified, the Activity name defaults to the function name.

```python
@activity.defn(name="your-activity")
async def your_activity(name: str) -> str:
    return f"Hello, {name}!"
```
