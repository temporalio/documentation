---
id: how-to-upsert-custom-search-attributes-to-a-workflow-executions-during-execution-in-python
title: How to upsert custom Search Attributes
sidebar_label: Upsert custom Search Attributes
description: To upsert custom Search Attributes, use the upsert_search_attributes() method.
---

To upsert custom Search Attributes, use the [`upsert_search_attributes()`](https://python.temporal.io/temporalio.workflow.html#upsert_search_attributes) method.

The keys are added to or replace the existing Search Attributes, similar to [`dict.update()`](https://docs.python.org/3/library/stdtypes.html#dict.update).

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_visibility/workflow_dacx.py">View source code</a>

```python
# ...
        workflow.upsert_search_attributes({"CustomKeywordField": ["new-value"]})
```
