---
id: how-to-send-a-query-to-a-workflow-execution-in-python
title: How to send a Query to a Workflow Execution in Python
sidebar_label: Sending Queries
description: Use the `query` method to send a Query.
---

To send a Query to a Workflow Execution from Client code, use the `query()` method on the Workflow handle.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/query_your_workflow/query_dacx.py">View source code</a>

```python
# ...
    result = await handle.query(GreetingWorkflow.greeting)
```
