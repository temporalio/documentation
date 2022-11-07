---
id: how-to-send-a-query-to-a-workflow-execution-in-python
title: How to send a Query to a Workflow Execution in Python
sidebar_label: Sending Queries
description: Use the `query` method to send a Query.
tags:
  - python
  - how-to
---

To send a Query to a Workflow Execution from Client code, use the `query()` method on the Workflow handle.

```python
await my_workflow_handle.query(MyWorkflow.my_query, "my query arg")
```
