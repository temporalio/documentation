import asyncio
import os

from temporalio.client import Client, TLSConfig
from temporalio.worker import Worker

from activities.ssntraceactivity_dacx import ssn_trace_activity
from workflows.backgroundcheck_dacx import BackgroundCheck

"""dacx
A Temporal Cloud Worker requires that you specify the following in the Client connection options:

- Temporal Cloud Namespace
- Temporal Cloud Address
- Certificate and private key associated with the Namespace
dacx"""


async def main():
    with open(os.getenv("TEMPORAL_MTLS_TLS_CERT"), "rb") as f:
        client_cert = f.read()

    with open(os.getenv("TEMPORAL_MTLS_TLS_KEY"), "rb") as f:
        client_key = f.read()

    client = await Client.connect(
        os.getenv("TEMPORAL_HOST_URL"),
        namespace=os.getenv("TEMPORAL_NAMESPACE"),
        tls=TLSConfig(
            client_cert=client_cert,
            client_private_key=client_key,
        ),
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

"""dacx
When specifying the Temporal Cloud Namespace, make sure to append the Account Id as it appears in the url of the Cloud UI.
Consider the following Namespace url: https://cloud.temporal.io/namespaces/backgroundcheck-app.1a23b, if your Namespace is "backgroundcheck-app" and your Account Id is "1a23b", then you would specify your Namespace as "backgroundcheck-app.1a23b".

The Temporal Cloud gRPC connection address includes your [Namesapce](https://python.temporal.io/temporalio.client.Client.html#namespace) and a port number: `<Namespace>.<AccountId>.tmprl.cloud:<port>`.
For example: `https://backgroundcheck-app.1a23b.tmprl.cloud:7233`.
There is an option to copy the gRPC endpoint address from the Temporal Cloud UI.
dacx"""

""" @dacx
id: backgroundcheck-boilerplate-cloud-worker
title: Run a Temporal Cloud Worker
description: Provide your Namespace, Address, and certificate key pair to connect to Temporal Cloud.
label: Cloud Worker
lines: 1-46
tags:
- worker
- temporal cloud
- developer guide
- temporal client
@dacx """

""" @dacx
id: backgroundcheck-boilerplate-cloud-worker-details
title: Cloud Worker details
description: When specifying the Temporal Cloud Namespace, make sure to append the Account Id as it appears in the url of the Cloud UI.
label: Cloud Worker details
lines: 47-54
tags:
- worker
- cloud certificate
@dacx """
