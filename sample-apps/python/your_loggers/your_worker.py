import asyncio
import logging

from temporalio.client import Client
from temporalio.worker import Worker
from your_workflow_dacx import GreetingWorkflow


async def main():
    logging.basicConfig(level=logging.INFO)
    client = await Client.connect("localhost:7233")
    worker = Worker(
        client, task_queue="logging-task-queue", workflows=[GreetingWorkflow]
    )
    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
