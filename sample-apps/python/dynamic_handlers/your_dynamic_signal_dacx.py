import asyncio
from typing import List, Sequence

from temporalio import workflow
from temporalio.common import RawValue

"""dacx
A Dynamic Signal in Temporal is a Signal that is invoked dynamically at runtime if no other Signal with the same input is registered.
A Signal can be made dynamic by adding `dynamic=True` to the `@signal.defn` decorator.

The Signal Handler should accept `self`, a string input, and a `Sequence[temporalio.common.RawValue]`.
The [payload_converter()](https://python.temporal.io/temporalio.workflow.html#payload_converter) function is used to convert a `RawValue` object to the desired type.
dacx"""


@workflow.defn
class GreetingWorkflow:
    def __init__(self) -> None:
        self._pending_greetings: asyncio.Queue[str] = asyncio.Queue()
        self._exit = False

    @workflow.run
    async def run(self) -> List[str]:
        greetings: List[str] = []
        while True:
            # Wait for queue item or exit
            await workflow.wait_condition(
                lambda: not self._pending_greetings.empty() or self._exit
            )

            # Drain and process queue
            while not self._pending_greetings.empty():
                greetings.append(f"Hello, {self._pending_greetings.get_nowait()}")

            # Exit if complete
            if self._exit:
                return greetings

    @workflow.signal(dynamic=True)
    async def dynamic_signal(self, name: str, args: Sequence[RawValue]) -> None:
        await self._pending_greetings.put(name)

    @workflow.signal
    def exit(self) -> None:
        self._exit = True


""" @dacx
id: how-to-set-a-dynamic-signal-in-python
title: How to set a Dynamic Signal
label: Set a Dynamic Signal
description: Use `dynamic=True` on the `@workflow.signal` decorator to make a Signal dynamic.
tags:
 - dynamic signal
 - python sdk
 - code sample
lines: 7-13, 39-41
@dacx"""
