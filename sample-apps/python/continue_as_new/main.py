import asyncio

from temporalio.client import Client

from your_workflows_dacx import LoopingWorkflow


async def main():
    client = await Client.connect("localhost:7233")

    result = await client.execute_workflow(
        LoopingWorkflow.run,
        0,
        id="your-workflow-id",
        task_queue="your-task-queue",
    )
    print(f"Results: {result}")


if __name__ == "__main__":
    asyncio.run(main())
