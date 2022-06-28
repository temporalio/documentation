---
id: how-to-send-a-query-to-a-workflow-in-python
title: How to send a query to a Workflow Execution in Python
sidebar_label: Send a query to a Workflow Execution
description: Send a query to a Workflow Execution
tags:
  - developer-guide
  - sdk
  - python
---

Use the [`@workflow.query`](https://python.temporal.io/temporalio.workflow.html#query) decorator to define a method as a Query.

```python
@workflow.query
async def complete_with_greeting(self) -> None:
    self._complete.set()
```

The following example demonstrates how to set a custom Query name in the Query decorator.

```python
@workflow.signal(name="Custom Name")
def signal_custom(self, arg: str) -> None:
    self._last_event = f"signal_custom: {arg}"
```

:::note

Queries should never mutate anything in the Workflow.

:::
