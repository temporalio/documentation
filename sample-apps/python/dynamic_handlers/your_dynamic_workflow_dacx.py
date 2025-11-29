from dataclasses import dataclass
from datetime import timedelta
from typing import Sequence

from temporalio import activity, workflow
from temporalio.common import RawValue


"""dacx
A Dynamic Workflow in Temporal is a Workflow that is invoked dynamically at runtime if no other Workflow with the same name is registered.
A Workflow can be made dynamic by adding `dynamic=True` to the `@workflow.defn` decorator.
You must register the Workflow with the [Worker](https://python.temporal.io/temporalio.worker.html) before it can be invoked.

The Workflow Definition must then accept a single argument of type `Sequence[temporalio.common.RawValue]`.
The [payload_converter()](https://python.temporal.io/temporalio.workflow.html#payload_converter) function is used to convert a `RawValue` object to the desired type.
dacx"""


@dataclass
class YourDataClass:
    greeting: str
    name: str


@activity.defn()
async def default_greeting(input: YourDataClass) -> str:
    return f"{input.greeting}, {input.name}!\nActivity Type: {activity.info().activity_type}"


@workflow.defn(dynamic=True)
class DynamicWorkflow:
    @workflow.run
    async def run(self, args: Sequence[RawValue]) -> str:
        name = workflow.payload_converter().from_payload(args[0].payload, str)
        return await workflow.execute_activity(
            default_greeting,
            YourDataClass("Hello", name),
            start_to_close_timeout=timedelta(seconds=10),
        )


""" @dacx
id: how-to-set-a-dynamic-workflow-in-python
title: How to set a Dynamic Workflow
label: Set a Dynamic Workflow
description: Use `dynamic=True` on the `@workflow.defn` decorator to make a Workflow dynamic.
tags:
 - dynamic workflow
 - python sdk
 - code sample
lines: 9-16, 30-39
@dacx """
