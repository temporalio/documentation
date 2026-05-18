import asyncio

from temporalio import workflow


@workflow.defn
class CronWorkflow:
    @workflow.run
    async def run(self) -> None:
        print("Hello World")
