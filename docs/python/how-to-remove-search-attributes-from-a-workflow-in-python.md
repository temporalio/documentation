---
id: how-to-remove-search-attributes-from-a-workflow-in-python
title: How to remove search attributes in Python
sidebar_label: Remove search attributes
description: Remove search attributes
tags:
  - developer-guide
  - sdk
  - python
---

To remove a search attribute, use the [`upsert_search_attributes()`](https://python.temporal.io/temporalio.workflow.html#upsert_search_attributes) function and an empty list as its value.

```python
workflow.upsert_search_attributes({"Your-Custom-Keyword-Field": []})
```
