from dataclasses import dataclass
from datetime import timedelta
from typing import Sequence

from temporalio import activity, workflow
from temporalio.common import RawValue

"""dacx
A Dynamic Activity in Temporal is an Activity that is invoked dynamically at runtime if no other Activity with the same name is registered.
An Activity can be made dynamic by adding `dynamic=True` to the `@activity.defn` decorator.
You must register the Activity with the [Worker](https://python.temporal.io/temporalio.worker.html) before it can be invoked.

The Activity Definition must then accept a single argument of type `Sequence[temporalio.common.RawValue]`.
The [payload_converter()](https://python.temporal.io/temporalio.activity.html#payload_converter) function is used to convert a `RawValue` object to the desired type.
dacx"""


@dataclass
class YourDataClass:
    greeting: str
    name: str


@activity.defn(dynamic=True)
async def dynamic_greeting(args: Sequence[RawValue]) -> str:
    arg1 = activity.payload_converter().from_payload(args[0].payload, YourDataClass)
    return (
        f"{arg1.greeting}, {arg1.name}!\nActivity Type: {activity.info().activity_type}"
    )


@activity.defn()
async def default_greeting(input: YourDataClass) -> str:
    return f"{input.greeting}, {input.name}!\nActivity Type: {activity.info().activity_type}"


@workflow.defn
class GreetingWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            "unregistered_activity",
            YourDataClass("Hello", name),
            start_to_close_timeout=timedelta(seconds=10),
        )


""" @dacx
id: how-to-set-a-dynamic-activity-in-python
title: How to set a Dynamic Activity
label: Set a Dynamic Activity
description: Use `dynamic=True` on the `@activity.defn` decorator to make an Activity dynamic.
tags:
 - dynamic activity
 - python sdk
 - code sample
lines: 8-15, 24-29, 37-45
@dacx """
