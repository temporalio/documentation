---
id: how-to-upsert-custom-search-attributes-to-a-workflow-executions-during-execution-in-python
title: How to upsert custom search attributes
sidebar_label: Upsert custom search attributes
description: Upsert custom search attributes
tags:
  - developer-guide
  - sdk
  - python
---

To upsert custom search attributes, use the [`upsert_search_attributes()`](https://python.temporal.io/temporalio.workflow.html#upsert_search_attributes) function and set it to an empty list.

The keys will be added or replaced on top of the existing search attributes, similar to [`dict.update()`](https://docs.python.org/3/library/stdtypes.html#dict.update).

```python
workflow.upsert_search_attributes({"Your-Custom-Keyword-Field": ["new-value"]})
```
