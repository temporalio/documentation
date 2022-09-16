---
id: how-to-upsert-custom-search-attributes-to-a-workflow-executions-during-execution-in-python
title: How to upsert custom Search Attributes
sidebar_label: Upsert custom Search Attributes
description: To upsert custom Search Attributes, use [`upsert_search_attributes()`] and set it to an empty list.
tags:
  - developer-guide
  - sdk
  - python
---

To upsert custom Search Attributes, use the [`upsert_search_attributes()`](https://python.temporal.io/temporalio.workflow.html#upsert_search_attributes) function and set it to an empty list.

The keys are added to or replace the existing Search Attributes, similar to [`dict.update()`](https://docs.python.org/3/library/stdtypes.html#dict.update).

```python
workflow.upsert_search_attributes({"Your-Custom-Keyword-Field": ["new-value"]})
```
