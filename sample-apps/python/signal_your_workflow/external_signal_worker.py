import asyncio

from temporalio.client import Client
from temporalio.worker import Worker
from signal_external_wf_dacx import WorkflowA, WorkflowB


async def main():
    # Start client
    client = await Client.connect("localhost:7233")
    worker = Worker(client, task_queue="signal-tq", workflows=[WorkflowA, WorkflowB])
    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
