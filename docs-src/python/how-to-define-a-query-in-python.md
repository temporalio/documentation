---
id: how-to-define-a-query-in-python
title: How to define a Query in Python
sidebar_label: Define a Query
description: Define a Query
tags:
  - developer-guide
  - sdk
  - python
---

To define a Query, set the Query decorator [`@workflow.query`](https://python.temporal.io/temporalio.workflow.html#query) on the Query function inside your Workflow.

```python
@workflow.query
async def current_greeting(self) -> str:
    return self._current_greeting
```

The [`@workflow.query`](https://python.temporal.io/temporalio.workflow.html#query) decorator defines a method as a Query. Queries can be asynchronous or synchronous methods and can be inherited; however, if a method is overridden, the override must also be decorated. Queries should return a value.

**Dynamic Queries**

You can use `@workflow.query(dynamic=True)`, which means all other unhandled Queries fall through to this.

```python
@workflow.query(dynamic=True)
def query_dynamic(self, name: str, *args: Any) -> str:
    return f"query_dynamic {name}: {args[0]}"
```

**Customize names**

You can have a name parameter to customize the Query's name, otherwise it defaults to the unqualified method `__name__`.

The following example sets a custom Query name.

```python
@workflow.query(name="Custom-Name")
def query(self, arg: str) -> None:
    self._last_event = f"query: {arg}"
```

:::note

You can either set the `name` or the `dynamic` parameter in a Query's decorator, but not both.

:::
