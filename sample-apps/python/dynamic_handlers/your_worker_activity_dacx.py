import asyncio

from temporalio.client import Client
from temporalio.worker import Worker
from your_dynamic_activity_dacx import (
    GreetingWorkflow,
    default_greeting,
    dynamic_greeting,
)


async def main():
    client = await Client.connect("localhost:7233")

    worker = Worker(
        client,
        task_queue="dynamic-activity-task-queue",
        workflows=[GreetingWorkflow],
        activities=[dynamic_greeting, default_greeting],
    )

    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
