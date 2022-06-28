---
id: how-to-use-queries-in-python
title: How to use Queries in Python
sidebar_label: Use Queries
description: Use Queries
tags:
  - developer-guide
  - sdk
  - python
---

Use the [`@workflow.query`](https://python.temporal.io/temporalio.workflow.html#query) decorator to define a method as a Query. Queries are defined just like Signals, but they should return a value.
Queries should never mutate anything in the Workflow.

The following example demonstrates how to set a custom Query name in the Query decorator.

```python
@workflow.query(name="Custom Name")
def query_custom(self, arg: str) -> str:
    return f"query_custom: {arg}"
```
