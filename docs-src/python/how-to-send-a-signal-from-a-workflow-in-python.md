---
id: how-to-send-a-signal-from-a-workflow-in-python
title: How to Send a Signal from a Workflow in Python
sidebar_label: Signal
description: Use `get_external_workflow_handle_for` to get a typed Workflow handle to an existing Workflow by its identifier.
---

Use [`get_external_workflow_handle_for`](https://python.temporal.io/temporalio.workflow.html#get_external_workflow_handle_for) to get a typed Workflow handle to an existing Workflow by its identifier.
Use [`get_external_workflow_handle`](https://python.temporal.io/temporalio.workflow.html#get_external_workflow_handle) when you don't know the type of the other Workflow.

:::note

The Workflow Type passed is only for type annotations and not for validation.

:::

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/signal_your_workflow/signal_external_wf_dacx.py">View source code</a>

```python
# ...
@workflow.defn
class WorkflowB:
    @workflow.run
    async def run(self) -> None:
        handle = workflow.get_external_workflow_handle_for(WorkflowA.run, "workflow-a")
        await handle.signal(WorkflowA.your_signal, "signal argument")
```
