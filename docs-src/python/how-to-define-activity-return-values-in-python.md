---
id: how-to-define-activity-return-values-in-python
title: How to define Activity return values in Python
sidebar_label: Activity return values
description: Activity return values
tags:
  - developer-guide
  - python
---

An Activity Execution can return inputs and other Activity values.

The following example defines an Activity that takes a string as input and returns a string.

```python
@activity.defn
async def say_hello(name: str) -> str:
    return f"Hello, {name}!"
```
