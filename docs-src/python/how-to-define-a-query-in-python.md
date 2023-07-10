---
id: how-to-define-a-query-in-python
title: How to define a Query in Python
sidebar_label: Define a Query
description: Use the `@workflow.query` decorator to define a Query.
---

To define a Query, set the Query decorator [`@workflow.query`](https://python.temporal.io/temporalio.workflow.html#query) on the Query function inside your Workflow.

**Customize names**

You can have a name parameter to customize the Query's name, otherwise it defaults to the unqualified method `__name__`.

:::note

You can either set the `name` or the `dynamic` parameter in a Query's decorator, but not both.

:::

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/query_your_workflow/wf_query_dacx.py">View source code</a>

```python

# ...
    @workflow.query
    def greeting(self) -> str:
        return self._greeting
```

