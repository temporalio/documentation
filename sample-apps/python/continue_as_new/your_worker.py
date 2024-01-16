import asyncio

from temporalio.client import Client
from temporalio.worker import Worker

from your_workflows_dacx import LoopingWorkflow


async def main():
    client = await Client.connect("localhost:7233")
    worker = Worker(
        client,
        task_queue="your-task-queue",
        workflows=[LoopingWorkflow],
    )
    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
