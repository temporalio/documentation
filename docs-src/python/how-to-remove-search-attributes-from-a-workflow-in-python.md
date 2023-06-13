---
id: how-to-remove-search-attributes-from-a-workflow-in-python
title: How to remove Search Attributes in Python
sidebar_label: Remove Search Attributes
description: To remove a Search Attribute, use `upsert_search_attributes()` with an empty list as its value.
tags:
  - developer-guide
  - sdk
  - python
---

To remove a Search Attribute, use the [`upsert_search_attributes()`](https://python.temporal.io/temporalio.workflow.html#upsert_search_attributes) function with an empty list as its value.

```python
workflow.upsert_search_attributes({"Your-Custom-Keyword-Field": []})
```
