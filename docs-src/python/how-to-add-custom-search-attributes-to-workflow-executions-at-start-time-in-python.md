---
id: how-to-add-custom-search-attributes-to-workflow-executions-at-start-time-in-python
title: How to set custom Search Attributes in Python
sidebar_label: Set custom Search Attributes
description: To set custom Search Attributes, use the `search_attributes` parameter of 'start_workflow()'.
---

To set custom Search Attributes, use the `search_attributes` parameter of the ['start_workflow()'](https://python.temporal.io/temporalio.client.Client.html#start_workflow) method.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_visibility/starter_dacx.py">View source code</a>

```python

# ...
    handle = await client.start_workflow(
        GreetingWorkflow.run,
        id="search-attributes-workflow-id",
        task_queue="search-attributes-task-queue",
        search_attributes={"CustomKeywordField": ["old-value"]},
    )
```

