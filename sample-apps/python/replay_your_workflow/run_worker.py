import asyncio

from temporalio.client import Client
from temporalio.worker import Worker
from your_activities import your_activity
from your_workflow import YourWorkflow


async def main():
    client = await Client.connect("localhost:7233")
    worker = Worker(
        client,
        task_queue="replay-task-queue",
        workflows=[YourWorkflow],
        activities=[your_activity],
    )
    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
