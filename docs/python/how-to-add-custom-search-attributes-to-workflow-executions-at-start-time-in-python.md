---
id: how-to-add-custom-search-attributes-to-workflow-executions-at-start-time-in-python
title: How to set custom search attributes in Python
sidebar_label: Set custom search attributes
description: Set custom search attributes
tags:
  - developer-guide
  - sdk
  - python
---

To set custom search attributes, use the `search_attributes` parameter from the ['start_workflow()'](https://python.temporal.io/temporalio.client.client#start_workflow) method.

```python
handle = await client.start_workflow(
    "your-workflow-name",
    id="your-workflow-id",
    task_queue="your-task-queue",
    search_attributes={"Your-Custom-Keyword-Field": ["value"]},
)
```
