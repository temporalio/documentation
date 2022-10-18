---
id: how-to-send-a-signal-from-a-workflow-in-python
title: How to Send a Signal from a Workflow in Python
sidebar_label: Send Signal from Workflow
description: Use `get_external_workflow_handle_for` to get a typed Workflow handle to an existing Workflow by its identifier.
tags:
  - developer-guide
  - sdk
  - python
---

Use [`get_external_workflow_handle_for`](https://python.temporal.io/temporalio.workflow.html#get_external_workflow_handle_for) to get a typed Workflow handle to an existing Workflow by its identifier. Use [`get_external_workflow_handle`](https://python.temporal.io/temporalio.workflow.html#get_external_workflow_handle) when you don't know the type of the other Workflow.

```python
@workflow.defn
class MyWorkflow:
    @workflow.run
    async run(self) -> None:
        handle = workflow.get_external_workflow_handle_for(OtherWorkflow.run, "other-workflow-id")
        await handle.signal(OtherWorkflow.other_signal, "other signal arg")
```

:::note

The Workflow Type passed is only for type annotations and not for validation.

:::
