import asyncio
from temporalio.client import Client
from your_workflows import YourWorkflow


async def main():
    client = await Client.connect("localhost:7233")

    results = await client.execute_workflow(
        YourWorkflow.run,
        "Hello",
        id="your-workflow-id",
        task_queue="your-task-queue",
    )
    print(f"Result: {results}")


if __name__ == "__main__":
    asyncio.run(main())
