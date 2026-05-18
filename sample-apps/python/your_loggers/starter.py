import asyncio

from temporalio.client import Client
from your_workflow_dacx import GreetingWorkflow


async def main():
    client = await Client.connect("localhost:7233")
    handle = await client.start_workflow(
        GreetingWorkflow.run,
        "World",
        id="logging-workflow",
        task_queue="logging-task-queue",
    )

    result = await handle.query(GreetingWorkflow.greeting)
    print(f"Query result: {result}")


if __name__ == "__main__":
    asyncio.run(main())
