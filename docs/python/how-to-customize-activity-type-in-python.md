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

You can register the function as an Activity with a custom name with a decorator argument. For example, `@activity.defn(name="your-activity")`.

You can customize the Activity name with the name parameter, if the name parameter is not specified, the Activity name defaults to the unqualified class name.

```python
@activity.defn(name="your-activity")
async def say_hello_activity(name: str) -> str:
    return f"Hello, {name}!"
```
