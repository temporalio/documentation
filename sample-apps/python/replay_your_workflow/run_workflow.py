import asyncio

from temporalio.client import Client
from your_workflow import YourWorkflow


async def main():
    client = await Client.connect("localhost:7233")

    result = await client.execute_workflow(
        YourWorkflow.run,
        "your name",
        id="replay-workflow",
        task_queue="replay-task-queue",
    )

    print(f"Result: {result}")


if __name__ == "__main__":
    asyncio.run(main())
