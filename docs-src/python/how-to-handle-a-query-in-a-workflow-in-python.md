---
id: how-to-handle-a-query-in-a-workflow-in-python
title: How to handle a Query in a Workflow
sidebar_label: Handle a Query in a Workflow
description: To send a Query to a Workflow, use the `query` method from the `WorkflowHandle` class.
tags:
  - developer-guide
  - sdk
  - python
---

To send a Query to the Workflow, use the [`query`](https://python.temporal.io/temporalio.client.WorkflowHandle.html#query) method from the [`WorkflowHandle`](https://python.temporal.io/temporalio.client.WorkflowHandle.html) class.

```python
await handle.query("some query")
```
