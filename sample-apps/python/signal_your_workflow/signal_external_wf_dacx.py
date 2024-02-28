from typing import Any, List, Optional

from temporalio import workflow


"""dacx
Use [`get_external_workflow_handle_for`](https://python.temporal.io/temporalio.workflow.html#get_external_workflow_handle_for) to get a typed Workflow handle to an existing Workflow by its identifier. 
Use [`get_external_workflow_handle`](https://python.temporal.io/temporalio.workflow.html#get_external_workflow_handle) when you don't know the type of the other Workflow.

:::note

The Workflow Type passed is only for type annotations and not for validation.

:::
dacx"""


@workflow.defn
class WorkflowA:
    def __init__(self) -> None:
        self._signal: Optional[str] = None

    @workflow.run
    async def run(self) -> str:
        await workflow.wait_condition(lambda: self._signal is not None)
        return self._signal

    @workflow.signal
    def your_signal(self, value: str) -> None:
        self._signal = value


@workflow.defn
class WorkflowB:
    @workflow.run
    async def run(self) -> None:
        handle = workflow.get_external_workflow_handle_for(WorkflowA.run, "workflow-a")
        await handle.signal(WorkflowA.your_signal, "signal argument")


""" @dacx
id: how-to-send-a-signal-from-a-workflow-in-python
title: How to Send a Signal from a Workflow in Python
label: Signal
description: Use `get_external_workflow_handle_for` to get a typed Workflow handle to an existing Workflow by its identifier.
tags:
 - signal
 - workflow
 - python sdk
 - code sample
lines: 6-15, 33-38
@dacx """
