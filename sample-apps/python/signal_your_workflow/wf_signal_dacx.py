import asyncio
from typing import Any, List

from temporalio import workflow

"""dacx
A Signal has a name and can have arguments.

- The name, also called a Signal type, is a string.
- The arguments must be serializable.
To define a Signal, set the Signal decorator [`@workflow.signal`](https://python.temporal.io/temporalio.workflow.html#signal) on the Signal function inside your Workflow.

Non-dynamic methods can only have positional arguments.
Temporal suggests taking a single argument that is an object or data class of fields that can be added to as needed.

Return values from Signal methods are ignored.

**Customize names**

You can have a name parameter to customize the Signal's name, otherwise it defaults to the name of the Signal method.
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
            await workflow.wait_condition(
                lambda: not self._pending_greetings.empty() or self._exit
            )

            while not self._pending_greetings.empty():
                greetings.append(f"Hello, {self._pending_greetings.get_nowait()}")

            if self._exit:
                return greetings

    @workflow.signal
    async def submit_greeting(self, name: str) -> None:
        await self._pending_greetings.put(name)

    @workflow.signal
    def exit(self) -> None:
        self._exit = True

    @workflow.signal(name="Custom Signal Name")
    async def custom_signal(self, name: str) -> None:
        await self._pending_greetings.put(name)


""" @dacx
id: how-to-define-a-signal-in-python
title: How to define a Signal in Python
label: Define a Signal
description: Use the `@workflow.signal` decorator to define a Signal.
tags:
 - signal
 - python sdk
 - code sample
lines: 4, 6-21, 44-49, 52-54
@dacx """
