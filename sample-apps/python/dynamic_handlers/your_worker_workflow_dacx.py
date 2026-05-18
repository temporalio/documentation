import asyncio

from temporalio.client import Client
from temporalio.worker import Worker
from your_dynamic_workflow_dacx import DynamicWorkflow, default_greeting


async def main():
    client = await Client.connect("localhost:7233")

    worker = Worker(
        client,
        task_queue="dynamic-workflow-task-queue",
        workflows=[DynamicWorkflow],
        activities=[default_greeting],
    )

    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
