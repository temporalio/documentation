import asyncio

from temporalio.client import Client, TLSConfig
from your_workflows_dacx import YourWorkflow

"""dacx
Use the `connect()` method on the Client class to create and connect to a Temporal Client to the Temporal Cluster.
Then specify the [TLSConfig](https://python.temporal.io/temporalio.service.TLSConfig.html) arguments to connect to a Temporal Cluster with TLS enabled.
The `client_cert` must be combined with `client_private_key` to authenticate the Client.
dacx"""


async def main():
    with open("client-cert.pem", "rb") as f:
        client_cert = f.read()
    with open("client-private-key.pem", "rb") as f:
        client_private_key = f.read()
    client = await Client.connect(
        "your-custom-namespace.account-id.tmprl.cloud:7233",
        namespace="<your-custom-namespace>.<account-id>",
        tls=TLSConfig(
            client_cert=client_cert,
            client_private_key=client_private_key,
            # domain=domain, # TLS domain
            # server_root_ca_cert=server_root_ca_cert, # ROOT CA to validate the server cert
        ),
    )

    result = await client.execute_workflow(
        YourWorkflow.run,
        "your name",
        id="your-workflow-id",
        task_queue="your-task-queue",
    )

    print(f"Result: {result}")


if __name__ == "__main__":
    asyncio.run(main())

""" @dacx
id: how-to-connect-to-temporal-cloud-in-python
title: How to connect to Temporal Cloud
label: Connect to Temporal Cloud
description: Use a certificate key pair and your Temporal Cloud Namespace to connect to Temporal Cloud.
tags:
 - temporal cloud
 - python sdk
 - code sample
lines: 3, 6-10, 13-27
@dacx """
