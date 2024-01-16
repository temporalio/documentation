import asyncio
from typing import Sequence

from temporalio import workflow
from temporalio.common import RawValue

"""dacx
A Dynamic Query in Temporal is a Query that is invoked dynamically at runtime if no other Query with the same name is registered.
A Query can be made dynamic by adding `dynamic=True` to the `@query.defn` decorator.

The Query Handler should accept `self`, a string name, and a `Sequence[temporalio.common.RawValue]`.
The [payload_converter()](https://python.temporal.io/temporalio.workflow.html#payload_converter) function is used to convert a `RawValue` object to the desired type.
dacx"""


@workflow.defn
class GreetingWorkflow:
    def __init__(self) -> None:
        self._greeting = "<no greeting>"

    @workflow.run
    async def run(self, input: str) -> None:
        self._greeting = f"Hello, {input}!"
        await asyncio.sleep(2)
        self._greeting = f"Goodbye, {input}!"

    @workflow.query(dynamic=True)
    def dynamic_query(self, input: str, args: Sequence[RawValue]) -> str:
        return self._greeting


""" @dacx
id: how-to-set-a-dynamic-query-in-python
title: How to set a Dynamic Query
label: Set a Dynamic Query
description: Use `dynamic=True` on the `@workflow.query` decorator to make a Query dynamic.
tags:
 - dynamic query
 - python sdk
 - code sample
lines: 7-13, 27-29
@dacx"""
