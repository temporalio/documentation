import temporalio


async def main():
    client = await Client.connect("http://localhost:7233", namespace="your-namespace")

    handle = await client.start_workflow(
        "your-workflow-name",
        "some arg",
        id="your-workflow-id",
        task_queue="your-task-queue",
    )
