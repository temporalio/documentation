---
id: how-to-define-workflow-return-values-in-python
title: How to define Workflow return values
sidebar_label: Define Workflow return values
description: Define Workflow return values
tags:
  - developer-guide
  - sdk
  - python
---

To return the results of a Workflow, set your Workflow to a variable, like `handle`, then return the results with [`result()`](https://docs.python.org/3/library/asyncio-future.html#asyncio.Future.result).

```python
# Waiting for the workflow to complete and returning the result.
return await handle.result()
```
