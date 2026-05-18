import asyncio

from temporalio.client import Client
from temporalio.worker import Worker
from your_dynamic_signal_dacx import GreetingWorkflow


async def main():
    client = await Client.connect("localhost:7233")

    worker = Worker(
        client,
        task_queue="dynamic-signal-task-queue",
        workflows=[GreetingWorkflow],
    )

    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
