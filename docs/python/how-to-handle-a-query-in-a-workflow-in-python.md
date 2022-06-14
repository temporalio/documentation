---
id: how-to-handle-a-query-in-a-workflow-in-python
title: How to handle a Query in a Workflow
sidebar_label: Handle a Query in a Workflow
description: Handle a Query in a Workflow
tags:
  - developer-guide
  - sdk
  - python
---

To send a Query from to the Workflow, use the [`query`](https://python.temporal.io/temporalio.client.workflowhandle#query) method from the [`WorkflowHandle`](https://python.temporal.io/temporalio.client.workflowhandle) class.

This will Query for `run_id` if present.

```python
await handle.query("some query")
```
