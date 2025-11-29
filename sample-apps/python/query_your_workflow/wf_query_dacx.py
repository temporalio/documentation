import asyncio

from temporalio import workflow

"""dacx
To define a Query, set the Query decorator [`@workflow.query`](https://python.temporal.io/temporalio.workflow.html#query) on the Query function inside your Workflow.

**Customize names**

You can have a name parameter to customize the Query's name, otherwise it defaults to the name of the Query method.

:::note

You can either set the `name` or the `dynamic` parameter in a Query's decorator, but not both.

:::
dacx"""


@workflow.defn
class GreetingWorkflow:
    def __init__(self) -> None:
        self._greeting = "<no greeting>"

    @workflow.run
    async def run(self, name: str) -> None:
        self._greeting = f"Hello, {name}!"
        await asyncio.sleep(2)
        self._greeting = f"Goodbye, {name}!"

    @workflow.query
    def greeting(self) -> str:
        return self._greeting

    @workflow.query(name="Custom Query Name")
    def custom_greeting(self) -> str:
        return self._greeting


""" @dacx
id: how-to-define-a-query-in-python
title: How to define a Query in Python
label: Define a Query
description: Use the `@workflow.query` decorator to define a Query.
tags:
 - query
 - workflow
 - python sdk
 - code sample
lines: 5-17, 31-33
@dacx """
