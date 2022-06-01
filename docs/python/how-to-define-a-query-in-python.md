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

To define a Query, set the Query decorator `@workflow.query` on the Query function inside your Workflow.

```python
@workflow.signal
 async def complete_with_greeting(self) -> None:
     self._complete.set()
```
