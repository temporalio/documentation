---
id: how-to-continue-as-new-in-python
title: How to Continue-As-New in Python
sidebar_label: Continue-As-New
description: Continue-As-New
tags:
  - developer-guide
  - sdk
  - python
---

To Continue-As-New in Python, call the [`continue_as_new()`](https://python.temporal.io/temporalio.workflow.html#continue_as_new) function from inside your Workflow, which will stop the Workflow immediately and Continue-As-New.

```python
workflow.continue_as_new("your-workflow-name")
```
