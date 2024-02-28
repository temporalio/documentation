import asyncio

from temporalio.client import Client
from temporalio.worker import Worker

from activities.ssntraceactivity_dacx import ssn_trace_activity
from workflows.backgroundcheck_dacx import BackgroundCheck

"""dacx
Set IP address, port, and Namespace in the Temporal Client options.
dacx"""


async def main():
    client = await Client.connect(
        "172.18.0.4:7233"  # The IP address of the Temporal Server on your network.
    )

    worker = Worker(
        client,
        task_queue="backgroundcheck-boilerplate-task-queue",
        workflows=[BackgroundCheck],
        activities=[ssn_trace_activity],
    )
    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())

""" @dacx
id: backgroundcheck-boilerplate-self-hosted-worker
title: Customize Client options
description: Configure the Temporal Client with the specific IP Address of the Temporal Server on your network.
label: Self-hosted Client options
lines: 1-29
tags:
- worker
- self-hosted
- developer guide
@dacx """
