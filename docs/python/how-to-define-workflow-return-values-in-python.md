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

<!-- What handle are you referring to here? A child workflow handle from inside a workflow? Or a client handle when using the client? Either way, neither are asyncio.Future.result. -->

To return the results of a Workflow, set your Workflow to a variable, like `handle`, then return the results with `result()`.

```python
# Waiting for the workflow to complete and returning the result.
return await handle.result()
```
