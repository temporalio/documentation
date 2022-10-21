---
id: how-to-set-a-parent-close-policy-in-python
title: How to set a Parent Close Policy in Python
sidebar_label: Parent Close Policy
description: Create an instance of the `ParentClosePolicy` class.
tags:
  - python
  - developer-guide
  - how-to
---

Create an instance of the [`ParentClosePolicy`](https://python.temporal.io/temporalio.workflow.ParentClosePolicy.html) class and specify a constant to determine how a Child Workflow should be handled when the Parent closes.

```python
await workflow.execute_child_workflow(MyWorkflow.run, "my child arg", id="my-child-id", parent_close_policy=ParentClosePolicy.TERMINATE)
```
