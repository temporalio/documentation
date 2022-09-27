---
id: how-to-send-a-signal-from-a-workflow-in-python
title: How to Send Signal from Workflow in Python
sidebar_label: Send Signal from Workflow
description: Send Signal from Workflow.
tags:
  - developer-guide
  - sdk
  - python
---

Use the [`get_external_workflow_handle_for`](https://python.temporal.io/temporalio.workflow.html#get_external_workflow_handle_for) to get a typed Workflow handle to an existing Workflow by its identifier.

```python
@workflow.defn
class MyWorkflow:
    @workflow.run
    async run(self) -> None:
        handle = workflow.get_external_workflow_handle_for(OtherWorkflow.run, "other-workflow-id")
        await handle.signal(OtherWorkflow.other_signal, "other signal arg")
```

:::note

The Workflow type given is only for type annotations and not for validation.

:::
