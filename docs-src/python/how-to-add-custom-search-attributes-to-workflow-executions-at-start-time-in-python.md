---
id: how-to-add-custom-search-attributes-to-workflow-executions-at-start-time-in-python
title: How to set custom Search Attributes in Python
sidebar_label: Set custom Search Attributes
description: To set custom Search Attributes, use the `search_attributes` parameter of 'start_workflow()'.
tags:
  - developer-guide
  - sdk
  - python
---

To set custom Search Attributes, use the `search_attributes` parameter of the ['start_workflow()'](https://python.temporal.io/temporalio.client.Client.html#start_workflow) method.

```python
handle = await client.start_workflow(
    "your-workflow-name",
    id="your-workflow-id",
    task_queue="your-task-queue",
    search_attributes={"Your-Custom-Keyword-Field": ["value"]},
)
```
